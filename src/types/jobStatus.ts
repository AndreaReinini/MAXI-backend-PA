export const JOB_STATUSES = [
    "PENDING",
    "PROCESSING",
    "COMPLETED",
    "FAILED"
] as const;

export type JobStatus = typeof JOB_STATUSES[number];


//Non permettiamo processing -> completed, perchè faremo un patch che sposta a completed con aggiunta di risultato
export function isValidJobTransition(
    currentStatus: JobStatus,
    newStatus: JobStatus
): boolean {
    if (currentStatus === "PENDING") {
        return newStatus === "PROCESSING";
    }

    if (currentStatus === "PROCESSING") {
        return newStatus === "FAILED";
    }

    return false;
}