import React from 'react'
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { login } from '../../features/userSlice';
import { auth, provider } from '../../firebase';
import wpLogo from '../../wpLogo.png'

function Login() {
    const dispatch = useDispatch();

    const signIn = () =>{
        auth.signInWithPopup(provider)
        .then(userAuth=>{
            console.log(userAuth);
            dispatch(login({
                name: userAuth.user.displayName,
                email: userAuth.user.email,
                photoURL: userAuth.user.photoURL,
                id: userAuth.user.uid
            }))
        })
        .catch(error=>alert(error.message));
    }

    return (
        <LoginContainer>
            <LoginInnerContainer>
                <Logo src={wpLogo} />
                <button onClick={signIn}>Login via Gmail</button>
            </LoginInnerContainer>
        </LoginContainer>
    )
}

export default Login


const Logo = styled.img`
    object-fit: contain;
    width: 200px;
`;

const LoginInnerContainer = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 20px;
    background-color: white;

    > button {
        background-color: blue;
        color: white;
        padding: 10px 15px;
        text-transform: uppercase;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
`;


const LoginContainer = styled.div`
    width: 100%;
    height: 100vh;
    background-color: whitesmoke;
    overflow-y: hidden;

    display: flex;
    justify-content: center;
    align-items: center;
`;
