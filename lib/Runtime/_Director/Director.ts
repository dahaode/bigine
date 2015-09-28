/**
 * 定义抽象（运行时）场效调度器组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/_Director/Director.ts
 */

/// <reference path="../../Core/_Runtime/IDirector.ts" />
/// <reference path="../_Resource/Prefetcher.ts" />
/// <reference path="../Event/Begin.ts" />

namespace Runtime {
    export class Director implements Core.IDirector {
        /**
         * 运行时。
         */
        protected _r: Core.IRuntime;

        /**
         * 反馈运行时的即时 Promise 。
         */
        protected _p: Promise<Core.IRuntime>;

        /**
         * 是否动态创建。
         */
        protected _d: boolean;

        /**
         * 自动播放标识。
         */
        protected _a: boolean;

        /**
         * 音量。
         */
        protected _v: number;

        /**
         * 构造函数。
         */
        constructor(runtime: Core.IRuntime) {
            this._r = runtime;
            this._p = Promise.resolve(this._r);
            this._d =
            this._a = false;
            this._v = 1;
        }

        /**
         * 预加载指定资源组。
         *
         * @param resources 一个（作品）事件所包含地所有资源
         */
        public c(resources: Resource<string | HTMLImageElement>[][]): Promise<void> {
            return Prefecher.c(resources, this._r.gL());
        }

        /**
         * 开始动画。
         */
        public OP(start: boolean): Promise<Core.IRuntime> {
            if (!start)
                this._r.dispatchEvent(new Event.Begin({
                    target: this._r.gE()
                }));
            return this._p;
        }

        /**
         * 完结动画。
         */
        public ED(): Promise<Core.IRuntime> {
            return this._p.then(() => this._r.gE().p(Core.ISceneTag.Type.End, this._r));
        }

        /**
         * 失败动画。
         */
        public FAIL(): Promise<Core.IRuntime> {
            return this._p.then(() => this._r.gE().p(Core.ISceneTag.Type.Fail, this._r));
        }

        /**
         * 人物出场。
         */
        public charOn(resource: Resource<HTMLImageElement>, position: Core.IDirector.Position): Promise<Core.IRuntime> {
            return this.charSet(resource, position);
        }

        /**
         * 人物离场。
         */
        public charOff(position: Core.IDirector.Position): Promise<Core.IRuntime> {
            this._r.gS().d('$c' + position);
            return this._p;
        }

        /**
         * 设置人物。
         */
        public charSet(resource: Resource<HTMLImageElement>, position: Core.IDirector.Position): Promise<Core.IRuntime> {
            this._r.gS().s('$c' + position, resource);
            return this._p;
        }

        /**
         * 某白。
         */
        public words(words: string, theme: string, who?: string, avatar?: Resource<HTMLImageElement>): Promise<Core.IRuntime> {
            return this._p;
        }

        /**
         * 提示。
         */
        public tip(words: string): Promise<Core.IRuntime> {
            return this._p;
        };

        /**
         * 评分动画。
         */
        public stars(rank: Core.IDirector.Stars): Promise<Core.IRuntime> {
            return this._p;
        }

        /**
         * 播放背景音乐。
         */
        public playBGM(resource?: Resource<string>): Promise<Core.IRuntime> {
            this._r.gS().s('$b', resource);
            return this._p;
        }

        /**
         * 播放音效。
         */
        public playSE(resource?: Resource<string>): Promise<Core.IRuntime> {
            return this._p;
        }

        /**
         * 关闭特写。
         */
        public hideCG(): Promise<Core.IRuntime> {
            this._r.gS().d('$c');
            return this._p;
        }

        /**
         * 展示特写。
         */
        public showCG(resource: Resource<HTMLImageElement>): Promise<Core.IRuntime> {
            this._r.gS().s('$c', resource);
            return this._p;
        }

        /**
         * 设置房间。
         */
        public asRoom(resource: Resource<HTMLImageElement>): Promise<Core.IRuntime> {
            this._r.gS().s('$t', resource);
            return this._p;
        }

        /**
         * 设置地图。
         */
        public asMap(points: Util.IHashTable<Core.IPointTag>): Promise<Core.IRuntime> {
            return this._p;
        }

        /**
         * 关灯（落幕）。
         */
        public lightOff(): Promise<Core.IRuntime> {
            return this._p;
        }

        /**
         * 开灯（开幕）。
         */
        public lightOn(): Promise<Core.IRuntime> {
            return this._p;
        }

        /**
         * 选择。
         */
        public choose(options: Core.IOptionTag[]): Promise<Core.IRuntime> {
            return this._p;
        }

        /**
         * 重置人物及状态。
         */
        public reset(): Promise<Core.IRuntime> {
            var posistion: typeof Core.IDirector.Position = Core.IDirector.Position;
            this._r.gS().d('$c')
                .d('$c' + posistion.Left)
                .d('$c' + posistion.CLeft)
                .d('$c' + posistion.Center)
                .d('$c' + posistion.CRight)
                .d('$c' + posistion.Right);
            return this._p;
        }

        /**
         * 获取动态创建标识。
         */
        public gD(): boolean {
            return this._d;
        }

        /**
         * 使用主题。
         */
        public t(theme: Util.IHashTable<Util.IHashTable<any>>): Director {
            return this;
        }

        /**
         * 设置自动播放。
         */
        public a(auto: boolean): Director {
            this._a = auto;
            return this;
        }

        /**
         * 设置音量。
         */
        public v(volume: number): Director {
            this._v = volume;
            return this;
        }

        /**
         * 修正 DOM 定位。
         */
        public f(): void {
            //
        }

        /**
         * 自我销毁。
         */
        public h(): void {
            //
        }
    }
}
