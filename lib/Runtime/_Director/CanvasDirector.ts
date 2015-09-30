/**
 * 定义基于 HTML Canvas 的（运行时）场效调度器组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/_Director/CanvasDirector.ts
 */

/// <reference path="Director.ts" />
/// <reference path="../../G/_pack.ts" />
/// <reference path="../Event/Resume.ts" />

/**
 * * b - 背景
 * * M - 地图
 * * c - 人物
 * * g - 特写
 *     * p - 图片
 * * s - 对白
 *     * a - 头像
 *     * n - 名称
 *     * w - 文本
 * * m - 独白
 *     * a - 头像
 *     * n - 名称
 *     * w - 文本
 * * v - 旁白
 *     * w - 文本
 * * t - 提醒
 *     * w - 文本
 * * D - 选择
 * * S - 开始菜单
 * * C - 幕帘
 * * L - 加载进度条
 *     * e - 完成进度条
 */
namespace Runtime {
    export class CanvasDirector extends Director {
        /**
         * 尺寸。
         */
        public static BOUNDS: Core.IBounds = {
            x: 0,
            y: 0,
            w: 1280,
            h: 720
        };

        /**
         * 画板。
         */
        private _c: Core.IStage;

        /**
         * 声音。
         */
        private _s: Util.IHashTable<HTMLAudioElement>;

        /**
         * 基础图片。
         */
        private _i: Util.IHashTable<Resource<string | HTMLImageElement>>;

        /**
         * 文字配置。
         */
        private _f: Util.IHashTable<Util.IHashTable<string | number>>;

        /**
         * 自动播放相关动画。
         */
        private _t: Core.IAnimation;

