/**
 * 定义画面调度某白组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Sprite/Words.ts
 */

/// <reference path="Sprite.ts" />
/// <reference path="../Resource/Resource.ts" />
/// <reference path="../Ev/_Sprite/WordsAnimation.ts" />

namespace Sprite {
    import Util = __Bigine_Util;
    import G = __Bigine_C2D;

    export class Words extends Sprite implements Core.IWords {
        /**
         * 对象集合。
         */
        private _x: Util.IHashTable<G.Element | G.TextPhrase>;

        /**
         * 高亮色集合。
         */
        private _c: Util.IHashTable<string>;

        /**
         * 阻塞动画。
         */
        private _h: G.Animation;

        /**
         * 头像尺寸集合。
         */
        private _bs: Util.IHashTable<G.IBounds>;

        /**
         * setInterval的ID。
         */
        private _si: number;

        /**
         * 构造函数。
         */
        constructor(id: string, voiceover: Util.IHashTable<Util.IHashTable<any>>, monolog: Util.IHashTable<Util.IHashTable<any>>, speak: Util.IHashTable<Util.IHashTable<any>>) {
            let w: number = 1280,
                h: number = 720,
                raw: Core.IResource.Type = Core.IResource.Type.Raw,
                rr: typeof Resource.Resource = Resource.Resource,
                _vback: Util.IHashTable<any> = voiceover['back'],
                _vtext: Util.IHashTable<any> = voiceover['text'],
                _vcurs: Util.IHashTable<any> = voiceover['cursor'],
                _mback: Util.IHashTable<any> = monolog['back'],
                _mavat: Util.IHashTable<any> = monolog['avatar'],
                _mname: Util.IHashTable<any> = monolog['name'],
                _mtext: Util.IHashTable<any> = monolog['text'],
                _mcurs: Util.IHashTable<any> = monolog['cursor'],
                _sback: Util.IHashTable<any> = speak['back'],
                _savat: Util.IHashTable<any> = speak['avatar'],
                _sname: Util.IHashTable<any> = speak['name'],
                _stext: Util.IHashTable<any> = speak['text'],
                _scurs: Util.IHashTable<any> = speak['cursor'],
                left: G.Text.Align = G.Text.Align.Left;
            super(0, 0, w, h);
            this._rr = [
                rr.g<HTMLImageElement>(_vback['i'], raw),
                rr.g<HTMLImageElement>(_mback['i'], raw),
                rr.g<HTMLImageElement>(_sback['i'], raw),
            ];
            this._x = {};
            this._c = {
                v: _vtext['ch'],
                m: _mtext['ch'],
                s: _stext['ch']
            };
            this._bs = {
                m: <G.IBounds> _mavat,
                s: <G.IBounds> _savat
            };
            this._si = undefined;
            (<Words> this.o(0))
                .a(this._x['v'] = new G.Sprite(<G.IBounds> _vback)
                    .a(new G.Image(this._rr[0].o(), <G.IBounds> _vback, true))
                    .a(this._x['vt'] = new G.Text(<G.IBounds> _vtext, _vtext['s'], _vtext['lh'], left, true)
                        .tc(_vtext['c'])
                        .tl(_vtext['ls'])
                        .ts(_vtext['ss'], _vtext['ss'], _vtext['ss'])
                    ).o(0)
                ).a(this._x['m'] = new G.Sprite(<G.IBounds> _mback)
                    .a(new G.Image(this._rr[1].o(), <G.IBounds> _mback, true))
                    .a(this._x['ma'] = new G.Sprite(<G.IBounds> _mavat, true))
                    .a(new G.Text(<G.IBounds> _mname, _mname['s'], _mname['lh'], left, true)
                        .tc(_mname['c'])
                        .ts(_mname['ss'], _mname['ss'], _mname['ss'])
                        .a(this._x['mn'] = new G.TextPhrase())
                    ).a(this._x['mt'] = new G.Text(<G.IBounds> _mtext, _mtext['s'], _mtext['lh'], left, true)
                        .tc(_mtext['c'])
                        .tl(_mtext['ls'])
                        .ts(_mtext['ss'], _mtext['ss'], _mtext['ss'])
                    ).o(0)
                ).a(this._x['s'] = new G.Sprite(<G.IBounds> _sback)
                    .a(new G.Image(this._rr[2].o(), <G.IBounds> _sback, true))
                    .a(this._x['sa'] = new G.Sprite(<G.IBounds> _savat, true))
                    .a(new G.Text(<G.IBounds> _sname, _sname['s'], _sname['lh'], left, true)
                        .tc(_sname['c'])
                        .ts(_sname['ss'], _sname['ss'], _sname['ss'])
                        .a(this._x['sn'] = new G.TextPhrase())
                    ).a(this._x['st'] = new G.Text(<G.IBounds> _stext, _stext['s'], _stext['lh'], left, true)
                        .tc(_stext['c'])
                        .tl(_stext['ls'])
                        .ts(_stext['ss'], _stext['ss'], _stext['ss'])
                    ).o(0)
                );
            if (_vcurs) {
                let vo: Resource.Resource<HTMLImageElement> = rr.g<HTMLImageElement>(_vcurs['i'], raw);
                this._rr.push(vo);
                (<G.Sprite> this._x['v']).a(this._x['vc'] = new G.Image(vo.o(), <G.IBounds> _vcurs, true));
            }
            if (_mcurs) {
                let mo: Resource.Resource<HTMLImageElement> = rr.g<HTMLImageElement>(_mcurs['i'], raw);
                this._rr.push(mo);
                (<G.Sprite> this._x['m']).a(this._x['mc'] = new G.Image(mo.o(), <G.IBounds> _mcurs, true));
            }
            if (_scurs) {
                let so: Resource.Resource<HTMLImageElement> = rr.g<HTMLImageElement>(_scurs['i'], raw);
                this._rr.push(so);
                (<G.Sprite> this._x['s']).a(this._x['sc'] = new G.Image(so.o(), <G.IBounds> _scurs, true));
            }
        }

