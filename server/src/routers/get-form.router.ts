import { Request, Response } from 'express';
import { INITIAL_FORM } from '../mock/mock';

export default (_: Request, res: Response) => {
  res.json(INITIAL_FORM);
}
