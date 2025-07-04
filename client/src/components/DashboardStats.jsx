const DashboardStats = ({ stats }) => (
  <div className="flex justify-around bg-white p-6 rounded shadow">
    <div className="text-center">
      <p className="text-4xl font-bold">{stats.posts}</p>
      <p className="text-gray-500">My Posts</p>
    </div>
    <div className="text-center">
      <p className="text-4xl font-bold">{stats.comments}</p>
      <p className="text-gray-500">My Comments</p>
    </div>
  </div>
);

export default DashboardStats;
