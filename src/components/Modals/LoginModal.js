import React from 'react';
import { Modal } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';

import LoginForm from '../Auth/LoginForm';
import { closeModal } from '../../store/actions/modalActions';

const LoginModal = () => {
  const dispatch = useDispatch();
  return (
    <Modal
      dimmer="blurring"
      size="mini"
      open={true}
      onClose={() => dispatch(closeModal())}
    >
      <Modal.Header>Login</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <LoginForm />
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default LoginModal;
