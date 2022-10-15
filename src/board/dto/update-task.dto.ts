type TaskStatus = 'TODO' | 'PROGRESS' | 'DONE | ARCHIVE';

export class UpdateTaskDto {
    readonly id: string;
    readonly name?: string;
    readonly status?: TaskStatus;
}
