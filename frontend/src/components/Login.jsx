import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

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
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container-fluid vh-100" style={{
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div className="card shadow-lg" style={{
                width: '100%',
                maxWidth: '400px',
                borderRadius: '15px',
                overflow: 'hidden'
            }}>
                <div className="card-header bg-primary text-white text-center py-4">
                    <h2 className="mb-0">
                        <i className="fas fa-coffee me-2"></i>
                        Đăng Nhập Coffee Shop
                    </h2>
                </div>
                <div className="card-body p-4">
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Tên đăng nhập</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <i className="fas fa-user"></i>
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Nhập tên đăng nhập"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="form-label fw-bold">Mật khẩu</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <i className="fas fa-lock"></i>
                                </span>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Nhập mật khẩu"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="alert alert-danger d-flex align-items-center">
                                <i className="fas fa-exclamation-circle me-2"></i>
                                <div>{error}</div>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn btn-primary w-100 py-2 fw-bold"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Đang đăng nhập...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-sign-in-alt me-2"></i>
                                    Đăng Nhập
                                </>
                            )}
                        </button>

                        <div className="text-center mt-3">
                            <a href="#forgot-password" className="text-decoration-none">
                                Quên mật khẩu?
                            </a>
                        </div>
                    </form>
                </div>
                <div className="card-footer text-center py-3 bg-light">
                    <small className="text-muted">
                        Chưa có tài khoản? <a href="#register" className="text-primary">Đăng ký ngay</a>
                    </small>
                </div>
            </div>
        </div>
    );
}

export default Login;