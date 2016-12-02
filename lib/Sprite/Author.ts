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

        protected pI(): Author {
            if (this._pi) return this;
            let _director: Util.IHashTable<any> = this._tm['director'],
                _title: Util.IHashTable<any> = this._tm['title'];
            (<Author> this.o(0))
                .a(new G.Color(0, 0, 1280, 720, '#000'))
                .a(new G.Text(<G.IBounds> _director, _director['ff'], _director['s'], _director['h'], this.$a(_director['a']))
                    .tc(_director['c'])
                    .a(new G.TextPhrase('作品'))
                ).a(new G.Text(<G.IBounds> _title, _title['ff'], _title['s'], _title['h'], this.$a(_title['a']))
                    .tc(_title['c'])
                    .a(this._x = new G.TextPhrase())
                );
            return <Author> super.pI();
        }

        /**
         * 设置名称。
         */
        public u(title: string): Author {
            this.pI();
            if (!/^[\d0-f]{8}-[\d0-f]{4}-[\d0-f]{4}-[\d0-f]{4}-[\d0-f]{12}$/i.test(title)) {
                this._x.t(title);
            } else {
                let res: Resource.Resource<HTMLImageElement> = Resource.Resource.g<HTMLImageElement>(title, Core.IResource.Type.Room);
                this.a(new G.Image(res.o(), { x: 0, y: 0, w: 1280, h: 720 }));
            }
            return this;
        }
    }
}
