import React from 'react';
import ReactDOM from 'react-dom';
import CommentBox from './CommentBox';
import Hero from './Hero';
import Footer from './Footer';

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
