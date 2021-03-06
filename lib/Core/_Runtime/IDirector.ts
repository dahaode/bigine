
/**
 * 声明（运行时）场效调度器接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Runtime/IDirector.ts
 */

/// <reference path="../_Resource/IResource.ts" />
/// <reference path="IRuntime.ts" />
/// <reference path="../_Tag/IPointTag.ts" />
/// <reference path="../_Tag/IOptionTag.ts" />

namespace Core {
    import Util = __Bigine_Util;

    export interface IDirector {
        /**
         * 预加载指定资源组。
         *
         * @param resources 一个（作品）事件所包含地所有资源
         */
        c(resources: IResource<string | HTMLImageElement>[][], visible?: boolean): Promise<void>;

        /**
         * 加载动画。
         */
        Init(loaded: boolean): Promise<IRuntime>;

        /**
         * 绘制加载动画。
         */
        drawInit(isWechat: boolean): Promise<IRuntime>;

        /**
         * 作者Logo。
         */
        Author(title: string, author: string): Promise<IRuntime>;

        /**
         * 开场动画。
         */
        OP(start: boolean, title: string): Promise<IRuntime>;

        /**
         * 完结动画。
         */
        ED(): Promise<IRuntime>;

        /**
         * 失败动画。
         */
        FAIL(): Promise<IRuntime>;

        /**
         * 人物出场。
         */
        charOn(resource: IResource<HTMLImageElement>, position: IDirector.Position): Promise<IRuntime>;

        /**
         * 人物离场。
         */
        charOff(position: IDirector.Position): Promise<IRuntime>;

        /**
         * 设置人物。
         */
        charSet(resource: IResource<HTMLImageElement>, position: IDirector.Position): Promise<IRuntime>;

        /**
         * 人物移动。
         */
        charMove(from: IDirector.Position, to: IDirector.Position): Promise<IRuntime>;

        /**
         * 某白。
         */
        words(words: string, theme: string, who?: string, avatar?: IResource<HTMLImageElement>): Promise<IRuntime>;

        /**
         * 提示。
         */
        tip(words: string): Promise<IRuntime>;

        /**
         * 评分动画。
         */
        stars(rank: IDirector.Stars, grade: string, value: string): Promise<IRuntime>;

        /**
         * 播放 背景音乐 / 环境音乐。
         */
        playMusic(type: Core.IResource.Type, resource?: IResource<string>, vol?: number): Promise<IRuntime>;

        /**
         * 播放音效。
         */
        playSE(resource?: IResource<string>, vol?: number): Promise<IRuntime>;

        /**
         * 设置音量。
         */
        volumeSet(type: Core.IResource.Type, vol: number): Promise<IRuntime>;

        /**
         * 关闭特写。
         */
        hideCG(): Promise<IRuntime>;

        /**
         * 展示特写。
         */
        showCG(resource: IResource<HTMLImageElement>): Promise<IRuntime>;

        /**
         * 设置房间。
         */
        asRoom(resource: IResource<HTMLImageElement>, time?: boolean, map?: boolean): Promise<IRuntime>;

        /**
         * 设置地图。
         */
        asMap(points: Util.IHashTable<IPointTag>): Promise<IRuntime>;

        /**
         * 关灯（落幕）。
         */
        lightOff(): Promise<IRuntime>;

        /**
         * 开灯（开幕）。
         */
        lightOn(): Promise<IRuntime>;

        /**
         * 选择。
         */
        choose(options: IOptionTag[], time: number, answer: string): Promise<IRuntime>;

        /**
         * 重置。
         */
        reset(): Promise<IRuntime>;

        /**
         * （读档继续时）设置特写。
         */
        setCG(resource: IResource<HTMLImageElement>): Promise<IRuntime>;

        /**
         * 停顿。
         */
        pause(milsec: number): Promise<IRuntime>;

        /**
         * 切幕动画。
         */
        curtain(name: string, secend?: number): Promise<IRuntime>;

        /**
         * 移动镜头。
         */
        cameraMove(mx: number, my: number, ms: number): Promise<IRuntime>;

        /**
         * 放大/缩小镜头。
         */
        cameraZoom(mx: number, my: number, ms: number, scale: number): Promise<IRuntime>;

        /**
         * 抖动镜头。
         */
        cameraShake(time: number, offset: number): Promise<IRuntime>;

        /**
         * 状态栏开/关。
         */
        status(onoff: boolean): Promise<IRuntime>;

        /**
         * 神态动画。
         */
        expression(name: string): Promise<IRuntime>;

        /**
         * 全屏文本 开 / 关。
         */
        fullWords(onoff: boolean): Promise<IRuntime>;

        /**
         * 清除全屏文本。
         */
        fullClean(): Promise<IRuntime>;

        /**
         * 隐藏全屏文本。
         */
        fullHide(): Promise<IRuntime>;

        /**
         * 特效。
         */
        weather(onoff: boolean, type: string): Promise<IRuntime>;
    }

    export namespace IDirector {
        /**
         * 位置。
         */
        export enum Position {
            /**
             * 最左。
             */
            LLeft = 1,
            /**
             * 左。
             */
            Left,
            /**
             * 左中。
             */
            CLeft,
            /**
             * 中。
             */
            Center,
            /**
             * 右中。
             */
            CRight,
            /**
             * 右。
             */
            Right,
            /**
             * 最右。
             */
            RRight
        }

        /**
         * 评分星级。
         */
        export enum Stars {
            /**
             * 及格。
             */
            OK,
            /**
             * 优秀。
             */
            Awesome,
            /**
             * 完美。
             */
            Perfect,
            /**
             * 超绝。
             */
            Superb,
            /**
             * 传奇。
             */
            Legend
        }
    }
}
