import './TicketsPage.css';
import Table from "../../generalComponents/table/Table";
import Loader from '../../generalComponents/loaders/Loader';
import { addNumeration } from '../../utils/helpers/addNumeration';
import { useGetTicketsQuery, useAddTicketMutation, useDeleteTicketMutation } from '../../redux/tickets/ticketsApi';
import { logOut } from '../../redux/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const TicketsPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { data = [], error, isLoading } = useGetTicketsQuery();

    console.log("Tickets: ", data);

    // const [ newTicket, setNewTicket ] = useState("");
    
    if (isLoading) return <Loader />

    return (
        <>
            <button onClick={() => {
                dispatch(logOut());
                navigate("/login");
            }}>
                Log Out
            </button>
            <h1>Data</h1>
            <Table whichTable={"tickets"}
                   datas={addNumeration(data.items, data.page, data.size, false, data.total)} />
        </>
    );
}

export default TicketsPage;


// const [ addTicket, {isError} ] = useAddTicketMutation();
    // const [ deleteTicket ] = useDeleteTicketMutation();

    // if (error) {
    //     console.log(error.message);
    // }

    // const handleAddTicket = async () => {
    //     if (newTicket) {
    //         await addTicket({name: newProduct}).unwrap();
    //         setNewTicket("");
    //     }
    // };

    // const handleDeleteTicket = async (id) => {
    //     await deleteTicket(id).unwrap();
    // };