import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, HashRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Auth from './components/Auth';
import Home from './components/Home';
import Login from './components/Login';
import './index.css';
import CharSetting from './CharSetting/CharSetting';
import CharRadeSetting from './CharRadeSetting/CharRadeSetting';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      staleTime: Infinity,
      cacheTime: 1000 * 60 * 60 * 48, // 48 시간
      retry: 0,
    },
  },
});

const id = 'root';
const rootElem = document.getElementById(id);
if (rootElem) {
  console.log(process.env.locheck);
  const root = ReactDOM.createRoot(rootElem);

  const userAgent = navigator.userAgent.toLowerCase();

  // NOTE 일렉트론 환경에서는 file 이기에  HasRouter를 사용하기 때문에 라우트 분기처리
  const Router =
    userAgent.indexOf(' electron/') > -1 ? HashRouter : BrowserRouter;

  root.render(
    // <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Router>
          <Routes>
            <Route path="/" element={<Auth />}>
              <Route path="home" element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="char-setting" element={<CharSetting />} />
              <Route path="char-rade-setting" element={<CharRadeSetting />} />
              <Route path="/" element={<Home />} />
            </Route>
          </Routes>
        </Router>
      </RecoilRoot>
    </QueryClientProvider>,
    // </React.StrictMode>,
  );
} else {
  console.error(
    `${rootElem} 가 존재하지 않습니다. (${id} 가 존재하지 않을 수도 있습니다)`,
  );
}
