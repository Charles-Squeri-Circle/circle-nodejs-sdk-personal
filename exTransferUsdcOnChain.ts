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

// GET: /v1/configuration
async function getWalletMasterId() {
  const getWalletMasterIdRes = await circle.management.getAccountConfig();
  return getWalletMasterIdRes.data.data?.payments?.masterWalletId;
}

// POST: /v1/transfers
async function createTransfer(walletMasterId: any, ethAddress: string) {
  const createTransferRes = await circle.transfers.createTransfer({
    idempotencyKey: uuidv4(),
    source: {
      type: "wallet",
      id: walletMasterId,
      identities: [
        {
          type: "individual",
          name: "Satoshi Nakamoto",
          addresses: [
            {
              line1: '100 Money Street',
              city: 'Boston',
              district: 'MA',
              postalCode: '01234',
              country: 'US'
            }
          ]
        }
      ]
    },
    amount: {
      amount: "3.14",
      currency: "USD"
    },
    destination: {
      type: "blockchain",
      chain: "ETH",
      address: ethAddress
    }
  });
  return createTransferRes.data.data;
}

async function transferUsdcOnChainTo(ethAddress: string) {
  const walletMasterId = await getWalletMasterId();
  const transfer = await createTransfer(walletMasterId, ethAddress);
  console.log(transfer);
}

transferUsdcOnChainTo("0xB7bFFd45707EfF71047D34b9912524D8C659628d");
