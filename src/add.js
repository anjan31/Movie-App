import { useState } from 'react';
import './App.css';
import './App.js';


export function Add({movies})
{

    const [movieName,setMovieName] = useState("");
    const [posters,setPoster] = useState("");
    const [ratings,setRating] = useState("");
    const [description,setDescription] = useState("");

    const [movieList,setMovieList] = useState(movies);

     

return(

    <div class = "container">
   
   
<h2>Add Movie</h2>
<form>
  <label>
    Name:
    <input type="text" name="name"  onChange={(e) => {
        setMovieName(e.target.value);
      }} />
  </label>
  <label>
    Poster:
    <input type="text" name="name"  onChange={(e) => {
        setPoster(e.target.value);
      }} />
  </label>
  <label>
    Movie Rating:
    <input type="text" name="name"  onChange={(e) => {
        setRating(e.target.value);
      }} />
  </label>
  <label>
    Movie Description:
    <input type="text" name="name"  onChange={(e) => {
        setDescription(e.target.value);
      }} />
  </label>

  <input type="submit" value="Submit" onSubmit={() =>{
      const newMovie = {
        name:movieName,
        rating: ratings,
        summary: description,
        poster:posters,
        

    }
    setMovieList([...movieList,newMovie]);
  } } />
</form>

    </div>

 
)};


