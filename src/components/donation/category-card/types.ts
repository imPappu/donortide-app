
import React from "react";

export interface DonationCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  iconId?: string;
}
