/**
 * 声明（运行时）资源（如：图片、音频等）组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Resource/IResource.ts
 */

namespace Core {
    export interface IResource<T> {
        // new (uri: string, type: IResource.Type): IResource;

        /**
         * 获取真实 URL 。
         */
        l(): string;

        /**
         * 获取 DOM 对象。
         */
        o(): Promise<T>;

        /**
         * 加载完成时通知。
         */
        w(callback: (value: T) => void): IResource<T>;
    }

    export namespace IResource {
        /**
         * 类型。
         */
        export enum Type {
            /**
             * 房间（图片）。
             */
            Room,
            /**
             * 地图（高亮图片）。
             */
            Map,
            /**
             * 人物立绘（图片）。
             */
            Pose,
            /**
             * 人物头像（图片）。
             */
            Avatar,
            /**
             * 特写（图片）。
             */
            CG,
            /**
             * 背景音乐。
             */
            BGM,
            /**
             * 音效。
             */
            SE,
            /**
             * 原生（图片）。
             */
            Raw,
            /**
             * 环境音乐。
             */
            ESM,
        }

        /*
         * guid 正则表达式
         */
        export const REGGUID: RegExp = /^[\d0-f]{8}-[\d0-f]{4}-[\d0-f]{4}-[\d0-f]{4}-[\d0-f]{12}$/i;
    }
}
