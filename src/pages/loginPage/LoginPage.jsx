import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Layout, Form, Input, Button } from 'antd';
import Loader from '../../generalComponents/loaders/Loader';
import ProjectNameAnimation from '../../generalComponents/projecNameAnimation/ProjectNameAnimation';
import { useLoginMutation } from '../../redux/auth/authApi';
import { editUsername } from '../../redux/activeUser/activeUserSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ login, { isLoading } ] = useLoginMutation();
    const { 
        handleSubmit, 
        reset, 
        control 
    } = useForm({
        mode: "onBlur"
    });

    const onSubmit = async (data) => {
        console.log(JSON.stringify(data, null, 2));
        
        const form = new FormData();
        form.append('username', data.username);
        form.append('password', data.password);
        
        const response = await login(form);
        console.log("Response: ", response);
        reset();
        
        if (response.data.access_token) {
            dispatch(editUsername(data.username));
            navigate("/tickets");
        }
    };

    if (isLoading) return <Loader />;

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {/* <ProjectNameAnimation /> */}
                <Form onFinish={handleSubmit(onSubmit)} style={{ width: '250px' }}>
                    <Form.Item>
                        <Controller
                            name="username"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <Input {...field} placeholder='Username' />}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            render={({ field }) => <Input.Password {...field} placeholder='Password' />}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </Content>
        </Layout>
    );
};

export default LoginPage;
