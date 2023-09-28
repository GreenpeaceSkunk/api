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

export const findByEmail = async (email: string): Promise<any> => {
  return await axios({
    method: 'GET',
    baseURL: `${process.env.HUBSPOT_API_URL}/contacts/v1/contact/email/${email}/profile`,
    headers: {
      'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
      'Content-Type': 'application/json',
    },
  })
  .then(result => {
    return {
      status: result.status,
      statusText: result.statusText,
      data: result.data,
    }
  })
  .catch(error => {
    return {
      status: error.response.status,
      statusText: error.response.statusText,
      errorMessage: error.response.data.message,
    };
  });
}

export const createOne = async (body: any): Promise<any> => {
  const user = await findByEmail(body.email);
  if(user.status === 404) {
    console.log('User (%s) does not exist, then create one.', body.email);
    try {
      const response = await axios({
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
      return response;
    } catch (error: any) {
      return {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
      }
    }
  } else {
    return updateOne(body.email, body);
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
  })
  .then(result => result)
  .catch(error => {
    console.log(error.toJSON());
    return null;
  });
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


