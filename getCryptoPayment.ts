import { Circle, CircleEnvironments } from "@circle-fin/circle-sdk";

// Initialize API driver
const circle = new Circle(
  "<your-api-key>",
  CircleEnvironments.sandbox // API base url
);

async function getCryptoPayment(id: string) {
  const cryptoPayment = await circle.paymentIntents.getPaymentIntent(id);
  console.log(cryptoPayment);
}

getCryptoPayment("480bcd73-75a5-4598-9c88-eefae82b02fc");
