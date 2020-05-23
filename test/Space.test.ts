import { Space } from '../src/Space'
import { QuantizationUnit, UnitType } from '../src/QuantizationUnit'
import { OriginType } from '../src/OriginType'
import { Point } from '../src/Point'


describe("test the space", () => {
    test('QuantizationUnit value should be number', () => {
        const qu: QuantizationUnit = { unitType: UnitType.px, value: 1.0, digitResolution: 0}
        const space = new Space(OriginType.leftTop, qu)
        expect(typeof(space.quantizationUnit.value)).toBe('number')
    })
    test("Point 'quantize' should works properly with '1.' quantizingUnit", () => {
        const qu: QuantizationUnit = { unitType: UnitType.px, value: 1.0, digitResolution: 0}
        const space = new Space(OriginType.leftTop, qu)
        const p: Point = new Point(1.2, 70.8, space, false)
        const qp: Point = p.quantize(space)
        expect(qp.location.coordinate.x).toBe(1.)
        expect(qp.location.coordinate.y).toBe(71.)
    })
    test("Point 'quantize' should works properly with positive real number value quantizingUnit", () => {
        const qu: QuantizationUnit = { unitType: UnitType.px, value: 1.07, digitResolution: 2}
        const space = new Space(OriginType.leftTop, qu)
        const p: Point = new Point(71.25, 0., space, false)
        const qp: Point = p.quantize(space)
        expect(qp.location.coordinate.x).toBe(71.69)
        expect(qp.location.coordinate.y).toBe(0.)
    })
})

