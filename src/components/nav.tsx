import React from 'react';
import {
  Alignment,
  Button,
  Classes,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  AnchorButton
} from '@blueprintjs/core';
import { useBasicInfo } from 'src/context/basic-info';
export const Nav = () => {
  const { state } = useBasicInfo();
  return (
    <Navbar>
      <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading>{state && state.companyName}</NavbarHeading>
        <NavbarDivider />
        <AnchorButton
          className={Classes.MINIMAL}
          icon="home"
          text="建立出貨單"
          href="#"
        />
        <AnchorButton
          className={Classes.MINIMAL}
          icon="cog"
          text="基本設定"
          href="#/setting"
        />
        <AnchorButton
          className={Classes.MINIMAL}
          icon="person"
          text="客戶設定"
          href="#/customer"
        />
        <AnchorButton
          className={Classes.MINIMAL}
          icon="box"
          text="產品設定"
          href="#/item"
        />
      </NavbarGroup>
    </Navbar>
  );
};
