import fetch from 'isomorphic-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_REDDIT = 'SELECT_REDDIT'
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT'
export const REQUEST_AUTH = 'REQUEST_AUTH'
export const SUCCESS_AUTH = 'SUCCESS_AUTH'

export function requestAuth(userData) {  
  return {
      type: REQUEST_AUTH,
      userData
  }
}

export function successAuth(userData) {  
  return {
      type: SUCCESS_AUTH,
      userData,
      receivedAt: Date.now()
  }
}

export function selectReddit(reddit) {
  return {
    type: SELECT_REDDIT,
    reddit
  }
}

export function invalidateReddit(reddit) {
  return {
    type: INVALIDATE_REDDIT,
    reddit
  }
}

function requestPosts(reddit) {
  return {
    type: REQUEST_POSTS,
    reddit
  }
}

function receivePosts(reddit, json) {
  return {
    type: RECEIVE_POSTS,
    reddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

function fetchPosts(reddit) {
  return dispatch => {
    dispatch(requestPosts(reddit))
    return fetch(`https://www.reddit.com/r/${reddit}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(reddit, json)))
  }
}

function shouldFetchPosts(state, reddit) {
  const posts = state.postsByReddit[reddit]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export function fetchPostsIfNeeded(reddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), reddit)) {
      return dispatch(fetchPosts(reddit))
    }
  }
}

export function loginAuth(userData){
  return dispatch => {
    return fetch('http://localhost:1337/signin', {
      method: 'POST',
      headers: {        
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify(userData),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      return dispatch(successAuth(responseJson))    
    })
    .catch((error) => {
      console.log(error);
      console.log('failed to register');
    });  
  }
  
  

}

