import React from 'react';
import ReactDOM from 'react-dom';
import CommentBox from './components/CommentBox';
import Hero from './components/Hero';
import Footer from './components/Footer';

ReactDOM.render(
  <div>
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
