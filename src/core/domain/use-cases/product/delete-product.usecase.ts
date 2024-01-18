import { inject, injectable } from "tsyringe";
import DeleteProductPort from "../../ports/product/delete-product.port";
import DeleteProductAdapter from "../../../../infrastructure/adapters/product/delete-product.adapter";

@injectable()
class DeleteProductUseCase implements DeleteProductPort {
  constructor(
    @inject("DeleteProductAdapter")
    private readonly deleteProductAdapter: DeleteProductAdapter
  ) {}

  async delete(sku: number): Promise<void> {
    return this.deleteProductAdapter.delete(sku);
  }
}

export default DeleteProductUseCase;
