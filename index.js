import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import App from './containers/App'
import Login from './containers/Login'
import Reddit from './containers/Reddit'
import configureStore from './store/configureStore'

const store = configureStore()

render(	
  <Provider store={store}>
    <Router history={browserHistory} >
    	<Route path="/" component={App}>
        <IndexRoute component={Login} />	              	     
    		<Route path="/reddit" component={Reddit} />        
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
