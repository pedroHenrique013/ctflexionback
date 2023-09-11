import { IsEmail, IsString } from '@nestjs/class-validator';

export class LoginRequestBody {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
