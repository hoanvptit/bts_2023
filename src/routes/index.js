import config from '~/config';
import HeaderOnly from '~/layouts/components/HeaderOnly';
import Login from '~/pages/Login/login';
import Home from '~/pages/Home';
import HomeBts from '~/pages/HomeBts';
import DeviceControl from '~/pages/DeviceControl';
import ManageAccount from '~/pages/ManagementPage/ManageAccount';
import ManageDevice from '~/pages/ManagementPage/ManageDevice';
import ManageNotification from '~/pages/ManagementPage/ManageNotification';
import Support from '~/pages/Support';
import Document from '~/pages/Document';
import ManageBTS from '~/pages/ManagementPage/ManageBTS';

const publicRoutes = [
    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.documents, component: Document, layout: null },
    { path: config.routes.support, component: Support, layout: null },
    // { path: config.routes.profile, component: Profile },
];

const privateRoutes = [
    { path: config.routes.home, component: Home, layout: HeaderOnly },
    { path: config.routes.homeBts, component: HomeBts },
    { path: config.routes.controlDevices(), component: DeviceControl },
    { path: config.routes.manageAccounts(), component: ManageAccount },
    { path: config.routes.manageDevices(), component: ManageDevice },
    { path: config.routes.manageNotifications(), component: ManageNotification },
    { path: config.routes.manageBTS(), component: ManageBTS },
];

export { publicRoutes, privateRoutes };
