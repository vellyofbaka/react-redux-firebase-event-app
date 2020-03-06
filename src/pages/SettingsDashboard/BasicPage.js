import React, { useCallback } from 'react';
import { Segment, Form, Header, Divider, Button } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';
import { Field, reduxForm } from 'redux-form';
import DateInput from '../../components/Form/DateInput';
import PlaceInput from '../../components/Form/PlaceInput';
import TextInput from '../../components/Form/TextInput';
import RadioInput from '../../components/Form/RadioInput';
import { addYears } from 'date-fns';
import { updateProfile } from '../../store/actions/userActions';

const BasicPage = ({ pristine, submitting, handleSubmit, initialValues }) => {
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
      <Header dividing size="large" content="기본 정보" />
      <Form onSubmit={handleSubmit(handleUpdateProfile)}>
        <Field
          width={8}
          name="displayName"
          type="text"
          component={TextInput}
          placeholder="Known As"
        />
        <Form.Group inline>
          <label>성별: </label>
          <Field
            name="gender"
            type="radio"
            value="male"
            label="남성"
            component={RadioInput}
          />
          <Field
            name="gender"
            type="radio"
            value="female"
            label="여성"
            component={RadioInput}
          />
        </Form.Group>
        <Field
          width={8}
          name="dateOfBirth"
          component={DateInput}
          placeholder="태어난 날"
          dateFormat="dd LLL yyyy"
          showYearDropdown={true}
          showMonthDropdown={true}
          dropdownMode="select"
          maxDate={addYears(new Date(), -18)}
        />
        <Field
          name="city"
          placeholder="태어난 곳"
          options={{ types: ['(cities)'] }}
          label="Female"
          component={PlaceInput}
          width={8}
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
})(BasicPage);
