import {BrowserRouter as Router ,Routes,Route} from 'react-router-dom';
import HomePage from './Pages/Home_page';
import SignUp from './Pages/SignUpPage';
import Login from './Pages/LoginPage';
import Questions from './components/AllQuestions';
import CreatePost from './components/CreatePost';
import UpdateQuestion from './components/UpdateQuestion';
import AuthProvider from './api/AuthContext';
import OneQuestion from './components/OneQuestions';
import UserQuestions from './components/userQuestions';
import './App.css';

const App=()=>{
  return(
  <AuthProvider>
    <Router>
       <Routes>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path="/" element={<HomePage />}>
            <Route index element={<Questions/>} />
            <Route path='question/:id' element={<OneQuestion/>} />
            <Route path="create-post" element={<CreatePost/>} />
            <Route path="edit-post/:id" element={<UpdateQuestion/>} />
            <Route path='your-questions' element={<UserQuestions/>}/>
          </Route>
       </Routes>
    </Router>  
  </AuthProvider>  
  )
}
export default App;