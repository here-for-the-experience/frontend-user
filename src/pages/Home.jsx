import Navbar from "../components/Navbar";

const Home = () => {
  const vaccineData = [
    {
      u_id: 1,
      date: "13/07/20",
      center: "Dhaka Medical College",
      status: false,
      certificate_url: null,
      operator: "Abdur Rahim",
    },
  ];
  const userData = [
    {
      name: "John",
      phone: "123",
    },
  ];
  const columns = [
    { title: "Vaccine Center", dataIndex: "center", Key: "center" },
    {
      title: "Vaccine Date",
      dataIndex: "date",
      Key: "date",
      sorter: (a, b) => {
        a.date - b.date;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      Key: "center",
      render: (order, record) => {
        return <div>{record.status === false ? <div>false</div> : "true"}</div>;
      },
    },
    { title: "Operator", dataIndex: "operator", Key: "operator" },
    { title: "Action", dataIndex: "certificate_url", Key: "certificate_url" },
  ];
  return (
    <div>
      <Navbar />
      <div>
        <div className="m-10 border-l-2 border-l-black border-r-2 border-r-black rounded-lg shadow-md p-10">
          {userData.map((item, i) => {
            return (
              <div key={i}>
                {/* Title */}

                <div className="flex justify-between items-center gap-x-2 mb-16">
                  <hr className="w-1/6 border border-gray-300" />
                  <div className="text-gray-500">Personal Information</div>
                  <hr className="w-4/6 border border-gray-300" />
                </div>

                <div className="px-16 flex flex-col gap-6">
                  <div className="">
                    <b>Name:</b> {item.name}
                  </div>
                  <div className="">
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

                <div className="flex justify-between items-center gap-x-2 my-16">
                  <hr className="w-1/6 border border-gray-300" />
                  <div className="text-gray-500">Vaccine Information</div>
                  <hr className="w-4/6 border border-gray-300" />
                </div>

                <div className="px-16 flex flex-col gap-6">
                  <div className="">
                    <b>Center:</b> {item.center}
                  </div>
                  <div className="">
                    <b>Date:</b> {item.date}
                  </div>
                  <div className="">
                    <b>Status:</b>{" "}
                    {item.status === false ? (
                      <div className="text-yellow-500 inline">Pending</div>
                    ) : (
                      <div className="text-green-500 inline">Complete</div>
                    )}
                  </div>
                  <div className="">
                    <b>Certificate:</b>{" "}
                    {item.certificate_url ? (
                      <button className="hover:underline">Download</button>
                    ) : (
                      "Not available yet"
                    )}
                  </div>
                  <div className="">
                    <b>Operator:</b> {item.operator}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* <div className="w-full mt-8 flex flex-col gap-4 justify-center px-20">
        <Table dataSource={vaccineData} columns={columns} />
      </div> */}
    </div>
  );
};

export default Home;
