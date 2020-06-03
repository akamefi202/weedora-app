import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';

import Root from './src/Root';
import { configureStore } from './src/store';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <StatusBar hidden />
      <Root />
    </Provider>
  );
}

export default App;