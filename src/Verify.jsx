import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useNavigate } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
// import auth from "./auth";

function Verify() {
  const [code, setCode] = useState("");
  const nav = useNavigate();
  const verify = () => {
    if (code) {
      const dataToPost = new FormData();
      dataToPost.set("code", code);
      // auth
      //   .post("/verify", dataToPost)
      //   .then((res) => {
      //     console.log(res);
      //     localStorage.setItem("jwt", res.data.access_token);
      //   })
      //   .catch((err) => console.log(err));
    } else {
      toast.error("Please enter a code");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col min-w-screen justify-center">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="w-full lg:w-2/6 mx-auto lg:border lg:rounded-lg lg:shadow-lg bg-white">
        <AiOutlineHome
          onClick={() => nav("/")}
          className="fixed top-5 lg:top-10 left-5 lg:left-10 text-xl lg:text-3xl cursor-pointer"
        />
        <div className="lg:m-24">
          <div className="text-center text-2xl mb-2 lg:mb-4 font-medium">
            Verify your phone number
          </div>
          <div className="text-justify text-sm mb-4 lg:mb-8 text-gray-600 font-thin">
            *We've sent an SMS to your phone, please submit the given code to
            verify your number.
          </div>
          <div className="flex flex-col gap-y-4 px-5 lg:pr-0">
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="code" className="text-left">
                Code
              </Label>
              <Input
                onChange={(e) => setCode(e.target.value)}
                id="code"
                type="number"
                required={true}
                className="col-span-3"
              />
            </div>
            <div className="flex justify-center">
              <Button
                onClick={() => verify()}
                className="col-start-2 px-16"
                type="submit"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Verify;
