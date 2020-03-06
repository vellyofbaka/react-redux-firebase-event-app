import React, { useCallback, useMemo, useRef } from 'react';
import { Header, Segment, Feed, Sticky, Ref, Rail } from 'semantic-ui-react';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import EventActivityItem from './EventActivityItem';

const EventActivity = () => {
  const contextRef = useRef();
  const query = useMemo(
    () => ({
      collection: 'activity',
      orderBy: ['timestamp', 'desc'],
      limit: 5,
      storeAs: 'activity'
    }),
    []
  );
  useFirestoreConnect(query);
  const activitySelector = useCallback(
    state => state.firestore.ordered.activity,
    []
  );
  const activities = useSelector(activitySelector);

  return (
    <Ref innerRef={contextRef}>
      <Rail internal position="right">
        <Sticky context={contextRef} offset={100} styleElement={{ zIndex: 0 }}>
          <Header attached="top" content="최근 활동" />
          <Segment attached>
            <Feed>
              {activities &&
                activities.map(activity => (
                  <EventActivityItem key={activity.id} activity={activity} />
                ))}
            </Feed>
          </Segment>
        </Sticky>
      </Rail>
    </Ref>
  );
};

export default EventActivity;
