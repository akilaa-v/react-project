import React, { useEffect, useState } from "react";
import { fetchCollections } from "../services/api";
import MusicTable from "../components/MusicTable";
import Filter from "../components/Filter";
import "./Home.css";

const Home = () => {
	const [collections, setCollections] = useState([]);
	const [filteredType, setFilteredType] = useState("");
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		fetchCollections().then(setCollections);
	}, []);

	const filteredCollections = collections.filter(
		(collection) =>
			(filteredType.length === 0 || filteredType.includes(collection.type)) &&
			collection.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div className="home-container">
			<h1 className="overview">Overview</h1>
			<div className="contents">
				<Filter
					setFilteredType={setFilteredType}
					setSearchQuery={setSearchQuery}
				/>
				<MusicTable collections={filteredCollections} />
			</div>
		</div>
	);
};

export default Home;
