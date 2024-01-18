import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import CreateProductUseCase from "../../../core/domain/use-cases/product/create-product.usecase";
import UpdateProductUseCase from "../../../core/domain/use-cases/product/update-product.usecase";
import DeleteProductUseCase from "../../../core/domain/use-cases/product/delete-product.usecase";
import FindProductUseCase from "../../../core/domain/use-cases/product/find-product.usecase";

@injectable()
class ProductController {
  constructor(
    @inject("CreateProductUseCase")
    private readonly createProductUseCase: CreateProductUseCase,
    @inject("UpdateProductUseCase")
    private readonly updateProductUseCase: UpdateProductUseCase,
    @inject("FindProductUseCase")
    private readonly findProductUseCase: FindProductUseCase,
    @inject("DeleteProductUseCase")
    private readonly deleteProductUseCase: DeleteProductUseCase
  ) {}

  async createProduct(req: Request, res: Response): Promise<Response> {
    try {
      const product = await this.createProductUseCase.create(req.body);
      return res.status(201).json(product);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async updateProduct(req: Request, res: Response): Promise<Response> {
    try {
      const sku = parseInt(req.params.sku);
      const product = req.body.product;
      const updatedProduct = await this.updateProductUseCase.update(
        sku,
        product
      );
      return res.status(200).json(updatedProduct);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const sku = parseInt(req.params.sku);
      const product = await this.findProductUseCase.find(sku);
      return product
        ? res.status(200).json(product)
        : res.status(404).json({ message: "Produto não encontrado" });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<Response> {
    try {
      const sku = parseInt(req.params.sku);
      await this.deleteProductUseCase.delete(sku);
      return res.status(200).json({ message: "Produto excluído com sucesso" });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default ProductController;
