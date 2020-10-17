import Dashboard from "./components/Pages/Dashboard";
// import Error404 from "./components/Error404"
// import Contact from "./components/Contacts"
import User from "./components/Pages/Users"
import NewUser from './components/Pages/Users/NewUser'
import EditUser from './components/Pages/Users/EditUser'
import Requests from './components/Pages/Requests'
import RequestProfile from './components/Pages/Requests/RequestProfile/'
import UserProfile from './components/Pages/Users/NewUserProfile'
// import UserProfile from './components/Pages/Users/UserProfile'
import Budgets from './components/Pages/Budgets/index'
import NewBudget from './components/Pages/Budgets/newBudget'
import BudgetProfile from './components/Pages/Budgets/BudgetProfile'
import Notifications from './components/Pages/Notifications'
// import Login from './components/Auth/Login'
import Login from './components/Auth/NewLogin'
import ResetPassword from './components/Auth/ForgotPassword'
import Lock from './components/Auth/Lock'
import RoleSettings from './components/Pages/Settings/RoleSettings'
import GeneralSettings from './components/Pages/Settings/GeneralSettings'
import ChangePassword from './components/Pages/Settings/ChangePassword'
import NewRequest from "./components/Pages/Requests/NewRequest";
import Reports from './components/Pages/Reports/Index'

const routes = [
    {
        name: 'dashboard',
        link: '/',
        component: Dashboard
    },
    // {
    //     name: 'error',
    //     link: '/404page',
    //     component: Error404
    // },
    // {
    //     name: 'contact path',
    //     link: '/contact',
    //     component: Contact
    // },
    {
        name: 'user path',
        link: '/users',
        component: User
    },
    {
        name: 'new user route',
        link: '/users/add',
        component: NewUser
    },
    {
        name: 'edit user',
        link: '/user/edit',
        component: EditUser
    },
    {
        name: 'request route',
        link: '/requests',
        component: Requests
    },
    {
        name: 'request profile',
        link: '/request/profile',
        component: RequestProfile
    },
    {
        name: 'new request',
        link: '/request/create',
        component: NewRequest
    },
    {
        name: 'user profile route',
        link: '/user/profile',
        component: UserProfile
    },
    {
        name: 'budgets route',
        link: '/budgets',
        component: Budgets
    },
    {
        name: 'budget create route',
        link: '/budgets/create',
        component: NewBudget
    },
    {
        name: 'budget profile route',
        link: '/budget/profile',
        component: BudgetProfile
    },
    {
        name: 'view notifications route',
        link: '/notifications',
        component: Notifications
    },
    {
        name: 'send notifications route',
        link: '/notifications/send',
        component: Notifications
    },
    {
        name: 'settings route',
        link: '/settings/role',
        component: RoleSettings
    },
    {
        name: 'settings route',
        link: '/settings/general',
        component: GeneralSettings
    },
    {
        name: 'settings route',
        link: '/settings/pwd',
        component: ChangePassword
    },
    {
        name: 'reports route',
        link: '/report',
        component: Reports
    },
]
export const openRoutes = [
    {
        name: 'login',
        link: '/login',
        component: Login
    },
    {
        name: 'lock',
        link: '/lock',
        component: Lock
    },
    {
        name: 'resetPassword',
        link: '/resetPassword',
        component: ResetPassword
    },
]

export default routes