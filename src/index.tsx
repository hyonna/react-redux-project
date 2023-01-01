import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { applyMiddleware, legacy_createStore as createStore } from "redux";
import rootReducer from "./reducers";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

// const loggerMiddleware = (store: any) => (next: any) => (action: any) => {
//   next(action);
// };

const middleware = applyMiddleware(thunk);

const store = createStore(rootReducer, middleware);

store.dispatch({
  type: "ADD_TODO",
  text: "Use Redux",
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const render = () =>
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App
          value={store.getState()}
          onIncrement={() => store.dispatch({ type: "INCREMENT" })}
          onDecrement={() => store.dispatch({ type: "DECREMENT" })}
        />
      </Provider>
    </React.StrictMode>
  );

render();
store.subscribe(render);
