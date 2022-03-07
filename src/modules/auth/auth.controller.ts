import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthenticateDto, RegisterDto, TokenDto } from './dto';
import { UserDto } from '../user/dto';

@ApiTags('Authentication')
@Controller('/')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/authenticate')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: TokenDto,
        description: 'Successfully authenticated',
    })
    @ApiBody({
        description: 'AuthenticateDto',
        type: AuthenticateDto,
        required: true,
    })
    async authenticate(@Body() data: AuthenticateDto): Promise<TokenDto> {
        return this.authService.authenticate(data);
    }

    @Post('/register')
    @HttpCode(HttpStatus.CREATED)
    @ApiCreatedResponse({
        type: UserDto,
        description: 'Successfully Registered'
    })
    @ApiBody({
        description: 'RegisterDto',
        type: RegisterDto,
        required: true,
    })
    async register(@Body() data: RegisterDto): Promise<UserDto> {
        return this.authService.register(data);
    }
}
