/**
 * 定义基于 HTML Canvas 的（运行时）场效调度器组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/_Director/CanvasDirector.ts
 */

/// <reference path="Director.ts" />
/// <reference path="../../Sprite/_pack.ts" />
/// <reference path="../../Ev/_Runtime/Fin.ts" />

/**
 * * b - 背景
 * * M - 地图
 * * c - 人物
 * * L - 加载进度条
 *     * e - 完成进度条
 */
namespace Runtime {
    import Util = __Bigine_Util;
    import G = __Bigine_C2D;

    export class CanvasDirector extends Director {
        /**
         * 尺寸。
         */
        public static BOUNDS: G.IBounds = {
            x: 0,
            y: 0,
            w: 1280,
            h: 720
        };

        /**
         * 画板。
         */
        private _c: G.Stage;

        /**
         * 声音。
         */
        private _s: Util.IHashTable<HTMLAudioElement>;

        /**
         * 基础图片。
         */
        private _i: Util.IHashTable<Resource.Resource<string | HTMLImageElement>>;

        /**
         * 文字配置。
         */
        private _f: Util.IHashTable<Util.IHashTable<string | number>>;

        /**
         * 自动播放相关动画。
         */
        private _t: G.Animation;

        /**
         * 阻塞类相关动画。
         */
        private _h: G.Animation;

        /**
         * 阻塞类 Promise 。
         */
        private _q: () => void;

        /**
         * 预加载进度。
         */
        private _e: [number, number];

        /**
         * 键盘事件监听函数。
         */
        private _l: (event: KeyboardEvent) => void;

        /**
         * 画面组件集合。
         */
        private _x: Util.IHashTable<Sprite.Sprite>;

        /**
         * 连载模式。
         */
        private _fs: Core.IRuntime.Series;

        /**
         * 构造函数。
         */
        constructor(runtime: Core.IRuntime) {
            super(runtime);
            var doc: Document = document,
                els: NodeList | HTMLElement[] = doc.querySelectorAll('.bg-work'),
                canvas: HTMLCanvasElement = doc.createElement('canvas'),
                raw: Core.IResource.Type = Core.IResource.Type.Raw,
                bounds: G.IBounds = CanvasDirector.BOUNDS,
                assets: string = '//s.dahao.de/theme/_/';
            canvas.width = bounds.w;
            canvas.height = bounds.h;
            canvas.className = 'viewport';
            if (!els.length) {
                this._d = true;
                els = [doc.createElement('div')];
                (<HTMLElement> els[0]).className = 'bg-work dynamic';
                doc.body.appendChild(els[0]);
            }
            els[0].appendChild(canvas);
            this._x = {};
            this._c = <G.Stage> new G.Stage(canvas.getContext('2d'))
                .a(new G.Color(bounds, '#000').i('b'))
                .a(new G.Sprite(bounds).i('M').o(0))
                .a(new G.Sprite(bounds).i('c').o(0))
                .a(this._x['c'] = new Sprite.Curtain())
                .a(new G.Sprite(0, bounds.h - 3, bounds.w, 3).a(new G.Color(0, 0, bounds.w, 3, '#0cf').i('e')).i('L').o(0));
            this.f();
            this._s = {
                b: new Audio(),
                e: new Audio()
            };
            this._s['b'].autoplay = true;
            this._s['b'].loop = true;
            this._s['e'].autoplay = true;
            this._s['e']['cd'] = -1;
            this._i = {
                o: Resource.Resource.g<HTMLImageElement>(assets + 'logo.png', raw),
                e: Resource.Resource.g<HTMLImageElement>(assets + 'thx.png', raw),
                s: Resource.Resource.g<string>(assets + 'oops.mp3', raw),
                s3: Resource.Resource.g<HTMLImageElement>(assets + '3stars.png', raw),
                s2: Resource.Resource.g<HTMLImageElement>(assets + '2stars.png', raw),
                s1: Resource.Resource.g<HTMLImageElement>(assets + '1star.png', raw),
                f: Resource.Resource.g<string>(assets + 'focus.mp3', raw),
                c: Resource.Resource.g<string>(assets + 'click.mp3', raw)
            };
            this._f = {};
            this._e = [0, 0];
            this._l = (event: KeyboardEvent) => {
                if (13 == event.keyCode && !this._a && this._t)
                    this._t.h();
            };
            this._fs = Core.IRuntime.Series.Alone;
            window.addEventListener('keydown', this._l);
        }

