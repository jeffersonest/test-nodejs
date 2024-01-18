import { inject, injectable } from "tsyringe";
import Express from "express";
import bodyParser from "body-parser";
import Routes from "./infrastructure/interface/routes";

@injectable()
class App {
  private readonly app: Express.Application;

  constructor(@inject("Routes") private router: Routes) {
    this.app = Express();
  }

  start(): void {
    this.app.use(bodyParser.json());
    this.app.use(this.router.getRoutes());
    this.app.listen(process.env.PORT ?? 3000, () =>
      console.log(`Server listening on port ${process.env.PORT ?? 3000}!`)
    );
  }
}

export default App;
