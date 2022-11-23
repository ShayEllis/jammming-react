import React from 'react';
import "./Track.css";

export class Track extends React.Component {
    constructor(props) {
        super(props);
        this.renderAction = this.renderAction.bind(this);
    }
    renderAction() {
        let isRemoval = true;
        return <button className="Track-action">{isRemoval ? "-" : "+"}</button>;
    }
    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.trackName}</h3>
                    <p>{this.props.trackArtist} | {this.props.trackAlbum}</p>
                </div>
                {this.renderAction()}
            </div>
        );
    }
}