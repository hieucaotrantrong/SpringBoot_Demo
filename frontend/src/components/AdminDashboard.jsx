import { useState } from 'react';
import { createUser } from '../api/userApi';
import { createTable } from '../api/tableApi';

function AdminDashboard() {
    const [user, setUser] = useState({ username: '', password: '', role: 'USER' });
    const [table, setTable] = useState({ tableNumber: '', description: '', status: 'Chưa đặt' });

    const token = localStorage.getItem('token');

    const handleCreateUser = async () => {
        await createUser(user, token);
        alert('Tạo user thành công!');
    };

    const handleCreateTable = async () => {
        await createTable(table, token);
        alert('Tạo bàn thành công!');
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <h3>Tạo người dùng</h3>
            <input placeholder="Username" onChange={(e) => setUser({ ...user, username: e.target.value })} />
            <input placeholder="Password" onChange={(e) => setUser({ ...user, password: e.target.value })} />
            <select onChange={(e) => setUser({ ...user, role: e.target.value })}>
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
            </select>
            <button onClick={handleCreateUser}>Tạo user</button>

            <h3>Tạo bàn</h3>
            <input placeholder="Số bàn" onChange={(e) => setTable({ ...table, tableNumber: e.target.value })} />
            <input placeholder="Mô tả" onChange={(e) => setTable({ ...table, description: e.target.value })} />
            <button onClick={handleCreateTable}>Tạo bàn</button>
        </div>
    );
}

export default AdminDashboard;
