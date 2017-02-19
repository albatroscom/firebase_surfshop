import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <Shops />
    );
  }
}

class Shops extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Surf Shop v0.1</h2>
        </div>
        <ShopCreator />
        <ShopInfo />
      </div>
    );
  }
}

class ShopInfo extends React.Component {
  render() {
    return (
      <div>
      
      </div>
    );
  }
}

class ShopCreator extends React.Component {
  render() {
    return (
      <div>
        <ul className="ul-insert-input">
            <li><input type="text" name="name" placeholder="샵 이름" value="" /></li>
            <li><input type="text" name="lat" placeholder="구글좌표 lat" value="" /></li>
            <li><input type="text" name="lng" placeholder="구글좌표 lng" value="" /></li>
            <li><input type="text" name="address" placeholder="주소" value="" /></li>
            <li><input type="text" name="telephone" placeholder="전화번호" value="" /></li>
            <li><input type="text" name="beach" placeholder="주변 해수욕장" value="" /></li>
            <li><input type="text" name="lesson" placeholder="강습내용" value="" /></li>
            <li><input type="text" name="rental" placeholder="렌탈" value="" /></li>
            <li><input type="text" name="accmmodation" placeholder="숙박시설" value="" /></li>
            <li><input type="text" name="facillities" placeholder="편의시설" value="" /></li>
            <li><input type="text" name="shower" placeholder="샤워시설" value="" /></li>
            <li><input type="text" name="parking" placeholder="주차장" value="" /></li>
            <li><input type="text" name="etc" placeholder="기타" value="" /></li>
        </ul>
      </div>
    );
  }
}



export default App;
