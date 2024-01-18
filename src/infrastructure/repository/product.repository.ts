import Product from "../../core/domain/entities/product.entity";
import { Database } from "../../../data/database";
import { injectable } from "tsyringe";

@injectable()
class ProductRepository {
  private database: Product[] = Database;

  async save(product: Product): Promise<Product> {
    const existingProduct = this.database.find((p) => p.sku === product.sku);
    if (existingProduct) {
      throw new Error("Produto com este SKU já existe.");
    }
    this.database.push(product);
    return product;
  }

  async update(sku: number, updatedProduct: Product): Promise<Product> {
    const productIndex = this.database.findIndex((p) => p.sku === sku);
    if (productIndex === -1) {
      throw new Error("Produto não encontrado.");
    }
    this.database[productIndex] = updatedProduct;
    return updatedProduct;
  }

  async delete(sku: number): Promise<void> {
    const productIndex = this.database.findIndex((p) => p.sku === sku);
    if (productIndex === -1) {
      throw new Error("Produto não encontrado.");
    }
    this.database.splice(productIndex, 1);
  }

  async findAll(): Promise<Product[]> {
    return this.database;
  }

  async find(sku: number): Promise<Product | null> {
    const product = this.database.find((p) => p.sku === sku);
    if (product) {
      this.calculateProductDetails(product);
      return product;
    } else {
      return null;
    }
  }

  private calculateProductDetails(product: Product): void {
    product.inventory.quantity = product.inventory.warehouses.reduce(
      (sum, warehouse) => sum + warehouse.quantity,
      0
    );
    product.isMarketable = product.inventory.quantity > 0;
  }
}

export default ProductRepository;
