import React from 'react';
import Sidebar from './components/Sidebar';
import ChatRoom from './components/ChatRoom';
import SearchBar from './components/SearchBar';
import { Provider } from 'react-redux';
import store from './store';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider store={store}>
      <div className="search-bar-container">
        <SearchBar />
      </div>
      <div className="chat-room-container">
        <Sidebar />
          <ChatRoom />
      </div>
    </Provider>
  );
}

export default App;
