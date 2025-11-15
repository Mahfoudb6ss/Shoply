import ky from "ky";

export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  hooks: {
    beforeRequest: [
      request => {
        request.headers.set("Accept", "application/json");
      }
    ]
  }
});

