import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BlogPostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch blog posts from the backend when the component mounts
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/posts'); // Adjust the URL based on your backend configuration
        console.log('DB response:', response);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Blog Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default BlogPostList;