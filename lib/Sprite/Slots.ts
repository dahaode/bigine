/**
 * 定义画面调度档位菜单组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Sprite/Slots.ts
 */

/// <reference path="Sprite.ts" />
/// <reference path="../Resource/Resource.ts" />
/// <reference path="../Ev/_Sprite/SlotsClose.ts" />
/// <reference path="../Ev/_Sprite/SlotsLoad.ts" />
/// <reference path="../Ev/_Sprite/SlotsSave.ts" />

namespace Sprite {
    import Util = __Bigine_Util;
    import G = __Bigine_C2D;

    export class Slots extends Sprite implements Core.ISlots {
        /**
         * 自动档位和一号档位配置。
         */
        private _c: Util.IHashTable<any>[];

        /**
         * 关键元素集合。
         */
        private _x: Util.IHashTable<G.Element>;

        /**
         * 构造函数。
         */
        constructor(theme: Util.IHashTable<Util.IHashTable<any>>, close: () => void, save: (ev: Ev.SlotsSave) => void, load: (ev: Ev.SlotsLoad) => void) {
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
            this.addEventListener('slots.close', close)
                .addEventListener('slots.save', save)
                .addEventListener('slots.load', load);
        }

        protected pI(): Slots {
            if (this._pi) return this;
            let _close: Util.IHashTable<any> = this._tm['close'],
                _mask: Util.IHashTable<any> = this._tm['mask'];
            this.a(new G.Color(0, 0, 1280, 720, _mask['cb']).o(_mask['o']))
                .a(new G.Button(<G.IBounds> _close)
                    .b(() => {
                        this.dispatchEvent(new Ev.SlotsClose({ target: this }));
                    }, new G.Image(this._rr[1].o(), <G.IBounds> _close, true), new G.Image(this._rr[0].o(), <G.IBounds> _close, true))
                );
            return <Slots> super.pI();
        }

        /**
         * 显示存档位。
         */
        public vs(runtime: Core.IRuntime, duration?: number): Promise<Slots> {
            this.pI();
            let states: Core.IStates = runtime.gS();
            return states.l().then(() => {
                let slots: Util.IHashTable<[string, number]> = states.qa();
                let right: G.Text.Align = G.Text.Align.Right;
                for (var i: number = 1; i <= 4; i++) {
                    let index: string = i.toString(),
                        _ii: number = 4 + (i - 1) * 2,
                        _i: Util.IHashTable<any> = this._c[index],
                        _it: Util.IHashTable<any> = this._c[index]['text'];
                    this.a(this._x[index] = new G.Button(<G.IBounds> _i)
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
        }

        /**
         * 显示读档位。
         */
        public vl(runtime: Core.IRuntime, duration?: number): Promise<Slots> {
            this.pI();
            let states: Core.IStates = runtime.gS();
            runtime.dispatchEvent(new Ev.ScreenLoad({
                target: states,
                type: 'open'
            }));
            states.s('.oc', true);
            return states.l().then(() => {
                let slots: Util.IHashTable<[string, number]> = states.qa();
                let right: G.Text.Align = G.Text.Align.Right;
                let $a: [string, number] = <[string, number]> states.q('auto'),
                    _a: Util.IHashTable<any> = this._c[0],
                    _at: Util.IHashTable<any> = _a['text'];
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
                        .a(new G.TextPhrase($a ? this.$d($a[1]) : '（无）'))
                    );
                return this.v(duration);
            });
        }

        /**
         * 隐藏。
         */
        public h(duration?: number): Promise<Slots> {
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
