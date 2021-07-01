import React, { useState } from 'react'
import {ArrowForward} from '@material-ui/icons'
import styled from 'styled-components';
import { IconButton } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { db } from '../../firebase';
import firebase from 'firebase';
import { useEffect } from 'react';
 
function MainReply({ chatID, scrollBottom }) {
  const [message, setMessage] = useState("");
  const user = useSelector(selectUser);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
        db.collection("chats").doc(chatID).collection("messages").add({
          text: message,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          author: user.email,
        });
        db.collection("chats").doc(chatID).update({
          lastActive: firebase.firestore.FieldValue.serverTimestamp(),
        });
      setMessage("");
      
      scrollBottom();
    }
  };

  useEffect(() => {
      setMessage('');
  }, [chatID]);

  return (
    <MainReplyContainer>
      <MainReplyForm>
        <input
          type="text"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <IconButton type="submit" onClick={sendMessage}>
          <ArrowForward />
        </IconButton>
      </MainReplyForm>
    </MainReplyContainer>
  );
}

export default MainReply

const MainReplyForm = styled.form`
  min-width: 250px;
  width: 100%;
  height: 40px;
  background-color: transparent;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  gap: 10px;

  > input {
        max-width: 600px;
        flex: 1;
        border: none;
        outline: none;
        border-radius: 20px;
        height: 40px;
        padding: 0 20px;
  }

  > button {
    background-color: green;
    color: white;
    width: 40px !important;
    height: 40px !important;
    
    :hover {
      background-color: green;
    }
  }
`;

const MainReplyContainer = styled.div`
    min-width: 250px;
    width: 100%;
    height: 50px;
    padding: 2px 25px 8px 10px;
    left: 0;
    background-color: transparent;
`;