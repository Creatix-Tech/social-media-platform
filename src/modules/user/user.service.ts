import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { existsSync } from 'fs';
import { join } from 'path';
import {
    FailedToCreateUserException,
    FailedToGetUserException,
    FailedToUpdateUserException,
    FileNotFoundException,
    FileNotProvidedException,
    UserNotFoundException
} from '../../common/exceptions';
import { IMAGE_ROOT_PATH } from '../../common/constants';
import { User, UserDocument } from './user.model';
import { UpdateUserDto, UserDto } from './dto';
import { RegisterDto } from '../auth/dto';

@Injectable()
export class UserService {
    private logger: Logger = new Logger(UserService.name);

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async create(data: RegisterDto): Promise<User> {
        try {
            const user = new this.userModel(data);
            return await user.save();
        } catch (err) {
            this.logger.error('Failed to create user');
            this.logger.error(err.toString());
            throw new FailedToCreateUserException(err.toString());
        }
    }

    async getUserById(id: string): Promise<UserDto> {
        let user;
        try {
            user = await this.userModel.findById(id);
        } catch (err) {
            this.logger.error(`Failed to get user with id: ${id}`);
            this.logger.error(err.toString());
            throw new FailedToGetUserException(err.toString());
        }
        if (!user) {
            this.logger.error(`No user found with id: ${id}`);
            throw new UserNotFoundException(`No user found with id: ${id}`);
        }
        return user;
    }

    async updateUser(id: string, data: UpdateUserDto): Promise<UserDto> {
        let user;
        try {
            user = await this.userModel.findOneAndUpdate({ _id: id }, data, { new: true });
        } catch (err) {
            this.logger.error(`Failed to update user with id: ${id}`);
            this.logger.error(err.toString());
            throw new FailedToUpdateUserException(err.toString());
        }
        if (!user) {
            this.logger.error(`No user found with id: ${id}`);
            throw new UserNotFoundException(`No user found with id: ${id}`);
        }
        return user;
    }

    async uploadImage(id: string, file): Promise<UserDto> {
        if (!file) {
            this.logger.error('Image file should be provided');
            throw new FileNotProvidedException('Missing user image file');
        }
        const imageFileId = file.filename;
        return this.updateUser(id, { image: imageFileId });
    }

    async downloadImage(id: string, res): Promise<void> {
        const user = await this.getUserById(id);
        const imageId = user.image;

        if (!imageId || !existsSync(join(IMAGE_ROOT_PATH, imageId))) {
            throw new FileNotFoundException('User image file is not found');
        }

        res.sendFile(imageId, { root: IMAGE_ROOT_PATH });
    }

    async getUserByEmail(email, selectPassword = false): Promise<User> {
        if (!selectPassword) {
            return this.userModel.findOne({ email });
        }
        return this.userModel.findOne({ email }).select('email password').exec();
    }
}
