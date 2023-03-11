//**===================This is stuff for authenticate when login =======================*/

/**
 ** Return if user is logged in
 ** This is completely up to you and how you want to store the token in your frontend application
 *  ? e.g. If you are using cookies to store the application please update this function
 */
export const isUserLoggedIn = () => localStorage.getItem('userData')
export const getUserData = () => JSON.parse(localStorage.getItem('userData'))
export const getAccessToken = () => JSON.parse(localStorage.getItem('accessToken')) || {token:''}
export const getRefreshToken = () => JSON.parse(localStorage.getItem('refreshToken')) || {token:''}

export const isAccessTokenExpire = () =>{
    const token = getAccessToken();
    const expire =  token.expires;
    const tmp_date =  new Date();
    // console.log("now: ", tmp_date)
    // console.log("exp: ", new Date(expire))
    let expire_tme = new Date(expire).getTime();
    let time_now = tmp_date.getTime();
    return expire_tme < time_now
}

export const isRefreshTokenExpire = () =>{
  const token = getRefreshToken();
  const expire =  token.expire;
  return expire > new Date().toISOString();
}
/**
 ** This function is used for demo purpose route navigation
 ** In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 ** Please note role field is just for showing purpose it's not used by anything in frontend
 ** We are checking role just for ease
 * ? NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 * @param {String} userRole Role of user
 */
 export const getHomeRouteForLoggedInUser = userRole => {
    if (userRole === 'admin') return "/"
    if (userRole === 'client') return '/access-control'
    return '/login'
  }