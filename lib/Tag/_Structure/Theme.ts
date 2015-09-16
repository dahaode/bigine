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

namespace Tag {
    'use strict';

    export class Theme extends Unknown {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Theme';
        }

        /**
         * 加载远端数据。
         */
        public l(callback: Util.ISuccessCallback<Util.IHashTable<any>>): void {
            Util.Remote.get('//s.dahao.de/theme/' + this._c + '/theme.json', callback, (error: Error, status?: any) => {
                throw error;
            });
        }
    }
}
