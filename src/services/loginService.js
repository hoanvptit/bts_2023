import * as login_request from '~/util/login_request';
//** Post request - send data to server to login */
export const login = async (data) => {
  try {
    const res = await login_request.post(`auth/login`, {
     ...data
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (data) => {
  try {
    const res = await login_request.post(`auth/logout`, {
     ...data
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const handleLogin = (data) =>{
  const user = data.user
  const tokens = data.tokens
 localStorage.setItem('userData', JSON.stringify(user))
  localStorage.setItem('accessToken', JSON.stringify(tokens.access))
  localStorage.setItem('refreshToken', JSON.stringify(tokens.refresh))
}

export const handleLogout = ()=>{
  localStorage.removeItem('userData')
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}
