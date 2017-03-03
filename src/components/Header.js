import React from 'react';
import { Link } from 'react-router';
import { Button, Row, Col, Icon, label, Input, Navbar, NavItem } from 'react-materialize';
import './Header.css';

const MenuItems = ({active, children, to}) => (
      <Link to={to} className={`menu-item ${active ? 'active' : ''}`}>
            {children}
      </Link>
);

const Header = (props, context) => {
      const { router } = context;
      return (
            <div>
                  <Navbar brand="SurfShop v0.1" right>
                        <MenuItems to={'/'} active={router.isActive('/', true)}>Home</MenuItems>
                        <MenuItems to={'/post'} active={router.isActive('/post')}>Post</MenuItems>
                        <MenuItems to={'/setting'} active={router.isActive('/setting')}>Setting</MenuItems>
                  </Navbar>
                  {/*<div className="logo">
                        Surf Shop v1.0
                  </div>
                  <div className="menu">
                        <MenuItem to={'/'} active={router.isActive('/', true)}>홈</MenuItem>
                        <MenuItem to={'/about'} active={router.isActive('/about')}>소개</MenuItem>
                        <MenuItem to={'/post'} active={router.isActive('/post')}>설정</MenuItem>
                  </div>*/}
            </div>
      );
};

Header.contextTypes = {
      router : React.PropTypes.object
}

export default Header;