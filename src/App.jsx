import { Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './Pages/LoginPage/Loginpage'
import HomePage from './Pages/HomePage/HomePage'
import UsersList from './Pages/Users/UsersList'
import UserProvider from './Context/AuthProvider'

function App() {

  return (
    <>
      <UserProvider>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/homepage' element={<HomePage />} />
          <Route path='/users' element={<UsersList />} />
        </Routes>
      </UserProvider>
      {/* <LoginPage /> */}

    </>
  )
}

export default App