        /**
         * 预加载指定资源组。
         *
         * @param resources 一个（作品）事件所包含地所有资源
         */
        public c(resources: Resource.Resource<string | HTMLImageElement>[][]): Promise<void> {
            var gLoading: G.Sprite = <G.Sprite> this._c.q('L')[0],
                gElapsed: G.Element = gLoading.q('e')[0],
                bounds: G.IBounds = CanvasDirector.BOUNDS,
                progress: (done: boolean) => void = (done: boolean) => {
                    var e: [number, number] = this._e;
                    e[0 + <any> done]++;
                    if (e[0] == e[1]) {
                        this._e = [0, 0];
                        return gLoading.o(0);
                    }
                    gElapsed.x((e[1] / e[0] - 1) * bounds.w);
                    gLoading.o(1);
                };
            Util.each(resources, (frame: Resource.Resource<string | HTMLImageElement>[]) => {
                Util.each(frame, (resource: Resource.Resource<string | HTMLImageElement>) => {
                    progress(false);
                    resource.w((value: string | HTMLImageElement) => {
                        progress(true);
                    });
                });
            });
            return Resource.Prefecher.c(resources, this._r.gL());
        }

        /**
         * 开始动画。
         */
        public OP(start: boolean, title: string, author: string): Promise<Core.IRuntime> {
            (<Sprite.Start> this._x['s']).u(title, Core.IRuntime.Series.Rest == this._fs);
            return this.c([[this._i['o']]])
                .then(() => this.reset())
                .then(() => {
                    let gLogo: G.Image = new G.Image(this._i['o'].o(), CanvasDirector.BOUNDS);
                    this._c.z()
                        .a(gLogo, this._x['c']);
                    return this.lightOn()
                        .then(() => gLogo.p(new G.Delay(1000)))
                        .then(() => this.lightOff())
                        .then(() => {
                            this._c.e(gLogo);
                            if (!author) return;
                            let gAuthor: Sprite.Author = (<Sprite.Author> this._x['a']).u(author);
                            gAuthor.v(0);
                            return this.lightOn()
                                .then(() => gAuthor.p(new G.Delay(1000)))
                                .then(() => this.lightOff())
                                .then(() => gAuthor.o(0));
                        }).then(() => super.OP(start, title, author))
                        .then((runtime: Core.IRuntime) => {
                            if (!this._a)
                                this._x['t'].v(0);
                            if (!start)
                                return runtime;
                            this._x['s'].v(0);
                            return this.lightOn();
                        });
                });
        }

        /**
         * 完结动画。
         */
        public ED(): Promise<Core.IRuntime> {
            return this.c([[this._i['e']]])
                .then(() => {
                    var gED: G.Image = new G.Image(this._i['e'].o(), CanvasDirector.BOUNDS);
                    this.playBGM();
                    this.playSE();
                    return this.lightOff()
                        .then(() => {
                            this._r.dispatchEvent(new Ev.Fin({
                                target: this._r.gE()
                            }));
                            this._c.a(gED, this._x['c']);
                            this._x['t'].h(0);
                            return this.lightOn();
                        }).then(() => gED.p(new G.Delay(2000)))
                        .then(() => this.lightOff())
                        .then(() => {
                            this._c.e(gED);
                            return super.ED();
                        });
                }).then(() => this.$s());
        }

        /**
         * 连载存档。
         */
        protected $s(): Promise<Core.IRuntime> {
            if (Core.IRuntime.Series.Alone == this._fs)
                return Promise.resolve(this._r);
            return new Promise((resolve: (runtime: Core.IRuntime) => void) => {
                let $c: string = 'slots.close',
                    close: () => void = () => {
                        this._x['ss'].removeEventListener($c, close);
                        resolve(this._r);
                    },
                    $s: string = 'slots.save',
                    save: () => void = () => {
                        this._x['ss'].removeEventListener($s, save);
                        resolve(this._r);
                    };
                this.lightOn().then(() => {
                    (<Sprite.SeriesSlots> this._x['ss']
                        .addEventListener($c, close)
                        .addEventListener($s, save)
                    ).vs(this._r.gS());
                });
            }).then(() => this.lightOff());
        }

