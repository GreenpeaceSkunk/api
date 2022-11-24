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

export const findByEmail = async (email: string): Promise<any> => {
  console.log('findByEmail');
  return await axios({
    method: 'GET',
    baseURL: `${process.env.HUBSPOT_API_URL}/contacts/v1/contact/email/${email}/profile`,
    headers: {
      'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
      'Content-Type': 'application/json',
    },
  })
  .then((result) => result)
  .catch(() => null);
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

export const updateOne = async (email: string, body: any): Promise<any> => {
  return await axios({
    method: 'POST',
    baseURL: `${process.env.HUBSPOT_API_URL}/contacts/v1/contact/email/${email}/profile`,
    headers: {
      'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
    },
    data: Object.keys(body).reduce((a: any, b: string) => ({
      ...a,
      properties: [
        ...(a.properties) ? a.properties : [],
        { property: b, value: body[b] }
      ],
    }), {}),
  })
  .then((result) => {
    console.log("Result", result);
    return result;
  })
  .catch(() => null);;
}

export const createOne = async (body: any): Promise<any> => {
  const contact = await findByEmail(body.email);
  console.log('Contact...');
  if(!contact) {
    const result = await axios({
      method: 'POST',
      baseURL: `${process.env.HUBSPOT_API_URL}/contacts/v1/contact`,
      headers: {
        'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
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

export const search = async (queryParams: any): Promise<any> => {
  console.log(queryParams)
  const queryString = Object.keys(queryParams).reduce((a, b, c) => {
    console.log("a", a, "b", b)
    if(a) {
      return `${a}&${b}=${queryParams[b]}`;
    } else {
      return `${b}=${queryParams[b]}`;
    }
  }, "");
  console.log(queryString)
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


