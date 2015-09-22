/**
 * 声明运行时接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Runtime/IRuntime.ts
 */

/// <reference path="../_Event/IEmittable.ts" />
/// <reference path="../_Tag/IRootTag.ts" />
/// <reference path="ILogger.ts" />
/// <reference path="IStates.ts" />
/// <reference path="IDirector.ts" />

namespace Core {
    'use strict';

    export interface IRuntime extends IEmittable {
        // new (ep: Tag.IRoot): IRuntime;

        /**
         * 获取作品组件。
         */
        gE(): IEpisode;

        /**
         * 获取日志组件。
         */
        gL(): ILogger;

        /**
         * 获取数据状态组件。
         */
        gS(): IStates;

        /**
         * 获取场效调度器组件。
         */
        gD(): IDirector;

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

        /**
         * 设置或获取自动播放设置。
         */
        auto(auto?: boolean): boolean;

        /**
         * 设置或获取音量。
         */
        volume(volume?: number): number;

        /**
         * 播报当前事件。
         */
        s(scene: ISceneTag, title: string, actions: string[]): void;
    }
}
