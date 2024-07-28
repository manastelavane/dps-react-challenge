import React from 'react';

import FilterPanel from './FilterPanel/FilterPanel';
import CustomerTable from './CustomerTable/CustomerTable';
import { useTableData } from '../../hooks/useTableData';
import './CustomerManagement.css';

const CustomerManagement: React.FC = () => {
	const {
		filteredUsers,
		inputVal,
		setInputVal,
		cityList,
		setCurrentCity,
		highlightOldest,
		setHighlightOldest,
		loading,
	} = useTableData();

	if (loading) {
		return <div className="loader"></div>;
	}

	return (
		<div>
			<FilterPanel
				inputVal={inputVal}
				setInputVal={setInputVal}
				cityList={cityList}
				setCurrentCity={setCurrentCity}
				highlightOldest={highlightOldest}
				setHighlightOldest={setHighlightOldest}
			/>
			<CustomerTable filteredUsers={filteredUsers} />
		</div>
	);
};

export default CustomerManagement;
