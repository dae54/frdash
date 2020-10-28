const menu = [
    {
        status: 'active',
        link: '/',
        icon: 'dashboard',
        name: 'Dashboard'
    },
    {
        status: '',
        link: '/users',
        icon: 'user-md',
        name: 'Users',
        submenu: [
            {
                status: 'active',
                link: '/users',
                icon: 'user-md',
                name: 'User List'
            },
            {
                status: '',
                link: '/users/add',
                icon: 'user-md',
                name: 'Add New User'
            }
        ]
    },
    {
        status: '',
        link: '/requests',
        icon: 'dollar',
        name: 'Requests',
        submenu: [
            {
                status: 'active',
                link: '/requests',
                icon: 'user-md',
                name: 'All Requests'
            },
            {
                status: '',
                link: '/request/create',
                icon: 'user-md',
                name: 'New Request'
            },
            {
                status: '',
                link: '/request/aproves',
                icon: 'user-md',
                name: 'Request Aproves'
            },
        ]
    },
    {
        status: '',
        link: '/budgets',
        icon: 'align-justify',
        name: 'Budgets',
        submenu: [
            {
                status: 'active',
                link: '/budgets',
                icon: 'user-md',
                name: 'All Budgets'
            },
            {
                status: 'active',
                link: '/budgets/create',
                icon: 'user-md',
                name: 'Create New Budget'
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
                name: 'Role'
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
    // {
    //     status: '',
    //     link: '/stuff',
    //     icon: 'user-md',
    //     name: 'stuff',
    //     submenu: [
    //         {
    //             status: 'active',
    //             link: '/stuff',
    //             icon: 'user-md',
    //             name: 'staff names'
    //         }, {
    //             status: '',
    //             link: '/contact',
    //             icon: 'user-md',
    //             name: 'contacts'
    //         }
    //     ]
    // },
    // {
    //     status: '',
    //     link: '/contact',
    //     icon: 'user-md',
    //     name: 'contacts'
    // },
    // {
    //     status: '',
    //     link: '/contact',
    //     icon: 'user-md',
    //     name: 'contacts'
    // },
    // {
    //     status: '',
    //     link: '/stuff',
    //     icon: 'user-md',
    //     name: 'stuff',
    //     submenu: [
    //         {
    //             status: 'active',
    //             link: '/stuff',
    //             icon: 'user-md',
    //             name: 'staff names'
    //         }, {
    //             status: '',
    //             link: '/contact',
    //             icon: 'user-md',
    //             name: 'contacts'
    //         }
    //     ]
    // },
]
export default menu