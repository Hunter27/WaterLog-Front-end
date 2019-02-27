import {
    START_POLLING,
    FETCH_JOKE,
    FETCH_JOKE_SUCCESS,
    STOP_POLLING,
    FETCH_JOKE_FAILURE
} from './Types';

function startPolling() {
      return {
        type: START_POLLING
      };
    }

function stopPolling() {
      return {
        type: STOP_POLLING
      };
    }

function fetchJoke() {
  return {
    type: FETCH_JOKE
  };
}

function fetchJokeSuccess(data) {
  return {
    type: FETCH_JOKE_SUCCESS,
    data
  };
}

function fetchJokeFail(error) {
  return {
    type: FETCH_JOKE_FAILURE,
    error
  };
}