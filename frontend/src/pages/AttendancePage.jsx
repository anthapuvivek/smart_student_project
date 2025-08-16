// src/pages/AttendancePage.jsx
import { useEffect, useMemo, useState } from 'react';
import { fetchStudents } from '../services/studentService';
import { submitAttendance } from '../services/attendanceService';

export default function AttendancePage() {
  const [students, setStudents] = useState([]);
  const [status, setStatus] = useState({}); // { [id]: 'P' | 'A' }
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState('');

  // Fetch students on mount
  useEffect(() => {
    (async () => {
      try {
        const list = await fetchStudents();
        setStudents(list);
        // default everyone Present initially
        const init = Object.fromEntries(list.map(s => [s.id, 'P']));
        setStatus(init);
      } catch (e) {
        setMsg(e?.response?.data?.message || 'Failed to load students');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const dateStr = useMemo(() => new Date().toISOString().slice(0,10), []);

  const toggleStatus = (id, val) => setStatus(prev => ({ ...prev, [id]: val }));

  const onSubmit = async () => {
    setMsg('');
    setSubmitting(true);
    try {
      const payload = {
        date: dateStr,
        records: students.map(s => ({ studentId: s.id, status: status[s.id] || 'A' })),
      };
      await submitAttendance(payload);
      setMsg('✅ Attendance saved successfully');
    } catch (e) {
      setMsg(e?.response?.data?.message || 'Failed to save attendance');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-xl font-bold">Attendance</h1>
      <p className="text-sm">Date: <b>{dateStr}</b></p>
      {msg && <div className="text-sm text-blue-600">{msg}</div>}

      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Class</th>
            <th className="border p-2">Mark</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, i) => (
            <tr key={s.id}>
              <td className="border p-2">{i + 1}</td>
              <td className="border p-2">{s.name}</td>
              <td className="border p-2">{s.className ?? s.class}</td>
              <td className="border p-2">
                <div className="flex gap-2">
                  <button
                    className={`px-3 py-1 border rounded ${status[s.id] === 'P' ? 'bg-green-200' : ''}`}
                    onClick={() => toggleStatus(s.id, 'P')}
                  >
                    Present
                  </button>
                  <button
                    className={`px-3 py-1 border rounded ${status[s.id] === 'A' ? 'bg-red-200' : ''}`}
                    onClick={() => toggleStatus(s.id, 'A')}
                  >
                    Absent
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={onSubmit}
        disabled={submitting}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        {submitting ? 'Saving...' : 'Submit Attendance'}
      </button>
    </div>
  );
}
