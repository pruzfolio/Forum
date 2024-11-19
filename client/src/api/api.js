import axios from 'axios';

const API_URL = 'http://localhost:8000/'; // Adjust this to your backend URL

// Login User
export const loginUser = async (data) => {
  return axios.post(`${API_URL}login/`, data);
};

// Register User
export const registerUser = async (data) => {
  return axios.post(`${API_URL}register/`, data);
};

// Get all posts
export const getPosts = async (token) => {
  return axios.get(`${API_URL}posts/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Get single post details
export const getPostDetail = async (id, token) => {
  return axios.get(`${API_URL}posts/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Like a post
export const likePost = async (postId, token) => {
  return axios.post(`${API_URL}posts/${postId}/like/`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Get comments for a specific post
export const getComments = async (postId, token) => {
  return axios.get(`${API_URL}comments/?post=${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Add a comment to a post
export const addComment = async (data, token) => {
  return axios.post(`${API_URL}comments/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Create a new post
export const createPost = async (data, token) => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('content', data.content);
  formData.append('category', data.category);
  formData.append('labels', data.labels);
  
  if (data.media) {
    formData.append('media', data.media);
  }

  try {
    return await axios.post(`${API_URL}posts/create/`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data', 
      },
    });
  } catch (error) {
    console.error("Error creating post:", error.response ? error.response.data : error.message);
    throw error;
  }
};

