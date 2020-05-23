import { OriginType } from './OriginType'
import { QuantizationUnit } from './QuantizationUnit'
import { Point } from './Point'

export class Space {
    readonly _originType: OriginType;
    readonly _quantizationUnit: QuantizationUnit;

    constructor(originType: OriginType, quantizationUnit: QuantizationUnit) {
        this._originType = originType;
        this._quantizationUnit = quantizationUnit;
    }

    generateQuantizedPoint(point: Point): Point {
        return point.quantize(this)
    }

    getQuantizationUnit(): QuantizationUnit {
        return this._quantizationUnit
    }

    get quantizationUnit(): QuantizationUnit {
        return this._quantizationUnit
    }

    get originType(): OriginType {
        return this._originType
    }
}
