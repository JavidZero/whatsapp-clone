import React, {useState} from 'react';
import styled from 'styled-components';
import { IconButton } from "@material-ui/core";
import { DonutLarge, Message, MoreVert } from "@material-ui/icons";
import { UserAvatar } from '../../styled-components/styled';
import { auth } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../../features/userSlice';

function SidebarHeader() {
    const [showHeaderMenu, setShowHeaderMenu] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    const logOut =()=>{  
      setShowHeaderMenu(false);
      auth.signOut().then(()=>{
        dispatch(logout());
      });
    }

    return (
      <SidebarHeaderContainer>
        {/* User Profile */}
        <UserAvatar size={37} src={user.photoURL} />
        <h6>{user.name}</h6>
        {/* Buttons */}
        <SidebarOptions>
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Message />
          </IconButton>
          <IconButton onClick={() => setShowHeaderMenu(!showHeaderMenu)}>
            <MoreVert />
          </IconButton>
        </SidebarOptions>
        {/* Links */}
        <SidebarLinks show={showHeaderMenu}>
          <li>New Group</li>
          <li>Create a room</li>
          <li>Profile</li>
          <li>Archived</li>
          <li>Starred</li>
          <li>Settings</li>
          <li onClick={logOut}>Log Out</li>
        </SidebarLinks>
      </SidebarHeaderContainer>
    );
}

export default SidebarHeader

const SidebarLinks = styled.ul`
    list-style: none;
    width: 140px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 2px 2px 4px rgba(0,0,0, .2),
    -2px -2px 4px rgba(0,0,0,.2);
    display: none;
    padding: 5px 0;

    position: absolute;
    right: 20px;
    top: 50px;
    z-index: 10;

    > li {
        padding: 5px 20px;
        color: grey;
        cursor: pointer;

        :hover{
            background-color: whitesmoke;
        }
    }

    ${({ show }) => show && `
        display: block;
    `}
`;

const SidebarOptions = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap:2px;
    align-items: center;

    button > .MuiSvgIcon-root {
        width: 25px !important;
        height: 25px !important;
        color: grey !important;
    }   
`;

const SidebarHeaderContainer = styled.div`
    width: 100%;
    height: 60px;
    padding: 10px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(100, 100, 100, .1);
    border-bottom: 1px solid rgba(100, 100, 100, .3);

    position: relative;

    > h6 {
      margin-left: 5px;
    }
`;
