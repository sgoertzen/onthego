/// <reference types="storybook__react" />
import React from 'react';
import { storiesOf } from '@storybook/react';
import MenuBar from './MenuBar';
import { TravelLocation } from '../../classes/TravelLocation';
import { GeoPoint } from '../../classes/GeoPoint';
import { TimeStamp } from '../../classes/TimeStamp';

storiesOf('locations/Location Buttons', module)
    .add('no locations', () => <MenuBar locs={[]} onLocChange={() => { }} />)
    .add('locations', () => {
        const locs: TravelLocation[] = []
        locs.push(new TravelLocation("1", "Alpha", new GeoPoint(45, -93), new TimeStamp(0), new TimeStamp(10000)))
        locs.push(new TravelLocation("2", "Beta", new GeoPoint(35, -106), new TimeStamp(10000), new TimeStamp(2562367819120)))
        locs.push(new TravelLocation("3", "Charlie", new GeoPoint(38, -90), new TimeStamp(2562367819120), new TimeStamp(3562367819120)))
        return <MenuBar locs={locs} onLocChange={(id: string) => { alert('switch to loc: ' + id) }} />
    })
    .add('2nd selected', () => {
        const locs: TravelLocation[] = []
        locs.push(new TravelLocation("1", "Alpha", new GeoPoint(45, -93), new TimeStamp(0), new TimeStamp(10000)))
        locs.push(new TravelLocation("2", "Beta", new GeoPoint(35, -106), new TimeStamp(10000), new TimeStamp(2562367819120)))
        locs.push(new TravelLocation("3", "Charlie", new GeoPoint(38, -90), new TimeStamp(2562367819120), new TimeStamp(3562367819120)))
        return <MenuBar locs={locs} onLocChange={(id: string) => { alert('switch to loc: ' + id) }} selectedLocation={locs[1]} />
    })
    .add('16 locations', () => {
        const locs: TravelLocation[] = []
        locs.push(new TravelLocation("1", "Rockville", new GeoPoint(45, -93), new TimeStamp(0), new TimeStamp(0)))
        locs.push(new TravelLocation("2", "San Cartli", new GeoPoint(45, -93), new TimeStamp(0), new TimeStamp(0)))
        locs.push(new TravelLocation("3", "Loa", new GeoPoint(45, -93), new TimeStamp(0), new TimeStamp(0)))
        locs.push(new TravelLocation("4", "Mt. Donsit", new GeoPoint(45, -93), new TimeStamp(0), new TimeStamp(0)))
        locs.push(new TravelLocation("5", "Derrali", new GeoPoint(45, -93), new TimeStamp(0), new TimeStamp(0)))
        locs.push(new TravelLocation("6", "Vash", new GeoPoint(45, -93), new TimeStamp(0), new TimeStamp(0)))
        locs.push(new TravelLocation("7", "Fetualis", new GeoPoint(45, -93), new TimeStamp(0), new TimeStamp(0)))
        locs.push(new TravelLocation("8", "Quenta", new GeoPoint(45, -93), new TimeStamp(0), new TimeStamp(0)))
        locs.push(new TravelLocation("9", "Maliny", new GeoPoint(45, -93), new TimeStamp(0), new TimeStamp(0)))
        locs.push(new TravelLocation("10", "Erogden", new GeoPoint(45, -93), new TimeStamp(0), new TimeStamp(0)))
        locs.push(new TravelLocation("11", "Alipnow", new GeoPoint(45, -93), new TimeStamp(0), new TimeStamp(0)))
        locs.push(new TravelLocation("12", "Crotlohon", new GeoPoint(45, -93), new TimeStamp(0), new TimeStamp(0)))
        locs.push(new TravelLocation("13", "Alyk", new GeoPoint(45, -93), new TimeStamp(0), new TimeStamp(0)))
        locs.push(new TravelLocation("14", "Ecyrb", new GeoPoint(45, -93), new TimeStamp(0), new TimeStamp(0)))
        locs.push(new TravelLocation("15", "Yecats", new GeoPoint(45, -93), new TimeStamp(0), new TimeStamp(0)))
        locs.push(new TravelLocation("16", "Nwahs", new GeoPoint(45, -93), new TimeStamp(0), new TimeStamp(0)))
        return <MenuBar locs={locs} onLocChange={(id: string) => { }} selectedLocation={locs[1]} />
    })