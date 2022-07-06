import { Route, Routes, Navigate } from 'react-router-dom';
import { JouranlPages } from '../pages';

export function JournalRoutes() {
	return (
		<Routes>
			<Route path="/" element={<JouranlPages />} />
			<Route path="/*" element={<Navigate to="/" />} />
		</Routes>
	);
}
