/**
 * 定义抽象（运行时）场效调度器组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/_Director/Director.ts
 */

/// <reference path="../../Core/_Runtime/IDirector.ts" />
/// <reference path="../../Resource/Prefetcher.ts" />
/// <reference path="../../Ev/_Runtime/Begin.ts" />

namespace Runtime {
    import Util = __Bigine_Util;

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
         * 暂停状态时记录的自动播放状态。
         */
        protected _ra: boolean;

        /**
         * 音量。
         */
        protected _v: number;

        /**
         * 是否读档。
         */
        protected _o: boolean;

        /**
         * 是否显示回看按钮。
         */
        protected _sr: boolean;

        /**
         * 构造函数。
         */
        constructor(runtime: Core.IRuntime) {
            this._r = runtime;
            this._p = Promise.resolve(this._r);
            this._d =
            this._a =
            this._sr =
            this._ra =
            this._o = false;
            this._v = 1;
        }

        /**
         * 初始化 Audio 列表。
         */
        public iAudio(): void {
            //
        }

        /**
         * 预加载指定资源组。
         *
         * @param resources 一个（作品）事件所包含地所有资源
         */
        public c(resources: Resource.Resource<string | HTMLImageElement>[][], visible?: boolean): Promise<void> {
            return Resource.Prefecher.c(resources, this._r.gL());
        }

        /**
         * 加载动画。
         */
        public Init(loaded: boolean): Promise<Core.IRuntime> {
            return this._p;
        }

        /**
         * 绘制加载动画。
         */
        public drawInit(isWechat: boolean): Promise<Core.IRuntime> {
            return this._p;
        }

        /**
         * 作者Logo。
         */
        public Author(title: string, author: string): Promise<Core.IRuntime> {
            return this._p;
        }

        /**
         * 开始动画。
         */
        public OP(start: boolean, title: string): Promise<Core.IRuntime> {
            if (!start)
                this._r.dispatchEvent(new Ev.Begin({
                    target: this._r.gE()
                }));
            return this._p;
        }

        /**
         * 完结动画。
         */
        public ED(): Promise<Core.IRuntime> {
            return this._p;
        }

        /**
         * 失败动画。
         */
        public FAIL(): Promise<Core.IRuntime> {
            return this._p;
        }

        /**
         * 人物出场。
         */
        public charOn(resource: Resource.Resource<HTMLImageElement>, position: Core.IDirector.Position): Promise<Core.IRuntime> {
            return this.charSet(resource, position);
        }

        /**
         * 人物离场。
         */
        public charOff(position: Core.IDirector.Position): Promise<Core.IRuntime> {
            return this._p;
        }

        /**
         * 设置人物。
         */
        public charSet(resource: Resource.Resource<HTMLImageElement>, position: Core.IDirector.Position): Promise<Core.IRuntime> {
            return this._p;
        }

        /**
         * 人物移动。
         */
        public charMove(from: Core.IDirector.Position, to: Core.IDirector.Position): Promise<Core.IRuntime> {
            return this._p;
        }

