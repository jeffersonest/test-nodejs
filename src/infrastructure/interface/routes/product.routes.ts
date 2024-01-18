import { Router as ExpressRouter } from "express";
import { inject, injectable } from "tsyringe";
import ProductController from "../controllers/product.controller";
import Validator from "../../../shared/validator";
import {CreateProductDto} from "../../../core/domain/dto/create-product.dto";
import {UpdateProductDto} from "../../../core/domain/dto/update-product.dto";

@injectable()
class ProductRoutes {
  public router: ExpressRouter;

  constructor(
    @inject("ProductController") private productController: ProductController,
    @inject("Validator") private readonly validator: Validator
  ) {
    this.router = ExpressRouter();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      "/",
      this.validator.checkDto(CreateProductDto),
      this.productController.createProduct.bind(this.productController)
    );
    this.router.put(
      "/:sku",
      this.validator.checkDto(UpdateProductDto),
      this.productController.updateProduct.bind(this.productController)
    );
    this.router.get(
      "/:sku",
      this.productController.find.bind(this.productController)
    );
    this.router.delete(
      "/:sku",
      this.productController.deleteProduct.bind(this.productController)
    );
  }

  public getRoutes(): ExpressRouter {
    return this.router;
  }
}

export default ProductRoutes;
