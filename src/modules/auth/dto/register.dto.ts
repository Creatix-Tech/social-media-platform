import { IsString, IsNotEmpty, IsEmail, MinLength, Matches } from 'class-validator';
import { Trim } from 'class-sanitizer';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty()
    @IsString()
    @IsEmail()
    @IsNotEmpty({ message: 'Please provide user email.' })
    @Trim()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: 'Please provide user name.' })
    @Trim()
    name: string;

    @ApiProperty({ minLength: 8 })
    @IsString()
    @MinLength(8)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Please provide a valid password',
    })
    @IsNotEmpty({ message: 'Please provide password.' })
    password: string;
}
