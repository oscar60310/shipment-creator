import React from 'react';
import {
  Alignment,
  Button,
  Classes,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading
} from '@blueprintjs/core';
import { useBasicInfo } from 'src/context/basic-info';
export const Nav = () => {
  const { state } = useBasicInfo();
  return (
    <Navbar>
      <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading>{state && state.companyName}</NavbarHeading>
        <NavbarDivider />
        <Button className={Classes.MINIMAL} icon="home" text="建立出貨單" />
        <Button className={Classes.MINIMAL} icon="cog" text="基本設定" />
      </NavbarGroup>
    </Navbar>
  );
};
