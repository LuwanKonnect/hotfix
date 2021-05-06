import { lazy } from 'react'

// ** Document title
const TemplateTitle = '%s - iKollab Admin Panel'

// ** Default Route
const DefaultRoute = '/home'

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
    path: '/space-page',
    component: lazy(() => import('../../views/SpacePage'))
  },
  {
    path: '/category-page',
    component: lazy(() => import('../../views/Category'))
  },
  {
    path: '/SpaceDetails/*',
    component: lazy(() => import('../../views/SpaceDetails'))
  },
  {
    path: '/error',
    component: lazy(() => import('../../views/Error')),
    layout: 'BlankLayout'
  }
]

export { DefaultRoute, TemplateTitle, Routes }
