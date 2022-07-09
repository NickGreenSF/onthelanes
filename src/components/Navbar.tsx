import { useState, useContext } from 'react';
import styled, { Keyframes, keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';
import { AuthUserContext } from '../contexts/AuthContext';
import logo from '../constants/logo.png';
import { fireBaseAuth } from '../firebase/config';

const width: number = window.innerWidth;
const height: number = window.innerHeight;

const white = '#e6f1ff';
const navy = '#0a192f';

const fadeInAni = keyframes`${fadeIn}`;

const NGSFBar = styled.div`
  position: sticky;
  top: 0;
  z-index: 2;
  height: ${height / 15}px;
  background-color: white;
  @media screen and (max-width: 1000px) {
    visibility: hidden;
  }
`;

const NavbarLink = styled.a`
  color: black;
  text-decoration: none;
  display: inline-block;
  position: absolute;
  margin-top: ${height / 60}px;
  :hover {
    cursor: pointer;
    text-decoration: none;
  }
`;

const RectLink = styled.a`
  color: black;
  text-decoration: none;
  :hover {
    cursor: pointer;
    text-decoration: none;
  }
`;

const LinkWRect = styled.div`
  display: inline-block;
  position: absolute;
  margin-top: ${height / 60}px;
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

const Rect = styled.div`
  animation: 1s ${fadeInAni};
  width: 100%;
  height: ${height / 120}px;
  background-color: black;
`;

const DropDownComp = styled.div`
  padding-top: ${height / 60}px;
  color: black;
  background-color: white;
`;

const initBool = false;

const auth = fireBaseAuth.getAuth();

export default function Navbar() {
  const authContext = useContext(AuthUserContext);
  const [dropdownShow, setDropdownShow] = useState(initBool);

  const signOut = function () {
    try {
      auth.signOut().then(() => {
        authContext.setUser(null);
        authContext.setUserName(null);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <NGSFBar>
      <a href="./">
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
        <img alt="" src={logo} />
      </a>
      <CreateGameButton style={{ right: width * 0.3 }} href="./creategame">
        Add a Score
      </CreateGameButton>
      {authContext.user ? (
        <NavbarLink
          onMouseOver={() => setDropdownShow(true)}
          onMouseOut={() => setDropdownShow(false)}
          style={{ right: width * 0.15 }}
        >
          {authContext.username}
          <DropDownComp style={{ display: dropdownShow ? 'block' : 'none' }}>
            View Profile
          </DropDownComp>
          <DropDownComp
            onClick={() => {
              signOut();
            }}
            style={{ display: dropdownShow ? 'block' : 'none' }}
          >
            Sign Out
          </DropDownComp>
        </NavbarLink>
      ) : (
        <span>
          <NavbarLink style={{ right: width * 0.15 }} href="./login">
            Login
          </NavbarLink>
        </span>
      )}
    </NGSFBar>
  );
}
