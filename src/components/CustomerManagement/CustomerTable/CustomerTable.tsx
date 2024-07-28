import { User } from '../CustomerManagement.types';
import './CustomerTable.css';

const CustomerTable = ({ filteredUsers }: { filteredUsers: User[] }) => {
	return (
		<table className="table">
			<thead>
				<tr>
					<th>Name</th>
					<th>City</th>
					<th>Birthday</th>
				</tr>
			</thead>
			<tbody>
				{filteredUsers.length === 0 ? (
					<tr>
						<td colSpan={3} className="noData">
							No data found
						</td>
					</tr>
				) : (
					filteredUsers.map((user) => (
						<tr
							key={user.id}
							style={{
								backgroundColor: user.isOldest
									? 'lightblue'
									: 'transparent',
							}}
							className="tableRow"
						>
							<td>
								{user.firstName} {user.lastName}
							</td>
							<td>{user.city}</td>
							<td>
								{new Date(user.birthDate).toLocaleDateString()}
							</td>
						</tr>
					))
				)}
			</tbody>
		</table>
	);
};

export default CustomerTable;
