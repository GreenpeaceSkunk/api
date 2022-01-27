import axios from 'axios';

export const getAll = async (): Promise<any> => {
  const result = await axios({
    baseURL: `${process.env.HUBSPOT_API_URL}/contacts/v1/lists/all/contacts/all`,
    params: {
      hapikey: process.env.HUBSPOT_API_KEY,
    },
  });
  return result;
}

export const findByEmail = async (email: string): Promise<any> => {
  return await axios({
    baseURL: `${process.env.HUBSPOT_API_URL}/contacts/v1/contact/email/${email}/profile`,
    params: {
      hapikey: process.env.HUBSPOT_API_KEY,
    },
  })
  .then((result) => result)
  .catch(() => null);
}

export const updateOne = async (email: string, body: any): Promise<any> => {
  return await axios({
    baseURL: `${process.env.HUBSPOT_API_URL}/contacts/v1/contact/email/${email}/profile`,
    method: 'POST',
    params: {
      hapikey: process.env.HUBSPOT_API_KEY,
    },
    data: Object.keys(body).reduce((a: any, b: string) => ({
      ...a,
      properties: [
        ...(a.properties) ? a.properties : [],
        { property: b, value: body[b] }
      ],
    }), {}),
  })
  .then((result) => result)
  .catch(() => null);;
}

export const createOne = async (body: any): Promise<any> => {
  const contact = await findByEmail(body.email);
  if(!contact) {
    const result = await axios({
      baseURL: `${process.env.HUBSPOT_API_URL}/contacts/v1/contact`,
      method: 'POST',
      params: {
        hapikey: process.env.HUBSPOT_API_KEY,
      },
      data: {
        properties: Object.keys(body).map((key: string) => ({
          property: `${key}`,
          value: body[key],
        })),
      },
    });
    return result;
  } else {
    return updateOne(body.email, body);
  }
}


