/**
 * 定义（画面调度）设置菜单音量调节事件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Sprite/SetVolume.ts
 */

/// <reference path="../Event.ts" />
/// <reference path="ISetVolumeMetas.ts" />

namespace Ev {
    export class SetVolume extends Event<Core.ISet> {
        /**
         * 音乐音量。
         */
        public bVolume: number;

        /**
         * 音效音量。
         */
        public eVolume: number;

        /**
         * 构造函数。
         */
        constructor(metas: ISetVolumeMetas) {
            super(metas);
            this.bVolume = metas.bVolume;
            this.eVolume = metas.eVolume;
        }

        /**
         * 获取类型。
         */
        public gT(): string {
            return 'set.volume';
        }
    }
}
