export interface TsmChips {
    readonly dimension: number;
    readonly min: number;
    readonly max: number;
}

export interface TsmConfig {
    readonly disabled_msg: string;
    readonly enable: TsmChips[];
}
