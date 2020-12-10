import { useContext } from 'react'

import { AuthContext } from '../context/Auth'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const Login = () => {

    const { loginUser } = useContext(AuthContext)

    const formValidationSchema = Yup.object ({
        email: Yup.string().email("Not a valid email").required("Email is required"),
        password: Yup.string().min(8, "Your password must be at least 8 chars long")
            .required("Password is required")
    })
    const {register, handleSubmit, errors} = useForm({
        resolver: yupResolver(formValidationSchema),
    });

    const processSubmit = (data) => {
        //TODO: Handle form submission
        loginUser(data);
    }

    //NOTE:Successful form submission must require both username and password submitted

    return (
        <div>
            <form onSubmit={handleSubmit(processSubmit)} style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="email" style={{ marginTop: 5 }}>
                    Email
                    <input type="email" name="email" ref={register} />
                    {errors.email && <span>{errors.email.message}</span>}
                </label>
                <label htmlFor="password" style={{ marginTop: 5 }}>
                    Password
                    <input type="password" name="password" ref={register} />
                    {errors.password && <span>{errors.password.message}</span>}
                </label>
                <div style={{ marginTop: 5 }}>
                    <button type='submit'>Login Now</button>
                </div>

            </form>
        </div>
    )
}

export default Login