import axios from 'axios';
import { Request } from 'express';
import { getCountryByReferer } from '../../../utils/general';

type FormType = {
  name: string,
  formId: number | string,
  view: number,
  total: number
  lastDate: Date,
};

const baseUrl: {[d: string]: string} = {
  'ar': 'https://backoffice.greenpeace.org.ar',
  'cl': 'https://backoffice.voluntariosgreenpeace.cl',
  'co': 'https://backoffice.infogreenpeace.org',
}

export const postRecord = async (req: Request): Promise<any> => {
  const {body, params: { formId }} = req;
  const domain = getCountryByReferer(req.header('Referer'));
  
  console.log(`ForMa URL: ${baseUrl[domain!]}/api/forms/save`);
  console.log('Post (ForMa)', body);

  return await axios({
    baseURL: `${baseUrl[domain!]}/api/forms/save`,
    method: 'POST',
    data: {
      form_id: formId,
      ...body,
    },
  });
}

export const getForm = async (req: Request): Promise<any> => {
  const {params: { formId }} = req;
  const domain = getCountryByReferer(req.header('Referer'));

  const response = await axios({
    baseURL: `${baseUrl[domain!]}/api/forms/dashboard`,
    method: 'GET',
    params: {},
  });

  if(formId) {
    return Object.values(response.data as FormType[]).find((form: FormType) => form.formId == formId);
  }
  return Object.values(response.data);
};
