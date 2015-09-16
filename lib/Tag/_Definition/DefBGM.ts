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

namespace Tag {
    'use strict';

    export class DefBGM extends Entity implements IBGM {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'DefBGM';
        }

        /**
         * 获取类型。
         */
        public gT(): Core.IEpisode.Entity {
            return Core.IEpisode.Entity.BGM;
        }

        /**
         * 获取资源。
         */
        public o(): Runtime.IResource {
            return (<Audio> this.$q('Audio')[0]).o();
        }
    }
}
