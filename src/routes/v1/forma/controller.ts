import axios from 'axios';
import { DomainType } from 'greenpeace';

type FormType = {
  name: string,
  formId: number,
  view: number,
  total: number
  lastDate: Date,
};

const baseUrl: {[d: string]: string} = {
  'ar': 'https://backoffice.greenpeace.org.ar',
  'cl': '',
  'co': 'https://backoffice.infogreenpeace.org',
}

export const postRecord = async (formId: number, body = {}, domain: DomainType): Promise<any> => {
  console.log('Post (ForMa)', body);
  console.log(`Base URL: ${baseUrl[domain]}/api/forms/save`)
  const response = await axios({
    baseURL: `${baseUrl[domain]}/api/forms/save`,
    method: 'POST',
    data: {
      form_id: formId,
      ...body,
    },
  });
  return response;
}

export const getForm = async (formId: number|null = null, domain: DomainType): Promise<any> => {
  const response = await axios({
    baseURL: `${baseUrl[domain]}/api/forms/dashboard`,
    method: 'GET',
    params: {},
  });
  
  if(formId) {
    return Object.values(response.data as FormType[]).find((form: FormType) => form.formId === formId);
  }
  return Object.values(response.data);
};
