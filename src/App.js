import { BrowserRouter, Route, Routes} from 'react-router-dom';
import ErrorPage from './error-page';
import Home from './routes/Home';
import SignIn from './routes/SignIn';
import Layout from './routes/Layout';
import UserManager from './routes/UserManager';
import RiskReport from './routes/RiskReport';
import RiskEditor from './routes/RiskEditor';
import AdminEditUser from './routes/AdminEditUser';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  var token = sessionStorage.getItem('token');

  if(!token) {
    return <SignIn />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='*' element={<ErrorPage />} />  
          <Route path='/report' element={<RiskReport />} />
          <Route path='/risk-editor' element={<RiskEditor />} />
          <Route path='/admin/users' element={<UserManager />} />
          <Route path='/admin/users/edit' element={<AdminEditUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
