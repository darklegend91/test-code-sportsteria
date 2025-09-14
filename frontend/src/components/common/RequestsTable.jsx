import React from "react";

export default function RequestsTable({ requests = [], isAdmin = false, onApprove, onReject }) {
  return (
    <div className="overflow-x-auto shadow rounded bg-white">
      <table className="min-w-full">
        <thead className="bg-gray-50 text-xs text-gray-700 uppercase">
          <tr>
            <th className="px-4 py-3 text-left">Equipment</th>
            <th className="px-4 py-3 text-left">Student</th>
            <th className="px-4 py-3 text-left">Quantity</th>
            <th className="px-4 py-3 text-left">Status</th>
            {isAdmin && <th className="px-4 py-3">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {requests.length === 0 && (
            <tr><td colSpan={isAdmin?5:4} className="p-4 text-center text-gray-500">No requests</td></tr>
          )}
          {requests.map(r => (
            <tr key={r.id} className="border-t">
              <td className="px-4 py-3">{r.equipmentName ?? r.equipment?.name}</td>
              <td className="px-4 py-3">{r.studentName ?? r.student?.username}</td>
              <td className="px-4 py-3">{r.quantityRequested ?? r.quantity ?? 1}</td>
              <td className="px-4 py-3">
                <span className={`px-2 py-1 rounded text-xs ${
                  r.status === "APPROVED" ? "bg-green-100 text-green-700" :
                  r.status === "REJECTED" ? "bg-red-100 text-red-700" :
                  "bg-yellow-100 text-yellow-700"}`}>
                  {r.status}
                </span>
              </td>
              {isAdmin && (
                <td className="px-4 py-3">
                  <button disabled={r.status !== "PENDING"} onClick={()=>onApprove(r.id)} className="mr-2 px-3 py-1 bg-green-600 text-white rounded disabled:opacity-50">Approve</button>
                  <button disabled={r.status !== "PENDING"} onClick={()=>onReject(r.id)} className="px-3 py-1 bg-red-600 text-white rounded disabled:opacity-50">Reject</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
