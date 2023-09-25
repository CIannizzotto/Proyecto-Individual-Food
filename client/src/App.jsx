import style from './App.module.css';
import { Routes, Route } from 'react-router-dom';
import {useLocation} from 'react-router-dom'
import { useSelector } from 'react-redux';
import Nav from './components/Nav/Nav'
import LandingPage from './pages/LandingPage/LandingPage.jsx';
import Home from './pages/Home/Home';
import Details from './pages/Details/Details';
import Form from './pages/Form/Form';


function App() {
  const location = useLocation();
  const teme = useSelector(state => state.visualFilter);

  return (
    <div className={teme? style.containerLight: style.container}>
      {
         location.pathname !== '/' && <Nav/>
         }
        <Routes>
            {/* <Route 
            exact path={["/home", "/form", "/home/:id"]}
            element={<Nav />}
            /> */}
            <Route
             path='/home'
            element={<Home/>}
            />
            <Route
             path='/home/:id'
            element={<Details/>}
            />
            <Route
             path='/form'
            element={<Form/>}
            />
            <Route 
            path='/' 
            element={<LandingPage/>}
            />
         </Routes>
    </div>
  )
}

export default App
