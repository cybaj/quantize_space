import { Space } from './Space'
import { Coordinate } from './Coordinate'

export interface Location {
    readonly space: Space;
    readonly coordinate: Coordinate;
}
