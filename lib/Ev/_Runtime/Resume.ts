/**
 * 定义（运行时）继续游戏事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/Resume.ts
 */

/// <reference path="../Event.ts" />
/// <reference path="IResumeMetas.ts" />

namespace Ev {
    export class Resume extends Event<Core.IEpisode> {
        /**
         * 构造函数。
         */
        constructor(metas: IResumeMetas) {
            super(metas);
        }

        /**
         * 获取类型。
         */
        public gT(): string {
            return 'resume';
        }
    }
}
