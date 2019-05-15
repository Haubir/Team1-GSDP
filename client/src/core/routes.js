import App from '../App'
import Camera from '../components/camera';
import Main from '../components/main/main';




export const routes = {
	path: '/',
	component: App,
	childRoutes: [
		{
			indexRoute: {
				component: Main
			}
		},
		{
			path: '/camera',
			component: Camera
		}
	]
};