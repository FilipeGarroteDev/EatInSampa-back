import { Request, Response } from 'express';
import { SignUp } from '../protocols/auth-protocol';

async function signUp(req: Request, res: Response){
  const {name, email, password} = req.body as SignUp;


}


async function signIn(req: Request, res: Response){


}

export {signIn, signUp}
