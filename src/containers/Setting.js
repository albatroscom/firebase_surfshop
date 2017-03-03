import React from 'react';
import update from 'react-addons-update';
import { Button, Row, Col, Icon, label, Input, Navbar } from 'react-materialize';
import { firebaseApp, firebaseAuth, firebaseDb } from '../database/firebase';

class Setting extends React.Component {
      render() {
            return (
                  <Shops />
            );
      };
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

  //componentWillUpdate(nextProps, nextState) {
    /* !!! CAUTION :: this.setState() 사용하지 말것 무한루프 !!! */
  //}

  render() {
    return (
      <div className="App">
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

class ShopInfo extends React.Component {

  componentDidMount(){
    if (Object.keys(this.props).length > 0) {
      var newShopKey = firebaseDb.ref().child('/Shops/').push().key;
      var updates = {};
      updates['/Shops/' + newShopKey] = this.props;
      firebaseDb.ref().update(updates);
    }
  }

  render() {
    return (
      <div>
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
        <Row>
          <Input s={12} type="text" name="name" placeholder="샵 이름" value={this.state.name} onChange={this.handleChange.bind(this)} />
          <Input s={12} type="text" name="lat" placeholder="구글좌표 lat" value={this.state.lat} onChange={this.handleChange.bind(this)} />
          <Input s={12} type="text" name="lng" placeholder="구글좌표 lng" value={this.state.lng} onChange={this.handleChange.bind(this)} />
          <Input s={12} type="text" name="address" placeholder="주소" value={this.state.address} onChange={this.handleChange.bind(this)} />
          <Input s={6} type="text" name="telephone" placeholder="전화번호" value={this.state.telephone} onChange={this.handleChange.bind(this)} />
          <Input s={6} type="text" name="beach" placeholder="주변 해수욕장" value={this.state.beach} onChange={this.handleChange.bind(this)} />
          <Input s={12} type="text" name="lesson" placeholder="강습내용" value={this.state.lesson} onChange={this.handleChange.bind(this)} />
          <Input s={12} type="text" name="rental" placeholder="렌탈" value={this.state.rental} onChange={this.handleChange.bind(this)} />
          <Input s={6} type="text" name="accommodation" placeholder="숙박시설" value={this.state.accommodation} onChange={this.handleChange.bind(this)} />
          <Input s={6} type="text" name="facillities" placeholder="편의시설" value={this.state.facillities} onChange={this.handleChange.bind(this)} />
          <Input s={4} type="text" name="shower" placeholder="샤워시설" value={this.state.shower} onChange={this.handleChange.bind(this)} />
          <Input s={4} type="text" name="parking" placeholder="주차장" value={this.state.parking} onChange={this.handleChange.bind(this)} />
          <Input s={4} type="text" name="etc" placeholder="기타" value={this.state.etc} onChange={this.handleChange.bind(this)} />
          <Button onClick={this.handleClick.bind(this)}>Insert</Button>
        </Row>
      </div>
    );
  }
}


export default Setting;