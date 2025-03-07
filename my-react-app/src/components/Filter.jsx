import React, { useState } from "react";
import "./Filter.css";

const Filter = ({ setFilteredType, setSearchQuery }) => {
	const [selectedTypes, setSelectedTypes] = useState([]);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	// Handle search input change
	const handleSearchChange = (event) => {
		setSearchQuery(event.target.value);
	};

	// Handle checkbox selection
	const handleCheckboxChange = (event) => {
		const { value, checked } = event.target;

		let updatedTypes = checked
			? [...selectedTypes, value] // Add if checked
			: selectedTypes.filter((type) => type !== value); // Remove if unchecked

		setSelectedTypes(updatedTypes);
		setFilteredType(updatedTypes); // Pass updated filters to parent
	};

	return (
		<div className="filter-container">
			<div className="search-box">
				<input type="text" placeholder="Search" onChange={handleSearchChange} />
			</div>

			<div className="dropdown">
				<button
					className={`dropdown-button ${
						selectedTypes.length > 0 ? "active-filter" : ""
					}`}
					onClick={() => setIsDropdownOpen(!isDropdownOpen)}
				>
					<span>
						{" "}
						Type {selectedTypes.length > 0 && `(${selectedTypes.length})`}
					</span>
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M6 9l6 6 6-6"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>

				{isDropdownOpen && (
					<div className="dropdown-menu">
						<label>
							<input
								type="checkbox"
								value="Album"
								checked={selectedTypes.includes("Album")}
								onChange={handleCheckboxChange}
							/>
							Album
						</label>
						<label>
							<input
								type="checkbox"
								value="EP"
								checked={selectedTypes.includes("EP")}
								onChange={handleCheckboxChange}
							/>
							EP
						</label>
						<label>
							<input
								type="checkbox"
								value="Single"
								checked={selectedTypes.includes("Single")}
								onChange={handleCheckboxChange}
							/>
							Single
						</label>
					</div>
				)}
			</div>
		</div>
	);
};

export default Filter;
