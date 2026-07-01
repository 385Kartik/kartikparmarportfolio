import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase, BlogPost } from '../lib/supabase';
import { ArrowLeft, Save, Loader2, Image as ImageIcon } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function AdminBlogEditor() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const isNew = slug === 'new';

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image_url: '',
    image_alt: 'Kartik Parmar working on AI automation',
    tags: [],
    author: 'Kartik Parmar', // SEO CRITICAL
    reading_time: 0,
    is_published: false,
    canonical_url: '',
    is_featured: false,
  });

  const [tagsInput, setTagsInput] = useState('');

  useEffect(() => {
    checkAuthAndFetch();
  }, [slug]);

  const checkAuthAndFetch = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/kartik-admin');
      return;
    }

    if (!isNew) {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .single();

      if (data) {
        setFormData(data);
        setTagsInput(data.tags?.join(', ') || '');
      } else if (error) {
        alert('Failed to load blog: ' + error.message);
        navigate('/kartik-admin/dashboard');
      }
    }
    setLoading(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const fileExt = file.name.split('.').pop();
    const cleanSlug = formData.slug || 'blog-image';
    const fileName = `${cleanSlug}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError, data } = await supabase.storage
      .from('blog-images')
      .upload(filePath, file);

    if (uploadError) {
      alert('Error uploading image: ' + uploadError.message);
    } else {
      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);
      
      setFormData(prev => ({ ...prev, image_url: publicUrl }));
    }
    setUploadingImage(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const words = (formData.content || '').replace(/<[^>]*>?/gm, '').split(/\s+/).length;
    const calcReadingTime = Math.max(1, Math.ceil(words / 200));

    const payload = {
      ...formData,
      tags: tagsArray,
      author: 'Kartik Parmar', // Hardcode safeguard for entity SEO
      reading_time: calcReadingTime,
      updated_at: new Date().toISOString(),
    };

    if (isNew) {
      const { error } = await supabase.from('blogs').insert([payload]);
      if (error) alert('Error creating: ' + error.message);
      else navigate('/kartik-admin/dashboard');
    } else {
      const { error } = await supabase.from('blogs').update(payload).eq('slug', slug);
      if (error) alert('Error updating: ' + error.message);
      else navigate('/kartik-admin/dashboard');
    }
    
    setSaving(false);
  };

  // Auto-generate slug from title if new
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    if (isNew) {
      const generatedSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      setFormData(prev => ({ ...prev, title, slug: generatedSlug }));
    } else {
      setFormData(prev => ({ ...prev, title }));
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-[#020202] flex items-center justify-center"><Loader2 className="w-8 h-8 text-purple-500 animate-spin" /></div>;
  }

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'code-block'],
      ['clean']
    ],
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <Link to="/kartik-admin/dashboard" className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-display font-bold">
              {isNew ? 'Create New SEO Entity (Blog)' : `Editing: ${formData.title}`}
            </h1>
          </div>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-lg font-semibold hover:bg-zinc-200 transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : 'Publish'}
          </button>
        </div>

        <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
          {/* Main Content Area */}
          <div className="space-y-6">
            <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/10 space-y-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-2 uppercase">Post Title</label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={handleTitleChange}
                  className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white text-xl font-display focus:border-purple-500/50 outline-none"
                  placeholder="e.g. How Kartik Parmar Automates Workflows..."
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-2 uppercase">URL Slug (SEO Important)</label>
                <input
                  type="text"
                  required
                  value={formData.slug || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white font-mono text-sm focus:border-purple-500/50 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-2 uppercase">Short Excerpt / Meta Description</label>
                <textarea
                  required
                  rows={3}
                  value={formData.excerpt || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-purple-500/50 outline-none"
                  placeholder="This will appear in Google Search results..."
                />
              </div>
            </div>

            <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/10">
              <label className="block text-xs font-mono text-zinc-400 mb-4 uppercase">Main Content</label>
              {/* Note: ReactQuill requires a custom wrapper to override the dark theme nicely, we'll use inline styles/classes in global css later if needed */}
              <div className="prose prose-invert max-w-none">
                <ReactQuill 
                  theme="snow" 
                  value={formData.content || ''} 
                  onChange={(content) => setFormData(prev => ({ ...prev, content }))} 
                  modules={modules}
                  className="bg-black text-white rounded-lg border border-white/10 h-[500px] mb-12"
                />
              </div>
            </div>
          </div>

          {/* Sidebar / Metadata */}
          <div className="space-y-6">
            <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/10 space-y-4">
              <h3 className="font-display font-semibold border-b border-white/10 pb-2 mb-4">Cover Image</h3>
              
              {formData.image_url && (
                <img src={formData.image_url} alt="Cover" className="w-full h-40 object-cover rounded-lg border border-white/10" />
              )}

              <div>
                <label className="block text-xs text-zinc-500 mb-2">Upload New Image</label>
                <div className="relative border-2 border-dashed border-white/10 rounded-lg p-4 text-center hover:border-purple-500/30 transition-colors">
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  <div className="flex flex-col items-center pointer-events-none">
                    {uploadingImage ? <Loader2 className="w-6 h-6 animate-spin text-zinc-400" /> : <ImageIcon className="w-6 h-6 text-zinc-400 mb-2" />}
                    <span className="text-xs text-zinc-400">{uploadingImage ? 'Uploading...' : 'Click or drag image here'}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs text-zinc-500 mb-2">Or Image URL</label>
                <input
                  type="text"
                  value={formData.image_url || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                  className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-500 mb-2">Image Alt Text (CRITICAL FOR SEO)</label>
                <input
                  type="text"
                  required
                  value={formData.image_alt || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, image_alt: e.target.value }))}
                  className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                  placeholder="e.g. Kartik Parmar coding..."
                />
              </div>
            </div>

            <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/10 space-y-4">
              <h3 className="font-display font-semibold border-b border-white/10 pb-2 mb-4">Metadata</h3>
              
              <div>
                <label className="block text-xs text-zinc-500 mb-2">Tags (comma separated)</label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                  placeholder="AI, Development, Startups"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-500 mb-2">Canonical URL (Optional)</label>
                <input
                  type="url"
                  value={formData.canonical_url || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, canonical_url: e.target.value }))}
                  className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                  placeholder="https://medium.com/..."
                />
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-2">
                <label className="text-sm font-semibold text-white">Publish Post</label>
                <input 
                  type="checkbox" 
                  checked={formData.is_published || false}
                  onChange={(e) => setFormData(prev => ({ ...prev, is_published: e.target.checked }))}
                  className="w-5 h-5 accent-purple-500"
                />
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-2">
                <label className="text-sm font-semibold text-white">Feature on Homepage</label>
                <input 
                  type="checkbox" 
                  checked={formData.is_featured || false}
                  onChange={(e) => setFormData(prev => ({ ...prev, is_featured: e.target.checked }))}
                  className="w-5 h-5 accent-purple-500"
                />
              </div>

              <div className="pt-4 border-t border-white/10 mt-2">
                <label className="block text-xs text-zinc-500 mb-2">Author (Hardcoded to Entity)</label>
                <input
                  type="text"
                  disabled
                  value="Kartik Parmar"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-zinc-500 text-sm cursor-not-allowed"
                />
                <p className="text-[10px] text-green-400/70 mt-2 font-mono">Entity Signal Locked 🔒</p>
              </div>
            </div>
          </div>
        </form>

        {/* LIVE SEO PREVIEW */}
        <div className="mt-8 bg-white p-6 rounded-2xl shadow-xl max-w-2xl">
          <h3 className="text-sm font-bold text-zinc-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Google Search Preview
          </h3>
          <div className="font-sans">
            <div className="text-[#202124] text-xs mb-1 flex items-center gap-1.5">
              <span className="bg-zinc-200 rounded-full w-6 h-6 inline-block shrink-0">
                <img src="/Kartik.jpeg" className="w-full h-full rounded-full object-cover grayscale" alt="Kartik Parmar icon" />
              </span>
              <div>
                <span className="block leading-tight">Kartik Parmar</span>
                <span className="text-[#4d5156] block leading-tight">https://kartikparmarportfolio.vercel.app &rsaquo; blog {formData.slug ? `› ${formData.slug}` : ''}</span>
              </div>
            </div>
            <h2 className="text-[#1a0dab] text-xl font-medium mb-1 cursor-pointer hover:underline">
              {formData.title || 'Your SEO Title Appears Here'} | Kartik Parmar
            </h2>
            <p className="text-[#4d5156] text-sm line-clamp-2">
              <span className="text-[#70757a]">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} — </span>
              {formData.excerpt || 'Your meta description will appear here. Write a compelling summary that includes your targeted keywords to maximize click-through rate.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
