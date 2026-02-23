import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3333/auth/signup', {
        email,
        password,
      });
      
      alert('რეგისტრაცია წარმატებულია! ახლა გაიარე ავტორიზაცია.');
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'რეგისტრაცია ვერ მოხერხდა');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleRegister} className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">რეგისტრაცია</h2>
        
        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="mb-4 w-full rounded border p-3 outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="mb-6 w-full rounded border p-3 outline-none focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full rounded bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700">
          შექმენი ანგარიში
        </button>
        
        <p className="mt-4 text-center text-sm">
          უკვე გაქვს ანგარიში? <Link to="/login" className="text-blue-600 hover:underline">შედი აქედან</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;