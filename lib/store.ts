import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import counterReducer, {
  incrementAsync,
  incrementAsyncFinished,
  incrementAsyncStarted,
  incrementByAmount,
} from "@/lib/features/counter/counterSlice";

const listenerMiddleware = createListenerMiddleware();

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

const startAppListening = listenerMiddleware.startListening.withTypes<
  RootState,
  AppDispatch
>();

startAppListening({
  actionCreator: incrementAsync,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();
    listenerApi.dispatch(incrementAsyncStarted());

    try {
      await listenerApi.delay(1000);
      listenerApi.dispatch(incrementByAmount(action.payload));
    } finally {
      listenerApi.dispatch(incrementAsyncFinished());
    }
  },
});
