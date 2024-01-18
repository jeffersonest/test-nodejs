import { inject, injectable } from "tsyringe";
import Product from "../../entities/product.entity";
import UpdateProductPort from "../../ports/product/update-product.port";
import UpdateProductAdapter from "../../../../infrastructure/adapters/product/update-product.adapter";

@injectable()
class UpdateProductUseCase implements UpdateProductPort {
  constructor(
    @inject("UpdateProductAdapter")
    private readonly updateProductAdapter: UpdateProductAdapter
  ) {}

  async update(sku: number, product: Product): Promise<Product> {
    return this.updateProductAdapter.update(sku, product);
  }
}

export default UpdateProductUseCase;
