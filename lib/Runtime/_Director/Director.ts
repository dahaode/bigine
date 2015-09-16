/**
 * 定义抽象（运行时）场效调度器组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/_Director/Director.ts
 */

/// <reference path="../IDirector.ts" />
/// <reference path="../_Resource/Prefetcher.ts" />
/// <reference path="../Event/Begin.ts" />

namespace Runtime {
    'use strict';

    export class Director implements IDirector {
        /**
         * 运行时。
         */
        private _r: IRuntime;

        /**
         * 反馈运行时的即时 Promise 。
         */
        private _p: Promise<IRuntime>;

        /**
         * 是否动态创建。
         */
        private _d: boolean;

        /**
         * 主题。
         */
        private _t: Util.IHashTable<Util.IHashTable<any>>;

        /**
         * 自动播放标识。
         */
        private _a: boolean;

        /**
         * 音量。
         */
        private _v: number;

        /**
         * 构造函数。
         */
        constructor(runtime: IRuntime) {
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
        public c(resources: Resource[][]): Promise<void> {
            return Prefecher.c(resources);
        }

        /**
         * 开始动画。
         */
        public OP(start: boolean): Promise<IRuntime> {
            if (!start)
                this._r.dispatchEvent(new Event.Begin({
                    target: this._r.gE()
                }));
            return this._p;
        }

        /**
         * 完结动画。
         */
        public ED(): Promise<IRuntime> {
            return this._p.then(() => this._r.gE().p(Tag.IScene.Type.End, this._r));
        }

        /**
         * 失败动画。
         */
        public FAIL(): Promise<IRuntime> {
            return this._p.then(() => this._r.gE().p(Tag.IScene.Type.Fail, this._r));
        }

        /**
         * 人物出场。
         */
        public charOn(resource: IResource, position: IDirector.Position): Promise<IRuntime> {
            return this.charSet(resource, position);
        }

        /**
         * 人物离场。
         */
        public charOff(position: IDirector.Position): Promise<IRuntime> {
            this._r.gS().d('$c' + position);
            return this._p;
        }

        /**
         * 设置人物。
         */
        public charSet(resource: IResource, position: IDirector.Position): Promise<IRuntime> {
            this._r.gS().s('$c' + position, resource);
            return this._p;
        }

        /**
         * 某白。
         */
        public words(words: string, theme: string, who?: string, avatar?: IResource): Promise<IRuntime> {
            return this._p;
        }

        /**
         * 评分动画。
         */
        public stars(rank: IDirector.Stars): Promise<IRuntime> {
            return this._p;
        }

        /**
         * 播放背景音乐。
         */
        public playBGM(resource: IResource): Promise<IRuntime> {
            this._r.gS().s('$b', resource);
            return this._p;
        }

        /**
         * 播放音效。
         */
        public playSE(resource: IResource): Promise<IRuntime> {
            return this._p;
        }

        /**
         * 关闭特写。
         */
        public hideCG(): Promise<IRuntime> {
            this._r.gS().d('$c');
            return this._p;
        }

        /**
         * 展示特写。
         */
        public showCG(resource: IResource): Promise<IRuntime> {
            this._r.gS().s('$c', resource);
            return this._p;
        }

        /**
         * 设置房间。
         */
        public asRoom(resource: IResource): Promise<IRuntime> {
            this._r.gS().s('$t', resource);
            return this._p;
        }

        /**
         * 设置地图。
         */
        public asMap(points: Util.IHashTable<Tag.IPoint>): Promise<IRuntime> {
            return this._p;
        }

        /**
         * 关灯（落幕）。
         */
        public lightOff(): Promise<IRuntime> {
            return this._p;
        }

        /**
         * 开灯（开幕）。
         */
        public lightOn(): Promise<IRuntime> {
            return this._p;
        }

        /**
         * 选择。
         */
        public choose(options: Util.IHashTable<Tag.IOption>): Promise<IRuntime> {
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
            this._t = theme;
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
        public v(volumn: number): Director {
            this._v = volumn;
            return this;
        }
    }
}
