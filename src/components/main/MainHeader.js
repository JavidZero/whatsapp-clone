import { IconButton } from '@material-ui/core';
import { MoreVert, Search } from '@material-ui/icons';
import React from 'react'
import styled from 'styled-components';
import { UserAvatar } from '../../styled-components/styled';

function MainHeader({photo, recepEmail}) {
    return (
      <MainHeaderContainer>
        {photo ? <UserAvatar src={photo} /> : <UserAvatar src="" />}
        <h3>{recepEmail}</h3>
        <MainOptions>
          <IconButton>
            <Search />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </MainOptions>
      </MainHeaderContainer>
    );
}

export default MainHeader

const MainOptions = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    margin-left: auto;
`;

const MainHeaderContainer = styled.div`
  width: 100%;
  height: 60px;
  padding: 10px;

  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(100, 100, 100, 0.1);
  border-bottom: 1px solid rgba(100, 100, 100, 0.3);

  > h3 {
      margin-bottom: auto;
  }
`;