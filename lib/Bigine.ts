/**
 * 定义引擎入口程序。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Bigine.ts
 */

/// <reference path="Runtime/Runtime.ts" />
/// <reference path="Lex/Parser.ts" />

function Bigine(source: string): Core.IRootTag;
function Bigine(tags: Core.IRootTag): Core.IRuntime;
function Bigine(lines: string[]): Core.IRootTag;
function Bigine(children: Core.ITag[]): Core.IRuntime;
function Bigine(code: number, content?: string | number, params?: (number | string)[], children?: Core.ITag[], id?: string): Core.ITag;
function Bigine(code: any, ...args: any[]): any {
    'use strict';

    if ('string' == typeof code)
        return Lex.Parser.c(code);
    if (code instanceof Tag.Root)
        return new Runtime.Runtime(code);
    if (code instanceof Array) {
        if ('string' == typeof code[0])
            return Lex.Parser.c(code);
        return new Runtime.Runtime(new Tag.Root(<Tag.Unknown[]> code));
    }
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
        content += arg;
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
    if (id && ('i' in tag))
        (<Tag.Idable> tag).i(id);
    return tag;
}

namespace Bigine {
    'use strict';

    export var version: string = '${BIGINE_VERSION}';
}

//export = Bigine;
