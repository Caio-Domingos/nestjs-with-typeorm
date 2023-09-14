import { IsEmail, IsString } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  username: string;
  @IsString()
  password: string;
  @IsString()
  @IsEmail()
  email: string;
}
