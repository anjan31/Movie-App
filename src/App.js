
//import { Add } from './add';
import { useState, useEffect } from 'react';
import  './App.css';
import  './global.js';
import {Welcome} from './welcome.js'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Navigate, NavLink, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';


export default function App() {

  const navigate = useNavigate();
  const [mode,setMode] = useState("light"); 
  const Theme = createTheme({
    palette: {
      mode: mode,
    },
  });
  const [movieList,setMovieList] = useState([]);

  
  return (
    
    <ThemeProvider theme={Theme}>
       <Paper elevation={3} >
    <div className="App">
    

      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            
          </IconButton>
          <Button color="inherit" onClick={() => {navigate('/')}}>
            Home
          </Button>
          <Button  color="inherit" onClick={() => {navigate('/movie-list')}}>
            Movie List
          </Button>
          <Button  color="inherit" onClick={() => {navigate('/Add-Movie')}}>
            Add Movie
          </Button>
          <Button className='btn-mode' color="inherit"  onClick={() => {setMode(mode==="light" ? "dark" : "light")}}>
            {mode} mode <IconButton sx={{ ml: 1 }} color="inherit">  
              {mode=== "light" ? <Brightness4Icon /> : <Brightness7Icon />} </IconButton >
          </Button>
         
        </Toolbar>
      </AppBar>
    </Box>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie-list" element={<MovieList />} />
        <Route path="/movie-list/:id" element={<MovieDetails  />} />
        <Route path="/edit-movie/:id" element={<EditMovie  />} />
        <Route path="/Add-Movie" element={<AddMovie  />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate replace to = "/404"/>}/>
      </Routes>
    </div>
    </Paper>
    </ThemeProvider>
  ); 

}

function NotFound()
{
return(
  <img
  className='not-found'
  src='https://miro.medium.com/max/1400/1*zBFBJktPD3_z0S_35kO5Hg.gif'/>
)

}

function MovieDetails()
{
  const {id} = useParams();
 

    const [mov, setMovie] = useState({});
    useEffect(() => {fetch(`https://62a09dfc202ceef708723f5e.mockapi.io/movies/${id}`, {method: "GET",})
    .then((data) => data.json())
    .then((mv) => setMovie(mv));}, []);
  
  const navigate = useNavigate();

  return(
    <div className='movie-detail-container' >
   <iframe width="1440" height="720" 
   src={mov.trailer} 
   title="YouTube video player" frameborder="0" 
   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen></iframe>
    <div className='movie-specs'>

    <h2 className='movie-name'>{mov.name}</h2>
    
      <p   className='movie-rating'>⭐{mov.rating}</p>
    </div>
   
    
      <p className='movie-summary'>{mov.summary}</p> 

      <Button className='btn-back' variant="contained" onClick={() =>{
          navigate(-1);
      }
  
}>Back</Button>


      

    
  </div>
  )





}

function AddMovie()
{

  //const [movielist, setMovieList] = useState({});
  const navigate = useNavigate();

  const [movieName,setMovieName] = useState("");
  const [posters,setPoster] = useState("");
  const [ratings,setRating] = useState("");
  const [description,setDescription] = useState("");
  const [trailers,setTrailer] = useState("");
  return(
    <div>
    <h2>Add Movie</h2>
    <div className='Add'>


<TextField id="standard-basic" label="Movie Name" variant="standard"  onChange={(e) => {
      setMovieName(e.target.value);
    }} />
<TextField id="standard-basic" label="Poster URL" variant="standard" onChange={(e) => {
      setPoster(e.target.value);
    }} />
<TextField id="standard-basic" label="Rating" variant="standard" onChange={(e) => {
      setRating(e.target.value);
    }} />
<TextField id="standard-basic" label="Description" variant="standard"  onChange={(e) => {
      setDescription(e.target.value);
    }} />
    <TextField id="standard-basic" label="Trailer" variant="standard"  onChange={(e) => {
      setTrailer(e.target.value);
    }} />




<Button variant="contained" onClick={() =>{
    const newMovie = {
      name:movieName,
      rating: ratings,
      summary: description,
      poster:posters,
      trailer:trailers,
      
      

  }
  
   fetch("https://62a09dfc202ceef708723f5e.mockapi.io/movies", 
  {method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body:JSON.stringify(newMovie),
   })
  .then((data) => data.json())
  .then(() => navigate("/movie-list"));
}}>Add Movie</Button>
  </div>
  </div>

  );
}

