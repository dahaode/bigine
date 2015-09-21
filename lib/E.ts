/**
 * 定义引擎异常。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      E.ts
 */

class E extends Error {
    public static SCHEMA_TAG_NOT_DECLARED: string = '标签尚未声明语法规则';

    public static SCHEMA_CHILD_NOT_ALLOWED: string = '上级标签不支持此子标签';

    public static LEX_ILLEGAL_SOURCE: string = '语法格式错误';

    public static LEX_UNEXPECTED_INDENTATION: string = '缩进深度错误';

    public static TAG_PARAMS_TOO_FEW: string = '标签参数个数不满足最低要求';

    public static TAG_PARAMS_TOO_MANY: string = '标签参数个数超过最大限制';

    public static TAG_CONTENT_FORBIDEN: string = '标签不接受内容';

    public static TAG_CONTENT_REQUIRED: string = '标签内容缺失';

    public static TAG_CHILDREN_TOO_FEW: string = '子标签数量不满足最低要求';

    public static TAG_CHILDREN_TOO_MANY: string = '子标签数量超过最大限制';

    public static DEF_CHAR_AVATAR_NOT_FOUND: string = '头像标签缺失';

    public static DEF_CHAR_POSES_NOT_FOUND: string = '姿态标签未定义';

    public static DEF_EPISODE_NOT_REGISTERED: string = '关联实体尚未注册';

    public static DEF_EPISODE_NOT_BINDED: string = '关联实体尚未绑定';

    public static DEF_ROOM_EMPTY: string = '使用地图标签和时刻标签均未定义';

    public static DEF_MAP_REGION_BROKEN: string = '区域定义信息出错';

    public static DEF_MAP_BGIMAGE_NOT_FOUND: string = '底图标签缺失';

    public static DEF_MAP_HLIMAGE_NOT_FOUND: string = '高亮图标签缺失';

    public static DEF_MAP_REGION_NOT_FOUND: string = '区域标签缺失';

    public static DEF_MAP_TARGET_NOT_FOUND: string = '对应房间标签缺失';

    public static DEF_MAP_POINT_NOT_FOUND: string = '继承交互点未定义';

    public static SCENE_TYPE_UNKNOWN: string = '无效的事件类型';

    public static ROOT_NOT_PARENT: string = '根标签没有父标签';

    public static ACT_ILLEGAL_POSITION: string = '无效地人物站位';

    public static ACT_CHAR_NOT_ON: string = '人物并不在场';

    public static ACT_CHAR_ONSTAGE: string = '人物已在场';

    public static ACT_ILLEGAL_STARS: string = '无效地评分星级';

    public static ACT_CG_NOT_SHOWN: string = '并未展示任何特写';

    public static ACT_CG_ALREADY_SHOWN: string = '正在展示另一特写';

    public static ACT_ILLEGAL_OP: string = '无效的比较符';

    public static ACT_STATE_NOT_NUMERIC: string = '状态数据不是数值';

    public static ACT_DELTA_NOT_NUMERIC: string = '状态增量不是数值';

    public static ACT_OPTION_CAST_FAILURE: string = '无法转化为选项';

    public static RES_INVALID_URI: string = '无效的资源地址';

    public static ENV_NOT_AVAILABLE: string = '环境不满足播放条件';

    public static EP_ENTITY_NOT_FOUND: string = '实体不存在';

    public static EP_THEME_NOT_LOADED: string = '主题数据尚未加载完成';

    public static G_PARENT_NOT_FOUND: string = '画面父元素未绑定';

    public static G_INVALID_OPACITY: string = '无效的透明度值';

    /**
     * 信号。
     */
    public signal: E.Signal;

    /**
     * 构造函数。
     */
    constructor(message: string, lineNo?: number) {
        if ('captureStackTrace' in Error)
            Error['captureStackTrace'](this, E);
        this.signal = (lineNo in E.Signal) ?
            lineNo :
            E.Signal.OK;
        if (0 < lineNo)
            message = '第 ' + lineNo + ' 行' + message;
        super();
        this.name = 'BigineError';
        this.message = message;
    }
}

namespace E {
    'use strict';

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
