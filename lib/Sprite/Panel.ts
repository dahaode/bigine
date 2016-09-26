/**
 * 定义画面调度面板信息组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Sprite/Panel.ts
 */

/// <reference path="Sprite.ts" />
/// <reference path="../Resource/Resource.ts" />
/// <reference path="../Ev/_Sprite/PanelClose.ts" />
/// <reference path="../Ev/_Runtime/State.ts" />

namespace Sprite {
    import Util = __Bigine_Util;
    import G = __Bigine_C2D;

    export class Panel extends Sprite {
        /**
         * 简单面板标题元素集合。
         */
        private _st: Util.IHashTable<G.Text>;
        /**
         * 简单面板值元素集合。
         */
        private _sv: Util.IHashTable<G.Text | G.Sprite>;
        /**
         * 记录数据类别。
         */
        private _svt: Util.IHashTable<string>;
        /**
         * 集合面板标题元素集合。
         */
        private _ct: Util.IHashTable<G.Text>;
        /**
         * 集合面板值元素集合。
         */
        private _cv: Util.IHashTable<G.Text | G.Sprite>;
        /**
         * 集合面板翻页元素集合。
         */
        private _ca: Util.IHashTable<G.Button>;
        /**
         * 面板主题配置集合。
         */
        private _pt: Util.IHashTable<Util.IHashTable<any>>;
        /**
         * 面板背景集合。
         */
        private _pb: Util.IHashTable<G.Image>;
        /**
         * 当前激活的标签索引号。
         */
        private _ti: number;
        /**
         * 记录标签按钮及标签激活状态的图片对象。
         */
        private _tai: Util.IHashTable<G.Button | G.Image | G.Text>;
        /**
         * 设置需要画图的数据类型
         */
        private _sTypes: string[];
        /**
         * 设置集合面板头像数据类型
         */
        private _eTypes: string[];
        /**
         * 设置需要画图的数据类型资源
         */
        private _tResource: Util.IHashTable<any>;
        /**
         * 当前集合面板中显示的集合
         */
        private _cc: Array<string>;
        /**
         * 当前集合面板中的页数
         */
        private _cp: number;
        /**
         * 当前集合面板中的页数
         */
        private _ep: Core.IEpisode;
        /**
         * 记录最新的数据值
         */
        private _dr: Util.IHashTable<any>;

        /**
         * 主题是否已渲染
         */
        private _pi: boolean;

        /**
         * 构造函数。
         */
        constructor(id: string, theme: Util.IHashTable<Util.IHashTable<any>>) {
            let w: number = 1280,
                h: number = 720,
                raw: Core.IResource.Type = Core.IResource.Type.Raw,
                rr: typeof Resource.Resource = Resource.Resource,
                url: string = '//s.dahao.de/theme/',
                _close: Util.IHashTable<any> = theme['close'],
                _tab: Util.IHashTable<any> = theme['tab'],
                _simp: Util.IHashTable<any> = theme['simp'],
                _coll: Util.IHashTable<any> = theme['coll'];
            super(0, 0, w, h);
            this._pt = theme;
            this._pi = false;
            this._ti = 0;
            this._tai = {};
            this._rr = [
                // 0: 面板背景
                rr.g<HTMLImageElement>(url + theme['back']['i'], raw),
                // 1: 关闭按钮
                rr.g<HTMLImageElement>(url + _close['i'], raw),
                // 2: 关闭按钮~hover
                rr.g<HTMLImageElement>(url + _close['ih'], raw),
                // 3: 标签按钮
                rr.g<HTMLImageElement>(url + _tab['title']['i'], raw),
                // 4: 标签按钮激活状态图片
                rr.g<HTMLImageElement>(url + _tab['title']['ia'], raw),
                // 5: 简单面板背景
                rr.g<HTMLImageElement>(url + _simp['back']['i'], raw),
                // 6: 集合面板背景
                rr.g<HTMLImageElement>(url + _coll['back']['i'], raw),
                // 7: 集合面板上一个按钮
                rr.g<HTMLImageElement>(url + _coll['arrow']['p']['i'], raw),
                // 8: 集合面板上一个按钮~hover
                rr.g<HTMLImageElement>(url + _coll['arrow']['p']['ih'], raw),
                // 9: 集合面板下一个按钮
                rr.g<HTMLImageElement>(url + _coll['arrow']['n']['i'], raw),
                // 10: 集合面板下一个按钮~hover
                rr.g<HTMLImageElement>(url + _coll['arrow']['n']['ih'], raw)
            ];
            this._st = {};
            this._sv = {};
            this._svt = {};
            this._ct = {};
            this._cv = {};
            this._ca = {};
            this._pb = {};
            this._sTypes = ['心', '星'];
            this._eTypes = ['人物', '房间', '特写'];
            this._tResource = {};
            this._cc = [];
            this._cp = 0;
            this._dr = {};
            this.o(0);
        }

