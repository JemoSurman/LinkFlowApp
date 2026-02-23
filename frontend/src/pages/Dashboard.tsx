import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useNavigate, Link } from 'react-router-dom'; 
const Dashboard = () => {
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editLink, setEditLink] = useState('');

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const fetchBookmarks = async () => {
    try {
      const response = await api.get('/bookmarks', { headers: { Authorization: `Bearer ${token}` } });
      setBookmarks(response.data);
    } catch (err) { navigate('/login'); }
  };

  useEffect(() => { fetchBookmarks(); }, []);


  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleCreateBookmark = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/bookmarks', { title, description, link }, { headers: { Authorization: `Bearer ${token}` } });
      setTitle(''); setDescription(''); setLink('');
      fetchBookmarks();
    } catch (err) { alert('დამატება ვერ მოხერხდა'); }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('წავშალოთ?')) return;
    try {
      await api.delete(`/bookmarks/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setBookmarks(bookmarks.filter(b => b.id !== id));
    } catch (err) { alert('წაშლა ვერ მოხერხდა'); }
  };

  const startEdit = (b: any) => {
    setEditingId(b.id);
    setEditTitle(b.title);
    setEditDescription(b.description);
    setEditLink(b.link);
  };

  const handleUpdate = async (id: number) => {
    try {
      await api.patch(`/bookmarks/${id}`, 
        { title: editTitle, description: editDescription, link: editLink },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingId(null);
      fetchBookmarks();
    } catch (err) {
      alert('განახლება ვერ მოხერხდა');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
    
        <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <h1 className="text-xl font-bold text-gray-800">ჩემი სანიშნეები 📚</h1>
          <div className="flex gap-3">
            <Link 
              to="/profile" 
              className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition font-medium">
              პროფილი 👤
            </Link>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-medium"
            >
              გამოსვლა
            </button>
          </div>
        </div>

        <form onSubmit={handleCreateBookmark} className="bg-white p-6 rounded-xl shadow-md mb-8 space-y-3">
          <input type="text" placeholder="სათაური" className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-blue-400" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <input type="text" placeholder="აღწერა" className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-blue-400" value={description} onChange={(e) => setDescription(e.target.value)} />
          <input type="url" placeholder="ბმული" className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-blue-400" value={link} onChange={(e) => setLink(e.target.value)} required />
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold">დამატება</button>
        </form>
        <div className="space-y-4">
          {bookmarks.map((b) => (
            <div key={b.id} className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
              {editingId === b.id ? (
                <div className="space-y-3">
                  <input type="text" className="w-full p-2 border rounded" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                  <input type="text" className="w-full p-2 border rounded" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
                  <input type="url" className="w-full p-2 border rounded" value={editLink} onChange={(e) => setEditLink(e.target.value)} />
                  <div className="flex gap-2">
                    <button onClick={() => handleUpdate(b.id)} className="bg-green-500 text-white px-4 py-1 rounded">შენახვა</button>
                    <button onClick={() => setEditingId(null)} className="bg-gray-400 text-white px-4 py-1 rounded">გაუქმება</button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-800">{b.title}</h3>
                    <p className="text-gray-600 text-sm my-1">{b.description}</p>
                    <a href={b.link} target="_blank" rel="noreferrer" className="text-blue-500 text-xs break-all hover:underline">{b.link}</a>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => startEdit(b)} className="text-yellow-500 hover:bg-yellow-50 p-2 rounded-lg transition" title="რედაქტირება">✎</button>
                    <button onClick={() => handleDelete(b.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition" title="წაშლა">🗑</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;