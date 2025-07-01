import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-100 h-screen p-4 shadow-md">
      <h2 className="text-xl font-bold mb-6">Dashboard Menu</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/create" className="text-blue-500 hover:underline">
            ➕ Create New Post
          </Link>
        </li>
        <li>
          <Link to="/dashboard" className="text-blue-500 hover:underline">
            📊 My Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin" className="text-blue-500 hover:underline">
            🛠 Admin Panel
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
