/**
 * 定义背景音乐（定义）标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Definition/DefBGM.ts
 */

/// <reference path="Entity.ts" />
/// <reference path="../IBGM.ts" />
/// <reference path="Audio.ts" />

module Tag {
    export class DefBGM extends Entity implements IBGM {
        /**
         * 获取标签名称。
         */
        gN(): string {
            return 'DefBGM';
        }

        /**
         * 获取类型。
         */
        gT(): Core.IEpisode.Entity {
            return Core.IEpisode.Entity.BGM;
        }

        /**
         * 获取资源。
         */
        o(): Runtime.IResource {
            return (<Audio> this.$q('Audio')[0]).o();
        }
    }
}
