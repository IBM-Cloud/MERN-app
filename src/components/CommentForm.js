//CommentForm.js

import React, { Component } from 'react';

import 'bulma/css/bulma.css';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      author: 'Anton Dochtermann', 
      twitter: 'mathgeek',
      text: '',
      imageURL: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg' 
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSubmit(e);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let author = this.state.author.trim();
    let text = this.state.text.trim();
    if (!text || !author) {
      console.log(`Missing info, author: ${author} and text: ${text}`);
      return;
    }

    this.props.onCommentSubmit(
      { 
        author: author, 
        text: text, 
        imageURL: this.state.imageURL,
        twitter: this.state.twitter
     });

    this.setState({ text: '' });

  }

  render() {
    return (
      <article className="media">

        <figure className="media-left">
          <p className="image is-64x64">
            <img alt="Avatar" src={this.state.imageURL} />
          </p>
        </figure>
        <div className="media-content">
          <div className="field">
            <p className="control">
              <textarea
                className="textarea"
                placeholder='Add comment...'
                value={this.state.text}
                onChange={this.handleTextChange} 
                onKeyPress={this.handleKeyPress}
                />
            </p>
          </div>

          <div className="field">
            <p className="control">
              <a
                className="button is-info"
                type='submit'
                value='Post'
                onClick={this.handleSubmit}
              >Submit</a>
            </p>
          </div>
        </div>

      </article>
    )
  }
}

export default CommentForm;