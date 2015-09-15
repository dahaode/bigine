/**
 * 定义（作品）运行时组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/Runtime.ts
 */

/// <reference path="Episode.ts" />
/// <reference path="_Logger/ConsoleLogger.ts" />
/// <reference path="States.ts" />
/// <reference path="_Director/DirectorFactory.ts" />
/// <reference path="../Tag/_pack.ts" />

module Runtime {
    export class Runtime implements IRuntime {
        /**
         * 事件监听函数池。
         */
        private _a: Util.IHashTable<Core.IEventListener<any>[]>;

        /**
         * 作品。
         */
        private _e: Episode;

        /**
         * 日志组件。
         */
        private _l: ConsoleLogger;

        /**
         * 数据状态组件。
         */
        private _s: States;

        /**
         * 场效调度组件。
         */
        private _d: Director;

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
         * 构造函数。
         */
        constructor(ep: Tag.IRoot) {
            this._a = {};
            this._e = new Episode(ep, this);
            this._l = new ConsoleLogger();
            this._s = new States(this);
            this._d = DirectorFactory.c(this);
            this._fr = false;
            this._fp = this._d.gD();
            this._fv = 1;
            this._fa = this._e.gA();
            this._d.a(this._fa);
            this.addEventListener<Episode>('ready', () => {
                this._d.t(this._e.gT());
                this._fr = true;
                if (this._fp) {
                    this._fp = false;
                    this.play();
                }
            });
            this.addEventListener<Episode>('begin', () => {
                this._e.p(Tag.IScene.Type.Begin, this);
            });
            this.addEventListener<Episode>('end', () => {
                this._fp = false;
            });
        }

        /**
         * 新增事件监听。
         */
        addEventListener<T>(type: string, listener: Core.IEventListener<T>): Runtime {
            this._a[type] = this._a[type] || [];
            if (!Util.some(this._a[type], (reged) => reged == listener))
                this._a[type].push(listener);
            return this;
        }

        /**
         * 取消事件监听。
         */
        removeEventListener<T>(type: string, listener: Core.IEventListener<T>): Runtime {
            if (!(type in this._a))
                return this;
            Util.some(this._a[type], (reged, index) => {
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
        dispatchEvent<T>(event: Core.Event<T>): Runtime {
            var type = event.gT();
            if (!(type in this._a))
                return this;
            Util.each(<Core.IEventListener<T>[]> this._a[type], (listener) => {
                listener(event);
            });
            return this;
        }

        /**
         * 获取作品组件。
         */
        gE(): Episode {
            return this._e;
        }

        /**
         * 获取日志组件。
         */
        gL(): ConsoleLogger {
            return this._l;
        }

        /**
         * 获取数据状态组件。
         */
        gS(): States {
            return this._s;
        }

        /**
         * 获取场效调度器组件。
         */
        gD(): Director {
            return this._d;
        }

        /**
         * 播放。
         */
        play(): Runtime {
            if (this._fp)
                return this;
            this._fp = true;
            if (!this._fr)
                return this;
            this._s.i({});
            this._d.OP(!this._e.gA());
            return this;
        }

        /**
         * 重新播放。
         */
        replay(): Runtime {
            return this.play();
        }

        /**
         * 销毁。
         */
        destroy(): void {
        }

        /**
         * DOM 定位修正。
         */
        fix(): void {
        }

        /**
         * 设置或获取自动播放设置。
         */
        auto(auto?: boolean): boolean {
            if (undefined !== auto)
                this._d.a(this._fa = !!auto);
            return this._fa;
        }

        /**
         * 设置或获取音量。
         */
        volume(volume?: number): number {
            if (undefined !== volume)
                this._d.v(this._fv = Math.min(1, Math.max(0, parseFloat(<any> volume))));
            return this._fv;
        }
    }
}
