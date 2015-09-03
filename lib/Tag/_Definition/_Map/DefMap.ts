/**
 * 定义地图（定义）标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Definition/_Map/DefMap.ts
 */

/// <reference path="../Entity.ts" />
/// <reference path="BGImage.ts" />

module Tag {
    export class DefMap extends Entity {
        /**
         * 获取标签名称。
         */
        gN(): string {
            return SCHEMA.T['DefMap'];
        }

        /**
         * 获取类型。
         */
        gT(): Core.IEpisode.Entity {
            return Core.IEpisode.Entity.Map;
        }

        /**
         * 获取资源。
         */
        o(): Runtime.IResource {
            return (<BGImage> this.$q(SCHEMA.T['BGImage'])[0]).o();
        }
    }
}
