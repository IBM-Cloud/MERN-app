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