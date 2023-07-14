import { createGlobalState } from "react-hooks-global-state";
const userState = {
  isLoggedIn: false,
  data: {
    certificate_url: "",
    created_at: "",
    id: null,
    user_id: null,
    vaccination_date: "",
    vaccine_id: null,
    verified: false,
  },
  vaccineName: "",
  user: {
    id: null,
    name: "",
    email: null,
    address: "",
    phone: "",
    role_id: "",
    verified: false,
  },
};

const { useGlobalState } = createGlobalState(userState);
export { useGlobalState };