        /**
         * 人物出场。
         */
        public charOn(resource: Resource.Resource<HTMLImageElement>, position: Core.IDirector.Position): Promise<Core.IRuntime> {
            var states: Core.IStates = this._r.gS(),
                gChars: G.Sprite = <G.Sprite> this._c.q('c')[0],
                kamount: string = '$c',
                gChar: G.Image = this.$c(resource, position);
            states.s(kamount, 1 + (<number> states.g(kamount) || 0));
            gChars.a(gChar.i(<any> position));
            if (this._x['G'].gO()) {
                gChar.o(1);
                return this._p;
            }
            gChars.o(1);
            return gChar.p(new G.FadeIn(500))
                .then(() => this._r);
        }

        /**
         * 人物离场。
         */
        public charOff(position: Core.IDirector.Position): Promise<Core.IRuntime> {
            var states: Core.IStates = this._r.gS(),
                kamount: string = '$c',
                amount: number = states.g(kamount),
                gChars: G.Sprite = <G.Sprite> this._c.q('c')[0],
                gChar: G.Element = gChars.q(<any> position)[0];
            if (gChar) {
                states.s(kamount, --amount);
                return gChar.p(new G.FadeOut(500)).then(() => {
                    gChars.e(gChar);
                    if (!amount)
                        gChars.o(0);
                    return this._r;
                });
            }
            return this._p;
        }

        /**
         * 设置人物。
         */
        public charSet(resource: Resource.Resource<HTMLImageElement>, position: Core.IDirector.Position): Promise<Core.IRuntime> {
            var states: Core.IStates = this._r.gS(),
                kamount: string = '$c',
                gChars: G.Sprite = <G.Sprite> this._c.q('c')[0],
                gChar: G.Element = gChars.q(<any> position)[0];
            if (gChar) {
                gChars.e(gChar);
            } else
                states.s(kamount, 1 + (<number> states.g(kamount) || 0));
            gChar = this.$c(resource, position).o(1).i(<any> position);
            gChars.a(gChar);
            if (!this._x['G'].gO())
                gChars.o(1);
            return this._p;
        }

        /**
         * 人物移动。
         */
        public charMove(from: Core.IDirector.Position, to: Core.IDirector.Position): Promise<Core.IRuntime> {
            var gChars: G.Sprite = <G.Sprite> this._c.q('c')[0],
                gChar: G.Element = gChars.q(<any> from)[0],
                pos: typeof Core.IDirector.Position = Core.IDirector.Position,
                x: number;
            if (!gChar)
                return this._p;
            switch (to) {
                case pos.Left:
                    x = 0;
                    break;
                case pos.CLeft:
                    x = 200;
                    break;
                case pos.Center:
                    x = 400;
                    break;
                case pos.CRight:
                    x = 600;
                    break;
                case pos.Right:
                    x = 800;
                    break;
            }
            return gChar.p(new G.Move(500, {
                x: x,
                y: gChar.gB().y
            })).then(() => {
                gChar.i(<any> to);
                return this._r;
                });
        }

        /**
         * 创建立绘。
         */
        protected $c(resource: Resource.Resource<HTMLImageElement>, position: Core.IDirector.Position): G.Image {
            var bounds: G.IBounds = CanvasDirector.BOUNDS,
                pos: typeof Core.IDirector.Position = Core.IDirector.Position,
                w: number = 0 | bounds.h / 3 * 2,
                x: number;
            switch (position) {
                case pos.Left:
                    x = 0;
                    break;
                case pos.CLeft:
                    x = 200;
                    break;
                case pos.Center:
                    x = 400;
                    break;
                case pos.CRight:
                    x = 600;
                    break;
                case pos.Right:
                    x = 800;
                    break;
            }
            return <G.Image> new G.Image(resource.o(), x, 0, w, bounds.h)
                .i(<any> position)
                .o(0);
        }

        /**
         * 某白。
         */
        public words(words: string, theme: string, who?: string, avatar?: Resource.Resource<HTMLImageElement>): Promise<Core.IRuntime> {
            let sprite: Sprite.Words = <Sprite.Words> this._x['W'];
            return this.lightOn().then(() => {
                let type: string = theme[0];
                if ('v' == type)
                    return sprite.vv(words, this._a);
                return sprite['v' + type](avatar, who, words, this._a);
            }).then(() => {
                sprite.h(0);
                return this._r;
            });
        }

