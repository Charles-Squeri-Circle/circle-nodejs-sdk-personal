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
async function createBusinessWireAccount() {
  const createBusinessWireAccountRes =
    await circle.wires.createBusinessWireAccount({
      idempotencyKey: uuidv4(),
      accountNumber: "12340010",
      routingNumber: "121000248",
      billingDetails: {
        name: "Satoshi Nakamoto",
        city: "Boston",
        country: "US",
        line1: "100 Money Street",
        district: "MA",
        postalCode: "01234",
      },
      bankAddress: { country: "US" },
    });
  return createBusinessWireAccountRes.data.data?.id;
}

// GET: /v1/businessAccount/banks/wires/{id}/instructions
async function getBusinessWireAccountInstructions(id: any) {
  let depsoitInstructions = await circle.wires.getBusinessWireAccountInstructions(id);

  // Polling
  do {
    await delay(500);
    depsoitInstructions = await circle.wires.getBusinessWireAccountInstructions(id);
  } while (depsoitInstructions.data.data?.beneficiaryBank?.accountNumber === undefined);
  return depsoitInstructions.data.data;
}

// POST: /v1/mocks/payments/wire
async function createMockWireDeposit(depositInstructions: any) {
  const creatWireDepositRes =
    await circle.payments.createMockWirePayment({
      trackingRef: depositInstructions.trackingRef,
      amount: {
        amount: "3.14",
        currency: "USD"
      },
      beneficiaryBank: {
        accountNumber: depositInstructions.beneficiaryBank.accountNumber,
      }
      
    });
  return creatWireDepositRes.data.data;
}


async function wireDeposit() {
  const wireDepositAccountId = await createBusinessWireAccount();
  const depositInstructions = await getBusinessWireAccountInstructions(wireDepositAccountId);
  const deposit = await createMockWireDeposit(depositInstructions);
  console.log(deposit);
}

wireDeposit();
