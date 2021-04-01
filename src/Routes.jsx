import Dashboard from "./components/Pages/Dashboard";
import Error404 from "./components/Error404"
// import Contact from "./components/Contacts"
import User from "./components/Pages/Users"
import AddNewUser from './components/Pages/Users/AddNewUser'
import EditUser from './components/Pages/Users/EditUser'
import Requests from './components/Pages/Requests'
import RequestProfile from './components/Pages/Requests/RequestProfile/'
import RequestAproves from './components/Pages/Requests/RequestAproves'
import UserProfile from './components/Pages/Users/UserProfile'
// import UserProfile from './components/Pages/Users/UserProfile'
import Budgets from './components/Pages/Budgets/index'
import NewBudget from './components/Pages/Budgets/newBudget'
import BudgetProfile from './components/Pages/Budgets/BudgetProfile'
import Notifications from './components/Pages/Notifications'
// import Login from './components/Auth/Login'
import Login from './components/Auth/Login'
import ResetPassword from './components/Auth/ForgotPassword'
import Lock from './components/Auth/Lock'
import RoleSettings from './components/Pages/Settings/RoleSettings'
import GeneralSettings from './components/Pages/Settings/GeneralSettings'
import ChangePassword from './components/Pages/Settings/ChangePassword'
import NewRequest from "./components/Pages/Requests/NewRequest";
import Reports from './components/Pages/Reports/Index'
import BudgetItems from "./components/Pages/Budgets/BudgetItems";
import ProfileManager from "./components/Pages/Settings/ProfileManager";

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
        component: User,
        permissions: ['view_all_users']
    },
    {
        name: 'new user route',
        link: '/users/add',
        component: AddNewUser,
        permissions: ['create_user']
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
        name: 'request route',
        link: '/request/aproves',
        component: RequestAproves
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
        name: 'manage budget items',
        link: '/budgets/budgetItems',
        component: BudgetItems
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
        name: 'User Profile route',
        link: '/profile',
        component: ProfileManager
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
    {
        name: 'error',
        link: '/404page',
        component: Error404
    },
]

export default routes