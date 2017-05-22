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

class Footer extends Component {

  render() {
    return (
        <footer className="footer">
  <div className="container">
    <div className="content has-text-centered">
      <p>
        <strong>MERN example</strong> by <a href="http://jgthms.com">Robert F. Dickerson</a>. 
        The source code is licensed
         <a href="http://opensource.org/licenses/mit-license.php"> MIT</a>.
      </p>
      <p>
        <a className="icon" href="https://github.com/rfdickerson/mern-example">
          <i className="fa fa-github"></i>
        </a>
      </p>
    </div>
  </div>
</footer>
    )
  }
}

export default Footer;