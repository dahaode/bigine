/**
 * 声明（运行时）场效调度器接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/_Director/IDirector.ts
 */

/// <reference path="../_Resource/IResource.ts" />
/// <reference path="../../Util/Q.ts" />

module Runtime {
    export interface IDirector {
        /**
         * 人物出场。
         */
        charOn(resource: IResource, position: IDirector.Position): Util.Q<IRuntime>;

        /**
         * 人物离场。
         */
        charOff(position: IDirector.Position): Util.Q<IRuntime>;

        /**
         * 设置人物。
         */
        charSet(resource: IResource, position: IDirector.Position): Util.Q<IRuntime>;

        /**
         * 某白。
         */
        words(words: string, theme: Util.IHashTable<any>, who?: string, avatar?: IResource): Util.Q<IRuntime>;

        /**
         * 开始动画。
         */
        OP(): Util.Q<IRuntime>;

        /**
         * 完结动画。
         */
        ED(): Util.Q<IRuntime>;

        /**
         * 失败动画。
         */
        FAIL(): Util.Q<IRuntime>;

        /**
         * 评分动画。
         */
        stars(rank: IDirector.Stars): Util.Q<IRuntime>;

        /**
         * 播放背景音乐。
         */
        playBGM(resource: IResource): Util.Q<IRuntime>;

        /**
         * 关闭特写。
         */
        hideCG(): Util.Q<IRuntime>;
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
