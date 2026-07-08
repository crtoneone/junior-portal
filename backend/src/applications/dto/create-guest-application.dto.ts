import { IsString, IsOptional, IsEmail } from 'class-validator';

export class CreateGuestApplicationDto {
  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsString()
  jobId!: string;

  @IsOptional()
  @IsString()
  coverLetter?: string;
}
