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
         * 父标签。
         */
        _u: Unknown;

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
            var schema = SCHEMA.S[this.$i()],
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
                var index = tag.$i(!!contraints[-1]);
                if (!(index in contraints))
                    throw new E(E.SCHEMA_CHILD_NOT_ALLOWED, tag.gL());
                contraints[index][2]++;
                tag.$u(this);
            });
            Util.every(contraints, (counter) => {
                return true;
            });
            this._s = children;
        }

        /**
         * 获取行号。
         */
        gL(): number {
            return this._l;
        }

        /**
         * 获取标签名称。
         */
        gN(): string {
            return 'Unknown';
        }

        /**
         * 注册（子标签实体及自身实体）至作品。
         */
        r(ep: Runtime.IEpisode): void {
            if (this._r) return;
            this._r = true;
            Util.each(this._s, (tag) => {
                tag.r(ep);
            })
            this.$r(ep);
        }

        /**
         * 注册（自身实体）至（运行时）作品。
         */
        $r(ep: Runtime.IEpisode): void {
        }

        /**
         * 绑定（运行时）作品（实体到子标签及自身）。
         */
        b(ep: Runtime.IEpisode): void {
            if (this._b) return;
            this._b = true;
            Util.each(this._s, (tag) => {
                tag.b(ep);
            });
            this.$b(ep);
        }

        /**
         * 绑定（运行时）作品（实体）。
         */
        $b(ep: Runtime.IEpisode): void {
        }

        /**
         * 转化为（中文）剧本（代码）。
         */
        toString(): string {
            var clob = SCHEMA.T[this.gN()],
                params = this._p.slice(0);
            if ('UNKNOWN' == clob)
                clob = params.shift();
            if (params.length)
                clob += '（' + params.join('，') + '）';
            if (this._c || this._s.length)
                clob += '：';
            clob += '\n';
            Util.each(this._s, (tag) => {
                clob += '\t' + tag.toString().replace(/\n/, '\n\t').substr(0, -1);
            });
            return clob;
        }

        /**
         * 转化为运行时（Javascript）代码。
         */
        toJsrn(): string {
            var parts: any[] = [this.$i()],
                params: (number | string)[] = [],
                children: string[] = [],
                clob: string;
            if (this._c)
                parts.push(this.$v(this._c));
            if (this._p.length) {
                Util.each(this._p, (param) => {
                    params.push(this.$v(param));
                });
                parts.push(params);
            }
            Util.each(this._s, (tag) => {
                children.push(tag.toJsrn());
            })
            clob = JSON.stringify(parts).substr(1, -1);
            if (children.length)
                clob += ',[' + children.join(',') + ']';
            return '$(' + clob + ')';
        }

        /**
         * 尝试将数值字符串转为数值。
         */
        $v(orig: string): number | string {
            if ('真' == orig)
                return 1;
            else if ('伪' == orig)
                return 0;
            var ret = <any> orig - 0;
            return isNaN(ret) ? orig : ret;
        }

        /**
         * 设置父标签。
         */
        $u(parent: Unknown): void {
            this._u = parent;
        }

        /**
         * 获取父标签。
         */
        gU(): Unknown {
            return this._u;
        }

        /**
         * 获取标签索引号。
         */
        $i(abstract?: boolean): number {
            var index = SCHEMA.I[this.gN()];
            if (undefined === index)
                throw new E(E.SCHEMA_TAG_NOT_DECLARED, this._l);
            return index;
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
            if (!(name in SCHEMA.I))
                throw new E(E.SCHEMA_TAG_NOT_DECLARED);
            if (!(name in this._q)) {
                this._q[name] = [];
                Util.each(this._s, (tag) => {
                    if (tag.gN() == name)
                        this._q[name].push(tag);
                });
            }
            return this._q[name];
        }
    }
}
