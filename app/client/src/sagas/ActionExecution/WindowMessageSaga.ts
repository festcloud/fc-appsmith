import { call } from "redux-saga/effects";
import { evalWorker } from "sagas/EvaluationsSaga";
import store from "store";

export function* windowMessageSaga(action: any) {
  const { payload } = action;

  yield call(
    evalWorker.ping,
    { data: payload.data, origin: payload.origin },
    payload.listenerId,
  );
}

export const WINDOW_MESSAGE_RECEIVED = "WINDOW_MESSAGE_RECEIVED";

export const windowMessageReceived = (payload: any) => ({
  type: WINDOW_MESSAGE_RECEIVED,
  payload,
});

self.addEventListener("message", (event) => {
  const { origin } = event;

  const payload = {
    data: event.data,
    listenerId: "windowMessageListener_1",
    origin,
  };

  store.dispatch(windowMessageReceived(payload));
});
