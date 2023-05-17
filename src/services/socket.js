import { io } from 'socket.io-client';
import { getAccessToken } from '~/util/auth';
import {SOCKET_URL} from '~/config_env'
const btsid = localStorage.getItem('btsid');
const token = getAccessToken();
export const socket = io(`${process.env.REACT_APP_SOCKET_URL}${btsid}`, {
    auth: {
        token: `${token.token}`,
    },
});
export const mockSocket = io.connect("http://localhost:5000")

export const onSocketConnect = () => {
    console.log('socket: ', socket);
    socket.on('connect', () => {
        console.log('Success');
        socket.on('actions', (data) => {
            console.log('in get data');
            console.log(data);
        });
    });
};
export const onSocketConnectErr = () => {
    socket.on('connect_error', (err) => {
        console.log(err);
    });
};
export const onSocketAction = () => {
    socket.on('actions', (data) => {
        console.log('actions data: ', data);
    });
};
export const onSocketNotification = () => {
    socket.on('notifications', (data) => {
        console.log('notify data: ', data);
    });
};
