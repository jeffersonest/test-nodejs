import { IsInt, IsString } from 'class-validator';
export class WarehouseDto {
  @IsString()
  locality?: string;

  @IsInt()
  quantity?: number;

  @IsString()
  type?: string;
}
