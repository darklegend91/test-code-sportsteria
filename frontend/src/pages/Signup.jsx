import React, { useState } from "react";
import { signup as signupApi } from "../services/authService";
import { useNavigate } from "react-router-dom";

function validatePassword(p) {
  // at least 8 chars, one letter, one number
  return /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(p);
}

export default function Signup() {
  const [form, setForm] = useState({ username: "", password: "", fullName: "", email: "", role: "STUDENT" });
  const navigate = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    if (!validatePassword(form.password)) return alert("Password must be 8+ chars and include letters & numbers");
    try {
      await signupApi({ username: form.username, password: form.password, fullName: form.fullName, role: form.role, email:form.email });
      alert("Signup success. Login now.");
      navigate("/login");
    } catch (err) {
      alert(err?.response?.data?.message ?? "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handle} className="w-96 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Sign up</h2>
        <input placeholder="Full name" value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} className="w-full p-2 border rounded mb-3" required />
        <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full p-2 border rounded mb-3" required />
        <input placeholder="Username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} className="w-full p-2 border rounded mb-3" required />
        <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="w-full p-2 border rounded mb-3" required />
        <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className="w-full p-2 border rounded mb-4">
          <option value="STUDENT">Student</option>
          <option value="ADMIN">Admin</option>
        </select>
        <button className="w-full bg-green-600 text-white py-2 rounded">Sign up</button>
      </form>
    </div>
  );
}
