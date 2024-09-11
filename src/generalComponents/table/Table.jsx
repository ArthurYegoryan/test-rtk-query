import "./Table.css";
import { colors } from '../../constants/colors/colors';
import { Space, Table, Typography } from 'antd';
import { EyeOutlined } from "@ant-design/icons";
import React from 'react';
import { useTranslation } from 'react-i18next';

const TableComponent = ({ 
    whichTable,
    size = "normal",
    datas,
    setCurrentData,
    onClickHref,
    onClickEditButton,
    onClickDeleteButton,
    renderHandler,
    filterHandlers,
    fuelTypesfilterHandlers,
    stationsGroupFilterHandlers,
    stationsFilterHandlers,
    windowHeight,
    minWidth,
    scrollBoth = false,
    scrollX = false,
    scrollY = false,
}) => {
    const { t } = useTranslation();

    const ticketsColumns = [
        {
            title: (<i>{t("tickets.number")}</i>),
            dataIndex: 'number',
            key: 'number',
            width: "7px",
        },
        {
            title: t("tickets.rrn"),
            dataIndex: 'rrn',
            key: 'rrn',
            width: "10px",
        },
        {
            title: t("tickets.authCode"),
            dataIndex: 'authCode',
            key: 'authCode',
            width: "10px",
        },
        {
            title: t("tickets.tid"),
            dataIndex: 'terminalId',
            key: 'terminalId',
            width: "10px",
        },        
        {
            title: t("tickets.mid"),
            dataIndex: 'merchantId',
            key: 'merchantId',
            width: "10px",
        },
        {
            title: t("tickets.transactionType"),
            dataIndex: 'type',
            key: 'type',
            width: "10px",
        },
        {
            title: t("tickets.amount"),
            dataIndex: 'amount',
            key: 'amount',
            width: "10px",
        },
        {
            title: t("tickets.tip"),
            dataIndex: 'tip',
            key: 'tip',
            width: "10px",
        },
        {
            title: t("tickets.status"),
            dataIndex: 'approved',
            key: 'approved',
            width: "8px",
            render: (record) => (
                <Space size="middle">
                    {
                        record === "true" ? 
                            <img src={'../../assets/img/success.svg'} 
                                alt="Success" 
                                style={{
                                    width: "25px"
                                }}
                            /> :
                        record === "false" ?
                            <img src={'../../assets/img/success.svg'} 
                                alt="Fail" 
                                style={{
                                    width: "25px"
                                }}
                            /> : null
                    }
                </Space>
            )
        },
        {
            title: t("tickets.cardType"),
            dataIndex: 'card',
            key: 'card',
            width: "10px",
        },
        {
            title: t("tickets.pan"),
            dataIndex: 'panMasked',
            key: 'panMasked',
            width: "10px",
        },
        {
            title: t("tickets.merchantName"),
            dataIndex: 'name_local',
            key: 'name_local',
            width: "10px",
        },
        {
            title: t("tickets.merchantAddress"),
            dataIndex: 'address_global',
            key: 'address_global',
            width: "11px",
        },
        {
            title: "",
            dataIndex: 'eye',
            key: 'eye',
            width: "5px",
            render: (record) => (
                <Space size="middle">
                    <EyeOutlined />
                </Space>
            )
        },
    ]

    let columns = [];

    if (whichTable === "tickets") columns = ticketsColumns;

    return (
        <Table
            columns={columns}            
            dataSource={datas}
            pagination={false}
            size={size}
            sticky={{
                offsetHeader: 0,
                // offsetHeader: 64,
            }}
            scroll={
                scrollBoth ? {
                    scrollToFirstRowOnChange: true,
                    y: (windowHeight < 950) ? 450 : 650,
                    x: minWidth
                } :
                scrollX ? {
                    scrollToFirstRowOnChange: true,
                    x: minWidth
                } : 
                scrollY ? {
                    scrollToFirstRowOnChange: true,
                    y: (windowHeight < 950) ? 450 : 650,
                } : null
            }
        />
    );
};
export default TableComponent;