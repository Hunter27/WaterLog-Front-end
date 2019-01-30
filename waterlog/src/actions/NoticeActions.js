import {FETCH_NOTICES, NEW_NOTICE} from './types';

export function fetchNotices(){
    return function(dispatch){ 
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(posts =>  dispatch({
            type:FETCH_NOTICES,
            payload:posts
        }));
    }
}

export function createNotice(postData){
    return function(dispatch){  
        fetch('https://jsonplaceholder.typicode.com/posts',{
            method:'POST',
            header:{
                'content-type':'application/json'
            },
            body: JSON.stringify(postData)
        })
        .then(res => res.json())
        .then(post =>dispatch({
            type:NEW_NOTICE,
            payload:post
        }));
    }
}