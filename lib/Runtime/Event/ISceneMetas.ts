/**
 * 声明（运行时）剧情事件播报事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/Event/ISceneMetas.ts
 */

/// <reference path="../../Core/_Event/IEventMetas.ts" />
/// <reference path="../../Core/_Tag/ISceneTag.ts" />

namespace Runtime {
    export namespace Event {
        export interface ISceneMetas extends Core.IEventMetas<Core.ISceneTag> {
            /**
             * 标题。
             */
            title: string;

            /**
             * 动作编号集合。
             */
            actions: string[];
        }
    }
}
