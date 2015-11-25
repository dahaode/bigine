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
/// <reference path="../Event/Save.ts" />

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
 * * $. - 功能菜单按钮
 * * A - 作者
 *     * t - 作者名
 * * S - 开始菜单
 *     * t - 作品名
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
         * 菜单暂停相关动画。
         */
        private _m: Core.IAnimation;

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
                .a(new G.Color(bounds, '#000').i('b'))
                .a(new G.Sprite(bounds).i('M').o(0))
                .a(new G.Sprite(bounds).i('c').o(0))
                .a(new G.Sprite(bounds).i('g').o(0))
                .a(new G.Sprite(bounds).i('s').o(0))
                .a(new G.Sprite(bounds).i('m').o(0))
                .a(new G.Sprite(bounds).i('v').o(0))
                .a(new G.Sprite(bounds).i('t').o(0))
                .a(new G.Sprite(bounds).i('A').o(0))
                .a(new G.Sprite(bounds).i('S').o(0))
                .a(new G.Sprite(bounds).i('$').o(0))
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
                o: Resource.g<HTMLImageElement>('//s.dahao.de/theme/_/logo.png', raw),
                e: Resource.g<HTMLImageElement>('//s.dahao.de/theme/_/thx.png', raw),
                s: Resource.g<string>('//s.dahao.de/theme/_/oops.mp3', raw),
                s3: Resource.g<HTMLImageElement>('//s.dahao.de/theme/_/3stars.png', raw),
                s2: Resource.g<HTMLImageElement>('//s.dahao.de/theme/_/2stars.png', raw),
                s1: Resource.g<HTMLImageElement>('//s.dahao.de/theme/_/1star.png', raw),
                f: Resource.g<string>('//s.dahao.de/theme/_/focus.mp3', raw),
                c: Resource.g<string>('//s.dahao.de/theme/_/click.mp3', raw)
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
        public OP(start: boolean, title: string, author: string): Promise<Core.IRuntime> {
            if (title) {
                (<Core.ITextElement> (<Core.ISprite> this._c.q('S')[0]).q('t')[0])
                    .c()
                    .a(new G.Phrase()
                        .t(title)
                        .c(<string> this._f['n']['c'])
                        .f(<number> this._f['n']['f']));
            }
            return this.c([[this._i['o']]])
                .then(() => this.reset())
                .then(() => {
                    var gLogo: G.Image = new G.Image(this._i['o'], CanvasDirector.BOUNDS),
                        gEntry: Core.IGraphicElement = this._c.q('$.')[0];
                    this._c.z()
                        .a(gLogo, 'C');
                    gEntry.o(0);
                    return this.lightOn()
                        .then(() => gLogo.p(new G.Delay(1000)))
                        .then(() => this.lightOff())
                        .then(() => {
                            this._c.e(gLogo);
                            if (!author) return;
                            var gAuthor: Core.ISprite = <Core.ISprite> this._c.q('A')[0].o(1);
                            (<Core.ITextElement> gAuthor.q('t')[0])
                                .c()
                                .a(new G.Phrase()
                                    .t(author)
                                    .c(<string> this._f['a']['c'])
                                    .f(<number> this._f['a']['f']));
                            return this.lightOn()
                                .then(() => gAuthor.p(new G.Delay(1000)))
                                .then(() => this.lightOff())
                                .then(() => gAuthor.o(0));
                        }).then(() => super.OP(start, title, author))
                        .then((runtime: Core.IRuntime) => {
                            gEntry.o(1);
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
                            this._c.q('$.')[0].o(0);
                            this._c.q('$')[0].o(0);
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
                gChars: G.Sprite = <G.Sprite> this._c.q('c')[0],
                gCG: Core.IGraphicElement = this._c.q('g')[0],
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
        public charSet(resource: Resource<HTMLImageElement>, position: Core.IDirector.Position): Promise<Core.IRuntime> {
            var states: Core.IStates = this._r.gS(),
                kamount: string = '$c',
                gChars: G.Sprite = <G.Sprite> this._c.q('c')[0],
                gCG: Core.IGraphicElement = this._c.q('g')[0],
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
                    var aType: G.Type = this._m = new G.Type(1),
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
                        return gWords.p(this._h = this._t = this._m = new G.TypeDelay(9));
                    return gFrame.p(this._h = this._t = this._m = new G.WaitForClick());
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
        public playSE(resource?: Resource<string>): Promise<Core.IRuntime> {
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
                    }).then(() => runtime);
            });
        }

        /**
         * 设置房间。
         */
        public asRoom(resource: Resource<HTMLImageElement>): Promise<Core.IRuntime> {
            return super.asRoom(resource).then((runtime: Core.IRuntime) => {
                var gCurtain: Core.IGraphicElement = this._c.q('C')[0],
                    gOld: Core.IGraphicElement = this._c.q('b')[0],
                    gNew: G.Element = new G.Image(resource, CanvasDirector.BOUNDS).i('b')
                        .o(0);
                this._c.a(gNew, 'M');
                if (1 || gCurtain.gO()) {
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
                var gBack: Core.IGraphicElement = this._c.q('b')[0],
                    gColor: G.Color = new G.Color(CanvasDirector.BOUNDS, '#000');
                this._c.a(gColor, gBack)
                    .e(gBack);
                gColor.i('b');
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
         * （读档继续时）设置特写。
         */
        public setCG(resource: Core.IResource<HTMLImageElement>): Promise<Core.IRuntime> {
            return super.setCG(resource).then((runtime: Core.IRuntime) => {
                var bounds: Core.IBounds = CanvasDirector.BOUNDS;
                (<G.Sprite> this._c.q('g')[0]).a(new G.Image(resource, bounds.w / 10, bounds.h / 10, bounds.w * 4 / 5, bounds.h * 4 / 5).i('p'))
                    .o(1);
                return runtime;
            });
        }

        /**
         * 使用主题。
         */
        public t(id: string, theme: Util.IHashTable<Util.IHashTable<any> >): CanvasDirector {
            var url: string = '//s.dahao.de/theme/' + id + '/',
                chapter: Util.IHashTable<any>  = theme['author'],
                section: Util.IHashTable<any>  = chapter['director'],
                raw: Core.IResource.Type = Core.IResource.Type.Raw,
                bounds: Core.IBounds = CanvasDirector.BOUNDS,
                resources: Resource<string | HTMLImageElement>[][] = [],
                align: (desc: string) => Core.ITextElement.Align = (desc: string) => {
                    var aligns: typeof Core.ITextElement.Align = Core.ITextElement.Align;
                    switch (desc) {
                        case 'center':
                        case 'middle':
                            return aligns.Center;
                        case 'right':
                            return aligns.Right;
                        default:
                            return aligns.Left;
                    }
                },
                gAuthor: G.Sprite = <G.Sprite> this._c.q('A')[0],
                gStart: G.Sprite = <G.Sprite> this._c.q('S')[0],
                gVoiceOver: G.Sprite = <G.Sprite> this._c.q('v')[0],
                gMonolog: G.Sprite = <G.Sprite> this._c.q('m')[0],
                gSpeak: G.Sprite = <G.Sprite> this._c.q('s')[0],
                gTip: G.Sprite = <G.Sprite> this._c.q('t')[0],
                gMenu: G.Sprite = <G.Sprite> this._c.q('$')[0],
                gMenuWay: boolean = false,
                right: Core.ITextElement.Align = Core.ITextElement.Align.Right,
                gMenuEntry: G.Button,
                gMenuMask: G.Color,
                gMenuFeatures: G.Sprite,
                gMenuSlots: G.Sprite,
                gChoose: G.Sprite;
            // 作品
            gAuthor.a(new G.Text(<Core.IBounds> section, section['h'], align(section['align']))
                .a(new G.Phrase()
                    .c(section['color'])
                    .f(section['size'])
                    .t('作品'))
            );
            section = chapter['title'];
            this._f['a'] = {
                c: section['color'],
                f: section['size']
            };
            // 作者名
            gAuthor.a(new G.Text(<Core.IBounds> section, section['h'], align(section['align'])).i('t'));
            // -------- start --------
            chapter = theme['start'];
            section = chapter['new'];
            resources.push([ // 0
                Resource.g<HTMLImageElement>(url + chapter['image'], raw), // 0
                Resource.g<HTMLImageElement>(url + section['image'], raw), // 1
                Resource.g<HTMLImageElement>(url + section['hover'], raw), // 2
                this._i['f'], // 3
                this._i['c'] // 4
            ]);
            // 背景图
            gStart.a(new G.Image(resources[0][0], bounds))
                // 开始按钮
                .a(new G.Button(<Core.IBounds> section)
                    .b(() => {
                        this.playSE(resources[0][4]);
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
                );
            section = chapter['load'];
            resources[0].push(
                Resource.g<HTMLImageElement>(url + section['image'], raw), // 5
                Resource.g<HTMLImageElement>(url + section['hover'], raw) // 6
            );
            // 读档按钮
            gStart.a(new G.Button(<Core.IBounds> section)
                .b(() => {
                    this.playSE(resources[0][4]);
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
            section = chapter['title'];
            this._f['n'] = {
                c: section['color'],
                f: section['size']
            };
            gStart.a(new G.Text(<Core.IBounds> section, section['h'], align(section['align'])).i('t'));
            // -------- voiceover --------
            chapter = theme['voiceover'];
            section = chapter['back'];
            resources.push([ // 1
                Resource.g<HTMLImageElement>(url + section['image'], raw) // 0
            ]);
            // 背景图
            gVoiceOver.a(new G.Image(resources[1][0], <Core.IBounds> section));
            section = chapter['text'];
            this._f['v'] = {
                s: section['shadow'],
                c: section['color'],
                h: section['color2']
            };
            ;
            // 文字区域
            gVoiceOver.a(new G.Text(<Core.IBounds> section, 32)
                .i('w')
            );
            // -------- monolog --------
            chapter = theme['monolog'];
            section = chapter['back'];
            resources.push([ // 2
                Resource.g<HTMLImageElement>(url + section['image'], raw) // 0
            ]);
            // 背景图
            gMonolog.a(new G.Image(resources[2][0], <Core.IBounds> section))
                // 头像区域
                .a(new G.Sprite(<Core.IBounds> chapter['avatar'])
                    .i('a')
                );
            section = chapter['name'];
            this._f['mn'] = {
                s: section['shadow'],
                c: section['color']
            };
            // 名字区域
            gMonolog.a(new G.Text(<Core.IBounds> section, 42)
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
            gMonolog.a(new G.Text(<Core.IBounds> section, 32)
                .i('w')
            );
            // -------- speak --------
            chapter = theme['speak'];
            section = chapter['back'];
            resources.push([ // 3
                Resource.g<HTMLImageElement>(url + section['image'], raw) // 0
            ]);
            // 背景图
            gSpeak.a(new G.Image(resources[3][0], <Core.IBounds> section))
                // 头像区域
                .a(new G.Sprite(<Core.IBounds> chapter['avatar'])
                    .i('a')
                );
            section = chapter['name'];
            this._f['sn'] = {
                s: section['shadow'],
                c: section['color']
            };
            // 名字区域
            gSpeak.a(new G.Text(<Core.IBounds> section, 42)
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
            gSpeak.a(new G.Text(<Core.IBounds> section, 32)
                .i('w')
            );
            // -------- tip --------
            chapter = theme['tip'];
            section = chapter['back'];
            resources.push([ // 4
                Resource.g<HTMLImageElement>(url + section['image'], raw) // 0
            ]);
            // 背景图
            gTip.a(new G.Image(resources[4][0], <Core.IBounds> section));
            section = chapter['text'];
            this._f['t'] = {
                s: section['shadow'],
                c: section['color'],
                h: section['color2']
            };
            ;
            // 文字区域
            gTip.a(new G.Text(<Core.IBounds> section, 32, Core.ITextElement.Align.Center)
                .i('w')
            );
            // -------- choose --------
            chapter = theme['choose'];
            gChoose = <G.Sprite> new G.Sprite((bounds.w - chapter['w']) / 2, 0, chapter['w'], bounds.h)
                .i('D')
                .o(0);
            chapter = chapter['option'];
            section = chapter['back'];
            resources.push([ // 5
                Resource.g<HTMLImageElement>(url + section['image'], raw), // 0
                Resource.g<HTMLImageElement>(url + section['hover'], raw) // 1
            ]);
            this._i['cn'] = resources[5][0];
            this._i['ch'] = resources[5][1];
            section = chapter['text'];
            this._f['c'] = {
                s: section['shadow'],
                c: section['color']
            };
            this._c.a(gChoose, 'S');
            // -------- menu --------
            chapter = theme['menu'];
            gMenu.a((gMenuMask = new G.Color(bounds, chapter['mask']['color0'])).i('m'))
                .a((gMenuFeatures = new G.Sprite(bounds)).i('f'))
                .a((gMenuSlots = new G.Sprite(bounds)).i('s').o(0));
            section = chapter['enter'];
            resources.push([ // 6
                Resource.g<HTMLImageElement>(url + section['image'], raw), // 0
                Resource.g<HTMLImageElement>(url + section['hover'], raw) // 1
            ]);
            // 入口按钮
            this._c.a((gMenuEntry = new G.Button(<Core.IBounds> section).b(() => {
                if (this._m)
                    this._m.w();
                gMenuEntry.o(0);
                gMenuMask.o(.4);
                gMenuSlots.o(0);
                gMenuFeatures.o(1);
                gMenu.o(1);
            }, new G.Image(resources[6][1]), new G.Image(resources[6][0]))).i('$.'), 'A');
            section = chapter['back'];
            resources[6].push(
                Resource.g<HTMLImageElement>(url + section['image'], raw), // 2
                Resource.g<HTMLImageElement>(url + section['hover'], raw) // 3
            );
            // 关闭按钮
            gMenuFeatures.a(new G.Button(<Core.IBounds> section).b(() => {
                if (this._m)
                    this._m.r();
                gMenuEntry.o(1);
                gMenu.o(0);
            }, new G.Image(resources[6][3]), new G.Image(resources[6][2])));
            // 返回按钮
            gMenuSlots.a(new G.Button(<Core.IBounds> section).b(() => {
                if (!gMenuWay) {
                    this.qh(false);
                    return;
                }
                gMenuSlots.o(0);
                gMenuFeatures.o(1);
            }, new G.Image(resources[6][3]), new G.Image(resources[6][2])));
            section = chapter['save'];
            resources[6].push(
                Resource.g<HTMLImageElement>(url + section['image'], raw), // 4
                Resource.g<HTMLImageElement>(url + section['hover'], raw) // 5
            );
            // 存档按钮
            gMenuFeatures.a(new G.Button(<Core.IBounds> section).b(() => {
                gMenuWay = true;
                this.qs(false, .4);
            }, new G.Image(resources[6][5]), new G.Image(resources[6][4])));
            section = chapter['load'];
            resources[6].push(
                Resource.g<HTMLImageElement>(url + section['image'], raw), // 6
                Resource.g<HTMLImageElement>(url + section['hover'], raw) // 7
            );
            // 读档按钮
            gMenuFeatures.a(new G.Button(<Core.IBounds> section).b(() => {
                gMenuWay = true;
                this.qs(true, .4);
            }, new G.Image(resources[6][7]), new G.Image(resources[6][6])));
            section = chapter['auto'];
            resources[6].push(
                Resource.g<HTMLImageElement>(url + section['image'], raw), // 8
                Resource.g<HTMLImageElement>(url + section['hover'], raw) // 9
            );
            section = chapter['autotext'];
            // 自动档按钮
            gMenuSlots.a(new G.Button(<Core.IBounds> chapter['auto']).b(() => {
                this._r.l(this._r.gS().q('auto')[0]);
            }, new G.Image(resources[6][9]), new G.Image(resources[6][8]))
                .a(new G.Text(<Core.IBounds> section, section['h'], right, true).i('t'))
                .i('_')
            );
            // 自动档按钮（禁用状态）
            gMenuSlots.a(new G.Sprite(<Core.IBounds> chapter['auto'])
                .a(new G.Image(resources[6][8]))
                .a(new G.Text(<Core.IBounds> section, section['h'], right, true)
                    .a(new G.Phrase()
                        .t('无')
                        .f(chapter['disabled']['size'])
                        .c(chapter['disabled']['color'])
                    )
                ).i('_.').o(0)
            );
            section = chapter['1'];
            resources[6].push(
                Resource.g<HTMLImageElement>(url + section['image'], raw), // 10
                Resource.g<HTMLImageElement>(url + section['hover'], raw) // 11
            );
            section = chapter['1text'];
            // 第一档按钮
            gMenuSlots.a(new G.Button(<Core.IBounds> chapter['1']).b(() => {
                if (this._o) {
                    this._r.l(this._r.gS().q('1')[0]);
                    return;
                }
                this._r.gS().e(true);
                if (this._m)
                    this._m.r();
                gMenuEntry.o(1);
                gMenu.o(0);
            }, new G.Image(resources[6][11]), new G.Image(resources[6][10]))
                .a(new G.Text(<Core.IBounds> section, section['h'], right, true).i('t'))
                .i('1')
            );
            // 第一档按钮（禁用状态）
            gMenuSlots.a(new G.Sprite(<Core.IBounds> chapter['1'])
                .a(new G.Image(resources[6][10]))
                .a(new G.Text(<Core.IBounds> section, section['h'], right, true)
                    .a(new G.Phrase()
                        .t('无')
                        .f(chapter['disabled']['size'])
                        .c(chapter['disabled']['color'])
                    )
                ).i('1.').o(0)
            );
            section = chapter['2'];
            resources[6].push(
                Resource.g<HTMLImageElement>(url + section['image'], raw) // 12
            );
            // 第二档按钮
            gMenuSlots.a(new G.Image(resources[6][12], <Core.IBounds> section));
            section = chapter['3'];
            resources[6].push(
                Resource.g<HTMLImageElement>(url + section['image'], raw) // 13
            );
            // 第三档按钮
            gMenuSlots.a(new G.Image(resources[6][13], <Core.IBounds> section));
            section = chapter['4'];
            resources[6].push(
                Resource.g<HTMLImageElement>(url + section['image'], raw) // 14
            );
            // 第二档按钮
            gMenuSlots.a(new G.Image(resources[6][14], <Core.IBounds> section));
            section = chapter['enabled'];
            this._f['f'] = {
                f: section['size'],
                c: section['color']
            };
            this.c(resources);
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
         * 显示存档读档菜单。
         */
        public qs(load: boolean = true, opacity: number = 1): Promise<Core.IRuntime> {
            super.qs(load, opacity);
            var gEntry: Core.IGraphicElement = this._c.q('$.')[0],
                gMenu: G.Sprite = <G.Sprite> this._c.q('$')[0],
                gMask: G.Element = gMenu.q('m')[0],
                gFeatures: G.Sprite = <G.Sprite> gMenu.q('f')[0],
                gSlots: G.Sprite = <G.Sprite> gMenu.q('s')[0],
                gAuto: G.Sprite = <G.Sprite> gSlots.q('_')[0],
                gAutoDisabled: G.Element = gSlots.q('_.')[0],
                g1: G.Sprite = <G.Sprite> gSlots.q('1')[0],
                g1Disabled: G.Element = gSlots.q('1.')[0],
                states: Core.IStates = this._r.gS(),
                slot: [string, number] = states.q('auto'),
                config: Util.IHashTable<string | number> = this._f['f'],
                time: (stamp: number) => string = (stamp: number) => {
                    var date: Date = new Date(stamp),
                        node: number = date.getHours(),
                        clob: string = ' ' + (10 > node ? '0' : '') + node;
                    node = date.getMinutes();
                    clob += ':' + (10 > node ? '0' : '') + node;
                    return date.getFullYear() + '-' + (1 + date.getMonth()) + '-' + date.getDate() + clob;
                };
            gEntry.o(0);
            gMask.o(0);
            gFeatures.o(0);
            gSlots.o(1);
            gAuto.o(load && slot ? 1 : 0);
            if (slot)
                (<G.Text> gAuto.q('t')[0]).c()
                    .a(new G.Phrase()
                        .t(time(slot[1]))
                        .f(<number> config['f'])
                        .c(<string> config['c'])
                    );
            gAutoDisabled.o(load && !slot ? 1 : 0);
            slot = states.q('1');
            g1.o(!load || slot ? 1 : 0);
            if (slot)
                (<G.Text> g1.q('t')[0]).c()
                    .a(new G.Phrase()
                        .t(time(slot[1]))
                        .f(<number> config['f'])
                        .c(<string> config['c'])
                    );
            g1Disabled.o(load && !slot ? 1 : 0);
            gMenu.o(1);
            return this.lightOn();
        }

        /**
         * 隐藏存档读档菜单。
         */
        public qh(succeed: boolean): Promise<Core.IRuntime> {
            return this.lightOff()
                .then(() => {
                    this._c.q('$.')[0].o(1);
                    this._c.q('S')[0].o(succeed ? 0 : 1);
                    this._c.q('$')[0].o(0);
                }).then(() => {
                    return succeed ?
                        this.reset() :
                        this.lightOn();
                });
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
