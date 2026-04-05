import type { ILinearStructure } from './interfaces/ILinearStructure';
export default abstract class LinearStructure<T> implements ILinearStructure<T> {
    private readonly id;
    readonly name: string;
    private static createdStructures;
    protected items: T[];
    constructor(name: string);
    add(item: T): void;
    clear(): void;
    getSize(): number;
    getItems(): T[];
    getId(): string;
    static getCreatedStructures(): number;
    abstract remove(): T | undefined;
    abstract peek(): T | undefined;
}
//# sourceMappingURL=LinearStructure.d.ts.map