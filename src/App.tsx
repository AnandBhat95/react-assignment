import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.scss';
import SearchBar from './components/SearchBar';
import AppFooter from './components/AppFooter';

export default function App() {
	const location = useLocation();
	const hideSearchBarRoutes = ['/categories', '/areas'];
	const hideSearchBar = hideSearchBarRoutes.some(route => location.pathname.includes(route))
	return (
		<>
		<Navbar />
		<div style={{ paddingTop: hideSearchBar ? 60 : 0 , paddingBottom: hideSearchBar ? 60 : 0 }}>
		{hideSearchBar && <SearchBar />}
		<Outlet />
		</div>
		<AppFooter />
		</>
	  );
}
