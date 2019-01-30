import {FETCH_NOTICES, NEW_NOTICE} from './types';
 
export const fetchNotices = () => dispatch => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(notices =>
        dispatch({
          type: FETCH_NOTICES,
          payload: notices
        })
      );
  };

 
export const createNotice = postData => dispatch => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
      .then(res => res.json())
      .then(notice =>
        dispatch({
          type: NEW_NOTICE,
          payload: notice
        })
      );
  };