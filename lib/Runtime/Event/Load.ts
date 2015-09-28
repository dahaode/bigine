/**
 * 定义（运行时）读档事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/Event/Load.ts
 */

/// <reference path="Event.ts" />
/// <reference path="ILoadMetas.ts" />

namespace Runtime {
    export namespace Event {
        export class Load extends Event<Core.IStates> {
            /**
             * 存档标题。
             */
            public title: string;

            /**
             * 数据导入回调函数。
             */
            public callback: (data: Util.IHashTable<any>) => void;

            /**
             * 构造函数。
             */
            constructor(metas: ILoadMetas) {
                super(metas);
                this.callback = metas.callback;
            }

            /**
             * 获取类型。
             */
            public gT(): string {
                return 'load';
            }
        }
    }
}
