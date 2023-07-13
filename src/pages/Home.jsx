import Navbar from "../components/Navbar";
import { Table } from "antd";

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
    {
      u_id: 1,
      date: "13/08/20",
      center: "Dhaka Medical College",
      status: false,
      certificate_url: null,
      operator: "Abdur Razzaque",
    },
  ];
  const columns = [
    { title: "Vaccine Center", dataIndex: "center", Key: "center" },
    { title: "Vaccine Date", dataIndex: "date", Key: "date", sorter:(a,b)=>{a.date - b.date} },
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
      <div className="w-full mt-8 flex flex-col gap-4 justify-center px-20">
        {/* <Table dataSource={vaccineData} columns={columns} /> */}
      </div>
    </div>
  );
};

export default Home;
