/**
 * 声明（作品）事件宿主接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Structure/ISceneHost.ts
 */

/// <reference path="IScene.ts" />
/// <reference path="../../Util/Q.ts" />
/// <reference path="../../Runtime/IRuntime.ts" />

module Tag {
    export interface ISceneHost {
        /**
         * 添加事件。
         */
        a(scene: IScene): ISceneHost;

        /**
         * 播放。
         */
        p(type: IScene.Type, runtime: Runtime.IRuntime): Util.Q<Runtime.IRuntime>;
    }
}
