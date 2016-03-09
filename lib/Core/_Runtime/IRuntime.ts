/**
 * 声明运行时接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Runtime/IRuntime.ts
 */

/// <reference path="../_Tag/IRootTag.ts" />
/// <reference path="IStates.ts" />
/// <reference path="IDirector.ts" />

namespace Core {
    import Util = __Bigine_Util;

    // IEmittable:addEventListener()
    // IEmittable:removeEventListener()
    // IEmittable:dispatchEvent()
    export interface IRuntime extends Util.IEmittable {
        // new (ep: Tag.IRoot): IRuntime;

        /**
         * 获取作品组件。
         */
        gE(): IEpisode;

        /**
         * 获取日志组件。
         */
        gL(): Util.ILogger;

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
        destroy(): Promise<IRuntime>;

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
         * 是否正在播放。
         */
        isPlaying(): boolean;

        /**
         * 播报当前事件。
         */
        s(scene: ISceneTag, title: string, actions: string[]): IRuntime;

        /**
         * 播报当前关键帧。
         */
        a(action: IIdableTag): IRuntime;

        /**
         * 是否中止播放。
         */
        gH(): boolean;

        /**
         * 声明时序流。
         */
        t(flow: () => IRuntime | Thenable<IRuntime>): IRuntime;

        /**
         * 设置作品标题。
         */
        title(title: string): IRuntime;

        /**
         * 设置作者。
         */
        author(title: string): IRuntime;

        /**
         * 读取存档。
         */
        l(id?: string): void;

        /**
         * 绑定视图。
         */
        bind(viewport: HTMLElement): IRuntime;

        /**
         * 连载模式。
         */
        series(): IRuntime;
    }
}
