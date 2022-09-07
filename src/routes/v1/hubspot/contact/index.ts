import { Router, Request, Response, NextFunction } from 'express';
import { IRequestError } from 'greenpeace';
import { authWrapper } from '../../../../auth';
import { requestWrapper } from '../../../../middlewares';
import { createOne, findByEmail, findById, getAll, search, updateOne } from './controller';

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
  if(result) {
    res
      .status(200)
      .json(
        Object
          .keys(result.data.properties)
          .reduce((a: any, b: string) => ({ ...a, [`${b}`]: result.data.properties[b].value }), {}))
  } else {
    res
      .status(404)
      .json({
        status: 404,
        errorMessage: 'User does not exist.',
      } as IRequestError);
  }
}]);

/**
 * Get the User by ID (VID)
 * 
 * API: https://legacydocs.hubspot.com/docs/methods/contacts/get_contact
 */
router.get('/id/:id', [async (req: Request, res: Response, next: NextFunction) => {
  const result = await findById(req.params.id);
  if(result) {
    res
      .status(200)
      .json(
        Object
          .keys(result.data.properties)
          .reduce((a: any, b: string) => ({ ...a, [`${b}`]: result.data.properties[b].value }), {}))
  } else {
    res
      .status(404)
      .json({
        status: 404,
        errorMessage: 'User does not exist.',
      } as IRequestError);
  }
}]);


router.post('/', [authWrapper, async (req: Request, res: Response, next: NextFunction) => {
  const result = await createOne(req.body);
  if(result) {
    res
      .status(201)
      .json({
        id: result.data.vid,
        ...req.body,
      });
  } else {
    res
      .status(500)
      .json({
        status: 500,
        errorMessage: 'User cannot be created or maybe exists.',
      } as IRequestError);
  }
}]);

router.post('/email/:email', [authWrapper, async (req: Request, res: Response, next: NextFunction) => {
  console.log('Entra?')
  const result = await updateOne(req.params.email, req.body);
  console.log(result);
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
