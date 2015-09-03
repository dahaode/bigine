/**
 * 定义未知标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/Unknown.ts
 */

/// <reference path="ITag.ts" />
/// <reference path="../SCHEMA.ts" />
/// <reference path="../E.ts" />

module Tag {
    export class Unknown implements ITag {
        /**
         * 参数。
         */
        _p: string[];

        /**
         * 内容。
         */
        _c: string;

        /**
         * 子标签。
         */
        _s: Unknown[];

        /**
         * 行号。
         */
        _l: number;

        /**
         * 已注册。
         */
        _r: boolean;

        /**
         * 已绑定。
         */
        _b: boolean;

        /**
         * 子标签查询缓存。
         */
        _q: Util.IHashTable<Unknown[]>;

        /**
         * 构造函数。
         */
        constructor(params: string[], content: string, children: Unknown[], lineNo?: number) {
            this._l = lineNo || 0;
            this._r =
            this._b = false;
            this._q = {};
            var schema: any[] = SCHEMA.S[this.gTagIndex()],
                contraints: Util.IHashTable<number[]> = {};
            if (params.length < schema[1][0])
                throw new E(E.TAG_PARAMS_TOO_FEW, lineNo);
            else if (undefined !== schema[1][1] && params.length > schema[1][1])
                throw new E(E.TAG_PARAMS_TOO_MANY, lineNo);
            this._p = params;
            if (-1 == schema[2] && content.length)
                throw new E(E.TAG_CONTENT_FORBIDEN, lineNo);
            else if (1 == schema[2] && !content.length)
                throw new E(E.TAG_CONTENT_REQUIRED, lineNo);
            this._c = content;
            Util.each<number[]>(schema[3] || {}, (value, index) => {
                var counter = value.slice(0);
                counter[2] = 0;
                contraints[index] = counter;
            });
            Util.each(children, (tag) => {
                var index: number = tag.gTagIndex(!!contraints[-1]);
                if (!(index in contraints))
                    throw new E(E.SCHEMA_CHILD_NOT_ALLOWED, tag.gLineNo());
                contraints[index][2]++;
            });
            Util.every(contraints, (counter) => {
                return true;
            });
            this._s = children;
        }

        /**
         * 获取行号。
         */
        gLineNo(): number {
            return this._l;
        }

        /**
         * 获取标签名称。
         */
        gTagName(): string {
            return 'UNKNOWN';
        }

        /**
         * 获取标签索引号。
         */
        gTagIndex(abstract?: boolean): number {
            var index: number = SCHEMA.I[this.gTagName()];
            if (undefined === index)
                throw new E(E.SCHEMA_TAG_NOT_DECLARED, this._l);
            return index;
        }

        /**
         * 注册（子标签实体及自身实体）至作品。
         */
        r(ep: Runtime.IEpisode): boolean {
            if (this._r)
                return true;
            this._r = true;
            return Util.every(this._s, (tag) => {
                return tag.r(ep);
            }) && this.$r(ep);
        }

        /**
         * 注册（自身实体）至（运行时）作品。
         */
        $r(ep: Runtime.IEpisode): boolean {
            return true;
        }

        /**
         * 绑定（运行时）作品（实体到子标签及自身）。
         */
        b(ep: Runtime.IEpisode): boolean {
            if (this._b)
                return true;
            this._b = true;
            return Util.every(this._s, (tag) => {
                return tag.b(ep);
            });
        }

        /**
         * 绑定（运行时）作品（实体）。
         */
        $b(ep: Runtime.IEpisode): boolean {
            return true;
        }

        /**
         * 转化为（中文）剧本（代码）。
         */
        toString(): string {
            var clob: string = this.gTagName(),
                params: string[] = this._p.slice(0);
            if ('UNKNOWN' == clob)
                clob = params.shift();
            if (params.length)
                clob += '（' + params.join('，') + '）';
            if (this._c || this._s.length)
                clob += '：';
            clob += '\n';
            Util.each(this._s, (tag) => {
                clob += '\t' + tag.toString().replace(/\r?\n/, '\n\t').substr(0, -1);
            });
            return clob;
        }

        /**
         * 转化为运行时（Javascript）代码。
         */
        toJsrn(): string {
            var parts: any[] = [this.gTagIndex()],
                children: string[] = [],
                clob: string;
            if (this._c)
                parts.push(this._c);
            if (this._p.length)
                parts.push(this._p);
            Util.each(this._s, (tag) => {
                children.push(tag.toJsrn());
            })
            clob = JSON.stringify(parts).substr(1, -1);
            if (children.length)
                clob += ',[' + children.join(',') + ']';
            return '$(' + clob + ')';
        }

        /**
         * 获取指定参数。
         */
        $p(index: number): string {
            return this._p[index];
        }

        /**
         * 获取内容。
         */
        $c(): string {
            return this._c;
        }

        /**
         * 过滤名称符合要求地子标签。
         */
        $q(name: string): Unknown[] {
            if (!(name in this._q)) {
                this._q[name] = [];
                Util.each(this._s, (tag) => {
                    if (tag.gTagName() == name)
                        this._q[name].push(tag);
                });
            }
            return this._q[name];
        }
    }
}
