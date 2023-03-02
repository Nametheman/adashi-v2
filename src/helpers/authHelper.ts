// import jwtDecode from "jwt-decode";

export const frontend_url = window.location.origin || process.env.REACT_APP_FRONTEND_URL;

export const decodeToken = (data: any) => {
  localStorage.setItem('token', data.access_token);
  // localStorage.setItem("expiry", data.expires_at);
  const clientSide = {
    id: data.data.id,
    name: data.data.name,
    email: data.data.email,
    phone: data.data.phone,
    last_name: data.data.last_name,
    status: data.data.status,
    avatar: data.data.user_profile.avatar,
    bvn_verified: data.data.user_profile.bvn_verified,
    wallet: data.data.wallet.balance,
    role: data.data.roles[0].id,
  };
  localStorage.setItem('user', JSON.stringify(clientSide));
};

export const userData = () => {
  // let expiry: any = localStorage.getItem("expiry");
  // console.log(expiry);
  // const curr = new Date();
  // try {
  //   jwtDecode(token);
  //   const { exp }: any = jwtDecode(token);
  //   if (Date.now() >= exp * 1000) {
  //     logoutUser();
  //   }
  // } catch (err) {
  //   // return false;
  //   // console.log("please logout and login");
  // }

  // let token: any = localStorage.getItem("token");
  // try {
  //   jwtDecode(token);
  //   const { exp }: any = jwtDecode(token);
  //   if (Date.now() >= exp * 1000) {
  //     logoutUser();
  //   }
  // } catch (err) {
  //   // return false;
  //   // console.log("please logout and login");
  // }
  let rawUserData: any = localStorage.getItem('user');
  let user = JSON.parse(rawUserData);
  return user;
};

export function logoutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.sessionStorage.clear();
  // localStorage.removeItem("expiry");
  window.location.pathname = '/login';
}
