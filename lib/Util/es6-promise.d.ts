/**
 * 声明 ES6-Promise 包 TypeScript 规范。
 *
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file Util/es6-promise.d.ts
 */

interface Thenable<T> {
    then(onFulfilled?: (value: T) => T | Thenable<T>, onRejected?: (reason: any) => T | Thenable<T>): Thenable<T>;
    then(onFulfilled?: (value: T) => T | Thenable<T>, onRejected?: (reason: any) => void): Thenable<T>;
}

interface Promise<T> extends Thenable<T> {
    then(onFulfilled?: (value: T) => T | Thenable<T>, onRejected?: (reason: any) => T | Thenable<T>): Promise<T>;
    then(onFulfilled?: (value: T) => T | Thenable<T>, onRejected?: (reason: any) => void): Promise<T>;
    catch(onRejected?: (reason: any) => T | Thenable<T>): Promise<T>;
    catch(onRejected?: (reason: any) => void): Promise<T>;
}

interface PromiseConstructor {
    prototype: Promise<any>;
    new <T>(executor: (resolve: (value?: T | Thenable<T>) => void, reject: (reason?: any) => void) => void): Promise<T>;
    resolve(): Promise<void>;
    resolve<T>(value: T | Thenable<T>): Promise<T>;
    reject(reason: any): Promise<void>;
    reject<T>(reason: any): Promise<T>;
    all<T>(values: (T | Thenable<T>)[]): Promise<T[]>;
    race<T>(values: (T | Thenable<T>)[]): Promise<T>;
}

declare var Promise: PromiseConstructor;

declare module 'es6-promise' {
    module rsvp {
        export var Promise: PromiseConstructor;
        export function polyfill(): void;
    }
    export = rsvp;
}
