/**
 * 定义（作品）运行时组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/Runtime.ts
 */

/// <reference path="Episode.ts" />
/// <reference path="States.ts" />
/// <reference path="_Director/DirectorFactory.ts" />
/// <reference path="../Tag/_pack.ts" />

namespace Runtime {
    import Util = __Bigine_Util;

    export class Runtime implements Core.IRuntime {
        /**
         * 事件监听函数池。
         */
        private _a: Util.IHashTable<Util.IEventListener<any>[]>;

        /**
         * 作品。
         */
        private _e: Episode;

        /**
         * 日志组件。
         */
        private _l: Util.ConsoleLogger;

        /**
         * 数据状态组件。
         */
        private _s: States;

        /**
         * 场效调度组件。
         */
        private _d: Director;

        /**
         * loading是否加载完成。
         */
        private _fl: boolean;

        /**
         * 是否准备就绪标识。
         */
        private _fr: boolean;

        /**
         * 是否播放标识。
         */
        private _fp: boolean;

        /**
         * 音量标识。
         */
        private _fv: number;

        /**
         * 是否自动播放标识。
         */
        private _fa: boolean;

        /**
         * 是否中止播放。
         */
        private _fh: boolean;

        /**
         * 是否允许变更自动播放状态。
         */
        private _fb: boolean;

        /**
         * 当前时序流。
         */
        private _t: Promise<Runtime>;

        /**
         * 作品 [名称、作者名/logo]。
         */
        private _n: [string, string];

        /**
         * 用户名。
         */
        private _nn: string;

        /**
         * 记录自动读档 id、读档数据、标识（验证 pay / manual）。
         */
        private _al: [string, Util.IHashTable<any>, string];

        private _lj: boolean;

        /**
         * 构造函数。
         */
        constructor(ep: Core.IRootTag) {
            this._a = {};
            this._e = new Episode(ep, this);
            this._l = Util.ConsoleLogger.singleton();
            this._s = new States(this);
            this._d = DirectorFactory.c(this);
            this._fr =
            this._fl =
            this._fh = false;
            this._fp = this._d.gD();
            this._fv = 1;
            this._fa = this._e.gA();
            this._d.a(this._fa);
            this._d.sr(this._e.gSr());
            this._fb = true;
            this._t = Promise.resolve(this);
            this._n = ['', ''];
            this._al = [undefined, undefined, undefined];
            this._d.Init(true);
            this.addEventListener('ready', () => {
                this._d.Init(false);
                this._d.t(this._e.gT(), this._e.gC())
                    .s(ep.s())
                    .p(ep.p());
                this._fr = true;
                this._s.l().then(() => {
                    let valid: boolean = false;
                    if (this._al[0] && this._al[2] == 'pay') {
                        let pay: [string, Util.IHashTable<any>] = <[string, Util.IHashTable<any>]> this._s.q('pay');
                        if (pay && pay[1]['_a'] == this._al[0]) {
                            this._al[1] = pay[1];
                            valid = true;
                        }
                    }
                    if (this._al[0] && this._al[2] == 'manual') {
                        let manual: [string, Util.IHashTable<any>] = <[string, Util.IHashTable<any>]> this._s.q('auto', Core.IStates.Save.Series);
                        if (manual && this._al[0] == manual[0] && manual[1]['data']) {
                            this._al[1] = manual[1]['data'];
                            valid = true;
                        }
                    }
                    this._fp = false;
                    this.dispatchEvent(new Ev.AutoLoad({
                        target: this._s,
                        valid: valid
                    }));
                    if (!valid) this._al = [undefined, undefined, undefined];
                }).catch(() => {
                    this._al = [undefined, undefined, undefined];
                    this.dispatchEvent(new Ev.AutoLoad({
                        target: this._s,
                        valid: false
                    }));
                });
                // 在网页端，在此 this._fp === false，调试
                if (this._fp) {
                    this._fp = false;
                    this.play();
                }
            });
            this.addEventListener('begin', () => {
                this._fb = true;
                this._fh = false;
                this._s.d(' ');
                this._d.Author(this._n[0], this._n[1])
                    .then(() => this.t(() => this._e.p(Core.ISceneTag.Type.Begin, this)));
            });
            this.addEventListener('resume', () => {
                this._fb = true;
            });
            this.addEventListener('end', () => {
                this._fb =
                this._fp = false;
            });
        }

        /**
         * 新增事件监听。
         */
        public addEventListener<T>(type: string, listener: Util.IEventListener<T>): Runtime {
            this._a[type] = this._a[type] || [];
            if (!Util.some(this._a[type], (reged: Util.IEventListener<any>) => reged == listener))
                this._a[type].push(listener);
            return this;
        }