        /**
         * 配置。
         */
        public u(sheet: Array<Util.IHashTable<any>>, runtime: Core.IRuntime): Panel {
            this._ep = runtime.gE();
            if (sheet.length == 0) return this;
            // 集合面板翻页上一页按钮
            let pBounds: G.IBounds = <G.IBounds> this._pt['coll']['arrow']['p'];
            this.pI()
                .a(this._ca['p'] = new G.Button(pBounds)
                .b(() => {
                    this._cp = this._cp == 0 ?  (this._cc.length - 1) : (this._cp - 1);
                    this.uC(sheet[this._ti], this._dr);
                },
                new G.Image(this._rr[8].o(), pBounds, true),
                new G.Image(this._rr[7].o(), pBounds, true)));
            this._ca['p'].o(0);
            // 集合面板翻页下一页按钮
            let nBounds: G.IBounds = <G.IBounds> this._pt['coll']['arrow']['n'];
            this.a(this._ca['n'] = new G.Button(nBounds)
                .b(() => {
                    this._cp = (this._cp == this._cc.length - 1) ? 0 : (this._cp + 1);
                    this.uC(sheet[this._ti], this._dr);
                },
                new G.Image(this._rr[10].o(), nBounds, true),
                new G.Image(this._rr[9].o(), nBounds, true)));
            this._ca['n'].o(0);

            this.uT(sheet);
            // 显示第一个标签页的数据
            this.uContent(sheet[0], null);
            // 监听数据变化
            runtime.addEventListener('state', (ev: Ev.State) => {
                this._dr = ev.data;
                this.uContent(sheet[this._ti], ev.data);
            });
            return this;
        }

