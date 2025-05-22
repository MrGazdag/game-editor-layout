declare interface Navigator {
    /**
     * The experimental Keyboard API, if available.
     * See: https://developer.mozilla.org/docs/Web/API/Keyboard
     */
    keyboard?: Keyboard;
}

declare interface Keyboard {
    /** Get a map of physical key codes to their current labels. */
    getLayoutMap(): Promise<KeyboardLayoutMap>;
}

/**
 * A read-only map of logical key codes to layout symbols.
 */
declare interface KeyboardLayoutMap extends ReadonlyMap<string, string> {}