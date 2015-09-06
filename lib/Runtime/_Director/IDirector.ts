/**
 * 声明（运行时）场效调度器接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/_Director/IDirector.ts
 */

/// <reference path="../_Resource/IResource.ts" />
/// <reference path="../../Tag/_Action/IAction.ts" />
/// <reference path="../../Util/Q.ts" />

module Runtime {
    export interface IDirector {
        /**
         * 人物出场。
         */
        charOn(resource: IResource, position: Tag.IAction.Position): Util.Q<IRuntime>;

        /**
         * 人物离场。
         */
        charOff(position: Tag.IAction.Position): Util.Q<IRuntime>;

        /**
         * 设置人物。
         */
        charSet(resource: IResource, position: Tag.IAction.Position): Util.Q<IRuntime>;

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
    }
}
