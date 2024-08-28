import React, { useState, useEffect } from 'react'
import axios from 'axios'
import toast, {Toaster} from 'react-hot-toast'
import "./AddTransaction.css"


function AddTransaction() {
  const [user, setUser] =useState('')
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('0')
  const [type, setType] = useState('credit')
  const [category, setCategory] = useState('learning')

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))

    if (currentUser) {
      setUser(currentUser)
    }

    if (!currentUser) {
      window.location.href = '/login'
    }
  }, [])

  const addTransaction = async () => {
    console.log('Add transaction function called');
    const response = await axios.post(`${import.meta.env.VITE_API_BACKEND_URL}/transaction`, {
      title, amount, type, category, user: user._id
    });
    console.log('Response from backend API:', response);
    toast.success(response.data.message);
    setTitle('');
    setAmount('');
    setType('');
    setCategory('');
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  }

  return (
    <div>
        <h1 className="auth-heading">Add Transaction for {user.fullName}</h1>
        <form className="auth-form">
        <input
          type="text"
          placeholder="Enter Title"
          className="user-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter Amount"
          className="user-input"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select className='user-input' 
          value={type}
          onChange={(e) => setType(e.target.value)}>
            <option value='credit'>Income</option>
            <option value='debit'>Expense</option>
        </select>
        <select className='user-input'
          value={category}
          onChange={(e) => setCategory(e.target.value)}>
            <option value="food">Food</option>
            <option value="expense">Expense</option>
            <option value="rent">Rent</option>
            <option value="utilities">Utilities</option>
            <option value="transportation">Tranportation</option>
            <option value="learning">Learning</option>
            <option value="entertainment">Entertainment</option>
            <option value="clothing">Clothing</option>
            <option value="health">Health</option>
            <option value="salary">Salary</option>
        </select>
    
        <button type='button' className='btn-auth' onClick={addTransaction}>
            Add Transaction
        </button>
        </form>
        <Toaster/>
    </div>
  )
}

export default AddTransaction