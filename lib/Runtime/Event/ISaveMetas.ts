/**
 * 声明（运行时）存档事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/Event/ISaveMetas.ts
 */

/// <reference path="../../Core/IEventMetas.ts" />
/// <reference path="../IStates.ts" />

namespace Runtime {
    'use strict';

    export namespace Event {
        export interface ISaveMetas extends Core.IEventMetas<IStates> {
            /**
             * 标题。
             */
            title: string;

            /**
             * 数据。
             */
            data: Util.IHashTable<any>;
        }
    }
}
