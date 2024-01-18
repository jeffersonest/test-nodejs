abstract class FindProductPort {
  abstract find(sku: number): Promise<any>;
}

export default FindProductPort;
