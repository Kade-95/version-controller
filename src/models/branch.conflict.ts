export enum BranchConflicts {
    NO_CONFLICT = "No Conflict",
    ORIGIN_MISMATCH = "Origin Mismatch",
    UNRESOLVED_CONFLICT = "Unresolved Conflict",
    AHEAD_OF_INCOMING = "Ahead of incoming",
    UNKNOWN_ISSUES = "Unknown Isses"
}

export const NeverMerge = [
    BranchConflicts.ORIGIN_MISMATCH,
    BranchConflicts.UNRESOLVED_CONFLICT,
    BranchConflicts.AHEAD_OF_INCOMING
]