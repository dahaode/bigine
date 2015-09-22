/**
 * 定义画面点击事件组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      G/Event/Click.ts
 */

/// <reference path="MouseEvent.ts" />

namespace G {
    'use strict';

    export namespace Event {
        export class Click extends MouseEvent {
            /**
             * 获取类型。
             */
            public gT(): string {
                return '$click';
            }
        }
    }
}
