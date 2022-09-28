import { Circle, CircleEnvironments, CardCreationRequest, BillingDetails, MetadataCardAndAch } from "@circle-fin/circle-sdk";

// Initialize API driver
const circle = new Circle(
    '<your-api-key>',
    CircleEnvironments.sandbox      // API base url
);

// Pull your Circle Account balance
async function getBalances() {
    const balancesResp = await circle.balances.getBalances();
    console.log(balancesResp.data);
}
getBalances();