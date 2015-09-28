/**
 * 定义人物（定义）标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Definition/_Char/DefChar.ts
 */

/// <reference path="../../Entity.ts" />
/// <reference path="Avatar.ts" />
/// <reference path="Poses.ts" />

namespace Tag {
    export class DefChar extends Entity {
        /**
         * 原型。
         */
        private _o: DefChar;

        /**
         * 构造函数。
         */
        constructor(params: string[], content: string, children: Unknown[], lineNo?: number) {
            super(params, content, children, lineNo);
            if (!this.$q('Avatar').length && !params.length)
                throw new E(E.DEF_CHAR_AVATAR_NOT_FOUND, lineNo);
        }

        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'DefChar';
        }

        /**
         * 绑定（运行时）作品（实体）。
         */
        public $b(ep: Core.IEpisode): void {
            if (this._p[0])
                this._o = <DefChar> ep.q(this._p[0], Core.IEpisode.Entity.Chr, this._l);
        }

        /**
         * 获取类型。
         */
        public gT(): Core.IEpisode.Entity {
            return Core.IEpisode.Entity.Chr;
        }

        /**
         * 获取资源。
         */
        public o(id?: string): Core.IResource<HTMLImageElement> {
            var q: Unknown[] = this.$q(id ? 'Poses' : 'Avatar');
            if (!q.length) {
                if (!this._b)
                    throw new E(E.DEF_EPISODE_NOT_BINDED, this._l);
                if (this._o) {
                    return this._o.o(id);
                } else
                    throw new E(E.DEF_CHAR_POSES_NOT_FOUND, this._l);
            }
            return (<Poses> q[0]).o(id);
        }

        /**
         * 获取所有关联资源。
         */
        public d(): Core.IResource<HTMLImageElement>[] {
            var ret: Core.IResource<HTMLImageElement>[] = (<Poses> this.$q('Poses')[0]).d();
            ret.unshift((<Avatar> this.$q('Avatar')[0]).o());
            return ret;
        }
    }
}
