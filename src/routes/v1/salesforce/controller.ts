import { IDonationDocument } from "greenpeace";
import axios from "axios";
import url from 'url';
import { ISalesforceSession, Model } from "./model";
import { Model as DonationModel } from "../../../models/donation/model";
import { Model as TransactionModel } from "../../../models/transaction/model";
import { Model as UserModel } from "../../../models/user/model";
import { authorize } from "../payment-gateway/transbank/controller";
import { createDonationSchema } from "./validation.schema";
import { ObjectId } from "mongodb";
import moment from 'moment';
import { Request, Response, NextFunction } from "express";

// https://help.salesforce.com/s/articleView?id=sf.remoteaccess_oauth_endpoints.htm&type=5
const auth = async (): Promise<ISalesforceSession | {error: boolean;}> => {
  const params = new url.URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('client_id', `${process.env.SALESFORCE_CLIENT_ID}`);
  params.append('client_secret', `${process.env.SALESFORCE_SECRET}`);

  const response = await axios({
    method: 'POST',
    baseURL: `${process.env.SALESFORCE_API_URL}/services/oauth2/token`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: params.toString()
  });

  if(response.status === 200) {
    const issuedAt = new Date().setTime(parseInt(response.data.issued_at));
    
    // Clean up collection
    await Model.deleteMany();

    return await Model.create({
      accessToken: response.data.access_token,
      salesforceId: response.data.id,
      instanceUrl: response.data.instance_url,
      signature: response.data.signature,
      tokenType: response.data.token_type,
      issuedAt: issuedAt,
      expireAt: new Date(issuedAt + 2 * (58 * 60 * 1000) ), // Add 1 hour and 56 minutes
    });
  }

  return {error: true};
}

export const getSession = async (): Promise<ISalesforceSession> => {
  const session = await Model.findOne({expireAt: {$gte: new Date()}})
  
  if(session) {
    return session as ISalesforceSession;
  }
  
  // Re-authenticate
  return await auth() as ISalesforceSession;
}

export const createDonation = async (token: string): Promise<any> => { // {gateway_token: string}
  try {
    let donation = await (await DonationModel
      .find()
      .populate({
        path: 'txnDoc',
        model: TransactionModel,
        match: { gatewayToken: { $eq: token }},
      })
      .populate({
        path: 'userDoc',
        model: UserModel,
      })
      .exec() as any
    ).filter((doc: any) => {
      if(doc.txnDoc !== null) {
        return doc;
      }
    });

    donation = donation.length ? donation[0] : donation;

    if(donation === null) {
      return {
        error: true,
        errorMessage: `No existe donación relacionada al id ${token}`,
      }
    }

    if (donation.txnDoc === null) {
      return {
        error: true,
        errorMessage: `No existe transacción relacionada al token ${token}.`,
      };
    }

    if (donation.userDoc === null) {
      return {
        error: true,
        errorMessage: `No existe usuario relacionado al token ${token}.`,
      };
    }
    
    const payload = {
      donation_type: donation.donationType,
      donation_start_date: moment(donation.donationStartDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
      donation_end_date: donation.donationEndDate,
      first_name: donation.userDoc.firstName,
      last_name: donation.userDoc.lastName,
      document_type: donation.userDoc.docType,
      document_number: `${donation.userDoc.docNumber}`.replaceAll('.', ''),
      email: donation.userDoc.email,
      prefix: donation.userDoc.areaCode,
      phone: donation.userDoc.phoneNumber,
      birthdate: moment(donation.userDoc.birthDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
      address_country: donation.userDoc.country.toLowerCase(),
      address_state:{
        code: "",
        name: "",
      },
      address_city: donation.userDoc.city,
      address_street: donation.userDoc.adress,
      address_number: donation.userDoc.addressNumber,
      min_mount: `1`, // TODO: Review
      amount: `${donation.amount}`,
      utm_source: donation.utm_source,
      utm_medium: donation.utm_medium,
      utm_campaign: donation.utm_campaign,
      utm_term: donation.utm_term,
      utm_content: donation.utm_content,
      payment_method: donation.txnDoc.paymentCardType,
      payment_document_type: donation.txnDoc.paymentDocType,
      payment_document_number: `${donation.txnDoc.paymentDocNumber}`.replaceAll('.', ''),
      // payment_card_holder_name: donation.txnDoc.paymentHolderName,
      // payment_document_number: "11111111-1",
      payment_card_holder_name: `${donation.userDoc.firstName} ${donation.userDoc.lastName}`, // TODO: Review ,
      payment_card_due_date: "10/2030", // empty it will returns {}
      payment_bank_entity_name: "",
      payment_card_is_card_holder: "",
      payment_card_token_id: donation.txnDoc.gatewayToken,
      payment_gateway_name: donation.txnDoc.gatewayType,
      payment_card_payer_id: donation.txnDoc.gatewayPayerId,
      payment_card_id: "",
      payment_card_issuer_id: "",
      payment_card_first6: ""
   }
  /**
   * - Define min amount
   * - Check the payment document name
   * - Check card holder name
   */
  // return payload;

    // Check Salesforce's session again in case of expired
    const session = await getSession();
    
    const response = await axios({
      method: 'POST',
      baseURL: `${process.env.SALESFORCE_API_URL}/services/apexrest/omnistudio/v1/integrationprocedure/GPIP_createDonation`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${session.tokenType} ${session.accessToken}`,
      },
      data: payload,
    });

    if(response) {
      await DonationModel.findOneAndUpdate({
        _id: donation._id,
      }, {
        salesforceScheduleId: response.data.schedule_id,
        salesforcePaymentInstrumentId: response.data.payment_instrument_id,
        salesforceCommitmentId: response.data.commitment_id,
        salesforceOpportunityId: response.data.opportunity_id,
        salesforcePersonAccountId: response.data.person_account_id,
      });
    }

    return response.data;
  } catch (error: any) {
    console.log('Error', error)
    return error;
  }
}

export const generatePayment = async (data: any): Promise<any> => {
  return await authorize(data);
}
