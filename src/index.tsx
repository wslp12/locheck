import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Auth from './components/Auth';
import Home from './components/Home';
import Login from './components/Login';
import './index.css';

const id = 'root';
const rootElem = document.getElementById(id);
if (rootElem) {
  console.log(process.env.R_MODE);
  const root = ReactDOM.createRoot(rootElem);
  root.render(
    <React.StrictMode>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Auth />}>
              <Route path="home" element={<Home />} />
              <Route path="login" element={<Login />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </React.StrictMode>,
  );
} else {
  console.error(
    `${rootElem} 가 존재하지 않습니다. (${id} 가 존재하지 않을 수도 있습니다)`,
  );
}
