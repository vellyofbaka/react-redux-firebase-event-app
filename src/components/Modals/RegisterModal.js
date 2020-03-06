import React from 'react';
import { Modal } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';

import RegisterForm from '../Auth/RegisterForm';
import { closeModal } from '../../store/actions/modalActions';

const RegisterModal = () => {
  const dispatch = useDispatch();
  return (
    <Modal
      dimmer="blurring"
      size="mini"
      open={true}
      onClose={() => dispatch(closeModal())}
    >
      <Modal.Header>Sign Up</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <RegisterForm />
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default RegisterModal;
