/**
 * 定义画面失焦（鼠标移出）事件组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      G/Event/Blur.ts
 */

/// <reference path="MouseEvent.ts" />

namespace G {
    export namespace Event {
        export class Blur extends MouseEvent {
            /**
             * 获取类型。
             */
            public gT(): string {
                return '$blur';
            }
        }
    }
}
