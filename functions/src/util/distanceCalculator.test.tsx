/**
 * Distance Calcuator tests
 * 
 * @group unit
 */
import { equal } from 'assert'
import { GeoPoint } from '@google-cloud/firestore'
import { distanceCalculator } from './distanceCalculator'

it('Sum distance - single point per location', () => {
    const firstPoints = [
        new GeoPoint(0,0),
    ]
    const secondPoints = [
        new GeoPoint(10,10),
    ]
    const total = distanceCalculator.sumDistance(firstPoints, secondPoints)
    
    equal(Math.round(total), 976)
})

it('Sum distance - ignore extra on second location', () => {
    const firstPoints = [
        new GeoPoint(0,0),
    ]
    const secondPoints = [
        new GeoPoint(10,10),
        new GeoPoint(50,50),
    ]
    const total = distanceCalculator.sumDistance(firstPoints, secondPoints)
    
    equal(Math.round(total), 976)
})

it('Sum distance - multiple points first location', () => {
    const firstPoints = [
        new GeoPoint(0,0),
        new GeoPoint(10,10),
    ]
    const secondPoints = [
        new GeoPoint(15,15),
        new GeoPoint(50,50),
    ]
    const total = distanceCalculator.sumDistance(firstPoints, secondPoints)
    
    equal(Math.round(total), 1459)
})
