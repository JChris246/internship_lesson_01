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
        loginUser();
    }

    //NOTE:Successful form submission must require both username and password submitted
      
    return (
        <div>
            {currentUser ? (<Redirect to="todo"/>) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ marginTop: 5 }}>
                        <button type='submit'>Login With Github</button>
                    </div>
                </form>
            )}
        </div>
    )
}

export default Login