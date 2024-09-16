import './TicketsPage.css';
import { Flex, Card, Avatar, Button, Modal } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import TicketsSearchArea from "./ticketsSearchArea/TicketsSearchArea";
import Table from "../../generalComponents/table/Table";
import Loader from '../../generalComponents/loaders/Loader';
import { addNumeration } from '../../utils/helpers/addNumeration';
import { MakeReceipt } from '../../utils/helpers/MakeReceipt';
import { useGetTicketsQuery, useSearchTicketMutation } from '../../redux/tickets/ticketsApi';
import { logOut } from '../../redux/auth/authSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const TicketsPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const windowHeight = window.screen.height;
    const pageSize = windowHeight < 950 ? 7 : 10;
   
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ currentTicketSlip, setCurrentTicketSlip ] = useState("");
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const activeUser = useSelector((state) => state.activeUser.username.payload) ?? localStorage.getItem("username");

    const { data = [], error, isLoading } = useGetTicketsQuery(currentPage, pageSize);
    const dataWithNumbers = data.items ? addNumeration(data.items, data.page, data.size, false, data.total) : [];

    if (isLoading) return <Loader />
    
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onClickEyeHandler = (ticketData) => {
        console.log(ticketData.slip);

        setCurrentTicketSlip(ticketData.slip);
        showModal();
    };

    const onSubmitSearch = (data) => {
        console.log(data);
    };

    return (
        <>
            <Flex>
                <Card style={{ width: "80%" }}>
                    <TicketsSearchArea onSubmit={onSubmitSearch} />
                </Card>
                <Card style={{ width: "20%" }}>
                    <Card.Meta
                        avatar={<Avatar icon={<UserOutlined />} />}
                        title={activeUser}
                        description={
                            <Button 
                                type="link" 
                                icon={<LogoutOutlined />}
                                onClick={() => {
                                    dispatch(logOut());
                                    navigate("/login");
                                }}
                            >
                                Log Out
                            </Button>
                        }
                    />
                </Card>
            </Flex>
            
            <div style={{
                padding: "10px",
                marginTop: "25px"
            }}>
                <Table 
                    whichTable={"tickets"}
                    datas={dataWithNumbers}
                    size='small'
                    onClickEye={onClickEyeHandler}
                    pagination={{
                        pageSize: pageSize,
                        total: data.total,
                        size: "normal",
                        position: ["bottomCenter"],
                        showSizeChanger: false,
                        onChange: (page) => {
                            setCurrentPage(page);
                        },
                    }} />
            </div>
            <Modal 
                open={isModalOpen} 
                onCancel={handleCancel}
                footer={null}
                style={{
                    maxWidth: "400px"
                }}
            >
                <MakeReceipt ticketSlip={currentTicketSlip} />
            </Modal>
        </>
    );
}

export default TicketsPage;