// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type Constructor<T = object> = new (...args: any[]) => T;
export type Mixin<X extends Constructor, Y> = X & Constructor<Y>;
