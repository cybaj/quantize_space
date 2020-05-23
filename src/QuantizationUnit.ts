export enum UnitType {
    px = 0,
    em = 1
}

export interface QuantizationUnit {
    readonly unitType: UnitType;
    readonly value: number;
    readonly digitResolution: number;
}
