/**
 * 定义画面鼠标移动事件组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      G/Event/MouseMove.ts
 */

/// <reference path="MouseEvent.ts" />

namespace G {
    'use strict';

    export namespace Event {
        export class MouseMove extends MouseEvent {
            /**
             * 获取类型。
             */
            public gT(): string {
                return '$mouse.move';
            }
        }
    }
}
