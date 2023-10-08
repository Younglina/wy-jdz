import {
	createSSRApp
} from "vue";
import { createPinia } from 'pinia'
import { createUnistorage } from 'pinia-plugin-unistorage'
import App from "./App.vue";
export function createApp() {
	const app = createSSRApp(App);
	const pinia = createPinia()
	pinia.use(createUnistorage());
	app.use(pinia)
	return {
		app,
		pinia
	};
}
