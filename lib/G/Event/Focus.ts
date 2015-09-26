/**
 * 定义画面聚焦（鼠标移入）事件组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      G/Event/Focus.ts
 */

/// <reference path="MouseEvent.ts" />

namespace G {
    export namespace Event {
        export class Focus extends MouseEvent {
            /**
             * 获取类型。
             */
            public gT(): string {
                return '$focus';
            }
        }
    }
}
