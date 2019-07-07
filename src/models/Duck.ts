import IAction from "../interfaces/Action";

export default class Duck {
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

  public createAction = (type: string) => (payload?: any) => {
    const action: IAction = {
      type,
      payload
    };

    return action;
  };

  public createReducer = (cases: object, initialState: object = {}) => {
    return function reducer(state?: object, action?: IAction): object {
      if (state === undefined) return initialState;

      if (action !== undefined) {
        for (const caseName in cases) {
          if (action.type === caseName) return cases[caseName](state, action);
        }
      }

      return state;
    };
  };
}
