import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectUser } from '../../features/userSlice';
import { db } from '../../firebase';
import { UserAvatar } from '../../styled-components/styled'

function SidebarChat({ users, id, setActiveChat}) {
    const [loading, setLoading] = useState(true);
    const user = useSelector(selectUser);
    const [receipentEmail, setReceipentEmail] = useState('');
    const [receipent, setReceipent] = useState("");
    
    const getReceipent = ()=>{
        return users.filter((guest)=>guest!== user.email);
    }
    
    useEffect(()=>{
        const email = getReceipent();
        setReceipentEmail(email[0]);
        db.collection("users")
        .where('email', '==', email[0])
        .onSnapshot((snapshot)=>{
            snapshot.forEach((doc)=>{
                setReceipent(doc.data());
            })
        })
        setLoading(false);
    },[])
    
    if(loading){
        return <>No Function</>
    }

    return (
      <SidebarChatContainer onClick={()=>setActiveChat(id)}>
        <UserAvatar src={receipent?.photoURL} size={43}/>
        <SidebarChatText>
            <h4>{receipentEmail}</h4>
        </SidebarChatText>
      </SidebarChatContainer>
    );
}

export default SidebarChat

const SidebarChatContainer = styled.div`
    width: 100%;
    padding: 10px 10px 10px 10px;
    height: 50px;
    cursor: pointer;

    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    gap: 10px;
    position: relative;

    :hover {
        background-color: rgba(220, 220, 220, .1);
    }
    
`;

const SidebarChatText = styled.div`
    flex: 1;
    height: 100%;


    > h4{
        font-size: 12px;
        font-weight: 500;
    }
`;