import { Router, Request, Response, NextFunction } from 'express';
// import { IUser } from 'greenpeace';
import { requestWrapper } from '../../../middlewares';
// import { create, findAll } from '../user/controller';
import { Client } from '@hubspot/api-client';
import axios from 'axios';
// const hubspotClient = new hubspot.Client({ apiKey: YOUR_API_KEY })

const router = Router();
const hubspotClient = new Client({ apiKey: 'fcffbf78-18c5-40f0-a06f-5efd732f4b97' })

// https://legacydocs.hubspot.com/docs/methods/contacts/update_contact
router.get('/', [requestWrapper(async (req: Request, res: Response) => {
  const contacts = await axios({
    baseURL: 'https://api.hubapi.com/contacts/v1/lists/all/contacts/all',
    params: {
      hapikey: 'fcffbf78-18c5-40f0-a06f-5efd732f4b97',
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
      hapikey: 'fcffbf78-18c5-40f0-a06f-5efd732f4b97'
    },
  });

  res
    .status(200)
    .json(contact.data.properties);
})]);

router.post('/', [requestWrapper(async (req: Request, res: Response) => {
  // const body = req.body as any;
  // const contact = await hubspotClient.crm.contacts.basicApi.create({
  //   properties: req.body as any,
  // });
  const contact = await axios({
    baseURL: `https://api.hubapi.com/contacts/v1/contact`,
    method: 'POST',
    params: {
      hapikey: 'fcffbf78-18c5-40f0-a06f-5efd732f4b97'
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
