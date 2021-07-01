import React from 'react'
import styled from 'styled-components';

function SidebarStartChat() {
    
    const startChat = () => {
        const email = alert("Enter email");
    }


    return (
      <SidebarStartChatContainer>
        <button onClick={startChat}>Start a new chat</button>
      </SidebarStartChatContainer>
    );
}

export default SidebarStartChat

const SidebarStartChatContainer = styled.div`
    width: 100%;
    height: 40px;
    background-color: rgba(100, 100, 100, .2);
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;

    >button {
        width:100%;
        border-radius: 20px;
        outline: none;
        padding: 5px;
        cursor: pointer;
    }
`;