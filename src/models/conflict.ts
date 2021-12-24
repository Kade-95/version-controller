export enum Conflict {
    NO_CONFLICT = "No Conflict",
    ORIGIN_MISMATCH = "Origin Mismatch",
    UNRESOLVED_CONFLICT = "Unresolved Conflict",
    AHEAD_OF_INCOMING = "Ahead of incoming",
    UNKNOWN_ISSUES = "Unknown Isses"
}

export const NeverMerge = [
    Conflict.ORIGIN_MISMATCH,
    Conflict.UNRESOLVED_CONFLICT,
    Conflict.AHEAD_OF_INCOMING
]