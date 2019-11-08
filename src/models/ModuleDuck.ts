// Types
import { DuckAction } from "../types";

export default class ModuleDuck {
  appName: string;
  moduleName: string;

  constructor(module: string, app: string) {
    this.moduleName = module;
    this.appName = app;
  }

  public defineType = (type: string): string =>
    this.appName
      ? `${this.appName}/${this.moduleName}/${type}`
      : `${this.moduleName}/${type}`;

  public createAction = (type: string) => (payload?: any): DuckAction => {
    const action: DuckAction = {
      type,
      payload
    };

    return action;
  };

  public createReducer = (
    cases: {
      [key: string]: any;
    },
    initialState: object = {}
  ) => (state?: object, action?: DuckAction): object => {
    if (state === undefined) return initialState;

    if (action !== undefined) {
      for (const caseName in cases) {
        if (action.type === caseName) return cases[caseName](state, action);
      }
    }

    return state;
  };
}
