import {
    Controller,
    Get,
    UseGuards,
    Post,
    Delete,
    Req,
    Body,
    UseInterceptors,
    UploadedFile,
    Param,
    HttpCode,
    HttpStatus,
    Put,
    Res } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiBody,
    ApiConsumes,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AccessControlGuard } from '../../common/guards/access-control.guard';
import { ApiFile } from '../../common/decorators/file.decorator';
import { MAX_IMG_SIZE, IMAGE_ROOT_PATH } from '../../common/constants';
import { PostService } from './post.service';
import { CreatePostDto, PostDto, UpdatePostDto } from './dto';

@Controller('posts')
@ApiTags('Posts')
@UseGuards(AccessControlGuard)
@ApiBearerAuth()
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        isArray: true,
        type: PostDto,
        description: 'Successfully retrieved all posts'
    })
    async getPosts(): Promise<PostDto[]> {
        return this.postService.getAllPosts();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: PostDto,
        description: 'Successfully retrieved post by ID'
    })
    async getPostsById(@Param('id') id: string): Promise<PostDto> {
        return this.postService.getPostById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiCreatedResponse({
        type: PostDto,
        description: 'Successfully created a post'
    })
    @ApiBody({
        description: 'CreatePostDto',
        type: CreatePostDto,
        required: true
    })
    async createPost(@Req() req, @Body() data: CreatePostDto): Promise<PostDto> {
        const user = req.user.userId;
        return await this.postService.createPost({ ...data, user });
    }

    @Put('/:id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: PostDto,
        description: 'Successfully updated post'
    })
    @ApiBody({
        description: 'UpdatePostDto',
        type: UpdatePostDto,
        required: true
    })
    async updatePost(
        @Req() req,
        @Param('id') id: string,
        @Body() data: UpdatePostDto,
    ): Promise<PostDto>
    {
        return this.postService.updatePost(req.user.userId, id, data);
    }

    @Post('/:id/image')
    @HttpCode(HttpStatus.CREATED)
    @ApiCreatedResponse({ type: PostDto, description: 'Successfully uploaded user image' })
    @ApiConsumes('multipart/form-data')
    @ApiFile('image')
    @UseInterceptors(FileInterceptor('image', {
        dest: `${IMAGE_ROOT_PATH}/`,
        limits: {
            fileSize: MAX_IMG_SIZE
        }
    }))
    async uploadImage(
        @Req() req,
        @UploadedFile() file,
        @Param('id') id: string
    ): Promise<PostDto>
    {
        return this.postService.uploadImage(req.user.userId, id, file);
    }

    @Get('/:id/image')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: 'Successfully retrieved post image',
    })
    async downloadImage(
        @Req() req,
        @Param('id') id: string,
        @Res() res): Promise<void>
    {
        return this.postService.downloadImage(id, res);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: 'Successfully deleted post'
    })
    async deletePost(@Req() req, @Param('id') id: string): Promise<void> {
        await this.postService.deletePost(req.user.userId, id);
    }
}
