// import { Router, Request, Response, NextFunction } from 'express';
// import { IUser } from 'greenpeace';
// import { requestWrapper } from '../../../middlewares';
// import { create, findAll } from '../user/controller';

// const router = Router();

// router.get('/', [requestWrapper(async (req: Request, res: Response) => {
//   const users = await findAll();
//   res
//     .status(200)
//     .json(users);
// })]);

// router.post('/', [requestWrapper(async (req: Request, res: Response) => {
//   const body = req.body as IUser;
//   const user = await create(body);
//   res
//     .status(201)
//     .json(user);
// })]);

// export default router;
