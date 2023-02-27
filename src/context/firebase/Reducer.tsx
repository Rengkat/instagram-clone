type State = {
  user: string;
};

type Action = { type: "GET_USER" } | { type: "decrement" } | { type: "reset" };
export const firebaseReducer = (state: State, action: Action): any => {
  switch (action.type) {
    case "GET_USER":
      return { count: state.user };
    case "decrement":
      return { count: state.user };
    case "reset":
      return { count: 0 };
    default:
      throw new Error();
  }
};
