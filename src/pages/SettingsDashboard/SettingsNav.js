import React from 'react';
import { Grid, Menu, Header } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const SettingsNav = () => {
  return (
    <Grid.Column width={4}>
      <Menu vertical>
        <Header icon="user" attached inverted color="grey" content="프로필" />
        <Menu.Item as={NavLink} to="/settings/basic">
          기본 정보
        </Menu.Item>
        <Menu.Item as={NavLink} to="/settings/about">
          프로필 정보
        </Menu.Item>
        <Menu.Item as={NavLink} to="/settings/photos">
          프로필 사진
        </Menu.Item>
      </Menu>
      <Grid.Row />
    </Grid.Column>
  );
};

export default SettingsNav;
