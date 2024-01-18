import "reflect-metadata";
import container from "../config/dependency-injection.config";
import request from "supertest";
import App from "../app";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import Routes from "../infrastructure/interface/routes";

dotenv.config();
const server = container.resolve<App>("App");
const routes = container.resolve<Routes>("Routes");
server.app.use(bodyParser.json());
server.app.use(routes.getRoutes());
describe("Product API", () => {
  describe("POST /product", () => {
    it("should create a new product", async () => {
      const productData = {
        sku: 12345,
        name: "Produto Exemplo",
        inventory: {
          warehouses: [
            {
              locality: "SP",
              quantity: 12,
              type: "ECOMMERCE",
            },
            {
              locality: "RJ",
              quantity: 5,
              type: "PHYSICAL_STORE",
            },
          ],
        },
      };
      const response = await request(server.app)
        .post("/product")
        .send(productData);

      console.log("RESPONSE \n \n \n ", response, "\n \n \n ");

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("sku");
    });
  });

  describe("PUT /product/:sku", () => {
    it("should update a product", async () => {
      const sku = 43264;
      const productData = {
        name: "Produto Exemplo Atualizado",
        inventory: {
          warehouses: [
            {
              locality: "SP",
              quantity: 12,
              type: "ECOMMERCE",
            },
          ],
        },
      };
      const response = await request(server.app)
        .put(`/product/${sku}`)
        .send(productData);

      expect(response.statusCode).toBe(200);
    });
  });

  describe("GET /product/:sku", () => {
    it("should get product details", async () => {
      const sku = 12345;
      const response = await request(server.app).get(`/product/${sku}`);

      expect(response.statusCode).toBe(200);
    });
  });

  describe("DELETE /product/:sku", () => {
    it("should delete a product", async () => {
      const sku = 12345;
      const response = await request(server.app).delete(`/product/${sku}`);

      expect(response.statusCode).toBe(200);
    });
  });
});
