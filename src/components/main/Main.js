import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components';
import { selectChat } from '../../features/chatSlice';
import wpLogo from '../../wpLogo.png';
import MainHeader from './MainHeader';
import MainReply from './MainReply';
import Message from './Message';
import {db} from '../../firebase';
import { selectUser } from '../../features/userSlice';
 
function Main() {
    const user = useSelector(selectUser);
    const chatID = useSelector(selectChat);
    const [receipentEmail, setReceipentEmail] = useState('');
    const [receipent, setReceipent] = useState(null);
    const [messages, setMessages] = useState([]);
    const messageRef = useRef(null);

    const getReceipent = (users, user)=>{
        const email = users.filter((guest)=>guest!== user.email);
        return email[0];
    }

    useEffect(()=>{
      console.log('Called');
      if(chatID){
        db.collection("chats")
          .doc(chatID)
          .collection("messages")
          .orderBy("timestamp", "asc")
          .onSnapshot(snapshot=>{
            var messages = [];
            snapshot.forEach((doc)=>{
              messages.push({
                text: doc.data().text,
                author: doc.data().author,
                id: doc.id,
                timestamp: doc.data().timestamp,
              });
            });
            setMessages(messages);
          });

        db.collection("chats")
          .doc(chatID)
          .get()
          .then((doc)=>{
            setReceipentEmail(getReceipent(doc.data().users, user));
          });

          if (messageRef.current) {
            scrollBottom();
          }
      }
    },[chatID, user]);

    useEffect(() => {
      setReceipent(null);
      db.collection("users")
        .where("email", "==", receipentEmail)
        .onSnapshot((snapshot) => {
          snapshot.forEach((doc) => {
            setReceipent(doc.data());
          });
        });
    }, [receipentEmail]);

    const scrollBottom = () => {
      console.log("scroll function called");
      if (messageRef.current) {
        messageRef.current.scrollTo({
          top: messageRef.current.scrollHeight,
          behavior: "smooth",
        });
        console.log(messageRef.current.scrollHeight);
      }
    };

    if(!chatID){
        return (
          <LandingContainer>
            <Logo src={wpLogo} />
            <h1>Welcome to Whatsapp</h1>
          </LandingContainer>
        );
    }

    return (
      <MainContainer>
        <MainHeader photo={receipent?.photoURL} recepEmail={receipentEmail} />
        <MainBody>
          <MainMessages ref={messageRef}>
            {messages &&
              messages.map((message) => (
                <Message
                  key={message.id}
                  {...message}
                  user={message.author === user.email}
                />
                ))}
          </MainMessages>
          <MainReply chatID={chatID} scrollBottom={scrollBottom} />
        </MainBody>
      </MainContainer>
    );
}

export default Main

const MainMessageBottom = styled.div`
`;

const MainMessages = styled.div`
    overflow-y: scroll;
    width: 100%;
    height: calc(100% - 50px);
    padding:0 10px 10px;
    scroll-behavior: smooth;
`;

const MainBody = styled.div`
    width: 100%;
    flex:1;
    min-height: 300px;
    height:calc(100% - 60px);
    background-color: blueviolet;
`;

const MainContainer = styled.div`
    width: 100%;
    min-width: 300px;
    height: 100vh;
`;

const LandingContainer = styled.div`
    min-width: 150px;
    width: 100%;
    flex: 1;
    background-color: whitesmoke;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const Logo = styled.img`
    width: 80%;
    max-width: 200px;
`;