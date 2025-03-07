import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchCollectionById } from "../services/api";
import "./AlbumDetails.css";

const AlbumDetails = () => {
	const { id } = useParams();
	const [album, setAlbum] = useState(null);

	useEffect(() => {
		fetchCollectionById(id).then(setAlbum);
	}, [id]);

	if (!album) return <p>Loading...</p>;

	return (
		<div className="album-details-container">
			<div className="breadcrumb">
				<Link to={"/"} className="home-page">Overview</Link>
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M9 6l6 6-6 6"
						stroke="#677A90"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
				<div className="breadcrumb-name">{album.name}</div>
			</div>
			<h1 className="album-name">{album.name}</h1>
			<div className="album-details">
				<div className="album-meta">
					<div className="grid-header">Artist</div>
					<div className="grid-header">Type</div>
					<div className="grid-header">Song Count</div>
					<div className="grid-header">Total Size</div>
					<div className="grid-header">Total Duration</div>
					<div className="grid-header">Released On</div>

					<div className="grid-cell">{album.artist}</div>
					<div className="grid-cell">{album.type}</div>
					<div className="grid-cell">{album.songCount}</div>
					<div className="grid-cell">
						{Math.round((album?.sizeInBytes || 0) / 1048576)} MB
					</div>
					<div className="grid-cell">
						{Math.floor((album?.durationInSeconds || 0) / 60)} min{" "}
						{album?.durationInSeconds % 60} sec
					</div>
					<div className="grid-cell">
						{new Date(album.releasedOn).toLocaleDateString("en-GB", {
							day: "2-digit",
							month: "short",
							year: "numeric",
						})}
					</div>
				</div>

				<div className="album-table">
					{/* Table Header */}
					<div className="grid-header">Song</div>
					<div className="grid-header">Performers</div>
					<div className="grid-header">Duration</div>
					<div className="grid-header">Size</div>

					{/* Table Rows */}
					{album.songs.map((song, index) => (
						<React.Fragment key={index}>
							<div className="album-cell">{song.title}</div>
							<div className="album-cell">{song.performers.join(", ")}</div>
							<div className="album-cell">
								{new Date(song.durationInSeconds * 1000)
									.toISOString()
									.substr(14, 5)}
							</div>
							<div className="album-cell">
								{Math.round(song.sizeInBytes / 1048576)} MB
							</div>
						</React.Fragment>
					))}
				</div>
			</div>
		</div>
	);
};

export default AlbumDetails;
