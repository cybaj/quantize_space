import { Coordinate } from './Coordinate'
import { Location } from './Location'
import { Quantization } from './Quantization'
import { Space } from './Space'

export class Point {
    readonly location: Location    
    readonly is_QPoint: boolean // is Quantized Point?
    readonly has_QPoint: boolean // has Quantized Point?
    quantizations: Array<Quantization>

    constructor(x: number, y: number, space: Space, is_QPoint = false) {
        const coordinate: Coordinate = { x: x, y: y }
        const location: Location = { space: space, coordinate: coordinate }

        this.location = location
        this.is_QPoint = is_QPoint
        this.has_QPoint = false
        this.quantizations = []
    }

    quantize(space: Space): Point {

        /**
         * get quantized coordinate
         */
        const fromX = this.location.coordinate.x
        const fromY = this.location.coordinate.y

        const quantizeUnit = space.quantizationUnit
        const unitType = quantizeUnit.unitType
        const unitValue = quantizeUnit.value
        const unitResolution = quantizeUnit.digitResolution

        /**
         * no matter what space's OriginType is.
         */
        const [qx, qy]: Array<number> = this._modulo_quantizer(unitValue, unitResolution, fromX, fromY)

        const qpoint: Point = new Point(qx, qy, space, true)
        const newQuantization: Quantization = {
            space: space,
            point: qpoint
        }

        this.quantizations.push(newQuantization)

        return qpoint
    }

    private _modulo_quantizer(unitValue: number, unitResolution: number, x: number, y: number): Array<number> {
        let qx = 0.
        let qy = 0.
        if (unitValue == 1. || unitValue == 1) {
            qx = Math.round(x)
            qy = Math.round(y)
        } else {
            const _xRemainder = x % unitValue
            const _yRemainder = y % unitValue
            let _xComplete = x - _xRemainder
            let _yComplete = y - _yRemainder

            const _xFrontDiff =  _xRemainder
            const _xBackDiff =  unitValue - _xRemainder
            const _yFrontDiff =  _yRemainder
            const _yBackDiff =  unitValue - _yRemainder
            if ( _xBackDiff < _xFrontDiff ) {
                _xComplete = x + _xBackDiff
            }
            if ( _yBackDiff < _yFrontDiff ) {
                _yComplete = y + _yBackDiff
            }

            qx = Number.parseFloat(_xComplete.toFixed(unitResolution))
            qy = Number.parseFloat(_yComplete.toFixed(unitResolution))
        }
        return [qx, qy]
    }

}
