/**
 * 定义（运行时）读档事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Ev/_Runtime/Load.ts
 */

/// <reference path="../Event.ts" />
/// <reference path="ILoadMetas.ts" />

namespace Ev {
    import Util = __Bigine_Util;

    export class Load extends Event<Core.IStates> {
        /**
         * 数据导入回调函数。
         */
        public callback: (data: Util.IHashTable<any>) => void;

        /**
         * 存档编号。
         */
        public id: string;

        /**
         * 构造函数。
         */
        constructor(metas: ILoadMetas) {
            super(metas);
            this.callback = metas.callback;
            this.id = metas.id;
        }

        /**
         * 获取类型。
         */
        public gT(): string {
            return 'load';
        }
    }
}
