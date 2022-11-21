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
                    <h3>Track Name</h3>
                    <p>Track Artist | Track Album</p>
                </div>
                {this.renderAction()}
            </div>
        );
    }
}