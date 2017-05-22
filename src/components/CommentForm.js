/*
  Licensed to the Apache Software Foundation (ASF) under one
  or more contributor license agreements.  See the NOTICE file
  distributed with this work for additional information
  regarding copyright ownership.  The ASF licenses this file
  to you under the Apache License, Version 2.0 (the
  "License"); you may not use this file except in compliance
  with the License.  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing,
  software distributed under the License is distributed on an
  "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, either express or implied.  See the License for the
  specific language governing permissions and limitations
  under the License.
 */

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

          <nav className="level">
            <div className="level-left">
              <div className="level-item">
                 <a
                className="button is-info"
                type='submit'
                value='Post'
                onClick={this.handleSubmit}
              >Submit</a>
                </div>
              </div>

             <div className="level-right">
              <div className="level-item">
                 <a
                className="button is-info"
                type='submit'
                value='Logout'
                onClick={this.handleLogout}
              >Logout</a>
                </div>
                </div>
          </nav>
        </div>

      </article >
    )
  }
}

export default CommentForm;