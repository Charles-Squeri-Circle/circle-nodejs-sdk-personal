import { Circle, CircleEnvironments } from "@circle-fin/circle-sdk";
import { v4 as uuidv4 } from "uuid";

// Create a file named .env within the root of the project that has one line item with you API Key like so
// API_KEY="???"
import * as dotenv from "dotenv";
dotenv.config();

// Initialize API driver
const circle = new Circle(
  process.env.API_KEY as string,
  CircleEnvironments.sandbox
);

function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

// POST: /v1/businessAccount/banks/wires
async function createWireAccount() {
  const createWireAccountRes = await circle.wires.createWireAccount({
    idempotencyKey: uuidv4(),
    accountNumber: "12340011",
    routingNumber: "121000248",
    billingDetails: {
      name: "John Smith",
      city: "Boston",
      country: "US",
      line1: "100 Money Street",
      district: "MA",
      postalCode: "01234",
    },
    bankAddress: { country: "US" },
  });
  return createWireAccountRes.data.data?.id;
}

// GET: /v1//banks/wires/{id}
async function wireAccountReady(id: any) {
  let wireAccount = await circle.wires.getWireAccount(id);

  // Polling
  do {
    await delay(500);
    wireAccount = await circle.wires.getWireAccount(id);
  } while (wireAccount.data.data?.status !== "complete");
  return wireAccount.data.data?.id;
}

// GET: /v1/configuration
async function getWalletMasterId() {
  const getWalletMasterIdRes = await circle.management.getAccountConfig();
  return getWalletMasterIdRes.data.data?.payments?.masterWalletId;
}

// POST: /v1/payouts
async function createPayout(id: any, walletMasterId: any) {
  const creatWireDepositRes = await circle.payouts.createPayout({
    idempotencyKey: uuidv4(),
    source: {
      type: "wallet",
      id: walletMasterId,
    },
    destination: {
      type: "wire",
      id: id,
    },
    amount: {
      amount: "3.14",
      currency: "USD",
    },
    metadata: {
      beneficiaryEmail: "john@circle.com",
    },
  });
  return creatWireDepositRes.data.data;
}

async function wirePayout() {
  const wireAccountId = await createWireAccount();
  const walletMasterId = await getWalletMasterId();
  await wireAccountReady(wireAccountId);
  const payout = await createPayout(wireAccountId, walletMasterId);
  console.log(payout);
}

wirePayout();
