/**
 * 定义（运行时）剧情事件播报事件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Runtime/Event/Scene.ts
 */

/// <reference path="Event.ts" />
/// <reference path="ISceneMetas.ts" />

namespace Runtime {
    'use strict';

    export namespace Event {
        export class Scene extends Event<Core.ISceneTag> {
            /**
             * 编号。
             */
            public id: string;

            /**
             * 标题。
             */
            public title: string;

            /**
             * 动作编号集合。
             */
            public actions: string[];

            /**
             * 构造函数。
             */
            constructor(metas: ISceneMetas) {
                super(metas);
                this.id = metas.target.gI();
                this.title = metas.title;
                this.actions = metas.actions;
            }

            /**
             * 获取类型。
             */
            public gT(): string {
                return 'scene';
            }
        }
    }
}
