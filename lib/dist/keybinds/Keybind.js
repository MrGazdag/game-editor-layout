"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unsafeKeybinds = exports.codeToLabel = void 0;
let keyboard = null;
if (navigator.keyboard) {
    // every 60s refresh the keyboard layout
    // (the event in the spec does not fire)
    setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
        keyboard = yield navigator.keyboard.getLayoutMap();
    }), 60000);
}
exports.codeToLabel = {
    // Alphanumeric – writing system keys
    Backquote: "`",
    Backslash: "\\",
    BracketLeft: "[",
    BracketRight: "]",
    Comma: ",",
    Digit0: "0",
    Digit1: "1",
    Digit2: "2",
    Digit3: "3",
    Digit4: "4",
    Digit5: "5",
    Digit6: "6",
    Digit7: "7",
    Digit8: "8",
    Digit9: "9",
    Equal: "=",
    IntlBackslash: "\\",
    IntlRo: "Ro",
    IntlYen: "¥",
    KeyA: "A",
    KeyB: "B",
    KeyC: "C",
    KeyD: "D",
    KeyE: "E",
    KeyF: "F",
    KeyG: "G",
    KeyH: "H",
    KeyI: "I",
    KeyJ: "J",
    KeyK: "K",
    KeyL: "L",
    KeyM: "M",
    KeyN: "N",
    KeyO: "O",
    KeyP: "P",
    KeyQ: "Q",
    KeyR: "R",
    KeyS: "S",
    KeyT: "T",
    KeyU: "U",
    KeyV: "V",
    KeyW: "W",
    KeyX: "X",
    KeyY: "Y",
    KeyZ: "Z",
    Minus: "-",
    Period: ".",
    Quote: "'",
    Semicolon: ";",
    Slash: "/",
    // Alphanumeric – functional keys
    AltLeft: "Alt Left",
    AltRight: "Alt Right",
    Backspace: "Backspace",
    CapsLock: "Caps Lock",
    ContextMenu: "Context Menu",
    ControlLeft: "Control Left",
    ControlRight: "Control Right",
    Enter: "Enter",
    MetaLeft: "Meta Left",
    MetaRight: "Meta Right",
    ShiftLeft: "Shift Left",
    ShiftRight: "Shift Right",
    Space: "Space",
    Tab: "Tab",
    // Japanese/Korean extra functional
    Convert: "Convert",
    KanaMode: "Kana Mode",
    Lang1: "Lang 1",
    Lang2: "Lang 2",
    Lang3: "Lang 3",
    Lang4: "Lang 4",
    Lang5: "Lang 5",
    NonConvert: "Non-Convert",
    // Control pad
    Delete: "Delete",
    End: "End",
    Help: "Help",
    Home: "Home",
    Insert: "Insert",
    PageDown: "Page Down",
    PageUp: "Page Up",
    // Arrow pad
    ArrowDown: "Arrow Down",
    ArrowLeft: "Arrow Left",
    ArrowRight: "Arrow Right",
    ArrowUp: "Arrow Up",
    // Numpad
    NumLock: "Num Lock",
    Numpad0: "Numpad 0",
    Numpad1: "Numpad 1",
    Numpad2: "Numpad 2",
    Numpad3: "Numpad 3",
    Numpad4: "Numpad 4",
    Numpad5: "Numpad 5",
    Numpad6: "Numpad 6",
    Numpad7: "Numpad 7",
    Numpad8: "Numpad 8",
    Numpad9: "Numpad 9",
    NumpadAdd: "Numpad +",
    NumpadBackspace: "Numpad Backspace",
    NumpadClear: "Numpad Clear",
    NumpadClearEntry: "Numpad Clear Entry",
    NumpadComma: "Numpad ,",
    NumpadDecimal: "Numpad .",
    NumpadDivide: "Numpad /",
    NumpadEnter: "Numpad Enter",
    NumpadEqual: "Numpad =",
    NumpadHash: "Numpad #",
    NumpadMemoryAdd: "Numpad M+",
    NumpadMemoryClear: "Numpad MC",
    NumpadMemoryRecall: "Numpad MR",
    NumpadMemoryStore: "Numpad MS",
    NumpadMemorySubtract: "Numpad M-",
    NumpadMultiply: "Numpad *",
    NumpadParenLeft: "Numpad (",
    NumpadParenRight: "Numpad )",
    NumpadStar: "Numpad *",
    NumpadSubtract: "Numpad -",
    // Function section
    Escape: "Escape",
    F1: "F1",
    F2: "F2",
    F3: "F3",
    F4: "F4",
    F5: "F5",
    F6: "F6",
    F7: "F7",
    F8: "F8",
    F9: "F9",
    F10: "F10",
    F11: "F11",
    F12: "F12",
    Fn: "Fn",
    FnLock: "Fn Lock",
    PrintScreen: "Print Screen",
    ScrollLock: "Scroll Lock",
    Pause: "Pause",
    // Media keys
    BrowserBack: "Browser Back",
    BrowserFavorites: "Browser Favorites",
    BrowserForward: "Browser Forward",
    BrowserHome: "Browser Home",
    BrowserRefresh: "Browser Refresh",
    BrowserSearch: "Browser Search",
    BrowserStop: "Browser Stop",
    Eject: "Eject",
    LaunchApp1: "Launch App 1",
    LaunchApp2: "Launch App 2",
    LaunchMail: "Launch Mail",
    MediaPlayPause: "Media Play/Pause",
    MediaSelect: "Media Select",
    MediaStop: "Media Stop",
    MediaTrackNext: "Media Track Next",
    MediaTrackPrevious: "Media Track Previous",
    Power: "Power",
    Sleep: "Sleep",
    AudioVolumeDown: "Volume Down",
    AudioVolumeMute: "Volume Mute",
    AudioVolumeUp: "Volume Up",
    WakeUp: "Wake Up",
    // Legacy, international & special
    Hyper: "Hyper",
    Super: "Super",
    Turbo: "Turbo",
    Abort: "Abort",
    Resume: "Resume",
    Suspend: "Suspend",
    Again: "Again",
    Copy: "Copy",
    Cut: "Cut",
    Find: "Find",
    Open: "Open",
    Paste: "Paste",
    Props: "Props",
    Select: "Select",
    Undo: "Undo",
    Hiragana: "Hiragana",
    Katakana: "Katakana",
    // Fallback
    Unidentified: "Unidentified",
};
class Keybind {
    constructor(code, action, ctrl = false, shift = false, alt = false, meta = false) {
        this.ctrl = ctrl;
        this.shift = shift;
        this.alt = alt;
        this.meta = meta;
        this.code = code;
        this.action = action;
        let unsafe = false;
        if (exports.unsafeKeybinds)
            for (let unsafeKeybind of exports.unsafeKeybinds) {
                if (this.matchesKey(unsafeKeybind)) {
                    unsafe = true;
                    break;
                }
            }
        this.unsafe = unsafe;
    }
    isCtrl() {
        return this.ctrl;
    }
    isShift() {
        return this.shift;
    }
    isAlt() {
        return this.alt;
    }
    isMeta() {
        return this.meta;
    }
    getCode() {
        return this.code;
    }
    getAction() {
        return this.action;
    }
    matchesKey(other) {
        return this.ctrl == other.ctrl
            && this.shift == other.shift
            && this.alt == other.alt
            && this.meta == other.meta
            && this.code == other.code;
    }
    isUnsafe() {
        return this.unsafe;
    }
    toString() {
        return Keybind.convertBindToText(this);
    }
    static convertBindToText(bind) {
        let str = this.convertKeyToText(bind.getCode());
        if (bind.isMeta())
            str = "Meta + " + str;
        if (bind.isAlt())
            str = "Alt + " + str;
        if (bind.isShift())
            str = "Shift + " + str;
        if (bind.isCtrl())
            str = "Ctrl + " + str;
        return str;
    }
    static convertKeyToText(code) {
        if (keyboard) {
            let mapped = keyboard.get(code);
            if (mapped != undefined) {
                return mapped.toUpperCase();
            }
        }
        return exports.codeToLabel[code];
    }
}
exports.default = Keybind;
// These are the only combos whose default actions you cannot cancel
exports.unsafeKeybinds = [
    // New window / tab / close
    new Keybind("KeyN", "", true), // Ctrl+N  → New Window
    new Keybind("KeyN", "", false, false, false, true), // ⌘+N     → New Window (macOS)
    new Keybind("KeyT", "", true), // Ctrl+T  → New Tab
    new Keybind("KeyT", "", false, false, false, true), // ⌘+T     → New Tab (macOS)
    new Keybind("KeyW", "", true), // Ctrl+W  → Close Tab
    new Keybind("KeyW", "", false, false, false, true), // ⌘+W     → Close Tab (macOS)
    // Tab navigation
    new Keybind("Tab", "", true), // Ctrl+Tab       → Next Tab
    new Keybind("Tab", "", true, true), // Ctrl+Shift+Tab → Previous Tab
    // Browser quit (Chrome-only)
    new Keybind("KeyQ", "", true, true) // Ctrl+Shift+Q  → Quit Browser
];
