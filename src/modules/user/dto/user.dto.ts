import { ApiPropertyOptional } from '@nestjs/swagger';

export class UserDto {
    @ApiPropertyOptional()
    _id?: string;

    @ApiPropertyOptional()
    name: string;

    @ApiPropertyOptional()
    email: string;

    @ApiPropertyOptional()
    image: string;
}
