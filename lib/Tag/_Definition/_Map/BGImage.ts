/**
 * 定义（地图）底图标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Definition/_Map/BGImage.ts
 */

/// <reference path="../Image.ts" />

module Tag {
    export class BGImage extends Image {
        /**
         * 获取标签名称。
         */
        gN(): string {
            return 'BGImage';
        }

        /**
         * 注册（自身实体）至（运行时）作品。
         */
        $r(ep: Runtime.IEpisode): void {
            this._o = ep.r(this._c, Runtime.IResource.Type.Room);
        }
    }
}
