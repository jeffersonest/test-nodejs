import { inject, injectable } from "tsyringe";
import DeleteProductPort from "../../../core/domain/ports/product/delete-product.port";
import ProductRepository from "../../repository/product.repository";

@injectable()
class DeleteProductAdapter implements DeleteProductPort {
  constructor(
    @inject("ProductRepository")
    private readonly productRepository: ProductRepository
  ) {}

  async delete(sku: number): Promise<void> {
    return this.productRepository.delete(sku);
  }
}

export default DeleteProductAdapter;
