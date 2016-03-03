/**
 * 定义条目标签组件。
 *
 * @author    姚尧 <yyao@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Structure/_Panel/SimpEle.ts
 */

/// <reference path="../../Unknown.ts" />

namespace Tag {
    import Util = __Bigine_Util;

    export class SimpEle extends Unknown {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'SimpEle';
        }

        /**
         * 根据标签结构生成数据结构。
         */
        public g(): Util.IHashTable<any> {
            let result: Util.IHashTable<any> = {};
            result['alias'] = this._c;
            Util.each(this._s, (child: Unknown) => {
                if ('EleName' == child.gN()) {
                    result['name'] = child.$c();
                } else if ('EleType' == child.gN()) {
                    result['type'] = child.$c();
                }
            });
            return result;
        }
    }
}
