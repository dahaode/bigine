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
        constructor(theme: Util.IHashTable<Util.IHashTable<any>>) {
            let raw: Core.IResource.Type = Core.IResource.Type.Raw,
                rr: typeof Resource.Resource = Resource.Resource,
                _close: Util.IHashTable<any> = theme['close'],
                _auto: Util.IHashTable<any> = theme['auto'],
                _1: Util.IHashTable<any> = theme['1'],
                _2: Util.IHashTable<any> = theme['2'],
                _3: Util.IHashTable<any> = theme['3'],
                _4: Util.IHashTable<any> = theme['4'];
            super(theme);
            this._c = [_auto, _1, _2, _3, _4];
            this._x = {};
            this._rr = [
                rr.g<HTMLImageElement>(_close['i'], raw),
                rr.g<HTMLImageElement>(_close['ih'], raw),
                rr.g<HTMLImageElement>(_auto['i'], raw),
                rr.g<HTMLImageElement>(_auto['ih'], raw),
                rr.g<HTMLImageElement>(_1['i'], raw),
                rr.g<HTMLImageElement>(_1['ih'], raw),
                rr.g<HTMLImageElement>(_2['i'], raw),
                rr.g<HTMLImageElement>(_2['ih'], raw),
                rr.g<HTMLImageElement>(_3['i'], raw),
                rr.g<HTMLImageElement>(_3['ih'], raw),
                rr.g<HTMLImageElement>(_4['i'], raw),
                rr.g<HTMLImageElement>(_4['ih'], raw)
            ];
        }

        protected pI(): SeriesSlots {
            if (this._pi) return this;
            let _desc: Util.IHashTable<any> = this._tm['text'],
                _close: Util.IHashTable<any> = this._tm['close'],
                _mask: Util.IHashTable<any> = this._tm['mask'];
            (<SeriesSlots> this.o(0))
                .a(new G.Color(0, 0, 1280, 720, _mask['cb']).o(_mask['o']))
                .a(new G.Button(<G.IBounds> _close)
                    .b(() => {
                        this.dispatchEvent(new Ev.SlotsClose({ target: this }));
                    }, new G.Image(this._rr[1].o(), <G.IBounds> _close, true), new G.Image(this._rr[0].o(), <G.IBounds> _close, true))
                )
                .a(this._de = new G.Text(<G.IBounds> _desc, _desc['ff'], _desc['s'], _desc['lh'], this.$a(_desc['a']), true)
                    .tc(_desc['c'])
                    .a(new G.TextPhrase(_desc['desc']))
                );
            return <SeriesSlots> super.pI();
        }

        /**
         * 显示存档位。
         */
        public vs(runtime: Core.IRuntime, fs?: Core.IRuntime.Series, duration?: number): Promise<SeriesSlots> {
            this.pI();
            let states: Core.IStates = runtime.gS();
            runtime.dispatchEvent(new Ev.ScreenSave({
                target: states,
                type: 'open'
            }));
            states.s('.oc', true);
            return states.l().then(() => {
                let type: Core.IStates.Save = Core.IStates.Save.End;
                let series: Core.IRuntime.Series = Core.IRuntime.Series.Last;
                let right: G.Text.Align = G.Text.Align.Right;
                let slots: Util.IHashTable<[string, number]> = states.qa(type);
                fs == series ? this._de.o(0) : this._de.o(1);
                for (var i: number = 1; i <= 4; i++) {
                    let index: string = i.toString(),
                        _ii: number = 4 + (i - 1) * 2,
                        _i: Util.IHashTable<any> = this._c[index],
                        _it: Util.IHashTable<any> = this._c[index]['text'];
                    this.e(this._x[index])
                        .a(this._x[index] = new G.Button(<G.IBounds> _i)
                        .b(() => {
                            this.dispatchEvent(new Ev.SlotsSave({
                                target: this,
                                slot: index,
                            }));
                        }, new G.Image(this._rr[_ii + 1].o(), <G.IBounds> _i, true), new G.Image(this._rr[_ii].o(), <G.IBounds> _i, true))
                        .a(new G.Text(<G.IBounds> _it, _it['ff'], _it['s'], _it['lh'], right, true)
                            .tc(_it['c'])
                            .a(new G.TextPhrase(slots[index] ? this.$d(slots[index][1]) : '（无）'))
                        )
                    );
                }
                return this.v(duration);
            });
            /*let type: Core.IStates.Save = Core.IStates.Save.End,
                series: Core.IRuntime.Series = Core.IRuntime.Series.Last,
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
                let slots: Util.IHashTable<[string, number]> = states.qa(type);
                let last: number = 1;
                let button: (index: string, slot?: [string, number]) => void = (index: string, slot?: [string, number]) => {
                    if (index != 'auto') {
                        let _ii: number = 4 + (last - 1) * 2,
                            _i: Util.IHashTable<any> = this._c[index],
                            _it: Util.IHashTable<any> = this._c[index]['text'];
                        this.e(this._x[index])
                            .a(this._x[index] = new G.Button(<G.IBounds> _i)
                            .b(() => {
                                this.dispatchEvent(new Ev.SlotsSave({
                                    target: this,
                                    slot: index,
                                }));
                            }, new G.Image(this._rr[_ii + 1].o(), <G.IBounds> _i, true), new G.Image(this._rr[_ii].o(), <G.IBounds> _i, true))
                            .a(new G.Text(<G.IBounds> _it, _it['s'], _it['lh'], right, true)
                                .tc(_it['c'])
                                .a(new G.TextPhrase(slot ? this.$d(slot[1]) : '（无）'))
                            )
                        );
                        last++;
                    }
                };
                Util.each(slots, (slot: [string, number], index: string) => {
                    button(index, slot);
                });
                if (last <= 4) button(last.toString());
                if (last <= 4) {
                    for (var i: number = last; i <= 4; i++) {
                        let _ii: number = 4 + (i - 1) * 2;
                        let _i: Util.IHashTable<any> = this._c[i];
                        this.e(this._x[i.toString()])
                            .a(this._x[i.toString()] = new G.Image(this._rr[_ii].o(), <G.IBounds> _i));
                    }
                }
                return this.v(duration);
            };
            fail = () => {
                let _1: G.IBounds = this._c['1'];
                let _1t: Util.IHashTable<any> = _1['text'];
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
            return loop();*/
        }

        /**
         * 显示读档位。
         */
        public vl(runtime: Core.IRuntime, duration?: number): Promise<SeriesSlots> {
            this.pI();
            let states: Core.IStates = runtime.gS();
            return states.l().then(() => {
                let type: Core.IStates.Save = Core.IStates.Save.Series,
                    $a: [string, number] = <[string, number]> states.q('auto', type),
                    _a: Util.IHashTable<any> = this._c[0],
                    _at: Util.IHashTable<any> = _a['text'],
                    slots: Util.IHashTable<[string, number]> = states.qa(type),
                    right: G.Text.Align = G.Text.Align.Right;
                for (var i: number = 1; i <= 4; i++) {
                    let index: string = i.toString(),
                        slot: Util.IHashTable<any> = slots[index],
                        _ii: number = 4 + (i - 1) * 2,
                        _i: Util.IHashTable<any> = this._c[index],
                        _it: Util.IHashTable<any> = this._c[index]['text'];
                    slot ? this.a(this._x[index] = new G.Button(<G.IBounds> _i)
                        .b(() => {
                            this.dispatchEvent(new Ev.SlotsLoad({
                                target: this,
                                id: slot[0]
                            }));
                        }, new G.Image(this._rr[_ii + 1].o(), <G.IBounds> _i, true), new G.Image(this._rr[_ii].o(), <G.IBounds> _i, true))
                        .a(new G.Text(<G.IBounds> _it, _it['ff'], _it['s'], _it['lh'], right, true)
                            .tc(_it['c'])
                            .a(new G.TextPhrase(this.$d(slot[1])))
                        )
                    ) : this.a(this._x[index] = new G.Image(this._rr[_ii].o(), <G.IBounds> _i));
                }
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
                );
                (<G.Sprite> this._x['a'])
                    .a(new G.Text(<G.IBounds> _at, _at['ff'], _at['s'], _at['lh'], right, true)
                        .tc(_at['c'])
                        .a(new G.TextPhrase($a ? this.$d($a[1]['date']) : '（无）'))
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
