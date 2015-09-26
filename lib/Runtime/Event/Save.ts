/**
 * 定义（运行时）存档事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/Event/Save.ts
 */

/// <reference path="Event.ts" />
/// <reference path="ISaveMetas.ts" />

namespace Runtime {
    export namespace Event {
        export class Save extends Event<Core.IStates> {
            /**
             * 存档标题。
             */
            public title: string;

            /**
             * 存档数据。
             */
            public data: Util.IHashTable<any>;

            /**
             * 构造函数。
             */
            constructor(metas: ISaveMetas) {
                super(metas);
                this.title = metas.title;
                this.data = metas.data;
            }

            /**
             * 获取类型。
             */
            public gT(): string {
                return 'save';
            }
        }
    }
}
