// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreatePost from "./pages/CreatePost";
import PostDetail from "./pages/PostDetail";
import AdminPanel from "./pages/AdminPanel";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import EditPost from "./pages/EditPost";

function App() {
  return (
    <>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/edit/:id" element={<EditPost />} />

          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
