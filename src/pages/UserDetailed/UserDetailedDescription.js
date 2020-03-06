import React from 'react';
import { Grid, Header, Icon, Item, List, Segment } from 'semantic-ui-react';
import { format } from 'date-fns';

const UserDetailedDescription = ({ profile }) => {
  let createdAt;
  if (profile.createdAt) {
    createdAt = format(profile.createdAt.toDate(), 'd LLL yyyy');
  }
  return (
    <Grid.Column width={12}>
      <Segment>
        <Grid columns={2}>
          <Grid.Column width={10}>
            <Header
              icon="smile outline"
              content={`About ${profile.displayName}`}
            />
            <p>
              직업: <strong>{profile.occupation || '비공개'}</strong>
            </p>
            <p>
              태어난 곳: <strong>{profile.origin || '비공개'}</strong>
            </p>
            <p>
              회원 가입: <strong>{createdAt}</strong>
            </p>
          </Grid.Column>
          <Grid.Column width={6}>
            <Header icon="heart outline" content="관심사" />
            {profile.interests ? (
              <List>
                {profile.interests &&
                  profile.interests.map((interest, index) => (
                    <Item key={index}>
                      <Icon name="heart" />
                      <Item.Content>{interest}</Item.Content>
                    </Item>
                  ))}
              </List>
            ) : (
              <p>비공개</p>
            )}
          </Grid.Column>
        </Grid>
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedDescription;
