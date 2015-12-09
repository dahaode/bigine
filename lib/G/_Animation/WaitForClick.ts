/**
 * 定义等待点击动画组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      G/_Animation/WaitForClick.ts
 */

/// <reference path="../Animation.ts" />
/// <reference path="../Event/Click.ts" />

namespace G {
    import Ev = __Bigine_Event;

    export class WaitForClick extends Animation {
        /**
         * 功能函数。
         */
        private _f: Ev.IEventListener<Core.ISprite>;

        /**
         * 中止函数。
         */
        private _r: () => void;

        /**
         * 构造函数。
         */
        constructor(callback?: Ev.IEventListener<Core.ISprite>) {
            super(Infinity);
            this._f = callback;
        }

        /**
         * 执行。
         */
        public $p(element: Core.ISprite, elapsed: number, done: () => void): void {
            if (1 == elapsed) {
                var type: string = '$click',
                    handler: Ev.IEventListener<Core.ISprite> = (event: Event.Click) => {
                        if (this._f)
                            this._f.call(undefined, event);
                        this._r();
                    };
                this._r = () => {
                    element.removeEventListener(type, handler);
                    done();
                };
                element.addEventListener(type, handler);
            }
        }

        /**
         * 中止。
         */
        public $h(): void {
            if (this._r)
                this._r();
        }
    }
}
