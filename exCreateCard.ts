import { Circle, CircleEnvironments, CardCreationRequest, BillingDetails, MetadataCardAndAch } from "@circle-fin/circle-sdk";
import { v4 as uuidv4 } from 'uuid';

// The 3 below packages are only needed for this example
const openpgp = require('openpgp');
const atob = require('atob');
const btoa = require('btoa');

// Create a file named .env within the root of the project that has one line item with you API Key like so
// API_KEY="???"
import * as dotenv from "dotenv";
dotenv.config();

// Initialize API driver
const circle = new Circle(
  process.env.API_KEY as string,
  CircleEnvironments.sandbox
);

// This function can be removed once integrated with client app
async function encryptCard() {
    const encryptionRes = await circle.encryption.getPublicKey()
    const decodedPublicKey = atob(encryptionRes.data.data?.publicKey);

    const options = {
        message: await openpgp.createMessage({ text: JSON.stringify({number: '4007400000000007', cvv: '123' }) }),
        encryptionKeys: await openpgp.readKey({ armoredKey: decodedPublicKey })
    }
    
    const ciphertext = await openpgp.encrypt(options);
    return btoa(ciphertext);
}

async function createCard() {
    
    // Encrypted data must be provided by your client app i.e. website, iOS and Andriod app.
    // Card Number and CVV should not be provided to Server unencrypted.
    const encryptedData = await encryptCard();
    
    const billingDetails: BillingDetails = {
        name: 'Customer 0001',
        line1: 'Test',
        postalCode: '11111',
        city: 'Test City',
        district: 'MA',
        country: 'US',
    }
    const metadata: MetadataCardAndAch = {
        phoneNumber: '+12025550180',
        email: 'customer-0001@circle.com',
        sessionId: 'DE6FA86F60BB47B379307F851E238617',
        ipAddress: '244.28.239.130'
    } 
    const cardReq: CardCreationRequest = {
        idempotencyKey: uuidv4(),
        billingDetails: billingDetails,
        metadata: metadata,
        encryptedData: encryptedData,
        expMonth: 1,
        expYear: 2025,
        keyId: 'key1'
    };
    const cardsResp = await circle.cards.createCard(cardReq);
    console.log(cardsResp.data);
}
createCard();