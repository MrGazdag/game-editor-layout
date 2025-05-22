export declare const codeToLabel: Record<string, string>;
export default class Keybind {
    private readonly ctrl;
    private readonly shift;
    private readonly alt;
    private readonly meta;
    private readonly code;
    private readonly action;
    private readonly unsafe;
    constructor(code: string, action: string, ctrl?: boolean, shift?: boolean, alt?: boolean, meta?: boolean);
    isCtrl(): boolean;
    isShift(): boolean;
    isAlt(): boolean;
    isMeta(): boolean;
    getCode(): string;
    getAction(): string;
    matchesKey(other: Keybind): boolean;
    isUnsafe(): boolean;
    toString(): string;
    private static convertBindToText;
    private static convertKeyToText;
}
export declare let unsafeKeybinds: Keybind[];
