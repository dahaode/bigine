/**
 * 定义画面调度作者信息组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Sprite/Author.ts
 */

/// <reference path="Sprite.ts" />

namespace Sprite {
    import Util = __Bigine_Util;
    import G = __Bigine_C2D;

    export class Author extends Sprite {
        /**
         * 名称对象。
         */
        private _x: G.TextPhrase;

        /**
         * 构造函数。
         */
        constructor(theme: Util.IHashTable<Util.IHashTable<any>>) {
            let w: number = 1280,
                h: number = 720,
                _director: Util.IHashTable<any> = theme['director'],
                _title: Util.IHashTable<any> = theme['title'];
            super(0, 0, w, h);
            (<Author> this.o(0))
                .a(new G.Color(0, 0, w, h, '#000'))
                .a(new G.Text(<G.IBounds> _director, _director['s'], _director['h'], this.$a(_director['a']))
                    .tc(_director['c'])
                    .a(new G.TextPhrase('作品'))
                ).a(new G.Text(<G.IBounds> _title, _title['s'], _title['h'], this.$a(_title['a']))
                    .tc(_title['c'])
                    .a(this._x = new G.TextPhrase())
                );
        }

        /**
         * 设置名称。
         */
        public u(title: string): Author {
            this._x.t(title);
            return this;
        }
    }
}
