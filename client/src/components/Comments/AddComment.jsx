import { useState } from 'react';
import { addComment } from '../../api/api';

const AddComment = ({ postId }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      setError('Comment cannot be empty');
      return;
    }

    try {
      await addComment({ post: postId, content }, token);
      setContent('');
      setError('');
    } catch (err) {
      setError('Failed to add comment');
    }
  };

  return (
    <div className="mt-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="4"
          className="w-full p-2 border rounded"
          placeholder="Add a comment..."
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Comment
        </button>
      </form>
    </div>
  );
};

export default AddComment;