import React, { Component } from 'react';
import 'bulma/css/bulma.css'

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            author: 'Anton Dochtermann', 
            twitter: 'mathgeek',
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

        // this.setState({ author: '', imageURL: '', twitter: '' });

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
        placeholder="full name"/>
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
        placeholder="image URL"/>
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
        placeholder="twitter handle"/>
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