        /**
         * 阻塞类相关动画。
         */
        private _h: Core.IAnimation;

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
         * 构造函数。
         */
        constructor(runtime: Core.IRuntime) {
            super(runtime);
            var doc: Document = document,
                els: NodeList | HTMLElement[] = doc.querySelectorAll('.bg-work'),
                canvas: HTMLCanvasElement = doc.createElement('canvas'),
                raw: Core.IResource.Type = Core.IResource.Type.Raw,
                bounds: Core.IBounds = CanvasDirector.BOUNDS;
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
            this._c = <G.Stage> new G.Stage(canvas.getContext('2d'))
                .a(new G.Sprite(bounds).i('M').o(0))
                .a(new G.Sprite(bounds).i('c').o(0))
                .a(new G.Sprite(bounds).i('g').o(0))
                .a(new G.Sprite(bounds).i('s').o(0))
                .a(new G.Sprite(bounds).i('m').o(0))
                .a(new G.Sprite(bounds).i('v').o(0))
                .a(new G.Sprite(bounds).i('t').o(0))
                .a(new G.Sprite(bounds).i('S').o(0))
                .a(new G.Color(bounds, '#000').i('C'))
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
                o: new Resource<HTMLImageElement>('//s.dahao.de/lib/bigine/logo.png', raw),
                e: new Resource<HTMLImageElement>('//s.dahao.de/lib/bigine/thx.png', raw),
                s: new Resource<string>('//s.dahao.de/lib/bigine/oops.mp3', raw),
                s3: new Resource<HTMLImageElement>('//s.dahao.de/lib/bigine/3stars.png', raw),
                s2: new Resource<HTMLImageElement>('//s.dahao.de/lib/bigine/2stars.png', raw),
                s1: new Resource<HTMLImageElement>('//s.dahao.de/lib/bigine/1star.png', raw),
                f: new Resource<string>('//s.dahao.de/lib/bigine/focus.mp3', raw),
                c: new Resource<string>('//s.dahao.de/lib/bigine/click.mp3', raw)
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
        public c(resources: Resource<string | HTMLImageElement>[][]): Promise<void> {
            var gLoading: G.Sprite = <G.Sprite> this._c.q('L')[0],
                gElapsed: G.Element = gLoading.q('e')[0],
                bounds: Core.IBounds = CanvasDirector.BOUNDS,
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
            Util.each(resources, (frame: Resource<string | HTMLImageElement>[]) => {
                Util.each(frame, (resource: Resource<string | HTMLImageElement>) => {
                    progress(false);
                    resource.w((value: string | HTMLImageElement) => {
                        progress(true);
                    });
                });
            });
            return Prefecher.c(resources, this._r.gL());
        }

        /**
         * 开始动画。
         */
        public OP(start: boolean): Promise<Core.IRuntime> {
            return this.c([[this._i['o']]])
                .then(() => this.reset())
                .then(() => {
                    var gLogo: G.Image = new G.Image(this._i['o'], CanvasDirector.BOUNDS);
                    this._c.z()
                        .a(gLogo, 'C');
                    return this.lightOn()
                        .then(() => gLogo.p(new G.Delay(2000)))
                        .then(() => this.lightOff())
                        .then(() => {
                            this._c.e(gLogo);
                            return super.OP(start);
                        }).then((runtime: Core.IRuntime) => {
                            if (!start)
                                return runtime;
                            this._c.q('S')[0].o(1);
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
                    var gED: G.Image = new G.Image(this._i['e'], CanvasDirector.BOUNDS);
                    this.playBGM();
                    this.playSE();
                    return this.lightOff()
                        .then(() => {
                            this._c.a(gED, 'C');
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
        public charOn(resource: Resource<HTMLImageElement>, position: Core.IDirector.Position): Promise<Core.IRuntime> {
            var states: Core.IStates = this._r.gS(),
                kamount: string = '$c',
                gChar: G.Image = this.$c(resource, position);
            states.s(kamount, 1 + (<number> states.g(kamount) || 0));
            (<G.Sprite> this._c.q('c')[0]).a(gChar.i(<any> position))
                .o(1);
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
        public charSet(resource: Resource<HTMLImageElement>, position: Core.IDirector.Position): Promise<Core.IRuntime> {
            var states: Core.IStates = this._r.gS(),
                kamount: string = '$c',
                gChars: G.Sprite = <G.Sprite> this._c.q('c')[0],
                gChar: G.Element = gChars.q(<any> position)[0];
            if (gChar) {
                gChars.e(gChar);
            } else
                states.s(kamount, 1 + <number> states.g(kamount));
            gChar = this.$c(resource, position).o(1).i(<any> position);
            gChars.a(gChar).o(1);
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
        protected $c(resource: Resource<HTMLImageElement>, position: Core.IDirector.Position): G.Image {
            var bounds: Core.IBounds = CanvasDirector.BOUNDS,
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
            return <G.Image> new G.Image(resource, x, 0, w, bounds.h)
                .i(<any> position)
                .o(0);
        }

        /**
         * 某白。
         */
        public words(words: string, theme: string, who?: string, avatar?: Resource<HTMLImageElement>): Promise<Core.IRuntime> {
            var code: string = theme[0],
                gFrame: G.Sprite = <G.Sprite> this._c.q(code)[0],
                gAvatar: G.Sprite = <G.Sprite> gFrame.q('a')[0],
                gName: G.Text = <G.Text> gFrame.q('n')[0],
                gWords: G.Text = <G.Text> gFrame.q('w')[0];
            if (avatar && gAvatar)
                gAvatar.a(new G.Image(avatar, gAvatar.gB(), true));
            if (who && gName)
                gName.a(new G.Phrase()
                        .t(who)
                        .f(42)
                        .c(<string> this._f[code + 'n']['c'])
                        .s(<number> this._f[code + 'n']['s'])
                    );
            this.$w(<G.Text> gWords.o(0), words, this._f[code]);
            gFrame.o(1);
            return this.lightOn()
                .then(() => {
                    var aType: G.Type = new G.Type(1),
                        aWFC: G.WaitForClick;
                    if (this._a)
                        return gWords.p(aType);
                    this._t = aWFC = new G.WaitForClick(() => {
                        aType.h();
                    });
                    return Promise.race<any>([
                        gWords.p(aType).then(() => aWFC.h()),
                        gFrame.p(aWFC)
                    ]);
                }).then(() => {
                    if (this._a)
                        return gWords.p(this._h = this._t = new G.TypeDelay(9));
                    return gFrame.p(this._h = this._t = new G.WaitForClick());
                }).then(() => {
                    gFrame.o(0);
                    if (gAvatar)
                        gAvatar.c();
                    if (gName)
                        gName.c();
                    gWords.c();
                    return this._r;
                });
        }

        /**
         * 提示。
         */
        public tip(words: string): Promise<Core.IRuntime> {
            var gTip: G.Sprite = <G.Sprite> this._c.q('t')[0],
                gWords: G.Text = <G.Text> gTip.q('w')[0];
            this.$w(gWords, words, this._f['t']);
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
                    var gStars: G.Image = new G.Image(this._i[key], CanvasDirector.BOUNDS);
                    return this.lightOff()
                        .then(() => {
                            this._c.a(gStars, 'C');
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
        public playBGM(resource?: Resource<string>): Promise<Core.IRuntime> {
            resource = resource || this._i['s'];
            return resource.o().then((url: string) => {
                if (this._s['b'].src != url)
                    this._s['b'].src = url;
                return super.playBGM(resource);
            });
        }

        /**
         * 播放音效。
         */
        public playSE(resource?: Resource<string>): Promise<Core.IRuntime> {
            resource = resource || this._i['s'];
            return resource.o().then((url: string) => {
                this._s['e'].src = url;
                return super.playSE(resource);
            });
        }

        /**
         * 关闭特写。
         */
        public hideCG(): Promise<Core.IRuntime> {
            return super.hideCG().then((runtime: Core.IRuntime) => {
                var gCG: G.Sprite = <G.Sprite> this._c.q('g')[0],
                    gChars: Core.IGraphicElement = this._c.q('c')[0],
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
        public showCG(resource: Resource<HTMLImageElement>): Promise<Core.IRuntime> {
            return super.showCG(resource).then((runtime: Core.IRuntime) => {
                var bounds: Core.IBounds = CanvasDirector.BOUNDS,
                    gChars: Core.IGraphicElement = this._c.q('c')[0],
                    gCG: G.Sprite = <G.Sprite> this._c.q('g')[0],
                    gImage: G.Element = new G.Image(resource, bounds.w / 10, bounds.h / 10, bounds.w * 4 / 5, bounds.h * 4 / 5).i('p');
                gCG.a(gImage);
                return this.lightOn()
                    .then(() => {
                        return Promise.all([
                            gChars.p(new G.FadeOut(500)),
                            gCG.p(new G.FadeIn(500))
                        ]).then(() => gCG.p(this._h = new G.WaitForClick()));
                    }).then(() => this._r);
            });
        }

        /**
         * 设置房间。
         */
        public asRoom(resource: Resource<HTMLImageElement>): Promise<Core.IRuntime> {
            return super.asRoom(resource).then((runtime: Core.IRuntime) => {
                var gOld: Core.IGraphicElement = this._c.q('b')[0];
                if (gOld)
                    this._c.e(gOld);
                this._c.a(new G.Image(resource, CanvasDirector.BOUNDS).i('b'), 'M');
                return runtime;
            });
        }

        /**
         * 设置地图。
         */
        public asMap(points: Util.IHashTable<Core.IPointTag>): Promise<Core.IRuntime> {
            var gMap: G.Sprite = <G.Sprite> this._c.q('M')[0],
                gPoints: [number, G.Button][] = [],
                bounds: Core.IBounds = CanvasDirector.BOUNDS,
                gPoint: G.Button,
                z: number,
                added: boolean;
            Util.each(points, (point: Core.IPointTag) => {
                z = point.gZ();
                gPoint = <G.Button> new G.Button(point.gX(), point.gY(), point.gW(), point.gH())
                    .b(() => {
                        this.playSE(this._i['c']);
                        point.p(this._r);
                    }, new G.Image(point.o(), bounds, true))
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
            var gCurtain: Core.IGraphicElement = this._c.q('C')[0];
            if (gCurtain.gO())
                return this._p;
            return gCurtain.p(new G.FadeIn(500))
                .then(() => this._r);
        }

        /**
         * 开灯（开幕）。
         */
        public lightOn(): Promise<Core.IRuntime> {
            var gCurtain: Core.IGraphicElement = this._c.q('C')[0];
            if (!gCurtain.gO())
                return this._p;
            return gCurtain.p(new G.FadeOut(500))
                .then(() => this._r);
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
                        Util.Q.doHalt<Core.IRuntime>()['catch']((error: any) => {
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
                            }, new G.Image(this._i['ch']), new G.Image(this._i['cn']))
                            .addEventListener('$focus', () => {
                                this.playSE(this._i['f']);
                            }).a(new G.Text(0, 0, w, h, h / 2 + 16, Core.ITextElement.Align.Center)
                                .a(new G.Phrase()
                                    .t(option.gT())
                                    .f(32)
                                    .c(<string> this._f['c']['c'])
                                    .s(<number> this._f['c']['s'])
                                )
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
                this._c.e(this._c.q('b')[0]);
                (<G.Sprite> this._c.q('M')[0]).c();
                (<G.Sprite> this._c.q('c')[0]).c()
                    .o(0);
                (<G.Sprite> this._c.q('g')[0]).c()
                    .o(0);
                this._c.q('s')[0].o(0);
                this._c.q('m')[0].o(0);
                this._c.q('v')[0].o(0);
                this._c.q('t')[0].o(0);
                this._c.q('D')[0].o(0);
                return runtime;
            });
        }

        /**
         * 使用主题。
         */
        public t(theme: Util.IHashTable<Util.IHashTable<any>>): CanvasDirector {
            var chapter: Util.IHashTable<any> = theme['start'],
                section: Util.IHashTable<any> = chapter['new'],
                raw: Core.IResource.Type = Core.IResource.Type.Raw,
                bounds: Core.IBounds = CanvasDirector.BOUNDS,
                t2b: (theme: Util.IHashTable<number>) => Core.IBounds = (config: Util.IHashTable<number>) => {
                    return {
                        x: config['left'],
                        y: config['top'],
                        w: config['width'],
                        h: config['height']
                    };
                },
                resources: Resource<string | HTMLImageElement>[][] = [
                    [
                        new Resource<HTMLImageElement>(chapter['image'], raw),
                        new Resource<HTMLImageElement>(section['image'], raw),
                        new Resource<HTMLImageElement>(section['hover'], raw),
                        this._i['f'],
                        this._i['c']
                    ]
                ],
                gStart: G.Sprite = (<G.Sprite> this._c.q('S')[0])
                    // 背景图
                    .a(new G.Image(resources[0][0], bounds))
                    // 开始按钮
                    .a(new G.Button(t2b(section))
                        .b(() => {
                            this.playBGM(resources[0][4]);
                            this.lightOff().then(() => {
                                gStart.o(0);
                                this._r.dispatchEvent(new Event.Begin({
                                    target: this._r.gE()
                                }));
                            });
                        }, new G.Image(resources[0][2]), new G.Image(resources[0][1]))
                        .addEventListener('$focus', () => {
                            this.playSE(resources[0][3]);
                        })
                    ),
                gVoiceOver: G.Sprite = <G.Sprite> this._c.q('v')[0],
                gMonolog: G.Sprite = <G.Sprite> this._c.q('m')[0],
                gSpeak: G.Sprite = <G.Sprite> this._c.q('s')[0],
                gTip: G.Sprite = <G.Sprite> this._c.q('t')[0],
                gChoose: G.Sprite;
            section = chapter['load'];
            resources[0].push(
                new Resource<HTMLImageElement>(section['image'], raw),
                new Resource<HTMLImageElement>(section['hover'], raw)
            );
            // 读档按钮
            gStart.a(new G.Button(t2b(section))
                    .b(() => {
                        this.playBGM(resources[0][4]);
                        this.lightOff().then(() => {
                            gStart.o(0);
                            this._r.dispatchEvent(new Event.Resume({
                                target: this._r.gE()
                            }));
                        });
                    }, new G.Image(resources[0][6]), new G.Image(resources[0][5]))
                    .addEventListener('$focus', () => {
                        this.playSE(resources[0][3]);
                    })
                );
            // -------- voiceover --------
            chapter = theme['voiceover'];
            section = chapter['back'];
            resources.push([
                new Resource<HTMLImageElement>(section['image'], raw)
            ]);
            // 背景图
            gVoiceOver.a(new G.Image(resources[1][0], t2b(section)));
            section = chapter['text'];
            this._f['v'] = {
                s: section['shadow'],
                c: section['color'],
                h: section['color2']
            };
            ;
            // 文字区域
            gVoiceOver.a(new G.Text(t2b(section), 32)
                    .i('w')
                );
            // -------- monolog --------
            chapter = theme['monolog'];
            section = chapter['back'];
            resources.push([
                new Resource<HTMLImageElement>(section['image'], raw)
            ]);
            // 背景图
            gMonolog.a(new G.Image(resources[2][0], t2b(section)))
                // 头像区域
                .a(new G.Sprite(t2b(chapter['avatar']))
                    .i('a')
                );
            section = chapter['name'];
            this._f['mn'] = {
                s: section['shadow'],
                c: section['color']
            };
            // 名字区域
            gMonolog.a(new G.Text(t2b(section), 42)
                    .i('n')
                );
            section = chapter['text'];
            this._f['m'] = {
                s: section['shadow'],
                c: section['color'],
                h: section['color2']
            };
            ;
            // 文字区域
            gMonolog.a(new G.Text(t2b(section), 32)
                    .i('w')
                );
            // -------- speak --------
            chapter = theme['speak'];
            section = chapter['back'];
            resources.push([
                new Resource<HTMLImageElement>(section['image'], raw)
            ]);
            // 背景图
            gSpeak.a(new G.Image(resources[3][0], t2b(section)))
                // 头像区域
                .a(new G.Sprite(t2b(chapter['avatar']))
                    .i('a')
                );
            section = chapter['name'];
            this._f['sn'] = {
                s: section['shadow'],
                c: section['color']
            };
            // 名字区域
            gSpeak.a(new G.Text(t2b(section), 42)
                    .i('n')
                );
            section = chapter['text'];
            this._f['s'] = {
                s: section['shadow'],
                c: section['color'],
                h: section['color2']
            };
            ;
            // 文字区域
            gSpeak.a(new G.Text(t2b(section), 32)
                    .i('w')
                );
            // -------- tip --------
            chapter = theme['tip'];
            section = chapter['back'];
            resources.push([
                new Resource<HTMLImageElement>(section['image'], raw)
            ]);
            // 背景图
            gTip.a(new G.Image(resources[4][0], t2b(section)));
            section = chapter['text'];
            this._f['t'] = {
                s: section['shadow'],
                c: section['color'],
                h: section['color2']
            };
            ;
            // 文字区域
            gTip.a(new G.Text(t2b(section), 32, Core.ITextElement.Align.Center)
                    .i('w')
                );
            // -------- choose --------
            chapter = theme['choose'];
            gChoose = <G.Sprite> new G.Sprite((bounds.w - chapter['width']) / 2, 0, chapter['width'], bounds.h)
                .i('D')
                .o(0);
            chapter = chapter['option'];
            section = chapter['back'];
            resources.push([
                new Resource<HTMLImageElement>(section['image'], raw),
                new Resource<HTMLImageElement>(section['hover'], raw)
            ]);
            this._i['cn'] = resources[5][0];
            this._i['ch'] = resources[5][1];
            section = chapter['text'];
            this._f['c'] = {
                s: section['shadow'],
                c: section['color']
            };
            this._c.a(gChoose, 'S');
            this.c(resources);
            return this;
        }

        /**
         * 设置自动播放。
         */
        public a(auto: boolean): CanvasDirector {
            if (this._t) {
                this._t.h();
                this._t = undefined;
            }
            return <CanvasDirector> super.a(auto);
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
                (<G.Sprite> this._c.q('D')[0]).c().o(0);
                this._q();
                this._q = undefined;
            }
            this.playBGM();
            this.playSE();
        }

        /**
         * 将文本添加至画面文字元素中。
         */
        private $w(element: G.Text, words: string, font: Util.IHashTable<string | number>): G.Text {
            var buffer: string = '',
                hilite: boolean = false,
                ii: number;
            element.c();
            for (ii = 0; ii < words.length; ii++) {
                if ('【' == words[ii] && !hilite) {
                    element.a(new G.Phrase()
                            .t(buffer)
                            .f(28)
                            .c(<string> font['c'])
                            .s(<number> font['s'])
                        );
                    buffer = '';
                    hilite = true;
                } else if ('】' == words[ii] && hilite) {
                    element.a(new G.Phrase()
                            .t(buffer)
                            .f(28)
                            .c(<string> font['h'])
                            .s(<number> font['s'])
                        );
                    buffer = '';
                    hilite = false;
                } else
                    buffer += words[ii];
            }
            if (buffer)
                element.a(new G.Phrase()
                        .t(buffer)
                        .f(28)
                        .c(<string> font[hilite ? 'h' : 'c'])
                        .s(<number> font['s'])
                    );
            return element;
        }
    }
}
