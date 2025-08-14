import {Streamchat} from "stream-chat";
import "dotenv/config";


const apiKey = process.env.STEAM_API_KEY;
const apiSecret = process.env.STEAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error("Missing Stream API KEY or SECRET credentials");
}

const streamClient = Streamchat.getInstance(apiKey, apiSecret);