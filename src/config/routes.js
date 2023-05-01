const routeConfig = {
    home: '/',
    login: '/login',
    profile: '/@:nickname',
    createAccount: '/createAccount',
    homeBts: '/bts_home/:btsId',
    controlDevices: function (btsId=":btsId") {
        return `/bts/${btsId}/control_devices`;
    },
    manageDevices: function (btsId=":btsId") {
        return `/bts/${btsId}/manage_devices`;
    },
    manageAccounts: function (btsId=":btsId") {
        return `/bts/${btsId}/manage_accounts`;
    },
    manageNotifications: function (btsId=":btsId") {
        return `/bts/${btsId}/manage_notifications`;
    },
    manageBTS: function (btsId=":btsId") {
        return `/${btsId}/manage_bts`;
    },
    // manageBTS:`${btsId}/manage_bts`,
    support: '/support',
    documents: '/documents',
};
export default routeConfig;
