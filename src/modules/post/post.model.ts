import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../user/user.model';

export type PostDocument = Post & Document;

@Schema()
export class Post {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ type: Types.ObjectId, ref: User.name })
    user: User;

    @Prop()
    image: string;
}

const PostSchema = SchemaFactory.createForClass(Post);

export const PostModel = { name: Post.name, schema: PostSchema };
