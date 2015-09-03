/**
 * 定义人物（定义）标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Definition/_Char/DefChar.ts
 */

/// <reference path="../../Unknown.ts" />
/// <reference path="../IEntity.ts" />
/// <reference path="Avatar.ts" />
/// <reference path="Poses.ts" />

module Tag {
    export class DefChar extends Unknown implements IEntity {
        /**
         * 原型。
         */
        private _o: DefChar;

        /**
         * 构造函数。
         */
        constructor(params: string[], content: string, children: Unknown[], lineNo?: number) {
            super(params, content, children, lineNo);
            if (!this.$q(SCHEMA.T['Avatar']).length && !params.length)
                throw new E(E.DEF_CHAR_AVATAR_NOT_FOUND, lineNo);
        }

        /**
         * 获取标签名称。
         */
        gN(): string {
            return SCHEMA.T['DefChar'];
        }

        /**
         * 注册（自身实体）至（运行时）作品。
         */
        $r(ep: Runtime.IEpisode): void {
            ep.f(this);
        }

        /**
         * 绑定（运行时）作品（实体）。
         */
        $b(ep: Runtime.IEpisode): void {
            if (this._p[0])
                this._o = <DefChar> ep.q(this._p[0], Core.IEpisode.Entity.Chr);
        }

        /**
         * 获取唯一编号。
         */
        gI(): string {
            return this._c;
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
            var q = this.$q(SCHEMA.T[id ? 'Poses' : 'Avatar']);
            if (!q.length)
                if (this._o)
                    return this._o.o(id);
                else
                    throw new E(E.DEF_CHAR_POSES_NOT_FOUND, this._l);
            return (<Poses> q[0]).o(id);
        }
    }
}
