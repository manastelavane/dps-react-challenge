import './FilterPanel.css';
import searchLogo from '../../../assets/search.svg';

interface FilterPanelProps {
	inputVal: string;
	setInputVal: React.Dispatch<React.SetStateAction<string>>;
	cityList: string[];
	setCurrentCity: React.Dispatch<React.SetStateAction<string>>;
	highlightOldest: boolean;
	setHighlightOldest: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterPanel = ({
	inputVal,
	setInputVal,
	cityList,
	setCurrentCity,
	highlightOldest,
	setHighlightOldest,
}: FilterPanelProps) => {
	return (
		<div className="filter-panel">
			<div className="flexcol">
				<label htmlFor="searchInput" className="fieldTitle">
					Name
				</label>
				<div>
					<div>
						<img
							src={searchLogo}
							alt="search"
							width="18"
							height="18"
						/>
					</div>
					<input
						id="searchInput"
						type="text"
						placeholder="Search by name"
						value={inputVal}
						onChange={(e) => setInputVal(e.target.value)}
					/>
				</div>
			</div>
			<div className="flexcol">
				<label htmlFor="city" className="fieldTitle">
					City
				</label>
				<select
					id="city"
					onChange={(e) => setCurrentCity(e.target.value)}
				>
					<option value="">Select city</option>
					{cityList.map((city) => (
						<option key={city} value={city}>
							{city}
						</option>
					))}
				</select>
			</div>
			<div className="highlightOldestContainer">
				<label htmlFor="highlightOldest">
					Highlight oldest per city
				</label>
				<input
					id="highlightOldest"
					type="checkbox"
					checked={highlightOldest}
					onChange={(e) => setHighlightOldest(e.target.checked)}
				/>
			</div>
		</div>
	);
};

export default FilterPanel;
