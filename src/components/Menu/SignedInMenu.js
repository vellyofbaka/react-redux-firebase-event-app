import React from 'react';
import { Menu, Dropdown, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SignedInMenu = ({ signOut }) => {
  const profile = useSelector(state => state.firebase.profile, []);
  const auth = useSelector(state => state.firebase.auth, []);

  return (
    <Menu.Item position="right">
      <Image
        avatar
        spaced="right"
        src={profile.photoURL || '/assets/user.png'}
      />
      <Dropdown pointing="top left" text={profile.displayName}>
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to={`/profile/${auth.uid}`}
            text="프로파일"
            icon="user circle"
          />
          <Dropdown.Item as={Link} to="/settings" text="세팅" icon="setting" />
          <Dropdown.Item
            onClick={signOut}
            text="나가기"
            icon="sign out alternate"
          />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
};

export default SignedInMenu;
