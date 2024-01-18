import { inject, injectable } from "tsyringe";
import Product from "../../entities/product.entity";
import CreateProductPort from "../../ports/product/create-product.port";
import CreateProductAdapter from "../../../../infrastructure/adapters/product/create-product.adapter";

@injectable()
class CreateProductUseCase implements CreateProductPort {
  constructor(
    @inject("CreateProductAdapter")
    private readonly createProductAdapter: CreateProductAdapter
  ) {}
  async create(product: Product): Promise<Product> {
    return this.createProductAdapter.create(product);
  }
}

export default CreateProductUseCase;
