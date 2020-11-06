const menu = [
    {
        status: '',
        link: '/',
        icon: 'dashboard',
        name: 'Dashboard'
    },
    {
        status: '',
        link: '/users',
        icon: 'user-md',
        name: 'Users',
        permission: ['view_all_users', 'create_user'],//have either of the permission to be able to view the component
        submenu: [
            {
                status: '',
                link: '/users',
                icon: 'user-md',
                name: 'User List',
                permission: {
                    genericName: 'view_all_users',
                    moduleName: 'users'
                }
            },
            {
                status: '',
                link: '/users/add',
                icon: 'user-md',
                name: 'Add New User',
                permission: {
                    genericName: 'create_user',
                    moduleName: 'users'
                }
            }
        ]
    },
    {
        status: '',
        link: '/requests',
        icon: 'dollar',
        name: 'Requests',
        permission: ['view_all_requests', 'create_request','approve_requests'],//have either of the permission to be able to view the component
        submenu: [
            {
                status: 'active',
                link: '/requests',
                icon: 'user-md',
                name: 'All Requests',
                permission: {
                    genericName: 'view_all_requests',
                    moduleName: 'requests'
                }
            },
            {
                status: '',
                link: '/request/create',
                icon: 'user-md',
                name: 'New Request',
                permission: {
                    genericName: 'create_request',
                    moduleName: 'requests'
                }
            },
            {
                status: '',
                link: '/request/aproves',
                icon: 'user-md',
                name: 'Request Aproves',
                permission: {
                    genericName: 'approve_requests',
                    moduleName: 'requests'
                }
            },
        ]
    },
    {
        status: '',
        link: '/budgets',
        icon: 'align-justify',
        name: 'Budgets',
        permission: ['view_all_budgets', 'create_budget'],//have either of the permission to be able to view the component
        submenu: [
            {
                status: 'active',
                link: '/budgets',
                icon: 'user-md',
                name: 'All Budgets',
                permission: {
                    genericName: 'view_all_budgets',
                    moduleName: 'budgets'
                }
            },
            {
                status: 'active',
                link: '/budgets/create',
                icon: 'user-md',
                name: 'Create New Budget',
                permission: {
                    genericName: 'create_budget',
                    moduleName: 'budgets'
                }
            },
        ]
    },
    {
        status: '',
        link: '/notifications',
        icon: 'bell-o',
        name: 'Notifications',
        submenu: [
            {
                status: 'inactive',
                link: '/notifications',
                icon: 'notification',
                name: 'View'
            },
            {
                status: 'inactive',
                link: '/notifications/send',
                icon: 'notification',
                name: 'Send'
            },
        ]
    },
    {
        status: '',
        link: '/settings',
        icon: 'cogs',
        name: 'Settings',
        submenu: [
            {
                status: 'inactive',
                link: '/settings/role',
                icon: 'key',
                name: 'Role',
                permission: {
                    genericName: 'create_role',
                    moduleName: 'settings'
                }
            },
            {
                status: 'inactive',
                link: '/settings/general',
                icon: 'notification',
                name: 'General'
            },
            {
                status: 'inactive',
                link: '/settings/pwd',
                icon: 'notification',
                name: 'Change Password'
            },
        ]
    },
]
export default menu