        /**
         * 提示。
         */
        public tip(words: string): Promise<Core.IRuntime> {
            let gTip: Sprite.Tip = <Sprite.Tip> this._x['T'];
            return this.lightOn()
                .then(() => gTip.u(words).v())
                .then(() => gTip.p(new G.WaitForClick()))
                .then(() => gTip.h())
                .then(() => this._r);
        };

        /**
         * 评分动画。
         */
        public stars(rank: Core.IDirector.Stars): Promise<Core.IRuntime> {
            var ranks: typeof Core.IDirector.Stars = Core.IDirector.Stars,
                key: string = 's';
            switch (rank) {
                case ranks.Perfect:
                    key += '3';
                    break;
                case ranks.Awesome:
                    key += '2';
                    break;
                case ranks.OK:
                    key += '1';
                    break;
            }
            return this.c([[this._i[key]]])
                .then(() => {
                    var gStars: G.Image = new G.Image(this._i[key].o(), CanvasDirector.BOUNDS);
                    return this.lightOff()
                        .then(() => {
                            this._r.dispatchEvent(new Ev.Fin({
                                target: this._r.gE()
                            }));
                            this._x['t'].h(0);
                            this._c.a(gStars, this._x['c']);
                            return this.lightOn();
                        }).then(() => gStars.p(new G.Delay(2000)))
                        .then(() => this.lightOff())
                        .then(() => {
                            this._c.e(gStars);
                            return this._r;
                        });
                });
        }

        /**
         * 播放背景音乐。
         */
        public playBGM(resource?: Resource.Resource<string>): Promise<Core.IRuntime> {
            var oops: string = this._i['s'].l(),
                url: string = resource ? resource.l() : oops,
                bgm: HTMLAudioElement = this._s['b'],
                volume: number = bgm.volume,
                change: () => Promise<Core.IRuntime> = () => {
                    bgm.volume = volume;
                    if (bgm.src != url)
                        bgm.src = url;
                    return super.playBGM(resource);
                };
            if (!resource)
                bgm.play();
            if (bgm.src && bgm.src != oops)
                return new G.AudioFadeOut(1500).p(bgm).then(change);
            return change();
        }

        /**
         * 播放音效。
         */
        public playSE(resource?: Resource.Resource<string>): Promise<Core.IRuntime> {
            var url: string = (resource || this._i['s']).l(),
                se: HTMLAudioElement = this._s['e'],
                type: string = 'ended',
                resume: () => void = () => {
                    se.removeEventListener(type, resume);
                    this._s['b'].play();
                };
            se.addEventListener(type, resume);
            se.src = url;
            if (!resource)
                this._s['e'].play();
            return super.playSE(resource);
        }

        /**
         * 关闭特写。
         */
        public hideCG(): Promise<Core.IRuntime> {
            return super.hideCG().then((runtime: Core.IRuntime) => {
                let gCG: Sprite.CG = <Sprite.CG> this._x['G'],
                    gChars: G.Element = this._c.q('c')[0];
                return Promise.all([
                    gChars.p(new G.FadeIn(500)),
                    gCG.h()
                ]).then(() => {
                    if (!this._r.gS().g('$c'))
                        gChars.o(0);
                    return runtime;
                });
            });
        }

        /**
         * 展示特写。
         */
        public showCG(resource: Resource.Resource<HTMLImageElement>): Promise<Core.IRuntime> {
            return super.showCG(resource).then((runtime: Core.IRuntime) => {
                var gChars: G.Element = this._c.q('c')[0],
                    gCG: Sprite.CG = <Sprite.CG> this._x['G'];
                return this.lightOn()
                    .then(() => {
                        return Promise.all([
                            gChars.p(new G.FadeOut(500)),
                            gCG.u(resource).v()
                        ]).then(() => gCG.p(this._h = new G.WaitForClick()));
                    }).then(() => runtime);
            });
        }

        /**
         * 设置房间。
         */
        public asRoom(resource: Resource.Resource<HTMLImageElement>, time: boolean = false): Promise<Core.IRuntime> {
            return super.asRoom(resource).then((runtime: Core.IRuntime) => {
                var gOld: G.Element = this._c.q('b')[0],
                    gNew: G.Element = new G.Image(resource.o(), CanvasDirector.BOUNDS).i('b')
                        .o(0);
                this._c.a(gNew, 'M');
                if (!time || this._x['c'].gO()) {
                    gNew.o(1);
                    this._c.e(gOld);
                    return runtime;
                }
                return gNew.p(new G.FadeIn(500)).then(() => {
                    this._c.e(gOld);
                    return runtime;
                });
            });
        }

