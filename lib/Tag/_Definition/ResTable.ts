/**
 * 定义资源表抽象标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Definition/ResTable.ts
 */

/// <reference path="../Unknown.ts" />

namespace Tag {
    import Util = __Bigine_Util;

    export class ResTable extends Unknown {
        /**
         * 图片资源。
         */
        protected _o: Util.IHashTable<Core.IResource<HTMLImageElement>>;

        /**
         * 构造函数。
         */
        constructor(params: string[], content: string, children: Unknown[], lineNo?: number) {
            super(params, content, children, lineNo);
            this._o = {};
        }

        /**
         * 获取资源。
         */
        public o(id: string): Core.IResource<HTMLImageElement> {
            if (!this._r)
                throw new E(E.DEF_EPISODE_NOT_REGISTERED, this._l);
            return this._o[id] || this._o['默认'];
        }
    }
}
