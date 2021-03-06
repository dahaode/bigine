/**
 * 定义（运行时）数据状态管理器组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/States.ts
 */

/// <reference path="../Core/_Runtime/IStates.ts" />
/// <reference path="../Core/_Runtime/IRuntime.ts" />
/// <reference path="../Ev/_Runtime/Query.ts" />
/// <reference path="../Ev/_Runtime/Save.ts" />
/// <reference path="../Ev/_Runtime/State.ts" />

namespace Runtime {
    import Util = __Bigine_Util;

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
        private _s: Util.IHashTable<Util.IHashTable<[string, number]>>;

        /**
         * 是否已加载存档信息。
         */
        private _l: boolean;

        /**
         * 付费信息。
         */
        private _sp: Util.IHashTable<string | number>;

        /**
         * 是否整章购买。
         */
        private _all: boolean;

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
            this._s = {
                'series': {},
                'work': {},
                'end': {}
            };
            this._sp = {};
            this._l = false;
            this._all = false;
        }

        /**
         * 设置值。
         */
        public s(key: string, value: any): States {
            this._r.gL().d('[state]', key, '=', value);
            this._d[key] = value;
            return this;
        }

        /**
         * 获取值。
         */
        public g(key: string, local: boolean = false): any {
            return local ? this._p[key] : this._d[key];
        }

        /**
         * 删除值。
         */
        public d(key: string): States {
            var length: number = key.length - 1,
                logger: Util.ILogger = this._r.gL();
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
            return text.replace(/〈([^〉]+)〉/g, convert).replace(/＜([^＞]+)＞/g, convert);
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
            this._r.dispatchEvent(new Ev.State({
                target: this,
                data: this._p
            }));
            return this;
        }

        /**
         * 导出数据（存档）。
         *
         * 此方法应触发 Save 事件。
         */
        public e(manual: string, series?: boolean, callback?: () => void): Util.IHashTable<any> {
            if (!this._p)
                return {};
            let save: (id: string) => void = (id: string) => {
                    this._s[series ? 'end' : 'work'][manual] = [id, + new Date()];
                    if (callback) callback();
                },
                data: Util.IHashTable<any> = this._p;
            if (series) {
                data = {
                    ' ': true
                };
                Util.each(this._p, (value: any, key: string) => {
                    if ('_' != key[0])
                        data[key] = value;
                });
            } else {
                if (!data['_a']) {
                    console.log('当前没有关键帧，存档不成功！');
                    return this._p;
                }
            }
            this._r.dispatchEvent(new Ev.Save({
                target: this,
                series: series,
                manual: manual,
                data: data,
                callback: save
            }));
            return this._p;
        }

        /**
         * 导入数据。
         */
        public i(data: Util.IHashTable<any>): States {
            this._d = data;
            this._p = Util.clone(data);
            return this;
        }

        /**
         * 查询档位存档编号。
         */
        public q(index: string, series?: Core.IStates.Save): [string, number | Util.IHashTable<any>] {
            let save: typeof Core.IStates.Save = Core.IStates.Save,
                type: string = 'work';
            switch (series) {
                case save.Series:
                    type = 'series';
                    break;
                case save.End:
                    type = 'end';
                    break;
            }
            return this._s[type][index];
        }

        /**
         * 查询档位所有存档。
         */
        public qa(series?: Core.IStates.Save): Util.IHashTable<[string, number]> {
            let save: typeof Core.IStates.Save = Core.IStates.Save,
                type: string = 'work';
            switch (series) {
                case save.Series:
                    type = 'series';
                    break;
                case save.End:
                    type = 'end';
                    break;
            }
            return this._s[type];
        }

        /**
         * 加载存档信息。
         */
        public l(): Promise<States> {
            return new Promise((resolve: (states: States) => void, reject: (reason?: any) => void) => {
                if (this._l)
                    return resolve(this);
                this._l = true;
                let query: (slots: Util.IHashTable<Util.IHashTable<[string, number]>>) => void = (slots: Util.IHashTable<Util.IHashTable<[string, number]>>) => {
                    if (!slots) {
                        this._l = false;
                        return reject();
                    }
                    this._s = slots;
                    resolve(this);
                };
                this._r.dispatchEvent(new Ev.Query({
                    target: this,
                    callback: query
                }));
            });
        }

        /**
         * 查询是否付费。
         */
        public qp(id: string, count: number, donate: boolean = false): boolean {
            if (this._all && !donate)
                return true;
            if ((id in this._sp) && donate ? this._sp[id] >= count : this._sp[id] == count.toString())
                return true;
            return false;
        }

        /**
         * 加载付费信息。
         */
        public lp(data: Util.IHashTable<string> | string): States {
            this._all = false;
            if (typeof data == 'string' && data == 'all') {
                this._all = true;
            } else if (typeof data == 'object') {
                this._sp = <Util.IHashTable<string>> data ;
            }
            return this;
        }

        /**
         * 增加付费信息。
         */
        public ep(id: string, count: number): States {
            if (!this._all)
                this._sp[id] = count.toString();
            return this;
        }
    }
}
