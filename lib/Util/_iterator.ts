/**
 * 定义数组类工具方法。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Util/_iterator.ts
 */

/// <reference path="IArrayIterator.ts" />
/// <reference path="IObjectIterator.ts" />

namespace Util {
    'use strict';

    /**
     * 无条件遍历整个数组或对象。
     */
    export function each<T>(array: T[], iterator: IArrayIterator<T, any>, thisArg?: any): void;
    export function each<T>(object: IHashTable<T>, iterator: IObjectIterator<T, any>, thisArg?: any): void;
    export function each<T>(obj: any, cb: any, $this: any): void {
        $this = $this || {};
        var ii: any;
        if (obj instanceof Array) {
            if (obj.forEach)
                return obj.forEach(cb, $this);
            for (ii = 0; ii < obj.length; ii++)
                cb.call($this, obj[ii], ii, obj);
            return;
        }
        for (ii in obj)
            if (obj.hasOwnProperty(ii))
                cb.call($this, obj[ii], ii, obj);
    }

    /**
     * 遍历数组或对象至第一次失败。
     */
    export function every<T>(array: T[], iterator: IArrayIterator<T, boolean>, thisArg?: any): boolean;
    export function every<T>(object: IHashTable<T>, iterator: IObjectIterator<T, boolean>, thisArg?: any): boolean;
    export function every<T>(obj: any, cb: any, $this: any): boolean {
        $this = $this || {};
        var ii: any;
        if (obj instanceof Array) {
            if (obj.every)
                return obj.every(cb, $this);
            for (ii = 0; ii < obj.length; ii++)
                if (!cb.call($this, obj[ii], ii, obj))
                    return false;
        } else
            for (ii in obj)
                if (obj.hasOwnProperty(ii) && !cb.call($this, obj[ii], ii, obj))
                    return false;
        return true;
    }

    /**
     * 遍历数组或对象至第一次成功。
     */
    export function some<T>(array: T[], iterator: IArrayIterator<T, boolean>, thisArg?: any): boolean;
    export function some<T>(object: IHashTable<T>, iterator: IObjectIterator<T, boolean>, thisArg?: any): boolean;
    export function some<T>(obj: any, cb: any, $this: any): boolean {
        $this = $this || {};
        var ii: any;
        if (obj instanceof Array) {
            if (obj.some)
                return obj.some(cb, $this);
            for (ii = 0; ii < obj.length; ii++)
                if (cb.call($this, obj[ii], ii, obj))
                    return true;
        } else
            for (ii in obj)
                if (obj.hasOwnProperty(ii) && cb.call($this, obj[ii], ii, obj))
                    return true;
        return false;
    }

    /**
     * 定位子元素。
     */
    export function indexOf<T>(array: T[], element: T, offset?: number): number;
    export function indexOf<T>(object: IHashTable<T>, element: T): string | number;
    export function indexOf<T>(obj: any, item: T, offset: number = 0): any {
        var ii: any;
        if (obj instanceof Array) {
            if (obj.indexOf)
                return obj.indexOf(item, offset);
            for (ii = offset; ii < obj.length; ii++)
                if (obj[ii] == item)
                    return ii;
        } else
            for (ii in obj)
                if (obj.hasOwnProperty(ii) && obj[ii] == item)
                    return ii;
        return -1;
    }
}
