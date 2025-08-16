import React from "react";

const AttendanceTable = ({ students, attendance, onChangeStatus }) => {
  return (
    <table className="w-full border-collapse border border-gray-400">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-400 p-2">Student ID</th>
          <th className="border border-gray-400 p-2">Name</th>
          <th className="border border-gray-400 p-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {students.map((s) => (
          <tr key={s.id}>
            <td className="border border-gray-400 p-2">{s.id}</td>
            <td className="border border-gray-400 p-2">{s.name}</td>
            <td className="border border-gray-400 p-2">
              <select
                value={attendance[s.id] || "P"}
                onChange={(e) => onChangeStatus(s.id, e.target.value)}
                className="border p-1"
              >
                <option value="P">Present</option>
                <option value="A">Absent</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AttendanceTable;
