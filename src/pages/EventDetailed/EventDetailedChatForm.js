import React from 'react';
import { useFirebase } from 'react-redux-firebase';
import { useDispatch } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { addEventComment } from '../../store/actions/eventActions';
import TextArea from '../../components/Form/TextArea';

const EventDetailedChatForm = ({
  handleSubmit,
  reset,
  eventId,
  closeForm,
  parentId
}) => {
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const handleCommentSubmit = values => {
    dispatch(addEventComment({ firebase }, eventId, values, parentId));
    reset();
    if (parentId !== 0) {
      closeForm();
    }
  };

  return (
    <Form onSubmit={handleSubmit(handleCommentSubmit)}>
      <Field name="comment" type="text" component={TextArea} rows={2} />
      <Button content="댓글 추가" labelPosition="left" icon="edit" primary />
    </Form>
  );
};

export default reduxForm({ Fields: 'comment' })(EventDetailedChatForm);
