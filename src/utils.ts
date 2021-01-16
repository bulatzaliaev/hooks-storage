export type PromiseType<P extends Promise<any>> = P extends Promise<infer T> ? T : never;

export type returningPromise = (...args: any[]) => Promise<any>;