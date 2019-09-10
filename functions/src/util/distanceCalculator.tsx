import { haversine } from '../util/haversine'
import { GeoPoint } from '@google-cloud/firestore'

export class distanceCalculator {    
    static sumDistance(c1:GeoPoint[], c2:GeoPoint[]):number{
        // Ensure we have at least one point each
        if (c1.length === 0 || c2.length === 0) {
            return 0
        }

        // Only take the first point of the second location
        c1.push(c2[0])

        let total = 0
        let previous: GeoPoint | null = null
        for (let current of c1) {
            if (previous !== null) {
                total += haversine.distanceMiles(previous, current)
            }
            previous = current
        }
        
        return total
    }
}