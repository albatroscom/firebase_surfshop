import React from 'react';
import BigText from '../components/BigText';
import PostLinks from '../components/PostLinks';
import { firebaseApp, firebaseAuth, firebaseDb } from '../database/firebase';
import { Table, thead, tbody, tr, th, td } from 'react-materialize';

const Posts = ({children}) => {

      var shopCounterRef = firebaseDb.ref('Shops/');
      var shoplist = []; 
      shopCounterRef.orderByChild("name").on("child_added", function(data) {
            shoplist.push(data.val());
      });

      return(
            <div>
                  {/*<BigText>포스트</BigText>
                  <PostLinks />
                  {children}*/}
                  <Table className="striped centered">
                        <thead>
                        <tr>
                              <th data-field="name">업체명</th>
                              <th data-field="beach">해수욕장</th>
                              <th data-field="phone">연락처</th>
                              <th data-field="address">주소</th>
                              <th data-field="lesson">강습</th>
                        </tr>
                        </thead>
                        <tbody>
                        {shoplist.map((shop, i) => {
                              return(<tr key={i}> 
                                          <td>{shop.name}</td>
                                          <td>{shop.beach}</td>
                                          <td>{shop.telephone}</td>
                                          <td>{shop.address}</td>
                                          <td>{shop.lesson}</td>
                                    </tr>);
                        })}                              
                        </tbody>
                  </Table>

            </div>
      );
};

export default Posts;