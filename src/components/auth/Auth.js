class Auth {
    static authenticateUser(token) {
        window.localStorage.setItem('token', token)
    }

    static saveUser(user) {
        window.localStorage.setItem('user', JSON.stringify(user))
    }

    static getUser() {
        const userJSON = window.localStorage.getItem('user')
        if (userJSON) {
            return JSON.parse(userJSON)
        }
        else
            return {}

    }

    static removeUser() {
        window.localStorage.removeItem('user')
    }

    static isUserAuthenticated() {
        return window.localStorage.getItem('token') !== null
    }

    static deauthenticateUser() {
        window.localStorage.removeItem('token')
    }

    static getToken() {
        return window.localStorage.getItem('token')
    }

    static isUserAdmin() {
        const data = window.localStorage.getItem('user')
        if (!data) {
            return false
        }
        return JSON.parse(data).isAdmin
    }


}
export default Auth