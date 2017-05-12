//CommentForm.js

import React, { Component } from 'react';

import 'bulma/css/bulma.css';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = { author: 'Anton', text: '' };
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAuthorChange(e) {
    this.setState({ author: e.target.value });
  }

  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    let author = this.state.author.trim();
    let text = this.state.text.trim();
    if (!text || !author) {
      return;
    }

    this.props.onCommentSubmit({ author: author, text: text });
    this.setState({ author: '', text: '' });

    console.log(`${this.state.author} said ${this.state.text}`)
    // make a POST request here.
  }

  render() {
    return (
      <article className="media">

        <figure className="media-left">
          <p className="image is-64x64">
            <img src="http://bulma.io/images/placeholders/128x128.png" />
          </p>
        </figure>
        <div className="media-content">
          <div className="field">
            <p className="control">
              <textarea
                className="textarea"
                placeholder='Add comment...'
                value={this.state.text}
                onChange={this.handleTextChange} />
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