import {FETCH_NOTICES, NEW_NOTICE} from '../actions/types';

const initialState ={
    items:[],
    item:{}
    }

   export default function(state =initialState, action){
       switch(action.type){
        case FETCH_NOTICES: 
         return{
             ...state,
             items:action.payload
         };

         case NEW_NOTICE:
         return{
             ...state,
             item:action.payload
         } 
           default:
             return state;
       }
   }