import React, { Component } from 'react';
import {GoogleApiComponent} from 'google-maps-react';

class Container extends React.Component {
  render() {
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    return (
      <div>Map will go here</div>
    )
  }
}

export default GoogleApiComponent({
  apiKey: 'AIzaSyC1o99ZDjfgb8j0fSXgWNrVy-8ohgMNMQw'
})(Container);