/**
 * 定义简单面板标签组件。
 *
 * @author    姚尧 <yyao@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Structure/_Panel/SimpPanel.ts
 */

/// <reference path="../../Unknown.ts" />

namespace Tag {
    import Util = __Bigine_Util;

    export class SimpPanel extends Unknown {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'SimpPanel';
        }

        /**
         * 根据标签结构生成数据结构。
         */
        public g(): Util.IHashTable<any> {
            let result: Util.IHashTable<any> = {};
            result['c'] = [];
            Util.each(this._s, (ele: SimpEle) => {
                result['c'].push(ele.g());
            });
            result['n'] = this._c;
            result['：'] = 'simp';
            return result;
        }

    }
}
