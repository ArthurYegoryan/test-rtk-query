import './TicketsPage.css';
import { useGetTicketsQuery, useAddTicketMutation, useDeleteTicketMutation } from '../../redux/tickets/ticketsApi';
import { logOut } from '../../redux/auth/authSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function TicketsPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ newTicket, setNewTicket ] = useState("");
    const { data = [], isLoading } = useGetTicketsQuery();
    const [ addTicket, {isError} ] = useAddTicketMutation();
    const [ deleteTicket ] = useDeleteTicketMutation();

    console.log("Tickets: ", data);

    const handleAddTicket = async () => {
        if (newTicket) {
            await addTicket({name: newProduct}).unwrap();
            setNewTicket("");
        }
    };

    const handleDeleteTicket = async (id) => {
        await deleteTicket(id).unwrap();
    };

    if (isLoading) return <h1>Loading...</h1>

    return (
        <>
            <button onClick={() => {
                dispatch(logOut());
                navigate("/login");
            }}>
                Log Out
            </button>
        </>
    );
}

export default TicketsPage;