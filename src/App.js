import { useState, useEffect } from 'react';

import './App.css';

import SearchIcon from './search.svg';

import Movie from './Movie.jsx';

const API_URL = 'http://www.omdbapi.com?apikey=81c300dd';

// const movie1 = {
//     "Title": "Spider-Man Title Reveal",
//     "Year": "2021",
//     "imdbID": "tt14122734",
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BNjRjMmQ2NDQtNmI5NC00N2EwLTkwYWQtOTM2OGZjMmI5YmRjXkEyXkFqcGdeQXVyMTI0NTA1MDI3._V1_SX300.jpg"
// }

const App = () =>{

    const [movies,setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const browseMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    }

    useEffect(()=>{
        browseMovies('Batman');
    },[])

    return(
        <div className='app'>
            <h1>Filmtopia</h1>

            <div className='search'>
                <input 
                placeholder='Search for Movies'
                value={searchTerm}
                onChange={(e)=> setSearchTerm(e.target.value)}
                />
                <img src={SearchIcon}
                alt="Search" 
                onClick={()=>browseMovies(searchTerm)}/>
            </div>

            {
                movies?.length>0
                ? (
                <div className='container'>
                    {movies.map((movie)=>(
                    <Movie movie={movie}/>
                ))}
                </div>
                ):
                (
                    <div className='empty'>
                        <h2>No Movies Found</h2>
                    </div>
                )
            }

            
        </div>
    );
}

export default App;