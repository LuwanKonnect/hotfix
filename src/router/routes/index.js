import { lazy } from 'react'

// ** Document title
const TemplateTitle = '%s - ATOD Admin Panel'

// ** Default Route
const DefaultRoute = '/login'

// ** Merge Routes
const Routes = [
  {
    path: '/home',
    component: lazy(() => import('../../views/Home'))
  },
  {
    path: '/user-page',
    component: lazy(() => import('../../views/UserPage'))
  },
  {
    path: '/login',
    component: lazy(() => import('../../views/Login')),
    layout: 'BlankLayout'
  },
  {
    path: '/dance-page',
    component: lazy(() => import('../../views/dance/DancePage'))
  },
  {
    path: '/syllabus-page',
    component: lazy(() => import('../../views/dance/SyllabusPage'))
  },
  {
    path: '/video-page',
    component: lazy(() => import('../../views/dance/VideoPage'))
  },
  {
    path: '/editVideo-page',
    component: lazy(() => import('../../views/dance/EditVideoPage'))
  },
  {
    path: '/error',
    component: lazy(() => import('../../views/Error')),
    layout: 'BlankLayout'
  }
]

export { DefaultRoute, TemplateTitle, Routes }
