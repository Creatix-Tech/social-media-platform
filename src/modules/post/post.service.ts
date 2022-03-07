import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { existsSync } from 'fs';
import { join } from 'path';
import { IMAGE_ROOT_PATH } from '../../common/constants';
import { Post, PostDocument } from './post.model';
import { PostDto, UpdatePostDto } from './dto';
import {
    FailedToCreatePostException,
    FailedToDeletePostException,
    FailedToGetPostException,
    FailedToUpdatePostException,
    FileNotFoundException,
    FileNotProvidedException,
    InvalidPostOwnerException,
    UserNotFoundException
} from '../../common/exceptions';

@Injectable()
export class PostService {
    private logger: Logger = new Logger(PostService.name);

    constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

    async createPost(data): Promise<PostDto> {
        try {
            const post = new this.postModel(data);
            return await post.save();
        } catch (err) {
            this.logger.error('Failed to create post');
            this.logger.error(err.toString());
            throw new FailedToCreatePostException(err.toString());
        }
    }

    async getAllPosts(): Promise<PostDto[]> {
        try {
            return await this.postModel.find().populate('user');
        } catch (err) {
            this.logger.error('Failed to get posts');
            this.logger.error(err.toString());
            throw new FailedToGetPostException(err.toString());
        }
    }

    async getPostById(id: string, populateUser = true): Promise<PostDto> {
        let post;
        try {
            let findRequest = this.postModel.findById(id);
            if (populateUser) {
                findRequest = findRequest.populate('user');
            }
            post = await findRequest;
        } catch (err) {
            this.logger.error('Failed to get posts');
            this.logger.error(err.toString());
            throw new FailedToGetPostException(err.toString());
        }
        if (!post) {
            this.logger.error(`No post found with id: ${id}`);
            throw new UserNotFoundException(`No post found with id: ${id}`);
        }
        return post;
    }

    async updatePost(userId: string, postId: string, data: UpdatePostDto): Promise<PostDto> {
        await this.validatePostOwnership(userId, postId);

        let post;
        try {
            post = await this.postModel.findOneAndUpdate({ _id: postId }, data, { new: true });
        } catch (err) {
            this.logger.error(`Failed to update post with id: ${postId}`);
            this.logger.error(err.toString());
            throw new FailedToUpdatePostException(err.toString());
        }
        if (!post) {
            this.logger.error(`No post found with id: ${postId}`);
            throw new UserNotFoundException(`No post found with id: ${postId}`);
        }

        return this.getPostById(post._id);
    }

    async uploadImage(userId: string, postId: string, file): Promise<PostDto> {
        if (!file) {
            this.logger.error('Image file should be provided');
            throw new FileNotProvidedException('Missing post image file');
        }
        const imageFileId = file.filename;
        return this.updatePost(userId, postId, { image: imageFileId });
    }

    async downloadImage(id: string, res): Promise<void> {
        const post = await this.getPostById(id, false);
        const imageId = post.image;

        if (!imageId || !existsSync(join(IMAGE_ROOT_PATH, imageId))) {
            throw new FileNotFoundException('Post image file is not found');
        }

        res.sendFile(imageId, { root: IMAGE_ROOT_PATH});
    }

    async deletePost(userId: string, postId: string): Promise<void> {
        await this.validatePostOwnership(userId, postId);
        try {
            await this.postModel.deleteOne({ _id: postId });
        } catch (err) {
            this.logger.error(`Failed to delete post with id: ${postId}`);
            this.logger.error(err.toString());
            throw new FailedToDeletePostException(err.toString());
        }
    }

    private async validatePostOwnership(userId: string, postId: string): Promise<void> {
        const post = await this.getPostById(postId, false);
        if (post.user.toString() !== userId) {
            throw new InvalidPostOwnerException('User can modify only own posts');
        }
    }
}
