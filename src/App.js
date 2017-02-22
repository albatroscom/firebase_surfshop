import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import update from 'react-addons-update';
import * as firebase from 'firebase';

const config = {
  apiKey : "AIzaSyC1o99ZDjfgb8j0fSXgWNrVy-8ohgMNMQw",
  authDomain : "react-tutorial-49e45.firebaseapp.com",
  databaseURL : "https://react-tutorial-49e45.firebaseio.com",
  storageBucket : "react-tutorial-49e45.appspot.com"
};
firebase.initializeApp(config);
var database = firebase.database();

class App extends Component {
  render() {
    return (
      <Shops />
    );
  }
}

class Shops extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      shopData : []
    }; 
  }

  _insertShop(name, lat, lng, address, telephone, beach, lesson, rental, accommodation, facillities, shower, parking, etc) {
    let newState = update(this.state, {
      shopData : {
        $push : [{
            "name" : name,
            "lat" : lat,
            "lng" : lng,
            "address" : address,
            "telephone" : telephone, 
            "beach" : beach,
            "lesson" : lesson,
            "rental" : rental, 
            "accommodation" : accommodation, 
            "facillities" : facillities, 
            "shower" : shower,
            "parking" : parking,
            "etc" : etc
        }]
      }
    });
    this.setState(newState);
  }

  componentWillUpdate(nextProps, nextState) {
    //console.log("componentWillUpdate: " + JSON.stringify(nextProps) + " " + JSON.stringify(nextState));
    //console.log(JSON.stringify(nextState.shopData));
    //console.log(Object.keys(nextState.shopData[0]));
    //for(var key in nextState.shopData[0]) {
        //console.log("key : " + key);
        //console.log("data : " + nextState.shopData[0][key]);
    //}
    var newShopKey = database.ref().child('/Shops/').push().key;
    var updates = {};
    updates['/Shops/' + newShopKey] =  nextState.shopData[0];
    firebase.database().ref().update(updates);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Surf Shop v0.1</h2>
        </div>
        <Login />
        <ShopCreator onInsert={this._insertShop.bind(this)} />
        {this.state.shopData.map((shop, i) => {
          return(<ShopInfo 
            name={shop.name} 
            lat={shop.lat}
            lng={shop.lng}
            address={shop.address}
            telephone={shop.telephone}
            beach={shop.beach}
            lesson={shop.lesson}
            rental={shop.rental}
            accommodation={shop.accommodation}
            facillities={shop.facillities}
            shower={shop.shower}
            parking={shop.parking}
            etc={shop.etc}
            key={i}
           />);
        })}
      </div>
    );
  }
}

class Login extends React.Component {
 
  handleLoginClick() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
    }).catch(function(error) {
      alert(error.message);
    });

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log(user);
      }
    });
  }

  handleLogoutClick() {
    firebase.auth().signOut().then(function() {
      alert("logout!");
    }).catch(function(error) {
      alert(error.message);
    });
  }

  render() {
    return(
      <div>
        <span ref={ref => this.span = ref}></span>
        <button onClick={this.handleLoginClick.bind(this)}>Sign in with Google</button>
        <button onClick={this.handleLogoutClick.bind(this)}>Sign Out with Google</button>
      </div>
    );
  }
}

class ShopInfo extends React.Component {
  render() {
    return (
      <div>
        <li>
            {this.props.name} / 
            {this.props.lat} / 
            {this.props.lng} / 
            {this.props.address} / 
            {this.props.telephone} / 
            {this.props.beach} / 
            {this.props.lesson} / 
            {this.props.rental} / 
            {this.props.accommodation} / 
            {this.props.facillities}/ 
            {this.props.shower} / 
            {this.props.parking} / 
            {this.props.etc}
        </li>
      </div>
    );
  }
}

class ShopCreator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name : "",
      lat : "",
      lng : "",
      address : "",
      telephone : "",
      beach : "",
      lesson : "",
      rental : "",
      accommodation : "",
      facillities : "",
      shower : "",
      parking : "",
      etc : ""
    };
  }

  handleClick(e) {
    this.props.onInsert(
      this.state.name, 
      this.state.lat,
      this.state.lng,
      this.state.address,
      this.state.telephone,
      this.state.beach,
      this.state.lesson, 
      this.state.rental, 
      this.state.accommodation, 
      this.state.facillities, 
      this.state.shower, 
      this.state.parking, 
      this.state.etc
    );
    this.setState({
      name : "",
      lat : "",
      lng : "",
      address : "",
      telephone : "",
      beach : "",
      lesson : "",
      rental : "",
      accommodation : "",
      facillities : "",
      shower : "",
      parking : "",
      etc : ""
    });
  }

  handleChange(e){
    var nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  render() {
    return (
      <div>
        <ul className="ul-insert-input">
            <li><input type="text" name="name" placeholder="샵 이름" value={this.state.name} onChange={this.handleChange.bind(this)} /></li>
            <li><input type="text" name="lat" placeholder="구글좌표 lat" value={this.state.lat} onChange={this.handleChange.bind(this)} /></li>
            <li><input type="text" name="lng" placeholder="구글좌표 lng" value={this.state.lng} onChange={this.handleChange.bind(this)} /></li>
            <li><input type="text" name="address" placeholder="주소" value={this.state.address} onChange={this.handleChange.bind(this)} /></li>
            <li><input type="text" name="telephone" placeholder="전화번호" value={this.state.telephone} onChange={this.handleChange.bind(this)} /></li>
            <li><input type="text" name="beach" placeholder="주변 해수욕장" value={this.state.beach} onChange={this.handleChange.bind(this)} /></li>
            <li><input type="text" name="lesson" placeholder="강습내용" value={this.state.lesson} onChange={this.handleChange.bind(this)} /></li>
            <li><input type="text" name="rental" placeholder="렌탈" value={this.state.rental} onChange={this.handleChange.bind(this)} /></li>
            <li><input type="text" name="accommodation" placeholder="숙박시설" value={this.state.accommodation} onChange={this.handleChange.bind(this)} /></li>
            <li><input type="text" name="facillities" placeholder="편의시설" value={this.state.facillities} onChange={this.handleChange.bind(this)} /></li>
            <li><input type="text" name="shower" placeholder="샤워시설" value={this.state.shower} onChange={this.handleChange.bind(this)} /></li>
            <li><input type="text" name="parking" placeholder="주차장" value={this.state.parking} onChange={this.handleChange.bind(this)} /></li>
            <li><input type="text" name="etc" placeholder="기타" value={this.state.etc} onChange={this.handleChange.bind(this)} /></li>
            <li><button onClick={this.handleClick.bind(this)}>Insert</button></li>
        </ul>
      </div>
    );
  }
}



export default App;
