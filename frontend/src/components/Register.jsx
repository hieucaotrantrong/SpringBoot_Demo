import { useState } from 'react';
import { register } from '../api/authApi';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [form, setForm] = useState({ username: '', password: '', role: 'USER' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await register(form);
        navigate('/login');
    };

    return (
        <div className="register-container">
            <h2>Đăng ký tài khoản</h2>
            <form onSubmit={handleSubmit} className="register-form">
                <div className="input-container">
                    <label htmlFor="username">Tên đăng nhập</label>
                    <input
                        id="username"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        placeholder="Nhập tên đăng nhập"
                        required
                    />
                </div>

                <div className="input-container">
                    <label htmlFor="password">Mật khẩu</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Nhập mật khẩu"
                        required
                    />
                </div>

                <div className="input-container">
                    <label htmlFor="role">Vai trò</label>
                    <select name="role" value={form.role} onChange={handleChange}>
                        <option value="ADMIN">Admin</option>
                        <option value="USER">User</option>
                    </select>
                </div>

                <button type="submit" className="submit-btn">Đăng ký</button>
            </form>
        </div>
    );
}

export default Register;