        /**
         * 某白。
         */
        public words(words: string, theme: string, who?: string, avatar?: Resource.Resource<HTMLImageElement>): Promise<Core.IRuntime> {
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
        public stars(rank: Core.IDirector.Stars, grade: string, value: string): Promise<Core.IRuntime> {
            return this._p;
        }

        /**
         * 播放 背景音乐 / 环境音乐。
         */
        public playMusic(type: Core.IResource.Type, resource?: Resource.Resource<string>, vol?: number): Promise<Core.IRuntime> {
            return this._p;
        }

        /**
         * 播放音效。
         */
        public playSE(resource?: Resource.Resource<string>, vol?: number): Promise<Core.IRuntime> {
            return this._p;
        }

        /**
         * 设置音量。
         */
        public volumeSet(type: Core.IResource.Type, vol: number): Promise<Core.IRuntime> {
            return this._p;
        }

        /**
         * 关闭特写。
         */
        public hideCG(): Promise<Core.IRuntime> {
            return this._p;
        }

        /**
         * 展示特写。
         */
        public showCG(resource: Resource.Resource<HTMLImageElement>): Promise<Core.IRuntime> {
            return this._p;
        }

        /**
         * 设置房间。
         */
        public asRoom(resource: Resource.Resource<HTMLImageElement>, time?: boolean, map?: boolean): Promise<Core.IRuntime> {
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
        public choose(options: Core.IOptionTag[], time: number, answer: string): Promise<Core.IRuntime> {
            return this._p;
        }

        /**
         * 重置人物及状态。
         */
        public reset(): Promise<Core.IRuntime> {
            this._r.gS().s('$c', 0)
                .d('.p*');
            return this._p;
        }

        /**
         * （读档继续时）设置特写。
         */
        public setCG(resource: Core.IResource<HTMLImageElement>): Promise<Core.IRuntime> {
            return this._p;
        }

        /**
         * 停顿。
         */
        public pause(milsec: number): Promise<Core.IRuntime> {
            return this._p;
        }

        /**
         * 切幕动画。
         */
        public curtain(name: string, secend?: number): Promise<Core.IRuntime> {
            return this._p;
        }

        /**
         * 移动镜头。
         */
        public cameraMove(mx: number, my: number, ms: number): Promise<Core.IRuntime> {
            return this._p;
        }

        /**
         * 放大/缩小镜头。
         */
        public cameraZoom(mx: number, my: number, ms: number, scale: number): Promise<Core.IRuntime> {
            return this._p;
        }

        /**
         * 抖动镜头。
         */
        public cameraShake(time: number, offset: number): Promise<Core.IRuntime> {
            return this._p;
        }

        /**
         * 状态栏开/关。
         */
        public status(onoff: boolean): Promise<Core.IRuntime> {
            return this._p;
        }

        /**
         * 神态动画。
         */
        public expression(name: string): Promise<Core.IRuntime> {
            return this._p;
        }

        /**
         * 全屏文本 开 / 关。
         */
        public fullWords(onoff: boolean): Promise<Core.IRuntime> {
            return this._p;
        }

        /**
         * 清除全屏文本。
         */
        public fullClean(): Promise<Core.IRuntime> {
            return this._p;
        }

        /**
         * 隐藏全屏文本。
         */
        public fullHide(): Promise<Core.IRuntime> {
            return this._p;
        }

        /**
         * 特效。
         */
        public weather(onoff: boolean, type: string): Promise<Core.IRuntime> {
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
        public t(id: string, theme: Util.IHashTable<Util.IHashTable<any>>): Director {
            return this;
        }

        /**
         * 配置状态。
         */
        public s(sheet: [string, string][]): Director {
            return this;
        }

        /**
         * 配置面板。
         */
        public p(sheet: Array<Util.IHashTable<any>>): Director {
            return this;
        }

        /**
         * 设置自动播放。
         */
        public a(auto: boolean): boolean {
            return this._a = auto;
        }

        /**
         * 设置是否显示回看按钮。
         */
        public sr(show: boolean): boolean {
            return this._sr = show;
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
        public d(): void {
            //
        }

        /**
         * 取消阻塞。
         */
        public h(): void {
            //
        }

        /**
         * 绑定视图。
         */
        public b(viewport: HTMLElement): Director {
            return this;
        }

        /**
         * 连载模式。
         */
        public e(type: Core.IRuntime.Series): Director {
            return this;
        }

        /**
         * 暂停播放。
         */
        public rp(): Director {
            this._ra = this._a;
            this._a = false;
            return this;
        }

        /**
         * 恢复播放。
         */
        public rr(): Director {
            this._a = this._ra;
            return this;
        }

        public sl(id: string, aotuload?: boolean): void {
            //
        }
    }
}
