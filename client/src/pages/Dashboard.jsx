import { useEffect, useState } from "react";
import axios from "axios";
import DashboardStats from "../components/DashboardStats";
import ActivityChart from "../components/AnalyticsPanel";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [stats, setStats] = useState({ posts: 0, comments: 0 });
  const [activity, setActivity] = useState({ byDay: [], byMonth: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get("/api/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data.stats || { posts: 0, comments: 0 });
        setActivity(res.data.activity || { byDay: [], byMonth: [] });
      } catch (err) {
        console.error("Error loading dashboard", err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [token]);

  if (loading)
    return <div className="p-6 text-center">Loading dashboard...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user?.name}</h1>

      <DashboardStats stats={stats} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <ActivityChart
          title="Posts by Day (last month)"
          labels={activity?.byDay?.map((i) => i.date) || []}
          data={activity?.byDay?.map((i) => i.count) || []}
        />
        <ActivityChart
          title="Comments by Month"
          labels={activity?.byMonth?.map((i) => i.month) || []}
          data={activity?.byMonth?.map((i) => i.count) || []}
        />
      </div>
    </div>
  );
};

export default Dashboard;
