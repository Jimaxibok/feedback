import Header from './components/Header'
import FeedbackList from './components/FeedbackList'
import AboutIconLink from './components/AboutIconLink'
import FeedbackStat from './components/FeedbackStat'
import FeedbackForm from './components/FeedbackForm'
import AboutPage from './pages/AboutPage'
import { FeedbackProvider } from './context/FeedbackContext'
import { BrowserRouter as Router, Route,Routes }from 'react-router-dom'

function App() {
   


    return (
        <FeedbackProvider>
        <Router>
        <Header  />

        <div className='container'>
            <Routes>
                <Route exact path='/' element={
                    <>
        <FeedbackForm />
        <FeedbackStat />
        <FeedbackList />
             </>
                } 
                ></Route>
                <Route path='/about' element={<AboutPage />} />
        </Routes>
        
        </div>
        <AboutIconLink />

    </Router>
    </FeedbackProvider>
    )
}


export default App