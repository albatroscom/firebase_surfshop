import React, { Component } from 'react';
import './App.css';
import { Button } from 'react-materialize';
import Header from './components/Header';
import firebase from 'firebase';
import { firebaseAuth } from './database/firebase';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loginTxt : "Sign In with Google",
      logoutTxt : "Sign Out with Google"
    };
  }
 
  handleLoginClick(e) {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebaseAuth.signInWithPopup(provider).then(function(result) {
    }).catch(function(error) {
      alert(error.message);
    });

    var userName = "";

    firebaseAuth.onAuthStateChanged(function(user) {
      if (user) {
        userName = user.displayName;
      }
    });

    if(this.userName!=""){
      this.setState({
        loginTxt : "Sign Out with Google"
      });
    }
  }

  handleLogoutClick(e) {
    firebaseAuth.signOut().then(function() {
      alert("logout!");
    }).catch(function(error) {
      alert(error.message);
    });

    this.setState({
      loginTxt : "Sign In with Google"
    });
  }

  render() {
    return(
      <div>
        <Button className="auth-button" onClick={this.handleLoginClick.bind(this)}>{this.state.loginTxt}</Button>
        <Button className="auth-button-hide" onClick={this.handleLogoutClick.bind(this)}>{this.state.logoutTxt}</Button>
      </div>
    );
  }
}

export default App;
