import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { getPostDetail, likePost, getComments } from '../../api/api';
import CommentList from '../Comments/CommentList';
import AddComment from '../Comments/AddComment';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate(); 

  
  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await getPostDetail(id, token);
        setPost(response.data);
        setLiked(response.data.liked); 
      } catch (err) {
        setError('Failed to fetch post details');
        console.error(err);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await getComments(id, token);
        setComments(response.data);
      } catch (err) {
        setError('Failed to fetch comments');
        console.error(err);
      }
    };

    if (token) {
      fetchPostDetail();
      fetchComments();
    } else {
      setError('Please log in to view this post');
    }

    setLoading(false); 
  }, [id, token]);

  
  const handleLike = async () => {
    try {
      await likePost(id, token);
      setLiked(!liked); 
    } catch (err) {
      setError('Error toggling like status');
      console.error(err);
    }
  };

  if (loading) return <p className="text-center text-lg">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto mt-24 px-6">
      {error && <p className="text-red-500 text-center text-lg">{error}</p>} 

      {post && (
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h1 className="text-4xl font-bold text-gray-900">{post.title}</h1>
          <p className="mt-3 text-gray-600 text-lg">by <span className="font-semibold">{post.created_by}</span></p>
          <p className="mt-4 text-gray-700">{post.content}</p>

          <button
            onClick={handleLike}
            className={`mt-6 px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 transform ${liked ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} hover:scale-105`}
          >
            {liked ? 'Unlike' : 'Like'} ({post.like_count})
          </button>
        </div>
      )}

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-900">Comments</h2>
        <div className="space-y-6 mt-6">
          <CommentList comments={comments} />
        </div>
        <div className="mt-8">
          <AddComment postId={id} />
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
