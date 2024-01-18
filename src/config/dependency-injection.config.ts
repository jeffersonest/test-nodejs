import { container } from "tsyringe";
import App from "../app";
import Routes from "../infrastructure/interface/routes";
import ProductRoutes from "../infrastructure/interface/routes/product.routes";
import ProductRepository from "../infrastructure/repository/product.repository";
import ProductController from "../infrastructure/interface/controllers/product.controller";
import CreateProductUseCase from "../core/domain/use-cases/product/create-product.usecase";
import CreateProductAdapter from "../infrastructure/adapters/product/create-product.adapter";
import DeleteProductUseCase from "../core/domain/use-cases/product/delete-product.usecase";
import FindProductUseCase from "../core/domain/use-cases/product/find-product.usecase";
import UpdateProductUseCase from "../core/domain/use-cases/product/update-product.usecase";
import DeleteProductAdapter from "../infrastructure/adapters/product/delete-product.adapter";
import FindProductAdapter from "../infrastructure/adapters/product/find.product.adapter";
import UpdateProductAdapter from "../infrastructure/adapters/product/update-product.adapter";
import Validator from "../shared/validator";

container.registerSingleton<FindProductUseCase>(
  "FindProductUseCase",
  FindProductUseCase
);
container.registerSingleton<DeleteProductUseCase>(
  "DeleteProductUseCase",
  DeleteProductUseCase
);
container.registerSingleton<UpdateProductUseCase>(
  "UpdateProductUseCase",
  UpdateProductUseCase
);

container.registerSingleton<UpdateProductAdapter>(
  "UpdateProductAdapter",
  UpdateProductAdapter
);

container.registerSingleton<DeleteProductAdapter>(
  "DeleteProductAdapter",
  DeleteProductAdapter
);

container.registerSingleton<FindProductAdapter>(
  "FindProductAdapter",
  FindProductAdapter
);

container.registerSingleton<ProductRepository>(
  "ProductRepository",
  ProductRepository
);

container.registerSingleton<CreateProductAdapter>(
  "CreateProductAdapter",
  CreateProductAdapter
);
container.registerSingleton<CreateProductUseCase>(
  "CreateProductUseCase",
  CreateProductUseCase
);
container.registerSingleton<ProductController>(
  "ProductController",
  ProductController
);
container.registerSingleton<ProductRoutes>("ProductRoutes", ProductRoutes);
container.registerSingleton<Routes>("Routes", Routes);
container.registerSingleton<App>("App", App);
container.registerSingleton<Validator>("Validator", Validator);

export default {};
