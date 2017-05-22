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

class NavBar extends Component {

  render() {
    return (
      <nav className="nav">
  <div className="nav-left">
    {/*<a className="nav-item">
      <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma logo"/>
    </a>*/}
  </div>

  <div className="nav-center">
    <a className="nav-item">
      <span className="icon">
        <i className="fa fa-github"></i>
      </span>
    </a>
    <a className="nav-item">
      <span className="icon">
        <i className="fa fa-twitter"></i>
      </span>
    </a>
  </div>

  <span className="nav-toggle">
    <span></span>
    <span></span>
    <span></span>
  </span>

  <div className="nav-right nav-menu">
    <a className="nav-item">
      Home
    </a>
    <a className="nav-item">
      Documentation
    </a>
    <a className="nav-item">
      Blog
    </a>

    <div className="nav-item">
      <div className="field is-grouped">
        <p className="control">
          <a className="button" >
            <span className="icon">
              <i className="fa fa-twitter"></i>
            </span>
            <span>Tweet</span>
          </a>
        </p>
        <p className="control">
          <a className="button is-primary">
            <span className="icon">
              <i className="fa fa-download"></i>
            </span>
            <span>Download</span>
          </a>
        </p>
      </div>
    </div>
  </div>
</nav>
    )
  }
}

export default NavBar;