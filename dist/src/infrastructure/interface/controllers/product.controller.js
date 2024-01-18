"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const create_product_usecase_1 = __importDefault(require("../../../core/domain/use-cases/product/create-product.usecase"));
const update_product_usecase_1 = __importDefault(require("../../../core/domain/use-cases/product/update-product.usecase"));
const delete_product_usecase_1 = __importDefault(require("../../../core/domain/use-cases/product/delete-product.usecase"));
const find_product_usecase_1 = __importDefault(require("../../../core/domain/use-cases/product/find-product.usecase"));
let ProductController = class ProductController {
    createProductUseCase;
    updateProductUseCase;
    findProductUseCase;
    deleteProductUseCase;
    constructor(createProductUseCase, updateProductUseCase, findProductUseCase, deleteProductUseCase) {
        this.createProductUseCase = createProductUseCase;
        this.updateProductUseCase = updateProductUseCase;
        this.findProductUseCase = findProductUseCase;
        this.deleteProductUseCase = deleteProductUseCase;
    }
    async createProduct(req, res) {
        try {
            const product = await this.createProductUseCase.create(req.body);
            return res.status(201).json(product);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async updateProduct(req, res) {
        try {
            const sku = parseInt(req.params.sku);
            const product = req.body.product;
            const updatedProduct = await this.updateProductUseCase.update(sku, product);
            return res.status(200).json(updatedProduct);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async find(req, res) {
        try {
            const sku = parseInt(req.params.sku);
            const product = await this.findProductUseCase.find(sku);
            return product
                ? res.status(200).json(product)
                : res.status(404).json({ message: "Produto não encontrado" });
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async deleteProduct(req, res) {
        try {
            const sku = parseInt(req.params.sku);
            await this.deleteProductUseCase.delete(sku);
            return res.status(200).json({ message: "Produto excluído com sucesso" });
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
};
ProductController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("CreateProductUseCase")),
    __param(1, (0, tsyringe_1.inject)("UpdateProductUseCase")),
    __param(2, (0, tsyringe_1.inject)("FindProductUseCase")),
    __param(3, (0, tsyringe_1.inject)("DeleteProductUseCase")),
    __metadata("design:paramtypes", [create_product_usecase_1.default,
        update_product_usecase_1.default,
        find_product_usecase_1.default,
        delete_product_usecase_1.default])
], ProductController);
exports.default = ProductController;
