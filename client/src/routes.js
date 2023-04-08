import { PROFILE_ROUTE, START_ROUTE, AUTH_ROUTE, REGISTRATION_ROUTE, USERPAGE_ROUTE, SEARCH_ROUTE } from "./utils/consts"
import Profile from "./pages/Profile"
import Start from "./pages/Start"
import Auth from "./pages/Auth"
import UserPage from "./pages/UserPage"
import Search from "./pages/Search"

export const authRoutes = [
    {
        path: PROFILE_ROUTE,
        Component: Profile
    },
]

export const publicRoutes = [
    {
        path: START_ROUTE,
        Component: Start
    },
    {
        path: AUTH_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: SEARCH_ROUTE,
        Component: Search
    },
    {
        path: USERPAGE_ROUTE + '/:id',
        Component: UserPage
    },
]
