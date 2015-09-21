/**
 * 定义音源标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Definition/Audio.ts
 */

/// <reference path="../Unknown.ts" />

namespace Tag {
    'use strict';

    export class Audio extends Unknown {
        /**
         * 音频资源。
         */
        protected _o: Core.IResource<string>;

        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Audio';
        }

        /**
         * 注册（自身实体）至（运行时）作品。
         */
        public $r(ep: Core.IEpisode): void {
            this._o = ep.r(this._c, Core.IResource.Type.BGM);
        }

        /**
         * 获取资源。
         */
        public o(): Core.IResource<string> {
            if (!this._r)
                throw new E(E.DEF_EPISODE_NOT_REGISTERED, this._l);
            return this._o;
        }
    }
}
