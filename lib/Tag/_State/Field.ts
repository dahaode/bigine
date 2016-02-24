/**
 * 定义字段标签组件。
 *
 * @author    姚尧 <yyao@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_State/Field.ts
 */

/// <reference path="../Unknown.ts" />

namespace Tag {
    import Util = __Bigine_Util;

    export class Field extends Unknown {
        private _ep: Core.IEpisode;

        private numberTypes: string[] = ['心', '星'];
        private objTypes: Util.IHashTable<any> = {
            '人物': Core.IEpisode.Entity.Chr,
            '房间': Core.IEpisode.Entity.Room,
            '特写': Core.IEpisode.Entity.CG
        };
        /**
         * 构造函数。
         */
        constructor(params: string[], content: string, children: Unknown[], lineNo?: number) {
            super(params, content, children, lineNo);
        }

        /**
         * 绑定（运行时）作品（实体）。
         */
        public $b(ep: Core.IEpisode): void {
            this._ep = ep;
        }

        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Field';
        }

        /**
         * 获取字段的值。
         */
        public g(val: string): number | string | Entity {
            if (this._s.length == 0) return val;
            var fieldType: string = null;
            var fieldLimit: string = null;
            Util.each(this._s, (child: Unknown) => {
                if (child.gN() == 'FieldType') {
                    fieldType = child.$c();
                }
                if (child.gN() == 'FieldLimit') {
                    fieldLimit = child.$c();
                }
            });
            if (Util.indexOf(this.numberTypes, fieldType) > -1) {
                var limit: number = parseInt(fieldLimit, 10);
                var value: number = (val != null && val != undefined) ? parseInt(val, 10) : 0;
                return value > limit ? limit : value;
            } else if (this.objTypes[fieldType]) {
                var obj: any = this._ep.q(val, this.objTypes[fieldType], this._l);
                return obj;
            }
            return val;
        }
    }
}
