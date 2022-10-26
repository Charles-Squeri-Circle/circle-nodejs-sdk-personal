import { Circle, CircleEnvironments } from "@circle-fin/circle-sdk";

// Create a file named .env within the root of the project that has one line item with you API Key like so
// API_KEY="???"
import * as dotenv from "dotenv";
dotenv.config();

// Initialize API driver
const circle = new Circle(
  process.env.API_KEY as string,
  CircleEnvironments.sandbox
);


// Pull your Circle Account balance
async function listBalances() {
  const balancesRes = await circle.balances.listBalances();
  console.log(JSON.stringify(balancesRes.data));
}
listBalances();
