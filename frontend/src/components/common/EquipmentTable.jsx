import React from "react";

export default function EquipmentTable({ equipments = [], showActions = false, onRequest, onDelete }) {
  return (
    <div className="overflow-x-auto shadow rounded bg-white">
      <table className="min-w-full">
        <thead className="bg-gray-50 text-xs text-gray-700 uppercase">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Total</th>
            <th className="px-4 py-3 text-left">Allotted</th>
            <th className="px-4 py-3 text-left">Available</th>
            {showActions && <th className="px-4 py-3">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {equipments.length === 0 && (
            <tr><td colSpan={showActions?5:4} className="p-4 text-center text-gray-500">No equipment</td></tr>
          )}
          {equipments.map(eq => {
            const total = eq.totalQuantity ?? eq.quantity ?? 0;
            const allotted = eq.allottedQuantity ?? eq.allotted ?? 0;
            const available = total - allotted;
            return (
              <tr key={eq.id} className="border-t">
                <td className="px-4 py-3">{eq.name}</td>
                <td className="px-4 py-3">{total}</td>
                <td className="px-4 py-3">{allotted}</td>
                <td className="px-4 py-3">{available}</td>
                {showActions && (
                  <td className="px-4 py-3">
                    {onRequest && <button className="mr-2 px-3 py-1 bg-blue-600 text-white rounded" onClick={()=>onRequest(eq.id)}>Request</button>}
                    {onDelete && <button className="px-3 py-1 bg-red-600 text-white rounded" onClick={()=>onDelete(eq.id)}>Delete</button>}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
