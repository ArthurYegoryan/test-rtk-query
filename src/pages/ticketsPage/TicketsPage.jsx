import './TicketsPage.css';
import { Flex, Card, Avatar, Button, Modal } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import TicketsSearchArea from "./ticketsSearchArea/TicketsSearchArea";
import ProjectNameAnimation from "../../generalComponents/projecNameAnimation/ProjectNameAnimation";
import Table from "../../generalComponents/table/Table";
import Loader from '../../generalComponents/loaders/Loader';
import { addNumeration } from '../../utils/helpers/addNumeration';
import { MakeReceipt } from '../../utils/helpers/MakeReceipt';
import { useLogOutUser } from '../../utils/customHooks/useLogOut';
import { useGetTicketsQuery, useSearchTicketMutation } from '../../redux/tickets/ticketsApi';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ReactFlagsSelect from "react-flags-select";

const TicketsPage = () => {
    const windowHeight = window.screen.height;
    const pageSize = windowHeight < 950 ? 7 : 10;
   
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ currentTicketSlip, setCurrentTicketSlip ] = useState("");
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ selectedLanguage, setSelectedLanguage ] = useState("AM");
    const activeUser = useSelector((state) => state.activeUser.username.payload) ?? localStorage.getItem("activeUser");
    const logOutUser = useLogOutUser();
    const { t, i18n } = useTranslation();

    const { data = [], error, isLoading } = useGetTicketsQuery(currentPage, pageSize);
    const dataWithNumbers = data.items ? addNumeration(data.items, data.page, data.size, false, data.total) : [];

    if (isLoading) return <Loader />
    if (error?.status === 401) logOutUser();
    
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onClickEyeHandler = (ticketData) => {
        setCurrentTicketSlip(ticketData.slip);
        showModal();
    };

    const onSubmitSearch = (data) => {
        console.log(data);
    };

    return (
        <>
            <Flex 
                justify='space-between' 
                style={{ padding: "20px" }}
            >
                <Card 
                    style={{ 
                        height: "107.14px",
                        display: "flex",
                        alignItems: "center"
                    }}>
                    <TicketsSearchArea onSubmit={onSubmitSearch} />
                </Card>
                <ProjectNameAnimation
                    text={"TICKETS "+ activeUser}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "3em"
                    }} 
                />
                <Card style={{ width: "290px" }}>
                    <Flex justify='space-between'>
                    <Card.Meta
                        avatar={<Avatar icon={<UserOutlined />} />}
                        title={activeUser}
                        style={{ marginTop: "3px" }}
                        description={
                            <Button 
                                type="link" 
                                icon={<LogoutOutlined />}
                                onClick={() => logOutUser()}
                            >
                                {t("operations.logout")}
                            </Button>
                        }
                    />
                    <ReactFlagsSelect 
                        selected={selectedLanguage}
                        countries={["GB", "RU", "AM"]}
                        showSelectedLabel={false}
                        showOptionLabel={false}
                        fullWidth={false}
                        onSelect={(code) => {
                            setSelectedLanguage(code);
                            {code === "GB" && i18n.changeLanguage("en")}
                            {code === "RU" && i18n.changeLanguage("ru")}
                            {code === "AM" && i18n.changeLanguage("am")}
                        }}
                    />
                    </Flex>
                </Card>
            </Flex>            
            <Flex style={{
                padding: "20px",
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
            </Flex>
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