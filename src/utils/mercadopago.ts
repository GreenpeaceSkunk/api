// https://www.mercadopago.com.ar/developers/es/guides/online-payments/checkout-api/handling-responses
export const ERROR_CODES: {[key: string]: string} = {
  'E301': 'Ingresa un número de tarjeta válido.',
  'E302': 'Revisa el código de seguridad.',
  '323': 'Revisa tu documento.',
  '324': 'El documento es inválido.',
  '325': 'El mes es inválido.',
  '326': 'El año es inválido.',
  'default': 'Revisa los datos.',
}

export const initialize = () => {
  (async () => {
    await initializeSdk();
  })();
}

export const initializeSdk = async () => {
  return await (async () => {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `//secure.mlstatic.com/sdk/javascript/v1/mercadopago.js`;
    // script.src = `//secure.mlstatic.com/sdk/javascript/v2/mercadopago.js`;
    document.body.appendChild(script);
  })();
}

export const setPublishableKey = (publicKey: string) => {
  window.Mercadopago.setPublishableKey(publicKey);
}

export const createToken = async (form: HTMLFormElement):Promise<{ isValid: boolean; message: string; }> => {
  return new Promise((resolve, reject) => {
    const result = async (status: any, response: any) => {
      if (status === 200 || status === 201) {
        if(form) {
          let card = document.createElement('input');
          card.setAttribute('name', 'token');
          card.setAttribute('type', 'hidden');
          card.setAttribute('value', response.id);
          form.appendChild(card);
          resolve({ isValid: true, message: '' });
        }
      } else {
        // alert("Verify filled data!\n"+JSON.stringify(response, null, 4));
        const errorCode = (response.cause.length) ? response.cause[0].code as string : 'default';
        resolve({ isValid: false, message: ERROR_CODES[errorCode] });
      }
    }
    window.Mercadopago.tokenId = '';
    window.Mercadopago.createToken(form, result);
  });
}

export const getInstallments = async (params: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    console.log("getInstallments", params);
    window.Mercadopago.getInstallments(params, (status: number, installments: any[]) => {
      if(installments.length) {
        const paymentMethods = installments.map((paymentMethod: any) => (
          paymentMethod.processing_mode === 'gateway' ? paymentMethod : null
        )).filter((paymentMethod: any) => paymentMethod !== null);
        resolve(paymentMethods.length ? paymentMethods[0] : null);
      } else {
        resolve(null);
      }
    });
  });
}