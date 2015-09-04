/**
 * 定义（地图交互点）高亮图标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Definition/_Map/HLImage.ts
 */

/// <reference path="../Image.ts" />

module Tag {
    export class HLImage extends Image {
        /**
         * 获取标签名称。
         */
        gN(): string {
            return SCHEMA.T['HLImage'];
        }

        /**
         * 注册（自身实体）至（运行时）作品。
         */
        $r(ep: Runtime.IEpisode): void {
            this._o = ep.r(this._c, Runtime.IResource.Type.Map);
        }
    }
}
