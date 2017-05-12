import React, { Component } from 'react';
import 'bulma/css/bulma.css'

class Hero extends Component {

  render() {
    return (
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              Social Comment Board
            </h1>
            <h2 className="subtitle">
              MERN application starter
            </h2>
          </div>
        </div>
      </section>
    )
  }
}

export default Hero;