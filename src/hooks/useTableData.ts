import { useEffect, useState } from 'react';
import { User } from '../components/CustomerManagement/CustomerManagement.types';
import { fetchCustomers } from '../api/CustomerApi';

export function useTableData() {
	const [users, setUsers] = useState<User[]>([]);
	const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
	const [cityList, setCityList] = useState<string[]>([]);

	const [inputVal, setInputVal] = useState<string>('');
	const [debouncedInputVal, setDebouncedInputVal] = useState<string>('');
	const [currentCity, setCurrentCity] = useState<string>('');
	const [highlightOldest, setHighlightOldest] = useState<boolean>(false);

	const [loading, setLoading] = useState<boolean>(true);

	const loadCutomers = async () => {
		try {
			setLoading(true);
			const customerData = await fetchCustomers();

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const filterResponse = customerData.users.map((user: any) => {
				return {
					id: user.id,
					firstName: user.firstName,
					lastName: user.lastName,
					city: user.address.city,
					birthDate: user.birthDate,
				};
			});

			const citiesSet = new Set<string>();
			filterResponse.forEach((user: User) => citiesSet.add(user.city));
			const cities = Array.from(citiesSet);
			setCityList(cities);

			setUsers(filterResponse);
			setFilteredUsers(filterResponse);
		} catch (error) {
			console.error('Error fetching users:', error);
			throw error;
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadCutomers();
	}, []);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedInputVal(inputVal);
		}, 1000);

		return () => {
			clearTimeout(handler);
		};
	}, [inputVal]);

	useEffect(() => {
		let filtered = users;
		if (debouncedInputVal) {
			filtered = filtered.filter(
				(user) =>
					user.firstName
						.toLowerCase()
						.includes(debouncedInputVal.toLowerCase()) ||
					user.lastName
						.toLowerCase()
						.includes(debouncedInputVal.toLowerCase())
			);
		}
		if (currentCity) {
			filtered = filtered.filter((user) => user.city === currentCity);
		}

		if (highlightOldest) {
			const oldestPerCity = new Map<string, User>();

			filtered.forEach((user) => {
				const currentOldest = oldestPerCity.get(user.city);
				if (
					!currentOldest ||
					new Date(user.birthDate) < new Date(currentOldest.birthDate)
				) {
					oldestPerCity.set(user.city, user);
				}
			});

			filtered = filtered.map((user) => ({
				...user,
				isOldest: oldestPerCity.get(user.city)?.id === user.id,
			}));
		}

		setFilteredUsers(filtered);
	}, [debouncedInputVal, currentCity, highlightOldest, users]);

	return {
		filteredUsers,
		inputVal,
		setInputVal,
		cityList,
		setCurrentCity,
		highlightOldest,
		setHighlightOldest,
		loading,
	};
}
