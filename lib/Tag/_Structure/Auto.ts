/**
 * 定义自动播放标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Structure/Auto.ts
 */

/// <reference path="../Unknown.ts" />

module Tag {
    export class Auto extends Unknown {
        /**
         * 获取标签名称。
         */
        gN(): string {
            return SCHEMA.T['Auto'];
        }
    }
}
