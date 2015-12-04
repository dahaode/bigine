/**
 * 定义（运行时）查询存档数据事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/Event/Query.ts
 */

/// <reference path="Event.ts" />
/// <reference path="IQueryMetas.ts" />

namespace Runtime {
    import Util = __Bigine_Util;

    export namespace Event {
        export class Query extends Event<Core.IStates> {
            /**
             * 数据导入回调函数。
             */
            public callback: (slots: Util.IHashTable<[string, number]>) => void;

            /**
             * 构造函数。
             */
            constructor(metas: IQueryMetas) {
                super(metas);
                this.callback = metas.callback;
            }

            /**
             * 获取类型。
             */
            public gT(): string {
                return 'query';
            }
        }
    }
}
