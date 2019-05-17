import App from '../App'
// import Camera from '../components/camera';
// import Main from '../components/main/main';
import MainDisplay from '../components/mainDisplay';
import MainCamera from '../components/mainCamera';
import Home from '../components/home';




export const routes = {
	path: '/',
	component: App,
	childRoutes: [
		{
			indexRoute: {
				component: Home
			}
		},
		{
			path: '/camera',
			component: MainCamera
		},
		{
			path: '/client',
			component: MainDisplay
		}
	]
};