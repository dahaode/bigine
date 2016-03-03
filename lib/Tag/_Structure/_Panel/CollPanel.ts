/**
 * 定义集合面板标签组件。
 *
 * @author    姚尧 <yyao@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Structure/_Panel/CollPanel.ts
 */

/// <reference path="../../Unknown.ts" />

namespace Tag {
    import Util = __Bigine_Util;

    export class CollPanel extends Unknown {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'CollPanel';
        }

        /**
         * 根据标签结构生成数据结构。
         */
        public g(): Util.IHashTable<any> {
            let result: Util.IHashTable<any> = {};
            let colls: string[] = [];
            let strutc: string = '';
            Util.each(this._s, (child: Unknown) => {
                if ('CollSource' == child.gN()) {
                    colls.push(child.$c());
                } else if ('CollStruct' == child.gN()) {
                    strutc = child.$c();
                }
            });
            result["cn"] = colls;
            result["s"] = strutc;
            result["："] = "coll";
            result["n"] = this._c;
            return result;
        }
    }
}
