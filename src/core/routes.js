import App from '../App'
// import Camera from '../components/camera';
// import Main from '../components/main/main';
import MainDisplay from '../components/mainDisplay';
import MainCamera from '../components/mainCamera';




export const routes = {
	path: '/',
	component: App,
	childRoutes: [
		{
			indexRoute: {
				component: MainDisplay
			}
		},
		{
			path: '/camera',
			component: MainCamera
		}
	]
};