import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';

const Profile = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // მომხმარებლის მონაცემების წამოღება
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/users/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEmail(response.data.email);
        setFirstName(response.data.firstName || '');
        setLastName(response.data.lastName || '');
      } catch (err) {
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [token, navigate]);

  // მონაცემების განახლება
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.patch('/users', 
        { firstName, lastName }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('მონაცემები წარმატებით განახლდა!');
    } catch (err) {
      alert('განახლება ვერ მოხერხდა');
    }
  };

  if (loading) return <div className="text-center mt-20">იტვირთება...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">ჩემი პროფილი 👤</h2>
          <Link to="/dashboard" className="text-blue-500 hover:underline text-sm">უკან</Link>
        </div>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-500">ელ-ფოსტა (მუდმივი)</label>
            <input type="text" value={email} disabled className="w-full p-2 bg-gray-100 border rounded mt-1 cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">სახელი</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded mt-1 outline-none focus:ring-2 focus:ring-blue-400" 
              value={firstName} 
              onChange={(e) => setFirstName(e.target.value)} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">გვარი</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded mt-1 outline-none focus:ring-2 focus:ring-blue-400" 
              value={lastName} 
              onChange={(e) => setLastName(e.target.value)} 
            />
          </div>
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold">
            შენახვა
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;