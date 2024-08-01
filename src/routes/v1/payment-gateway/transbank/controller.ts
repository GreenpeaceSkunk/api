import { Oneclick, Options, TransactionDetail } from 'transbank-sdk';
import { InscriptionFinishBodyType, InscriptionFinishResponseType } from 'greenpeace';
import { Model as UserModel } from '../../../../models/user/model';
import { Model as DonationModel } from '../../../../models/donation/model';
import { Model as TransactionModel } from '../../../../models/transaction/model';
import { Model as LogModel } from '../../../../models/log/model';
import { createDonation } from '../../../../routes/v1/salesforce/controller';
import { Router, Request, Response, NextFunction } from 'express';
import { createDonationSchema } from '../../salesforce/validation.schema';

const transbankErrors: {[id:string]: string;} = {
  '-1': 'Posible error en el ingreso de datos de la transacción',
  '-2': 'Se produjo fallo al procesar la transacción, este mensaje de rechazo se encuentra relacionado a parámetros de la tarjeta y/o su cuenta asociada',
  '-3': 'Error en Transacción',
  '-4': 'Rechazada por parte del emisor',
  '-5': 'Transacción con riesgo de posible fraude',
}

const getInscription = () => {
  return new Oneclick.MallInscription(
    new Options(
      `${process.env.TRANSBANK_COMMERCE_CODE_MALL}`,
      `${process.env.TRANSBANK_API_KEY}`,
      `${process.env.TRANSBANK_ENVIRONMENT}`,
    )
  );
};

/**
 * Ref: https://www.transbankdevelopers.cl/referencia/oneclick#crear-una-inscripcion
 * @param data 
 * @returns 
 */

// async  => {
    //   const response = res.json(await create(req.body));
      
    // }

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const validateSchema = createDonationSchema.validate(req.body);
  console.log(validateSchema)

  if(validateSchema['error']) {
    return res.status(400).json({
      error: true,
      message: validateSchema.error.details[0].message,
      valids: validateSchema.error.details[0].context,
    }); 
  }
  
  if(req.params.donationRef) {
    // Find the user by donation ref
  } else {

  }
  
  console.log('Suscribe')
  const inscription = getInscription();

  const user = await UserModel.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    docType: req.body.docType,
    docNumber: req.body.docNumber,
    areaCode: req.body.areaCode,
    phoneNumber: req.body.phoneNumber,
    birthDate: req.body.birthDate,
    country: req.body.country,
    region: req.body.region,
    province: req.body.province,
    city: req.body.city,
    address: req.body.address,
    addressNumber: req.body.addressNumber,
  });

  // // LogModel.create({
  // //   user: user._id,
  // //   status: 'INSCRIPTION_START',
  // // });
  
  // const response = await inscription.start(user.id, req.body.email, encodeURI(`${req.body.apiResponseUrl}${req.body.apiResponseUrlParams}`));
  const response = await inscription.start(user.id, req.body.email, req.body.apiResponseUrl);

  await UserModel.findOneAndUpdate({_id: user.id}, {status: 'INSCRIPTION_STARTED'});

  const txn = await TransactionModel.create({
    gatewayType: 'tbk',
    gatewayUsername: user.id,
    gatewayToken: response.token,
    paymentType: req.body.paymentType,
    paymentDocType: req.body.paymentDocType,
    paymentDocNumber: req.body.paymentDocNumber,
    paymentHolderName: req.body.paymentHolderName,
    paymentIsCardHolder: req.body.paymentIsCardHolder,
    attempts: 1,
    minAmount: 1, // TODO: Take from config 
  });
// console.log(txn)
  // LogModel.findOneAndUpdate({
  //   user: user.id,
  // }, {$push: {status: {type: 'TRANSACTION_DATABASE_CREATED', doc: txn._id}}});

  await DonationModel.create({
    userDoc: user.id,
    txnDoc: txn.id,
    donationType: req.body.donationType,
    salesforcefCampaignId: req.body.salesforcefCampaignId,
    amount: req.body.amount,
    utm_campaign: req.body.utmCampaign,
    utm_medium: req.body.utmMedium,
    utm_source: req.body.utmSource,
    utm_content: req.body.utmContent,
    utm_term: req.body.utmTerm,
  });


  // {
  //   paymentType: {
  //     type: String,
  //     enum: ['credit_card', 'debit_card', 'bank_account'],
  //   },
  //   paymentCardType: { type: String },
  //   paymentCardNumber: { type: String },
  //   paymentIsCardHolder: { type: Boolean, default: null },
  //   paymentHolderName: { type: String },
  //   paymentDocType: { type: String },
  //   paymentDocNumber: { type: String },
  //   authorizationCode: { type: Number },
  //   responseCode: { type: Number },
  //   gatewayToken: { type: String, required: true, unique: true },
  //   gatewayUsername: { type: String },
  //   gatewayUser: { type: String }, // AKA payerId
  // }
  
  // // Save log
  // // await Log.create({type: 'USER_DATABASE_CREATED', ref: user});
  // Status: USER_INSCRIPTION_STARTED

  // return response;
  // return req.body;
  res
    .status(201)
    .send(response);
}

