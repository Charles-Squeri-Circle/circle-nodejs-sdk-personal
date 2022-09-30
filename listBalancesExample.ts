import { Circle, CircleEnvironments } from "@circle-fin/circle-sdk";

// Initialize API driver
const circle = new Circle(
  "<your-api-key>",
  CircleEnvironments.sandbox // API base url
);

// Pull your Circle Account balance
async function listBalances() {
  const balancesRes = await circle.balances.listBalances();
  console.log(balancesRes.data);
}
listBalances();
