import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useGlobalState } from "../Context";
import api from "../api";

const link = document.createElement("a");
const Home = () => {
  const [user, setUser] = useGlobalState("user");
  const [data, setData] = useGlobalState("data");
  const download = () => {
    link.href = `${
      data.certificate_url
        ? `${data.certificate_url}`
        : "https://www.wits.ac.za/media/wits-university/mandatory-vaccinations/images/Vaccination%20policy%20400x4002.jpg"
    }`;
    link.download = "certificate.jpg";
    link.click();
  };

  useEffect(() => {
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
      })
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
                <b>Email:</b> {user.email}
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
                <b>Date:</b>{" "}
                {data.vaccination_date ? data.vaccination_date : "2023-07-14"}
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
                <button
                  data-testid="img"
                  className="hover:underline"
                  onClick={() => download()}
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
