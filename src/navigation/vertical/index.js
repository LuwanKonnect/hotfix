import { Users, Home, BarChart2, Star } from 'react-feather'

export default [
  {
    id: 'home',
    title: 'Home',
    icon: <BarChart2 size={20} />,
    navLink: '/home'
  },
  {
    id: 'userPage',
    title: 'User List',
    icon: <Users size={20} />,
    navLink: '/user-page'
  },
  {
    id: 'spacePage',
    title: 'Space',
    icon: <Home size={20} />,
    navLink: '/space-page'
  },
  {
    id: 'categoryPage',
    title: 'Category',
    icon: <Star size={20} />,
    navLink: '/category-page'
  }
]
