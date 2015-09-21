/**
 * 定义音效（定义）标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Definition/DefSE.ts
 */

/// <reference path="../Entity.ts" />
/// <reference path="Audio.ts" />

namespace Tag {
    'use strict';

    export class DefSE extends Entity {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'DefSE';
        }

        /**
         * 获取类型。
         */
        public gT(): Core.IEpisode.Entity {
            return Core.IEpisode.Entity.SE;
        }

        /**
         * 获取资源。
         */
        public o(): Core.IResource<string> {
            return (<Audio> this.$q('Audio')[0]).o();
        }
    }
}
