import React from 'react'
import { ILocChangeCallback } from '../../classes/ILocChangeCallback';
import { ITravelLocation } from '../../classes/TravelLocation';
import { Link } from '@material-ui/core';
import { FlagIcon } from './LocationDetails'
import './LocationLink.css'

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
        return (
            <Link onClick={() => { this.props.onLocChange(loc.id) }} className="link">
                {this.props.direction === LinkDirection.Back ? "<< " : <FlagIcon code={loc.code} size="lg"/>}
                {loc.name} 
                {this.props.direction === LinkDirection.Forward ? " >>" : <FlagIcon code={loc.code} size="lg"/>}
            </Link>
        )
    }
}

export default LocationLink