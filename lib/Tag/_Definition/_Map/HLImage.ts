/**
 * 定义（地图交互点）高亮图标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Definition/_Map/HLImage.ts
 */

/// <reference path="../Image.ts" />

namespace Tag {
    'use strict';

    export class HLImage extends Image {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'HLImage';
        }

        /**
         * 注册（自身实体）至（运行时）作品。
         */
        public $r(ep: Core.IEpisode): void {
            this._o = ep.r(this._c, Core.IResource.Type.Map);
        }
    }
}
