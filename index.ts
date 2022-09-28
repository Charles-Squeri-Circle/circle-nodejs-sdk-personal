import {
  Circle,
  CircleEnvironments,
  PaymentIntent,
  CryptoPaymentsMoney,
  PaymentMethodBlockchain,
} from '@circle-fin/circle-sdk';
import { v4 as uuidv4 } from 'uuid';

// Initialize API driver
const circle = new Circle(
  '<your-api-key>',
  CircleEnvironments.sandbox // API base url
);

function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function createCryptoPayment() {
  const cryptoPaymentAmount: CryptoPaymentsMoney = {
    amount: '1.11',
    currency: 'USD',
  };

  const cryptoPaymentPaymentMethod: PaymentMethodBlockchain = {
    chain: 'SOL',
    type: 'blockchain',
  };

  const cryptoPaymentReq: PaymentIntent = {
    idempotencyKey: uuidv4(),
    amount: cryptoPaymentAmount,
    settlementCurrency: 'USD',
    paymentMethods: [cryptoPaymentPaymentMethod],
  };

  const createCryptoPaymentRes =
    await circle.paymentIntents.createPaymentIntent(cryptoPaymentReq);
  return createCryptoPaymentRes.data.data?.id;
}

async function getCryptoPayment(id: any) {
  return await circle.paymentIntents.getPaymentIntent(id);
}

async function getCryptoPaymentAddress(id: any) {
  let cryptoPayment = await getCryptoPayment(id);
  if (cryptoPayment.data.data?.paymentMethods[0].address === undefined) {
    await delay(5000);
    cryptoPayment = await getCryptoPayment(id);
    return cryptoPayment.data.data?.paymentMethods[0].address;
  } else {
    return cryptoPayment.data.data?.paymentMethods[0].address;
  }
}

async function cryptoPayment() {
  const cryptoPaymentId = await createCryptoPayment();
  return await getCryptoPaymentAddress(cryptoPaymentId);
}

cryptoPayment().then(result => console.log(result));
