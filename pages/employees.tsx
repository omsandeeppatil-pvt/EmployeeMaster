import { useState } from 'react';

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', position: '' });

  const fetchEmployees = async () => {
    const res = await fetch('/api/employees');
    const data = await res.json();
    setEmployees(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/employees/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      fetchEmployees();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Employee Management</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Position"
          value={form.position}
          onChange={(e) => setForm({ ...form, position: e.target.value })}
        />
        <button type="submit">Add Employee</button>
      </form>

      <button onClick={fetchEmployees}>Load Employees</button>
      <ul>
        {employees.map((emp: any) => (
          <li key={emp.id}>
            {emp.name} - {emp.email} - {emp.position}
          </li>
        ))}
      </ul>
    </div>
  );
}
