import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import AdminRoute from './AdminRoute'

import RegisterPage from '../../auth/RegisterPage.js'
import LoginPage from '../../auth/LoginPage.js'
import HomePage from '../HomePage.js'
import AdminPage from '../../auth/AdminPage.js'
import NewsPage from '../../news/NewsPage.js'
import AddNewsPage from '../../news/AddNewsPage.js'
import Categories from '../../news/Categories.js'
import Logout from '../../auth/Logout'

const Routes = () => (
    <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <PrivateRoute exact path="/logout" component={Logout} />
        <Route exact path="/register" component={RegisterPage} />
        <AdminRoute exact path="/admin" component={AdminPage} />
        <Route exact path="/news" component={NewsPage} />
        <PrivateRoute exact path="/news/add" component={AddNewsPage} />
        <Route exact path="/news/categories" component={Categories} />
    </Switch>
)

export default Routes
