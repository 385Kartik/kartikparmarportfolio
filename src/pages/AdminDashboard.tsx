import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase, BlogPost } from '../lib/supabase';
import { Plus, Edit3, Trash2, LogOut, Loader2 } from 'lucide-react';
import { SEO } from '../components/SEO';

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthAndFetchBlogs();
  }, []);

  const checkAuthAndFetchBlogs = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/kartik-admin');
      return;
    }

    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching blogs:', error);
    } else {
      setBlogs(data || []);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/kartik-admin');
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    
    const { error } = await supabase.from('blogs').delete().eq('id', id);
    if (error) {
      alert('Failed to delete: ' + error.message);
    } else {
      setBlogs(blogs.filter(b => b.id !== id));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020202] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white p-6 md:p-12 font-sans selection:bg-purple-500/30">
      <SEO title="Admin Dashboard | Kartik Parmar" />
      
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-display font-bold">Kartik's Control Panel</h1>
            <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest mt-1">SEO Entity Management</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Link 
              to="/kartik-admin/edit/new"
              className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-semibold text-sm hover:bg-zinc-200 transition-colors"
            >
              <Plus className="w-4 h-4" /> New Blog Post
            </Link>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-mono text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-colors"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>

        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-xs font-mono tracking-widest text-zinc-500 uppercase">
                <th className="p-4 font-normal">Title</th>
                <th className="p-4 font-normal hidden md:table-cell">Date</th>
                <th className="p-4 font-normal hidden sm:table-cell">Status</th>
                <th className="p-4 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-zinc-500 font-mono text-sm">
                    No blog posts found. Create your first entity signal!
                  </td>
                </tr>
              ) : (
                blogs.map((blog) => (
                  <tr key={blog.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="p-4">
                      <p className="font-semibold text-white">{blog.title}</p>
                      <p className="text-xs text-zinc-500 mt-1">/{blog.slug}</p>
                    </td>
                    <td className="p-4 hidden md:table-cell text-sm text-zinc-400">
                      {new Date(blog.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4 hidden sm:table-cell">
                      {blog.is_published ? (
                        <span className="px-2 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded text-[10px] font-mono tracking-wider mr-2">Published</span>
                      ) : (
                        <span className="px-2 py-1 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 rounded text-[10px] font-mono tracking-wider mr-2">Draft</span>
                      )}
                      {blog.author === 'Kartik Parmar' && (
                        <span className="px-2 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded text-[10px] font-mono tracking-wider hidden lg:inline-block">Entity Lock</span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          to={`/kartik-admin/edit/${blog.slug}`}
                          className="p-2 bg-white/5 hover:bg-white/10 text-white rounded transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>
                        <button 
                          onClick={() => handleDelete(blog.id)}
                          className="p-2 bg-red-500/5 hover:bg-red-500/10 text-red-400 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
