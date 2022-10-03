import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Route,
  Routes,
  HashRouter,
  Navigate,
} from 'react-router-dom';

import { RecoilRoot } from 'recoil';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

import { ToastContainer } from 'react-toastify';

import Auth from './components/Auth';

import './index.css';
// import CharSetting from './components/CharSetting/CharSetting';
// import CharRadeSetting from './components/CharRadeSetting/CharRadeSetting';
import Dashboard from './components/Dashboard/Dashboard';
// import SortSetting from './components/SortSetting/SortSetting';
import MainLayout from './components/Layout/MainLayout';
import SplashProvider, {
  SplashContext,
} from './components/Splash/SplashProvider';
import Splash from './components/Splash/Splash';
import LoginModal from './components/Login';
import LoginModalProvider from './components/Login/LoginModalProvider';
import AddItemModalProvider from './components/AddItemModal/AddItemModalProvider';
import AddItemModal from './components/AddItemModal/AddItemModal';
import CharacterContent from './components/CharacterContent/CharacterContent';
import CharSetting from './components/CharSetting/CharSetting';

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

// const persister = createSyncStoragePersister({
//   storage: window.localStorage,
// });

const id = 'root';
const rootElem = document.getElementById(id);
if (rootElem) {
  const root = ReactDOM.createRoot(rootElem);

  const userAgent = navigator.userAgent.toLowerCase();

  // NOTE 일렉트론 환경에서는 file 이기에  HasRouter를 사용하기 때문에 라우트 분기처리
  const Router =
    userAgent.indexOf(' electron/') > -1 ? HashRouter : BrowserRouter;

  // <React.StrictMode>
  root.render(
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <SplashProvider>
          <LoginModalProvider>
            <AddItemModalProvider>
              <Splash />
              <LoginModal />
              <Router>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Auth>
                        <MainLayout />
                      </Auth>
                    }
                  >
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route
                      path="character/:tokenName"
                      element={<CharacterContent />}
                    />

                    <Route path="character/setting" element={<CharSetting />} />
                    {/* <Route path="char-rade-setting" element={<CharRadeSetting />} />
              <Route path="sort-setting" element={<SortSetting />} /> */}

                    <Route path="*" element={<Navigate to="/" />} />
                  </Route>
                </Routes>
              </Router>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
              />
              <ReactQueryDevtools position="bottom-right" />
            </AddItemModalProvider>
          </LoginModalProvider>
        </SplashProvider>
      </RecoilRoot>
    </QueryClientProvider>,
  );
  // </React.StrictMode>
} else {
  console.error(
    `${rootElem} 가 존재하지 않습니다. (${id} 가 존재하지 않을 수도 있습니다)`,
  );
}
