import React from 'react';
import ReactDOM from 'react-dom';
import CommentBox from './CommentBox';
import Hero from './Hero';

ReactDOM.render(
  <div>
    <Hero />
  <CommentBox 
    url='/api/comments'
    pollInterval={2000} 
  />
  </div>
  ,
  document.getElementById('root')
);
