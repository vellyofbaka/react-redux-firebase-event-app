import React from 'react';
import { useDispatch } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import { openModal } from '../../store/actions/modalActions';

const SignedOutMenu = () => {
  const dispatch = useDispatch();
  return (
    <Menu.Menu position="right">
      <Menu.Item
        name="Login"
        onClick={() => dispatch(openModal('LoginModal'))}
      />
      <Menu.Item
        name="Register"
        onClick={() => dispatch(openModal('RegisterModal'))}
      />
    </Menu.Menu>
  );
};

export default SignedOutMenu;