/**
 * Ref: https://www.transbankdevelopers.cl/documentacion/oneclick#confirmar-una-inscripcion
 * @param data 
 * @returns 
 */
// export const confirm = async (data: InscriptionFinishBodyType):Promise<InscriptionFinishResponseType> => {

export const confirm = async (req: Request, res: Response, next: NextFunction) => {
  // Status: USER_INSCRIPTION_STARTED
  if(!req.query.token) {
    res
      .status(400)
      .json({
        error: true,
        errorMessage: 'Missing `token` parameter',
      });
  }

  const inscription = getInscription();
  console.log(inscription)
  const tbkResponse = await inscription.finish(req.query.token as string);
  console.log('tbkResponse', tbkResponse)

  if(tbkResponse.response_code < 0) {
    let donation = await (await DonationModel
      .find()
      .populate({
        path: 'txnDoc',
        model: TransactionModel,
        match: { gatewayToken: { $eq: req.query.token }},
      })
      // .populate({
      //   path: 'userDoc',
      //   model: UserModel,
      // })
      .exec() as any
    ).filter((doc: any) => {
      if(doc.txnDoc !== null) { return doc; }
    });

    donation = donation.length ? donation[0] : donation;

    return res
      .status(400)
      .json({
        error: true,
        response_code: tbkResponse.response_code,
        errorMessage: transbankErrors[`${tbkResponse.response_code}`] || 'Error inesperado al confirmar el usuario en Transbank',
        data: {
          donationRef: donation._id,
        },
      });
  }

  await TransactionModel.findOneAndUpdate(
    { gatewayToken: req.query.token },
    {
      gatewayPayerId: tbkResponse.tbk_user || null,
      gatewayAuthorizationCode: tbkResponse.authorization_code || null,
      gatewayResponseCode: tbkResponse.response_code,
      paymentCardType: tbkResponse.card_type || null,
      paymentCardNumber: tbkResponse.card_number || null,
    },
  );

  if(tbkResponse.response_code < 0) {
    return res
      .status(400)
      .json({
        error: true,
        errorMessage: `Transbank response ${tbkResponse.response_code}`,
      });
  }

  const salesforceResponse = await createDonation(req.query.token as string);
  console.log('Salesforce response', salesforceResponse);
  
  if(salesforceResponse.error) {
    return res
      .status(400)
      .json({
        error: true,
        errorMessage: salesforceResponse.errorMessage,
      });

  }
  
  res.status(201).json({message: 'Transbank confirmation OK'});
  // try {

  // } catch (error: any) {
  //   res
  //     .status(400)
  //     .json({
  //       error: true,
  //       errorMessage: error,
  //     });
  // }
  // Status: USER_INSCRIPTION_FINISHED
  // await createDonation();
  // Status: USER_DONATION_CREATED
}

export const authorize = async (data: any): Promise<any> => {
  const txn = new Oneclick.MallTransaction(
    new Options(
      `${process.env.TRANSBANK_COMMERCE_CODE_MALL}`,
      `${process.env.TRANSBANK_API_KEY}`,
      `${process.env.TRANSBANK_ENVIRONMENT}`,
    )
  );

  try {
    // https://www.transbankdevelopers.cl/referencia/oneclick#autorizar-una-transaccion
    const response = await txn.authorize(
      data.username,
      data.tbkUser,
      data.username,
      [
        new TransactionDetail(data.amount, `${process.env.TRANSBANK_COMMERCE_CODE_STORE}`, data.buyOrder, 1),
      ],
    );
  
    console.log(response.status);
    return response;
  } catch(error: any) {
    return {
      error: true,
    }
  }
}


