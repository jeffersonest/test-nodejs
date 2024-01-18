import Product from "../../entities/product.entity";

abstract class UpdateProductPort {
  abstract update(sku: number, product: Product): Promise<any>;
}

export default UpdateProductPort;
