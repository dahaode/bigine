/**
 * 定义评分事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/Video.ts
 */

/// <reference path="../Event.ts" />
/// <reference path="IVideoMetas.ts" />

namespace Ev {
    export class Video extends Event<Core.IEpisode> {
        /**
         * 等级。
         */
        private type: string;
        /**
         * 分数。
         */
        private uri: string;
        /**
         * 分数。
         */
        private volume: number;
        /**
         * 构造函数。
         */
        constructor(metas: IVideoMetas) {
            super(metas);
            this.type = metas.type;
            this.uri = metas.uri;
            this.volume = metas.volume;
        }

        /**
         * 获取类型。
         */
        public gT(): string {
            return 'video';
        }
    }
}