function Home() {
  return (
    <div>
      <h1> Welcome to Movie App ✨✨</h1>
    </div>
  );
}


export function MovieList()
{
 

  const navigate = useNavigate();
 const [movieList,setMovieList] = useState([]);
const getMovies = () =>  {
  fetch('https://62a09dfc202ceef708723f5e.mockapi.io/movies')
  .then((data) => data.json())
  .then((mv) => setMovieList(mv)) 
};

    useEffect(() =>getMovies(),[]);
   
    
  return (
    <div className="App">
      <h1>Hi there!!😁😁</h1>

     
    

    
    <div className='movie-list'>
      
    {movieList.map((nm , index) => (
      
        <Welcome key ={index} movie={nm} id = {nm.id}  deleteButton = { <IconButton className='btn' onClick={() =>{ 

          fetch(`https://62a09dfc202ceef708723f5e.mockapi.io/movies/${nm.id}`,{method: 'DELETE'} )
  .then((data) => data.json())
  .then(() => getMovies())


          

        } }  color = 'error'>

        <DeleteIcon/>
   
   </IconButton>} editButton  = { <IconButton className='btn' onClick={() =>{ 
       navigate(`/edit-movie/${nm.id}`)
     } }  color = 'secondary'>

        
     <EditIcon/>
   
   </IconButton> }  />
      )
      )}
    </div>
     
     



    </div>
  );
}


function EditMovie()
{
  const {id} = useParams();

  const [movie,setMovie] = useState(null);
  
  
        fetch(`https://62a09dfc202ceef708723f5e.mockapi.io/movies/${id}`)
      .then((data) => data.json())
      .then((movie) => setMovie(movie));
       
      return ( movie ? <EditForm movie = {movie}/> : <p>loading..</p>);
  
  
  


}


function EditForm({movie}) 
{ 
  const {id} = useParams();

  const [movieName,setMovieName] = useState(movie.name);
  const [posters,setPoster] = useState(movie.poster);
  const [ratings,setRating] = useState(movie.rating);
  const [description,setDescription] = useState(movie.summary);
  const [trailers,setTrailer] = useState(movie.trailer);
  const navigate = useNavigate();
  return(
    <div>
    <h2>Edit Movie</h2>
    <div className='Add'>


<TextField label="Movie Name" variant="standard" value = {movieName} onChange={(e) => {
       
      setMovieName(e.target.value);
    }} />
<TextField  label="Poster URL" variant="standard" value={posters} onChange={(e) => {
      setPoster(e.target.value);
    }} />
<TextField label="Rating" variant="standard" value={ratings} onChange={(e) => {
      setRating(e.target.value);
    }} />
<TextField label="Description" variant="standard" value={description}onChange={(e) => {
      setDescription(e.target.value);
    }} />
    <TextField label="Trailer" variant="standard" value={trailers} onChange={(e) => {
      setTrailer(e.target.value);
    }} />




<Button variant="contained" onClick={() =>{
    const newMovie = {
      name:movieName,
      rating: ratings,
      summary: description,
      poster:posters,
      trailer:trailers,
      
      
  }

  fetch(`https://62a09dfc202ceef708723f5e.mockapi.io/movies/${id}`,{method: 'PUT',
  body: JSON.stringify(newMovie),
  headers: {'Content-Type': 'application/json'}})
  .then((data) => data.json())
  
  .then(()=> navigate(-1));

  

 
}}>Edit Movie</Button>
  </div>
  </div>

  );

}







