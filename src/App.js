
import { useEffect, useState } from 'react';
import './App.css';
import { Nutrition } from './Nutrition';
import { LoaderPage } from './LoaderPage';
import Swal from 'sweetalert2';



function App() {
  const [mySearch, setMySearch] = useState();
  const [wordSubmitted, setWordSubmitted]= useState('');
  const [myNutrition, setMyNutrition] = useState();
  const [stateLoader, setStateLoader] = useState(false);



  const APP_ID = 'a8ec865b';
  const APP_KEY = '4e565f26650b19e7860f6fd020395bc1';
  const APP_URL = 'https://api.edamam.com/api/nutrition-details';

  const fetchData = async (ingr) => {
    setStateLoader(true);


  const response  = await fetch(`${APP_URL}?app_id=${APP_ID}&app_key=${APP_KEY}`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingr: ingr })
  })
  if (response.ok) {
    setStateLoader(false);
    const data = await response.json();
    setMyNutrition(data);
  
  }

  else {
    setStateLoader(false)
    // eslint-disable-next-line
    {Swal.fire({
      icon: "error",
      title: "Request entered incorrectly!",
      text: "Type quantity and ingredient.",
    });}
  } 
}
  const myRecipeSearch = e => {
    setMySearch (e.target.value);
  }

  const finalSearch = e => {
    e.preventDefault();
    setWordSubmitted(mySearch);
  }

  useEffect(() => {
    
    if (wordSubmitted !== '') {
      let ingr = wordSubmitted.split(/[,,;,\n,\r]/);
      fetchData(ingr);
    }  
  }, [wordSubmitted])


  return (
    <div className='App'>
    <div className='container'>
      {stateLoader && <LoaderPage/>}

      <h1>Nutrition Analysis</h1>
      <form onSubmit={finalSearch} className='search'>
        <input  onChange={myRecipeSearch} placeholder='Type quantity and ingredient'/>
        <button type='submit'>Search</button>
      </form>
      <button className='clear' onClick={()=>{window.location.reload()}}>Clear</button>
  <div>

    {
      myNutrition && Object.values (myNutrition.totalNutrients)
      .map(( { label, quantity, unit, id}) => 
      <Nutrition 
        key={id}
        label={label}
        quantity={quantity}
        unit={unit}
        />
      )
    }
    </div>
  </div>
  </div>
  );
}

export default App;
