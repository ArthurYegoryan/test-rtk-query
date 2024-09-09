import './LoginForm.css';
import Loader from "../../../../generalComponents/loaders/Loader";
import { Form, Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useLoginMutation } from '../../../../redux/auth/authApi';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();
    const [ login, { isLoading } ] = useLoginMutation();

    const {
        register,
        formState: {
            errors, isValid
        },
        handleSubmit,
        reset,
    } = useForm({
        mode: "onBlur"
    });

    const onSubmitHandler = async (data) => {
        console.log(JSON.stringify(data, null, 2));
        reset();

        const form = new FormData();
        form.append('username', data.username);
        form.append('password', data.password);

        const response = await login(form);
        console.log("Response: ", response);

        if (response.data.access_token) {
            navigate("/tickets");
        }
    }

    if (isLoading) return <Loader />;

    return (
        <div className='login-form'>
            <form noValidate onSubmit={handleSubmit(onSubmitHandler)}>
                <label>
                    Username: 
                    <input 
                        {...register("username", {
                            required: "Fill the field!",
                            minLength: {
                                value: 3,
                                message: "Minimum 3 characters!"
                            }
                        })}
                    />
                </label>
                <div>
                    {
                        errors?.username && 
                            <label style={{fontSize: "12px", color: "red"}}>
                                {errors?.username.message || "Error!"}
                            </label>
                    }
                </div>

                <label>
                    Password: 
                    <input 
                        type='password'
                        {...register("password", {
                            required: "Fill the field!",
                            minLength: {
                                value: 4,
                                message: "Minimum 4 characters!"
                            }
                        })}
                    />
                </label>
                <div>
                    {
                        errors?.password && 
                            <label style={{fontSize: "12px", color: "red"}}>
                                {errors?.password.message || "Error!"}
                            </label>
                    }
                </div>

                <input type='submit' disabled={!isValid} />
            </form>
        </div>
    );
};

export default LoginForm;