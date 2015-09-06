/**
 * 定义（作品事件）类型标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Structure/_Scene/Type.ts
 */

/// <reference path="../../Unknown.ts" />
/// <reference path="../../IScene.ts" />
/// <reference path="../../_Definition/_Room/DefRoom.ts" />

module Tag {
    export class Type extends Unknown {
        /**
         * 类型。
         */
        private _t: IScene.Type;

        /**
         * 关联对象。
         */
        private _o: string | DefRoom;

        /**
         * 构造函数。
         */
        constructor(params: string[], content: string, children: Unknown[], lineNo?: number) {
            super(params, content, children, lineNo);
            var match = content.match(/^(进入|离开)（(.+)）(前|后)$/),
                term = content;
            if (match) {
                this._o = match[2];
                term = match[1] + '房间' + match[3];
            }
            switch (term) {
                case '开始时':
                    this._t = IScene.Type.Start;
                    break;
                case '完结时':
                    this._t = IScene.Type.End;
                    break;
                case '失败时':
                    this._t = IScene.Type.Fail;
                    break;
                case '离开房间前':
                    this._t = IScene.Type.PreLeave;
                    break;
                case '进入房间前':
                    this._t = IScene.Type.PreEnter;
                    break;
                case '离开房间后':
                    this._t = IScene.Type.PostLeave;
                    break;
                case '进入房间后':
                    this._t = IScene.Type.PostEnter;
                    break;
                default:
                    throw new E(E.SCENE_TYPE_UNKNOWN, lineNo);
            }
        }

        /**
         * 获取标签名称。
         */
        gN(): string {
            return 'Type';
        }

        /**
         * 绑定（运行时）作品（实体）。
         */
        $b(ep: Runtime.IEpisode): void {
            if (this._o)
                this._o = <DefRoom> ep.q(<string> this._o, Core.IEpisode.Entity.Room);
        }

        /**
         * 获取类型。
         */
        gT(): IScene.Type {
            return this._t;
        }

        /**
         * 获取关联对象。
         */
        gR(): DefRoom {
            if (!this._b)
                throw new E(E.DEF_EPISODE_NOT_BINDED, this._l);
            return <DefRoom> this._o;
        }
    }
}
