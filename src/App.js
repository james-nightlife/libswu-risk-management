import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import ErrorPage from './error-page';
import Home from './routes/Home';
import SignIn from './routes/SignIn';
import Layout from './routes/Layout';
import UserManager from './routes/UserManager';
import RiskReport from './routes/RiskReport';
import RiskEvaluation from './routes/RiskEvaluation';
import RiskEditor from './routes/RiskEditor';

function App() {
  var user = sessionStorage.getItem('user');
  var room = localStorage.getItem('room');

  if(!user) {
    return <SignIn />
  }else{
    user = JSON.parse(user);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout user={user} />}>
          <Route index element={<Home />} />
          <Route path='*' element={<ErrorPage />} />
          <Route path='/risk-evaluation' element={<RiskEvaluation />} />
          <Route path='/user-manager' element={<UserManager />} />
          <Route path='/report' element={<RiskReport />} />
          <Route path='/risk-editor' element={<RiskEditor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
