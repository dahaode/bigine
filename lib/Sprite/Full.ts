/**
 * 定义画面调度全屏文本组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Sprite/Full.ts
 */

/// <reference path="Sprite.ts" />
/// <reference path="../Resource/Resource.ts" />
/// <reference path="../Ev/_Sprite/FullAnimation.ts" />

namespace Sprite {
    import Util = __Bigine_Util;
    import G = __Bigine_C2D;

    export class Full extends Sprite implements Core.IFull {
        /**
         * 对象集合。
         */
        private _x: Util.IHashTable<G.Element | G.TextPhrase>;

        /**
         * 阻塞动画。
         */
        private _h: G.Animation;

        /**
         * 起始文本范围。
         */
        private _be: G.IBounds;

        /**
         * 下一个文本范围。
         */
        private _cb: G.IBounds;

        /**
         * 默认高亮颜色。
         */
        private _c: string;

        /**
         * 文本行数。
         */
        private _tl: number;

        /**
         * 下一个文本首行偏移量 x 。
         */
        private _tx: number;

        /**
         * 离线 Canvas，用于提前计算文字行数。
         */
        private _ct: CanvasRenderingContext2D;

        /**
         * 构造函数。
         */
        constructor(theme: Util.IHashTable<Util.IHashTable<any>>, context: CanvasRenderingContext2D, listen: (ev: Ev.FullAnimation) => void) {
            let _back: Util.IHashTable<any> = theme['back'],
                _text: Util.IHashTable<any> = theme['text'];
            super(theme);
            this._rr = [
                Resource.Resource.g<HTMLImageElement>(_back['i'], Core.IResource.Type.Raw)
            ];
            this._x = {};
            this._cb = <G.IBounds> Util.clone(_text);
            this._be = <G.IBounds> _text;
            this._c = _text['ch'];
            this._tl =
            this._tx = 0;
            this._ct = context;
            this.addEventListener('full.animation', listen);
        }

        protected pI(): Full {
            if (this._pi) return this;
            let _back: Util.IHashTable<any> = this._tm['back'];
            this.a(new G.Sprite(<G.IBounds> _back)
                    .a(new G.Image(this._rr[0].o(), <G.IBounds> _back, true))
                    .a(this._x['f'] = new G.Sprite(<G.IBounds> _back))
                );
            return <Full> super.pI();
        }

        /**
         * 隐藏。
         */
        public h(duration?: number): Promise<Full> {
            if (!this._pi) return super.h(duration);
            if (this._h) {
                this._h.h();
                this._h = undefined;
                this.dispatchEvent(new Ev.FullAnimation({
                    target: this,
                    animation: undefined,
                    type: undefined,
                }));
            }
            return super.h(duration).then(() => {
                this.$c();
                (<G.Sprite> this._x['f']).o(0);
                return this;
            });
        }

