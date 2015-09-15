/**
 * 定义（运行时）完结事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/Event/End.ts
 */

/// <reference path="../../Core/Event.ts" />
/// <reference path="IEndMetas.ts" />

module Runtime.Event {
    export class End extends Core.Event<IEpisode> {
        /**
         * 构造函数。
         */
        constructor(metas: IEndMetas) {
            super(metas);
        }

        /**
         * 获取类型。
         */
        gT(): string {
            return 'end';
        }
    }
}
