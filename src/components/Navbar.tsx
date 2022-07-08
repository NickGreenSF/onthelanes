import { useState, useContext } from 'react';
import styled from 'styled-components';
import { AuthUserContext } from '../contexts/AuthContext';
import logo from '../constants/logo.png';

const width: number = window.innerWidth;
const height: number = window.innerHeight;

const white = '#e6f1ff';
const navy = '#0a192f';

const NGSFBar = styled.div`
  position: sticky;
  top: 0;
  z-index: 2;
  height: ${height / 15}px;
  background-color: ${white};
  box-shadow: 1px 1px 1px 1px black;
  @media screen and (max-width: 1000px) {
    visibility: hidden;
  }
`;

const NavbarLink = styled.a`
  display: inline-block;
  position: absolute;
  margin-top: ${height / 60}px;
  color: gray;
  :hover {
    color: white;
    cursor: pointer;
    text-decoration: none;
  }
`;

const CreateGameButton = styled.a`
  display: inline-block;
  position: absolute;
  margin-top: ${height / 120}px;
  color: gray;
  background-color: ${navy};
  border-radius: 10px;
  padding: ${height / 60}px;
  padding-top: ${height / 120}px;
  padding-bottom: ${height / 120}px;
  :hover {
    color: white;
    cursor: pointer;
    text-decoration: none;
  }
`;

const DropDownComp = styled.div`
  background-color: green;
`;

const initBool = false;

export default function Navbar() {
  const authContext = useContext(AuthUserContext);
  const [show, setShow] = useState(initBool);

  return (
    <NGSFBar>
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
      <img alt="" src={logo} />
      <NavbarLink style={{ right: width * 0.8 }} href="./">
        Home
      </NavbarLink>
      <CreateGameButton style={{ right: width * 0.6 }} href="./creategame">
        Add a Score
      </CreateGameButton>
      {authContext.user ? (
        <NavbarLink
          onMouseOver={() => setShow(true)}
          onMouseOut={() => setShow(false)}
          style={{ right: width * 0.4 }}
        >
          {authContext.username}
          <DropDownComp style={{ display: show ? 'block' : 'none' }}>
            Sign Out
          </DropDownComp>
        </NavbarLink>
      ) : (
        <span>
          <NavbarLink style={{ right: width * 0.4 }} href="./register">
            Register
          </NavbarLink>
          <NavbarLink style={{ right: width * 0.2 }} href="./login">
            Login
          </NavbarLink>
        </span>
      )}
    </NGSFBar>
  );
}
