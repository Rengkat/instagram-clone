type User = {
  id?: string;
  password: string;
  userName: string;
  fullName: string;
  email: string;
  uid: string;
  phone: string;
  gender: string;
  website: string;
  bio: string;
  profileImage: string;
};
interface Post {
  imgeUrl: string;
  caption: string;
  userUID: string;
  createdAt: string;
  id: string;
  isCommentOpen: boolean;
  isLiked: boolean;
}
type State = {
  users: User[];
  allPosts: [];
};
type Users = User[];
type Action =
  | { type: "GET_USERS"; payload: Users }
  | { type: "SIGN_UP_USER"; payload: any }
  | { type: "FETCH_ALL_POSTS"; payload: any }
  | { type: "OPEN_COMMENTS"; payload: any }
  | { type: "LIKE_POST"; payload: any };
export const firebaseReducer = (state: State, action: Action): any => {
  switch (action.type) {
    case "GET_USERS":
      return { ...state, users: action.payload };
    case "SIGN_UP_USER":
      return { ...state, user: action.payload };
    case "FETCH_ALL_POSTS":
      return { ...state, allPosts: action.payload };
    case "OPEN_COMMENTS":
      return {
        ...state,
        allPosts: state?.allPosts?.map((x: any) =>
          x.id === action.payload
            ? { ...x, isCommentOpen: !x.isCommentOpen }
            : x
        ),
      };
    case "LIKE_POST":
      return {
        ...state,
        allPosts: state?.allPosts.map((x: any) =>
          x.id === action.payload ? { ...x, isLiked: !x.isLiked } : x
        ),
      };
    default:
      return state;
  }
};
