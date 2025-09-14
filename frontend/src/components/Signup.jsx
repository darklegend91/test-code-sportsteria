import React, { useState } from "react";
import { signup as apiSignup } from "../services/authService";
import { useNavigate } from "react-router-dom";

function validatePassword(p) {
  // at least 8 chars, one letter, one number
  return /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(p);
}

export default function Signup(){
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "", fullName: "", email: "", role: "STUDENT" });
  const [loading, setLoading] = useState(false);

  const handle = async (e) => {
    e.preventDefault();
    if (!validatePassword(form.password)) return alert("Password must be 8+ chars and include letters & numbers");
    setLoading(true);
    try {
      await apiSignup(form);
      alert("Signup success. Please login.");
      navigate("/login");
    } catch (err) {
      alert(err?.response?.data?.message ?? "Signup failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handle} className="w-96 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Sign up</h2>
        <input required placeholder="Full name" value={form.fullName} onChange={e=>setForm({...form, fullName:e.target.value})} className="w-full p-2 border rounded mb-3" />
        <input required placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="w-full p-2 border rounded mb-3" />
        <input required placeholder="Username" value={form.username} onChange={e=>setForm({...form, username:e.target.value})} className="w-full p-2 border rounded mb-3" />
        <input required type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} className="w-full p-2 border rounded mb-3" />
        <select value={form.role} onChange={e=>setForm({...form, role:e.target.value})} className="w-full p-2 border rounded mb-4">
          <option value="STUDENT">Student</option>
          <option value="ADMIN">Admin</option>
        </select>
        <button disabled={loading} className="w-full bg-green-600 text-white py-2 rounded">{loading ? "Signing..." : "Sign up"}</button>
      </form>
    </div>
  );
}
