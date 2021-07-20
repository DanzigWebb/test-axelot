import { Request, Response } from 'express';

const users: Record<string, string> = {
  'alex': '123'
};

interface IUserLogin {
  name: string;
  password: string;
}

export default (req: Request, res: Response) => {
  const {name, password} = <IUserLogin>req.body;
  if (users[name] === password) {
    res.status(200).json({
      valid: true,
      token: 'fakeToken',
      name
    });
  } else {
    res.status(404).json({
      valid: false,
      message: 'Invalid login data'
    });
  }
}
