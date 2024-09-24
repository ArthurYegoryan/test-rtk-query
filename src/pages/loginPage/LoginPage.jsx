import React from 'react';
import Loader from '../../generalComponents/loaders/Loader';
import ProjectNameAnimation from '../../generalComponents/projecNameAnimation/ProjectNameAnimation';
import { paths } from "../../constants/paths/paths";
import { useLoginMutation } from '../../redux/auth/authApi';
import { editUsername } from '../../redux/activeUser/activeUserSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Layout, Form, Input, Button, Flex, Typography } from 'antd';

const { Content } = Layout;
const { Text } = Typography;

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [ login, { isLoading, error, isError } ] = useLoginMutation();
    const { 
        handleSubmit, 
        reset, 
        control,
        formState: { errors }
    } = useForm({
        mode: "onBlur"
    });
    const [ showUsernamePassError, setShowUsernamePassError ] = useState(false);

    const onSubmit = async (data) => {
        setShowUsernamePassError(false);
        
        const form = new FormData();
        form.append('username', data.username);
        form.append('password', data.password);
        
        const response = await login(form);
        
        if (response.data?.access_token) {
            reset();
            localStorage.setItem("activeUser", data.username);
            dispatch(editUsername(data.username));
            navigate(paths.TICKETS);
        } else if (response.error.status === 401) {
            setShowUsernamePassError(true);
        }
    };

    if (isLoading) return <Loader />;

    return (
        <Layout style={{ minHeight: '100vh' }}>                      
            <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <ProjectNameAnimation 
                    text={"TICKETS MANAGEMENT"}
                    style={{
                        position: "absolute",
                        top: "15%",
                        fontSize: "5em",
                    }} 
                />
                <Form onFinish={handleSubmit(onSubmit)} style={{ width: '250px' }}>
                    <Form.Item
                        validateStatus={errors?.username ? 'error' : ''}
                        help={errors?.username ? errors?.username?.message : ''}
                    >
                        <Controller
                            name="username"
                            control={control}
                            defaultValue=""
                            rules={{ required: t("errors.emptyFieldError") }}
                            render={({ field }) => <Input {...field} placeholder={t("login.username")} />}
                        />
                    </Form.Item>
                    <Form.Item
                        validateStatus={errors.password ? 'error' : ''}
                        help={errors.password ? errors.password.message : ''}
                    >
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            rules={{ required: t("errors.emptyFieldError") }}
                            render={({ field }) => <Input.Password {...field} placeholder={t("login.password")} />}
                        />
                    </Form.Item>
                    {showUsernamePassError &&
                        <Flex justify='center'>
                            <Text type="danger">
                                {t("errors.invalidUsernamePassError")}
                            </Text>
                        </Flex>
                    }
                    <Form.Item style={{ marginTop: "40px" }}>
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            style={{ width: '250px' }}
                        >
                            {t("login.login")}
                        </Button>
                    </Form.Item>
                </Form>
            </Content>
        </Layout>
    );
};

export default LoginPage;
