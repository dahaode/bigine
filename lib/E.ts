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
     * 构造函数。
     */
    constructor(message: string, lineNo?: number) {
        if (Error['captureStackTrace'])
            Error['captureStackTrace'](this, E);
        if (lineNo)
            message = '第 ' + lineNo + ' 行' + message;
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
}
