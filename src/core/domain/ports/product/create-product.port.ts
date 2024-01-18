import Product from "../../entities/product.entity";

abstract class CreateProductPort {
  abstract create(product: Product): Promise<Product>;
}

export default CreateProductPort;
