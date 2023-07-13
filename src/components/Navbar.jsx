import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "../ui/menubar";

function Navbar() {
  return (
    <div className="flex justify-between items-center border-b border-b-black py-2 px-4 lg:p-4 lg:px-24">
      <button
        className="font-medium"
        onClick={() => (window.location.pathname = "/")}
      >
        Vaccination
      </button>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger className="cursor-pointer">Profile</MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="cursor-pointer">Login</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => (window.location.pathname = "/login")}>
              Using Email-Password
            </MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Using social media</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Google</MenubarItem>
                <MenubarItem>Facebook</MenubarItem>
                <MenubarItem>Github</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}

export default Navbar;
