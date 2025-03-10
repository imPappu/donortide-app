
import React from "react";

const VerificationInfo = () => {
  return (
    <div className="rounded-md bg-muted p-3 mt-4">
      <p className="text-sm">
        Why verify your account?
      </p>
      <ul className="list-disc list-inside text-sm mt-2 space-y-1">
        <li>Confirm you're a real person</li>
        <li>Access all features of the platform</li>
        <li>Enhance trust with other users</li>
        <li>Protect your account from misuse</li>
      </ul>
    </div>
  );
};

export default VerificationInfo;
