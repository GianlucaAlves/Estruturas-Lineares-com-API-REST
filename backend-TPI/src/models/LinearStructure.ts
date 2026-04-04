import type { ILinearStructure } from './interfaces/ILinearStructure';

export default abstract class LinearStructure<T> implements ILinearStructure<T> {
    private readonly id: string;
    public readonly name: string;
    private static createdStructures = 0;
    protected items: T[] = [];

    constructor(name: string){
        this.name = name;
        this.id = String(LinearStructure.createdStructures + 1);
        LinearStructure.createdStructures++;
    }

    add(item: T): void{
        this.items.push(item);
    }

    clear(): void{
        this.items = [];
    }

    getSize(): number {
        return this.items.length;
    }

    getItems(): T[] {
        return [...this.items];
    }

    getId(): string {
        return this.id;
    }

    static getCreatedStructures(): number {
        return LinearStructure.createdStructures;
    }
    
    abstract remove(): T | undefined;
    abstract peek(): T | undefined;
}