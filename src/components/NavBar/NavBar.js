import React from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { useFirebase } from 'react-redux-firebase';
import SignedInMenu from '../Menu/SignedInMenu';
import SignedOutMenu from '../Menu/SignedOutMenu';

const NavBar = ({ history }) => {
  const firebase = useFirebase();
  const auth = useSelector(state => state.firebase.auth, []);

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        history.push('/');
      });
  };
  const authenticated = auth.isLoaded && !auth.isEmpty;

  return (
    // <Segment inverted color="gray">
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={Link} to="/" header name="Event App"></Menu.Item>
        <Menu.Item as={NavLink} exact to="/events" name="이벤트" />
        {authenticated && (
          <>
            <Menu.Item>
              <Button
                as={Link}
                to="/createEvent"
                floated="right"
                // positive
                // inverted
                primary
                content="이벤트 생성"
              />
            </Menu.Item>
          </>
        )}
        {authenticated ? (
          <SignedInMenu signOut={handleLogout} />
        ) : (
          <SignedOutMenu />
        )}
      </Container>
    </Menu>
    // </Segment>
  );
};

export default withRouter(NavBar);
