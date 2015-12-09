/**
 * 定义画面抽象鼠标事件组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      G/Event/MouseEvent.ts
 */

/// <reference path="IMouseEventMetas.ts" />

namespace G {
    import Ev = __Bigine_Event;

    export namespace Event {
        export class MouseEvent implements Ev.IEvent<Core.ISprite> {
            /**
             * 事件触发对象。
             */
            public target: Core.ISprite;

            /**
             * X 轴座标。
             */
            public x: number;

            /**
             * Y 轴座标。
             */
            public y: number;

            /**
             * 事件源对象。
             */
            public from: Core.ISprite;

            /**
             * 源 X 轴座标。
             */
            public fromX: number;

            /**
             * 源 Y 轴座标。
             */
            public fromY: number;

            /**
             * 舞台对象。
             */
            public stage: Core.IStage;

            /**
             * 构造函数。
             */
            constructor(metas: IMouseEventMetas) {
                this.target = metas.target;
                this.x = metas.x;
                this.y = metas.y;
                this.from = metas.from;
                this.fromX = metas.fromX;
                this.fromY = metas.fromY;
                this.stage = metas.stage;
            }

            /**
             * 获取类型。
             */
            public gT(): string {
                return '';
            }
        }
    }
}
