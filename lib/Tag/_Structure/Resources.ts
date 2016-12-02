/**
 * 定义主题包标签组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_Structure/Resources.ts
 */

/// <reference path="../../../include/tsd.d.ts" />
/// <reference path="../Unknown.ts" />
/// <reference path="../_Definition/_Room/DefRoom.ts" />
/// <reference path="../_Definition/_Char/DefChar.ts" />
/// <reference path="../_Definition/DefBGM.ts" />
/// <reference path="../_Definition/DefCG.ts" />
/// <reference path="../_Definition/DefSE.ts" />

namespace Tag {
    import Util = __Bigine_Util;

    export class Resources extends Unknown {
        /**
         * 获取标签名称。
         */
        public gN(): string {
            return 'Resources';
        }

        /**
         * 加载远端数据。
         */
        public l(callback: Util.ISuccessCallback<Util.IHashTable<Core.IEntityTag>>): void {
            if (Bigine.offline) {
                let xhr: XMLHttpRequest = new XMLHttpRequest();
                xhr.onload = () => {
                    callback(this.ls(JSON.parse(xhr.responseText)));
                };
                try {
                    xhr.open('get', 'res/res.json', true);
                    //xhr.open('get', '/Users/atfacg-dev/temp/res/res.json', true);
                    xhr.send();
                } catch (ex) {
                    throw ex.message;
                }
            } else {
                Util.Remote.post<Util.IHashTable<Util.IHashTable<any>>>('//api.dahao.de/resource/' + this._c + '/', {}, (data: Util.IHashTable<Util.IHashTable<Util.IHashTable<any>>>) => {
                    callback(this.ls(data));
                }, (error: Error, status?: any) => {
                    throw error;
                });
            }
        }

        private ls(data: Util.IHashTable<Util.IHashTable<Util.IHashTable<any>>>): Util.IHashTable<Util.IHashTable<Core.IEntityTag>> {
            var ret: Util.IHashTable<Util.IHashTable<Core.IEntityTag>> = {};
            ret['rooms'] = {};
            Util.each(data['rooms'] || {}, (room: Util.IHashTable<any>, index: string) => {
                var times: Unknown[] = [];
                Util.each(<Util.IHashTable<string>> room['snaps'] || {}, (id: string, title: string) => {
                    times.push(new Unknown([title], id, [], -1));
                });
                if (times.length == 0) {
                    times.push(new Unknown(['默认'], '00000000-0000-0000-0000-000000000000', [], -1));
                }
                ret['rooms'][index] = new DefRoom([], <string> room['title'], [
                    new Times([], '', times, -1)
                ], -1);
            });
            ret['chars'] = {};
            Util.each(data['chars'] || {}, (chr: Util.IHashTable<any>, index: string) => {
                var poses: Unknown[] = [];
                Util.each(<Util.IHashTable<string>> chr['poses'] || {}, (id: string, title: string) => {
                    poses.push(new Unknown([title], id, [], -1));
                });
                if (poses.length == 0) {
                    poses.push(new Unknown(['默认'], '00000000-0000-0000-0000-000000000002', [], -1));
                }
                ret['chars'][index] = new DefChar([], <string> chr['title'], [
                    new Avatar([], <string> (chr['avatar'] || '00000000-0000-0000-0000-000000000001') , [], -1),
                    new Poses([], '', poses, -1)
                ], -1);
            });
            ret['maps'] = {};
            Util.each(data['maps'] || {}, (map: Util.IHashTable<any>, index: string) => {
                var children: Unknown[] = [
                    new BGImage([], <string> map['base'], [], -1)
                ];
                Util.each(<Util.IHashTable<Util.IHashTable<any>>> map['points'] || {}, (point: Util.IHashTable<any>) => {
                    var region: { top: number; right: number; bottom: number; left: number } = point['region'],
                        regstr: string = region.top + '，' + region.right + '，' + region.bottom + '，' + region.left;
                    if ('priority' in point)
                        regstr += '，' + point['priority'];
                    children.push(new Point([], <string> point['title'], [
                        new HLImage([], <string> point['hilite'], [], -1),
                        new Region([], regstr, [], -1)
                    ], -1));
                });
                if (children.length == 1) {
                    children.push(new Point([], '默认', [
                        new HLImage([], '00000000-0000-0000-0000-000000000003', [], -1),
                        new Region([], '0，0，1080，1920，0', [], -1)
                    ], -1));
                }
                ret['maps'][index] = new DefMap([], <string> map['title'], children, -1);
            });
            ret['bgms'] = {};
            Util.each(data['bgms'] || {}, (bgm: Util.IHashTable<any>, index: string) => {
                ret['bgms'][index] = new DefBGM([], <string> bgm['title'], [
                    new Audio([], <string> bgm['audio'], [], -1)
                ], -1);
            });
            ret['cgs'] = {};
            Util.each(data['cgs'] || {}, (cg: Util.IHashTable<any>, index: string) => {
                ret['cgs'][index] = new DefCG([], <string> cg['title'], [
                    new Image([], <string> cg['image'], [], -1)
                ], -1);
            });
            ret['ses'] = {};
            Util.each(data['ses'] || {}, (se: Util.IHashTable<any>, index: string) => {
                ret['ses'][index] = new DefSE([], <string> se['title'], [
                    new Audio([], <string> se['audio'], [], -1)
                ], -1);
            });
            ret = this.ll(ret);
            return ret;
        }
        /**
         * 加载默认数据。
         */
        private ll(ret: Util.IHashTable<Util.IHashTable<Core.IEntityTag>>): Util.IHashTable<Util.IHashTable<Core.IEntityTag>> {
            ret['rooms']['00000000-0000-0000-0000-000000000000'] = new DefRoom([], ' ', [
                new Times([], '', [
                    new Unknown(['默认'], '00000000-0000-0000-0000-000000000000', [], -1)
                ], -1)], -1);
            ret['chars']['00000000-0000-0000-0000-000000000001'] = new DefChar([], ' ', [
                new Avatar([], '00000000-0000-0000-0000-000000000001', [], -1),
                new Poses([], '', [new Unknown(['默认'], '00000000-0000-0000-0000-000000000002', [], -1)], -1)
            ], -1);
            return ret;
        }
    }
}
