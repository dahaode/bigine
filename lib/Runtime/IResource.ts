/**
 * 声明（运行时）资源（如：图片、音频等）组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/IResource.ts
 */

/// <reference path="../Util/Q.ts" />

namespace Runtime {
    'use strict';

    export interface IResource {
        // new (uri: string, type: IResource.Type): IResource;

        /**
         * 获取 DOM 对象。
         */
        o(): Promise<string | HTMLImageElement>;
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
            Raw
        }
    }
}
