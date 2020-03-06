import React from 'react';
import { Button, Grid, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const UserDetailedSidebar = ({ isCurrentUser }) => {
  return (
    <Grid.Column width={4}>
      {isCurrentUser && (
        <Segment>
          <Button
            as={Link}
            to="/settings"
            positive
            fluid
            content="프로필 수정"
          />
        </Segment>
      )}
    </Grid.Column>
  );
};

export default UserDetailedSidebar;
