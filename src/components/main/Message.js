import React from 'react'
import styled from 'styled-components';

function Message({ text, author, id, timestamp, user}) {
  return (
    <MessageContainer user={user}>
        <p>{text}</p>
    </MessageContainer>
    );
}

export default Message

const MessageContainer = styled.div`
  width: 100%;
  display: flex;
  margin-top: 5px;
  justify-content: flex-start;

  > p {
    padding: 10px;
    background-color: white;
    border-radius: 7px;
    left: 0;
    max-width: 80%;
  }

  ${({ user }) =>
    user &&
    `
      justify-content: flex-end;
    `}
`;