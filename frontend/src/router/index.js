import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../components/Auth/Login.vue";
import Register from "../components/Auth/Register.vue";
import allMessages from "../components/Message/allMessages.vue";
import oneMessage from "../components/Message/oneMessage.vue";
import newMessage from "../components/Message/newMessage.vue";
import updateMessage from "../components/Message/updateMessage.vue";

import Profile from "../components/Profile/Profile.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/login",
		name: "Login",
		component: Login,
	},
	{
		path: "/register",
		name: "Register",
		component: Register,
	},
	{
		path: "/profile/:id",
		name: "Profile",
		component: Profile,
	},
	{
		path: "/messages",
		name: "allMessages",
		component: allMessages,
	},
	{
		path: "/messages/new",
		name: "newMessage",
		component: newMessage,
	},
	{
		path: "/messages/:id",
		name: "oneMessage",
		component: oneMessage,
	},
	{
		path: "/messages/update/:id",
		name: "updateMessage",
		component: updateMessage,
	},
];

const router = new VueRouter({
	mode: "history",
	routes,
});

export default router;
