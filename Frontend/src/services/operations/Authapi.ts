import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";
import { LoginResponse, user } from "../../utils/interface/types";
import { setCurrentUser, setToken } from "../../redux/slices/authSlice";
import { setFavMovie, setMovie } from "../../redux/slices/movieSlice";
import { NavigateFunction } from "react-router-dom";
import { Dispatch } from "redux";
const { SIGNUP_API, LOGIN_API } = endpoints;

interface SignUpResponse {
    data: {
        success: boolean;
        message: string;
    };
}


export const login = (email: string, password: string, navigate: (path: string) => void) => {
    return async (dispatch: (action: any) => void) => {
        ;
        // console.log("1234", name, email)
        try {
            const response: LoginResponse = await apiConnector({
                method: "POST",
                url: LOGIN_API,
                bodyData: { email, password }
            });

            console.log("LOGIN API RESPONSE............", response.data.user);
            // const d

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            // toast.success("Signup Successful");
            const user: user = response.data.user
            const token: string = response.data.token
            dispatch(setCurrentUser(user));
            dispatch(setToken(token));
            dispatch(setFavMovie(user.FavMovie))
            localStorage.setItem("token", JSON.stringify(token));
            localStorage.setItem("user", JSON.stringify(user));

            navigate("/");
        } catch (error: any) {
            console.log("LOGIN API ERROR............", error.message);
            // toast.error("Signup Failed");
            navigate("/signup");
        } finally {
            // dispatch(setLoading(false));
            // toast.dismiss(toastId);
        }
    };
}



export const signUp = (name: string, email: string, password: string, navigate: (path: string) => void) => {
    return async (dispatch: (action: any) => void) => {
        ;
        // console.log("1234", name, email)
        try {
            const response: SignUpResponse = await apiConnector({
                method: "POST",
                url: SIGNUP_API,
                bodyData: { name, email, password }
            });

            console.log("SIGNUP API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            // toast.success("Signup Successful");
            navigate("/login");
        } catch (error: any) {
            console.log("SIGNUP API ERROR............", error);
            // toast.error("Signup Failed");
            navigate("/signup");
        } finally {
            // dispatch(setLoading(false));
            // toast.dismiss(toastId);
        }
    };
}


export function logout(navigate: NavigateFunction) {
    return (dispatch: Dispatch) => {
        try {
            console.log('Logging out...');
            dispatch(setToken(null));
            dispatch(setCurrentUser(null));
            
            dispatch(setFavMovie([]));
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // Uncomment if you use toast notifications
            // toast.success('Logged Out');
            navigate('/');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    }
};
