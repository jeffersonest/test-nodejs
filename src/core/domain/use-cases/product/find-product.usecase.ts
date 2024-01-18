import { inject, injectable } from "tsyringe";
import Product from "../../../../core/domain/entities/product.entity";
import FindProductPort from "../../../../core/domain/ports/product/find-product.port";
import ProductRepository from "../../../../infrastructure/repository/product.repository";

@injectable()
class FindProductUseCase implements FindProductPort {
  constructor(
    @inject("ProductRepository")
    private readonly productRepository: ProductRepository
  ) {}

  async find(sku: number): Promise<Product | null> {
    return this.productRepository.find(sku);
  }
}

export default FindProductUseCase;