        /**
         * 设置地图。
         */
        public asMap(points: Util.IHashTable<Core.IPointTag>): Promise<Core.IRuntime> {
            var gMap: G.Sprite = <G.Sprite> this._c.q('M')[0],
                gPoints: [number, G.Button][] = [],
                bounds: G.IBounds = CanvasDirector.BOUNDS,
                gPoint: G.Button,
                z: number,
                added: boolean;
            Util.each(points, (point: Core.IPointTag) => {
                z = point.gZ();
                gPoint = <G.Button> new G.Button(point.gX(), point.gY(), point.gW(), point.gH())
                    .b(() => {
                        this.playSE(this._i['c']);
                        point.p(this._r);
                    }, new G.Image(point.o().o(), bounds, true))
                    .addEventListener('$focus', () => {
                        this.playSE(this._i['f']);
                    });
                added = Util.some(gPoints, (item: [number, G.Button], index: number) => {
                    if (z >= item[0])
                        return false;
                    gPoints.splice(index, 0, [z, gPoint]);
                    return true;
                });
                if (!added)
                    gPoints.push([z, gPoint]);
            });
            gMap.c()
                .o(1);
            Util.each(gPoints, (item: [number, G.Button]) => {
                gMap.a(item[1]);
            });
            return this._p;
        }

        /**
         * 关灯（落幕）。
         */
        public lightOff(): Promise<Core.IRuntime> {
            return this._x['c'].v().then(() => this._r);
        }

        /**
         * 开灯（开幕）。
         */
        public lightOn(): Promise<Core.IRuntime> {
            return this._x['c'].h().then(() => this._r);
        }

        /**
         * 选择。
         */
        public choose(options: Core.IOptionTag[]): Promise<Core.IRuntime> {
            return new Promise((resolve: (data: Core.IRuntime) => void, reject: (reason?: any) => void) => {
                this._q = () => {
                    E.doHalt<Core.IRuntime>()['catch']((error: any) => {
                        reject(error);
                    });
                };
                let gChoose: Sprite.Choose = <Sprite.Choose> this._x['C'],
                    event: string = 'choose',
                    handler: () => void = () => {
                        gChoose.removeEventListener(event, handler);
                        gChoose.h().then(() => {
                            resolve(this._r);
                        });
                    };
                gChoose.u(options).addEventListener(event, handler);
                this.lightOn()
                    .then(() => gChoose.v());
            });
        }

        /**
         * 重置状态。
         */
        public reset(): Promise<Core.IRuntime> {
            return super.reset().then((runtime: Core.IRuntime) => {
                var gBack: G.Element = this._c.q('b')[0],
                    gColor: G.Color = new G.Color(CanvasDirector.BOUNDS, '#000');
                this._c.a(gColor, gBack)
                    .e(gBack);
                gColor.i('b');
                (<G.Sprite> this._c.q('M')[0]).c();
                (<G.Sprite> this._c.q('c')[0]).c()
                    .o(0);
                this._x['G'].h(0);
                this._x['W'].h(0);
                this._x['T'].h(0);
                this._x['C'].h(0);
                return runtime;
            });
        }

        /**
         * （读档继续时）设置特写。
         */
        public setCG(resource: Resource.Resource<HTMLImageElement>): Promise<Core.IRuntime> {
            return super.setCG(resource).then((runtime: Core.IRuntime) => {
                (<Sprite.CG> this._x['G']).u(resource).v(0);
                return runtime;
            });
        }

        /**
         * 停顿。
         */
        public pause(milsec: number): Promise<Core.IRuntime> {
            if (milsec) {
                return this._c.p(new G.Delay(milsec)).then(() => {
                    return super.pause(milsec);
                });
            } else {
                // 建立临时透明层，使得可以响应WaitForClick事件。
                let sPause: G.Sprite = new G.Sprite(CanvasDirector.BOUNDS, false);
                this._c.a(sPause.i('P').o(1));
                return sPause.p(new G.WaitForClick()).then(() => {
                    this._c.e(sPause);
                    return super.pause(milsec);
                });
            }
        }

