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

/**
 * * b - 背景
 * * M - 地图
 * * c - 人物
 * * g - 特写
 *     * p - 图片
 * * t - 提醒
 *     * w - 文本
 * * D - 选择
 * * $. - 功能菜单按钮
 * * $ - 功能菜单
 *     * m - 遮罩层
 *     * f - 功能层
 *     * s - 档位层
 *         * _ - 自动档
 *             * t - 时间
 *         * _. - 自动档禁止状态
 *         * 1 - 第一档
 *             * t - 时间
 *         * 1. - 第一档禁止状态
 * * C - 幕帘
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
         * 菜单暂停相关动画。
         */
        private _m: G.Animation;

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

        private _x: Util.IHashTable<Sprite.Sprite>;

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
                .a(new G.Sprite(bounds).i('g').o(0))
                .a(new G.Sprite(bounds).i('t').o(0))
                // .a(new G.Sprite(bounds).i('$').o(0))
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
            if (title) {
                (<Sprite.Start> this._x['s']).u(title);
            }
            return this.c([[this._i['o']]])
                .then(() => this.reset())
                .then(() => {
                    var gLogo: G.Image = new G.Image(this._i['o'].o(), CanvasDirector.BOUNDS);
                        // gEntry: G.Element = this._c.q('$.')[0];
                    this._c.z()
                        .a(gLogo, this._x['c']);
                    // gEntry.o(0);
                    return this.lightOn()
                        .then(() => gLogo.p(new G.Delay(1000)))
                        .then(() => this.lightOff())
                        .then(() => {
                            this._c.e(gLogo);
                            if (!author) return;
                            let gAuthor: Sprite.Author = (<Sprite.Author> this._x['a']).u(author);
                            return this.lightOn()
                                .then(() => gAuthor.p(new G.Delay(1000)))
                                .then(() => this.lightOff())
                                .then(() => gAuthor.o(0));
                        }).then(() => super.OP(start, title, author))
                        .then((runtime: Core.IRuntime) => {
                            // gEntry.o(1);
                            if (!start)
                                return runtime;
                            this._x['s'].o(1);
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
                            this._c.a(gED, this._x['c']);
                            // this._c.q('$.')[0].o(0);
                            // this._c.q('$')[0].o(0);
                            return this.lightOn();
                        }).then(() => gED.p(new G.Delay(2000)))
                        .then(() => this.lightOff())
                        .then(() => {
                            this._c.e(gED);
                            return super.ED();
                        });
                });
        }

        /**
         * 人物出场。
         */
        public charOn(resource: Resource.Resource<HTMLImageElement>, position: Core.IDirector.Position): Promise<Core.IRuntime> {
            var states: Core.IStates = this._r.gS(),
                gChars: G.Sprite = <G.Sprite> this._c.q('c')[0],
                gCG: G.Element = this._c.q('g')[0],
                kamount: string = '$c',
                gChar: G.Image = this.$c(resource, position);
            states.s(kamount, 1 + (<number> states.g(kamount) || 0));
            gChars.a(gChar.i(<any> position));
            if (gCG.gO()) {
                gChar.o(1);
                return this._p;
            }
            gChars.o(1);
            return gChar.p(this._m = new G.FadeIn(500))
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
                return gChar.p(this._m = new G.FadeOut(500)).then(() => {
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
                gCG: G.Element = this._c.q('g')[0],
                gChar: G.Element = gChars.q(<any> position)[0];
            if (gChar) {
                gChars.e(gChar);
            } else
                states.s(kamount, 1 + (<number> states.g(kamount) || 0));
            gChar = this.$c(resource, position).o(1).i(<any> position);
            gChars.a(gChar);
            if (!gCG.gO())
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
            return gChar.p(this._m = new G.Move(500, {
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
            return this.lightOn().then(() => {
                let sprite: Sprite.Words = <Sprite.Words> this._x['W'],
                    type: string = theme[0];
                if ('v' == type)
                    return sprite.vv(words, this._a);
                return sprite['v' + type](avatar, who, words, this._a);
            }).then(() => this._r);
        }

        /**
         * 提示。
         */
        public tip(words: string): Promise<Core.IRuntime> {
            var gTip: G.Sprite = <G.Sprite> this._c.q('t')[0],
                gWords: G.Text = <G.Text> gTip.q('w')[0];
            this.$w(gWords, words, <string> this._f['t']['h']);
            return this.lightOn()
                .then(() => gTip.p(this._h = new G.FadeIn(250)
                    .c(new G.WaitForClick())
                    .c(new G.FadeOut(250))
                )
                ).then(() => {
                    gWords.c();
                    return this._r;
                });
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
                var gCG: G.Sprite = <G.Sprite> this._c.q('g')[0],
                    gChars: G.Element = this._c.q('c')[0],
                    gImage: G.Element = gCG.q('p')[0];
                return Promise.all([
                    gChars.p(new G.FadeIn(500)),
                    gCG.p(new G.FadeOut(500))
                ]).then(() => {
                    if (!this._r.gS().g('$c'))
                        gChars.o(0);
                    gCG.e(gImage);
                    return runtime;
                    });
            });
        }

        /**
         * 展示特写。
         */
        public showCG(resource: Resource.Resource<HTMLImageElement>): Promise<Core.IRuntime> {
            return super.showCG(resource).then((runtime: Core.IRuntime) => {
                var bounds: G.IBounds = CanvasDirector.BOUNDS,
                    gChars: G.Element = this._c.q('c')[0],
                    gCG: G.Sprite = <G.Sprite> this._c.q('g')[0],
                    gImage: G.Element = new G.Image(resource.o(), bounds.w / 10, bounds.h / 10, bounds.w * 4 / 5, bounds.h * 4 / 5).i('p');
                gCG.a(gImage);
                return this.lightOn()
                    .then(() => {
                        return Promise.all([
                            gChars.p(new G.FadeOut(500)),
                            gCG.p(new G.FadeIn(500))
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
            return Promise.all([
                this._i['cn'].o(),
                this._i['ch'].o()
            ]).then((images: HTMLImageElement[]) => {
                var w: number = images[0].width,
                    h: number = images[0].height,
                    m: number = 16,
                    t: number = 0 | (CanvasDirector.BOUNDS.h - options.length * (h + m) + m) / 2,
                    gChoose: G.Sprite = <G.Sprite> this._c.q('D')[0],
                    gOptions: G.Button[] = [],
                    gOption: G.Button;
                return new Promise((resolve: (value?: G.Button[] | Thenable<G.Button[]>) => void, reject: (reason?: any) => void) => {
                    var anime: G.FadeIn = new G.FadeIn(250),
                        clicked: boolean = false;
                    this._q = () => {
                        E.doHalt<Core.IRuntime>()['catch']((error: any) => {
                            reject(error);
                        });
                    };
                    Util.each(options, (option: Core.IOptionTag, index: number) => {
                        gOption = <G.Button> new G.Button(0, t + index * (h + m), w, h)
                            .b(() => {
                                if (clicked) return;
                                clicked = true;
                                this.playSE(this._i['c']);
                                anime.h();
                                option.p(this._r);
                                resolve(gOptions);
                            }, new G.Image(this._i['ch'].o()), new G.Image(this._i['cn'].o()))
                            .addEventListener('$focus', () => {
                                this.playSE(this._i['f']);
                            }).a(new G.Text(0, 0, w, h, 32, h / 2 + 16, G.Text.Align.Center)
                                .ts(<number> this._f['c']['s'], <number> this._f['c']['s'], <number> this._f['c']['s'])
                                .a(new G.TextPhrase(option.gT(), <string> this._f['c']['c']))
                            );
                        gOptions.push(gOption);
                        gChoose.a(gOption);
                    });
                    gChoose.o(0);
                    this.lightOn()
                        .then(() => gChoose.p(anime));
                }).then(() => {
                    return gChoose.p(new G.FadeOut(250))
                        .then(() => gChoose.c())
                        .then(() => this._r);
                });
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
                (<G.Sprite> this._c.q('g')[0]).c()
                    .o(0);
                this._x['W'].h(true);
                this._c.q('t')[0].o(0);
                this._c.q('D')[0].o(0);
                return runtime;
            });
        }

        /**
         * （读档继续时）设置特写。
         */
        public setCG(resource: Core.IResource<HTMLImageElement>): Promise<Core.IRuntime> {
            return super.setCG(resource).then((runtime: Core.IRuntime) => {
                var bounds: G.IBounds = CanvasDirector.BOUNDS;
                (<G.Sprite> this._c.q('g')[0]).a(new G.Image(resource.o(), bounds.w / 10, bounds.h / 10, bounds.w * 4 / 5, bounds.h * 4 / 5).i('p'))
                    .o(1);
                return runtime;
            });
        }

        /**
         * 使用主题。
         */
        public t(id: string, theme: Util.IHashTable<Util.IHashTable<any> >): CanvasDirector {
            let url: string = '//s.dahao.de/theme/' + id + '/',
                chapter: Util.IHashTable<any> = theme['author'],
                section: Util.IHashTable<any> = chapter['director'],
                raw: Core.IResource.Type = Core.IResource.Type.Raw,
                bounds: G.IBounds = CanvasDirector.BOUNDS,
                resources: Resource.Resource<string | HTMLImageElement>[][] = [],
                gCurtain: Sprite.Curtain = this._x['c'],
                slotsFromStart: boolean = false,
                gTip: G.Sprite = <G.Sprite> this._c.q('t')[0],
                gChoose: G.Sprite;
            // 状态。
            this._x['S'] = <Sprite.Status> new Sprite.Status(id, theme['status']);
            resources.unshift(this._x['S'].l());
            this._c.a(this._x['S'], gCurtain);
            // 某白。
            this._x['W'] = <Sprite.Words> new Sprite.Words(id, theme['voiceover'], theme['monolog'], theme['speak']);
            resources.unshift(this._x['W'].l());
            this._c.a(this._x['W'], gCurtain);
            // 常驻按钮。
            this._x['t'] = <Sprite.Tray> new Sprite.Tray(id, theme['tray'])
                .addEventListener('tray.menu', () => {
                    this._x['m'].v();
                    this._x['t'].h();
                });
            resources.unshift(this._x['t'].l());
            this._c.a(this._x['t'], gCurtain);
            // 功能菜单。
            this._x['m'] = <Sprite.Menu> new Sprite.Menu(id, theme['menu'])
                .addEventListener('menu.close', () => {
                    this._x['t'].v();
                    this._x['m'].h();
                }).addEventListener('menu.save', () => {
                    slotsFromStart = false;
                    (<Sprite.Slots> this._x['sl']).vs(this._r.gS());
                    this._x['m'].h();
                }).addEventListener('menu.load', () => {
                    slotsFromStart = false;
                    (<Sprite.Slots> this._x['sl']).vl(this._r.gS());
                    this._x['m'].h();
                });
            resources.unshift(this._x['m'].l());
            this._c.a(this._x['m'], gCurtain);
            // 开始菜单。
            this._x['s'] = <Sprite.Start> new Sprite.Start(id, theme['start'])
                .addEventListener('start.new', (event: Ev.StartNew) => {
                    this.playSE(this._i['c']);
                    this.lightOff().then(() => {
                        this._x['t'].v(true);
                        event.target.h(true);
                        this._r.dispatchEvent(new Ev.Begin({ target: this._r.gE() }));
                    });
                }).addEventListener('start.load', (event: Ev.StartLoad) => {
                    slotsFromStart = true;
                    this.playSE(this._i['c']);
                    (<Sprite.Slots> this._x['sl']).vl(this._r.gS());
                    this._x['s'].h();
                    /* this.lightOff().then(() => {
                        event.target.h(true);
                        this._r.dispatchEvent(new Ev.Resume({ target: this._r.gE() }));
                    }); */
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
                    this.lightOn().then(() => {
                        this._x['sl'].h(true);
                        this._r.l(ev.id);
                    });
                });
            resources.push(this._x['sl'].l());
            this._c.a(this._x['sl'], gCurtain);
            this._c.a(this._x['a'] = new Sprite.Author(chapter), gCurtain);
            // -------- tip --------
            chapter = theme['tip'];
            section = chapter['back'];
            resources.push([ // 2
                Resource.Resource.g<HTMLImageElement>(url + section['image'], raw) // 0
            ]);
            // 背景图
            gTip.a(new G.Image(resources[2][0].o(), <G.IBounds> section));
            section = chapter['text'];
            this._f['t'] = {
                h: section['color2']
            };
            // 文字区域
            gTip.a(new G.Text(<G.IBounds> section, 28, 32, G.Text.Align.Center)
                .tc(section['color'])
                .ts(section['shadow'], section['shadow'], section['shadow'])
                .i('w')
            );
            // -------- choose --------
            chapter = theme['choose'];
            gChoose = <G.Sprite> new G.Sprite((bounds.w - chapter['w']) / 2, 0, chapter['w'], bounds.h)
                .i('D')
                .o(0);
            chapter = chapter['option'];
            section = chapter['back'];
            resources.push([ // 3
                Resource.Resource.g<HTMLImageElement>(url + section['image'], raw), // 0
                Resource.Resource.g<HTMLImageElement>(url + section['hover'], raw) // 1
            ]);
            this._i['cn'] = resources[3][0];
            this._i['ch'] = resources[3][1];
            section = chapter['text'];
            this._f['c'] = {
                s: section['shadow'],
                c: section['color']
            };
            this._c.a(gChoose, this._x['s']);
            this.c(resources);
            return this;
        }

        /**
         * 配置状态。
         */
        public s(sheet: [string, string][]): Director {
            if (sheet.length)
                (<Sprite.Status> this._x['S']).u(sheet, this._r);
            return this;
        }

        /**
         * 设置自动播放。
         */
        public a(auto: boolean): boolean {
            if (this._m && this._m.gW())
                return this._a;
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
            if (this._m)
                this._m.h();
            if (this._h) {
                this._h.h();
                this._h = undefined;
            }
            if (this._q) {
                (<G.Sprite> this._c.q('D')[0]).c().o(0);
                this._q();
                this._q = undefined;
            }
            this.playBGM();
            this.playSE();
        }

        /**
         * 绑定视图。
         */
        public b(viewport: HTMLElement): Director {
            this._c.b(viewport);
            return this;
        }

        /**
         * 将文本添加至画面文字元素中。
         */
        private $w(element: G.Text, words: string, hiColor: string): G.Text {
            var buffer: string = '',
                hilite: boolean = false,
                ii: number;
            element.c();
            for (ii = 0; ii < words.length; ii++) {
                if ('【' == words[ii] && !hilite) {
                    element.a(new G.TextPhrase(buffer));
                    buffer = '';
                    hilite = true;
                } else if ('】' == words[ii] && hilite) {
                    element.a(new G.TextPhrase(buffer, hiColor));
                    buffer = '';
                    hilite = false;
                } else
                    buffer += words[ii];
            }
            if (buffer)
                element.a(new G.TextPhrase(buffer, hilite ? hiColor : ''));
            return element;
        }
    }
}
