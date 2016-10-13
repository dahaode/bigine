/**
 * 定义画面调度连载档位菜单组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Sprite/SeriesSlots.ts
 */

/// <reference path="Sprite.ts" />
/// <reference path="../Resource/Resource.ts" />
/// <reference path="../Ev/_Sprite/SlotsClose.ts" />
/// <reference path="../Ev/_Sprite/SlotsLoad.ts" />
/// <reference path="../Ev/_Sprite/SlotsSave.ts" />

namespace Sprite {
    import Util = __Bigine_Util;
    import G = __Bigine_C2D;

    export class SeriesSlots extends Sprite implements Core.ISlots {
        /**
         * 自动档位和一号档位配置。
         */
        private _c: Util.IHashTable<any>[];

        /**
         * 关键元素集合。
         */
        private _x: Util.IHashTable<G.Element>;

        /**
         * 文字元素。
         */
        private _de: G.Element;

        /**
         * 构造函数。
         */
        constructor(id: string, theme: Util.IHashTable<Util.IHashTable<any>>) {
            let w: number = 1280,
                h: number = 720,
                raw: Core.IResource.Type = Core.IResource.Type.Raw,
                rr: typeof Resource.Resource = Resource.Resource,
                _desc: Util.IHashTable<any> = theme['text'],
                _close: Util.IHashTable<any> = theme['close'],
                _mask: Util.IHashTable<any> = theme['mask'],
                _auto: Util.IHashTable<any> = theme['auto'],
                _1: Util.IHashTable<any> = theme['1'];
            super(0, 0, w, h);
            this._c = [_auto, _1];
            this._x = {};
            this._rr = [
                rr.g<HTMLImageElement>(_close['i'], raw),
                rr.g<HTMLImageElement>(_close['ih'], raw),
                rr.g<HTMLImageElement>(_auto['i'], raw),
                rr.g<HTMLImageElement>(_auto['ih'], raw),
                rr.g<HTMLImageElement>(_1['i'], raw),
                rr.g<HTMLImageElement>(_1['ih'], raw),
            ];
            (<SeriesSlots> this.o(0))
                .a(new G.Color(0, 0, w, h, _mask['cb']).o(_mask['o']))
                .a(new G.Button(<G.IBounds> _close)
                    .b(() => {
                        this.dispatchEvent(new Ev.SlotsClose({ target: this }));
                    }, new G.Image(this._rr[1].o(), <G.IBounds> _close, true), new G.Image(this._rr[0].o(), <G.IBounds> _close, true))
                )
                .a(this._de = new G.Text(<G.IBounds> _desc, _desc['s'], _desc['lh'], this.$a(_desc['a']), true)
                    .tc(_desc['c'])
                    .a(new G.TextPhrase(_desc['desc']))
                );
        }

        /**
         * 显示存档位。
         */
        public vs(states: Core.IStates, fs?: Core.IRuntime.Series, duration?: number): Promise<SeriesSlots> {
            let type: Core.IStates.Save = Core.IStates.Save.End,
                series: Core.IRuntime.Series = Core.IRuntime.Series.Last,
                $1: [string, number] = <[string, number]> states.q('1', type),
                _1: Util.IHashTable<any> = this._c[1],
                _1t: Util.IHashTable<any> = _1['text'],
                right: G.Text.Align = G.Text.Align.Right;
            let succ: () => Promise<SeriesSlots>;
            let fail: () => Promise<SeriesSlots>;
            let loop: () => Promise<SeriesSlots> = () => {
                return states.l()
                    .then(() => succ())
                    .catch(() => fail());
            };
            fs == series ? this._de.o(0) : this._de.o(1);
            succ = () => {
                this.e(this._x['1'])
                    .a(this._x['1'] = new G.Button(<G.IBounds> _1)
                    .b(() => {
                        this.dispatchEvent(new Ev.SlotsSave({
                            target: this,
                            slot: '1',
                        }));
                    }, new G.Image(this._rr[5].o(), <G.IBounds> _1, true), new G.Image(this._rr[4].o(), <G.IBounds> _1, true))
                    .a(new G.Text(<G.IBounds> _1t, _1t['s'], _1t['lh'], right, true)
                        .tc(_1t['c'])
                        .a(new G.TextPhrase($1 ? this.$d($1[1]) : '（无）'))
                    )
                );
                return this.v(duration);
            };
            fail = () => {
                this.e(this._x['1'])
                    .a(this._x['1'] = new G.Button(<G.IBounds> _1)
                    .b(() => {
                        loop();
                    }, new G.Image(this._rr[5].o(), <G.IBounds> _1, true), new G.Image(this._rr[4].o(), <G.IBounds> _1, true))
                    .a(new G.Text(<G.IBounds> _1t, _1t['s'], _1t['lh'], right, true)
                        .tc(_1t['c'])
                        .a(new G.TextPhrase('（未登录）'))
                    )
                );
                return this.v(duration);
            };
            return loop();
        }

