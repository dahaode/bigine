/**
 * 定义词法标签行组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Lex/TagLine.ts
 */

/// <reference path="../Tag/_pack.ts" />

namespace Lex {
    'use strict';

    export class TagLine {
        /**
         * 语法。
         */
        public static GRAMMAR: RegExp = /^(\t*)([^\s（：]+)(?:|（([^）]+)）)(?:|：(.*))$/;

        /**
         * 缩进。
         */
        private _i: number;

        /**
         * 令牌。
         */
        private _t: string[];

        /**
         * 子标签。
         */
        private _c: TagLine[];

        /**
         * 始尾行号。
         */
        private _l: [number, number];

        /**
         * 构造函数。
         */
        constructor(source?: string, lineNo?: number) {
            if (!lineNo) {
                this._i = -1;
                this._t = ['', ''];
                this._c = [];
                this._l = [0, 0];
            } else {
                var tokens: RegExpMatchArray = TagLine.GRAMMAR.exec(source);
                if (!tokens)
                    throw new E(E.LEX_ILLEGAL_SOURCE, lineNo);
                this._i = tokens[1].length;
                this._t = [tokens[2], tokens[3] || '', tokens[4] || ''];
                this._c = [];
                this._l = [lineNo, lineNo];
            }
        }

        /**
         * 获取缩进深度。
         */
        public gI(): number {
            return this._i;
        }

        /**
         * 获取令牌。
         */
        public gT(): string[] {
            return this._t;
        }

        /**
         * 获取子标签。
         */
        public gC(): TagLine[] {
            return this._c;
        }

        /**
         * 获取行号。
         */
        public gL(): [number, number] {
            return this._l;
        }

        /**
         * 添加子标签。
         */
        public a(child: TagLine): TagLine {
            this._c.push(child);
            return this;
        }

        /**
         * 转化为标签。
         */
        public t(): Core.ITag {
            var name: string = this._t[0],
                params: string[] = this._t[1] ?
                    this._t[1].split('，') :
                    [],
                content: string = this._t[2],
                children: Tag.Unknown[] = [],
                proto: typeof Tag.Unknown,
                tag: Tag.Unknown;
            Util.each(this._c, (obj: TagLine) => {
                children.push(<Tag.Unknown> obj.t());
            });
            if (-1 == this._i)
                return new Tag.Root(children);
            if (!(name in SCHEMA.C)) {
                params.unshift(name);
                name = 'UNKNOWN';
            }
            proto = eval('Tag.' + SCHEMA.C[name]);
            tag = new proto(params, content, children, this._l[0]);
            if (tag instanceof Tag.Idable)
                (<Tag.Idable> tag).i(u());
            return tag;
        }
    }

    /**
     * 创建 UUID 。
     */
    function u(): string {
        'use strict';

        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, u_);
    }

    /**
     * UUID 单字符处理。
     */
    function u_(symbol: string): string {
        var seed: number = 0 | 16 * Math.random();
        if ('y' == symbol)
            seed = 8 | 3 & seed;
        return seed.toString(16);
    }
}
