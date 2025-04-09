import supabase from "../config/supabaseClients"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


const  Home = () => { 
  const [fetchError, setFetchError] = useState(null)
  const [Foods, setFoods] = useState(null)
  const [orderBy, setOrderBy] = useState('created_at')

  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('Foods')
      .delete()
      .eq('id', id);
 
    if (error) {
      setFetchError("Could not delete the food");
      console.log(error);
      return;
    }
  
    // Update the Foods state to remove the deleted item
    setFoods((prevFoods) => prevFoods.filter((food) => food.id !== id));
    setFetchError(null);
  };
  


// Fetching
  useEffect(() => {
const fetchFoods = async () => {
  const { data, error } = await supabase
    .from('Foods')
    .select()
    .order(orderBy, { ascending: false })

  if (error) {
    setFetchError("Could fetch require data, Try again")
    setFoods(null)
    console.log(error)
  }

  if (data) {
    setFoods(data)
    setFetchError(null)
  }
}

  fetchFoods()


  }, [orderBy])

  
 

  return (
    <div className="page home">
    {fetchError && <p className="error">{fetchError}</p>}
    {Foods && (
      <div className="foods">
        <div className="order-by">
          <p>order-by:-</p>
          <button onClick={() => setOrderBy('created_at')}>Created At</button>
          <button onClick={() => setOrderBy('name')}>Name</button>
          <button onClick={() => setOrderBy('rating')}>Rating</button>  
          <p className="firstState">{orderBy}</p>
        </div>
        
   <div className="food-grid">
   {Foods.map(food => (
      <div className="food-card" key={food.id}>
        <h3>{food.name}</h3>
        <p>{food.comment}</p>
        <p className="rating">{food.rating}</p>
       
        <Link className='icon-container' to={'/' + food.id}>
        <i className="material-icons edit-icon"> edit </i>
        </Link>  
        <i className="material-icons delete-icon" onClick={() => handleDelete(food.id)} > delete </i>

    
      </div>
   ))}
   </div>
      </div>
    )}
    </div>
  )
}



export default Home