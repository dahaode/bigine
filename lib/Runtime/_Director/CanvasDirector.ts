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
 * * L - 加载进度条
 * * e - 完成进度条
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
         * 动画(切幕动画，神态动画)。
         */
        private _ca: [string, string];

        /**
         * 声音开关。
         */
        private _vo: boolean;

        /**
         * 面板主题配置集合。
         */
        private _pt: Util.IHashTable<Util.IHashTable<any>>;

        /**
         * 记录点击的选项。
         */
        private _pc: Tag.Option;

        /**
         * 全屏文本开 / 关。
         */
        private _fd: boolean;

        /**
         * 全屏文本打字效果。
         */
        private _ft: G.Animation;

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
                assets: string = '_/';
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
                .a(new G.Component()
                    .a(new G.Color(bounds, '#000')).i('b'))
                .a(new G.Component()
                    .a(new G.Sprite(bounds)).i('M').o(0))
                .a(new G.Component()
                    .a(new G.Sprite(bounds)).i('c').o(0))
                .a(this._x['c'] = new Sprite.Curtain())
                .a(new G.Component()
                    .a(new G.Color(0, bounds.h - 12, bounds.w, 12, '#e7e7e7'))
                    .a(new G.Color(0, bounds.h - 11, bounds.w, 10, '#00ccff').i('e')).i('L').o(0));
            this.f();
            this._vo = true;
            this._fd = false;
            this._pc =
            this._ft = undefined;
            this._f =
            this._pt = {};
            this._ca = [undefined, undefined];
            this._e = [0, 0];
            this._i = {
                o: Resource.Resource.g<HTMLImageElement>(assets + 'logo.png', raw),
                s: Resource.Resource.g<string>(assets + 'oops.mp3', raw),
                f: Resource.Resource.g<string>(assets + 'focus.mp3', raw),
                c: Resource.Resource.g<string>(assets + 'click.mp3', raw)
            };
            this._s = {
                b: new Audio(),
                e: new Audio(),
                s: new Audio()
            };
            this._s['b'].autoplay = this._s['e'].autoplay = this._s['s'].autoplay = true;
            this._s['b'].loop = this._s['s'].loop = true;
            this._s['b'].src = this._s['s'].src = this._i['s'].l();
            this._s['b']['baseVolume'] = this._s['e']['baseVolume'] = this._s['s']['baseVolume'] = 1;
            this._s['b']['scale'] = this._s['e']['scale'] = this._s['s']['scale'] = 1;
            this._s['e']['cd'] = -1;
            this._l = (event: KeyboardEvent) => {
                if ((event.keyCode == 13 || event.keyCode == 88) && !this._a && this._t && !this._pc) {
                    if (this._ft) this._ft.h();
                    this._t.h();
                }
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
            var gLoading: G.Component = <G.Component> this._c.q('L')[0],
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
         * 加载动画。
         */
        public Load(loaded: boolean, theme?: Util.IHashTable<Util.IHashTable<any>>): Promise<Core.IRuntime> {
            if (loaded) {
                if (!this._x['ld']) this._c.a(this._x['ld'] = <Sprite.Loading> new Sprite.Loading(theme));
                (<Sprite.Loading> this._x['ld']).u().v(0);
                return super.Load(loaded);
            } else {
                if (this._x['ld']) (<Sprite.Loading> this._x['ld']).h(0);
                return super.Load(loaded);
            }
        }

        /**
         * 开始动画。
         */
        public OP(start: boolean, title: string, author: string, isWx: boolean): Promise<Core.IRuntime> {
            let series: boolean = Core.IRuntime.Series.Rest == this._fs || Core.IRuntime.Series.Last == this._fs;
            (<Sprite.Start> this._x['s']).u(title, series, this._c);
            return this.c([[this._i['o']]])
                .then(() => this.reset())
                .then(() => {
                    this._c.z();
                    let q: Promise<Core.IRuntime> = this.lightOn();
                    if (!isWx) {
                        let gLogo: G.Element = new G.Component().a(new G.Image(this._i['o'].o(), CanvasDirector.BOUNDS)).o(1);
                        this._c.a(gLogo, this._x['c']);
                        q = q.then(() => gLogo.p(new G.Delay(1000)))
                            .then(() => {
                                this._c.e(gLogo);
                                return this.lightOff();
                            });
                    }
                    return q.then(() => {
                            if (!author && !title) return;
                            let gAuthor: Sprite.Author = (<Sprite.Author> this._x['a']).u(author ? author : title);
                            gAuthor.v(0);
                            return this.lightOn()
                                .then(() => gAuthor.p(new G.Delay(1000)))
                                .then(() => this.lightOff())
                                .then(() => gAuthor.o(0));
                        }).then(() => super.OP(start, title, author, isWx))
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
            return this.lightOff()
                .then(() => {
                    this.playMusic(Core.IResource.Type.BGM);
                    this.playMusic(Core.IResource.Type.ESM);
                    this.playSE();
                    this._r.dispatchEvent(new Ev.Fin({
                        target: this._r.gE()
                    }));
                    this._x['t'].h(0);
                    return super.ED();
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
                    $s: string = 'slots.save',
                    done: () => void = () => {
                        this._x['ss'].removeEventListener($s, done);
                        this._x['ss'].removeEventListener($c, done);
                        resolve(this._r);
                    },
                    callback: () => void = () => {
                        (<Sprite.SeriesSlots> this._x['ss']
                            .addEventListener($c, done)
                            .addEventListener($s, done)
                        ).vs(this._r, this._fs);
                    };
                this.lightOn().then(() => this._r.gS().e('auto', true, callback));
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
                gOld: G.Element = gChars.q(<any> position)[0],
                gNew: G.Element;
            gNew = this.$c(resource, position).o(0).i(<any> position);
            gChars.a(gNew);
            if (!this._x['G'].gO())
                gChars.o(1);
            if (this._ca[1] == 'Gradient') {  // 神态渐变
                if (gOld) {
                    return Promise.all([
                        gOld.p(new G.FadeOut(500)),
                        gNew.p(new G.FadeIn(500))
                    ]).then(() => {
                        gChars.e(gOld);
                        return this._r;
                    });
                } else {
                    return gNew.p(new G.FadeIn(500)).then(() => {
                        states.s(kamount, 1 + (<number> states.g(kamount) || 0));
                        return this._r;
                    });
                }
            } else {   // 神态无动画
                if (gOld) {
                    gChars.e(gOld);
                } else
                    states.s(kamount, 1 + (<number> states.g(kamount) || 0));
                gNew.o(1);
                return this._p;
            }
        }

        /**
         * 人物移动。
         */
        public charMove(from: Core.IDirector.Position, to: Core.IDirector.Position): Promise<Core.IRuntime> {
            var gChars: G.Sprite = <G.Sprite> this._c.q('c')[0],
                gChar: G.Element = gChars.q(<any> from)[0],
                x: number = this.$x(to);
            if (!gChar)
                return this._p;
            return gChar.p(new G.Move(500, {
                        x: x,
                        y: gChar.gB().y
                    })
                ).then(() => {
                    gChar.i(<any> to);
                    return this._r;
                });
        }

        /**
         * 创建立绘。
         */
        protected $c(resource: Resource.Resource<HTMLImageElement>, position: Core.IDirector.Position): G.Image {
            return <G.Image> new G.Image(resource.o(), this.$x(position), 0, 1280, 720, true)
                .i(<any> position)
                .o(0);
        }

        /**
         * 计算立绘位置 x 坐标。
         */
        protected $x(position: Core.IDirector.Position): number {
            return (<number> position) * 200 - 800;
        }

        /**
         * 某白。
         */
        public words(words: string, theme: string, who?: string, avatar?: Resource.Resource<HTMLImageElement>): Promise<Core.IRuntime> {
            if (this._fd) {
                return theme == 'voiceover' ? this.full(words) : super.words(words, theme);
            } else {
                let sprite: Sprite.Words = <Sprite.Words> this._x['W'];
                return this._x['c'].h(20).then(() => {
                    let type: string = theme[0];
                    if ('v' == type)
                        return sprite.vv(words, this._a);
                    return sprite['v' + type](avatar, who, words, this._a);
                }).then(() => {
                    sprite.h(0);
                    return this._r;
                });
            }
        }

        /**
         * 旁白在全屏中显示。
         */
        protected full(words: string): Promise<Core.IRuntime> {
            return this.lightOn()
                .then(() => (<Sprite.Full> this._x['F']).u(words, this._a))
                .then(() => this._r);
        }

        /**
         * 全屏文本 开 / 关。
         */
        public fullWords(onoff: boolean): Promise<Core.IRuntime> {
            this._fd = onoff;
            if (!onoff) (<Sprite.Full> this._x['F']).h();
            return super.fullWords(onoff);
        }

        /**
         * 清除全屏文本。
         */
        public fullClean(): Promise<Core.IRuntime> {
            return super.fullClean()
                .then(() => (<Sprite.Full> this._x['F']).clean())
                .then(() => this._r);
        }

        /**
         * 隐藏全屏文本。
         */
        public fullHide(): Promise<Core.IRuntime> {
            return super.fullHide()
                .then(() => (<Sprite.Full> this._x['F']).o(0))
                .then(() => this._r);
        }

        /**
         * 提示。
         */
        public tip(words: string): Promise<Core.IRuntime> {
            let gTip: Sprite.Tip = <Sprite.Tip> this._x['T'];
            return this.lightOn()
                .then(() => gTip.u(words).v())
                .then(() => gTip.p(this._t = new G.WaitForClick()))
                .then(() => gTip.h())
                .then(() => this._r);
        };

        /**
         * 评分动画。
         */
        public stars(rank: Core.IDirector.Stars, grade: string, value?: string): Promise<Core.IRuntime> {
            var stars: Sprite.Stars = <Sprite.Stars> this._x['sr'],
                key: number = rank,
                score: number = parseInt(value, 10) || 0;
            return this.lightOff()
                .then(() => {
                    this._r.dispatchEvent(new Ev.Rank({
                        target: this._r.gE(),
                        grade: grade,
                        score: score
                    }));
                    this._x['t'].h(0);
                    stars.u(key, this._r.nickname(), value).v();
                    return this.lightOn();
                }).then(() => stars.p(new G.Delay(2000)))
                .then(() => this.lightOff())
                .then(() => {
                    stars.h(0);
                    return this._r;
                });
        }

        /**
         * 播放 背景音乐 / 环境音乐。
         */
        public playMusic(type: Core.IResource.Type, resource?: Resource.Resource<string>, vol?: number): Promise<Core.IRuntime> {
            var oops: string = this._i['s'].l(),
                url: string = resource ? resource.l() : oops,
                music: HTMLAudioElement = type == Core.IResource.Type.BGM ? this._s['b'] : this._s['s'],
                volume: number = music['baseVolume'] * (vol || 1),
                change: () => Promise<Core.IRuntime> = () => {
                    music['scale'] = vol || 1;
                    music.volume = volume;
                    if (music.src != url) {
                        music.src = url;
                        // APP 需要使用
                        if (Util.ENV.Mobile && Bigine.offline && music.src != oops) {
                            this._r.dispatchEvent(new Ev.Video({
                                target: null,
                                type: type == Core.IResource.Type.BGM ? 'bgm' : 'esm',
                                uri: url,
                                volume: volume
                            }));
                        }
                    }
                    return super.playMusic(type, resource, vol);
                };
            if (!resource)
                music.play();
            if (music.src && music.src != oops)
                return new G.AudioFadeOut(1500).p(music).then(change);
            return change();
        }

        /**
         * 播放音效。
         */
        public playSE(resource?: Resource.Resource<string>, vol?: number): Promise<Core.IRuntime> {
            var url: string = (resource || this._i['s']).l(),
                se: HTMLAudioElement = this._s['e'],
                type: string = 'ended',
                resume: () => void = () => {
                    se.removeEventListener(type, resume);
                    this._s['b'].play();
                    this._s['s'].play();
                };
            se.addEventListener(type, resume);
            se.volume = se['baseVolume'] * (vol || 1);
            se.src = url;
            // APP 需要使用
            if (Util.ENV.Mobile && Bigine.offline) {
                this._r.dispatchEvent(new Ev.Video({
                    target: null,
                    type: 'se',
                    uri: url,
                    volume: se.volume
                }));
            }
            if (!resource)
                this._s['e'].play();
            return super.playSE(resource, vol);
        }

        /**
         * 设置音量。
         */
        public volumeSet(type: Core.IResource.Type, vol: number): Promise<Core.IRuntime> {
            var mType: typeof Core.IResource.Type = Core.IResource.Type;
            var mMusic: HTMLAudioElement;
            switch (type) {
                case mType.BGM:
                    mMusic = this._s['b'];
                    break;
                case mType.ESM:
                    mMusic = this._s['s'];
                    break;
                case mType.SE:
                    mMusic = this._s['e'];
                    break;
            }
            mMusic['scale'] = vol;
            new G.AudioFade(1500, vol * mMusic['baseVolume']).p(mMusic);
            return super.volumeSet(type, vol);
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
        public asRoom(resource: Resource.Resource<HTMLImageElement>, time: boolean = false, map: boolean = false): Promise<Core.IRuntime> {
            return super.asRoom(resource)
                .then((runtime: Core.IRuntime) => {
                    // 强制复位
                    var camera: string = <string> runtime.gS().g('.z');
                    var gOld: G.Element = <G.Element> this._c.q('b')[0];
                    if (camera) {
                        gOld.x(0).y(0).sW(1280).sH(720);
                        runtime.gS().d('.z')
                            .d('_z');
                    }
                    var gNew: G.Element = new G.Component()
                        .a(new G.Image(resource.o(), CanvasDirector.BOUNDS).i('n'))
                        .i('b').o(0);
                    this._c.a(gNew, 'M');
                    if (time) {
                        return gNew.p(new G.FadeIn(500)).then(() => {
                            this._c.e(gOld);
                            return runtime;
                        });
                    }
                    if (!this._ca[0] || map) {
                        return this.lightOn().then(() => {
                            this._c.e(gOld);
                            gNew.o(1);
                            return runtime;
                        });
                    }
                    // 进入房间特效
                    return this.$ca(gOld, gNew);
                });
        }

        /**
         * 进入房间特效。
         */
        protected $ca(gOld: G.Element, gNew: G.Element): Promise<Core.IRuntime> {
            let gCurtain: Sprite.Curtain = this._x['c'],
                curtain: G.Animation;
            switch (this._ca[0]) {
                case 'Fade':
                    return gCurtain.v(500)
                        .then(() => {
                            gOld.o(0);
                            this.lightOn();
                        }).then(() => {
                            gNew.p(new G.FadeIn(500));
                            this._c.e(gOld);
                            return this._r;
                        });
                case 'ShutterH':
                    curtain = new G.Shutter(1000, { direction: 'H' });
                    break;
                case 'ShutterV':
                    curtain = new G.Shutter(1000, { direction: 'V' });
                    break;
                case 'Gradient':
                    return gNew.p(new G.FadeIn(500)).then(() => {
                        this._c.e(gOld);
                        return this._r;
                    });
                default:
                    return this.lightOn().then(() => {
                        this._c.e(gOld);
                        gNew.o(1);
                        return this._r;
                    });
            }
            return this.lightOn()
                .then(() =>
                    gNew.p(curtain)
                ).then(() => {
                    this._c.e(gOld);
                    gNew.o(1);
                    return this._r;
                });
        }

        /**
         * 设置地图。
         */
        public asMap(points: Util.IHashTable<Core.IPointTag>): Promise<Core.IRuntime> {
            var gMap: G.Component = <G.Component> this._c.q('M')[0],
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
                    .addEventListener('focus', () => {
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
            gMap.c().o(1);
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
                    states: Core.IStates = this._r.gS(),
                    handler: () => void = () => {
                        if (this._pc) {
                            let option: Tag.Option = this._pc,
                                id: string = option.gI(),
                                isPay: boolean,
                                amount: number,
                                done: () => void = () => {
                                    option.p(this._r);
                                    gChoose.removeEventListener(event, handler);
                                    gChoose.h().then(() => {
                                        resolve(this._r);
                                    });
                                    this._pc = undefined;
                                };
                            if (id) {
                                isPay = states.qp(id, option.gM());
                                option.sA(isPay);
                            }
                            amount = option.gA() ? 0 : option.gM();
                            if (!amount) {
                                done();
                            } else {
                                let fail: () => void = () => { return; },
                                    suc: () => void = () => {
                                        states.ep(id, amount);
                                        done();
                                    };
                                this._r.dispatchEvent(new Ev.PayOption({
                                    target: states,
                                    amount: amount,
                                    id: id,
                                    suc: suc,
                                    fail: fail
                                }));
                            }
                        }
                    };
                gChoose.u(options, this._c).addEventListener(event, handler);
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
                    gColor: G.Element = new G.Component().a(new G.Color(CanvasDirector.BOUNDS, '#000')),
                    series: boolean = Core.IRuntime.Series.Rest == this._fs || Core.IRuntime.Series.Last == this._fs;
                // 需要先删除旧选择再添加新选择，否则在选择处读档时，时序流中断(因为未删除监听事件)
                this._c.e(this._x['C']);
                this._x['C'] = <Sprite.Choose> new Sprite.Choose(this._pt, (ev: Ev.Choose) => {
                        this._pc = <Tag.Option> ev.choice;
                    });
                this._c.a(this._x['C'], this._x['t'])
                    .a(gColor, gBack)
                    .e(gBack);
                gColor.i('b');
                this._x['S'].v();
                (<Sprite.Menu> this._x['m']).u(series);
                (<G.Component> this._c.q('M')[0]).c();
                (<G.Component> this._c.q('c')[0]).c().o(0);
                this._pc = undefined;
                this._fd = false;
                this._x['G'].h(0);
                this._x['W'].h(0);
                this._x['F'].h(0);
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
                return this._c.p(this._h = new G.Delay(milsec)).then(() =>
                    super.pause(milsec)
                );
            } else {
                // 建立临时透明层，使得可以响应WaitForClick事件。
                let sPause: G.Component = new G.Component({}, false);
                this._c.a(sPause.i('P').o(1));
                return sPause.p(new G.WaitForClick()).then(() => {
                    this._c.e(sPause);
                    return super.pause(milsec);
                });
            }
        }

        /**
         * 切幕动画。
         */
        public curtain(name: string): Promise<Core.IRuntime> {
            this._ca[0] = name;
            return super.curtain(name);
        }

        /**
         * 移动镜头。
         */
        public cameraMove(mx: number, my: number, ms: number): Promise<Core.IRuntime> {
            var gRoom: G.Image = <G.Image> this._c.q('b')[0],
                x: number = Math.round(mx * (1 - 5 / 3) * 1280),
                y: number = Math.round(my * (1 - 5 / 3) * 720);
            if (!gRoom) return this._p;
            let sClick: G.Component = new G.Component({}, false);  // 建立临时透明层，使得可以响应WaitForClick事件。
            this._c.a(sClick.i('P').o(1));
            return new Promise((resolve: (runtime: Core.IRuntime) => void) => {
                let aMove: G.Move = new G.Move(ms, { x: x, y: y }),
                    aWFC: G.WaitForClick = new G.WaitForClick(() => {
                        aMove.h();
                    });
                this._t = this._h = aWFC;
                Promise.race<any>([
                    gRoom.p(aMove).then(() => {
                        aWFC.h();
                    }),
                    sClick.p(aWFC)
                ]).then(() => {
                    this._c.e(sClick);
                    this._t = this._h = undefined;
                    aMove.h();
                    gRoom.x(x).y(y);
                    resolve(this._r);
                });
            });
        }

        /**
         * 放大/缩小镜头。
         */
        public cameraZoom(mx: number, my: number, ms: number, scale: number): Promise<Core.IRuntime> {
            var gRoom: G.Image = <G.Image> this._c.q('b')[0],
                bound: G.IBounds = gRoom.gB();
            if (!gRoom) return this._p;
            let sClick: G.Component = new G.Component({}, false);  // 建立临时透明层，使得可以响应WaitForClick事件。
            this._c.a(sClick.i('P').o(1));
            return new Promise((resolve: (runtime: Core.IRuntime) => void) => {
                let aZoom: G.Zoom = new G.Zoom(ms, { mx: mx, my: my, scale: scale }),
                    aWFC: G.WaitForClick = new G.WaitForClick(() => {
                        aZoom.h();
                    });
                this._t = this._h = aWFC;
                Promise.race<any>([
                    gRoom.p(aZoom).then(() => {
                        aWFC.h();
                    }),
                    sClick.p(aWFC)
                ]).then(() => {
                    this._c.e(sClick);
                    this._t = this._h = undefined;
                    aZoom.h();
                    let px: number = scale * (5 / 3 - 1) * 1280,
                        py: number = scale * (5 / 3 - 1) * 720;
                    gRoom.x(Math.round(bound.x - mx * px))
                        .y(Math.round(bound.y - my * py))
                        .sW(Math.round(bound.w + px))
                        .sH(Math.round(bound.h + py));
                    resolve(this._r);
                });
            });
        }

        /**
         * 抖动镜头。
         */
        public cameraShake(): Promise<Core.IRuntime> {
            var gRoom: G.Image = <G.Image> this._c.q('b')[0];
            gRoom.p(new G.Shake(500));
            return super.cameraShake();
        }

        /**
         * 状态栏开/关。
         */
        public status(onoff: boolean): Promise<Core.IRuntime> {
            var gStatus: Sprite.Status = <Sprite.Status> this._x['S'];
            onoff ? gStatus.v(0) : gStatus.h(0);
            return super.status(onoff);
        }

        /**
         * 切幕动画。
         */
        public expression(name: string): Promise<Core.IRuntime> {
            this._ca[1] = name;
            return super.expression(name);
        }

        /**
         * 使用主题。
         */
        public t(id: string, theme: Util.IHashTable<Util.IHashTable<any>>): CanvasDirector {
            let resources: Resource.Resource<string | HTMLImageElement>[][] = [],
                gCurtain: Sprite.Curtain = this._x['c'],
                slotsFromStart: boolean = false,
                states: Core.IStates = this._r.gS();
            this._pt = theme['choose'];
            // 特写。
            this._c.a(this._x['G'] = <Sprite.CG> new Sprite.CG(theme['cg']), gCurtain);
            // 某白。
            this._x['W'] = <Sprite.Words> new Sprite.Words(theme['voiceover'], theme['monolog'], theme['speak'], (ev: Ev.WordsAnimation) => {
                    this._t = this._h = ev.animation;
                });
            resources.unshift(this._x['W'].l());
            this._c.a(this._x['W'], gCurtain);
            // 全屏文本。
            this._x['F'] = <Sprite.Full> new Sprite.Full(theme['full'], (ev: Ev.FullAnimation) => {
                    this._t = this._h = ev.animation;
                    this._ft = ev.type;
                });
            resources.unshift(this._x['F'].l());
            this._c.a(this._x['F'], gCurtain);
            // 状态。
            this._x['S'] = <Sprite.Status> new Sprite.Status(theme['status']);
            resources.unshift(this._x['S'].l());
            this._c.a(this._x['S'], gCurtain);
            // 选择。
            // this._x['C'] = <Sprite.Choose> new Sprite.Choose(theme['choose']);
            // resources.unshift(this._x['C'].l());
            // this._c.a(this._x['C'], gCurtain);
            // 提示。
            this._x['T'] = <Sprite.Tip> new Sprite.Tip(theme['tip']);
            resources.unshift(this._x['T'].l());
            this._c.a(this._x['T'], gCurtain);
            // 常驻按钮。
            this._x['t'] = <Sprite.Tray> new Sprite.Tray(theme['tray'], () => {
                    if (this._h) this._h.w();
                    this._x['m'].v();
                    this._x['t'].h();
                }, () => {
                    this._x['P'].v();
                    this._x['t'].h();
                });
            resources.unshift(this._x['t'].l());
            this._c.a(this._x['t'], gCurtain);
            // 面板。
            this._x['P'] = <Sprite.Panel> new Sprite.Panel(theme['panel'], () => {
                    this._x['t'].v();
                    this._x['P'].h();
                });
            resources.unshift(this._x['P'].l());
            this._c.a(this._x['P'], gCurtain);
            // 功能菜单。
            this._x['m'] = <Sprite.Menu> new Sprite.Menu(theme['menu'], () => {
                    if (this._h) this._h.r();
                    this._x['t'].v();
                    this._x['m'].h();
                }, () => {
                    slotsFromStart = false;
                    (<Sprite.Slots> this._x['sl']).vs(this._r)
                        .then(() => {
                            this._x['m'].h(0);
                        })['catch'](() => {
                            return;
                        });
                }, () => {
                    slotsFromStart = false;
                    (<Sprite.Slots> this._x['sl']).vl(this._r)
                        .then(() => {
                            this._x['m'].h(0);
                        })['catch'](() => {
                            return;
                        });
                }, () => {
                    (<Sprite.Set> this._x['st']).vv(this._s['b']['baseVolume'], this._s['e']['baseVolume'], this._vo)
                        .then(() => {
                            this._x['m'].h(0);
                        })['catch'](() => {
                            return;
                        });
                }, () => {
                    this._x['m'].h(0);
                    this._t = this._h = undefined;
                    this._r.stop();
                    (<Sprite.Start> this._x['s']).u(this._r.gTitle(), true, this._c).v(0);
                });
            resources.unshift(this._x['m'].l());
            this._c.a(this._x['m'], gCurtain);
            // 开始菜单。
            this._x['s'] = <Sprite.Start> new Sprite.Start(theme['start'], (event: Ev.StartNew) => {
                    this.playSE(this._i['c']);
                    this.lightOff().then(() => {
                        event.target.h(0);
                        this._r.dispatchEvent(new Ev.Begin({ target: this._r.gE() }));
                    });
                }, () => {
                    slotsFromStart = true;
                    this.playSE(this._i['c']);
                    (<Sprite.SeriesSlots> this._x['ss']).vl(this._r);
                }, () => {
                    slotsFromStart = true;
                    this.playSE(this._i['c']);
                    (<Sprite.Slots> this._x['sl']).vl(this._r)
                        ['catch'](() => {
                            return;
                        });
                });
            resources.unshift(this._x['s'].l());
            this._c.a(this._x['s'], gCurtain);
            // 档位菜单。
            this._x['sl'] = <Sprite.Slots> new Sprite.Slots(theme['slots'], () => {
                    if (states.g('.oc')) {
                        this._r.dispatchEvent(new Ev.ScreenLoad({
                            target: this._r.gS(),
                            type: 'close'
                        }));
                        states.d('.oc');
                    }
                    this._x[slotsFromStart ? 's' : 'm'].v();
                    this._x['sl'].h();
                }, (ev: Ev.SlotsSave) => {
                    this._x[slotsFromStart ? 's' : 'm'].v(0);
                    this._x['sl'].h(0);
                    this._r.gS().e(ev.slot);
                }, (ev: Ev.SlotsLoad) => {
                    this._r.dispatchEvent(new Ev.ScreenLoad({
                        target: this._r.gS(),
                        type: 'close'
                    }));
                    this.sl(ev.id);
                });
            resources.push(this._x['sl'].l());
            this._c.a(this._x['sl'], gCurtain);
            // 连载档位菜单。
            this._x['ss'] = <Sprite.SeriesSlots> new Sprite.SeriesSlots(theme['series'], () => {
                    if (!slotsFromStart && states.g('.oc')) {
                        this._r.dispatchEvent(new Ev.ScreenSave({
                            target: this._r.gS(),
                            type: 'close'
                        }));
                        states.d('.oc');
                    }
                    slotsFromStart = false;
                    this._x['ss'].h();
                }, (ev: Ev.SlotsSave) => {
                    this._r.dispatchEvent(new Ev.ScreenSave({
                        target: this._r.gS(),
                        type: 'close'
                    }));
                    this._x['ss'].h();
                    this._r.gS().e(ev.slot, true);
                }, (ev: Ev.SlotsLoad) => {
                    slotsFromStart = false;
                    this.sl(ev.id);
                });
            resources.push(this._x['ss'].l());
            this._c.a(this._x['ss'], gCurtain);
            // 设置菜单。
            this._x['st'] = <Sprite.Set> new Sprite.Set(theme['set'], () => {
                    this._x['m'].v();
                    this._x['st'].h();
                }, (ev: Ev.SetVolume) => {
                    var bgm: HTMLAudioElement = this._s['b'];
                    var esm: HTMLAudioElement = this._s['s'];
                    var se: HTMLAudioElement = this._s['e'];
                    bgm['baseVolume'] = ev.bVolume * 0.01;
                    bgm.volume = ev.bVolume * 0.01 * bgm['scale'];
                    esm['baseVolume'] = ev.bVolume * 0.01;
                    esm.volume = ev.bVolume * 0.01 * esm['scale'];
                    se['baseVolume'] = ev.eVolume * 0.01;
                    se.volume = ev.eVolume * 0.01 * se['scale'];
                });
            resources.push(this._x['st'].l());
            this._c.a(this._x['st'], gCurtain);

            // 保存评分配置
            this._c.a(this._x['sr'] = <Sprite.Stars> new Sprite.Stars(theme['stars']), gCurtain);
            resources.push(this._x['sr'].l());

            // 作者
            this._c.a(this._x['a'] = new Sprite.Author(theme['author']), gCurtain);

            this.c(resources);
            return this;
        }

        public sl(id: string, aotuload: boolean = false): void {
            if (id) {
                this.lightOff().then(() => {
                    if (this._x['sl']) this._x['sl'].h(0);
                    if (this._x['ss']) this._x['ss'].h(0);
                    this._x['s'].h(0);
                    if (!this._a)
                        this._x['t'].v(0);
                    this._r.l(id, aotuload);
                });
            }
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
            if (sheet && sheet.length > 0) {
                (<Sprite.Panel> this._x['P']).u(sheet, this._r);
                (<Sprite.Tray> this._x['t']).u(true);
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
            this._s['b']['baseVolume'] = volume;
            this._s['b'].volume = volume * this._s['b']['scale'];
            this._s['s']['baseVolume'] = volume;
            this._s['s'].volume = volume * this._s['s']['scale'];
            this._s['e']['baseVolume'] = volume;
            this._s['e'].volume = volume * this._s['e']['scale'];
            this._vo = volume > 0;
            let set: Sprite.Set = <Sprite.Set> this._x['st'];
            if (set.gO() > 0) set.vv(volume, volume, this._vo);
            return <CanvasDirector> super.v(volume);
        }

        /**
         * 修正 DOM 定位。
         */
        public f(): void {
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
            this._c.z();
    }

        /**
         * 自我销毁。
         */
        public d(): void {
            this._c.h();
            this._c = undefined;
            this._s['b'].pause();
            this._s['e'].pause();
            this._s['s'].pause();
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
            this.playMusic(Core.IResource.Type.BGM);
            this.playMusic(Core.IResource.Type.ESM);
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

        /**
         * 暂停播放。
         */
        public rp(): CanvasDirector {
            this._s['b'].pause();
            this._s['s'].pause();
            return <CanvasDirector> super.rp();
        }

        /**
         * 恢复播放。
         */
        public rr(): CanvasDirector {
            this._s['b'].play();
            this._s['s'].play();
            return <CanvasDirector> super.rp();
        }
    }
}
