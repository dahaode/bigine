/**
 * 定义人物（定义）标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Definition/_Char/DefChar.ts
 */

/// <reference path="../Entity.ts" />
/// <reference path="Avatar.ts" />
/// <reference path="Poses.ts" />

module Tag {
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
        gN(): string {
            return 'DefChar';
        }

        /**
         * 绑定（运行时）作品（实体）。
         */
        $b(ep: Runtime.IEpisode): void {
            if (this._p[0])
                this._o = <DefChar> ep.q(this._p[0], Core.IEpisode.Entity.Chr);
        }

        /**
         * 获取类型。
         */
        gT(): Core.IEpisode.Entity {
            return Core.IEpisode.Entity.Chr;
        }

        /**
         * 获取资源。
         */
        o(id?: string): Runtime.IResource {
            var q = this.$q(id ? 'Poses' : 'Avatar');
            if (!q.length) {
                if (!this._b)
                    throw new E(E.DEF_EPISODE_NOT_BINDED, this._l);
                if (this._o)
                    return this._o.o(id);
                else
                    throw new E(E.DEF_CHAR_POSES_NOT_FOUND, this._l);
            }
            return (<Poses> q[0]).o(id);
        }

        /**
         * 获取所有关联资源。
         */
        d(): Runtime.IResource[] {
            var ret = (<Poses> this.$q('Poses')[0]).d();
            ret.unshift((<Avatar> this.$q('Avatar')[0]).o());
            return ret;
        }
    }
}
