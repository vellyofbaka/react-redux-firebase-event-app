import React, { useCallback } from 'react';
import { Button, Divider, Form, Header, Segment } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';
import { Field, reduxForm } from 'redux-form';
import RadioInput from '../../components/Form/RadioInput';
import TextInput from '../../components/Form/TextInput';
import TextArea from '../../components/Form/TextArea';
import PlaceInput from '../../components/Form/PlaceInput';
import SelectInput from '../../components/Form/SelectInput';
import { updateProfile } from '../../store/actions/userActions';

const interests = [
  { key: 'drinks', text: '음주', value: 'drinks' },
  { key: 'culture', text: '문화', value: 'culture' },
  { key: 'film', text: '영화', value: 'film' },
  { key: 'food', text: '음식', value: 'food' },
  { key: 'music', text: '음악', value: 'music' },
  { key: 'travel', text: '여행', value: 'travel' }
];

const AboutPage = ({ pristine, submitting, handleSubmit }) => {
  const dispatch = useDispatch();
  const firebase = useFirebase();
  const handleUpdateProfile = useCallback(
    user => {
      return dispatch(updateProfile({ firebase }, user));
    },
    [firebase, dispatch]
  );
  return (
    <Segment>
      <Header dividing size="large" content="프로필 정보" />
      <p>프로필 정보를 최대한 작성해주세요</p>
      <Form onSubmit={handleSubmit(handleUpdateProfile)}>
        <Form.Group inline>
          <label>결혼 유무: </label>
          <Field
            name="status"
            component={RadioInput}
            type="radio"
            value="single"
            label="미혼"
          />
          <Field
            name="status"
            component={RadioInput}
            type="radio"
            value="married"
            label="기혼"
          />
        </Form.Group>
        <Divider />
        <label>자기 소개</label>
        <Field
          name="about"
          component={TextArea}
          placeholder="간단히 자기 소개를 해주세요"
        />
        <Field
          name="interests"
          component={SelectInput}
          options={interests}
          value="interests"
          multiple={true}
          placeholder="관심사를 선택해주세요"
        />
        <Field
          width={8}
          name="occupation"
          type="text"
          component={TextInput}
          placeholder="직업"
        />
        <Field
          width={8}
          name="origin"
          options={{ types: ['(regions)'] }}
          component={PlaceInput}
          placeholder="사는 곳"
        />
        <Divider />
        <Button
          disabled={pristine || submitting}
          size="large"
          positive
          content="업데이트 프로필"
        />
      </Form>
    </Segment>
  );
};

export default reduxForm({
  form: 'userProfile',
  enableReinitialize: true,
  destroyOnUnmount: false
})(AboutPage);
