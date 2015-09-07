/**
 * 声明（运行时）场效调度器接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/IDirector.ts
 */

/// <reference path="IResource.ts" />
/// <reference path="IRuntime.ts" />
/// <reference path="../Util/Q.ts" />
/// <reference path="../Tag/IPoint.ts" />

module Runtime {
    export interface IDirector {
        /**
         * 人物出场。
         */
        charOn(resource: IResource, position: IDirector.Position): Promise<IRuntime>;

        /**
         * 人物离场。
         */
        charOff(position: IDirector.Position): Promise<IRuntime>;

        /**
         * 设置人物。
         */
        charSet(resource: IResource, position: IDirector.Position): Promise<IRuntime>;

        /**
         * 某白。
         */
        words(words: string, theme: Util.IHashTable<any>, who?: string, avatar?: IResource): Promise<IRuntime>;

        /**
         * 开始动画。
         */
        OP(): Promise<IRuntime>;

        /**
         * 完结动画。
         */
        ED(): Promise<IRuntime>;

        /**
         * 失败动画。
         */
        FAIL(): Promise<IRuntime>;

        /**
         * 评分动画。
         */
        stars(rank: IDirector.Stars): Promise<IRuntime>;

        /**
         * 播放背景音乐。
         */
        playBGM(resource: IResource): Promise<IRuntime>;

        /**
         * 关闭特写。
         */
        hideCG(): Promise<IRuntime>;

        /**
         * 展示特写。
         */
        showCG(resource: IResource): Promise<IRuntime>;

        /**
         * 设置房间。
         */
        asRoom(resource: IResource): Promise<IRuntime>;

        /**
         * 设置地图。
         */
        asMap(points: Util.IHashTable<Tag.IPoint>): Promise<IRuntime>;

        /**
         * 关灯（落幕）。
         */
        lightOff(): Promise<IRuntime>;

        /**
         * 开灯（开幕）。
         */
        lightOn(): Promise<IRuntime>;
    }

    export module IDirector {
        /**
         * 位置。
         */
        export enum Position {
            /**
             * 左。
             */
            Left = 1,
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
            Right
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
            Perfect
        }
    }
}
