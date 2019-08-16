import { haversine, LatitudeLongitude } from './haversine';
import { equal } from 'assert';

it('Calculates distance for single degree correctly', () => {
    var a:LatitudeLongitude = {latitude: 0, longitude: 0}
    var b:LatitudeLongitude = {latitude: 0, longitude: 1}
    const distInMeters = haversine.distance(a, b)
    equal(distInMeters, 111319.49079327357)
    
    // Sanity check against the radius of the earth in kilometers
    let earthCircum = 40075
    equal(Math.round(distInMeters/1000), Math.round(earthCircum / 360))
})

it('Calculates distance between Belgium and Italy', () => {
    var a:LatitudeLongitude = {latitude: 51.2088596, longitude: 3.2243476}
    var b:LatitudeLongitude = {latitude: 41.9027125, longitude: 12.4961813}
    const distInMeters = haversine.distance(a, b)
    equal(Math.round(distInMeters), 1253613)
})

it('Calculates distance between Belgium and Italy in miles', () => {
    var a:LatitudeLongitude = {latitude: 51.2088596, longitude: 3.2243476}
    var b:LatitudeLongitude = {latitude: 41.9027125, longitude: 12.4961813}
    const distInMiles = haversine.distanceMiles(a, b)
    equal(Math.round(distInMiles), 779)
})
