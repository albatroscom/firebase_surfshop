import React, { Component } from 'react';
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
import { firebaseDb } from '../database/firebase';
import ShopInfo from '../components/ShopInfo';

var shopCounterRef = firebaseDb.ref('Shops/');
var shoplist = []; 
shopCounterRef.orderByChild("name").on("child_added", function(data) {
      shoplist.push(data.val());
});

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow : false,
      activeMarker : {},
      selectedPlace : {}
    }
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  render() {
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    return (
      <Map google={this.props.google}
        style={{width: '100%', height: '100%', position: 'relative'}}
        className={'map'}
        zoom={8}>
      {
        shoplist.map((shops, i) => {
        return(
          <Marker onClick={this.onMarkerClick} name={shops.name} lesson={shops.lesson} rental={shops.rental} position={{lat: shops.lat, lng: shops.lng}} key={i}/>
          );
        })
      }
      <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow}> 
        <div>
          <ShopInfo title={this.state.selectedPlace.name} lesson={this.state.selectedPlace.lesson} rental={this.state.selectedPlace.rental} />
        </div>
      </InfoWindow>
    </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC1o99ZDjfgb8j0fSXgWNrVy-8ohgMNMQw'
})(Home)