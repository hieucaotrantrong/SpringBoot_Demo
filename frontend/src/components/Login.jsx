import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/generateToken', {
                username,
                password
            });
            const token = response.data;
            localStorage.setItem('token', token);

            // Giải mã JWT để lấy role
            const base64Payload = token.split('.')[1];
            const payload = JSON.parse(atob(base64Payload));
            const role = payload.roles;

            if (role === 'ROLE_ADMIN') {
                window.location.href = '/admin';
            } else if (role === 'ROLE_USER') {
                window.location.href = '/user';
            } else {
                setError('Tài khoản không hợp lệ');
            }
        } catch (err) {
            setError('Sai tài khoản hoặc mật khẩu!');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Đăng Nhập Coffee Shop</h2>
            <form onSubmit={handleLogin} className="col-md-4 mx-auto">
                <div className="mb-3">
                    <label>Tên đăng nhập</label>
                    <input type="text" className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required />
                </div>
                <div className="mb-3">
                    <label>Mật khẩu</label>
                    <input type="password" className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="btn btn-primary w-100">Đăng Nhập</button>
            </form>
        </div>
    );
}

export default Login;
