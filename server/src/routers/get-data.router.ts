import { Request, Response } from 'express';
import { FORM_DATA } from '../mock/mock';

export default (_: Request, res: Response) => {
  res.json(FORM_DATA);
}
