import axios from 'axios';

type FormType = {
  name: string,
  formId: number,
  view: number,
  total: number
  lastDate: Date,
};

export const postRecord = async (formId: number, body = {}): Promise<any> => {
  console.log('Post', body);
  const response = await axios({
    baseURL: `https://backoffice.greenpeace.org.ar/api/forms/save`,
    method: 'POST',
    data: {
      form_id: formId,
      ...body,
    },
  });
  return response;
}

export const getForm = async (formId: number|null = null): Promise<any> => {
  const response = await axios({
    baseURL: `https://backoffice.greenpeace.org.ar/api/forms/dashboard`,
    method: 'GET',
    params: {},
  });
  
  if(formId) {
    return Object.values(response.data as FormType[]).find((form: FormType) => form.formId === formId);
  }
  return Object.values(response.data);
};
