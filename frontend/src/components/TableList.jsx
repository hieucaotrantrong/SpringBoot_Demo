import { useEffect, useState } from 'react';
import { getAllTables } from '../api/tableApi';

function TableList() {
    const [tables, setTables] = useState([]);

    useEffect(() => {
        getAllTables().then(res => setTables(res.data));
    }, []);

    return (
        <div>
            <h2>Danh sách bàn</h2>
            <ul>
                {tables.map(table => (
                    <li key={table.id}>
                        Bàn số {table.tableNumber} - {table.description} - Trạng thái: {table.status}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TableList;
