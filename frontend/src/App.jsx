import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.min.js'

import Login from './components/Login';
import Search from './components/Search';
import Layout from './components/Layout';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import { Routes, Route } from 'react-router-dom';


function App() {

  return (
    <Routes>
        <Route path="login" element={<Login />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Search />}/>
          <Route path="*" element={<Missing />} />
        </Route>
    </Routes>
  );
}

export default App;