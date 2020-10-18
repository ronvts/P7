import axios from "axios";

export default () => {
	let currentUser = JSON.parse(window.localStorage.currentUser);
	return axios.create({
		baseURL: "http://localhost:3000/api",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + currentUser.token,
		},
	});
};
