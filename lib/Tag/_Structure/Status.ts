/**
 * 定义状态标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Structure/Status.ts
 */

/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="../Unknown.ts" />

namespace Tag {
    import Util = __Bigine_Util;

    export class Status extends Unknown {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Status';
        }

        /**
         * 列举配置。
         */
        public l(): [string, string][] {
            let sheet: [string, string][] = [];
            Util.each(this._s, (tag: Unknown) => {
                let title: string = tag.$p(0),
                    value: string = tag.$c();
                if ('空' == title)
                    title = value = '';
                sheet.push([title, value || title]);
            });
            Util.some(Util.clone(sheet).reverse(), (item: [string, string]) => {
                if (item[0])
                    return true;
                sheet.pop();
                return false;
            });
            return sheet;
        }
    }
}
