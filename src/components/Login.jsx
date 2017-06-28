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
import 'bulma/css/bulma.css'

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      author: 'Thomas J. Watson',
      twitter: 'blueguy',
      imageURL: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg'
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleTwitterChange = this.handleTwitterChange.bind(this);
    this.handleImageURLChange = this.handleImageURLChange.bind(this);
  }

  handleSubmit(e) {
    console.log('Logging in');
    e.preventDefault();
    const author = this.state.author.trim();
    const twitter = this.state.twitter.trim();
    const imageURL = this.state.imageURL.trim();

    if (!author || !twitter || !imageURL) {
      console.log(`Missing info, author: ${author} and twitter: ${twitter}`);
      return;
    }

    this.props.onLogin(
      {
        author: author,
        imageURL: imageURL,
        twitter: twitter
      });
  }

  handleAuthorChange(e) {
    this.setState({ author: e.target.value });
  }

  handleTwitterChange(e) {
    this.setState({ twitter: e.target.value });
  }

  handleImageURLChange(e) {
    this.setState({ imageURL: e.target.value });
  }

  render() {
    return (
      <div>
        <div className="field">
          <p className="control has-icons-left">
            <input className="input" type="text"
              onChange={this.handleAuthorChange}
              value={this.state.author}
              placeholder="full name" />
            <span className="icon is-small is-left">
              <i className="fa fa-envelope"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <input className="input" type="text"
              onChange={this.handleImageURLChange}
              value={this.state.imageURL}
              placeholder="image URL" />
            <span className="icon is-small is-left">
              <i className="fa fa-image"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <input className="input" type="text"
              onChange={this.handleTwitterChange}
              value={this.state.twitter}
              placeholder="twitter handle" />
            <span className="icon is-small is-left">
              <i className="fa fa-twitter"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control">
            <button
              className="button is-success"
              onClick={this.handleSubmit}
            >
              Login
    </button>
          </p>
        </div>
      </div>
    )
  }
}

export default Login;