/*global google*/
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import {
  useFirestoreConnect,
  useFirebase,
  useFirestore
} from 'react-redux-firebase';
import { initialize } from 'redux-form';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan
} from 'revalidate';
import { Form, Segment, Button, Grid, Header } from 'semantic-ui-react';
import {
  createEvent,
  updateEvent,
  cancelToggle
} from '../../store/actions/eventActions';
import TextInput from './TextInput';
import TextArea from './TextArea';
import SelectInput from './SelectInput';
import DateInput from './DateInput';
import PlaceInput from './PlaceInput';

const validate = combineValidators({
  title: isRequired({ message: '이벤트 제목을 입력해주세요' }),
  category: isRequired({ message: '카테고리를 선택해주세요' }),
  description: composeValidators(
    isRequired({ message: '이벤트 소개를 입력해주세요' }),
    hasLengthGreaterThan(4)({
      message: '이벤트 소개를 최대 다섯 글자 이상 입력주셔야 합니다'
    })
  )(),
  city: isRequired({ message: '이벤트 장소를 입력해주세요' }),
  venue: isRequired({ message: '이벤트 장소을 입력해주세요' }),
  date: isRequired({ message: '이벤트 일시를 선택해주세요' })
});

const category = [
  { key: 'drinks', text: '음주', value: 'drinks' },
  { key: 'culture', text: '문화', value: 'culture' },
  { key: 'film', text: '영화', value: 'film' },
  { key: 'food', text: '음식', value: 'food' },
  { key: 'music', text: '음악', value: 'music' },
  { key: 'travel', text: '여행', value: 'travel' }
];

const EventForm = ({
  change,
  history,
  match: { params },
  invalid,
  submitting,
  pristine,
  handleSubmit
}) => {
  const dispatch = useDispatch();
  const firebase = useFirebase();
  const firestore = useFirestore();
  const [cityLatLng, setCityLatLng] = useState({});
  const [venueLatLng, setVenueLatLng] = useState({});

  useFirestoreConnect(`events/${params.id}`);

  const event = useSelector(
    state =>
      (state.firestore.ordered.events &&
        state.firestore.ordered.events.filter(e => e.id === params.id)[0]) ||
      {}
  );

  useEffect(() => {
    if (Object.keys(event).length > 0) {
      dispatch(initialize('eventForm', event));
    }
  }, [dispatch, event]);

  const handleCitySelect = selectedCity => {
    geocodeByAddress(selectedCity)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        setCityLatLng(latlng);
      })
      .then(() => {
        change('city', selectedCity);
      });
  };

  const handleVenueSelect = selectedVenue => {
    geocodeByAddress(selectedVenue)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        setVenueLatLng(latlng);
      })
      .then(() => {
        change('venue', selectedVenue);
      });
  };

  const handleFormSubmit = async values => {
    values.venueLatLng = venueLatLng;
    if (event.id) {
      dispatch(updateEvent({ firestore }, values));
      history.push(`/events/${event.id}`);
    } else {
      let createdEvent = await dispatch(
        createEvent({ firebase, firestore }, values)
      );
      history.push(`/events/${createdEvent.id}`);
    }
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment>
          <Header content="이벤트 정보" />
          <Form onSubmit={handleSubmit(handleFormSubmit)}>
            <Field
              name="title"
              type="text"
              component={TextInput}
              placeholder="이벤트 제목"
            />
            <Field
              name="category"
              type="text"
              options={category}
              component={SelectInput}
              placeholder="이벤트 카테고리"
            />
            <Field
              name="description"
              type="text"
              rows={3}
              component={TextArea}
              placeholder="이벤트에 대한 간단한 소개"
            />
            <Header content="이벤트 장소" />
            <Field
              name="city"
              type="text"
              component={PlaceInput}
              options={{ typs: ['(cities)'] }}
              placeholder="예) 서울시 강남구"
              onSelect={handleCitySelect}
            />
            <Field
              name="venue"
              type="text"
              component={PlaceInput}
              options={{
                location: new google.maps.LatLng(cityLatLng),
                radius: 1000,
                types: ['establishment']
              }}
              placeholder="예) 강남역 8번 출구"
              onSelect={handleVenueSelect}
            />
            <Field
              name="date"
              type="text"
              component={DateInput}
              dateFormat="yyyy/LL/dd HH:mm"
              timeFormat="HH:mm"
              showTimeSelect
              placeholder="이벤트 일시"
            />
            <Button
              disabled={invalid || submitting || pristine}
              positive
              type="submit"
            >
              제출
            </Button>
            <Button onClick={history.goBack} type="button">
              취소
            </Button>

            <Button
              onClick={() =>
                dispatch(
                  cancelToggle({ firestore }, !event.cancelled, event.id)
                )
              }
              type="button"
              floated="right"
              color={event.cancelled ? 'green' : 'red'}
              content={event.cancelled ? '이벤트 활성화' : '이벤트 취소'}
            />
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default reduxForm({ form: 'eventForm', validate })(EventForm);
