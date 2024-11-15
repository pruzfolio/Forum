import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-lg fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-3xl font-extrabold hover:text-blue-200 transition duration-300 transform hover:scale-110">
          C6 Forum
        </Link>
        <div className="hidden md:flex space-x-8">
          <Link to="/posts" className="text-white text-lg font-medium hover:text-blue-200 transition duration-300 transform hover:scale-105">
            Home
          </Link>
          <Link to="/login" className="text-white text-lg font-medium hover:text-blue-200 transition duration-300 transform hover:scale-105">
            Login
          </Link>
          <Link to="/register" className="text-white text-lg font-medium hover:text-blue-200 transition duration-300 transform hover:scale-105">
            Register
          </Link>
        </div>
        {/* Mobile Menu */}
        <div className="md:hidden flex items-center">
          <button className="text-white text-2xl focus:outline-none">
            <i className="fas fa-bars"></i> {/* Optional: Add a hamburger icon */}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
