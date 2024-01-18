abstract class DeleteProductPort {
  abstract delete(sku: number): Promise<any>;
}

export default DeleteProductPort;
