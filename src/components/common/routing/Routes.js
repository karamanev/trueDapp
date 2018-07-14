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
import CategoriesPage from '../../news/Categories.js'
import CategoryPage from '../../news/Category'
import LogoutPage from '../../auth/Logout'
import AboutPage from '../../common/About'

const Routes = () => (
    <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <PrivateRoute exact path="/logout" component={LogoutPage} />
        <Route exact path="/register" component={RegisterPage} />
        <AdminRoute exact path="/admin" component={AdminPage} />
        <Route exact path="/news" component={NewsPage} />
        <PrivateRoute exact path="/news/add" component={AddNewsPage} />
        <Route exact path="/news/categories" component={CategoriesPage} />
        <Route path="/news/category/:name" component={CategoryPage} />
        <Route exact path="/about" component={AboutPage} />
    </Switch>
)

export default Routes
