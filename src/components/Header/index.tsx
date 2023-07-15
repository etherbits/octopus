import React from "react";
import NavBar from "../NavBar";
import UserCard from "../UserCard";

const Header = () => {
  return (
    <div className="flex items-center justify-between p-8">
      <NavBar />
      <UserCard />
    </div>
  );
};

export default Header;
