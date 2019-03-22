import {
  FETCH_ALERTS_BEGIN,
  FETCH_ALERTS_SUCCESS,
  FETCH_ALERTS_FAILURE,
  FETCH_FILTERED_ALERTS_BEGIN,
  FETCH_FILTERED_ALERTS_SUCCESS,
  FETCH_FILTERED_ALERTS_FAILURE,
  GET_PAGE_NUMBER
} from '../actions/Types';

const initialState = {
  items: [],
  total: 0,
  page: 0,
  loading: false,
  error: null,
  dataChange: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_ALERTS_BEGIN:
      return {
        ...state,
        loading: action.load ? true: false,
        error: null
      };
    case FETCH_FILTERED_ALERTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_ALERTS_SUCCESS:
      let _items = state.items;
      let _page = state.page;
      let _dataChange = false;
      if (state.page !== action.payload.page && action.payload.load) {
        _page = action.payload.page;
        _items = _items.concat(action.payload.alerts);
      } else if (action.payload.page === 1 && !action.payload.load) {
        _items.filter(item => item.status === 2).forEach((item, index) => {
          if (JSON.stringify(item) !== JSON.stringify(action.payload.alerts[index])) {
            _dataChange = true;
            return;
          }
        });
        if (_dataChange) {
          _items.splice(0, action.payload.alerts.length, ...action.payload.alerts);
        }
      }
      _items = _items.sort((a, b) => b.status - a.status);
      return {
        ...state,
        loading: false,
        items: _items,
        total: action.payload.total,
        page: _page,
        error: null,
        dataChange: _dataChange
      };
    case FETCH_FILTERED_ALERTS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: state.items.concat(action.payload.alerts).sort((a, b) => b.status - a.status),
        total: action.payload.total,
        page: state.page,
        error: null
      };
    case FETCH_ALERTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case FETCH_FILTERED_ALERTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case GET_PAGE_NUMBER:
      return {
        ...state,
        page: state.page
      };
    default:
      return state;
  }
}
