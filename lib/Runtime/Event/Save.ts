/**
 * 定义（运行时）存档事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/Event/Save.ts
 */

/// <reference path="../../Core/Event.ts" />
/// <reference path="ISaveMetas.ts" />

module Runtime.Event {
    export class Save extends Core.Event<IStates> {
        /**
         * 存档标题。
         */
        title: string;

        /**
         * 存档数据。
         */
        data: Util.IHashTable<any>;

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
        gT(): string {
            return 'save';
        }
    }
}
