import {
  Circle,
  CircleEnvironments,
} from "@circle-fin/circle-sdk";
import { v4 as uuidv4 } from "uuid";
import * as dotenv from 'dotenv'
dotenv.config()

// Initialize API driver
const circle = new Circle(
  process.env.API_KEY as string,
  CircleEnvironments.sandbox
);

function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function createCryptoPayment() {
  const createCryptoPaymentRes =
    await circle.paymentIntents.createPaymentIntent({
      idempotencyKey: uuidv4(),
      amount: {
        amount: "3.14",
        currency: "USD",
      },
      settlementCurrency: "USD",
      paymentMethods: [
        {
          chain: "SOL",
          type: "blockchain",
        },
      ],
    });
  return createCryptoPaymentRes.data.data?.id;
}

async function getCryptoPaymentAddress(id: any) {
  let cryptoPayment = await circle.paymentIntents.getPaymentIntent(id);

  do {
    await delay(500);
    cryptoPayment = await circle.paymentIntents.getPaymentIntent(id);
  } while (cryptoPayment.data.data?.paymentMethods[0].address === undefined)
  return cryptoPayment.data.data?.paymentMethods[0].address;
}

async function createAndAcquireCryptoPaymentAddress() {
  const cryptoPaymentId = await createCryptoPayment();
  const cryptoPaymentAddress = await getCryptoPaymentAddress(cryptoPaymentId);
  console.log(cryptoPaymentAddress);
}

createAndAcquireCryptoPaymentAddress();
