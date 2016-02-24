/**
 * 定义结构标签组件。
 *
 * @author    姚尧 <yyao@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_State/Struct.ts
 */

/// <reference path="../Entity.ts" />

namespace Tag {
    import Util = __Bigine_Util;

    export class Struct extends Entity {
        /**
         * 定义结构体对象。
         */
        private _ms: Util.IHashTable<any>;
        /**
         * 构造函数。
         */
        constructor(params: string[], content: string, children: Unknown[], lineNo?: number) {
            super(params, content, children, lineNo);
            this._ms = {};
            Util.each(children, (field: Unknown) => {
                this._ms[field.$c()] = '';
            });
        }

        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Struct';
        }

        /**
         * 获取类型。
         */
        public gT(): Core.IEpisode.Entity {
            return Core.IEpisode.Entity.Struct;
        }

        /**
         * 获取结构体对象。
         */
        public g(data: Util.IHashTable<any>): Util.IHashTable<any> {
            Util.each(this._s, (child: Field) => {
                var field: Field = null;
                Util.every(data, (val: string, key: string) => {
                    if (child.$c() == key) {
                        field = child;
                        return false;
                    }
                    return true;
                });
                this._ms[child.$c()] = child.g(field ? data[field.$c()] : null);
            });

            // Util.each(data, (val: string, key: string) => {
            //     var field: Field = null;
            //     Util.every(this._s, (child: Field) => {
            //         if (child.$c() == key) {
            //             field = child;
            //             return false;
            //         }
            //         return true;
            //     });
            //     this._ms[key] = field.g(data[key]);
            // });
            console.log("this._ms", this._ms);
            return this._ms;
        }
    }
}
