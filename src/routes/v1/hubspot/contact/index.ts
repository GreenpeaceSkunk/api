import { Router, Request, Response, NextFunction } from 'express';
import { IRequestError } from 'greenpeace';
import { authWrapper } from '../../../../auth';
import { requestWrapper } from '../../../../middlewares';
import { createOne, findByEmail, getAll, search, updateOne } from './controller';

const router = Router();

router.get('/', [authWrapper, requestWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const result = await getAll();
  console.log(result.data.contacts);
  res
    .status(200)
    .json(result.data.contacts);
})]);

router.get('/search', [async (req: Request, res: Response, next: NextFunction) => {
  const result = await search(req.query);
  if(result) {
    res
      .status(200)
      .json(
        Object
          .keys(result.data.contacts)
          .reduce((a: any, b: string) => ({ ...a, [`${b}`]: result.data.contacts[b].value }), {}))
  } else {
    res
      .status(404)
      .json({
        status: 404,
        errorMessage: 'User does not exist.',
      } as IRequestError);
  }
}]);

router.get('/email/:email', [async (req: Request, res: Response, next: NextFunction) => {
  const result = await findByEmail(req.params.email);
  if(result.status === 404) {
    res
      .status(result.status)
      .json({
        status: result.status,
        statusText: result.statusText,
        errorMessage: result.errorMessage,
      } as IRequestError);
    } else {
      res
        .status(200)
        .json(
          Object
            .keys(result.data.properties)
            .reduce((a: any, b: string) => ({ ...a, [`${b}`]: result.data.properties[b].value }), {}))
    }
}]);

/**
 * Get the User by ID (VID)
 * 
 * API: https://legacydocs.hubspot.com/docs/methods/contacts/get_contact
 */
// router.get('/id/:id', [async (req: Request, res: Response, next: NextFunction) => {
//   const result = await findById(req.params.id);
//   if(result) {
//     res
//       .status(200)
//       .json(
//         Object
//           .keys(result.data.properties)
//           .reduce((a: any, b: string) => ({ ...a, [`${b}`]: result.data.properties[b].value }), {}))
//   } else {
//     res
//       .status(404)
//       .json({
//         status: 404,
//         errorMessage: 'User does not exist.',
//       } as IRequestError);
//   }
// }]);


router.post('/', [authWrapper, async (req: Request, res: Response, next: NextFunction) => {
  const result = await createOne(req.body);

  if(result.status === 200 || result.status === 201) {
    res
      .status(result.status)
      .json({
        id: result.data.vid,
        ...Object
        .keys(result.data.properties)
        .reduce((a: any, b: string) => ({ ...a, [`${b}`]: result.data.properties[b].value }), {}),
      });
  } else if(result.status === 204) {
    res
      .status(200)
      .json({...req.body});
  } else {
    res
      .status(result.status)
      .json({
        status: result.status,
        statusText: result.statusText,
        errorMessage: 'User cannot be created or updated.',
      } as IRequestError);
  }
}]);

router.put('/email/:email', [authWrapper, async (req: Request, res: Response, next: NextFunction) => {
  const result = await updateOne(req.params.email, req.body);
  if(result) {
    res
      .status(201)
      .json({
        id: result.data.vid,
        ...req.body,
      });
  } else {
    res
      .status(404)
      .json({
        status: 204,
        errorMessage: 'User does not exist.',
      } as IRequestError);
  }
}]);

export default router;
