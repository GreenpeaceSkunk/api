import { Router, Request, Response, NextFunction } from 'express';
import { requestWrapper } from '../../../middlewares';
import axios from 'axios';

const router = Router();

router.get('/', [requestWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const response = await axios({
    baseURL: `${process.env.HUBSPOT_API_URL}/contacts/v1/lists/all/contacts/all`,
    params: {
      hapikey: process.env.HUBSPOT_API_KEY,
    },
  })
  res
    .status(200)
    .json(response.data.contacts.map((contact: any) => contact.properties));
  
})]);

router.get('/email/:email', [requestWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const contact = await axios({
    baseURL: `${process.env.HUBSPOT_API_URL}/contacts/v1/contact/email/${req.params.email}/profile`,
    params: {
      hapikey: process.env.HUBSPOT_API_KEY,
    },
  });

  res
    .status(200)
    .json(contact.data.properties);
})]);

router.post('/', [requestWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const contact = await axios({
    baseURL: `${process.env.HUBSPOT_API_URL}/contacts/v1/contact`,
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
