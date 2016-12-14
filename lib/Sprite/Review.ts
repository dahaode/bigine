/**
 * 定义画面调度回看组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Sprite/Review.ts
 */

/// <reference path="Sprite.ts" />
/// <reference path="../Ev/_Sprite/ReviewClose.ts" />

namespace Sprite {
    import Util = __Bigine_Util;
    import G = __Bigine_C2D;

    export class Review extends Sprite {
        /**
         * 对象集合。
         */
        private _x: G.Element;

        /**
         * 翻页元素集合。
         */
        private _ca: Util.IHashTable<G.Button>;

        /**
         * 离线 Canvas，用于提前计算文字行数。
         */
        private _ct: CanvasRenderingContext2D;

        /**
         * 行数据 [类型、数据]。
         */
        private _ls: [number, any][];

        /**
         * 总页数。
         */
        private _ps: number;

        /**
         * 第几页。
         */
        private _pg: number;

        /**
         * 构造函数。
         */
        constructor(theme: Util.IHashTable<any>, runtime: Core.IRuntime, context: CanvasRenderingContext2D, close: () => void) {
            let raw: Core.IResource.Type = Core.IResource.Type.Raw,
                rr: typeof Resource.Resource = Resource.Resource,
                _back: Util.IHashTable<any> = theme['back'],
                _close: Util.IHashTable<any> = theme['close'],
                _arrow: Util.IHashTable<any> = theme['arrow'];
            super(theme);
            this._rr = [
                rr.g<HTMLImageElement>(_back['i'], raw),
                rr.g<HTMLImageElement>(_arrow['p']['i'], raw),
                rr.g<HTMLImageElement>(_arrow['p']['ih'], raw),
                rr.g<HTMLImageElement>(_arrow['n']['i'], raw),
                rr.g<HTMLImageElement>(_arrow['n']['ih'], raw),
                rr.g<HTMLImageElement>(_close['i'], raw),
                rr.g<HTMLImageElement>(_close['ih'], raw)
            ];
            this._ca = {};
            this._ls = [];
            this._ps =
            this._pg = 0;
            this._ct = context;
            this.addEventListener('review.close', close);
            runtime.addEventListener('review', this.calc.bind(this));
        }

        /*
         * 初始化
         */
        protected pI(): Review {
            if (this._pi) return this;
            let back: G.IBounds = <G.IBounds> this._tm['back'],
                close: G.IBounds = <G.IBounds> this._tm['close'],
                pBounds: G.IBounds = <G.IBounds> this._tm['arrow']['p'],
                nBounds: G.IBounds = <G.IBounds> this._tm['arrow']['n'];
            this.a(new G.Image(this._rr[0].o(), back, true))
                .a(this._x = new G.Sprite(back))
                .a(this._ca['p'] = new G.Button(pBounds)
                    .b(() => {
                        this._pg --;
                        this.goto();
                        if (this._pg <= 0) {
                            this._pg = 0;
                            this._ca['p'].o(0);
                        }
                        if (this._ca['n'].gO() == 0) this._ca['n'].o(1);
                    },
                    new G.Image(this._rr[2].o(), pBounds, true),
                    new G.Image(this._rr[1].o(), pBounds, true)))
                .a(this._ca['n'] = new G.Button(nBounds)
                    .b(() => {
                        this._pg ++;
                        this.goto();
                        if (this._pg >= this._ps - 1) {
                            this._pg = this._ps - 1;
                            this._ca['n'].o(0);
                        }
                        if (this._ca['p'].gO() == 0) this._ca['p'].o(1);
                    },
                    new G.Image(this._rr[4].o(), nBounds, true),
                    new G.Image(this._rr[3].o(), nBounds, true)))
                .a(new G.Button(close)
                    .b(() => {
                        this.dispatchEvent(new Ev.ReviewClose({ target: this }));
                        return;
                    },
                    new G.Image(this._rr[6].o(), close, true),
                    new G.Image(this._rr[5].o(), close, true)));
            this._ca['p'].o(0);
            this._ca['n'].o(0);
            return <Review> super.pI();
        }

        /*
         * 计算并添加行信息
         */
        protected calc(ev: Ev.Review): Review {
            let bound: Util.IHashTable<any> = this._tm['text'],
                data: Array<string> = ev.data,
                loop: Array<string>,
                text: G.Text,
                left: G.Text.Align = G.Text.Align.Left,
                schedules: [number, G.TextPhrase, number, number][][],
                rows: number = this._tm['text']['rows'],
                split: (word: string) => void = (word: string) => {
                    while (/^\\n.*/.test(word)) {
                        word = word.substr(2);
                        this._ls.push([0, 1]);
                    }
                    text = new G.Text(<G.IBounds> bound, bound['ff'], bound['s'], bound['lh'], left)
                        .tc(bound['c'])
                        .tl(bound['ls']);
                    this.$w(text, word, bound['ch']);
                    schedules = text.cl(this._ct, <G.IBounds> bound);
                    Util.each(schedules, (line2: [number, G.TextPhrase, number, number][]) => {
                        this._ls.push([2, [line2]]);
                    });
                };
            this._ct.canvas.style.letterSpacing = bound['ls'] + 'px';  // 设置字间距
            switch (ev.type) {
                case 'speak':
                case 'monolog':
                    this._ls.push([0, 1]);
                    this._ls.push([1, ev.more]);
                    loop = data[0].replace(/\\l/g, '').split('\\r');
                    break;
                case 'voiceover':
                    loop = data[0].replace(/\\l/g, '').split('\\r');
                    break;
                case 'tip':
                    split(data[0]);
                    break;
                case 'choose':
                    this._ls.push([1, '.选择：']);
                    loop = data;
                    break;
            }
            if (loop)
                for (let i: number = 0; i < loop.length; i++) {
                    split(loop[i]);
                }
            if (this._ls.length > rows)
                this._ls.splice(0, this._ls.length - rows);
            return this;
        }

        /**
         * 配置。
         */
        public u(): Review {
            this._ps = Math.ceil(this._ls.length / this._tm['text']['row']) || 1;
            this._pg = this._ps - 1;
            this.pI().goto();
            if (this._ps > 1)
                this._ca['p'].o(1);
            return <Review> this.o(1);
        }

        /**
         * 隐藏。
         */
        public h(duration?: number): Promise<Review> {
            return super.h(duration).then(() => {
                this._ca['p'].o(0);
                this._ca['n'].o(0);
                (<G.Sprite> this._x).c();
                return this;
            });
        }

        /**
         * 去第几页。
         */
        private goto(): Review {
            (<G.Sprite> this._x).c();
            let rows: number = this._tm['text']['row'],
                start: number = this._pg * rows,
                lines: [number, any][] = this._ls.slice(start, start + rows),
                left: G.Text.Align = G.Text.Align.Left,
                oBound: Util.IHashTable<any> = Util.clone(this._tm['text']),
                lHeight: number = Math.max(oBound['lh'], oBound['s']),
                tText: G.Text;
            if (lines.length == 0) return this;
            oBound['h'] = lHeight;
            Util.each(lines, (line: [number, any]) => {
                if (line[0]) {
                    tText = new G.Text(<G.IBounds> Util.clone(oBound), oBound['ff'], oBound['s'], oBound['lh'], left, false)
                        .tc(oBound['c'])
                        .tl(oBound['ls']);
                    if (line[0] == 1) {
                        tText.a(new G.TextPhrase(line[1]));
                    } else if (line[0] == 2) {
                        tText.th(line[1]);
                    }
                    (<G.Sprite> this._x).a(tText);
                }
                oBound['y'] += lHeight;
            });
            return this;
        }
    }
}
