/**
 * 定义资源表抽象标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Definition/ResTable.ts
 */

/// <reference path="../Unknown.ts" />

module Tag {
    export class ResTable extends Unknown {
        /**
         * 图片资源。
         */
        _o: Util.IHashTable<Runtime.IResource>;

        /**
         * 构造函数。
         */
        constructor(params: string[], content: string, children: Unknown[], lineNo?: number) {
            this._o = {};
            super(params, content, children, lineNo);
        }

        /**
         * 获取资源。
         */
        o(id: string): Runtime.IResource {
            if (!this._b)
                throw new E(E.DEF_EPISODE_NOT_BINDED, this._l);
            return this._o[id] || this._o[''];
        }
    }
}
