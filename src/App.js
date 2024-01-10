import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import ErrorPage from './error-page';
import Home from './routes/Home';
import SignIn from './routes/SignIn';
import Layout from './routes/Layout';
import UserManager from './routes/UserManager';
import RiskReport from './routes/RiskReport';
import RiskEditor from './routes/RiskEditor';
import AdminAddUser from './routes/AdminAddUser';
import ChangePassword from './routes/ChangePassword';
import AdminEditUser from './routes/AdminEditUser';
import Search from './routes/Search';

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
          <Route path='/report' element={<RiskReport />} />
          <Route path='/risk-editor' element={<RiskEditor />} />
          <Route path='/change-password' element={<ChangePassword />} />
          <Route path='/admin/users' element={<UserManager />} />
          <Route path='/admin/users/add' element={<AdminAddUser />} />
          <Route path='/admin/users/edit' element={<AdminEditUser />} />
          <Route path='/search' element={<Search />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
