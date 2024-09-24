import { paths } from "../../constants/paths/paths";
import { logOut } from "../../redux/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useLogOutUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return () => {
        dispatch(logOut());
        navigate(paths.LOGIN);
    };
};