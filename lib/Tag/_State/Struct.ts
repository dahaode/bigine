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
         * 构造函数。
         */
        constructor(params: string[], content: string, children: Unknown[], lineNo?: number) {
            super(params, content, children, lineNo);
            let entCount: number = 0;
            let nameCount: number = 0;
            Util.each(children, (child: Field) => {
                if (child.iE()) {
                    entCount ++;
                }
                if (child.iN()) {
                    nameCount ++;
                }
            });
            if (entCount > 1 || nameCount > 1) throw new E(E.STRUCT_FIELD_TYPE_TOO_MANY, this._l);
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
         * 获取类型。
         */
        public gS(): Array<Unknown> {
            return this._s;
        }

        /**
         * 获取结构体对象。
         */
        public g(data: Util.IHashTable<any>): Util.IHashTable<any> {
            var result: Util.IHashTable<any> = {'：': this._c};
            Util.each(this._s, (child: Field) => {
                var fieldVal: string = data[child.$c()];
                result[child.$c()] = child.g(fieldVal ? fieldVal : null);
            });
            return result;
        }
    }
}
