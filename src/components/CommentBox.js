// CommentBox

import React, { Component } from 'react';
import axios from 'axios';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import Login from './Login';

import 'bulma/css/bulma.css';

class CommentBox extends Component {

  constructor(props) {
    super(props);

    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {author: '', imageURL: '', twitter: ''};
    const data = JSON.parse(localStorage.getItem('comments')) || [];
    
    this.state = { 
      data: data,
      userInfo: userInfo
    };

    this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.handleCommentDelete = this.handleCommentDelete.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

  }

  loadCommentsFromServer() {
    axios.get(this.props.url).then( res => {
      localStorage.setItem('comments', JSON.stringify(res.data));
      this.setState({ data: res.data });
    })
  }

  handleCommentSubmit(comment) {

    comment.imageURL = this.state.userInfo.imageURL;
    comment.twitter = this.state.userInfo.twitter;
    comment.author = this.state.userInfo.author;

    let comments = this.state.data;
    comment._id = Date.now();
    let newComments = comments.concat([comment]);
    this.setState({ data: newComments });

    axios.post(this.props.url, comment)
      .catch(err => {
        console.error(err);
      });
  }

  handleLogin(loginInfo) {

    const userInfo = {
            author: loginInfo.author, 
            imageURL: loginInfo.imageURL,
            twitter: loginInfo.twitter
          };

    this.setState({ userInfo: userInfo });

    axios.post(`${this.props.url}/login`, loginInfo)
      .then( res => {
        console.log('Logged in!');
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        
      })
      .catch( err => {
        console.error(err);
      })
  }

  handleLogout() {
    axios.post(`${this.props.url}/logout`)
      .then( res => {
        localStorage.delete('userInfo');
      })
      .catch( err => {
        console.error(err);
      })
  }

  handleCommentDelete(id) {

    let comments = this.state.data;

    let newComments = comments.filter( (t) => {
      return t._id !== id 
    });

    this.setState({ data: newComments });

    axios.delete(`${this.props.url}/${id}`)
      .then(res => {
        console.log('Comment deleted');
      })
      .catch( err => {
        console.error(err);
      })
  }

  componentDidMount() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  }

  render() {
    return (
      <section className="section">
        <div className="container">

        <CommentList 
          data={ this.state.data }
          onCommentDelete={ this.handleCommentDelete }
        />
        <hr/>
        <CommentForm 
          imageURL={ this.state.userInfo.imageURL }
          onCommentSubmit={ this.handleCommentSubmit }
        />
        <br/>
        <Login 
          onLogin={ this.handleLogin }
        />
        </div>
      </section>
    )
  }
}

export default CommentBox;