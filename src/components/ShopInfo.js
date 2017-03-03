import React, { Component } from 'react';
import {Card, CardTitle} from 'react-materialize';

class ShopInfo extends React.Component {
      render() {
            return (
                  <div>
                        <Card 
                              header={<CardTitle reveal image={"http://materializecss.com/images/sample-1.jpg"} waves='light'/>}
                              title={this.props.title} reveal={<p>{this.props.rental}</p>}>
                        <p><a href="#">{this.props.lesson}</a></p>
                        </Card>
                  </div>
            );
      }
}

export default ShopInfo;