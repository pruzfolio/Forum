import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import CreatePost from './components/Posts/CreatePost';
import PostList from './components/Posts/PostList';
import PostDetail from './components/Posts/PostDetail';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto mt-10">
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/posts/create" element={<CreatePost />} />  
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
