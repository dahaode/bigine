/**
 * 定义主题包标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Structure/Resources.ts
 */

/// <reference path="../Unknown.ts" />
/// <reference path="../../Util/_Remote/Remote.ts" />
/// <reference path="../_Definition/_Room/DefRoom.ts" />
/// <reference path="../_Definition/_Char/DefChar.ts" />
/// <reference path="../_Definition/DefBGM.ts" />
/// <reference path="../_Definition/DefCG.ts" />
/// <reference path="../_Definition/DefSE.ts" />

module Tag {
    export class Resources extends Unknown {
        /**
         * 获取标签名称。
         */
        gN(): string {
            return 'Resources';
        }

        /**
         * 加载远端数据。
         */
        l(callback: Util.ISuccessCallback<IEntity>): void {
            Util.Remote.post<Util.IHashTable<Util.IHashTable<any>>>('//api.dahao.de/resource/' + this._c + '/', {}, (data) => {
                var ret: Util.IHashTable<IEntity> = {};
                Util.each(data['rooms'] || {}, (room, index) => {
                    var times: Unknown[] = [];
                    Util.each(<Util.IHashTable<string>> room['snaps'] || {}, (id, title) => {
                        times.push(new Unknown([title], id, [], -1));
                    });
                    ret[index] = new DefRoom([], <string> room['title'], [
                        new Times([], '', times, -1)
                    ], -1);
                });
                Util.each(data['chars'] || {}, (chr, index) => {
                    var poses: Unknown[] = [];
                    Util.each(<Util.IHashTable<string>> chr['poses'] || {}, (id, title) => {
                        poses.push(new Unknown([title], id, [], -1));
                    });
                    ret[index] = new DefChar([], <string> chr['title'], [
                        new Avatar([], <string> chr['avatar'], [], -1),
                        new Poses([], '', poses, -1)
                    ], -1);
                });
                Util.each(data['maps'] || {}, (map, index) => {
                    var children: Unknown[] = [
                        new BGImage([], <string> map['base'], [], -1)
                    ];
                    Util.each(<Util.IHashTable<Util.IHashTable<any>>> map['points'] || {}, (point, index) => {
                        var region = <{top: number, right: number, bottom: number, left: number}> point['region'],
                            regstr = region.top + '，' + region.right + '，' + region.bottom + '，' + region.left;
                        if ('priority' in point)
                            regstr += '，' + point['priority'];
                        children.push(new Point([], <string> point['title'], [
                            new HLImage([], <string> point['hilite'], [], -1),
                            new Region([], regstr, [], -1)
                        ], -1));
                    });
                    ret[index] = new DefMap([], <string> map['title'], children, -1);
                });
                Util.each(data['bgms'] || {}, (bgm, index) => {
                    ret[index] = new DefBGM([], <string> bgm['title'], [
                        new Audio([], <string> bgm['audio'], [], -1)
                    ], -1);
                });
                Util.each(data['cgs'] || {}, (cg, index) => {
                    ret[index] = new DefCG([], <string> cg['title'], [
                        new Image([], <string> cg['image'], [], -1)
                    ], -1);
                });
                Util.each(data['ses'] || {}, (se, index) => {
                    ret[index] = new DefSE([], <string> se['title'], [
                        new Audio([], <string> se['audio'], [], -1)
                    ], -1);
                });
                callback(ret);
            }, (error, status?) => {
                throw error;
            });
        }
    }
}
