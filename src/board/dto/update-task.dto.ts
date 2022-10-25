type TaskStatus = 'TODO' | 'PROGRESS' | 'DONE';

export class UpdateTaskDto {
    readonly id: string;
    readonly name?: string;
    readonly status?: TaskStatus;
}
