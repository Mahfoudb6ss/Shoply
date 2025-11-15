export type CheckoutPayload = {
  amount: number;
  currency?: string;
  orderId: string;
  customerEmail: string;
};

export const createMockPaymentIntent = async ({
  amount,
  currency = "usd",
  orderId,
  customerEmail
}: CheckoutPayload) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return {
    id: `pi_${orderId}`,
    clientSecret: `secret_${orderId}`,
    amount,
    currency,
    customerEmail
  };
};

