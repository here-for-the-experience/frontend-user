import React from "react";
import Navbar from "../components/Navbar";
import vaccineData from "../vaccineData";
import { useGlobalState } from "../Context";

const Home = () => {
  const [user, setUser] = useGlobalState("user");
  const [isLoggedIn, setIsLoggedIn] = useGlobalState("isLoggedIn");
  const userData = [
    {
      name: "John",
      phone: "123",
    },
  ];
  return (
    <div>
      <Navbar />
      <div>
        <div className="m-10 border-l-2 border-l-black border-r-2 border-r-black rounded-lg shadow-md p-4 lg:p-10">
          {userData.map((item, i) => {
            return (
              <div key={i}>
                {/* Title */}

                <div className="flex justify-between items-center gap-x-2 mb-8 lg:mb-16">
                  <hr className="w-1/6 border border-gray-300" />
                  <div className="text-gray-500 text-xs lg:text-lg">
                    Personal Information
                  </div>
                  <hr className="w-4/6 border border-gray-300" />
                </div>

                <div className="px-2 lg:px-16 flex flex-col gap-6">
                  <div data-testid="name" className="">
                    <b>Name:</b> {item.name}
                  </div>
                  <div data-testid="phone" className="">
                    <b>Phone:</b> {item.phone}
                  </div>
                </div>
              </div>
            );
          })}
          {vaccineData.map((item, i) => {
            return (
              <div key={i}>
                {/* Title */}

                <div className="flex justify-between items-center gap-x-2 my-8 lg:my-16">
                  <hr className="w-1/6 border border-gray-300" />
                  <div className="text-gray-500 text-xs lg:text-lg">
                    Vaccine Information
                  </div>
                  <hr className="w-4/6 border border-gray-300" />
                </div>

                <div className="px-2 lg:px-16 flex flex-col gap-6">
                  <div data-testid="center" className="">
                    <b>Center:</b> {item.center}
                  </div>
                  <div data-testid="date" className="">
                    <b>Date:</b> {item.date}
                  </div>
                  <div data-testid="status" className="">
                    <b>Status:</b>{" "}
                    {item.status === false ? (
                      <div className="text-yellow-500 inline">Pending</div>
                    ) : (
                      <div className="text-green-500 inline">Complete</div>
                    )}
                  </div>
                  <div data-testid="cert" className="">
                    <b>Certificate:</b>{" "}
                    {item.certificate_url ? (
                      <button className="hover:underline">Download</button>
                    ) : (
                      "Not available yet"
                    )}
                  </div>
                  <div data-testid="operator" className="">
                    <b>Operator:</b> {item.operator}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;