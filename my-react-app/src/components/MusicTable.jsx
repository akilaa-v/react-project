import React from "react";
import { Link } from "react-router-dom";
import "./MusicTable.css";
import eye from "../assets/eye.png"

const MusicTable = ({ collections }) => {

  const formatDuration = (seconds) => {
    const hrs = Math.floor(seconds / 3600).toString().padStart(2, "0");
    const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  const formatReleaseDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).replace(',', '');
  };

  return (
    <div className="grid-table">
      {/* Table Header */}
      <div className="grid-header">Collection Name</div>
      <div className="grid-header">Type</div>
      <div className="grid-header">Song Count</div>
      <div className="grid-header">Duration</div>
      <div className="grid-header">Size</div>
      <div className="grid-header">Released On</div>
      <div className="grid-header"></div>

      {/* Table Rows */}
      {collections.map((item) => (
        <React.Fragment key={item.id}>
          <div className="grid-cell name"><span className="collection-name">{item.name}</span><span className="artist">{item.artist}</span></div>
          <div className="grid-cell">{item.type}</div>
          <div className="grid-cell">{item.songCount}</div>
          <div className="grid-cell">{formatDuration(item.durationInSeconds)}</div>
          <div className="grid-cell">{(item.sizeInBytes / 1048576)} MB</div>
          <div className="grid-cell">{formatReleaseDate(item.releasedOn)}</div>
          <div className="grid-cell">
            <Link to={`/album/${item.id}`} className="view-details">
            <img className="eye-icon" src={eye} alt="Eye icon"/>
              <span>View Details</span>
            </Link>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default MusicTable;
