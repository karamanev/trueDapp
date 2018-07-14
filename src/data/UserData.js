const baseURL = 'http://localhost:3005/auth'

class UserData {
    static register(user) {
        return window.fetch(`${baseURL}/signup`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(user),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                           }
        }).then(res => res.json())
    }

    static login(user) {
        return window.fetch(`${baseURL}/login`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(user),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                           }
        }).then(res => res.json())
    }
}

export default UserData