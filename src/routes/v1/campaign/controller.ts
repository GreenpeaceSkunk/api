import axios,{ AxiosRequestConfig } from 'axios';
import FormData from 'form-data';
// import { HttpsProxyAgent } from 'https-proxy-agent';
import { createOne, findByEmail, updateOne } from '../hubspot/contact/controller';
import { postRecord } from '../forma/controller';

type BodyType = {
  firstName: string,
  lastName: string,
  email: string,
};

const sendEmailFromCampaigns = [
  'salva-las-leyes-ambientales'
];

export const sendEmail = async (body: BodyType): Promise<any> => {
  let data = new FormData();
  data.append('nombre', body.firstName);
  data.append('apellido', body.lastName);
  data.append('email', body.email);
  data.append('key', 'JQ7X4QX5G7JQX8G1QXQXK0H7XKXQXKXQ');

  // const agent = new HttpsProxyAgent('http://20.168.249.146')
  // const config: AxiosRequestConfig = {
  //   proxy: false,
  //   httpsAgent: agent,
  //   httpAgent: agent,
  //   method: 'POST',
  //   url: '20.168.249.146',
  //   headers: { "Content-Type": "multipart/form-data" },
  // };

  // return axios.create(config);
  try {
    const response = await axios({
      method: 'POST',
      baseURL: 'https://envios.voluntariosgreenpeace.cl',
      headers: { "Content-Type": "multipart/form-data" },
      data,
    });
    return response;
  } catch (error: any) {
    return {
      status: error.response.status,
      statusText: error.response.statusText,
      data: error.response.data,
    }
  }
}

export const sign = async (body: any, campaignName: string, formId: any, hbCampaignField: any): Promise<any> => {
  const user = await findByEmail(body.email);
  const campaignField = (hbCampaignField) ? {[`${hbCampaignField}`]: 'SI'} : {};
  let alreadySigned = false;

  if(user.status === 404) {
    await createOne({
      firstname: body.firstName,
      lastname: body.lastName,
      email: body.email,
      ...campaignField,
    }, false)
  } else {
    alreadySigned = (user.data.properties[`${hbCampaignField}`] && user.data.properties[`${hbCampaignField}`].value === 'SI') ? true : false;
  }

  if(!alreadySigned) {
    await updateOne(body.email, {
      ...campaignField,
    });
    
    if(formId) {
      await postRecord(parseInt(`${formId}`), body);
    }
  
    if(sendEmailFromCampaigns.includes(campaignName)) {
      await sendEmail(body);
    }

    return Promise.resolve({
      ok: true,
      message: 'El usuario ya firmó la petición',
    });
  } else {
    return Promise.resolve({
      ok: false,
      message: 'El usuario ya firmó la petición',
    });
  } 
}
