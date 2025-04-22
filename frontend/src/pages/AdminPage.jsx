import React, { useState, useEffect } from 'react';
import axiosInstance from '../services/axiosInstance';

function AdminPage() {
    const [tables, setTables] = useState([]);
    const [newTable, setNewTable] = useState({ tableNumber: '', description: '', status: 'CHƯA ĐẶT' });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [editingTable, setEditingTable] = useState(null);

    // Fetch danh sách bàn
    useEffect(() => {
        axiosInstance.get('/admin/tables/all')
            .then(response => setTables(response.data))
            .catch(error => {
                setMessage("Có lỗi khi lấy danh sách bàn!");
                console.error('Error fetching tables:', error);
            });
    }, []);

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
                alert("Có lỗi khi thêm bàn! Vui lòng thử lại.");
                console.error('Error creating table:', error);
            })
            .finally(() => setLoading(false));
    };

    // Xóa bàn với xác nhận
    const handleDeleteTable = (id) => {
        if (window.confirm("Bạn có chắc muốn xóa bàn này không?")) {
            setLoading(true);
            axiosInstance.delete(`/admin/tables/delete/${id}`)
                .then(() => {
                    setTables(prev => prev.filter(table => table.id !== id));
                    alert("Xóa bàn thành công!");
                })
                .catch(error => {
                    alert("Có lỗi khi xóa bàn! Vui lòng thử lại.");
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
                setTables(prev => prev.map(table => table.id === newTable.tableNumber ? response.data : table));
                alert("Cập nhật bàn thành công!");
                setEditingTable(null);
                setNewTable({ tableNumber: '', description: '', status: 'CHƯA ĐẶT' });
            })
            .catch(error => {
                alert("Có lỗi khi cập nhật bàn! Vui lòng thử lại.");
                console.error('Error updating table:', error);
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="container mt-5">
            <h2>Xin chào Admin!</h2>
            <p>Trang quản lý bàn và người dùng.</p>

            {message && (
                <div className="alert alert-info alert-dismissible fade show" role="alert">
                    {message}
                    <button type="button" className="btn-close" aria-label="Close" onClick={() => setMessage("")}></button>
                </div>
            )}

            <h4>Thêm Bàn Mới</h4>
            <form onSubmit={handleCreateTable}>
                <div className="mb-3">
                    <label htmlFor="tableNumber" className="form-label">Số Bàn</label>
                    <input
                        type="number"
                        id="tableNumber"
                        className="form-control"
                        value={newTable.tableNumber}
                        onChange={(e) => setNewTable({ ...newTable, tableNumber: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Mô Tả</label>
                    <input
                        type="text"
                        id="description"
                        className="form-control"
                        value={newTable.description}
                        onChange={(e) => setNewTable({ ...newTable, description: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Trạng Thái</label>
                    <select
                        id="status"
                        className="form-control"
                        value={newTable.status}
                        onChange={(e) => setNewTable({ ...newTable, status: e.target.value })}
                    >
                        <option value="CHƯA ĐẶT">CHƯA ĐẶT</option>
                        <option value="ĐÃ ĐẶT">ĐÃ ĐẶT</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>Thêm Bàn</button>
            </form>

            <h4 className="mt-5">Danh Sách Bàn</h4>
            <table className="table table-bordered">
                <thead className="table-light">
                    <tr>
                        <th>Số Bàn</th>
                        <th>Mô Tả</th>
                        <th>Trạng Thái</th>
                        <th>Thao Tác</th>
                    </tr>
                </thead>
                <tbody>
                    {tables.map((table) => (
                        <tr key={table.id}>
                            <td>{table.tableNumber}</td>
                            <td>{table.description}</td>
                            <td>{table.status}</td>
                            <td>
                                <button
                                    className="btn btn-warning me-2"
                                    onClick={() => handleEditTable(table)}
                                    disabled={loading}
                                >
                                    Chỉnh Sửa
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDeleteTable(table.id)}
                                    disabled={loading}
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editingTable && (
                <div className="mt-5">
                    <h4>Chỉnh Sửa Bàn</h4>
                    <form onSubmit={handleUpdateTable}>
                        <div className="mb-3">
                            <label htmlFor="tableNumber" className="form-label">Số Bàn</label>
                            <input
                                type="number"
                                id="tableNumber"
                                className="form-control"
                                value={newTable.tableNumber}
                                onChange={(e) => setNewTable({ ...newTable, tableNumber: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Mô Tả</label>
                            <input
                                type="text"
                                id="description"
                                className="form-control"
                                value={newTable.description}
                                onChange={(e) => setNewTable({ ...newTable, description: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="status" className="form-label">Trạng Thái</label>
                            <select
                                id="status"
                                className="form-control"
                                value={newTable.status}
                                onChange={(e) => setNewTable({ ...newTable, status: e.target.value })}
                            >
                                <option value="CHƯA ĐẶT">CHƯA ĐẶT</option>
                                <option value="ĐÃ ĐẶT">ĐÃ ĐẶT</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-success" disabled={loading}>Cập Nhật Bàn</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default AdminPage;