        /**
         * 文本。
         */
        public u(clob: string, auto: boolean = false): Promise<Full> {
            this.pI();
            let words: Array<string> = clob.split('\\r'),
                funcs: Array<Function> = [],
                font: string = this._be['s'] + 'px/' + Math.max(this._be['lh'], this._be['s']) + 'px "' + (this._be['ff'] || '') + '", ' + G.TextPhrase.FONT;
            this._ct.canvas.style.letterSpacing = this._be['ls'] + 'px';  // 设置字间距
            Util.each(words, (word: string, index: number) => {
                let bufs: Array<string> = word.split('\\l');
                if (bufs.length == 1) {
                    funcs.push(() => this.every(word, auto, index == words.length - 1));
                } else {
                    let str: string = word.replace(/\\l/g, '')
                        .replace(/\\n/g, '')
                        .replace(/【#[0-9a-fA-F]{6}/g, '')
                        .replace(/【/g, '')
                        .replace(/】/g, '');
                    this._ct.save();
                    this._ct.font = font;
                    let row: number = Math.ceil(this._ct.measureText(str).width / this._be.w);
                    this._ct.restore();
                    if (this._tl + row > this._be['row']) this.$c();        // 预计会有多少行内容，超出最大行，重起绘制
                    Util.each(bufs, (buffer: string, i: number) => {
                        funcs.push(() => this.every(buffer, auto, false, i));
                    });
                }
            });
            return funcs.reduce((previous: Promise<Full>, current: (value: Full) => {} | Thenable<{}>) => {
                return previous.then(current);
            }, Promise.resolve());
        }

        /**
         * 对于分解的话进行处理。
         */
        protected every(clob: string, auto: boolean, wait: boolean, pause: number = -1): Promise<Full> {
            let eRow: number = 0,
                row: number,
                tBound: G.IBounds,
                bBound: G.IBounds = this._be,
                tText: G.Text,
                left: G.Text.Align = G.Text.Align.Left,
                lHeight: number = Math.max(bBound['lh'], bBound['s']),
                font: string = bBound['s'] + 'px/' + lHeight + 'px "' + (bBound['ff'] || '') + '", ' + G.TextPhrase.FONT,
                sClob: string;
            while (/^\\n.*/.test(clob)) {   // 计算开头的空白行行数
                eRow++;
                clob = clob.substr(2);
            }
            if (eRow > 0) {
                this._cb.y += eRow * lHeight;
                this._tl += eRow;
                this._tx = 0;
            } else {
                if (pause > 0 && clob != '') this._cb.y -= lHeight;
            }
            if (clob == '') return Promise.resolve(this);
            sClob = clob.replace(/【#[0-9a-fA-F]{6}/g, '')
                .replace(/【/g, '')
                .replace(/】/g, '');
            this._ct.save();
            this._ct.font = font;
            row = Math.ceil(this._ct.measureText(sClob).width / bBound.w);
            this._ct.restore();
            if (this._tl + row > bBound['row'] && pause < 1) this.$c();        // 预计会有多少行内容，超出最大行，重起绘制
            tBound = Util.clone(this._cb);
            tText = new G.Text(<G.IBounds> tBound, tBound['ff'], tBound['s'], tBound['lh'], left, true)
                .tc(tBound['c'])
                .tl(tBound['ls'])
                .to(pause > 0 ? this._tx : 0);
                //.ts(tBound['ss']);
            (<G.Sprite> this._x['f']).a(tText);
            this.$w(<G.Text> tText.o(0), clob, this._c);
            (<G.Sprite> this._x['f']).o(1);
            return this.$v(tText, auto, pause >= 0 ? true : wait).then(() => {
                if (this._h) {
                    let pnt: G.IPoint = tText.gCp();
                    this._cb.y = pnt.y;
                    this._tx = pnt.x - bBound.x;
                    this._tl = (pnt.y - bBound.y) / lHeight;
                }
                return this;
            });
        }

        /**
         * 清除文本内容。
         */
        public clean(): Promise<Full> {
            return Promise.resolve(this.$c());
        }

        /**
         * 显示内容文字。
         */
        public $v(text: G.Text, auto: boolean, wait: boolean): Promise<G.Element> {
            this.o(1);
            return new Promise<void>((resolve: () => void) => {
                let aType: G.Type = new G.Type(1),
                    aWFC: G.WaitForClick;
                if (auto)
                    return text.p(aType).then(() => {
                        resolve();
                    });
                aWFC = new G.WaitForClick(() => {
                    aType.h();
                });
                this._h = aWFC;
                this.dispatchEvent(new Ev.FullAnimation({
                    target: this,
                    animation: aWFC,
                    type: aType,
                }));
                Promise.race<any>([
                    text.p(aType).then(() => {
                        aWFC.h();
                    }),
                    this.p(aWFC)
                ]).then(() => {
                    this._h = undefined;
                    this.dispatchEvent(new Ev.FullAnimation({
                        target: this,
                        animation: undefined,
                        type: undefined,
                    }));
                    resolve();
                });
            }).then(() => {
                let animation: G.Animation,
                    target: G.Element;
                if (wait) {
                    if (auto) {
                        animation = new G.TypeDelay(9);
                        target = text;
                    } else {
                        animation = new G.WaitForClick();
                        target = this;
                    }
                } else {
                    animation = new G.TypeDelay(0.1);
                    target = text;
                }
                this._h = animation;
                this.dispatchEvent(new Ev.FullAnimation({
                    target: this,
                    animation: animation,
                    type: undefined,
                }));
                return target.p(animation);
            });
        }

        private $c(): Full {
            this._tl = 0;
            this._cb = <G.IBounds> Util.clone(this._be);
            (<G.Sprite> this._x['f']).c();
            return this;
        }
    }
}