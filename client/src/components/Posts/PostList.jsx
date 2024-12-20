import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('recent'); 
  const token = localStorage.getItem('token'); 

  useEffect(() => {
    const fetchPosts = async () => {
      if (!token) {
        setError('You are not logged in. Please log in.');
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/posts/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, 
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          const errorData = await response.json();
          setError(errorData.detail || 'Failed to fetch posts');
        }
      } catch (error) {
        setError('An error occurred while fetching posts');
      }
    };

    fetchPosts();
  }, [token]);

  
  const filterPostsByCategory = (category) => {
    if (category === 'recent') return posts;
    return posts.filter((post) => post.category.toLowerCase() === category);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-16">
    
      <main className="max-w-7xl mx-auto mt-12 px-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-900">Recent Forum Activity</h2>
          
          <Link
            to="/posts/create"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create Post
          </Link>
        </div>

       
        <div className="mb-8">
          <div className="flex space-x-6">
            <button
              className={`text-lg font-semibold ${
                activeCategory === 'recent' ? 'text-blue-600' : 'text-gray-700'
              }`}
              onClick={() => setActiveCategory('recent')}
            >
              Recent
            </button>
            <button
              className={`text-lg font-semibold ${
                activeCategory === 'community admin' ? 'text-blue-600' : 'text-gray-700'
              }`}
              onClick={() => setActiveCategory('community admin')}
            >
              Community Admin
            </button>
            <button
              className={`text-lg font-semibold ${
                activeCategory === 'trending' ? 'text-blue-600' : 'text-gray-700'
              }`}
              onClick={() => setActiveCategory('trending')}
            >
              Trending
            </button>
            <button
              className={`text-lg font-semibold ${
                activeCategory === 'unsolved' ? 'text-blue-600' : 'text-gray-700'
              }`}
              onClick={() => setActiveCategory('unsolved')}
            >
              Unsolved
            </button>
          </div>
        </div>

        
        {error && <p className="text-red-600 text-lg mb-6">{error}</p>}

        <div className="space-y-6">
          
          {filterPostsByCategory(activeCategory).map((post) => (
            <div
              key={post.id}
              className="bg-white p-6 rounded-xl shadow-lg flex items-start space-x-4 transform transition-all duration-200 hover:scale-105 hover:shadow-2xl hover:bg-gray-50"
            >
              <div className="w-14 h-14 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-sm font-semibold">
                
                50x50
              </div>
              <div className="flex-1">
                <Link
                  to={`/posts/${post.id}`}
                  className="text-xl font-semibold text-blue-700 hover:underline focus:outline-none"
                >
                  {post.title}
                </Link>
                <p className="text-gray-700 mt-2 line-clamp-2">{post.content}</p>{' '}
               
                <div className="mt-3 text-gray-500 text-sm flex items-center space-x-3">
                  <span>• Posted in {post.category}</span>
                  <span>• {post.user || 'auth.User.None'}</span>
                  <span>• {post.likes_count} 👍</span>
                  <span>• {post.comments_count} 💬</span>
                  <span>• {new Date(post.created_at).toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default PostList;
