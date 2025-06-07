import { PaystackButton } from "react-paystack";

interface PaystackPaymentProps {
  email: string;
  amount: number;
  onSuccess: (reference: string) => void;
}

interface PaystackResponse {
  reference: string;
  transaction: string;
  status: string;
  message: string;
  [key: string]: unknown;
}

const PaystackPayment = ({
  email,
  amount,
  onSuccess,
}: PaystackPaymentProps) => {
  const publicKey = "pk_test_ad0c3a20d373e3fd686cfef8c143f0baa4ab09fe"; // Replace with your Paystack public key

  const componentProps = {
    email,
    amount: amount * 100, // Paystack uses smallest currency (pesewas)
    publicKey,
    currency: "GHS",
    text: "Pay Now",
    onSuccess: (response: PaystackResponse) => {
      onSuccess(response.reference);
    },
    onClose: () => alert("Transaction cancelled"),
  };

  return <PaystackButton {...componentProps} />;
};

export default PaystackPayment;
