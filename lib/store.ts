import {
  configureStore,
  createListenerMiddleware,
  type Middleware,
} from "@reduxjs/toolkit";
import counterReducer, {
  incrementAsync,
  incrementAsyncFinished,
  incrementAsyncStarted,
  incrementByAmount,
} from "@/lib/features/counter/counterSlice";

const listenerMiddleware = createListenerMiddleware();

const debugMiddleware: Middleware = (api) => (next) => (action) => {
  if (process.env.NODE_ENV !== "production") {
    const prevState = api.getState();
    console.debug("[redux] dispatch", action);
    const result = next(action);
    const nextState = api.getState();
    console.debug("[redux] state change", { prevState, nextState });
    return result;
  }

  return next(action);
};

// create configureStore
export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },

  // create middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(debugMiddleware, listenerMiddleware.middleware),
});

// export hooks for using 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;


// create for debugging 
const startAppListening = listenerMiddleware.startListening.withTypes<
  RootState,
  AppDispatch
>();

startAppListening({
  actionCreator: incrementAsync,
  effect: async (action, listenerApi) => {
    if (process.env.NODE_ENV !== "production") {
      console.debug("[listener] incrementAsync started", {
        amount: action.payload,
      });
    }

    listenerApi.cancelActiveListeners();
    listenerApi.dispatch(incrementAsyncStarted());

    try {
      await listenerApi.delay(1000);
      listenerApi.dispatch(incrementByAmount(action.payload));
    } finally {
      listenerApi.dispatch(incrementAsyncFinished());
      if (process.env.NODE_ENV !== "production") {
        console.debug("[listener] incrementAsync finished");
      }
    }
  },
});