        /**
         * 初始化渲染。
         */
        private pI(): Panel {
            if (this._pi) return this;
            let w: number = 1280,
                h: number = 720,
                raw: Core.IResource.Type = Core.IResource.Type.Raw,
                rr: typeof Resource.Resource = Resource.Resource,
                url: string = '//s.dahao.de/theme/',
                theme: Util.IHashTable<Util.IHashTable<any>> = this._pt,
                _mask: Util.IHashTable<any> = theme['mask'],
                _back: Util.IHashTable<any> = theme['back'],
                _close: Util.IHashTable<any> = theme['close'],
                _simp: Util.IHashTable<any> = theme['simp'],
                _coll: Util.IHashTable<any> = theme['coll'],
                _type: Util.IHashTable<any> = theme['type'],
                i: number = 1,
                left: G.Text.Align = G.Text.Align.Left;
            // 渲染面板初始样式
            this.a(new G.Color(0, 0, w, h, _mask['cb']).o(_mask['o']))
                .a(new G.Image(this._rr[0].o(), <G.IBounds> _back))
                .a(new G.Button(<G.IBounds> _close)
                    .b(() => {
                        this.dispatchEvent(new Ev.PanelClose({ target: this }));
                    }, new G.Image(this._rr[2].o(), <G.IBounds> _close, true), new G.Image(this._rr[1].o(), <G.IBounds> _close, true))
                );
            // 简单面板背景
            this.a(this._pb['s'] = new G.Image(this._rr[5].o(), <G.IBounds> _simp['back'], true));
            this._pb['s'].o(0);
            // 集合面板背景
            this.a(this._pb['c'] = new G.Image(this._rr[6].o(), <G.IBounds> _coll['back'], true));
            this._pb['c'].o(0);

            // 构造简单面板中渲染数据名的容器
            for (; i < 13; i++) {
                let titleTxt: G.Text = new G.Text(<G.IBounds> _simp[i]['title'], _simp[i]['title']['s'], _simp[i]['title']['lh'], left);
                this._st[i + 't'] = titleTxt;
                this.a(this._st[i + 't']).o(0);
            }

            Util.each(_type, (typeTheme: Util.IHashTable<any>, typeName: string) => {
                this._tResource[typeName] = {};
                this._tResource[typeName]['ei'] = rr.g<HTMLImageElement>(url + typeTheme['ei'], raw);
                this._tResource[typeName]['fi'] = rr.g<HTMLImageElement>(url + typeTheme['fi'], raw);
            });

            // 集合面板数据标题和数据值
            Util.each(_coll, (config: Util.IHashTable<any>, name: string) => {
                if (name == 'back' || name == 'arrow') return ;
                if (name == 'head') {
                    // 初始化集合面板数据值显示元素
                    this._cv[name] = new G.Sprite(<G.IBounds> config, false, true);
                    this.a(this._cv[name]);
                    this._cv[name].o(0);
                }  else if (name == 'name') {
                    // 初始化集合面板数据值显示元素
                    let align: G.Text.Align = this.align(config['a']);
                    this._cv[name] = new G.Text(<G.IBounds> config, config['s'], config['lh'], align, true);
                    this.a(this._cv[name]);
                    this._cv[name].o(0);
                } else {
                    let tBounds: G.IBounds = <G.IBounds> config['title'];
                    let vBounds: G.IBounds = <G.IBounds> config['value'];
                    // 初始化集合面板数据标题元素
                    this._ct[name + 't'] = new G.Text(tBounds, tBounds['s'], tBounds['lh']);
                    this.a(this._ct[name + 't']);
                    this._ct[name + 't'].o(0);
                    // 初始化集合面板数据值显示元素
                    this._cv[name + 'v'] = new G.Sprite(vBounds, false, true);
                    this.a(this._cv[name + 'v']);
                    this._cv[name + 'v'].o(0);
                }
            });

            return this;
        }

        /**
         * 绘制面板标签
         */
        private uT(sheet: Array<Util.IHashTable<any>>): Panel {
            let align: G.Text.Align = this.align(this._pt['tab']['title']['a']);
            let activeImage: G.Image;
            // 渲染面板切换标签
            Util.each(sheet, (data: Util.IHashTable<string>, index: number) => {
                let tabBtn: G.Button = <G.Button> this._tai[data['n']];
                if (!tabBtn) {
                    let tabPosi: Util.IHashTable<any> = this._pt['tab'][index + 1 + ''];
                    let titleBounds: G.IBounds = Util.clone(this._pt['tab']['title']);
                    let tabText: G.Text = new G.Text(titleBounds, titleBounds['s'], titleBounds['lh'], align);
                    this._tai[index + 't'] = tabText;
                    let tabBounds: G.IBounds = Util.clone(titleBounds);
                    tabBounds['x'] = tabPosi['x'];
                    tabBounds['y'] = tabPosi['y'];
                    let tabImage: G.Image = new G.Image(this._rr[3].o(), tabBounds, true);
                    this._tai[data['n']] = tabBtn = new G.Button(tabBounds)
                        .b(() => {
                            if (index == this._ti) return;
                            this._ti = index;
                            this._cp = 0;
                            this.clean();
                            this.uT(sheet);
                            this.uContent(data, this._dr);
                        }, null, tabImage);
                    tabBtn.a(tabText.a(new G.TextPhrase(data['n']))).o(1);
                    this.a(tabBtn);
                }
                if (index == this._ti) {
                    activeImage = new G.Image(this._rr[4].o(), tabBtn.gB(), true);
                    tabBtn.a(activeImage, this._tai[this._ti + 't']);
                } else {
                    tabBtn.e(this._tai['a']);
                }
                if (index >= 5) return false;
            });
            this._tai['a'] = activeImage;
            return this;
        }

