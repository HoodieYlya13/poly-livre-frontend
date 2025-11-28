import { APP_NAME } from "@/utils/constants";
import { NextResponse } from "next/server";

export async function POST() {
  const options = {
    challenge: "c29tZS1yYW5kb20tZGF0YQ", // FIXME: random-data
    rp: {
      name: APP_NAME,
      id: "localhost",
    },
    user: {
      // User ID must be a valid Base64URL string
      id: "dXNlci1pZA", // "user-id"
      name: "user@example.com",
      displayName: "User Example",
    },
    pubKeyCredParams: [
      { alg: -7, type: "public-key" }, // ES256
      { alg: -257, type: "public-key" }, // RS256
    ],
    timeout: 60000,
    attestation: "none",
    excludeCredentials: [],
    authenticatorSelection: {
      authenticatorAttachment: "platform",
      userVerification: "preferred",
      requireResidentKey: false,
    },
  };

  return NextResponse.json(options);
}
