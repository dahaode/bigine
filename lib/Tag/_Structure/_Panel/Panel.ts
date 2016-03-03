/**
 * 定义面板标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Structure/_Panel/Panel.ts
 */

/// <reference path="../../../../include/tsd.d.ts" />
/// <reference path="../../Unknown.ts" />

namespace Tag {
    import Util = __Bigine_Util;

    export class Panel extends Unknown {
        /**
         * 构造函数。
         */
        constructor(params: string[], content: string, children: Unknown[], lineNo?: number) {
            super(params, content, children, lineNo);
            if (!children || children.length == 0) throw new E(E.TAG_CHILDREN_TOO_FEW, this._l);
        }

        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Panel';
        }

        /**
         * 列举配置。
         */
        public l(): Array<Util.IHashTable<any>> {
            let sheet: Array<Util.IHashTable<any>> = [];
            // let sheet: Util.IHashTable<any> = {};
            Util.each(this._s, (tag: Unknown) => {
                let tagName: string = tag.gN();
                let tagValue: Util.IHashTable<any> ;
                if ('SimpPanel' == tagName) {
                    tagValue = (<Tag.SimpPanel> tag).g();
                } else if ('CollPanel' == tagName) {
                    tagValue = (<Tag.CollPanel> tag).g();
                }
                sheet.push(tagValue);
            });
            return sheet;
        }
    }
}
