import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { login as apiLogin } from "../services/authService";

export default function Login(){
  const { login } = useAuth();
  const [form, setForm] = useState({ username: "", password: "", role: "STUDENT" });
  const [loading, setLoading] = useState(false);

  const handle = async (e)=> {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apiLogin({ username: form.username, password: form.password, role: form.role });
      login(res.data.user, res.data.token);
    } catch (err) {
      alert(err?.response?.data?.message ?? "Login failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handle} className="w-96 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <input required placeholder="Username" value={form.username} onChange={e=>setForm({...form, username:e.target.value})} className="w-full p-2 border rounded mb-3" />
        <input required type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} className="w-full p-2 border rounded mb-3" />
        <select value={form.role} onChange={e=>setForm({...form, role:e.target.value})} className="w-full p-2 border rounded mb-4">
          <option value="STUDENT">Student</option>
          <option value="ADMIN">Admin</option>
        </select>
        <button disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded">{loading ? "Logging..." : "Login"}</button>
      </form>
    </div>
  );
}
