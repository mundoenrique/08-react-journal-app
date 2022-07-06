import JournalLayout from '../layout/JournalLayout';
import { NothingSelectedView } from '../views';

export function JournalPage() {
	return (
		<>
			<JournalLayout>
				<NothingSelectedView />
			</JournalLayout>
		</>
	);
}
