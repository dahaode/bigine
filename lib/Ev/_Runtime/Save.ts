/**
 * 定义（运行时）存档事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/Save.ts
 */

/// <reference path="../Event.ts" />
/// <reference path="ISaveMetas.ts" />

namespace Ev {
    import Util = __Bigine_Util;

    export class Save extends Event<Core.IStates> {
        /**
         * 存档数据。
         */
        public data: Util.IHashTable<any>;

        /**
         * 是否手动存档。
         */
        public manual: boolean;

        /**
         * 回调函数。
         */
        public callback: (id: string) => void;

        /**
         * 构造函数。
         */
        constructor(metas: ISaveMetas) {
            super(metas);
            this.data = metas.data;
            this.manual = metas.manual;
            this.callback = metas.callback;
        }

        /**
         * 获取类型。
         */
        public gT(): string {
            return 'save';
        }
    }
}
