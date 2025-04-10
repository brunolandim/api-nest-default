import { IsString, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  name!: string;

  @IsString()
  @IsOptional()
  @Length(10, 255)
  description?: string;
}
