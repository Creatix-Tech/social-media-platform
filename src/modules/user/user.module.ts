import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel } from './user.model';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [MongooseModule.forFeature([UserModel])],
    controllers: [UserController],
    exports: [UserService],
    providers: [UserService],
})
export class UserModule {}
