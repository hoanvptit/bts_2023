import config from '~/config';
import HeaderOnly from '~/layouts/components/HeaderOnly';

import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Notify from '~/pages/Notify';
import Profile from '~/pages/Profile';

const publicRoutes = [
    { path: config.routes.profile, component: Profile },
    { path: config.routes.notify, component: Notify },
    { path: config.routes.login, component: Login },

];

const privateRoutes = [
    { path: config.routes.home, component: Home, layout: HeaderOnly},
];

export { publicRoutes, privateRoutes };
