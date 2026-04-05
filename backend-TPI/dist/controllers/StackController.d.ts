import { Request, Response } from 'express';
export declare function addToStack(req: Request, res: Response): Response<any, Record<string, any>> | undefined;
export declare function removeFromStack(req: Request, res: Response): Response<any, Record<string, any>> | undefined;
export declare function getStackTop(req: Request, res: Response): Response<any, Record<string, any>> | undefined;
export declare function getAllStack(req: Request, res: Response): void;
export declare function clearStack(req: Request, res: Response): void;
//# sourceMappingURL=StackController.d.ts.map