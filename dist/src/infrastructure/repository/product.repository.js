"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../../../data/database");
const tsyringe_1 = require("tsyringe");
let ProductRepository = class ProductRepository {
    database = database_1.Database;
    async save(product) {
        const existingProduct = this.database.find((p) => p.sku === product.sku);
        if (existingProduct) {
            throw new Error("Produto com este SKU já existe.");
        }
        this.database.push(product);
        return product;
    }
    async update(sku, updatedProduct) {
        const productIndex = this.database.findIndex((p) => p.sku === sku);
        if (productIndex === -1) {
            throw new Error("Produto não encontrado.");
        }
        this.database[productIndex] = updatedProduct;
        return updatedProduct;
    }
    async delete(sku) {
        const productIndex = this.database.findIndex((p) => p.sku === sku);
        if (productIndex === -1) {
            throw new Error("Produto não encontrado.");
        }
        this.database.splice(productIndex, 1);
    }
    async findAll() {
        return this.database;
    }
    async find(sku) {
        const product = this.database.find((p) => p.sku === sku);
        if (product) {
            this.calculateProductDetails(product);
            return product;
        }
        else {
            return null;
        }
    }
    calculateProductDetails(product) {
        product.inventory.quantity = product.inventory.warehouses.reduce((sum, warehouse) => sum + warehouse.quantity, 0);
        product.isMarketable = product.inventory.quantity > 0;
    }
};
ProductRepository = __decorate([
    (0, tsyringe_1.injectable)()
], ProductRepository);
exports.default = ProductRepository;