        /**
         * 绘制面板内容
         */
        private uContent(sheet: Util.IHashTable<any>, data: Util.IHashTable<any>): Panel {
            if (!sheet) return this;
            this.clean();
            let type: string = sheet['：'];
            switch (type) {
                case 'simp':
                    this.uS(sheet, data);
                    break;
                case 'coll':
                    this.uC(sheet, data);
                    break;
            }
            return this;
        }

        /**
         * 绘制简单面板
         */
        private uS(sheet: Util.IHashTable<any>, data: Util.IHashTable<any>): Panel {
            this._pb['s'].o(1);
            let simpData: Array<Util.IHashTable<any>> = sheet['c'];
            if (!simpData || simpData.length == 0) return this;
            let simpTheme: Util.IHashTable<any> = this._pt['simp'],
                left: G.Text.Align = G.Text.Align.Left;
            Util.each(simpData, (simpField: Util.IHashTable<any>, index: number) => {
                // 画出简单面板中显示的数据名
                this._st[index + 1 + 't'].c().a(new G.TextPhrase(simpField['alias'])).o(1);
                /* 画出简单面板中显示的数据值 */
                // 获取数据类型
                let type: string = this._svt[simpField['name']] || simpField['type'];
                // 保存数据类型到本地
                if (type && !this._svt[simpField['name']]) {
                    this._svt[simpField['name']] = type;
                }
                // 获取数据值
                let value: string = data ? data[simpField['name']] : '';
                // 构建数据值渲染容器
                if (!this._sv[simpField['name']]) {
                    let i: string = index + 1 + '';
                    if (type && Util.indexOf(this._sTypes, type) > -1) {
                        this.a(this._sv[simpField['name']] = new G.Sprite(<G.IBounds> simpTheme[i]['value'], false, true));
                    } else {
                        this.a(this._sv[simpField['name']] = new G.Text(<G.IBounds> simpTheme[i]['value'], simpTheme[i]['value']['s'], simpTheme[i]['value']['lh'], left));
                    }
                }
                // 如果数据类型是图片类型
                if (type && Util.indexOf(this._sTypes, type) > -1) {
                    (<G.Sprite> this._sv[simpField['name']]).c();
                    let rValue: number = value ? parseInt(value, 10) : 0;
                    for (let j: number = 0; j < rValue; j++) {
                        let typeBound: G.IBounds = <G.IBounds> Util.clone(this._pt['type'][type]);
                        typeBound['x'] = j * (this._pt['type'][type]['m'] + this._pt['type'][type]['w']);
                        typeBound['y'] = (simpTheme[index + 1 + '']['value']['lh'] - this._pt['type'][type]['h']) / 2;
                        let image: G.Image = new G.Image(this._tResource[type]['ei'].o(), <G.IBounds> typeBound, false);
                        (<G.Sprite> this._sv[simpField['name']]).a(image);
                    }
                    (<G.Sprite> this._sv[simpField['name']]).o(1);
                } else { // 如果数据类型是普通类型
                    (<G.Text> this._sv[simpField['name']]).c().a(new G.TextPhrase(value + '')).o(1);
                }
            });
            return this;
        }

