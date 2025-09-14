import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import EquipmentTable from "../components/common/EquipmentTable";
import RequestsTable from "../components/common/RequestsTable";
import { 
  getAdminEquipments, 
  addEquipment, 
  deleteEquipment 
} from "../services/equipmentService";
import { 
  getAllRequestsAdmin, 
  approveRequest, 
  rejectRequest 
} from "../services/requestService";

export default function AdminDashboard() {
  const [equipments, setEquipments] = useState([]);
  const [requests, setRequests] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", totalQuantity: 1 });
  const [loadingEquip, setLoadingEquip] = useState(true);
  const [loadingReq, setLoadingReq] = useState(true);
  const [error, setError] = useState(null);

  // Load equipment
  const loadEquipments = async () => {
    setLoadingEquip(true);
    try {
      const res = await getAdminEquipments();
      setEquipments(res.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load equipments");
    } finally {
      setLoadingEquip(false);
    }
  };

  // Load requests
  const loadRequests = async () => {
    setLoadingReq(true);
    try {
      const res = await getAllRequestsAdmin();
      setRequests(res.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load requests");
    } finally {
      setLoadingReq(false);
    }
  };

  const loadAll = async () => {
    setError(null);
    await Promise.all([loadEquipments(), loadRequests()]);
  };

  useEffect(() => {
    loadAll();
  }, []);

  // Equipment handlers
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newItem.name.trim() || newItem.totalQuantity < 1) return;
    try {
      await addEquipment(newItem);
      setNewItem({ name: "", totalQuantity: 1 });
      await loadEquipments();
    } catch (err) {
      console.error(err);
      setError("Failed to add equipment");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this equipment?")) return;
    try {
      await deleteEquipment(id);
      await loadEquipments();
    } catch (err) {
      console.error(err);
      setError("Failed to delete equipment");
    }
  };

  // Request handlers
  const handleApprove = async (id) => {
    try {
      await approveRequest(id);
      await loadRequests();
    } catch (err) {
      console.error(err);
      setError("Failed to approve request");
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectRequest(id);
      await loadRequests();
    } catch (err) {
      console.error(err);
      setError("Failed to reject request");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 flex gap-6">
        <Sidebar />
        <main className="flex-1 space-y-6">

          {error && (
            <div className="bg-red-100 text-red-800 p-3 rounded">
              {error}
            </div>
          )}

          {/* Add Equipment */}
          <section className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Add Equipment</h2>
            <form onSubmit={handleAdd} className="flex gap-3">
              <input
                required
                placeholder="Name"
                value={newItem.name}
                onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                className="p-2 border rounded flex-1"
              />
              <input
                required
                type="number"
                min="1"
                value={newItem.totalQuantity}
                onChange={e => setNewItem({ ...newItem, totalQuantity: Number(e.target.value) })}
                className="p-2 border rounded w-36"
              />
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
                Add
              </button>
            </form>
          </section>

          {/* Inventory Table */}
          <section className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Inventory</h2>
            {loadingEquip ? (
              <p>Loading equipment...</p>
            ) : (
              <EquipmentTable
                equipments={equipments}
                showActions={true}
                onDelete={handleDelete}
              />
            )}
          </section>

          {/* Requests Table */}
          <section className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Manage Requests</h2>
            {loadingReq ? (
              <p>Loading requests...</p>
            ) : (
              <RequestsTable
                requests={requests}
                isAdmin={true}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            )}
          </section>

        </main>
      </div>
    </div>
  );
}
