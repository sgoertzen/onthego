import React from 'react'
import { ILocChangeCallback } from '../../classes/ILocChangeCallback';
import { ITravelLocation } from '../../classes/TravelLocation';
import { Link } from '@material-ui/core';

interface locationLinkProps {
    onLocChange: ILocChangeCallback
    loc?: ITravelLocation
    direction: LinkDirection
}

export enum LinkDirection {
    Forward,
    Back,
    None
}

class LocationLink extends React.Component {
    public props: locationLinkProps

    constructor(props: locationLinkProps) {
        super(props)
        this.props = props
    }

    render() {
        if (!this.props.loc) {
            return (<span />)
        }

        const loc = this.props.loc
        let text = loc.name
        switch (this.props.direction) {
            case LinkDirection.Back:
                text = "<< " + text
                break
            case LinkDirection.Forward:
                text = text + " >>"
                break
        }
        return (
            <Link onClick={() => { this.props.onLocChange(loc.id) }}>{text}</Link>
        )
    }
}

export default LocationLink