/**
 * 定义解析器组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Lex/Parser.ts
 */

/// <reference path="TagLine.ts" />

namespace Lex {
    import Util = __Bigine_Util;

    export namespace Parser {
        /**
         * 解析。
         */
        export function c(lines: string[]): Core.IRootTag;
        export function c(source: string): Core.IRootTag;
        export function c(source: any): Core.IRootTag {
            var lines: string[] = source instanceof Array ?
                    source :
                    source.split(/\r?\n/),
                hierarchy: TagLine[] = [new TagLine()],
                depth: number = 0,
                blank: RegExp = /^\s*$/,
                depth2: number,
                tag: TagLine;
            Util.each(lines, (line: string, index: number) => {
                if (blank.test(line)) return;
                index++;
                tag = new TagLine(line, index);
                depth2 = tag.gI();
                if (depth2 > 1 + depth) {
                    throw new E(E.LEX_UNEXPECTED_INDENTATION, index);
                } else if (depth2 != depth) {
                    if (depth2 < depth)
                        hierarchy.splice(1 + depth2);
                    depth = depth2;
                }
                hierarchy[1 + depth] = tag;
                hierarchy[depth].a(tag);
            });
            return <Tag.Root> hierarchy[0].t();
        }
    }
}
