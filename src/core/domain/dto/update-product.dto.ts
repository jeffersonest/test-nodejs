import { IsOptional, IsInt, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import {WarehouseDto} from "./warehouse.dto";

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => WarehouseDto)
  warehouses?: WarehouseDto[];
}
