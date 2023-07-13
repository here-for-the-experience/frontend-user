import { createGlobalState } from "react-hooks-global-state";
const userState = {
  isLoggedIn: false,
  user: {
    accessToken: "",
    refereshToken: "",
    id: null,
    name: "",
    profile_img: null,
    email: null,
    phone: null,
    groups: [],
    verified: false,
  },
};

const { useGlobalState } = createGlobalState(userState);
export { useGlobalState };
