import "./Table.css";
import { Space, Table } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

const TableComponent = ({ 
    whichTable,
    size = "normal",
    datas,
    pagination,
    onClickEye,
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
            width: "8px",
        },
        {
            title: t("tickets.authCode"),
            dataIndex: 'authCode',
            key: 'authCode',
            width: "7px",
        },
        {
            title: t("tickets.tid"),
            dataIndex: 'terminalId',
            key: 'terminalId',
            width: "8px",
        },        
        {
            title: t("tickets.mid"),
            dataIndex: 'merchantId',
            key: 'merchantId',
            width: "8px",
        },
        {
            title: t("tickets.transactionType"),
            dataIndex: 'type',
            key: 'type',
            width: "11px",
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
            width: "8px",
        },
        {
            title: t("tickets.status"),
            dataIndex: 'approved',
            key: 'approved',
            width: "9px",
            render: (record) => (
                <Space size="middle">
                    {
                        String(record) === "true" ? 
                            <img src={'src/assets/img/success.svg'} 
                                alt="Success" 
                                style={{
                                    width: "25px"
                                }}
                            /> :
                        String(record) === "false" ?
                            <img src={'src/assets/img/success.svg'} 
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
            title: t("tickets.responseCode"),
            dataIndex: 'acqResponseCode',
            key: 'acqResponseCode',
            width: "10px",
        },
        {
            title: t("tickets.message"),
            dataIndex: 'acqResponseMessage',
            key: 'acqResponseMessage',
            width: "12px",
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
            key: 'eye',
            width: "5px",
            render: (record) => (                
                <Space size="middle">
                    <img 
                        src={'src/assets/img/receipt.svg'} 
                        alt="Receipt" 
                        style={{
                            width: "25px",
                            cursor: "pointer"
                        }}
                        onClick={() => {
                            onClickEye(record);
                        }}
                    />
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
            pagination={pagination ? pagination : false}
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