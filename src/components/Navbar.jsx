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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useGlobalState } from "../Context";
import { prefix } from "../prefix";
import api from "../api";

function Navbar({ status }) {
  const [isLoggedIn, setIsLoggedIn] = useGlobalState("isLoggedIn");
  const [data, setData] = useGlobalState("data");
  const [user, setUser] = useGlobalState("user");
  const logout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    window.location.pathname = "/login";
  };

  const registerVaccine = () => {
    api
      .post("/create", {
        token: localStorage.getItem("jwt"),
      })
      .then((res) => {
        api
          .post("/myvaccine", {
            token: localStorage.getItem("jwt"),
          })
          .then((res) => {
            let toUpdateKeys = [
              "id",
              "user_id",
              "vaccination_date",
              "vaccine_id",
              "verified",
              "created_at",
              "certificate_url",
            ];
            let profile = res.data[0];
            Object.keys(data).forEach((k) => {
              if (toUpdateKeys.includes(k)) {
                data[k] = profile[k];
              }
            });
            setData(data);
            window.location.reload();
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex justify-between items-center border-b border-b-black py-2 px-4 lg:p-4 lg:px-24">
      <button
        className="font-medium"
        onClick={() => (window.location.pathname = "/")}
      >
        Vaccination
      </button>
      <Menubar>
        {user.role_id === 2 ? (
          <MenubarMenu>
            <MenubarTrigger
              onClick={() => {
                window.location.href = `https://${prefix}admin.redevops.store`;
              }}
              className="cursor-pointer"
            >
              Admin panel
            </MenubarTrigger>
          </MenubarMenu>
        ) : (
          ""
        )}
        {!status ? (
          <MenubarMenu>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <MenubarTrigger className="cursor-pointer">
                  Register for vaccine
                </MenubarTrigger>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to register for vaccine?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    The Hospital will allocate an available date and dose of
                    vaccine, please read it carefully and bring your vaccine
                    card on the mentioned date.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => registerVaccine()}>
                    Register
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </MenubarMenu>
        ) : (
          ""
        )}

        {isLoggedIn ? (
          <MenubarMenu>
            <MenubarTrigger className="cursor-pointer">
              {user.name}
            </MenubarTrigger>
          </MenubarMenu>
        ) : (
          ""
        )}
        {user.name ? (
          <MenubarMenu>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <MenubarTrigger className="cursor-pointer">
                  Logout
                </MenubarTrigger>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure to logout?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => logout()}>
                    Logout
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </MenubarMenu>
        ) : (
          <MenubarMenu>
            <MenubarTrigger className="cursor-pointer">Login</MenubarTrigger>
            <MenubarContent>
              <MenubarItem
                onClick={() => (window.location.pathname = "/login")}
              >
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
        )}
      </Menubar>
    </div>
  );
}

export default Navbar;