        /**
         * 显示读档位。
         */
        public vl(states: Core.IStates, duration?: number): Promise<SeriesSlots> {
            return states.l().then(() => {
                let type: Core.IStates.Save = Core.IStates.Save.Series,
                    $a: [string, number] = <[string, number]> states.q('auto', type),
                    _a: Util.IHashTable<any> = this._c[0],
                    _at: Util.IHashTable<any> = _a['text'],
                    $1: [string, number] = <[string, number]> states.q('1', type),
                    _1: Util.IHashTable<any> = this._c[1],
                    _1t: Util.IHashTable<any> = _1['text'],
                    right: G.Text.Align = G.Text.Align.Right;
                this.a(this._x['a'] = $a ?
                    new G.Button(<G.IBounds> _a)
                        .b(() => {
                            this.dispatchEvent(new Ev.SlotsLoad({
                                target: this,
                                id: $a[0]
                            }));
                        }, new G.Image(this._rr[3].o(), <G.IBounds> _a, true), new G.Image(this._rr[2].o(), <G.IBounds> _a, true)) :
                    new G.Sprite(<G.IBounds> _a)
                        .a(new G.Image(this._rr[2].o(), <G.IBounds> _a, true))
                ).a(this._x['1'] = $1 ?
                    new G.Button(<G.IBounds> _1)
                        .b(() => {
                            this.dispatchEvent(new Ev.SlotsLoad({
                                target: this,
                                id: $1[0]
                            }));
                        }, new G.Image(this._rr[5].o(), <G.IBounds> _1, true), new G.Image(this._rr[4].o(), <G.IBounds> _1, true)) :
                    new G.Sprite(<G.IBounds> _1)
                        .a(new G.Image(this._rr[4].o(), <G.IBounds> _1, true))
                    );
                (<G.Sprite> this._x['a'])
                    .a(new G.Text(<G.IBounds> _at, _at['s'], _at['lh'], right, true)
                        .tc(_at['c'])
                        .a(new G.TextPhrase($a ? this.$d($a[1]) : '（无）'))
                    );
                (<G.Sprite> this._x['1'])
                    .a(new G.Text(<G.IBounds> _1t, _1t['s'], _1t['lh'], right, true)
                        .tc(_1t['c'])
                        .a(new G.TextPhrase($1 ? this.$d($1[1]) : '（无）'))
                    );
                this._de.o(0);
                return this.v(duration);
            });
        }

        /**
         * 隐藏。
         */
        public h(duration?: number): Promise<SeriesSlots> {
            return super.h(duration).then(() => {
                Util.each(this._x, (item: G.Element) => {
                    this.e(item);
                });
                this._x = {};
                return this;
            });
        }

        /**
         * 格式化时间。
         */
        private $d(stamp: number): string {
            let date: Date = new Date(stamp),
                field: number = date.getHours(),
                clob: string = ' ' + (10 > field ? '0' : '') + field;
            field = date.getMinutes();
            clob += ':' + (10 > field ? '0' : '') + field;
            return date.getFullYear() + '-' + (1 + date.getMonth()) + '-' + date.getDate() + clob;
        }
    }
}
