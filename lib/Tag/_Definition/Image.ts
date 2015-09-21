/**
 * 定义画面标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Definition/Image.ts
 */

/// <reference path="../Unknown.ts" />

namespace Tag {
    'use strict';

    export class Image extends Unknown {
        /**
         * 图片资源。
         */
        protected _o: Core.IResource<HTMLImageElement>;

        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Image';
        }

        /**
         * 注册（自身实体）至（运行时）作品。
         */
        public $r(ep: Core.IEpisode): void {
            this._o = ep.r(this._c, Core.IResource.Type.CG);
        }

        /**
         * 获取资源。
         */
        public o(): Core.IResource<HTMLImageElement> {
            if (!this._r)
                throw new E(E.DEF_EPISODE_NOT_REGISTERED, this._l);
            return this._o;
        }
    }
}
