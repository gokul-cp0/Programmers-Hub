import API from "../api/api";

const UserService={
    signup :(data) => API.post("/users/signup", data),
    login : (data) => API.post("/users/login", data),
    getProfile : (id) => API.get(`/users/profile/${id}`)
}
export default UserService;
