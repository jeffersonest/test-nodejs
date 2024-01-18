import Warehouse from "./warehouse.entity";

class Product {
  public sku!: number;
  public name!: string;
  public isMarketable!: boolean;
  public inventory!: {
    quantity?: number;
    warehouses: Array<Warehouse>;
  };
}

export default Product;
