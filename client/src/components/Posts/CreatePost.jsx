import { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Use react-router-dom for navigation

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('tips');
  const [labels, setLabels] = useState('');
  const [media, setMedia] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Use navigate for redirecting

  const token = localStorage.getItem('token'); // Get the JWT token from localStorage

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setError('You must be logged in to create a post');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category', category);
    formData.append('labels', labels);
    if (media) {
      formData.append('media', media);
    }

    try {
    
      const response = await fetch('http://127.0.0.1:8000/posts/create/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,  
        },
        body: formData,
      });

      if (response.ok) {
        navigate('/posts');  
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Failed to create post');
      }
    } catch (error) {
      setError('An error occurred while creating the post');
    }
  };

  return (
    <div className="min-h-screen mt-24">
      <main className="max-w-4xl mx-auto mt-12 px-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">Create a New Forum Post</h2>

        {error && <p className="text-red-500 text-center mb-6">{error}</p>} {/* Display error if any */}

        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-xl shadow-xl">
          <div>
            <label className="block text-gray-700 font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-3 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="w-full px-4 py-3 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full px-4 py-3 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="tips">Tips</option>
              <option value="bug">Bug</option>
              <option value="innovation">Innovation</option>
              <option value="printing">Printing</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Labels</label>
            <input
              type="text"
              value={labels}
              onChange={(e) => setLabels(e.target.value)}
              className="w-full px-4 py-3 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Media</label>
            <input
              type="file"
              onChange={(e) => setMedia(e.target.files[0])}
              className="w-full px-4 py-3 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            Create Post
          </button>
        </form>
      </main>
    </div>
  );
};

export default CreatePost;
