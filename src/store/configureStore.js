import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import * as Tiles from "./Tiles";

// npm install redux react-redux

export default function configureStore (initialState) {
    
    const middleware = [];
    const enhancers = [];
    const rootReducer = () => combineReducers({
        tiles: Tiles.reducer
      });

    return createStore(
        rootReducer(),
        initialState,
        compose(applyMiddleware(...middleware), ...enhancers)
      );
}