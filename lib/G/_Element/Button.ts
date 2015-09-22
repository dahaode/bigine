/**
 * 定义画面按钮元素组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      G/_Element/Stage.ts
 */

/// <reference path="Sprite.ts" />
/// <reference path="../../Core/_G/IButton.ts" />

namespace G {
    'use strict';

    export class Button extends Sprite implements Core.IButton {
        /**
         * 绑定功能。
         */
        public b(callback: () => void, hover?: Element, defaults?: Element): Button {
            if (defaults)
                this.a(defaults);
            if (hover)
                this.a(hover.o(0));
            return <Button> this.addEventListener('$focus', () => {
                this.$f();
                if (defaults)
                    defaults.o(0);
                if (hover)
                    hover.o(1);
            }).addEventListener('$blur', () => {
                this.$f();
                if (defaults)
                    defaults.o(1);
                if (hover)
                    hover.o(0);
            }).addEventListener('$click', callback);
        }
    }
}
