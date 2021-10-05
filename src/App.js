import React from 'react';
import Footer from './components/footer';
import Header from './components/header';
import Main from './components/main';
import { GlobalProvider } from './hooks/global';

const App = () => (
  <GlobalProvider>
    <div className="wrapper">
      <Header />
      <Main />
    </div>
    <Footer />
  </GlobalProvider>
);

export default App;

// 이곳에서 어떤 내용이 앱에 들어가 출력될지가 결정됩니다.
