import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import EquipmentTable from "../components/common/EquipmentTable";
import RequestsTable from "../components/common/RequestsTable";
import { getStudentEquipments } from "../services/equipmentService";
import { createStudentRequest, getStudentRequests } from "../services/requestService";

export default function StudentDashboard(){
  const [equipments, setEquipments] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const [eqRes, reqRes] = await Promise.all([getStudentEquipments(), getStudentRequests()]);
      setEquipments(eqRes.data);
      setRequests(reqRes.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load data");
    } finally { setLoading(false); }
  };

  useEffect(()=> { load(); }, []);

  const handleRequest = async (equipmentId) => {
    try {
      await createStudentRequest({ equipmentId, quantityRequested: 1 });
      await load();
      alert("Request submitted");
    } catch (err) { alert(err?.response?.data?.message ?? "Request failed"); }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 flex gap-6">
        <Sidebar />
        <main className="flex-1 space-y-6">
          <section className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Available Equipment</h2>
            {loading ? <p>Loading...</p> : <EquipmentTable equipments={equipments} showActions={true} onRequest={handleRequest} />}
          </section>

          <section className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">My Requests</h2>
            <RequestsTable requests={requests} isAdmin={false} />
          </section>
        </main>
      </div>
    </div>
  );
}
