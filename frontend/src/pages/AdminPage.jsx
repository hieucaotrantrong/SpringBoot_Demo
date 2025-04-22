import React, { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";

export default function AdminPage() {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        username: "",
        password: "",
        name: "",
        age: "",
        address: "",
        role: "ROLE_USER"
    });
    const [editingUser, setEditingUser] = useState(null);

    const [tables, setTables] = useState([]);
    const [newTable, setNewTable] = useState({ tableNumber: '', description: '', status: 'CHƯA ĐẶT' });
    const [editingTable, setEditingTable] = useState(null);

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("token");

    // Fetch người dùng
    const fetchUsers = async () => {
        try {
            const response = await fetch("/api/admin/users", {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách người dùng:", error);
        }
    };

    // Fetch bàn
    const fetchTables = () => {
        axiosInstance.get('/admin/tables/all')
            .then(response => setTables(response.data))
            .catch(error => {
                setMessage("Có lỗi khi lấy danh sách bàn!");
                console.error('Error fetching tables:', error);
            });
    };

    useEffect(() => {
        fetchUsers();
        fetchTables();
    }, []);

    // Thêm người dùng
    const handleCreateUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch("/api/admin/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(newUser)
            });
            if (response.ok) {
                fetchUsers();
                setNewUser({
                    username: "", password: "", name: "", age: "", address: "", role: "ROLE_USER"
                });
            }
        } catch (error) {
            console.error("Lỗi khi thêm người dùng:", error);
        } finally {
            setLoading(false);
        }
    };

    // Chỉnh sửa người dùng
    const handleEditUser = (user) => {
        setEditingUser(user);
        setNewUser({
            username: user.username,
            password: "",
            name: user.name,
            age: user.age,
            address: user.address,
            role: user.role
        });
    };

    // Cập nhật người dùng
    const handleUpdateUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`/api/admin/users/${editingUser.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(newUser)
            });
            if (response.ok) {
                fetchUsers();
                setEditingUser(null);
                setNewUser({ username: "", password: "", name: "", age: "", address: "", role: "ROLE_USER" });
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật người dùng:", error);
        } finally {
            setLoading(false);
        }
    };

    // Xóa người dùng
    const handleDeleteUser = async (id) => {
        if (!window.confirm("Bạn có chắc muốn xóa người dùng này?")) return;
        try {
            const response = await fetch(`/api/admin/users/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.ok) fetchUsers();
        } catch (error) {
            console.error("Lỗi khi xóa người dùng:", error);
        }
    };

    // Thêm bàn mới
    const handleCreateTable = (e) => {
        e.preventDefault();
        if (!newTable.tableNumber || !newTable.description) {
            setMessage("Số bàn và mô tả không thể để trống!");
            return;
        }
        setLoading(true);
        axiosInstance.post('/admin/tables/create', newTable)
            .then(response => {
                setTables(prev => [...prev, response.data]);
                alert("Thêm bàn thành công!");
                setNewTable({ tableNumber: '', description: '', status: 'CHƯA ĐẶT' });
            })
            .catch(error => {
                alert("Có lỗi khi thêm bàn!");
                console.error('Error creating table:', error);
            })
            .finally(() => setLoading(false));
    };

    // Xóa bàn
    const handleDeleteTable = (id) => {
        if (window.confirm("Bạn có chắc muốn xóa bàn này không?")) {
            setLoading(true);
            axiosInstance.delete(`/admin/tables/delete/${id}`)
                .then(() => {
                    setTables(prev => prev.filter(table => table.id !== id));
                    alert("Xóa bàn thành công!");
                })
                .catch(error => {
                    alert("Có lỗi khi xóa bàn!");
                    console.error('Error deleting table:', error);
                })
                .finally(() => setLoading(false));
        }
    };

    // Chỉnh sửa bàn
    const handleEditTable = (table) => {
        setEditingTable(table);
        setNewTable({
            tableNumber: table.tableNumber,
            description: table.description,
            status: table.status
        });
    };

    // Cập nhật bàn
    const handleUpdateTable = (e) => {
        e.preventDefault();
        if (!newTable.tableNumber || !newTable.description) {
            setMessage("Số bàn và mô tả không thể để trống!");
            return;
        }
        setLoading(true);
        axiosInstance.put(`/admin/tables/update/${newTable.tableNumber}`, newTable)
            .then(response => {
                setTables(prev => prev.map(table => table.tableNumber === newTable.tableNumber ? response.data : table));
                alert("Cập nhật bàn thành công!");
                setEditingTable(null);
                setNewTable({ tableNumber: '', description: '', status: 'CHƯA ĐẶT' });
            })
            .catch(error => {
                alert("Có lỗi khi cập nhật bàn!");
                console.error('Error updating table:', error);
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="container mt-5">
            <h2>Xin chào Admin!</h2>
            <p>Trang quản lý người dùng và bàn</p>

            {/* Người Dùng */}
            <h4 className="mt-4">Quản Lý Người Dùng</h4>
            <form onSubmit={editingUser ? handleUpdateUser : handleCreateUser}>
                <div className="mb-3">
                    <label>Tài Khoản</label>
                    <input className="form-control" value={newUser.username}
                        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                        required disabled={!!editingUser} />
                </div>
                <div className="mb-3">
                    <label>Mật Khẩu {editingUser ? "(bỏ trống nếu không đổi)" : ""}</label>
                    <input type="password" className="form-control" value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        required={!editingUser} />
                </div>
                <div className="mb-3">
                    <label>Họ Tên</label>
                    <input className="form-control" value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} required />
                </div>
                <div className="mb-3">
                    <label>Tuổi</label>
                    <input type="number" className="form-control" value={newUser.age}
                        onChange={(e) => setNewUser({ ...newUser, age: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label>Địa Chỉ</label>
                    <input className="form-control" value={newUser.address}
                        onChange={(e) => setNewUser({ ...newUser, address: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label>Quyền</label>
                    <select className="form-control" value={newUser.role}
                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
                        <option value="ROLE_USER">ROLE_USER</option>
                        <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                    </select>
                </div>
                <button className="btn btn-primary" type="submit" disabled={loading}>
                    {editingUser ? "Cập Nhật Người Dùng" : "Thêm Người Dùng"}
                </button>
            </form>

            <table className="table table-bordered mt-3">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Họ Tên</th>
                        <th>Tuổi</th>
                        <th>Địa Chỉ</th>
                        <th>Vai Trò</th>
                        <th>Thao Tác</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.name}</td>
                            <td>{user.age}</td>
                            <td>{user.address}</td>
                            <td>{user.role}</td>
                            <td>
                                <button className="btn btn-warning me-2" onClick={() => handleEditUser(user)}>Sửa</button>
                                <button className="btn btn-danger" onClick={() => handleDeleteUser(user.id)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Quản Lý Bàn */}
            <h4 className="mt-5">Quản Lý Bàn</h4>
            {message && (
                <div className="alert alert-info">{message}</div>
            )}
            <form onSubmit={editingTable ? handleUpdateTable : handleCreateTable}>
                <div className="mb-3">
                    <label>Số Bàn</label>
                    <input className="form-control" value={newTable.tableNumber}
                        onChange={(e) => setNewTable({ ...newTable, tableNumber: e.target.value })}
                        required />
                </div>
                <div className="mb-3">
                    <label>Mô Tả</label>
                    <input className="form-control" value={newTable.description}
                        onChange={(e) => setNewTable({ ...newTable, description: e.target.value })}
                        required />
                </div>
                <div className="mb-3">
                    <label>Trạng Thái</label>
                    <select className="form-control" value={newTable.status}
                        onChange={(e) => setNewTable({ ...newTable, status: e.target.value })}>
                        <option value="CHƯA ĐẶT">CHƯA ĐẶT</option>
                        <option value="ĐÃ ĐẶT">ĐÃ ĐẶT</option>
                    </select>
                </div>
                <button className="btn btn-primary" type="submit" disabled={loading}>
                    {editingTable ? "Cập Nhật Bàn" : "Thêm Bàn"}
                </button>
            </form>

            <table className="table table-bordered mt-3">
                <thead>
                    <tr>
                        <th>Số Bàn</th>
                        <th>Mô Tả</th>
                        <th>Trạng Thái</th>
                        <th>Thao Tác</th>
                    </tr>
                </thead>
                <tbody>
                    {tables.map(table => (
                        <tr key={table.id}>
                            <td>{table.tableNumber}</td>
                            <td>{table.description}</td>
                            <td>{table.status}</td>
                            <td>
                                <button className="btn btn-warning me-2" onClick={() => handleEditTable(table)}>Sửa</button>
                                <button className="btn btn-danger" onClick={() => handleDeleteTable(table.id)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}
