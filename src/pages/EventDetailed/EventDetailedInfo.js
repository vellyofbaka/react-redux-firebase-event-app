import React, { useState } from 'react';
import { Segment, Grid, Icon, Button } from 'semantic-ui-react';
import { format } from 'date-fns';
import EventDetailedMap from './EventDetailedMap';

const EventDetailedInfo = ({ event }) => {
  const [showMap, setShowMap] = useState(false);
  return (
    <Segment.Group>
      <Segment attached="top">
        <Grid>
          <Grid.Column width={1}>
            <Icon size="large" color="grey" name="info circle" />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{event.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="calendar alternate outline" size="large" color="grey" />
          </Grid.Column>
          <Grid.Column width={15}>
            {event.date && (
              <span>
                {format(event.date.toDate(), 'EEEE do LLLL')} at{' '}
                {format(event.date.toDate(), 'h:mm a')}
              </span>
            )}
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="map marker alternate" size="large" color="grey" />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>{event.venue}</span>
          </Grid.Column>
          <Grid.Column width={4}>
            <Button
              icon="map"
              onClick={() => setShowMap(!showMap)}
              color="orange"
              size="tiny"
              content={showMap ? '지도 감추기' : '지도 보기'}
            />
          </Grid.Column>
        </Grid>
      </Segment>
      {showMap && (
        <EventDetailedMap
          lat={event.venueLatLng.lat}
          lng={event.venueLatLng.lng}
        />
      )}
    </Segment.Group>
  );
};

export default EventDetailedInfo;
