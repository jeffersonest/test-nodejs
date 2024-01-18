import { inject, injectable } from "tsyringe";
import Product from "../../../core/domain/entities/product.entity";
import CreateProductPort from "../../../core/domain/ports/product/create-product.port";
import ProductRepository from "../../repository/product.repository";

@injectable()
class CreateProductAdapter implements CreateProductPort {
  constructor(
    @inject("ProductRepository")
    private readonly productRepository: ProductRepository
  ) {}
  async create(product: Product): Promise<Product> {
    return this.productRepository.save(product);
  }
}

export default CreateProductAdapter;
