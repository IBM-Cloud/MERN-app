
//CommentList.js
import React, { Component } from 'react';
import Comment from './Comment';
// import style from './style';

import 'bulma/css/bulma.css';

class CommentList extends Component {
  render() {
    let commentNodes = this.props.data.map(comment => {
      return (
        <Comment author={comment.author} key={comment['_id']}>
          {comment.text}
        </Comment>
      )
    })
    return (
      <div>
        {commentNodes}
      </div>
    )
  }
}

export default CommentList;