import './App.css';
import React, { useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

export function Counter()
{

    const [like, setLike] = useState(0);
    const [dislike, setDislike] = useState(0);

    
return(
  <div className='count' >


    

    <Button variant="light" onClick={() => setLike(like+1)}>
  👍 <Badge bg="danger">{like}</Badge>

</Button>

<Button variant="light" onClick={() => setDislike(dislike+1)}>
  👎 <Badge bg="danger">{dislike}</Badge>
  
</Button>
    
  </div>
)};


