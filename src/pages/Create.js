import { useState } from 'react'
import supabase from '../config/supabaseClients'
import { useNavigate } from 'react-router-dom'

const Create = () => {

const navigate = useNavigate()  
const [name, setName] = useState('')
const [comment, setComment] = useState('')
const [rating, setRating] = useState('')
const [formError, setFormError] = useState(null)


const handleSubmit = async (e) => {
  e.preventDefault()
  setFormError(null)
  // validation
  if (!name || !comment || !rating) {
    setFormError('Please fill in all fields')
    
  }

window.alert('Food added successfully')

const { data, error } = await supabase
  .from('Foods')
  .insert([
{ name, comment, rating },
  ])
  .select()

  if (error) {
    setFormError('Could not add food, please try again')
    console.log(error)
  }
  if (data) {
    console.log(data)
    setName('')
    setComment('')
    setRating('')
    setFormError(null)
    navigate('/home')
  }

}

  return (
    <div className="page create custom-form">
      <form onSubmit={handleSubmit} className="custom-form">
        <label>
          <span>Food Name:</span>
          <input 
            id='name'
            type="text" 
            required 
            onChange={(e) => setName(e.target.value)} 
            value={name} 
            className="custom-input"
          />
        </label>
        <label>
          <span>Food Comment:</span>
          <textarea 
            required 
            onChange={(e) => setComment(e.target.value)} 
            value={comment} 
            className="custom-textarea"
          ></textarea>
        </label>
        <label>
          <span>Food Rating:</span>
          <input 
            type="number" 
            required 
            onChange={(e) => setRating(e.target.value)} 
            value={rating} 
            className="custom-input"
          />
        </label>
        {formError && <p className="error custom-error">{formError}</p>}
        <button className="btn custom-btn">Add New Food</button>
      </form>
    </div>
  )
}

export default Create