/**
 * 定义（运行时）读档继续事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/Event/Resume.ts
 */

/// <reference path="Event.ts" />
/// <reference path="IResumeMetas.ts" />

namespace Runtime {
    'use strict';

    export namespace Event {
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
}
