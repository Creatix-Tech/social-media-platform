import {
    Controller,
    Get,
    UseGuards,
    Req,
    Param,
    Put,
    Post,
    Body,
    UnauthorizedException,
    UseInterceptors,
    UploadedFile,
    HttpCode,
    HttpStatus,
    Res
} from '@nestjs/common';
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
import { IMAGE_ROOT_PATH, MAX_IMG_SIZE } from '../../common/constants';
import { UserService } from './user.service';
import { UpdateUserDto, UserDto } from './dto';

@Controller('users')
@ApiTags('Users')
@UseGuards(AccessControlGuard)
@ApiBearerAuth()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: UserDto,
        description: 'Successfully retrieved user by ID'
    })
    async getUser(@Param('id') id: string): Promise<UserDto> {
        return this.userService.getUserById(id);
    }

    @Put('/:id')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: UserDto,
        description: 'Successfully updated user'
    })
    @ApiBody({
        description: 'UpdateUserDto',
        type: UpdateUserDto,
        required: true
    })
    async updateUser(
        @Req() req,
        @Param('id') id: string,
        @Body() data: UpdateUserDto
    ): Promise<UserDto>
    {
        UserController.validateUserId(req.user.userId, id);
        return this.userService.updateUser(id, data);
    }

    @Post('/:id/image')
    @HttpCode(HttpStatus.CREATED)
    @ApiCreatedResponse({
        type: UserDto,
        description: 'Successfully uploaded user image'
    })
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
    ): Promise<UserDto>
    {
        UserController.validateUserId(req.user.userId, id);
        return this.userService.uploadImage(id, file);
    }

    @Get('/:id/image')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: 'Get user image',
    })
    async downloadImage(
        @Req() req,
        @Param('id') id: string,
        @Res() res): Promise<void>
    {
        UserController.validateUserId(req.user.userId, id);
        return this.userService.downloadImage(id, res);
    }

    private static validateUserId(reqUserId: string, id: string): void {
        if (reqUserId !== id) {
            throw new UnauthorizedException({ message: 'Not Authorized' });
        }
    }
}
