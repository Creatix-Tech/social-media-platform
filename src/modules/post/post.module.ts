import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { PostModel } from './post.model';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
    imports: [MongooseModule.forFeature([PostModel])],
    controllers: [PostController],
    exports: [PostService],
    providers: [PostService],
})
export class PostModule {}
