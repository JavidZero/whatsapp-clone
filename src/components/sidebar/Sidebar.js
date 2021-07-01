import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import SidebarHeader from './SidebarHeader';
import SidebarBody from './SidebarBody';
import SidebarSearch from './SidebarSearch';
//import SidebarStartChat from './SidebarStartChat';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { db } from '../../firebase';
import { useDispatch } from 'react-redux';
import { setChat } from '../../features/chatSlice';

function Sidebar() {
    const [chats, setChats] = useState([]);
    const user = useSelector(selectUser);
    const dispatch = useDispatch()

    useEffect(()=>{
        db.collection("chats")
          .where("users", "array-contains", user.email)
          .orderBy('lastActive', 'desc')
          .onSnapshot((snapshot) => {
            var chats = [];
            snapshot.forEach((doc) => {
              var chat = {
                id: doc.id,
                users: doc.data().users,
              };
              chats.push(chat);
            });
            setChats(chats);
          });
    },[user])

    const setActiveChat = (id) =>{
        dispatch(setChat({
            id: id,
        }))
    }

    return (
      <SidebarContainer>
        <SidebarHeader />
        <SidebarSearch chats={chats} />
        <SidebarBody chats={chats} setActiveChat={setActiveChat} />
      </SidebarContainer>
    );
}

export default Sidebar


const SidebarContainer = styled.div`
    min-width: 250px;
    max-width: 500px;
    flex: .3;
    height: 100%;

    border-right: 1px solid rgba(100, 100, 100, .3);

    display: flex;
    flex-direction: column;
`;

