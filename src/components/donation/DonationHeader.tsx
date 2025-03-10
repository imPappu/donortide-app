
import React from "react";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

const DonationHeader = () => {
  return (
    <div className="bg-blue-600 text-white p-5">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-white">Make a Donation</DialogTitle>
        <p className="text-blue-100 mt-2">Your contribution makes a difference</p>
      </DialogHeader>
    </div>
  );
};

export default DonationHeader;
