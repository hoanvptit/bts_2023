import * as request from '~/util/request';
//** Post request - send data to server to login */
export const login = async (data) => {
  try {
    const res = await request.post(`login`, {
     ...data
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const handleLogin = (data) =>{
  console.log("data = ", data)
 localStorage.setItem('userData', JSON.stringify(data))
  // localStorage.setItem(config.storageTokenKeyName, JSON.stringify(action.payload.accessToken))
  // localStorage.setItem(config.storageRefreshTokenKeyName, JSON.stringify(action.payload.refreshToken))
}