        /**
         * 取消事件监听。
         */
        public removeEventListener<T>(type: string, listener: Util.IEventListener<T>): Runtime {
            if (!(type in this._a))
                return this;
            Util.some(this._a[type], (reged: Util.IEventListener<any>, index: number) => {
                if (reged != listener)
                    return false;
                this._a[type].splice(index, 1);
                return true;
            });
            return this;
        }

        /**
         * 发生事件。
         */
        public dispatchEvent<T>(event: Ev.Event<T>): Runtime {
            var type: string = event.gT();
            this._l.d('[event]', event);
            if (!(type in this._a))
                return this;
            Util.each(<Util.IEventListener<T>[]> this._a[type], (listener: Util.IEventListener<T>) => {
                listener(event);
            });
            return this;
        }

        /**
         * 获取作品组件。
         */
        public gE(): Episode {
            return this._e;
        }

        /**
         * 获取日志组件。
         */
        public gL(): Util.ConsoleLogger {
            return this._l;
        }

        /**
         * 获取数据状态组件。
         */
        public gS(): States {
            return this._s;
        }

        /**
         * 获取场效调度器组件。
         */
        public gD(): Director {
            return this._d;
        }

        /**
         * 点击开始播放、重新播放调用。
         */
        public play(): Runtime {
            if (this._al[0] && this._al[1]) {
                this._fp = true;
                if (!Util.ENV.IOS) this._d.iAudio();
                this._d.sl(this._al[0], true);
                return this;
            }
            if (this._fp)
                return this;
            this._fp = true;
            this._fb = false;
            if (!this._fr)
                return this;
            this._s.i({'.lj': this._lj});
            this._d.iAudio();
            this._d.curtain(null);
            this._d.Init(false);
            this._d.OP(!this._e.gA(), this._n[0]);
            return this;
        }

        /**
         * 重新播放。
         */
        public replay(): Runtime {
            return this.play();
        }

        /**
         * 销毁。
         */
        public destroy(): Promise<Runtime> {
            return new Promise((resolve: (value: Runtime) => void) => {
                this._fh = true; // 中止现有时序流
                this._d.d();
                this.t(() => {
                    resolve(this);
                    return this;
                });
            });
        }

        /**
         * DOM 定位修正。
         */
        public fix(): void {
            this._d.f();
        }

        /**
         * 设置或获取自动播放设置。
         */
        public auto(auto?: boolean): boolean {
            if (this._fb && undefined !== auto)
                this._fa = this._d.a(!!auto);
            return this._fa;
        }

        /**
         * 设置或获取音量。
         */
        public volume(volume?: number): number {
            if (undefined !== volume)
                this._d.v(this._fv = Math.min(1, Math.max(0, parseFloat(<any> volume))));
            return this._fv;
        }

        /**
         * 是否正在播放。
         */
        public isPlaying(): boolean {
            return this._fp;
        }

        /**
         * 是否准备就绪标识。
         */
        public isReady(): boolean {
            return this._fr;
        }

        /**
         * 设置作品标题。
         */
        public title(title: string): Runtime {
            this._n[0] = title;
            return this;
        }

        /**
         * 获取作品标题。
         */
        public gTitle(): string {
            return this._n[0];
        }

        /**
         * 设置作者/logo。
         */
        public author(logo: string): Runtime {
            this._n[1] = logo;
            return this;
        }

        /**
         * 设置跨域标记。
         */
        public domain(text: string): Runtime {
            switch (text) {
                case '52tian':
                    Bigine.domain = text;
                    break;
                case 'wechat':
                    this._d.drawInit(true);
                    return this;
            }
            this._d.drawInit(false);
            return this;
        }

        /**
         * 设置玩家昵称。
         */
        public user(nickname: string): Runtime {
            this._nn = nickname;
            return this;
        }

        /**
         * 获取玩家昵称
         */
        public nickname(): string {
            return this._nn || '您';
        }

        /**
         * 获取剧情付费信息
         */
        public plots(data: Util.IHashTable<string> | string): Runtime {
            this._s.lp(data);
            return this;
        }

        /**
         * 自动读档
         */
        public autoLoad(id: string, type?: string): Runtime {
            this._al[0] = id;
            this._al[2] = type;
            return this;
        }

        /**
         * 图片资源高
         */
        public height(h: number): Runtime {
            Bigine.height = h;
            return this;
        }

        /**
         * 是否为预览页调用
         */
        public publish(b: boolean): Runtime {
            this._lj = b;
            return this;
        }

