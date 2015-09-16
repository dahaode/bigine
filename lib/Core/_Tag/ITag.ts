/**
 * 声明标签接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Core/_Tag/ITag.ts
 */

/// <reference path="../_Runtime/IEpisode.ts" />

namespace Core {
    'use strict';

    export interface ITag {
        // new (params: string[], content: string, children: ITag[], lineNo: number): ITag;

        /**
         * 获取行号。
         */
        gL(): number;

        /**
         * 获取名称。
         */
        gN(): string;

        /**
         * 注册（自身实体）至作品。
         */
        r(ep: IEpisode): void;

        /**
         * 绑定作品（实体）。
         */
        b(ep: IEpisode): void;

        /**
         * 转化为（中文）剧本（代码）。
         */
        toString(): string;

        /**
         * 转化为运行时（Javascript）代码。
         */
        toJsrn(): string;

        /**
         * 获取父标签。
         */
        gU(): ITag;
    }
}
