import { CUSTOMER_DATA_API } from '../config';

export const fetchCustomers = async () => {
	try {
		const response = await fetch(CUSTOMER_DATA_API);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching users:', error);
		throw error;
	}
};