        /**
         * 播报当前事件。
         */
        public s(scene: Core.ISceneTag, title: string, actions: string[]): Runtime {
            this._s.s('_s', scene.gI())
                .d('_a');
            this.dispatchEvent(new Ev.Scene({
                target: scene,
                title: title,
                actions: actions
            }));
            return this;
        }

        /**
         * 播报当前关键帧。
         */
        public a(action: Core.IIdableTag): Runtime {
            this._s.s('_a', action.gI())
                .p();
            this.dispatchEvent(new Ev.Action({
                target: action
            }));
            return this;
        }

        /**
         * 是否中止播放。
         */
        public gH(): boolean {
            return this._fh;
        }

        /**
         * 声明时序流。
         */
        public t(flow: () => Runtime | Thenable<Runtime>): Runtime {
            this._t = this._t.then(flow)
                ['catch'](E.ignoreHalt)
                ['catch']((reason: any) => {
                    this._l.e(reason);
                    throw reason;
                }).then(() => this);
            return this;
        }

        /**
         * 读档继续。
         */
        public l(id: string, autoload: boolean): void {
            this._fh = true; // 中止现有时序流
            let load: (data: Util.IHashTable<any>) => void = (data: Util.IHashTable<any>) => {
                let fresh: boolean = !data || {} == data,
                    episode: Episode = this._e,
                    states: States = this._s,
                    ks: string = '_s',
                    ktn: string = '_rt',
                    kcn: string = '_rc',
                    kco: string = '$rc',
                    kdc: string = '_c',
                    kal: string = '.al',
                    krc: string = '.c',
                    pos: typeof Core.IDirector.Position = Core.IDirector.Position,
                    tn: string,
                    cn: string,
                    enter: Tag.Enter;
                this._d.reset().then(() => {
                    if (!fresh)
                        states.i(data);
                    if (fresh || !states.g(ks) || states.g(' ')) { // 无存档或存档无事件特征或连载存档
                        this._fh = false;
                        return this.dispatchEvent(new Ev.Begin({
                            target: episode
                        }));
                    }
                    states.m('_a', '.a') // 识别重建用状态数据
                        .m(ks, '.s')
                        .m(kdc, krc)
                        .m(kdc + pos.LLeft, krc + pos.LLeft)
                        .m(kdc + pos.Left, krc + pos.Left)
                        .m(kdc + pos.CLeft, krc + pos.CLeft)
                        .m(kdc + pos.Center, krc + pos.Center)
                        .m(kdc + pos.CRight, krc + pos.CRight)
                        .m(kdc + pos.Right, krc + pos.Right)
                        .m(kdc + pos.RRight, krc + pos.RRight);
                    if (autoload) states.s(kal, true);
                    this._d.h();
                    this.t(() => {
                        this._fh = false;
                        tn = states.g(ktn);
                        cn = states.g(kcn);
                        this.dispatchEvent(new Ev.Resume({
                            target: episode
                        }));
                        if (tn || cn) {
                            if (cn) {
                                if (tn) {
                                    states.s(kco, episode.q(cn, Core.IEpisode.Entity.Room));
                                } else {
                                    tn = cn;
                                    states.d(kcn);
                                }
                            }
                            enter = new Tag.Enter([tn || cn], '', [], -1);
                            enter.b(episode);
                            states.s('.ld', true);
                            return <Runtime | Thenable<Runtime>> enter.p(this)
                                ['catch'](E.ignoreHalt);
                        }
                        return episode.p(states.g('_p'), this);
                    });
                });
            };
            if (autoload) {
                load(this._al[1]);
                this._al = [undefined, undefined, undefined];
            } else {
                this.dispatchEvent(new Ev.Load({
                    target: this._s,
                    callback: load,
                    id: id
                }));
            }
        }

        /**
         * 绑定视图。
         */
        public bind(viewport: HTMLElement): Runtime {
            this._d.b(viewport);
            return this;
        }

        /**
         * 连载模式。
         */
        public series(value?: string): Runtime {
            let series: typeof Core.IRuntime.Series = Core.IRuntime.Series,
                fs: Core.IRuntime.Series;
            switch (value) {
                case 'f':
                    fs = series.First;
                    break;
                case 'l':
                    fs = series.Last;
                    break;
                default:
                    fs = series.Rest;
                    break;
            }
            this._d.e(fs);
            return this;
        }

        /**
         * 暂停播放。
         */
        public pause(): Runtime {
            this._d.rp();
            return this;
        }

        /**
         * 恢复播放。
         */
        public resume(): Runtime {
            this._d.rr();
            return this;
        }

        /**
         * 停止播放。
         */
        public stop(): Runtime {
            this._fh = true;
            this._d.reset().then(() => {
                this._s.i({});
                this._d.h();
            });
            return this;
        }
    }
}
