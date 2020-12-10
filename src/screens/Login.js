import { useContext } from 'react'

import { AuthContext } from '../context/Auth'
import { useForm } from "react-hook-form";

const Login = () => {

    const { loginUser } = useContext(AuthContext)
    const {register, handleSubmit} = useForm();

    const processSubmit = (data) => {
        //TODO: Handle form submission
        loginUser(data);
    }

    //NOTE:Successful form submission must require both username and password submitted

    return (
        <div>
            <form onSubmit={handleSubmit(processSubmit)} style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="username" style={{ marginTop: 5 }}>
                    Username
                    <input type="text" name="username" ref={register} />
                </label>
                <label htmlFor="password" style={{ marginTop: 5 }}>
                    Password
                    <input type="password" name="password" ref={register} />
                </label>
                <div style={{ marginTop: 5 }}>
                    <button type='submit'>Login Now</button>
                </div>

            </form>
        </div>
    )
}

export default Login