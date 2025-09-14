import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { login as loginApi } from "../services/authService";

export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ username: "", password: "", role: "STUDENT" });

  const handle = async (e) => {
    e.preventDefault();
    try {
      const res = await loginApi({ username: form.username, password: form.password, role: form.role });
      const { token, user } = res.data;
      login(user, token);
    } catch (err) {
      alert(err?.response?.data?.message ?? "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handle} className="w-96 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <input name="username" value={form.username} onChange={e=>setForm({...form, username:e.target.value})} placeholder="Username" className="w-full p-2 border rounded mb-3" />
        <input name="password" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} placeholder="Password" className="w-full p-2 border rounded mb-3" />
        <select name="role" value={form.role} onChange={e=>setForm({...form, role:e.target.value})} className="w-full p-2 border rounded mb-4">
          <option value="STUDENT">Student</option>
          <option value="ADMIN">Admin</option>
        </select>
        <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
}
