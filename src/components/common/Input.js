import React, { Component } from 'react'
import '../../styles/submit.css'

export default class Input extends Component {
    render() {
        const { name, type = 'text', value, onChange, label } = this.props;
        return (
            <div>
                <label htmlFor="input">{label}</label>
                <input className="input"
                    onChange={onChange}
                    name={name}
                    id={name}
                    type={type}
                    value={value} />
            </div>
        );
    }
}