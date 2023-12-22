import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import BlogPostList from './components/BlogPostList';
import BlogPost from './components/BlogPost';
import AboutPage from './components/About';
import NavBar from './components/NavBar';

function App(){
    return (
        <Router>
          <NavBar />
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/api/posts" element={<BlogPostList />} />
          {/* <Route path="/posts/:postId" component={BlogPost} />
          <Route path="/about" component={AboutPage} /> */}
        </Routes>
      </Router>
    );
}

export default App;