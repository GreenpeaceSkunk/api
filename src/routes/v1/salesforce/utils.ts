export enum DocTypes {
  DNI = 'DNI',
  CI = 'CI',
  LC = 'LC',
  LE = 'LE',
  CC = 'CC',
  CE = 'CE',
  PP = 'PP',
  TI = 'TI',
  RC = 'RC',
  NIT = 'NIT',
  RUT = 'RUT',
};

export enum PaymentTypes {
  CREDIT_CARD = 'credit_card',
  BANK_ACCOUNT = 'bank_account',
}

export enum PaymentMethods {
  AMEX = 'amex',
  CODENSA = 'codensa',
  DINERS = 'diners',
  MAGNA = 'magna',
  MASTERCARD = 'mastercard',
  MASTERCARD_DEBIT = 'mastercard_debit',
  VISA = 'visa',
  VISA_DEBIT = 'visa_debit',
  PSE = 'pse',
  REDCOMPRA = 'redcompra',
  PREPAGO = 'prepago',
  CABAL = 'cabal',
  CABAL_DEBIT = 'debcabal',
  CMR = 'cmr',
  CENCOSUD = 'cencosud',
  NARANJA = 'naranja',
};

export enum Countries {
  ARGENTINA = 'argentina',
  CHILE = 'chile',
  COLOMBIA = 'colombia',
};

export enum PaymentGateways {
  MERCADOPAGO = 'mercadopago',
  PAYU = 'payu',
  TRANSBANK = 'transbank',
};

export const ERROR_CODES: {[code: number]: string} = {
  100: "Tipo de donación inválido",
  102: "Tipo de documento inválido",
  103: "País y Tipo de documento no corresponden",
  104: "Número de documento inválido",
  105: "Email inválido",
  106: "Fecha de nacimiento inválida(se auto valida (tipo date))",
  107: "Prefijo inválido",
  108: "Teléfono inválido",
  109: "Nombre es requerido",
  110: "Apellido es requerido",
  111: "UTM es requerido",
  112: "Código de Departamento / Región inválido",
  113: "El monto debe ser mayor a 0",
  114: "Datos inválidos para el método de pago",
  115: "Número de Tarjeta inválido",
  116: "Tipo de Documento del Tarjetahabiente inválido",
  117: "Número de Documento del Tarjetahabiente inválido",
  118: "Nombre y Apellido requeridos",
  119: "Código de seguridad inválido",
  120: "Datos inválidos para el método de pago",
};

export const RegExps: {[a: string]: RegExp} = {
  // Document types
  [`${DocTypes.DNI}`]: new RegExp(/^[0-9]{7,9}$/),
  [`${DocTypes.CI}`]: new RegExp(/^[0-9A-Z]{6,10}$/),
  [`${DocTypes.LC}`]: new RegExp(/^[0-9A-Z]{6,10}$/),
  [`${DocTypes.LE}`]: new RegExp(/^[0-9A-Z]{6,10}$/),
  [`${DocTypes.CC}`]: new RegExp(/^[0-9]{8,10}$/),
  [`${DocTypes.CE}`]: new RegExp(/^[0-9]{8,10}$/),
  [`${DocTypes.PP}`]: new RegExp(/^[0-9]{8,10}$/),
  [`${DocTypes.TI}`]: new RegExp(/^[0-9]{8,10}$/),
  [`${DocTypes.RC}`]: new RegExp(/^[0-9]{8,10}$/),
  [`${DocTypes.NIT}`]: new RegExp(/^[0-9]{8,10}$/),
  [`${DocTypes.RUT}`]: new RegExp(/^(\d{1,3}(?:\.\d{1,3}){2}-[\dkK])$/),
  // Area codes
  // 'area_code_ar': new RegExp(/[0-9]{8,9}/),
  // 'area_code_cl': new RegExp(/9[0-9]{4}[0-9]{4}/),
  // 'area_code_co': new RegExp(/[0-9]{7,10}/),
  // 'phone_number_ar': new RegExp(/[0-9]{8,9}/),
}
