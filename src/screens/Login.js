import { useState, useContext } from 'react'
import { AuthContext } from '../context/Auth'
import { Redirect } from "react-router-dom";

const Login = () => {

    const { loginUser, currentUser } = useContext(AuthContext)

    const [fields, setFields] = useState({
        username: '',
        password: ''
    })


    const handleFieldChange = (e) => {
        const { name, value } = e.target
        //TODO: Handle input changes
        setFields({ ...fields, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        //TODO: Handle form submission
        const {username, password} = fields
        if (username.length > 1 && password.length > 1) {
            // call auth to login user
            loginUser({
                email: username, 
                password: password
            });
        }
    }

    //NOTE:Successful form submission must require both username and password submitted
      
    return (
        <div>
            {currentUser ? (<Redirect to="todo"/>) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor="username" style={{ marginTop: 5 }}>
                        Email
                        <input type="email" name="username" value={fields.username} onChange={handleFieldChange} />
                    </label>
                    <label htmlFor="password" style={{ marginTop: 5 }}>
                        Password
                        <input type="password" name="password" value={fields.password} onChange={handleFieldChange} />
                    </label>
                    <div style={{ marginTop: 5 }}>
                        <button type='submit'>Login Now</button>
                    </div>
                </form>
            )}
        </div>
    )
}

export default Login