import { Video, Home, Users } from 'react-feather'

export default [
  {
    id: 'home',
    title: 'Home',
    icon: <Home size={20} />,
    navLink: '/home'
  },
  {
    id: 'userPage',
    title: 'User List',
    icon: <Users size={20} />,
    navLink: '/user-page'
  },
  {
    id: 'dancePage',
    title: 'Dance',
    icon: <Video size={20} />,
    navLink: '/dance-page'
  }
]
