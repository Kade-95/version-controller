export enum ConflictEnum {
    NO_CONFLICT = "No Conflict",
    ORIGIN_MISMATCH = "Origin Mismatch",
    UNRESOLVED_CONFLICT = "Unresolved Conflict",
    AHEAD_OF_INCOMING = "Ahead of incoming",
    UNKNOWN_ISSUES = "Unknown Isses"
}

export const NeverMerge = [
    ConflictEnum.ORIGIN_MISMATCH,
    ConflictEnum.UNRESOLVED_CONFLICT,
    ConflictEnum.AHEAD_OF_INCOMING
]