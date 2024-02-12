import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Error404 from './pages/Error404';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Layout from './pages/Layout';
import UserManager from './pages/UserManager';
import RiskReport from './pages/RiskReport';
import RiskEditor from './pages/RiskEditor';
import AdminEditUser from './pages/AdminEditUser';
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
          <Route path='*' element={<Error404 />} />  
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
