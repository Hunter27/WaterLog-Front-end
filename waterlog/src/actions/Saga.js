import { call, put, takeEvery, takeLatest, take, race } from 'redux-saga/effects'

import {FETCH_JOKE, FETCH_JOKE_SUCCESS, FETCH_JOKE_FAILURE, START_POLLING, STOP_POLLING } from '../actions/Types';

import axios from 'axios';



function delay(duration) {
  const promise = new Promise(resolve => {
    setTimeout(() => resolve(true), duration)
  })
  return promise
}

function* fetchJokes(action) {
  while (true) {
    try {
      const { data } = yield call(() => axios({ url: process.env.REACT_APP_API_URL +`/api/realtime/pollnotifications`}))
      yield put({ type: FETCH_JOKE_SUCCESS, data: data })
      yield call(delay, 5000)
    } catch (e) {
      yield put({ type: FETCH_JOKE_FAILURE, message: e.message })
    }
  }
}

function* watchPollJokesSaga() {
  while (true) {
    const data = yield take(START_POLLING)
    yield race([call(fetchJokes, data), take(STOP_POLLING)])
  }
}

export default function* root() {
  yield [watchPollJokesSaga()]
}