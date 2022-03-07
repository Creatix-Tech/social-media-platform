import { IsString, IsNotEmpty, IsDefined } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {Trim} from "class-sanitizer";

export class CreatePostDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: 'Please provide post title.' })
    @Trim()
    title: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: 'Please provide post description.' })
    @Trim()
    description: string;
}
