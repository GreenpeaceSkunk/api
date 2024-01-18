import axios from 'axios';
import { postRecord } from '../forma/controller';
import { createOne, findByEmail, updateOne } from '../hubspot/contact/controller';

type BodyType = {
  firstName: string,
  lastName: string,
  email: string,
};

const sendEmailFromCampaigns = [
  'salva-las-leyes-ambientales'
];

export const sendEmail = async (body: BodyType): Promise<any> => {
  try {
    await axios({
      method: 'POST',
      baseURL: 'https://envios.voluntariosgreenpeace.cl',
      headers: { "Content-Type": "aapplication/json" },
      data: {
        nombre: body.firstName,
        apellido: body.lastName,
        email: body.email,
        key: 'JQ7X4QX5G7JQX8G1QXQXK0H7XKXQXKXQ',
      },
    });
  } catch (error: any) {
    console.log('Error when sending email from campaign.')
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
      sendEmail(body);
    }

    return Promise.resolve({
      ok: true,
      message: 'Firma registrada correctamente.',
    });
  } else {
    return Promise.resolve({
      ok: false,
      message: 'El usuario ya firmó la petición',
    });
  }
}
