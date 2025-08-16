// src/pages/StudentsPage.jsx
import { useEffect, useState } from 'react';
import { fetchStudents } from '../services/studentService';

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const list = await fetchStudents();
        setStudents(list);
      } catch (e) {
        setError(e?.response?.data?.message || 'Failed to load students');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>Loading students...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <h1 className="text-xl mb-3">Students</h1>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Class</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, i) => (
            <tr key={s.id}>
              <td className="border p-2">{i + 1}</td>
              <td className="border p-2">{s.name}</td>
              <td className="border p-2">{s.className ?? s.class}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
