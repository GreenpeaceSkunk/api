import axios,{ AxiosRequestConfig } from 'axios';
import FormData from 'form-data';
import { HttpsProxyAgent } from 'https-proxy-agent';

type BodyType = {
  firstName: string,
  lastName: string,
  email: string,
}; 

export const sendEmail = async (body: BodyType): Promise<any> => {

  let data = new FormData();
  data.append('nombre', body.firstName);
  data.append('apellido', body.lastName);
  data.append('email', body.email);
  data.append('key', 'JQ7X4QX5G7JQX8G1QXQXK0H7XKXQXKXQ');

  const agent = new HttpsProxyAgent('http://20.168.249.146')
  const config: AxiosRequestConfig = {
    proxy: false,
    httpsAgent: agent,
    httpAgent: agent,
    method: 'POST',
    url: '20.168.249.146',
    headers: { "Content-Type": "multipart/form-data" },
  };
  
  axios.create(config);
}
