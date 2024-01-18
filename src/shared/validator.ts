import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Response, Request } from "express";
import { injectable } from "tsyringe";

@injectable()
class Validator {
  checkDto(dtoClass: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const output = plainToInstance(dtoClass, req.body);
      console.log(output, "MIDDLEWARE")
      const errors = await validate(output);

      if (errors.length > 0) {
        const formattedErrors = errors.map(err => ({
          field: err.property,
          errors: Object.values(err.constraints || {})
        }));
        return res.status(400).json({ errors: formattedErrors });
      }

      next();
    };
  }
}

export default Validator;
