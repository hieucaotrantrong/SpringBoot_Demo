import { useState } from 'react';
import { login } from '../api/authApi';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [form, setForm] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Gọi API đăng nhập
            const res = await login(form);

            // Kiểm tra và in dữ liệu trả về từ API
            console.log('Response:', res.data);

            // Giả sử token nằm trong res.data.token
            if (res.data.token) {
                localStorage.setItem('token', res.data.token);

                if (form.username.toLowerCase().includes('admin')) {
                    navigate('/admin');
                } else {
                    navigate('/tables');
                }
            } else {
                alert('Không tìm thấy token trong phản hồi');
            }
        } catch (error) {
            console.error('Lỗi đăng nhập:', error);
            alert('Đăng nhập thất bại, vui lòng kiểm tra lại thông tin!');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Đăng nhập</h2>
            <input name="username" value={form.username} onChange={handleChange} placeholder="Username" required />
            <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" required />
            <button type="submit">Đăng nhập</button>
        </form>
    );
}

export default Login;
