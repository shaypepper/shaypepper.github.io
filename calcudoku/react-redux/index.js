import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import calcudokuApp from './reducers'
import App from './components/App'

let store = createStore(calcudokuApp);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
