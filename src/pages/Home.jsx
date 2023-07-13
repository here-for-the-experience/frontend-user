import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import vaccineData from "../vaccineData";
import { useGlobalState } from "../Context";
import api from "../api";

const Home = () => {
  const [user, setUser] = useGlobalState("user");
  const [isLoggedIn, setIsLoggedIn] = useGlobalState("isLoggedIn");
  const [vaccineData, setVaccineData] = useState([]);

  const download = () => {
    const link = document.createElement("a");
    link.href = `${vaccineData.certificate_url}`;
    link.download = "certificate.jpg";
    link.click();
  };

  useEffect(() => {
    api
      .post("/create", {
        token: localStorage.getItem("jwt"),
      })
      .then(() =>
        api
          .post("/myvaccine", {
            token: localStorage.getItem("jwt"),
          })
          .then((res) => setVaccineData(res.data[0]))
          .catch((err) => console.log(err))
      )
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <div className="m-10 border-l-2 border-l-black border-r-2 border-r-black rounded-lg shadow-md p-4 lg:p-10">
          <div>
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
                <b>Name:</b> {user.name}
              </div>
              <div data-testid="phone" className="">
                <b>Phone:</b> {user.phone}
              </div>
            </div>
          </div>
          <div>
            {/* Title */}

            <div className="flex justify-between items-center gap-x-2 my-8 lg:my-16">
              <hr className="w-1/6 border border-gray-300" />
              <div className="text-gray-500 text-xs lg:text-lg">
                Vaccine Information
              </div>
              <hr className="w-4/6 border border-gray-300" />
            </div>

            <div className="px-2 lg:px-16 flex flex-col gap-6">
              <div data-testid="date" className="">
                <b>Date:</b> {vaccineData.vaccination_date}
              </div>
              <div data-testid="status" className="">
                <b>Status:</b>{" "}
                {user.status === false ? (
                  <div className="text-yellow-500 inline">Pending</div>
                ) : (
                  <div className="text-green-500 inline">Complete</div>
                )}
              </div>
              <div data-testid="cert" className="">
                <b>Certificate:</b>{" "}
                {vaccineData.certificate_url ? (
                  <button
                    className="hover:underline"
                    onClick={() => download()}
                  >
                    Download
                  </button>
                ) : (
                  "Not available yet"
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
