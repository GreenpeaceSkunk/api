import axios from 'axios';

export const getAll = async (): Promise<any> => {
  const result = await axios({
    method: 'GET',
    baseURL: `${process.env.HUBSPOT_API_URL}/contacts/v1/lists/all/contacts/all`,
    headers: {
      'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });
  return result;
}

export const findById = async (vid: string): Promise<any> => {
  return await axios({
    method: 'GET',
    baseURL: `${process.env.HUBSPOT_API_URL}/contacts/v1/contact/vid/${vid}/profile`,
    headers: {
      'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
      'Content-Type': 'application/json',
    },
  })
  .then((result) => result)
  .catch(() => null);
}

export const findByEmail = async (email: string): Promise<any> => {
  try  {
    const user = await axios({
      method: 'GET',
      baseURL: `${process.env.HUBSPOT_API_URL}/contacts/v1/contact/email/${email}/profile`,
      headers: {
        'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    return user;
  } catch (error: any) {
    return null;
  }
}

export const updateOne = async (email: string, body: any): Promise<any> => {
  return await axios({
    method: 'POST',
    baseURL: `${process.env.HUBSPOT_API_URL}/contacts/v1/contact/email/${email}/profile`,
    headers: {
      'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
      'Content-Type': 'application/json',
    },
    data: Object.keys(body).reduce((a: any, b: string) => ({
      ...a,
      properties: [
        ...(a.properties) ? a.properties : [],
        { property: b, value: body[b] }
      ],
    }), {}),
  });
}

/**
 * https://legacydocs.hubspot.com/docs/methods/contacts/create_contact
 * @param body
 * @returns
 */
export const createOne = async (body: any): Promise<any> => {
  console.log('Create one (Hubspot)')
  const result = await findByEmail(body.email);

  if(result === null) {
    console.log('User (%s) does not exist, then create one.', body.email);
    return await axios({
      method: 'POST',
      baseURL: `${process.env.HUBSPOT_API_URL}/contacts/v1/contact`,
      headers: {
        'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
        'Content-Type': 'application/json',
      },
      data: {
        properties: Object.keys(body).map((key: string) => ({
          property: `${key}`,
          value: body[key],
        })),
      },
    });
  } else {
    console.log('User exists, then update ..');
    return await updateOne(body.email, body);
  }
}

export const search = async (queryParams: any): Promise<any> => {
  const queryString = Object.keys(queryParams).reduce((a, b, c) => {
    if(a) {
      return `${a}&${b}=${queryParams[b]}`;
    } else {
      return `${b}=${queryParams[b]}`;
    }
  }, "");
  const result = await axios({
    method: 'GET',
    baseURL: `${process.env.HUBSPOT_API_URL}/contacts/v1/search/query?${queryString}`,
    headers: {
      'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });
  return result;
}


