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
         * 下一个文本范围集合。
         */
        private _cb: Util.IHashTable<G.IBounds>;

        /**
         * 文本首行偏移量集合。
         */
        private _tp: Util.IHashTable<any>;

        /**
         * 是否隐藏，隐藏后时序流快进。
         */
        private _po: boolean;

        /**
         * 构造函数。
         */
        constructor(voiceover: Util.IHashTable<Util.IHashTable<any>>, monolog: Util.IHashTable<Util.IHashTable<any>>, speak: Util.IHashTable<Util.IHashTable<any>>, listen: (ev: Ev.WordsAnimation) => void) {
            let raw: Core.IResource.Type = Core.IResource.Type.Raw,
                rr: typeof Resource.Resource = Resource.Resource,
                _vback: Util.IHashTable<any> = voiceover['back'],
                _vtext: Util.IHashTable<any> = voiceover['text'],
                _vcurs: Util.IHashTable<any> = voiceover['cursor'],
                _mback: Util.IHashTable<any> = monolog['back'],
                _mavat: Util.IHashTable<any> = monolog['avatar'],
                _mtext: Util.IHashTable<any> = monolog['text'],
                _mcurs: Util.IHashTable<any> = monolog['cursor'],
                _sback: Util.IHashTable<any> = speak['back'],
                _savat: Util.IHashTable<any> = speak['avatar'],
                _stext: Util.IHashTable<any> = speak['text'],
                _scurs: Util.IHashTable<any> = speak['cursor'],
                theme: Util.IHashTable<any> = {voiceover, monolog, speak};
            super(theme);
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
            this._tp = {
                v: {x: _vtext['x'], y: _vtext['y']},
                m: {x: _mtext['x'], y: _mtext['y']},
                s: {x: _stext['x'], y: _stext['y']},
                c: {x: 0, y: 0}
            };
            this._cb = {
                v: <G.IBounds> Util.clone(_vtext),
                m: <G.IBounds> Util.clone(_mtext),
                s: <G.IBounds> Util.clone(_stext)
            };
            if (_vcurs) this._rr.push(rr.g<HTMLImageElement>(_vcurs['i'], raw));
            if (_mcurs) this._rr.push(rr.g<HTMLImageElement>(_mcurs['i'], raw));
            if (_scurs) this._rr.push(rr.g<HTMLImageElement>(_scurs['i'], raw));
            this.addEventListener('words.animation', listen);
        }

        protected pI(): Words {
            if (this._pi) return this;
            let voiceover: Util.IHashTable<any> = this._tm['voiceover'],
                monolog: Util.IHashTable<any> = this._tm['monolog'],
                speak: Util.IHashTable<any> = this._tm['speak'],
                _vback: Util.IHashTable<any> = voiceover['back'],
                _vcurs: Util.IHashTable<any> = voiceover['cursor'],
                _mback: Util.IHashTable<any> = monolog['back'],
                _mavat: Util.IHashTable<any> = monolog['avatar'],
                _mname: Util.IHashTable<any> = monolog['name'],
                _mcurs: Util.IHashTable<any> = monolog['cursor'],
                _sback: Util.IHashTable<any> = speak['back'],
                _savat: Util.IHashTable<any> = speak['avatar'],
                _sname: Util.IHashTable<any> = speak['name'],
                _scurs: Util.IHashTable<any> = speak['cursor'],
                left: G.Text.Align = G.Text.Align.Left;
            this.a(this._x['v'] = new G.Sprite(<G.IBounds> _vback)
                    .a(new G.Image(this._rr[0].o(), <G.IBounds> _vback, true))
                    .a(this._x['vt'] = new G.Sprite(<G.IBounds> _vback))
                    .o(0)
                ).a(this._x['m'] = new G.Sprite(<G.IBounds> _mback)
                    .a(new G.Image(this._rr[1].o(), <G.IBounds> _mback, true))
                    .a(this._x['ma'] = new G.Sprite(<G.IBounds> _mavat, true))
                    .a(new G.Text(<G.IBounds> _mname, _mname['ff'], _mname['s'], _mname['lh'], left, true)
                        .tc(_mname['c'])
                        //.ts(_mname['ss'])
                        .a(this._x['mn'] = new G.TextPhrase())
                    ).a(this._x['mt'] = new G.Sprite(<G.IBounds> _mback))
                    .o(0)
                ).a(this._x['s'] = new G.Sprite(<G.IBounds> _sback)
                    .a(new G.Image(this._rr[2].o(), <G.IBounds> _sback, true))
                    .a(this._x['sa'] = new G.Sprite(<G.IBounds> _savat, true))
                    .a(new G.Text(<G.IBounds> _sname, _sname['ff'], _sname['s'], _sname['lh'], left, true)
                        .tc(_sname['c'])
                        //.ts(_sname['ss'])
                        .a(this._x['sn'] = new G.TextPhrase())
                    ).a(this._x['st'] = new G.Sprite(<G.IBounds> _sback)
                    ).o(0)
                );
            if (_vcurs) (<G.Sprite> this._x['v']).a(this._x['vc'] = new G.Image(this._rr[3].o(), <G.IBounds> _vcurs, true));
            if (_mcurs) (<G.Sprite> this._x['m']).a(this._x['mc'] = new G.Image(this._rr[4].o(), <G.IBounds> _mcurs, true));
            if (_scurs) (<G.Sprite> this._x['s']).a(this._x['sc'] = new G.Image(this._rr[5].o(), <G.IBounds> _scurs, true));
            return <Words> super.pI();
        }

        /**
         * 隐藏。
         */
        public h(duration?: number): Promise<Words> {
            if (!this._pi) return super.h(duration);
            if (this._h) {
                this._po = true;
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
            (<G.Sprite> this.pI()._x['v']).o(1);
            return this.split(clob, 'v', auto).then(() => {
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
            (<G.Sprite> this.pI()._x['ma'])
                .c()
                .a(new G.Image(avatar.o(), this._bs['m'], true));
            (<G.TextPhrase> this._x['mn']).t(name);
            (<G.Sprite> this._x['m']).o(1);
            return this.split(clob, 'm', auto).then(() => {
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
            (<G.Sprite> this.pI()._x['sa'])
                .c()
                .a(new G.Image(avatar.o(), this._bs['s'], true));
            (<G.TextPhrase> this._x['sn']).t(name);
            (<G.Sprite> this._x['s']).o(1);
            return this.split(clob, 's', auto).then(() => {
                (<G.Sprite> this._x['s']).o(0);
                if (this._si) {
                    clearInterval(this._si);
                    this._si = undefined;
                }
                return this;
            });
        }

        /**
         * 文本分解。
         */
        protected split(clob: string, theme: string, auto: boolean): Promise<Words> {
            let words: Array<string> = clob.split('\\r'),
                _txt: string = theme + 't';
            (<G.Sprite> this._x[_txt]).c();
            this._cb[theme].y = this._tp[theme].y;
            // Util.each(words, (word: string, index: number) => {
            //     let bufs: Array<string> = word.split('\\l');
            //     if (bufs.length == 1) {
            //         funcs.push(() => this.every(word, theme, auto, index == words.length - 1));
            //     } else {
            //         Util.each(bufs, (buffer: string, i: number) => {
            //             funcs.push(() => this.every(buffer, theme, auto, false, i));
            //         });
            //     }
            // });
            // return funcs.reduce((previous: Promise<Words>, current: (value: Words) => {} | Thenable<{}>) => {
            //     return previous.then(current);
            // }, Promise.resolve());
            return Util.Q.every(words, (word: string, index: number) => {
                this._po = false;
                let bufs: Array<string> = word.split('\\l');
                return Util.Q.every(bufs, (buffer: string, i: number) => {
                    if (this._po) return Promise.resolve(this);
                    var wait: boolean = bufs.length == 1 ? (index == words.length - 1) : false;
                    var pause: number = bufs.length == 1 ? -1 : i;
                    return this.every(buffer, theme, auto, wait, pause);
                });
            });
        }

        /**
         * 对于分解的话逐行进行处理。
         */
        protected every(clob: string, theme: string, auto: boolean, wait: boolean, pause: number = -1): Promise<Words> {
            let _img: string = theme + 'c',
                _txt: string = theme + 't',
                eRow: number = 0,
                tBound: G.IBounds = Util.clone(this._cb[theme]),
                tText: G.Text,
                image: G.Image = <G.Image> this._x[_img],
                left: G.Text.Align = G.Text.Align.Left,
                lHeight: number = Math.max(tBound['lh'], tBound['s']);
            if (image) image.o(0);
            while (/^\\n.*/.test(clob)) {   // 计算开头的空白行行数
                eRow++;
                clob = clob.substr(2);
            }
            if (eRow > 0) {
                tBound.y += eRow * lHeight;
                this._tp['c'].x = 0;
            } else {
                if (pause > 0) tBound.y -= lHeight;
            }
            if (clob == '') return Promise.resolve(this);
            tText = new G.Text(<G.IBounds> tBound, tBound['ff'], tBound['s'], tBound['lh'], left, true)
                .tc(tBound['c'])
                .tl(tBound['ls'])
                .to(pause > 0 ? this._tp['c'].x : 0);
                //.ts(tBound['ss']);
            (<G.Sprite> this._x[_txt]).a(tText);
            this.$w(<G.Text> tText.o(0), clob, this._c[theme]);
            (<G.Sprite> this._x[theme]).o(1);
            return this.$v(tText, auto, image, pause >= 0 ? true : wait).then(() => {
                if (this._h) {
                    let pnt: G.IPoint = tText.gCp();
                    this._cb[theme].y = pnt.y;
                    this._tp['c'].x = pnt.x - this._tp[theme].x;
                }
                return this;
            });
        }

        /**
         * 显示内容文字。
         */
        private $v(text: G.Text, auto: boolean, image: G.Image, wait: boolean): Promise<G.Element> {
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
                if (wait) {
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
                } else {
                    animation = new G.TypeDelay(0.1);
                    target = text;
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
