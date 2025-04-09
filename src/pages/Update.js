import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import supabase from "../config/supabaseClients"

const Update = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState('')
  const [formError, setFormError] = useState(null)
 
const { id } = useParams()

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!name || !comment || !rating) {
    setFormError('Please fill in all fields');
  }

  const { data, error } = await supabase
    .from('Foods')
    .update({ name, comment, rating })
    .eq('id', id)
    .select()


  if (data) {
    console.log(data);
    navigate('/');
  }

  if (error) {
    console.log(error);
  }
};
  

 

  useEffect(() => {
    const fetchFoods = async () => {
      const { data, error } = await supabase
        .from('Foods')
        .select()
        .eq('id', id)
        .single()
  
      if (error) {
     navigate('/' , { replace: true})
      }
  
      if (data) {
       setName(data.name)
        setComment(data.comment)
        setRating(data.rating)
        console.log(data)
      }
    }
  
    fetchFoods()
  }, [id, navigate])

  return (
    <div className="page update">
    <form onSubmit={handleSubmit}>
        <label>
          <span>Food Name:</span>
          <input 
          id='name'
            type="text" 
            required 
            onChange={(e) => setName(e.target.value)} 
            value={name} 
          />
        </label>
        <label>
          <span>Food Comment:</span>
          <textarea 
            required 
            onChange={(e) => setComment(e.target.value)} 
            value={comment} 
          ></textarea>
        </label>
        <label>
          <span>Food Rating:</span>
          <input 
            type="number" 
            required 
            onChange={(e) => setRating(e.target.value)} 
            value={rating} 
          />
        </label>
        <button className="btn">Update Food Info</button>

      </form>
    </div>

  )
}

export default Update