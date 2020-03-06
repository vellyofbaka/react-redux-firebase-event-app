import React from 'react';
import { Segment, Button, Header, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

const NotFound = ({ history }) => {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="search" />
        해당 페이지를 찾을 수 없습니다
      </Header>
      <Segment.Inline>
        <Button onClick={() => history.push('/events')} primary>
          이벤트 페이지로 돌아가기
        </Button>
      </Segment.Inline>
    </Segment>
  );
};

export default withRouter(NotFound);
