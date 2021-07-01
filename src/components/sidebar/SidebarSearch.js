import React, { useState } from 'react'
import styled from 'styled-components';
import { Search } from '@material-ui/icons';
import * as EmailValidator from 'email-validator';
import { selectUser } from '../../features/userSlice';
import { useSelector } from 'react-redux';
import firebase from 'firebase'
import { db } from '../../firebase';

function SidebarSearch({chats}) {
    const [inputValue, setInputValue] = useState('');
    const user = useSelector(selectUser);


    const doesChatExist = (guest) =>{
        var bole = false
        chats.forEach((chat)=>{
          if(chat.users.includes(guest)){
            bole =  true;
          }
        })

        return bole;
    }
    
    const handleSubmit = (e)=>{
      e.preventDefault();
      setInputValue('');
      
      if(EmailValidator.validate(inputValue) && inputValue !== user.email){
        if(!doesChatExist(inputValue)){
          db.collection('chats').add({
            type: 'private',
            users: [inputValue, user.email],
            lastActive: firebase.firestore.FieldValue.serverTimestamp(),
          })
        }
        else {
          alert("Chat already exists");
        }
      }
      else {
        console.log('invalid email');
      }
    }

    return (
      <SidebarSearchContainer>
        <SidebarSearchForm>
          <Search />
          <input
            name="email"
            value={inputValue}
            onChange={(e)=>setInputValue(e.target.value)}
            type="text"
            placeholder="Start a new chat"
          />
          <button type="submit" onClick={handleSubmit}></button>
        </SidebarSearchForm>
      </SidebarSearchContainer>
    );
}

export default SidebarSearch


const SidebarSearchForm = styled.form`
    width: 100%;
    height: 100%;
    background-color: white;
    display: flex;
    align-items: center;
    gap: 5%;
    border-radius: 17px;
    padding: 2px 8px;

    > .MuiSvgIcon-root {
        color: grey !important;
        font-size: 20px !important;
        cursor: pointer;
    }

    > input {
        border: none;
        outline: none;
    }

    > button {
      display: none;
    }
`;

const SidebarSearchContainer = styled.div`
  padding: 7px 15px;
  background-color: whitesmoke;
  height: 50px;
  width: 100%;
`;
