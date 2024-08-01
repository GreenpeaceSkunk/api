import { CallbackWithoutResultAndOptionalError, Schema } from 'mongoose';
import { IDonationDocument } from 'greenpeace';

const schema = new Schema(
  {
    userDoc: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    txnDoc: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    minAmount: { type: Number },
    donationType: {
      type: String,
      enum: ['regular', 'oneoff'],
      required: true,
    },
    donationStartDate: { type: Date },
    donationEndDate: {
      type: Date,
      default: null,
    },
    salesforceScheduleId: { type: String },
    salesforcePaymentInstrumentId: { type: String },
    salesforceOpportunityId: { type: String },
    salesforceCommitmentId: { type: String },
    salesforcePersonAccountId: { type: String },
    salesforceCampaignId: { type: String },
    utm_campaign: { type: String, required: true },
    utm_medium: { type: String, required: true },
    utm_source: { type: String, required: true },
    utm_content: { type: String, required: true },
    utm_term: { type: String, required: true },
    status: { 
      type: [{type: String}],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  });

schema.pre<IDonationDocument>('save', function (next: CallbackWithoutResultAndOptionalError) {
  if(this.donationType === 'regular') {
    this.donationStartDate = new Date(this.createdAt);

    var donationEndDate = new Date(this.createdAt);
    donationEndDate.setDate(donationEndDate.getDate() + 30); // Add 30 day
    this.donationEndDate = donationEndDate;
  }

  next();
});

export { schema };
