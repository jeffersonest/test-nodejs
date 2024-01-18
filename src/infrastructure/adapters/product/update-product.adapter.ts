import { inject, injectable } from "tsyringe";
import Product from "../../../core/domain/entities/product.entity";
import UpdateProductPort from "../../../core/domain/ports/product/update-product.port";
import ProductRepository from "../../repository/product.repository";

@injectable()
class UpdateProductAdapter implements UpdateProductPort {
  constructor(
    @inject("ProductRepository")
    private readonly productRepository: ProductRepository
  ) {}

  async update(sku: number, product: Product): Promise<Product> {
    return this.productRepository.update(sku, product);
  }
}

export default UpdateProductAdapter;
