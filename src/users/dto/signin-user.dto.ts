import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserSignIn {
  @IsNotEmpty({ message: 'Email cannot be null' })
  @IsEmail({}, { message: 'Please provide a valid email' })
  email: string;

  @IsString({ message: 'Password should be string' })
  @MinLength(8, { message: 'Password minimum character should be 8' })
  password: string;
}
