/**
 * 定义引擎异常。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      E.ts
 */

class E extends Error {
    /**
     * 信号。
     */
    signal: E.Signal;

    /**
     * 构造函数。
     */
    constructor(message: string, lineNo?: number) {
        if ('captureStackTrace' in Error)
            Error['captureStackTrace'](this, E);
        if (lineNo in E.Signal)
            this.signal = lineNo;
        else {
            this.signal = E.Signal.OK;
            message = '第 ' + lineNo + ' 行' + message;
        }
        super(message);
        this.name = 'BigineError';
    }

    static SCHEMA_TAG_NOT_DECLARED = '标签尚未声明语法规则';

    static SCHEMA_CHILD_NOT_ALLOWED = '上级标签不支持此子标签';

    static TAG_PARAMS_TOO_FEW = '标签参数个数不满足最低要求';

    static TAG_PARAMS_TOO_MANY = '标签参数个数超过最大限制';

    static TAG_CONTENT_FORBIDEN = '标签不接受内容';

    static TAG_CONTENT_REQUIRED = '标签内容缺失';

    static TAG_CHILDREN_TOO_FEW = '子标签数量不满足最低要求';

    static TAG_CHILDREN_TOO_MANY = '子标签数量超过最大限制';

    static DEF_CHAR_AVATAR_NOT_FOUND = '头像标签缺失';

    static DEF_CHAR_POSES_NOT_FOUND = '姿态标签未定义';

    static DEF_EPISODE_NOT_REGISTERED = '关联实体尚未注册';

    static DEF_EPISODE_NOT_BINDED = '关联实体尚未绑定';

    static DEF_ROOM_EMPTY = '使用地图标签和时刻标签均未定义';

    static DEF_MAP_REGION_BROKEN = '区域定义信息出错';

    static DEF_MAP_BGIMAGE_NOT_FOUND = '底图标签缺失';

    static DEF_MAP_HLIMAGE_NOT_FOUND = '高亮图标签缺失';

    static DEF_MAP_REGION_NOT_FOUND = '区域标签缺失';

    static DEF_MAP_TARGET_NOT_FOUND = '对应房间标签缺失';

    static DEF_MAP_POINT_NOT_FOUND = '继承交互点未定义';

    static SCENE_TYPE_UNKNOWN = '无效的事件类型';

    static ROOT_NOT_PARENT = '根标签没有父标签';

    static ACT_ILLEGAL_POSITION = '无效地人物站位';

    static ACT_CHAR_NOT_ON = '人物并不在场';

    static ACT_CHAR_ONSTAGE = '人物已在场';

    static ACT_ILLEGAL_STARS = '无效地评分星级';

    static ACT_CG_NOT_SHOWN = '并未展示任何特写';

    static ACT_CG_ALREADY_SHOWN = '正在展示另一特写';
}

module E {
    export enum Signal {
        /**
         * 中断循环。
         */
        BREAK = -2,
        /**
         * 中断时序播放。
         */
        HALT = -1,
        /**
         * 正常。
         */
        OK
    }
}
