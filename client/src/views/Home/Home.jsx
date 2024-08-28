import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import 'react-router-dom'
import axios from 'axios'

import "./Home.css"
import TransactionCard from '../../components/TransactionCard/TransactionCard'
import add from "./copy.png"
import { Link } from 'react-router-dom'

function Home() {
  const [user, setUser] = useState('')
  const [transactions, setTransactions] = useState([])
  const [netIncome, setNetIncome] = useState(0)
  const [netExpense, setnetExpense] = useState(0)


  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))

    if (currentUser) {
      setUser(currentUser)
    }

    if (!currentUser) {
      window.location.href = '/login'
    }
  }, [])

  const loadTransaction = async () => {
    if(!user._id){
      return
    }
    const response = await axios.get(`${import.meta.env.VITE_API_BACKEND_URL}/transactions?userId=${user._id}`)

   
    setTransactions(response.data.data)
  }

  useEffect(()=>{
    loadTransaction();
  },[user])

  useEffect(()=>{
    let income = 0
    let expense = 0

    transactions.forEach((transaction) => {
      if (transaction.type === 'credit') {
        income += transaction.amount
      }
      else{
        expense += transaction.amount
      }
    })

    setNetIncome(income)
    setnetExpense(expense)
  },[transactions])
  return (
    <div>
      <h1 className="home-heading">Hello {user.fullName} 👋</h1>
      <h2 className="home-heading">Welcome to Expense Tracker</h2>

      <span className='home-logout' onClick={() => {
        localStorage.clear()
        toast.success(`Logged out successfully`)

        setTimeout(() => {
          window.location.href = '/login'
        }, 3000)
      }}>Logout</span>

      <div className='net-transaction-values'>
        <div className='net-transaction-value-item'>
          <span className='net-transaction-value-amount'>
            + {netIncome}
          </span>
          <span className='net-transaction-value-title'>
            Net Income
          </span>
        </div>

        <div className='net-transaction-value-item'>
          <span className='net-transaction-value-amount'>
            - {netExpense}
          </span>
          <span className='net-transaction-value-title'>
           Net Expense
          </span>
        </div>

        <div className='net-transaction-value-item'>
          <span className='net-transaction-value-amount'>
            + {netIncome - netExpense}
          </span>
          <span className='net-transaction-value-title'>
            Net Balance
          </span>
        </div>
      </div>

    <div className='transactions-container'>
      {
        transactions.map((transaction) => {
          const {_id, title, amount, category, type, createdAt} = transaction

          return <TransactionCard
            key={_id}
            _id={_id}
            title={title}
            amount={amount}
            category={category}
            type={type}
            createdAt={createdAt}
            loadTransaction= {loadTransaction}/>
        })
      }
    </div>
    <Link to='/addtransaction'>
      <img src={add} alt='Add Transaction' className='add-transaction'/>
    </Link>
    <Toaster />
    </div>
  )
}

export default Home