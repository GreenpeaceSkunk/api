import { Router, Request, Response, NextFunction } from 'express';
// import { IUser } from 'greenpeace';
import { requestWrapper } from '../../../middlewares';
// import { create, findAll } from '../user/controller';
import { Client } from '@hubspot/api-client';
// const hubspotClient = new hubspot.Client({ apiKey: YOUR_API_KEY })

const router = Router();
const hubspotClient = new Client({ apiKey: 'fcffbf78-18c5-40f0-a06f-5efd732f4b97' })

router.get('/contacts', [requestWrapper(async (req: Request, res: Response) => {
  const contacts = await hubspotClient.crm.contacts.getAll();
  res
    .status(200)
    .json(contacts);
})]);

router.post('/contact', [requestWrapper(async (req: Request, res: Response) => {
  // const body = req.body as any;
  const contact = await hubspotClient.crm.contacts.basicApi.create({
    properties: req.body as any,
  });
  console.log(contact.response.statusCode)
  res
    .status(contact.response.statusCode as number)
    .json({
      id: contact.body.id,
    });
})]);

export default router;
