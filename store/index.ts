import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { reducers } from "./reducers";

const logger = createLogger({
  collapsed: true,
});

export default configureStore({
  reducer: reducers,
  middleware: [thunkMiddleware, logger],
});
