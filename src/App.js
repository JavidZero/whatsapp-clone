import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Sidebar from './components/sidebar/Sidebar';
import Main from './components/main/Main';
import Login from './components/login/Login';
import { auth, db } from './firebase';
import { useDispatch } from 'react-redux';
import { login, selectUser } from './features/userSlice';
import { useSelector } from 'react-redux';
import firebase from 'firebase';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    auth.onAuthStateChanged(userAuth => {
      if(userAuth){
        dispatch(
          login({
            name: userAuth.displayName,
            email: userAuth.email,
            photoURL: userAuth.photoURL,
            id: userAuth.uid,
          })
        );
        db.collection("users").doc(userAuth.uid).set({
          name: userAuth.displayName,
          email: userAuth.email,
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          photoURL: userAuth.photoURL,
        },
        {merge: true}
        
        );
        setLoading(false);
      }
      else {
        setLoading(false);
      }
    });
  },[]);

  if(loading){
    return <Loading></Loading>
  }

  return (
    <>
    {!user ?
      (<Login />)
      :
      (<AppContainer>
        <Sidebar />
        <Main />
      </AppContainer>)  
    }
    </>
  )
}

export default App

const Loading = styled.div`
  width: 100%;
  height: 100vh;
  background-color: whitesmoke;
`;

const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

`;