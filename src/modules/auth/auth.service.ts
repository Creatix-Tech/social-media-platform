import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { pick } from 'lodash';
import {
    InvalidPasswordException,
    UserAlreadyExistsException,
    UserNotFoundException
} from '../../common/exceptions';
import { UserService } from '../user/user.service';
import { UserDto } from '../user/dto';
import { AuthenticateDto, RegisterDto, TokenDto } from './dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async authenticate(data: AuthenticateDto): Promise<TokenDto> {
        const { email, password } = data;

        const user = await this.userService.getUserByEmail(email, true);
        if (!user) {
            throw new UserNotFoundException('Invalid email');
        }

        const checkPassword = await compare(password, user.password);
        if (!checkPassword) {
            throw new InvalidPasswordException('Invalid password');
        }

        return this.generateToken(user);
    }

    async register(data: RegisterDto): Promise<UserDto> {
        const { email } = data;

        const checkUser = await this.userService.getUserByEmail(email);
        if (checkUser) {
            throw new UserAlreadyExistsException(`User with ${email} email already exists`);
        }

        const user = await this.userService.create(data);

        return pick(user, ['_id', 'name', 'email']);
    }

    private generateToken(user: any): TokenDto {
        const { _id: userId, email } = user;
        const accessToken = this.jwtService.sign({ userId, email });

        return { accessToken };
    }
}
