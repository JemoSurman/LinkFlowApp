import { useState } from 'react';
import api from '../api/axios';
import { useNavigate, Link } from 'react-router-dom'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/signin', { email, password });
      const token = response.data.access_token;
      localStorage.setItem('token', token);
      
      navigate('/dashboard');
    } catch (error: any) {
      alert(error.response?.data?.message || 'მონაცემები არასწორია');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="p-8 bg-white shadow-xl rounded-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">შესვლა</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">ელ-ფოსტა</label>
            <input
              type="email"
              className="w-full p-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">პაროლი</label>
            <input
              type="password"
              className="w-full p-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors font-semibold"
          >
            ავტორიზაცია
          </button>
        </form>

        {/* ლინკი ახლა ფორმის შიგნითაა */}
        <p className="mt-6 text-center text-sm text-gray-600">
          არ გაქვს ანგარიში?{' '}
          <Link to="/register" className="text-blue-600 font-medium hover:underline">
            დარეგისტრირდი
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;