import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ServiceConfig } from '../../common/services/config.service';
import { CommonModule } from '../../common/common.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [CommonModule],
            useFactory: async (serviceConfig: ServiceConfig) => ({
              secret: serviceConfig.jwtSecret,
              signOptions: {
                expiresIn: serviceConfig.jwtExpiresIn,
              },
            }),
            inject: [ServiceConfig],
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, ServiceConfig, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}
