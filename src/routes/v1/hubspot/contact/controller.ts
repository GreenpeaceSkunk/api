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

export const findById = async (vid: string): Promise<any> => {
  return await axios({
    baseURL: `${process.env.HUBSPOT_API_URL}/contacts/v1/contact/vid/${vid}/profile`,
    params: {
      hapikey: process.env.HUBSPOT_API_KEY,
    },
  })
  .then((result) => result)
  .catch(() => null);
}

export const updateOne = async (email: string, body: any): Promise<any> => {
  console.log(`${process.env.HUBSPOT_API_URL}/contacts/v1/contact/email/${email}/profile`, process.env.HUBSPOT_API_KEY);
  console.log(Object.keys(body).reduce((a: any, b: string) => ({
    ...a,
    properties: [
      ...(a.properties) ? a.properties : [],
      { property: b, value: body[b] }
    ],
  }), {}))
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
  .then((result) => {
    console.log("Result", result);
    return result;
  })
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

export const search = async (queryParams: any): Promise<any> => {
  console.log(queryParams)
  const queryString = Object.keys(queryParams).reduce((a, b, c) => {
    console.log("a", a, "b", b)
    // return `param=${a}`
    if(a) {
      return `${a}&${b}=${queryParams[b]}`;
    } else {
      return `${b}=${queryParams[b]}`;
    }
  }, "");
  console.log(queryString)
  const result = await axios({
    baseURL: `${process.env.HUBSPOT_API_URL}/contacts/v1/search/query?${queryString}`,
    // baseURL: `${process.env.HUBSPOT_API_URL}/contacts/v1/search/query?q=714159&property=constituent_id`,
    // baseURL: `${process.env.HUBSPOT_API_URL}/contacts/v1/search/query?q=714159&property=properties.constituent_id`,
    params: {
      hapikey: process.env.HUBSPOT_API_KEY,
    },
  });
  // console.log(result);
  return result;
}


