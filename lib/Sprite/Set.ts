/**
 * 定义画面调度设置菜单组件。
 *
 * @author    李倩 <qli@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Sprite/Set.ts
 */

/// <reference path="Sprite.ts" />
/// <reference path="../Resource/Resource.ts" />
/// <reference path="../Ev/_Sprite/SetClose.ts" />
/// <reference path="../Ev/_Sprite/SetVolume.ts" />

namespace Sprite {
    import Util = __Bigine_Util;
    import G = __Bigine_C2D;

    export class Set extends Sprite implements Core.ISet {
        /**
         * 音效音量。
         */
        private _ve: number;

        /**
         * 音效音量字体元件。
         */
        private _xe: G.Text;

        /**
         * 音效音量图片元件。
         */
        private _ie: G.Image;

        /**
         * 音乐音量。
         */
        private _vb: number;

        /**
         * 音乐音量字体元件。
         */
        private _xb: G.Text;

        /**
         * 音乐音量图片元件。
         */
        private _ib: G.Image;

        /**
         * 面板声音开关。
         */
        private _vo: boolean;

        /**
         * 构造函数。
         */
        constructor(theme: Util.IHashTable<Util.IHashTable<any>>) {
            let raw: Core.IResource.Type = Core.IResource.Type.Raw,
                rr: typeof Resource.Resource = Resource.Resource,
                _close: Util.IHashTable<any> = theme['close'],
                _bgm: Util.IHashTable<any> = theme['bgm'];
            super(theme);
            this._vo = true;
            this._rr = [
                rr.g<HTMLImageElement>(_close['i'], raw),
                rr.g<HTMLImageElement>(_close['ih'], raw),
                rr.g<HTMLImageElement>(_bgm['bar']['i'], raw),
                rr.g<HTMLImageElement>(_bgm['bg']['i'], raw),
                rr.g<HTMLImageElement>(_bgm['bar']['ih'], raw)
            ];
        }

        protected pI(): Set {
            if (this._pi) return this;
            let _close: Util.IHashTable<any> = this._tm['close'],
                _mask: Util.IHashTable<any> = this._tm['mask'],
                _title: Util.IHashTable<any> = this._tm['title'],
                _bgm: Util.IHashTable<any> = this._tm['bgm'],
                _se: Util.IHashTable<any> = this._tm['se'];
            (<Set> this.o(0))
                .a(new G.Color(0, 0, 1280, 720, _mask['cb']).o(_mask['o']))
                .a(new G.Button(<G.IBounds> _close)
                    .b(() => {
                        this.dispatchEvent(new Ev.SetClose({ target: this }));
                    }, new G.Image(this._rr[1].o(), <G.IBounds> _close, true), new G.Image(this._rr[0].o(), <G.IBounds> _close, true))
                ).a(new G.Text(<G.IBounds> _title, _title['ff'], _title['s'], _title['lh'], this.$a(_title['a']), true)
                    .tc(_title['c'])
                    .a(new G.TextPhrase('声音设定'))
                ).a(new G.Text(<G.IBounds> _bgm['name'], _bgm['name']['ff'], _bgm['name']['s'], _bgm['name']['lh'], this.$a(_bgm['name']['a']), true)
                    .tc(_bgm['name']['c'])
                    .a(new G.TextPhrase('音乐'))
                ).a(new G.Button(<G.IBounds> _bgm['bar'])
                    .b((event) => {
                        this.sv(event['x'], 'bgm');
                    }, new G.Image(this._rr[2].o(), <G.IBounds> _bgm['bar'], true), new G.Image(this._rr[2].o(), <G.IBounds> _bgm['bar'], true))
                ).a(new G.Image(this._rr[3].o(), <G.IBounds> _bgm['bg'], true))
                .a(this._xb = new G.Text(<G.IBounds> _bgm['volume'], _bgm['volume']['ff'], _bgm['volume']['s'], _bgm['volume']['lh'], this.$a(_bgm['volume']['a']), true)
                ).a(new G.Text(<G.IBounds> _se['name'], _se['name']['ff'], _se['name']['s'], _se['name']['lh'], this.$a(_se['name']['a']), true)
                    .tc(_se['name']['c'])
                    .a(new G.TextPhrase('音效'))
                ).a(new G.Button(<G.IBounds> _se['bar'])
                    .b((event) => {
                        this.sv(event['x'], 'se');
                    }, new G.Image(this._rr[2].o(), <G.IBounds> _se['bar'], true), new G.Image(this._rr[2].o(), <G.IBounds> _se['bar'], true))
                ).a(new G.Image(this._rr[3].o(), <G.IBounds> _se['bg'], true))
                .a(this._xe = new G.Text(<G.IBounds> _se['volume'], _se['volume']['ff'], _se['volume']['s'], _se['volume']['lh'], this.$a(_se['volume']['a']), true));
            return <Set> super.pI();
        }

        /**
         * 调节音乐/音效。
         */
        protected sv(x: number, voice: string): void {
            if (!this._vo) return;
            let gBound: G.IBounds = <G.IBounds> Util.clone(this._tm[voice]['bar']),
                width: number = Math.max(gBound['x'], Math.min(x, gBound['w'] + gBound['x'])) - gBound['x'],
                count: number = Math.round(width / this._tm[voice]['bar']['w'] * 100);
            if (count <= 2) {
                count = gBound['w'] = 0;
            } else if (count >= 98) {
                count = 100;
            } else {
                gBound['w'] = width;
            }
            switch (voice) {
                case 'bgm':
                    this._vb = count;
                    (<G.Text> this._xb).c().a(new G.TextPhrase(this._vb.toString()));
                    if (this._ib) {
                        this.e(this._ib);
                        this._ib = undefined;
                    }
                    if (count != 0) this.a(this._ib = new G.Image(this._rr[4].o(), gBound, true));
                    break;
                case 'se':
                    this._ve = count;
                    (<G.Text> this._xe).c().a(new G.TextPhrase(this._ve.toString()));
                    if (this._ie) {
                        this.e(this._ie);
                        this._ie = undefined;
                    }
                    if (count != 0) this.a(this._ie = new G.Image(this._rr[4].o(), gBound, true));
                    break;
            }
            this.dispatchEvent(new Ev.SetVolume({ target: this, bVolume: this._vb, eVolume: this._ve }));
        }
        /**
         * 显示音乐/音效调节。
         */
        public vv(bVolume: number, eVolume: number, on: boolean, duration?: number): Promise<Set> {
            this.pI();
            this._vo = on;
            if (!this._vo) bVolume = eVolume = 0;
            this._vb = Math.round(bVolume * 100);
            this._ve = Math.round(eVolume * 100);
            (<G.Text> this._xb).c().a(new G.TextPhrase(this._vb.toString()));
            (<G.Text> this._xe).c().a(new G.TextPhrase(this._ve.toString()));
            let bBound: G.IBounds = <G.IBounds> Util.clone(this._tm['bgm']['bar']),
                eBound: G.IBounds = <G.IBounds> Util.clone(this._tm['se']['bar']);
            bBound['w'] = Math.round(bVolume * bBound['w']);
            eBound['w'] = Math.round(eVolume * eBound['w']);
            if (this._ib) {
                this.e(this._ib);
                this._ib = undefined;
            }
            if (this._ie) {
                this.e(this._ie);
                this._ie = undefined;
            }
            if (this._vb != 0) this.a(this._ib = new G.Image(this._rr[4].o(), bBound, true));
            if (this._ve != 0) this.a(this._ie = new G.Image(this._rr[4].o(), eBound, true));
            return this.v(duration);
        }
    }
}
