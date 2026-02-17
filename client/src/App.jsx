import { useState } from 'react'
import reactLogo from './assets/react.svg'
import {Route, Routes} from 'react-router-dom'
import LandingPage from './pages/landingPage'
import ConnectPage from './pages/connectPage'
import AnalyzingPage from './pages/analyzingPage'
import ResultPage from './pages/resultPage.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/connect' element={<ConnectPage />} />
        <Route path='/analyze' element={<AnalyzingPage />} />
        <Route path='/result' element={<ResultPage />} />
      </Routes>
  )
}

export default App
