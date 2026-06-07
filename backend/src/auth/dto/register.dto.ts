import { IsEmail, IsString, MinLength, IsOptional, IsEnum } from 'class-validator';

export enum RegisterRole {
  CANDIDATE = 'CANDIDATE',
  EMPLOYER = 'EMPLOYER',
}

export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  password!: string;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsEnum(RegisterRole)
  role!: RegisterRole;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  companyName?: string;
}
