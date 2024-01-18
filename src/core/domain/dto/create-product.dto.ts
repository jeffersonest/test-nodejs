import {IsInt, IsString, ValidateNested} from "class-validator";
import {Type} from "class-transformer";
import {WarehouseDto} from "./warehouse.dto";

export class CreateProductDto {
  @IsInt()
  sku?: number;

  @IsString()
  name?: string;

  @ValidateNested({each: true})
  @Type(() => WarehouseDto)
  warehouses?: WarehouseDto[];
}

