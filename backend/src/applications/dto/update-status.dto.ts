import { IsString, IsIn, IsOptional } from 'class-validator';

export class UpdateApplicationStatusDto {
  @IsString()
  @IsIn(['PENDING', 'REVIEWED', 'ACCEPTED', 'REJECTED'])
  status!: string;

  @IsOptional()
  @IsString()
  feedback?: string;
}
