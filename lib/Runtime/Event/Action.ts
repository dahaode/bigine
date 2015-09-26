/**
 * 定义（运行时）关键帧播报事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/Event/Action.ts
 */

/// <reference path="Event.ts" />
/// <reference path="IActionMetas.ts" />

namespace Runtime {
    export namespace Event {
        export class Action extends Event<Core.IIdableTag> {
            /**
             * 编号。
             */
            public id: string;

            /**
             * 类型。
             */
            public kind: string;

            /**
             * 构造函数。
             */
            constructor(metas: IActionMetas) {
                super(metas);
                this.id = metas.target.gI();
                this.kind = metas.target.gN().toLowerCase();
            }

            /**
             * 获取类型。
             */
            public gT(): string {
                return 'action';
            }
        }
    }
}
