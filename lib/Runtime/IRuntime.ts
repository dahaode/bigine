/**
 * 声明运行时接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/IRuntime.ts
 */

/// <reference path="../Core/_Event/IEmittable.ts" />
/// <reference path="../Tag/_Structure/IRoot.ts" />
/// <reference path="ILogger.ts" />
/// <reference path="IStates.ts" />

module Runtime {
    // Core.IEmittable:addEventListener()
    // Core.IEmittable:removeEventListener()
    // Core.IEmittable:dispatchEvent()
    export interface IRuntime extends Core.IEmittable {
        // new (ep: Tag.IRoot): IRuntime;

        /**
         * 获取日志组件。
         */
        gL(): ILogger;

        /**
         * 获取数据状态组件。
         */
        gS(): IStates;

        /**
         * 初始化。
         */
        setup(): IRuntime;

        /**
         * 播放。
         */
        play(): IRuntime;

        /**
         * 重新播放。
         */
        replay(): IRuntime;

        /**
         * 销毁。
         */
        destroy(): void;

        /**
         * DOM 定位修正。
         */
        fix(): void;
    }
}
