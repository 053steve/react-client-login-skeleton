import { combineReducers } from 'redux'
import {
  SELECT_REDDIT, INVALIDATE_REDDIT,
  REQUEST_POSTS, RECEIVE_POSTS, REQUEST_AUTH, SUCCESS_AUTH 
} from '../actions'

function selectedReddit(state = 'reactjs', action) {
  
  switch (action.type) {
    case SELECT_REDDIT:
      return action.reddit
    default:
      return state
  }
}

function user(state = {
  isLoggedIn: false,
  user: {}

}, action ){  

  switch (action.type) {
    case REQUEST_AUTH:      
      return state
    case SUCCESS_AUTH:      
      return Object.assign({}, state, {
        isLoggedIn: true,
        user: action.userData,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }

}

function posts(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  
  switch (action.type) {
    case INVALIDATE_REDDIT:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function postsByReddit(state = { }, action) {
  
  switch (action.type) {
    case INVALIDATE_REDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.reddit]: posts(state[action.reddit], action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  postsByReddit,
  selectedReddit,
  posts,
  user
})

export default rootReducer
