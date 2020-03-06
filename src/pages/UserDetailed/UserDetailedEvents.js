import React from 'react';
import { Card, Grid, Header, Image, Segment, Tab } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const panes = [
  { menuItem: '모든 이벤트', panse: { key: 'allEvents' } },
  { menuItem: '지난 이벤트', panse: { key: 'pastEvents' } },
  { menuItem: '다가오는 이벤트', panse: { key: 'futureEvents' } },
  { menuItem: '호스팅', panse: { key: 'hosted' } }
];

const UserDetailedEvents = ({ changeTab, events, loading }) => {
  return (
    <Grid.Column width={12}>
      <Segment attached loading={loading}>
        <Header icon="calendar alternate" content="이벤트" />
        <Tab
          onTabChange={(e, data) => changeTab(e, data)}
          panes={panes}
          menu={{ secondary: true, pointing: true }}
        />
        <br />

        <Card.Group itemsPerRow={5}>
          {events &&
            events.map(event => (
              <Card as={Link} to={`/events/${event.id}`} key={event.id}>
                <Image src={`/assets/categoryImages/${event.category}.jpg`} />
                <Card.Content>
                  <Card.Header textAlign="center">{event.title}</Card.Header>
                  <Card.Meta textAlign="center">
                    <div>
                      {format(event.date && event.date.toDate(), 'dd LLL yyyy')}
                    </div>
                    <div>
                      {format(event.date && event.date.toDate(), 'h:mm a')}
                    </div>
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
        </Card.Group>
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedEvents;
