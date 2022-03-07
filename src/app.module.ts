import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CommonModule } from './common/common.module';
import { ServiceConfig } from './common/services/config.service';
import { IMAGE_ROOT_PATH } from './common/constants';
import { UserModule } from './modules/user/user.module';
import { PostModule } from './modules/post/post.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [CommonModule],
            useFactory: (serviceConfig: ServiceConfig) => ({
                uri: serviceConfig.dbURI,
                useCreateIndex: true
            }),
            inject: [ServiceConfig]
        }),
        MulterModule.register({
            dest: `./${IMAGE_ROOT_PATH}`
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', IMAGE_ROOT_PATH),
        }),
        AuthModule,
        UserModule,
        PostModule
    ]
})
export class AppModule {}
