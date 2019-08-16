// Adapted from: https://github.com/dcousens/haversine-distance

export interface LatitudeLongitude {
    latitude: number;
    longitude: number;
}

export class haversine {
    // (mean) radius of Earth (meters)
    static R = 6378137
    static PI = Math.PI
    static squared (x:number) { return x * x }
    static toRad (x:number) { return x * haversine.PI / 180.0 }
    static metersInAMile = 1609.344
    
    static distance (a:LatitudeLongitude, b:LatitudeLongitude) {
        
        const atan2 = Math.atan2
        const cos = Math.cos
        const sin = Math.sin
        const sqrt = Math.sqrt
    
        const aLat = a.latitude 
        const bLat = b.latitude 
        const aLng = a.longitude 
        const bLng = b.longitude 
    
        const dLat = haversine.toRad(bLat - aLat)
        const dLon = haversine.toRad(bLng - aLng)

        const f = haversine.squared(sin(dLat / 2.0)) + cos(haversine.toRad(aLat)) * cos(haversine.toRad(bLat)) * haversine.squared(sin(dLon / 2.0))
        const c = 2 * atan2(sqrt(f), sqrt(1 - f))

        return haversine.R * c
    }

    static distanceMiles(a:LatitudeLongitude, b:LatitudeLongitude) {
        return this.distance(a,b) / haversine.metersInAMile
    }
}