        /**
         * 使用主题。
         */
        public t(id: string, theme: Util.IHashTable<Util.IHashTable<any> >): CanvasDirector {
            let resources: Resource.Resource<string | HTMLImageElement>[][] = [],
                gCurtain: Sprite.Curtain = this._x['c'],
                slotsFromStart: boolean = false;
            // 特写。
            this._c.a(this._x['G'] = <Sprite.CG> new Sprite.CG(theme['cg']), gCurtain);
            // 状态。
            this._x['S'] = <Sprite.Status> new Sprite.Status(id, theme['status']);
            resources.unshift(this._x['S'].l());
            this._c.a(this._x['S'], gCurtain);
            // 某白。
            this._x['W'] = <Sprite.Words> new Sprite.Words(id, theme['voiceover'], theme['monolog'], theme['speak'])
                .addEventListener('words.animation', (ev: Ev.WordsAnimation) => {
                    this._t = this._h = ev.animation;
                });
            resources.unshift(this._x['W'].l());
            this._c.a(this._x['W'], gCurtain);
            // 选择。
            this._x['C'] = <Sprite.Choose> new Sprite.Choose(id, theme['choose'])
                .addEventListener('choose', (ev: Ev.Choose) => {
                    ev.choice.p(this._r);
                });
            resources.unshift(this._x['C'].l());
            this._c.a(this._x['C'], gCurtain);
            // 常驻按钮。
            this._x['t'] = <Sprite.Tray> new Sprite.Tray(id, theme['tray'])
                .addEventListener('tray.menu', () => {
                    this._x['m'].v();
                    this._x['t'].h();
                }).addEventListener('tray.panel', () => {
                    this._x['P'].v();
                    this._x['t'].h();
                });
            resources.unshift(this._x['t'].l());
            this._c.a(this._x['t'], gCurtain);
            // 提示。
            this._x['T'] = <Sprite.Tip> new Sprite.Tip(id, theme['tip']);
            resources.unshift(this._x['T'].l());
            this._c.a(this._x['T'], gCurtain);
            // 面板。
            this._x['P'] = <Sprite.Panel> new Sprite.Panel(id, theme['panel'])
                .addEventListener('panel.close', () => {
                    this._x['t'].v();
                    this._x['P'].h();
                });
            resources.unshift(this._x['P'].l());
            this._c.a(this._x['P'], gCurtain);
            // 功能菜单。
            this._x['m'] = <Sprite.Menu> new Sprite.Menu(id, theme['menu'])
                .addEventListener('menu.close', () => {
                    this._x['t'].v();
                    this._x['m'].h();
                }).addEventListener('menu.save', () => {
                    slotsFromStart = false;
                    (<Sprite.Slots> this._x['sl']).vs(this._r.gS())
                        .then(() => {
                            this._x['m'].h();
                        })['catch'](() => {
                            return;
                        });
                }).addEventListener('menu.load', () => {
                    slotsFromStart = false;
                    (<Sprite.Slots> this._x['sl']).vl(this._r.gS())
                        .then(() => {
                            this._x['m'].h();
                        })['catch'](() => {
                            return;
                        });
                });
            resources.unshift(this._x['m'].l());
            this._c.a(this._x['m'], gCurtain);
            // 开始菜单。
            this._x['s'] = <Sprite.Start> new Sprite.Start(id, theme['start'])
                .addEventListener('start.new', (event: Ev.StartNew) => {
                    this.playSE(this._i['c']);
                    this.lightOff().then(() => {
                        event.target.h(0);
                        this._r.dispatchEvent(new Ev.Begin({ target: this._r.gE() }));
                    });
                }).addEventListener('start.series', (event: Ev.StartSeries) => {
                    slotsFromStart = true;
                    this.playSE(this._i['c']);
                    (<Sprite.SeriesSlots> this._x['ss']).vl(this._r.gS());
                }).addEventListener('start.load', (event: Ev.StartLoad) => {
                    slotsFromStart = true;
                    this.playSE(this._i['c']);
                    (<Sprite.Slots> this._x['sl']).vl(this._r.gS())
                        ['catch'](() => {
                            return;
                        });
                });
            resources.unshift(this._x['s'].l());
            this._c.a(this._x['s'], gCurtain);
            // 档位菜单。
            this._x['sl'] = <Sprite.Slots> new Sprite.Slots(id, theme['slots'])
                .addEventListener('slots.close', () => {
                    this._x[slotsFromStart ? 's' : 'm'].v();
                    this._x['sl'].h();
                }).addEventListener('slots.save', () => {
                    this._x[slotsFromStart ? 's' : 'm'].v();
                    this._x['sl'].h();
                    this._r.gS().e(true);
                }).addEventListener('slots.load', (ev: Ev.SlotsLoad) => {
                    this.lightOff().then(() => {
                        this._x['sl'].h(0);
                        this._x['s'].h(0);
                        if (!this._a)
                            this._x['t'].v(0);
                        this._r.l(ev.id);
                    });
                });
            resources.push(this._x['sl'].l());
            this._c.a(this._x['sl'], gCurtain);
            // 连载档位菜单。
            this._x['ss'] = <Sprite.SeriesSlots> new Sprite.SeriesSlots(id, theme['series'])
                .addEventListener('slots.close', () => {
                    if (!slotsFromStart)
                        this._r.gS().e(false, true);
                    slotsFromStart = false;
                    this._x['ss'].h();
                }).addEventListener('slots.save', () => {
                    this._x['ss'].h();
                    this._r.gS().e(true, true);
                }).addEventListener('slots.load', (ev: Ev.SlotsLoad) => {
                    slotsFromStart = false;
                    this.lightOff().then(() => {
                        this._x['ss'].h(0);
                        this._x['s'].h(0);
                        if (!this._a)
                            this._x['t'].v(0);
                        this._r.l(ev.id);
                    });
                });
            resources.push(this._x['ss'].l());
            this._c.a(this._x['ss'], gCurtain);
            this._c.a(this._x['a'] = new Sprite.Author(theme['author']), gCurtain);
            this.c(resources);
            return this;
        }

