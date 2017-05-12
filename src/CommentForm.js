//CommentForm.js

import React, { Component } from 'react';
// import style from './style';
import 'bulma/css/bulma.css';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = { author: '', text: '' };
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
      <section class="section">
      <div className="container">
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <label className="label">Name</label>
          <p className="control">
            <input
              className="input"
              type='text'
              placeholder='Your name...'
              value={this.state.author}
              onChange={this.handleAuthorChange} />
          </p>
        </div>

        <div className="field">
          <label className="label">Message</label>
          <p className="control">
            <input
              className="input"
              type='text'
              placeholder='Say something...'
              value={this.state.text}
              onChange={this.handleTextChange} />
          </p>
        </div>

        <div className="field">
          <p className="control">
            <input
              className="button is-primary"
              type='submit'
              value='Post' />
          </p>
        </div>
      </form>
      </div>
      </section>
    )
  }
}

export default CommentForm;