import { IsString, IsOptional } from 'class-validator';

export class CreateApplicationDto {
  @IsString()
  jobId!: string;

  @IsOptional()
  @IsString()
  coverLetter?: string;

  @IsOptional()
  @IsString()
  cvUrl?: string;

  @IsOptional()
  answers?: any;
}