        /**
         * 配置状态。
         */
        public s(sheet: [string, string][]): CanvasDirector {
            if (sheet.length)
                (<Sprite.Status> this._x['S']).u(sheet, this._r);
            return this;
        }

        /**
         * 配置面板。
         */
        public p(sheet: Array<Util.IHashTable<any>>): CanvasDirector {
            if (sheet) {
                (<Sprite.Panel> this._x['P']).u(sheet, this._r);
            } else
                (<Sprite.Tray> this._x['t']).u(false);
            return this;
        }

        /**
         * 设置自动播放。
         */
        public a(auto: boolean): boolean {
            let tray: Sprite.Sprite = this._x['t'];
            if (tray) {
                tray[auto ? 'h' : 'v']();
                if (auto) {
                    this._x['m'].h();
                    this._x['P'].h();
                }
            }
            if (this._t) {
                this._t.h();
                this._t = undefined;
            }
            return super.a(auto);
        }

        /**
         * 设置音量。
         */
        public v(volume: number): CanvasDirector {
            this._s['b'].volume = volume;
            this._s['e'].volume = volume;
            return <CanvasDirector> super.v(volume);
        }

        /**
         * 修正 DOM 定位。
         */
        public f(): void {
            this._c.z();
            var work: HTMLElement = <HTMLElement> document.querySelectorAll('.bg-work')[0],
                canvas: HTMLElement = <HTMLElement> work.firstChild,
                w0: number = work.offsetWidth,
                h0: number = work.offsetHeight,
                w: number = (h0 * 16 / 9) | 0,
                h: number = h0,
                l: number = 0,
                t: number = 0;
            if (w > w0) {
                w = w0;
                h = (w0 * 9 / 16) | 0;
                t = ((h0 - h) / 2) | 0;
            } else if (w < w0)
                l = ((w0 - w) / 2) | 0;
            canvas.style.width = w + 'px';
            canvas.style.marginLeft = l + 'px';
            canvas.style.height = h + 'px';
            canvas.style.marginTop = t + 'px';
        }

        /**
         * 自我销毁。
         */
        public d(): void {
            this._c.h();
            this._c = undefined;
            this._s['b'].pause();
            this._s['e'].pause();
            this._s = {};
            window.removeEventListener('keydown', this._l);
        }

        /**
         * 取消阻塞。
         */
        public h(): void {
            if (this._h) {
                this._h.h();
                this._h = undefined;
            }
            if (this._q) {
                this._x['C'].c().o(0);
                this._q();
                this._q = undefined;
            }
            this.playBGM();
            this.playSE();
        }

        /**
         * 绑定视图。
         */
        public b(viewport: HTMLElement): CanvasDirector {
            this._c.b(viewport);
            return this;
        }

        /**
         * 连载模式。
         */
        public e(type: Core.IRuntime.Series): CanvasDirector {
            this._fs = type;
            return this;
        }
    }
}
