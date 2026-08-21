export const JOB_STATUSES = [
    "PENDING",
    "PROCESSING",
    "COMPLETED",
    "FAILED"
] as const;

export type JobStatus = typeof JOB_STATUSES[number];

export function isValidJobTransition(
    currentStatus: JobStatus,
    newStatus: JobStatus
): boolean {
    if (currentStatus === "PENDING") {
        return newStatus === "PROCESSING";
    }

    if (currentStatus === "PROCESSING") {
        return newStatus === "COMPLETED" || newStatus === "FAILED";
    }

    return false;
}