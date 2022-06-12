import { useState } from 'react';
import './App.css';

import {Counter} from './counter.js'
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Icon, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { Navigate, useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export function Welcome({movie , id , deleteButton , editButton})
{
  const styles = {color: movie.rating > 8 ?"green" : "red",};
  const [show,setShow] = useState(true); 
  //const id = index;
 
  


  const navigate = useNavigate();


return(
  
  /*<div className='movie-container' >
    <img className = 'movie-poster' src={movie.poster} alt={movie.name}  />
    <div className='movie-specs'>

    <h2 className='movie-name'>{movie.name}  <IconButton className='btn' onClick={() => setShow(!show)} color = 'primary'>

{show ? <ExpandLessIcon/> : <ExpandMoreIcon/>}

</IconButton>  

<IconButton className='btn' onClick={() =>{ navigate(`/movie-list/${id}`)} }  color = 'primary'>

     <InfoIcon/>

</IconButton> </h2>
    
      <p  style = {styles} className='movie-rating'>⭐{movie.rating}</p>
    </div>
   
    
     { show ?  <p className='movie-summary'>{movie.summary}</p> : "" }
      <Counter/> {deleteButton}*/

     
<div className='movie-container'> 
      <Card sx={{ Width: 345 , height : 912 }}>
      <CardMedia
        component="img"
        height="510"
        image={movie.poster}
        alt={movie.name}
      />
      <CardContent>
        
        <Typography gutterBottom variant="h5" component="div">
        {movie.name} 
        <IconButton className='btn' onClick={() => setShow(!show)} color = 'primary'>

{show ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
</IconButton>  

<IconButton className='btn' onClick={() =>{ navigate(`/movie-list/${id}`)} }  color = 'primary'>

     <InfoIcon/>

</IconButton> 
        <p  style = {styles} className='movie-rating'>⭐{movie.rating}</p>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          
        { show ?  <p className='movie-summary'>{movie.summary}</p> : "" }
        </Typography>
      </CardContent>
      <CardActions>
      <Counter/> {deleteButton} {editButton} 
      </CardActions>
    </Card>
    

    
  </div>

  
)};


