# redux-ducks-ts

Small set of helper functions to create Redux modules using [ducks-modular-redux](https://github.com/erikras/ducks-modular-redux/) proposal write in TypeScript.

## Installation
```bash
npm i -S redux-ducks-ts
```

## API
### Create duck
```javascript
import Duck from 'redux-ducks-ts';

const duck = new Duck('duck-name', 'app-name');
```
* The first argument is the duck name.
* The second argument is the application or module name.

### Define action types
```javascript
const ACTION_TYPE = myDuck.defineType('ACTION_TYPE');
```
* `defineType` receive just one argument.
* The argument is the name of the action.
* The result should be an string like `application-name/duck-name/ACTION_TYPE` or `duck-name/ACTION_TYPE` if the application or module name was not defined.

### Create action creators
```javascript
const actionType = myDuck.createAction(ACTION_TYPE);
```
* `createAction` receive just one argument.
* This argument should be the defined action type string.
* It should return a function who will receive the action payload and return a valid (FSA compilant) action object.
* The action creator will receive an optional argument with the action payload.

### Create reducer
```javascript
const initialState = {data: 'test'};

const reducer = myDuck.createReducer({
  [ACTION_TYPE]: (state, action) => ({
    ...state,
    list: state.list.push(action.payload.id),
    data: state.map.set(action.payload.id+'', action.payload),
  }),
}, initialState);
```
* `createReducer` receive two arguments, both required.
* The first argument is an object with the possible action cases.
* The second argument is the reducer initial state.
* The first argument should use the previously defined *action types* as keys.
* Each key in the first argument object should be a function who will receive the current state and the dispatched action as arguments and return the updated state.