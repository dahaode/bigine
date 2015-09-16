/**
 * 定义引擎入口程序。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Bigine.ts
 */

/// <reference path="Runtime/Runtime.ts" />

function Bigine(code: number, content?: string | number, params?: (number | string)[], children?: Tag.ITag[], id?: string): Tag.ITag;
function Bigine(children: Tag.ITag[]): Runtime.IRuntime;
function Bigine(code: any, ...args: any[]): any {
    'use strict';

    if (code instanceof Array)
        return new Runtime.Runtime(new Tag.Root(<Tag.Unknown[]> code));
    if (!(code in SCHEMA.S))
        throw new E(E.SCHEMA_TAG_NOT_DECLARED);
    var proto: typeof Tag.Unknown = eval('Tag.' + SCHEMA.S[code][0]),
        content: string = '',
        params: string[] = [],
        children: Tag.Unknown[] = [],
        id: string = '',
        arg: any = args.shift(),
        type: string = typeof arg,
        tag: Tag.Unknown;
    if ('string' == type || 'number' == type) {
        content = arg;
        arg = args.shift();
    }
    if (arg instanceof Array) {
        type = typeof arg[0];
        if ('string' == type || 'number' == type) {
            params = arg;
            arg = args.shift();
        }
    }
    if (arg instanceof Array) {
        children = arg;
        arg = args.shift();
    }
    if ('string' == typeof arg)
        id = arg;
    tag = new proto(params, content, children, 0);
    if (id)
        (<Tag.Idable> tag).i(id);
    return tag;
}

namespace Bigine {
    'use strict';

    export var version: string = '${BIGINE_VERSION}';
}

//export = Bigine;
