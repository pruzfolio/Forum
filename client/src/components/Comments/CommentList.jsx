const CommentList = ({ comments }) => {
  return (
    <div className="mt-6 space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="bg-gray-100 p-4 rounded shadow-sm">
          <p className="font-medium text-gray-700">{comment.author}</p>
          <p className="text-gray-600">{comment.content}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
