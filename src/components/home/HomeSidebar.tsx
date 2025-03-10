
import React from "react";
import UserStats from "./UserStats";
import UpcomingEvents from "./UpcomingEvents";

const HomeSidebar = () => {
  return (
    <div className="hidden lg:block">
      <div className="sticky top-24 space-y-6">
        <UserStats />
        <UpcomingEvents />
      </div>
    </div>
  );
};

export default HomeSidebar;
