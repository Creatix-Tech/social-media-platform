import { ApiPropertyOptional } from '@nestjs/swagger';
import { UserDto } from '../../user/dto';

export class PostDto {
    @ApiPropertyOptional()
    _id?: string;

    @ApiPropertyOptional()
    title: string;

    @ApiPropertyOptional()
    description: string;

    @ApiPropertyOptional()
    user: UserDto;

    @ApiPropertyOptional()
    image: string;
}
