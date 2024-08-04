

// import { useSelector } from "react-redux";
import { apiConnector } from "../apiConnector"
import { movieEndPoints } from "../apis";
// import { RootState } from "../../redux/store";


export const fetchMovies = async () => {
    // const { All_Movies_API } = movieEndPoints;
    // const All_Movies_API=https://mocki.io/v1/0e4b5799-a0ad-473e-87e3-793ebc3e971b

    try {
        const response = await apiConnector({
            method: "GET",
            url: "https://mocki.io/v1/0e4b5799-a0ad-473e-87e3-793ebc3e971b",

        });
        // console.log("ALL_Movies API RESPONSE............", response.data.allMovie);

        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        return response.data.allMovie;

    }
    catch (error) {
        console.log("ALL_Movies API ERROR............", error);
    }
}

export const fetchFavMovie = async (token: string) => {
    const { Fav_Movies_API } = movieEndPoints;
    try {
        const response = await apiConnector({
            method: "GET",
            url: Fav_Movies_API,
            headers: { Authorization: `Bearer ${token}` }
        })
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        console.log(`Fav_MOVIE_API....`, response.data)
        return response;
    }
    catch (err) {
        console.log("FAV_Movies API ERROR............", err);
    }
}




export const addFavMOvie = async (token: string, _id: string) => {
    const { Add_Fav_Movie_API } = movieEndPoints;
    // Add_Fav_Movie_API.push(`/${_id}`)
    try {
        const response = await apiConnector({
            method: "POST",
            url: `${Add_Fav_Movie_API}/${_id}`,
            headers: { Authorization: `Bearer ${token}` },

        })
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        console.log(`add_Fav_MOVIE_API....`, response)
        return response;
    }
    catch (err) {
        console.log("add_FAV_Movies API ERROR............", err);
    }

}


export const removeFavMovie = async(token:string,_id:string)=>{
    const { REMOVE_Fav_Movie_API } = movieEndPoints;
    // Add_Fav_Movie_API.push(`/${_id}`)
    try {
        const response = await apiConnector({
            method: "POST",
            url: `${REMOVE_Fav_Movie_API}/${_id}`,
            headers: { Authorization: `Bearer ${token}` },

        })
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        console.log(`REMOVE_Fav_MOVIE_API....`, response.data.data)
        return response.data.data;
    }
    catch (err) {
        console.log("REMOVE_FAV_Movies API ERROR............", err);
    }
}


export const addCommnet=async(token:string,_id:string,commentText:string,rating:string)=>{
    const { ADD_COMMENT_API } = movieEndPoints;
    // Add_Fav_Movie_API.push(`/${_id}`)
    try {
        const response = await apiConnector({
            method: "POST",
            url: `${ADD_COMMENT_API}/${_id}`,
            bodyData:{commentText,rating},
            headers: { Authorization: `Bearer ${token}` },

        })
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        console.log(`ADD_COMMENT_MOVIE_API....`, response)

    }
    catch (err) {
        console.log("ADD_COMMENT_Movies API ERROR............", err);
    }
}

export const getComment=async(movieId:string)=>{
   try {
     const {GET_COMMENT_API}=movieEndPoints;
     const response=await apiConnector({
         method:"GET",
         url:`${GET_COMMENT_API}/${movieId}`
     });
     if(!response.data.success){
         throw new Error(response.data.message);
     }
     console.log(`GET_COMMENT_API`,response.data.data)
     return response.data.data;
   } catch (error) {
    console.log("GET_COMMENT_Movies API ERROR............", error);
   }
}