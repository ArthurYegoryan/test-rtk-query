import { useForm, Controller } from 'react-hook-form';
import { Form, Input, Button, Select } from 'antd';
import { ticketsSearchFields } from '../../../constants/ticketsSearchFields/TicketsSearchFields';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

const TicketsSearchArea = ({ onSubmit }) => {
    const { t } = useTranslation();
    const { control, handleSubmit } = useForm();

    return (
        <Form 
            onFinish={handleSubmit(onSubmit)}
            style={{ 
                display: 'flex', 
                gap: '16px', 
                height: '32px'
            }}
        >
            <Form.Item label={t("tickets.ticketsSearch.searchField")}>
                <Controller
                    name="searchField"
                    control={control}
                    render={({ field }) => (
                        <Select {...field} style={{ width: "200px" }}>
                            {
                                Object.entries(ticketsSearchFields).map((searchField) => {
                                    return <Option value={searchField[1]}>{searchField[0]}</Option>
                                })
                            }
                        </Select>
                    )}
                />
            </Form.Item>
            <Form.Item label={t("tickets.ticketsSearch.searchValue")}>
                <Controller
                    name="searchValue"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Search
                </Button>
            </Form.Item>
        </Form>
    );
};

export default TicketsSearchArea;
