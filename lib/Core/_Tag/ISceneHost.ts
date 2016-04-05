/**
 * 声明（作品）事件宿主接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Tag/ISceneHost.ts
 */

/// <reference path="ISceneTag.ts" />

namespace Core {
    export interface ISceneHost {
        /**
         * 添加事件。
         */
        a(scene: ISceneTag): ISceneHost;

        /**
         * 播放。
         */
        p(type: ISceneTag.Type, runtime: IRuntime, name?: string): Promise<IRuntime>;
    }
}
