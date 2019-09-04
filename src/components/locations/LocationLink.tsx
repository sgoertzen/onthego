import React from 'react'
import { ILocChangeCallback } from '../../classes/ILocChangeCallback';
import { ITravelLocation } from '../../classes/TravelLocation';
import { Link } from '@material-ui/core';
import { FlagIcon } from './LocationDetails'
import './LocationLink.css'

interface ILocationLinkProps {
    onLocChange: ILocChangeCallback
    loc?: ITravelLocation
    direction: LinkDirection
}

export enum LinkDirection {
    Forward,
    Back,
    None
}

class LocationLink extends React.Component<ILocationLinkProps> {
    public props: ILocationLinkProps

    constructor(props: ILocationLinkProps) {
        super(props)
        this.props = props
    }

    render() {
        if (!this.props.loc) {
            return (<span />)
        }

        const loc = this.props.loc
        const code = loc.countrycode ? loc.countrycode.toLowerCase() : ""
        const flag = (
            <FlagIcon size="lg" code={code} />
        )
        return (
            <Link onClick={() => { this.props.onLocChange(loc.id) }} className="link">
                {this.props.direction === LinkDirection.Back ? "<< " : flag}
                {loc.name}
                {this.props.direction === LinkDirection.Forward ? " >>" : flag}
            </Link>
        )
    }
}

export default LocationLink