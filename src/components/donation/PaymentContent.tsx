
import React from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import CardPaymentForm from "./CardPaymentForm";
import { EsewaIcon, IMEPayIcon, PaypalIcon, UPIIcon } from "./PaymentIcons";
import { Wallet } from "lucide-react";
import { Label } from "@/components/ui/label";

type PaymentContentProps = {
  paymentMethod: string;
  paymentDetails: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    name: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const PaymentContent = ({
  paymentMethod,
  paymentDetails,
  handleChange,
}: PaymentContentProps) => {
  return (
    <Tabs value={paymentMethod} className="w-full mt-4">
      <TabsContent value="card" className="space-y-4 mt-2">
        <CardPaymentForm paymentDetails={paymentDetails} onChange={handleChange} />
      </TabsContent>

      <TabsContent value="bank" className="space-y-4 mt-2">
        <div className="space-y-2">
          <Label>Bank Transfer Information</Label>
          <div className="rounded-md bg-blue-50 p-4">
            <p className="text-sm text-blue-700 font-medium mb-2">
              Please transfer the amount to:
            </p>
            <p className="text-sm">
              Account Name: <span className="font-medium">DonorTide Foundation</span><br />
              Account Number: <span className="font-medium">12345678</span><br />
              Routing Number: <span className="font-medium">087654321</span><br />
              Bank: <span className="font-medium">Global Trust Bank</span>
            </p>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="paypal" className="space-y-4 mt-2">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <PaypalIcon />
          <p className="mt-2 text-sm">
            You will be redirected to PayPal to complete your donation securely.
          </p>
          <div className="mt-3">
            <Button variant="outline" className="bg-[#0070ba] text-white hover:bg-[#005ea6] border-0">
              Continue to PayPal
            </Button>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="mobile" className="space-y-4 mt-2">
        <div className="space-y-2">
          <Label>Mobile Payment Options</Label>
          <div className="grid grid-cols-2 gap-3">
            {["IME Pay", "eSewa", "UPI", "Others"].map((method) => (
              <Button key={method} variant="outline" className="justify-start h-auto py-3">
                <div className="flex flex-col items-center w-full">
                  {method === "IME Pay" && <IMEPayIcon />}
                  {method === "eSewa" && <EsewaIcon />}
                  {method === "UPI" && <UPIIcon />}
                  {method === "Others" && <Wallet className="h-5 w-5" />}
                  <span className="mt-2 text-xs">{method}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </TabsContent>

      <TabsContent value="esewa" className="space-y-4 mt-2">
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <EsewaIcon />
          <p className="mt-2 text-sm">
            You will be redirected to eSewa to complete your payment.
          </p>
          <div className="mt-3">
            <Button variant="outline" className="bg-green-600 text-white hover:bg-green-700 border-0">
              Pay with eSewa
            </Button>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="imepay" className="space-y-4 mt-2">
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <IMEPayIcon />
          <p className="mt-2 text-sm">
            You will be redirected to IME Pay to complete your payment.
          </p>
          <div className="mt-3">
            <Button variant="outline" className="bg-purple-600 text-white hover:bg-purple-700 border-0">
              Pay with IME Pay
            </Button>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="upi" className="space-y-4 mt-2">
        <div className="space-y-2">
          <Label>UPI Payment</Label>
          <div className="rounded-md bg-gray-50 p-4 text-center">
            <UPIIcon />
            <p className="text-sm mt-2">
              Scan the QR code or enter UPI ID: <span className="font-medium">donate@donortide</span>
            </p>
            <div className="mt-3 bg-white p-4 inline-block rounded-md">
              <svg className="h-32 w-32 mx-auto" viewBox="0 0 100 100" fill="none">
                <rect x="10" y="10" width="80" height="80" fill="black" />
                <rect x="20" y="20" width="60" height="60" fill="white" />
                <rect x="30" y="30" width="10" height="10" fill="black" />
                <rect x="50" y="30" width="10" height="10" fill="black" />
                <rect x="30" y="50" width="10" height="10" fill="black" />
                <rect x="40" y="40" width="10" height="10" fill="black" />
                <rect x="60" y="40" width="10" height="10" fill="black" />
                <rect x="60" y="60" width="10" height="10" fill="black" />
              </svg>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default PaymentContent;
