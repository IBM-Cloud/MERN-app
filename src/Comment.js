import React, { Component } from 'react';
// import style from './style';
import marked from 'marked';

import 'bulma/css/bulma.css'

class Comment extends Component {
  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString());
    return { __html: rawMarkup };
  }

  render() {
    return (
      <article className="media">
        <figure className="media-left">
          <p className="image is-64x64">
            <img alt="avatar" src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg" />
          </p>
        </figure>
        <div className="media-content">
          <div className="content">
            <strong>{this.props.author}</strong> <small>@johnsmith</small>
            <br />
            <span dangerouslySetInnerHTML={this.rawMarkup()} />
          </div>
          <nav className="level is-mobile">
            <div className="level-left">
              <a className="level-item">
                <span className="icon is-small"><i className="fa fa-reply"></i></span>
              </a>
              <a className="level-item">
                <span className="icon is-small"><i className="fa fa-retweet"></i></span>
              </a>
              <a className="level-item">
                <span className="icon is-small"><i className="fa fa-heart"></i></span>
              </a>
            </div>
          </nav>
        </div>
        <div>
          <button className="delete"></button>
        </div>
      </article>
    )
  }
}

export default Comment;