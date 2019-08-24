import React from 'react'
import { storiesOf } from '@storybook/react'
import { TravelLocation } from '../../classes/TravelLocation'
import { TimeStamp } from '../../classes/TimeStamp'
import LocationDetails from './LocationDetails'
import * as firebase from "firebase/app";;


storiesOf('locations/Location Details', module)
    .add('In location', () => {
        let arrive = new TimeStamp(new Date("12/25/1990").getTime())
        let depart = new TimeStamp(new Date("12/25/2290").getTime())
        let loc = new TravelLocation("1", "San Francisco", new firebase.firestore.GeoPoint(45, -93), arrive, depart)
        return <LocationDetails selectedLocation={loc} onLocChange={() => { }} />
    })
    .add('Past location', () => {
        let arrive = new TimeStamp(new Date("12/25/1990").getTime())
        let depart = new TimeStamp(new Date("12/25/2000").getTime())
        let loc = new TravelLocation("1", "Sapathastan", new firebase.firestore.GeoPoint(45, -93), arrive, depart)
        return <LocationDetails selectedLocation={loc} onLocChange={() => { }} />
    })
    .add('Future location', () => {
        let arrive = new TimeStamp(new Date("12/25/2290").getTime())
        let depart = new TimeStamp(new Date("12/25/2291").getTime())
        let loc = new TravelLocation("1", "Sapathastan", new firebase.firestore.GeoPoint(45, -93), arrive, depart)
        return <LocationDetails selectedLocation={loc} onLocChange={() => { }} />
    })

//     .add('no locations', () => <MenuBar locs={[]} onLocChange={() => { }} />)
//     .add('locations', () => {
//         const locs: TravelLocation[] = []
//         locs.push(new TravelLocation("1", "Alpha", new firebase.firestore.GeoPoint(45, -93), new TimeStamp(0), new TimeStamp(10000)))
//         locs.push(new TravelLocation("2", "Beta", new firebase.firestore.GeoPoint(35, -106), new TimeStamp(10000), new TimeStamp(2562367819120)))
//         locs.push(new TravelLocation("3", "Charlie", new firebase.firestore.GeoPoint(38, -90), new TimeStamp(2562367819120), new TimeStamp(3562367819120)))
//         return <MenuBar locs={locs} onLocChange={(id: string) => { alert('switch to loc: ' + id) }} />
//     })
//     .add('2nd selected', () => {
//         const locs: TravelLocation[] = []
//         locs.push(new TravelLocation("1", "Alpha", new firebase.firestore.GeoPoint(45, -93), new TimeStamp(0), new TimeStamp(10000)))
//         locs.push(new TravelLocation("2", "Beta", new firebase.firestore.GeoPoint(35, -106), new TimeStamp(10000), new TimeStamp(2562367819120)))
//         locs.push(new TravelLocation("3", "Charlie", new firebase.firestore.GeoPoint(38, -90), new TimeStamp(2562367819120), new TimeStamp(3562367819120)))
//         return <MenuBar locs={locs} onLocChange={(id: string) => { alert('switch to loc: ' + id) }} selectedLocation={locs[1]} />
//     })
//     .add('16 locations', () => {
//         const locs: TravelLocation[] = []
//         locs.push(new TravelLocation("1", "Rockville", new firebase.firestore.GeoPoint(45, -93), new TimeStamp(0), new TimeStamp(0)))
//         locs.push(new TravelLocation("2", "San Cartli", new firebase.firestore.GeoPoint(45, -93), new TimeStamp(0), new TimeStamp(0)))
//         locs.push(new TravelLocation("3", "Loa", new firebase.firestore.GeoPoint(45, -93), new TimeStamp(0), new TimeStamp(0)))
//         locs.push(new TravelLocation("4", "Mt. Donsit", new firebase.firestore.GeoPoint(45, -93), new TimeStamp(0), new TimeStamp(0)))
//         locs.push(new TravelLocation("5", "Derrali", new firebase.firestore.GeoPoint(45, -93), new TimeStamp(0), new TimeStamp(0)))
//         locs.push(new TravelLocation("6", "Vash", new firebase.firestore.GeoPoint(45, -93), new TimeStamp(0), new TimeStamp(0)))
//         locs.push(new TravelLocation("7", "Fetualis", new firebase.firestore.GeoPoint(45, -93), new TimeStamp(0), new TimeStamp(0)))
//         locs.push(new TravelLocation("8", "Quenta", new firebase.firestore.GeoPoint(45, -93), new TimeStamp(0), new TimeStamp(0)))
//         locs.push(new TravelLocation("9", "Maliny", new firebase.firestore.GeoPoint(45, -93), new TimeStamp(0), new TimeStamp(0)))
//         locs.push(new TravelLocation("10", "Erogden", new firebase.firestore.GeoPoint(45, -93), new TimeStamp(0), new TimeStamp(0)))
//         locs.push(new TravelLocation("11", "Alipnow", new firebase.firestore.GeoPoint(45, -93), new TimeStamp(0), new TimeStamp(0)))
//         locs.push(new TravelLocation("12", "Crotlohon", new firebase.firestore.GeoPoint(45, -93), new TimeStamp(0), new TimeStamp(0)))
//         locs.push(new TravelLocation("13", "Alyk", new firebase.firestore.GeoPoint(45, -93), new TimeStamp(0), new TimeStamp(0)))
//         locs.push(new TravelLocation("14", "Ecyrb", new firebase.firestore.GeoPoint(45, -93), new TimeStamp(0), new TimeStamp(0)))
//         locs.push(new TravelLocation("15", "Yecats", new firebase.firestore.GeoPoint(45, -93), new TimeStamp(0), new TimeStamp(0)))
//         locs.push(new TravelLocation("16", "Nwahs", new firebase.firestore.GeoPoint(45, -93), new TimeStamp(0), new TimeStamp(0)))
//         return <MenuBar locs={locs} onLocChange={(id: string) => { }} selectedLocation={locs[1]} />
//     })
