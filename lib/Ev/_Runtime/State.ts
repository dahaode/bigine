/**
 * 定义（运行时）存档事件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/State.ts
 */

/// <reference path="../Event.ts" />
/// <reference path="IStateMetas.ts" />

namespace Ev {
    import Util = __Bigine_Util;

    export class State extends Event<Core.IStates> {
        /**
         * 向外暴露的数据。
         */
        public data: Util.IHashTable<any>;

        /**
         * 构造函数。
         */
        constructor(metas: IStateMetas) {
            super(metas);
            this.data = metas.data;
        }

        /**
         * 获取类型。
         */
        public gT(): string {
            return 'state';
        }
    }
}
