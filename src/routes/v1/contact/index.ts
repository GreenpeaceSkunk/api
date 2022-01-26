import { Router, Request, Response, NextFunction } from 'express';
import { requestWrapper } from '../../../middlewares';
// import { create, findAll } from '../user/controller';
import { Client } from '@hubspot/api-client';
import axios from 'axios';

const router = Router();
const hubspotClient = new Client({ apiKey: 'fcffbf78-18c5-40f0-a06f-5efd732f4b97' })

router.get('/', [requestWrapper(async (req: Request, res: Response) => {
  const contacts = await axios({
    baseURL: 'https://api.hubapi.com/contacts/v1/lists/all/contacts/all',
    params: {
      hapikey: process.env.HUBSPOT_API_KEY,
    },
  })
  res
    .status(200)
    .json(contacts.data.contacts.map((c: any) => c.properties));
  
})]);

router.get('/email/:email', [requestWrapper(async (req: Request, res: Response) => {
  const contact = await axios({
    baseURL: `https://api.hubapi.com/contacts/v1/contact/email/${req.params.email}/profile`,
    params: {
      hapikey: process.env.HUBSPOT_API_KEY,
    },
  });

  res
    .status(200)
    .json(contact.data.properties);
})]);

router.post('/', [requestWrapper(async (req: Request, res: Response) => {
  const contact = await axios({
    baseURL: `https://api.hubapi.com/contacts/v1/contact`,
    method: 'POST',
    params: {
      hapikey: process.env.HUBSPOT_API_KEY,
    },
    data: {
      properties: Object.keys(req.body).map((key: string) => ({
        property: `${key}`,
        value: req.body[key],
      })),
    },
  });
  res
    .status(201)
    .json({
      id: contact.data.vid,
      ...req.body,
    });
})]);

export default router;