        /**
         * 隐藏。
         */
        public h(duration?: number): Promise<Words> {
            if (this._h) {
                this._h.h();
                this._h = undefined;
                this.dispatchEvent(new Ev.WordsAnimation({
                    target: this,
                    animation: undefined
                }));
            }
            return super.h(duration).then(() => {
                (<G.Sprite> this._x['v']).o(0);
                (<G.Sprite> this._x['m']).o(0);
                (<G.Sprite> this._x['s']).o(0);
                if (this._si) {
                    clearInterval(this._si);
                    this._si = undefined;
                }
                return this;
            });
        }

        /**
         * 旁白。
         */
        public vv(clob: string, auto: boolean = false): Promise<Words> {
            let text: G.Text = <G.Text> this._x['vt'],
                image: G.Image = <G.Image> this._x['vc'];
            this.$w(<G.Text> text.o(0), clob, this._c['v']);
            (<G.Sprite> this._x['v']).o(1);
            if (image) image.o(0);
            return this.$v(text, auto, image).then(() => {
                (<G.Sprite> this._x['v']).o(0);
                if (this._si) {
                    clearInterval(this._si);
                    this._si = undefined;
                }
                return this;
            });
        }

        /**
         * 独白。
         */
        public vm(avatar: Resource.Resource<HTMLImageElement>, name: string, clob: string, auto: boolean = false): Promise<Words> {
            let text: G.Text = <G.Text> this._x['mt'],
                image: G.Image = <G.Image> this._x['mc'];
            this.$w(<G.Text> text.o(0), clob, this._c['m']);
            (<G.Sprite> this._x['ma'])
                .c()
                .a(new G.Image(avatar.o(), this._bs['m'], true));
            (<G.TextPhrase> this._x['mn']).t(name);
            (<G.Sprite> this._x['m']).o(1);
            if (image) image.o(0);
            return this.$v(text, auto, image).then(() => {
                (<G.Sprite> this._x['m']).o(0);
                if (this._si) {
                    clearInterval(this._si);
                    this._si = undefined;
                }
                return this;
            });
        }

        /**
         * 对白。
         */
        public vs(avatar: Resource.Resource<HTMLImageElement>, name: string, clob: string, auto: boolean = false): Promise<Words> {
            let text: G.Text = <G.Text> this._x['st'],
                image: G.Image = <G.Image> this._x['sc'];
            this.$w(<G.Text> text.o(0), clob, this._c['s']);
            (<G.Sprite> this._x['sa'])
                .c()
                .a(new G.Image(avatar.o(), this._bs['s'], true));
            (<G.TextPhrase> this._x['sn']).t(name);
            (<G.Sprite> this._x['s']).o(1);
            if (image) image.o(0);
            return this.$v(text, auto, image).then(() => {
                (<G.Sprite> this._x['s']).o(0);
                if (this._si) {
                    clearInterval(this._si);
                    this._si = undefined;
                }
                return this;
            });
        }

        /**
         * 显示内容文字。
         */
        private $v(text: G.Text, auto: boolean, image: G.Image): Promise<G.Element> {
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
                this.dispatchEvent(new Ev.WordsAnimation({
                    target: this,
                    animation: aWFC
                }));
                Promise.race<any>([
                    text.p(aType).then(() => {
                        aWFC.h();
                    }),
                    this.p(aWFC)
                ]).then(() => {
                    this._h = undefined;
                    this.dispatchEvent(new Ev.WordsAnimation({
                        target: this,
                        animation: undefined
                    }));
                    resolve();
                });
            }).then(() => {
                let animation: G.Animation,
                    target: G.Element;
                if (auto) {
                    animation = new G.TypeDelay(9);
                    target = text;
                } else {
                    animation = new G.WaitForClick();
                    target = this;
                    if (image) {
                        image.o(1);
                        this._si = setInterval(() => {
                            let next: number = image.gO() == 1 ? 0 : 1;
                            image.o(next);
                        }, 500);
                    }
                }
                this._h = animation;
                this.dispatchEvent(new Ev.WordsAnimation({
                    target: this,
                    animation: animation
                }));
                return target.p(animation);
            });
        }
    }
}
