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
/// <reference path="../Event/MouseEvent.ts" />
/// <reference path="../_Animation/FadeIn.ts" />
/// <reference path="../_Animation/FadeOut.ts" />

namespace G {
    import Util = __Bigine_Util;

    export class Button extends Sprite implements Core.IButton {
        /**
         * 绑定功能。
         */
        public b(callback: Util.IEventListener<Button>, hover?: Element, defaults?: Element): Button {
            if (defaults)
                this.a(defaults.o(1));
            if (hover)
                this.a(hover.o(0));
            var animes: Fade[] = [],
                anime: Fade;
            return <Button> this.addEventListener('$focus', () => {
                Util.each(animes, (animation: Animation) => {
                    animation.h();
                });
                animes = [];
                if (hover) {
                    anime = new FadeIn(250);
                    animes.push(anime);
                    hover.p(anime);
                }
                if (defaults) {
                    anime = new FadeOut(250);
                    animes.push(anime);
                    defaults.p(anime);
                }
            }).addEventListener('$blur', () => {
                Util.each(animes, (animation: Animation) => {
                    animation.h();
                });
                animes = [];
                if (hover) {
                    anime = new FadeOut(250);
                    animes.push(anime);
                    hover.p(anime);
                }
                if (defaults) {
                    anime = new FadeIn(250);
                    animes.push(anime);
                    defaults.p(anime);
                }
            }).addEventListener('$click', (event: Util.IEvent<Button>) => {
                Util.each(animes, (animation: Animation) => {
                    animation.h();
                });
                if (hover)
                    hover.o(1);
                if (defaults)
                    defaults.o(0);
                callback(event);
            });
        }
    }
}