        /**
         * 绘制集合面板
         */
        private uC(sheet: Util.IHashTable<any>, data: Util.IHashTable<any>): Panel {
            if (!data) return this;
            // 渲染背景
            this._pb['c'].o(1);
            // 取出集合数据
            let collName: string = sheet['cn'][0];
            this._cc = data[collName][''];
            let name: string = this._cc[this._cp];
            let collData: Util.IHashTable<any> = data[name];
            // 取出集合的结构
            let cStruct: Tag.Struct = <Tag.Struct> this._ep.q(sheet['s'], Core.IEpisode.Entity.Struct);
            let i: number = 1;
            Util.each(cStruct.gS(), (field: Tag.Field) => {
                let fieldName: string = field.$c(),
                    fieldValue: string | number | Tag.Entity = collData[fieldName],
                    fieldType: string = field.gT();
                // 渲染头像
                if (field.iE()) {
                    let hBounds: G.IBounds = <G.IBounds> this._pt['coll']['head'];
                    let iBounds: G.IBounds = <G.IBounds> {x: 0, y: 0, w: hBounds['w'], h: hBounds['h']};
                    let entity: Tag.Entity = field.gIE(<string> fieldValue);
                    (<G.Sprite> this._cv['head']).c().a(
                        new G.Image((<any> entity).o().o(), iBounds)
                        ).o(1);
                } else if (field.iN()) { // 渲染名称
                    (<G.Text> this._cv['name']).c().a(
                        new G.TextPhrase(<string> fieldValue)
                        ).o(1);
                } else { // 其它字段
                    if (fieldValue == '空') {
                        i ++;
                        return;
                    }
                    (<G.Text> this._ct[i + 't']).c().a(
                        new G.TextPhrase(fieldName)
                        ).o(1);
                    // 心或星类型的字段
                    (<G.Sprite> this._cv[i + 'v']).c();   // 先清空
                    if (Util.indexOf(this._sTypes, field.gT()) > -1) {
                        let lValue: number = <number> field.gL(),
                            rValue: number = <number> fieldValue;
                        for (let j: number = 0; j < lValue; j++) {
                            let tTheme: Util.IHashTable<any> = this._pt['type'][field.gT()],
                                typeBound: G.IBounds = <G.IBounds> Util.clone(tTheme),
                                res: Resource.Resource<HTMLImageElement> = j < rValue ? this._tResource[fieldType]['ei'] : this._tResource[fieldType]['fi'],
                                image: G.Image = new G.Image(res.o(), <G.IBounds> typeBound, false);
                            typeBound['x'] = j * (this._pt['type'][fieldType]['m'] + this._pt['type'][fieldType]['w']);
                            typeBound['y'] = (this._pt['coll'][i + '']['value']['lh'] - this._pt['type'][fieldType]['h']) / 2;
                            (<G.Sprite> this._cv[i + 'v']).a(image);
                        }
                        this._cv[i + 'v'].o(1);
                    } else {
                        // 普通字段
                        let tValue: Util.IHashTable<any> = this._pt['coll'][i + '']['value'],
                            iBound: G.IBounds = <G.IBounds> Util.clone(tValue),
                            align: G.Text.Align = G.Text.Align.Left;
                        iBound['x'] = 0;
                        iBound['y'] = 0;
                        (<G.Sprite> this._cv[i + 'v']).a(
                            new G.Text(iBound, iBound['s'], iBound['lh'], align, false).c().a(
                                new G.TextPhrase(fieldValue + '')
                                )
                            ).o(1);

                    }
                    i ++;
                }
            });
            this._ca['p'].o(1);
            this._ca['n'].o(1);
            return this;
        }

        /**
         * 清除面板
         */
        private clean(): void {
            // 清除简单面板标题元素集合
            Util.each(this._st, (text: G.Text) => {
                text.c().o(0);
            });
            // 清除简单面板值元素集合
            Util.each(this._sv, (text: G.Text | G.Sprite) => {
                text.c().o(0);
            });
            // 清除集合面板标题元素集合
            Util.each(this._ct, (text: G.Text) => {
                text.c().o(0);
            });
            // 清除集合面板值元素集合
            Util.each(this._cv, (text: G.Text | G.Sprite) => {
                text.c().o(0);
            });
            // 清除集合面板翻页元素集合
            Util.each(this._ca, (btn: G.Button) => {
                btn.o(0);
            });
            // 清除简单面板背景
            this._pb['s'].o(0);
            // 清除集合面板背景
            this._pb['c'].o(0);
        }

        /**
         * 获取对齐方式
         */
        private align(ali: string): G.Text.Align {
            let align: G.Text.Align = G.Text.Align.Center;
            switch (ali) {
                case 'l':
                    align = G.Text.Align.Left;
                    break;
                case 'r':
                    align = G.Text.Align.Right;
                    break;
                default:
                    align = G.Text.Align.Center;
                    break;
            }
            return align;
        }
    }
}
