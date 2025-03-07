
export type PaymentGatewayField = {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
};

export type GatewayConfig = {
  name: string;
  description: string;
  fields: PaymentGatewayField[];
};

export const gatewayConfigs: Record<string, GatewayConfig> = {
  paypal: {
    name: "PayPal",
    description: "Accept payments via PayPal",
    fields: [
      {
        id: "paypal_client_id",
        label: "Client ID",
        placeholder: "PayPal Client ID",
      },
      {
        id: "paypal_secret",
        label: "Client Secret",
        type: "password",
        placeholder: "PayPal Secret",
      },
      {
        id: "paypal_mode",
        label: "Mode",
        placeholder: "Select mode",
      },
    ],
  },
  stripe: {
    name: "Stripe",
    description: "Accept payments via Stripe",
    fields: [
      {
        id: "stripe_public_key",
        label: "Public Key",
        placeholder: "Stripe Public Key",
      },
      {
        id: "stripe_secret_key",
        label: "Secret Key",
        type: "password",
        placeholder: "Stripe Secret Key",
      },
      {
        id: "stripe_webhook_secret",
        label: "Webhook Secret",
        type: "password",
        placeholder: "Stripe Webhook Secret",
      },
    ],
  },
  esewa: {
    name: "eSewa",
    description: "Accept payments via eSewa (Nepal)",
    fields: [
      {
        id: "esewa_merchant_id",
        label: "Merchant ID",
        placeholder: "eSewa Merchant ID",
      },
      {
        id: "esewa_secret_key",
        label: "Secret Key",
        type: "password",
        placeholder: "eSewa Secret Key",
      },
    ],
  },
  imepay: {
    name: "IME Pay",
    description: "Accept payments via IME Pay",
    fields: [
      {
        id: "ime_merchant_code",
        label: "Merchant Code",
        placeholder: "IME Pay Merchant Code",
      },
      {
        id: "ime_module_id",
        label: "Module ID",
        placeholder: "IME Pay Module ID",
      },
      {
        id: "ime_secret",
        label: "Secret Key",
        type: "password",
        placeholder: "IME Pay Secret Key",
      },
    ],
  },
  upi: {
    name: "UPI",
    description: "Accept payments via UPI",
    fields: [
      {
        id: "upi_id",
        label: "UPI ID",
        placeholder: "your-upi-id@provider",
      },
      {
        id: "upi_merchant_name",
        label: "Merchant Name",
        placeholder: "Your Business Name",
      },
    ],
  },
};
