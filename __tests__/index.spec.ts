import Duck from "../src";
import IAction from "../src/interfaces/Action";

describe("Duck creation: ", () => {
  let testDuck: Duck;

  beforeEach(() => {
    testDuck = new Duck("testModuleName", "testAppName");
  });

  it("should instantiate.", () => {
    expect(testDuck).toBeDefined();
    expect(testDuck.moduleName).toBe("testModuleName");
    expect(testDuck.appName).toBe("testAppName");
  });
});

describe("Definition of types: ", () => {
  let duck: Duck;
  let type: string;

  beforeEach(() => {
    duck = new Duck("duck", "redux-ducks-ts");
    type = duck.defineType("TEST_TYPE");
  });

  it("should define a valid type.", () => {
    expect(type).toEqual("redux-ducks-ts/duck/TEST_TYPE");
  });
});

describe("Creation of action creators: ", () => {
  let duck: Duck;
  let type: string;
  let action1: IAction;
  let action2: IAction;
  const testPayload: any = {
    id: 1,
    value: "test"
  };

  beforeEach(() => {
    duck = new Duck("duck", "redux-ducks-ts");
    type = duck.defineType("TEST_TYPE");
    action1 = duck.createAction(type);
    action2 = duck.createAction(type, testPayload);
  });

  it("should create a action creator without payload.", () => {
    expect(action1).toEqual({ type });
  });

  it("should create a action creator with payload.", () => {
    expect(action2).toEqual({ type, payload: testPayload });
  });
});

describe("Creation of a reducer: ", () => {
  let duck: Duck;
  let type: string;
  let action: IAction;
  let state: object;
  const testPayload: any = {
    id: 1,
    value: "test"
  };

  duck = new Duck("duck", "redux-ducks-ts");
  type = duck.defineType("TEST_TYPE");
  action = duck.createAction(type, testPayload);

  const reducer = duck.createReducer(
    {
      [type]: (state, action) => ({
        ...state,
        [action.payload.id]: action.payload
      })
    },
    {}
  );

  state = reducer({}, action);

  it("should be return the default state.", () => {
    expect(reducer()).toEqual({});
  });

  it("should work with the cases.", () => {
    expect(state).toEqual({
      [testPayload.id]: testPayload
    });
  });
});
