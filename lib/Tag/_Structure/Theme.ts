/**
 * 定义主题标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Structure/Theme.ts
 */

/// <reference path="../Unknown.ts" />
/// <reference path="../../Util/Remote.ts" />

module Tag {
    export class Theme extends Unknown {
        /**
         * 获取标签名称。
         */
        gN(): string {
            return 'Theme';
        }

        /**
         * 加载远端数据。
         */
        l(callback: Util.ISuccessCallback<any>): void {
            Util.Remote.get('//s.dahao.de/theme/' + this._c + '/theme.json', callback, (error, status?) => {
                throw error;
            });
        }
    }
}
