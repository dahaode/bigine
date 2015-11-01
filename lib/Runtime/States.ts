/**
 * 定义（运行时）数据状态管理器组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/States.ts
 */

/// <reference path="../Core/_Runtime/IStates.ts" />
/// <reference path="../Core/_Runtime/IRuntime.ts" />
/// <reference path="Event/Query.ts" />
/// <reference path="Event/Save.ts" />

namespace Runtime {
    export class States implements Core.IStates {
        /**
         * 数据池。
         */
        private _d: Util.IHashTable<any>;

        /**
         * 运行时。
         */
        private _r: Core.IRuntime;

        /**
         * 存档信息。
         */
        private _s: Util.IHashTable<[string, number]>;

        /**
         * 是否已加载存档信息。
         */
        private _l: boolean;

        /**
         * 快照。
         */
        private _p: Util.IHashTable<any>;

        /**
         * 构造函数。
         */
        constructor(runtime: Core.IRuntime) {
            this._d = {};
            this._r = runtime;
            this._s = {};
            this._l = false;
        }

        /**
         * 设置值。
         */
        public s(key: string, value: any): States {
            this._r.gL().d('[state]', key, '=', '$' == key[0] ? value : JSON.stringify(value));
            this._d[key] = value;
            return this;
        }

        /**
         * 获取值。
         */
        public g(key: string): any {
            return this._d[key];
        }

        /**
         * 删除值。
         */
        public d(key: string): States {
            var length: number = key.length - 1,
                logger: Core.ILogger = this._r.gL();
            if ('*' == key[length]) {
                key = key.substr(0, length);
                Util.each(this._d, (value: any, index: string) => {
                    if (index.length == length || index.substr(0, length) != key) return;
                    logger.d('[state]', index, '=');
                    delete this._d[index];
                });
                return this;
            }
            logger.d('[state]', key, '=');
            delete this._d[key];
            return this;
        }

        /**
         * 比较两个值是否一致。
         */
        public a(key1: string, key2: string): boolean {
            return this._d[key1] == this._d[key2];
        }

        /**
         * 复制值。
         */
        public c(src: string, dest: string): States {
            this._r.gL().d('[state]', dest, '=', src);
            this._d[dest] = this._d[src];
            return this;
        }

        /**
         * 移动值。
         */
        public m(src: string, dest: string): States {
            return this.c(src, dest)
                .d(src);
        }

        /**
         * 转化文本中的变量名至实际值。
         */
        public t(text: string): string {
            var convert: (match: string, p1: string) => string = (match: string, p1: string) => <string> this._d[p1];
            return text.replace(/〈(.+)〉/g, convert).replace(/＜(.+)＞/g, convert);
        }

        /**
         * 生成快照（以备存档）。
         */
        public p(): States {
            this._p = {};
            Util.each(this._d, (value: any, key: string) => {
                if ('.' != key[0] && '$' != key[0] && undefined != value)
                    this._p[key] = value;
            });
            return this;
        }

        /**
         * 导出数据（存档）。
         *
         * 此方法应触发 Save 事件。
         */
        public e(manual: boolean): Util.IHashTable<any> {
            if (!this._p)
                return {};
            var save: (id: string) => void = (id: string) => {
                    this._s[manual ? '1' : 'auto'] = [id, + new Date()];
                };
            this._r.dispatchEvent(new Event.Save({
                target: this,
                manual: manual,
                data: this._p,
                callback: save
            }));
            return this._p;
        }

        /**
         * 导入数据。
         */
        public i(data: Util.IHashTable<any>): States {
            this._d = data;
            this._p = undefined;
            return this;
        }

        /**
         * 查询档位存档编号。
         */
        public q(index: string): [string, number] {
            return this._s[index];
        }

        /**
         * 加载存档信息。
         */
        public l(): void {
            if (this._l) return;
            this._l = true;
            var query: (slots: Util.IHashTable<[string, number]>) => void = (slots: Util.IHashTable<[string, number]>) => {
                this._s = slots;
            };
            this._r.dispatchEvent(new Event.Query({
                target: this,
                callback: query
            }));
        }
    }
}
