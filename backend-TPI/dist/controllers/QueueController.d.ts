import { Request, Response } from 'express';
export declare function addToQueue(req: Request, res: Response): Response<any, Record<string, any>>;
export declare function removeFromQueue(req: Request, res: Response): Response<any, Record<string, any>>;
export declare function getQueueFront(req: Request, res: Response): Response<any, Record<string, any>>;
export declare function getAllQueue(req: Request, res: Response): Response<any, Record<string, any>>;
export declare function clearQueue(req: Request, res: Response): Response<any, Record<string, any>>;
//# sourceMappingURL=QueueController.d.ts.map