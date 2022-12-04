import React from 'react';
import "./SearchResults.css";
import { SearchBar } from "../SearchBar/SearchBar";
import { TrackList } from "../TrackList/TrackList";

export class SearchResults extends React.Component {
    render() {
        return (
            <div className="SearchResults">
                <SearchBar onSearch={this.props.onSearch} />
                <h2>Results</h2>
                <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} isRemoval={false} />
            </div>
        );
    }
};