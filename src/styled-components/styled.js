import { Avatar } from '@material-ui/core';
import styled from 'styled-components';


export const UserAvatar = styled(Avatar)`
    border-radius: 50% !important;
    width: ${({ size }) => size}px !important;
    height: ${({ size }) => size}px !important;
`;