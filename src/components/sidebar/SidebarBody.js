import React from 'react';
import styled from 'styled-components';
import SidebarChat from './SidebarChat';

function SidebarBody({chats, setActiveChat}) {
    return (
      <SidebarBodyContainer>
        {/* SidebarChat
                Get chats from firebase and display in row
        */}

        {chats.map((chat)=>(
            <SidebarChat key={chat.id} 
                id={chat.id} 
                users={chat.users} 
                setActiveChat={setActiveChat} 
            />
        ))
        }

      </SidebarBodyContainer>
    );
}

export default SidebarBody

const SidebarBodyContainer = styled.div`
  width: 100%;
  overflow-y: scroll;
  flex: 1;

  > div:not(:last-child) {
    ::after {
      content: "";
      width: calc(100% - 73px);
      height: 1px;
      display: block;
      background-color: rgba(100, 100, 100, 0.2);
      position: absolute;
      bottom: 0;
      right: 10px;
    }
  }
`;