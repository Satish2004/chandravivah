import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
        <h2 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h2>
        {/* You can show created posts or stats here later */}
      </div>
    </div>
  );
};

export default Dashboard;
