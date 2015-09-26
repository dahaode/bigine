/**
 * 定义（作品事件）类型标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Structure/_Scene/Type.ts
 */

/// <reference path="../../Unknown.ts" />
/// <reference path="../../_Definition/_Room/DefRoom.ts" />

namespace Tag {
    export class Type extends Unknown {
        /**
         * 类型。
         */
        private _t: Core.ISceneTag.Type;

        /**
         * 关联对象。
         */
        private _o: string | DefRoom;

        /**
         * 构造函数。
         */
        constructor(params: string[], content: string, children: Unknown[], lineNo?: number) {
            super(params, content, children, lineNo);
            var match: RegExpMatchArray = content.match(/^(进入|离开)（(.+)）(前|后)$/),
                term: string | Core.ISceneTag.Type = content,
                type: typeof Core.ISceneTag.Type = Core.ISceneTag.Type;
            if (match) {
                this._o = match[2];
                term = match[1] + '房间' + match[3];
            } else {
                match = content.match(/^(([012])|([3-6])(.+))$/);
                if (match) {
                    this._o = match[4];
                    term = <any> (match[2] || match[3]) - 0;
                }
            }
            switch (term) {
                case '开始时':
                case type.Begin:
                    this._t = type.Begin;
                    break;
                case '完结时':
                case type.End:
                    this._t = type.End;
                    break;
                case '失败时':
                case type.Fail:
                    this._t = type.Fail;
                    break;
                case '离开房间前':
                case type.PreLeave:
                    this._t = type.PreLeave;
                    break;
                case '进入房间前':
                case type.PreEnter:
                    this._t = type.PreEnter;
                    break;
                case '离开房间后':
                case type.PostLeave:
                    this._t = type.PostLeave;
                    break;
                case '进入房间后':
                case type.PostEnter:
                    this._t = type.PostEnter;
                    break;
                default:
                    throw new E(E.SCENE_TYPE_UNKNOWN, lineNo);
            }
            this._c = <number> this._t + (<string> this._o || '');
        }

        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Type';
        }

        /**
         * 绑定（运行时）作品（实体）。
         */
        public $b(ep: Core.IEpisode): void {
            if (this._o)
                this._o = <DefRoom> ep.q(<string> this._o, Core.IEpisode.Entity.Room);
        }

        /**
         * 获取类型。
         */
        public gT(): Core.ISceneTag.Type {
            return this._t;
        }

        /**
         * 获取关联对象。
         */
        public gR(): DefRoom {
            if (!this._b)
                throw new E(E.DEF_EPISODE_NOT_BINDED, this._l);
            return <DefRoom> this._o;
        }
    }
}
