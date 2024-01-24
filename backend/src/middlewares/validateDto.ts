import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export function validateDto(dtoClass: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const output = plainToInstance(dtoClass, req.body);
    const errors = await validate(output);

    if (errors.length > 0) {
      console.log('DTO Não Valido', req.body);
      res.status(400).json(errors);
    } else {
      console.log('DTO Valido', req.body);
      req.body = output;
      next();
    }
  };
}
