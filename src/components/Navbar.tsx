import { useState, useContext, Dispatch, SetStateAction } from 'react';
import styled, {
  Keyframes,
  keyframes,
  StyledComponent,
} from 'styled-components';
import { fadeIn } from 'react-animations';
import { AuthUserContext } from '../contexts/AuthContext';
import logo from '../constants/logo.png';
import { fireBaseAuth } from '../firebase/config';
import { width, height, salmon, white, tan } from '../constants/Values';

const fadeInAni: Keyframes = keyframes`${fadeIn}`;

const NGSFBar: StyledComponent<'div', any> = styled.div`
  position: sticky;
  top: 0;
  z-index: 2;
  height: ${height / 15}px;
  background-color: ${tan};
  @media screen and (max-width: 1000px) {
    visibility: hidden;
  }
`;

const NavbarLink: StyledComponent<'a', any> = styled.a`
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

const NavbarField: StyledComponent<'span', any> = styled.span`
  color: black;
  text-decoration: none;
  position: absolute;
  margin-top: ${height / 60}px;
  width: ${width / 15}px;
`;

const CreateGameButton: StyledComponent<'a', any> = styled.a`
  display: inline-block;
  position: absolute;
  margin-top: ${height / 120}px;
  color: black;
  background-color: ${salmon};
  border-radius: 10px;
  border: 1px solid black;
  padding: ${height / 60}px;
  padding-top: ${height / 120}px;
  padding-bottom: ${height / 120}px;
  text-decoration: none;
  :hover {
    color: black;
    cursor: pointer;
    text-decoration: underline;
  }
`;

const DropDownComp: StyledComponent<'div', any> = styled.div`
  padding-top: ${height / 120}px;
  padding-bottom: ${height / 120}px;
  font-size: ${height / 50}px;
  text-align: center;
  border: 1px solid black;
  color: black;
  background-color: ${white};
  animation: 0.25s ${fadeInAni};
  width: ${width / 15}px;
  cursor: pointer;
`;

const FitInLink: StyledComponent<'a', any> = styled.a`
  color: black;
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
  :visited {
    color: black;
    text-decoration: none;
  }
`;

const FitInSpan: StyledComponent<'span', any> = styled.span`
  color: black;
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
  :visited {
    color: black;
    text-decoration: none;
  }
`;

const auth = fireBaseAuth.getAuth();

export default function Navbar() {
  const authContext: {
    user: fireBaseAuth.User | null;
    setUser: (user: fireBaseAuth.User | null) => void;
    username: string | null;
    setUserName: (username: string | null) => void;
    auth: fireBaseAuth.Auth;
    accessed: boolean;
    setAccessed: (acc: boolean) => void;
  } = useContext(AuthUserContext);
  const [dropdownShow, setDropdownShow]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false as boolean);

  const signOut = function (): void {
    try {
      auth.signOut().then(() => {
        authContext.setUser(null);
        authContext.setUserName(null);
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (authContext.accessed === false) {
    return (
      <NGSFBar>
        <a href="./">
          {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
          <img alt="" src={logo} />
        </a>
        <NavbarField style={{ right: width * 0.15 }}>...</NavbarField>
      </NGSFBar>
    );
  }

  return (
    <NGSFBar>
      <a href="./">
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
        <img alt="" src={logo} />
      </a>
      {authContext.user ? (
        <span>
          <CreateGameButton style={{ right: width * 0.3 }} href="./creategame">
            Add a Score
          </CreateGameButton>
          <NavbarField
            onMouseOver={() => setDropdownShow(true)}
            onMouseOut={() => setDropdownShow(false)}
            style={{ right: width * 0.15 }}
          >
            {authContext.username}
            <DropDownComp style={{ display: dropdownShow ? 'block' : 'none' }}>
              <FitInLink href={`./profile?uid=${authContext.user.uid}`}>
                View Profile
              </FitInLink>
            </DropDownComp>
            <DropDownComp
              onClick={() => {
                signOut();
              }}
              style={{ display: dropdownShow ? 'block' : 'none' }}
            >
              <FitInSpan>Sign Out</FitInSpan>
            </DropDownComp>
          </NavbarField>
        </span>
      ) : (
        <span>
          <NavbarLink style={{ right: width * 0.15 }} href="./login">
            Login/Register
          </NavbarLink>
        </span>
      )}
    </NGSFBar>
  );
}
