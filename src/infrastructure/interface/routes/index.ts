import { Router as ExpressRouter } from "express";
import { inject, injectable } from "tsyringe";
import ProductRoutes from "./product.routes";

@injectable()
class Routes {
  private Router: ExpressRouter;

  constructor(
    @inject("ProductRoutes") private readonly productRoutes: ProductRoutes
  ) {
    this.Router = ExpressRouter();
  }

  public getRoutes(): ExpressRouter {
    this.Router.use("/product", this.productRoutes.getRoutes());
    return this.Router;
  }
}

export default Routes;
