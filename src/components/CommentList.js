
//CommentList.js
import React, { Component } from 'react';
import Comment from './Comment';

import 'bulma/css/bulma.css';

class CommentList extends Component {
  render() {
    let commentNodes = this.props.data.map(comment => {
      return (
        <Comment
          author={comment.author}
          uniqueID={comment['_id']}
          key={comment['_id']}
          imageURL={comment['imageURL']}
          twitter={comment['twitter']}
          onCommentDelete={this.props.onCommentDelete}
        >
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