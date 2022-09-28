"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const circle_sdk_1 = require("@circle-fin/circle-sdk");
// Initialize API driver
const circle = new circle_sdk_1.Circle('QVBJX0tFWTpiOGY5ZTNjNTg1YWEyMzcwMGM1YzQwNjE0Y2M5YjA0YTo1NjU4ZTQ4Yjk2MDRlMjcxMzQ2ZjIxMGMzMzU3MzZiOQ==', circle_sdk_1.CircleEnvironments.sandbox // API base url
);
function listSubscription() {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const listSubscribeResp = yield circle.subscriptions.listSubscriptions();
        console.log((_a = listSubscribeResp.data.data) === null || _a === void 0 ? void 0 : _a.length);
        if ((_b = listSubscribeResp.data.data) === null || _b === void 0 ? void 0 : _b.length) {
            for (let i = 0; i < ((_c = listSubscribeResp.data.data) === null || _c === void 0 ? void 0 : _c.length); i++) {
                console.log(listSubscribeResp.data.data[i]);
            }
        }
    });
}
// async function createSubscription() {
//     const subscribeReq: SubscriptionRequest = {
//         endpoint: "https://742ef341af57c9.lhrtunnel.link"
//     };
//     const subscribeResp = await circle.subscriptions.subscribe(subscribeReq);
//     console.log(subscribeResp.data);
// }
listSubscription();
// createSubscription();
