import React, { Component } from 'react';
import marked from 'marked';

import 'bulma/css/bulma.css'

class Comment extends Component {
  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString());
    return { __html: rawMarkup };
  }

  render() {
    return (
      <div className="box">
      <article className="media">
        <figure className="media-left">
          <p className="image is-64x64">
            <img alt="Image" src={this.props.imageURL} />
          </p>
        </figure>
        <div className="media-content">
          <div className="content">
            <strong>{this.props.author}</strong> <small>@{this.props.twitter}</small> <small>31m</small>
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
      </div>
    )
  }
}

export default Comment;