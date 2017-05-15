//CommentForm.js

import React, { Component } from 'react';

import 'bulma/css/bulma.css';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

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
    let text = this.state.text.trim();
    if (!text) {
      console.log(`Missing text: ${text}`);
      return;
    }

    this.props.onCommentSubmit(
      {
        text: text
      });

    this.setState({ text: '' });

  }

  handleLogout(e) {
    e.preventDefault();
    this.props.onLogout();
  }

  render() {
    return (
      <article className="media">
        <figure className="media-left">
          <p className="image is-64x64">
            <img alt="Avatar" src={this.props.imageURL} />
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

          <div className="field">
            <p className="control">
              <a
                className="button is-info"
                type='submit'
                value='Logout'
                onClick={this.props.onLogout}
              >Logout</a>
            </p>
          </div>
        </div>

      </article >
    )
  }
}

export default CommentForm;