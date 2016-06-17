/**
 * 定义画面调度选择组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Sprite/Choose.ts
 */

/// <reference path="Sprite.ts" />
/// <reference path="../Resource/Resource.ts" />
/// <reference path="../Ev/_Sprite/Choose.ts" />

namespace Sprite {
    import Util = __Bigine_Util;
    import G = __Bigine_C2D;

    export class Choose extends Sprite implements Core.IChoose {
        /**
         * 配置。
         */
        private _c: Util.IHashTable<any>;

        /**
         * 选择Button。
         */
        private _bn: G.Button[];

        /**
         * 记录选择Button的索引ID。
         */
        private _bi: number;

        /**
         * 键盘事件监听函数。
         */
        private _ke: (event: KeyboardEvent) => void;

        /**
         * 构造函数。
         */
        constructor(id: string, theme: Util.IHashTable<any>) {
            let w: number = 1280,
                h: number = 720,
                raw: Core.IResource.Type = Core.IResource.Type.Raw,
                rr: typeof Resource.Resource = Resource.Resource,
                url: string = '//s.dahao.de/theme/';
            super(0, 0, w, h);
            this._rr = [
                rr.g<HTMLImageElement>(url + theme['back']['i'], raw),
                rr.g<HTMLImageElement>(url + theme['back']['ih'], raw),
                rr.g<HTMLImageElement>(url + theme['radish']['i'], raw)
            ];
            this._c = theme;
            this._bn = [];
            this._bi =
            this._ke = undefined;
            this.o(0);
        }

        /**
         * 配置。
         */
        public u(options: Core.IOptionTag[], stage: G.Stage): Choose {
            let margin: number = this._c['m'],
                _back: Util.IHashTable<any> = this._c['back'],
                _text: Util.IHashTable<any> = this._c['text'],
                _count: Util.IHashTable<any> = this._c['count'],
                _radish: Util.IHashTable<any> = this._c['radish'],
                opts: Core.IOptionTag[] = options.slice(0, 6),
                x: number = 0 | (1280 - _back['w']) / 2,
                y: number = 0 | (720 - opts.length * _back['h'] - (opts.length - 1) * margin) / 2;
            this.c();
            this._bn = [];
            this._bi = undefined;
            Util.each(options.slice(0, 6), (option: Core.IOptionTag) => {
                let text: G.Text = new G.Text(x + _text['x'], y + _text['y'], _text['w'], _text['h'], _text['s'], _text['lh'], G.Text.Align.Center)
                    .tc(_text['c'])
                    .ts(_text['ss']);
                let money: number = option.gA() ? 0 : option.gM();
                let btn: G.Button = new G.Button(x, y, _back['w'], _back['h'])
                    .b(() => {
                        this.dispatchEvent(new Ev.Choose({
                            target: this,
                            choice: option
                        }));
                    }, new G.Image(this._rr[1].o(), x, y, _back['w'], _back['h'], true), new G.Image(this._rr[0].o(), x, y, _back['w'], _back['h'], true));
                this._bn.push(btn);
                this.$w(text, option.gT(), _text['ch']);
                this.a(btn).a(text);
                if (money) {
                    let xC: number = x + _text['x'] + _text['w'] - _count['w'],
                        yC: number = y + _text['y'] + 0.5 * _back['h'],
                        xR: number = x + _text['x'] + _text['w'] - _count['w'] - _radish['w'] - 10,
                        yR: number = y + _text['y'] + 0.5 * (_back['h'] - _radish['h']),
                        count: G.Text = new G.Text(xC, yC, _count['w'], _count['h'], _count['s'], _count['lh'], G.Text.Align.Left)
                            .tc(_count['c'])
                            .ts(_count['ss']);
                    this.$w(count, money.toString(), _count['ch']);
                    this.a(new G.Image(this._rr[2].o(), xR, yR, _radish['w'], _radish['h'], true))
                        .a(count);
                }
                y += _back['h'] + margin;
            });
            this.ev(options, stage);
            return this;
        }

        /**
         * 添加按键事件。
         */
        protected ev(options: Core.IOptionTag[], stage: G.Stage): void {
            this._ke = (event: KeyboardEvent) => {
                let old: number = this._bi;
                switch (event.keyCode) {
                    case 38: // Up
                        if (!this._bi) {
                            this._bi = 0;
                        } else {
                            this._bi--;
                        }
                        break;
                    case 40: // Down
                        if (this._bi == undefined) {
                            this._bi = 0;
                        } else if (this._bi < this._bn.length - 1) {
                            this._bi++;
                        }
                        break;
                    case 13: // Enter
                        if (this._bi != undefined) {
                            this.dispatchEvent(new Ev.Choose({
                                target: this,
                                choice: options[this._bi]
                            }));
                        }
                        return;
                }
                if (old != this._bi) {
                    let btn: G.Button = this._bn[this._bi],
                        bound: G.IBounds = btn.gB();
                    stage.$s(bound.x, bound.y);
                    if (old != undefined && this._bn[old]) {
                        this._bn[old].dispatchEvent(new G.SpriteBlurEvent({
                            target: this._bn[old],
                            x: bound.x,
                            y: bound.y,
                            from: undefined,
                            fromX: 0,
                            fromY: 0,
                            stage: stage
                        }));
                    }
                    if (this._bn[this._bi]) {
                        this._bn[this._bi].dispatchEvent(new G.SpriteFocusEvent({
                            target: this._bn[this._bi],
                            x: bound.x,
                            y: bound.y,
                            from: undefined,
                            fromX: 0,
                            fromY: 0,
                            stage: stage
                        }));
                    }
                }

                event.preventDefault();
            };
            window.addEventListener('keydown', this._ke);
        }

        /**
         * 隐藏。
         */
        public h(duration?: number): Promise<Sprite> {
            window.removeEventListener('keydown', this._ke);
            this._bn = [];
            this._bi = undefined;
            return super.h(duration);
        }
    }
}
