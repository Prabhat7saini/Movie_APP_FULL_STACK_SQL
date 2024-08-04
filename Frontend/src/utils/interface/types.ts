export interface FavMovieSql {
    createdAt: string;  // ISO 8601 date string
    id: number;         // Unique identifier
    movieId: string;    // Unique identifier for the movie
    updatedAt: string;  // ISO 8601 date string
    userId: number;     // Unique identifier for the user
  }
  




export interface SignUPdata {
    email: string;
    name: string;
    password: string;
}
interface Comment {
    _id: string; 
    text: string;
    rating:string
    userId: {
        name: string;
    } 
    createdAt: string; 
    
  }

export interface Logindata {
    email: string,
    password: string
}
export interface Movie {
    _id: string;
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Ratings: { Source: string; Value: string; }[]; // Ensure Ratings matches expected structure
    Poster: string;
    Response: string;
    commentIds:Comment[] | [];
    
}
export interface UserState {
    loading: boolean
    Movies: Movie[]
    favMovie?: FavMovieSql[] | []
}

export interface user {
   
        _id: string;
        name: string;
        email: string;
        createdAt: string;
        updatedAt: string;
        FavMovie: Movie[]; // You can replace `any` with a more specific type if you know the structure of movies
        __v: number;
    
    
}

export interface LoginResponse {
    data: {
        success: boolean;
        message: string;
        token: string;
        user: user
        }
    }





export interface authState {
    currentUser: user | null,
    token: unknown | null;
}
