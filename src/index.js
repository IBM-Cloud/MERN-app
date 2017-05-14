import React from 'react';
import ReactDOM from 'react-dom';
import CommentBox from './components/CommentBox';
import Hero from './components/Hero';
import Footer from './components/Footer';
import NavBar from './components/NavBar';

ReactDOM.render(
  <div>
    <NavBar />
    <Hero />
  <CommentBox 
    url='/api/comments'
    pollInterval={2000} 
  />
  <Footer />
  </div>
  ,
  document.getElementById('root')
);
