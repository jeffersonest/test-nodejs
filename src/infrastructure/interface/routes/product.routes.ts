import { Router as ExpressRouter } from "express";
import { inject, injectable } from "tsyringe";
import ProductController from "../controllers/product.controller";

@injectable()
class ProductRoutes {
  public router: ExpressRouter;

  constructor(
    @inject("ProductController") private productController: ProductController
  ) {
    this.router = ExpressRouter();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      "/",
      this.productController.createProduct.bind(this.productController)
    );
    this.router.put(
      "/:sku",
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
