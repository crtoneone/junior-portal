import { IsString, IsOptional } from 'class-validator';

export class UpdateEmployerProfileDto {
  @IsOptional()
  @IsString()
  companyName?: string;

  @IsOptional()
  companyLogo?: string;

  @IsOptional()
  @IsString()
  companySize?: string;

  @IsOptional()
  @IsString()
  industry?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  website?: string;

  @IsOptional()
  @IsString()
  location?: string;
}
