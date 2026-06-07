import {
  IsString,
  IsBoolean,
  IsOptional,
  IsArray,
  IsInt,
  Min,
  Max,
  IsIn,
} from 'class-validator';

export class CreateJobDto {
  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsArray()
  @IsString({ each: true })
  requirements!: string[];

  @IsArray()
  @IsString({ each: true })
  responsibilities!: string[];

  @IsString()
  location!: string;

  @IsOptional()
  @IsBoolean()
  isRemote?: boolean;

  @IsString()
  @IsIn(['FULL_TIME', 'PART_TIME', 'INTERNSHIP', 'JUNIOR', 'CONTRACT'])
  type!: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  minSalary?: number;

  @IsOptional()
  @IsInt()
  @Max(1000000)
  maxSalary?: number;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsArray()
  @IsString({ each: true })
  skills!: string[];
}
