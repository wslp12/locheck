import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Route,
  Routes,
  HashRouter,
  Navigate,
} from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import { RecoilRoot } from 'recoil';

import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

import './index.css';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard/Dashboard';
import MainLayout from './components/Layout/MainLayout';
import SplashProvider from './components/Splash/SplashProvider';
import Splash from './components/Splash/Splash';
import LoginModal from './components/Login';
import LoginModalProvider from './components/Login/LoginModalProvider';
import AddItemModalProvider from './components/AddItemModal/AddItemModalProvider';
import CharacterContent from './components/CharacterContent/CharacterContent';
import CharSetting from './components/CharSetting/CharSetting';
import Private from './components/Private/Private';
import RaidInfo from './components/RaidInfo/RaidInfo';
import { QUERY_KEY } from './enum';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 60 * 60 * 48, // 48 시간
      staleTime: Infinity,
      retry: 0,
    },
  },
});

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

const id = 'root';
const rootElem = document.getElementById(id);
if (rootElem) {
  const root = ReactDOM.createRoot(rootElem);

  const userAgent = navigator.userAgent.toLowerCase();

  // NOTE 일렉트론 환경에서는 file 이기에  HasRouter를 사용하기 때문에 라우트 분기처리
  const Router =
    userAgent.indexOf(' electron/') > -1 ? HashRouter : BrowserRouter;

  root.render(
    <React.StrictMode>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{
          persister,
          dehydrateOptions: {
            shouldDehydrateQuery: (item) => {
              const stringifyQueryKey = JSON.stringify(item.queryKey);
              return stringifyQueryKey !== JSON.stringify([QUERY_KEY.ORG_LIST]);
            },
          },
        }}
      >
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
                      <Route path="private" element={<Private />} />
                      <Route path="raidinfo" element={<RaidInfo />} />
                      <Route
                        path="character/:tokenName"
                        element={<CharacterContent />}
                      />
                      <Route
                        path="character/setting"
                        element={<CharSetting />}
                      />
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
      </PersistQueryClientProvider>
    </React.StrictMode>,
  );
} else {
  console.error(
    `${rootElem} 가 존재하지 않습니다. (${id} 가 존재하지 않을 수도 있습니다)`,
  );
}
