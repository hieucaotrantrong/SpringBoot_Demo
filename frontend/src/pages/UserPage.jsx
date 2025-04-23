import React, { useEffect, useState } from 'react';
import axiosInstance from "../services/axiosInstance";

function UserPage() {
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTables();
    }, []);

    const fetchTables = () => {
        setLoading(true);
        axiosInstance.get('/user/tables')
            .then(response => {
                setTables(response.data);
                setError(null);
            })
            .catch(error => {
                setError("Không thể tải danh sách bàn");
                console.error('Error fetching tables:', error);
            })
            .finally(() => setLoading(false));
    };

    const handleBookTable = async (tableId) => {
        try {
            await axiosInstance.put(`/user/tables/book/${tableId}`);
            fetchTables();
            alert('Đặt bàn thành công!');
        } catch (error) {
            alert('Không thể đặt bàn. Vui lòng thử lại!');
            console.error('Error booking table:', error);
        }
    };

    if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary" role="status"></div></div>;
    if (error) return <div className="alert alert-danger mt-4">{error}</div>;

    return (
        <div className="container py-5">
            <h2 className="mb-4 text-center text-primary fw-bold">📋 Danh sách bàn</h2>
            <div className="row">
                {tables.map(table => (
                    <div key={table.id} className="col-md-4 mb-4">
                        <div className="card shadow-sm h-100 border-0">
                            <div className="card-body">
                                <h5 className="card-title fw-semibold">🪑 Bàn số {table.tableNumber}</h5>
                                <p className="card-text text-muted">{table.description || "Không có mô tả"}</p>
                                <p className={`card-text fw-bold ${table.status === 'ĐÃ ĐẶT' ? 'text-danger' : 'text-success'}`}>
                                    Trạng thái: {table.status}
                                </p>
                            </div>
                            <div className="card-footer bg-white border-0 text-end">
                                <button
                                    className={`btn ${table.status === 'ĐÃ ĐẶT' ? 'btn-secondary' : 'btn-success'} w-100`}
                                    onClick={() => handleBookTable(table.id)}
                                    disabled={table.status === 'ĐÃ ĐẶT'}
                                >
                                    {table.status === 'ĐÃ ĐẶT' ? 'Đã được đặt' : '📌 Đặt bàn'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserPage;
