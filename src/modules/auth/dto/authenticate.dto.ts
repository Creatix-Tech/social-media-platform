import { IsString, IsNotEmpty, IsDefined, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthenticateDto {
    @ApiProperty()
    @IsDefined()
    @IsString()
    @IsEmail()
    @IsNotEmpty({ message: 'Please provide user email.' })
    email: string;

    @ApiProperty()
    @IsDefined()
    @IsString()
    @IsNotEmpty({ message: 'Please provide user password.' })
    password: string;
}
