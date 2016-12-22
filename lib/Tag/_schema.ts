/**
 * 定义语法规约。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Tag/_schema.ts
 */

namespace Tag {
    /**
     * 类到标签映射。
     */
    export var T: { [name: string]: string } = {
        Unknown: 'UNKNOWN',
        Root: 'ROOT',

        DefBGM: '音乐',
        Audio: '音源',
        Image: '画面',
        DefCG: '特写',
        DefChar: '人物',
        Avatar: '头像',
        Poses: '姿态',
        DefMap: '地图',
        BGImage: '底图',
        Point: '交互点',
        HLImage: '高亮',
        Region: '区域',
        Target: '对应房间',
        DefRoom: '房间',
        Link: '使用地图',
        Times: '时刻',
        DefSE: '音效',
        DefWeather: '天气',

        Struct: '结构',
        Field: '字段',
        FieldType: '类别',
        FieldLimit: '上限',

        Auto: '自动播放',
        Player: '主角',
        Resources: '素材包',
        Theme: '主题',
        Status: '状态',
        Panel: '面板',
        SimpPanel: '简单面板',
        SimpEle: '条目',
        EleName: '数据名',
        EleType: '数据类别',
        CollPanel: '集合面板',
        CollSource: '使用集合',
        CollStruct: '集合结构',

        Scene: '事件',
        Type: '类型',
        Conditions: '条件',
        Content: '内容',

        CharOn: '人物出场',
        CharOff: '人物离场',
        CharSet: '设置人物',
        CharPose: '改变神态',
        CharMove: '人物移动',

        CameraSet: '设置镜头',
        CameraZoom: '放大镜头',
        CameraReset: '复位镜头',
        CameraMove: '移动镜头',
        CameraShake: '抖动镜头',

        Monolog: '独白',
        Speak: '对白',
        Tip: '提示',
        VoiceOver: '旁白',
        FullWords: '全屏文本',
        FullClean: '清除文本',
        FullHide: '隐藏文本',

        Save: '自动存档',
        End: '游戏完结',
        Fin: '作品完结',
        Fail: '游戏失败',
        Lose: '作品失败',
        Stars: '评分',

        PlayBGM: '播放音乐',
        HideCG: '关闭特写',
        ShowCG: '展示特写',
        AsRoom: '设置房间',
        Freeze: '移动中止',
        AsTime: '设置时间',
        Enter: '进入房间',
        PlaySE: '播放音效',
        Weather: '设置天气',
        StopBGM: '停止音乐',
        Pause: '停顿',
        Curtains: '切幕动画',
        Expression: '神态动画',
        ShowStatus: '显示状态栏',
        HideStatus: '隐藏状态栏',
        PlayESM: '环境音乐',
        StopESM: '环境静音',
        StopSE: '停止音效',
        VolumeSet: '设置音量',
        Review: '显示回看',

        Assert: '当数据',
        Assign: '设置数据',
        Compare: '对比数据',
        Increase: '增加数据',
        LoopBreak: '循环中止',
        Maximum: '最大数据',
        Minimum: '最小数据',
        Choose: '选择',
        Random: '随机数据',
        IfTime: '当时间',
        Copy: '复制数据',
        Add: '数据合值',
        Subtract: '数据差值',
        Product: '数据倍值',
        Define: '定义数据',
        Collection: '定义集合',
        CollPop: '删除元素',
        CollPush: '增加元素',
        Donate: '打赏',
        Unlock: '解锁',

        DefOptions: '定义选择',
        AddOption: '添加选项',
        DropOption: '去除选项',
        Option: '选项',

        And: '且',
        Or: '或',
        Otherwise: '否则',
        Then: '那么',
        When: '如果',
        Loop: '循环',
        WhenVar: '如果数据'
    };

    /**
     * 语法规则。
     *
     * {
     *     [index: number]: {
     *         name: string,
     *         params: number[], // [最小量, 最大量]
     *         content: number // -1 禁止，0 可选，1 必须,
     *         children: {
     *             [index: number]: number[] // [最小量, 最大量]
     *         }
     *     }
     * }
     */
    export var S: { [index: number]: any[] } = { // next 114
        '-1': ['Root', 0, -1, {
            54: [0, 1],
            113: [0, 1],
            55: [0, 1],
            56: 1,
            57: 1,
            73: [0, 1],
            74: [0, 1],
            76: [0],
            49: [1],
            33: [0],
            34: [0],
            35: [0],
            38: [0],
            44: [0],
            47: [0],
            48: [0]
        }],

        54: ['Auto', 0, -1],
        55: ['Player', 0, 1], // 人物名
        56: ['Resources', 0, 1], // 素材包名
        57: ['Theme', 0, 1], // 主题名
        73: ['Status', 0, -1, {
            53: [0, 6]
        }],
        74: ['Panel', 0, -1, {
            84: [0],
            88: [0]
        }],
        84: ['SimpPanel', 0, 1, { // 面板名
            85: [1]
        }],
        85: ['SimpEle', 0, 1, { // 条目名
            86: 1,
            87: [0, 1]
        }],
        86: ['EleName', 0, 1], // 数据名
        87: ['EleType', 0, 1], // 数据类别
        88: ['CollPanel', 0, 1, { // 面板名
            89: 1,
            90: 1
        }],
        89: ['CollSource', 0, 1], // 集合名
        90: ['CollStruct', 0, 1], // 结构名

        49: ['Scene', 0, 1, { // 名称
            50: 1,
            51: [0, 1],
            52: 1
        }],
        50: ['Type', 0, 1], // 类型
        51: ['Conditions', 0, -1, {
            '-1': [0]
        }],
        52: ['Content', 0, -1, {
            '-1': [1]
        }],

        33: ['DefBGM', 0, 1, { // 名称
            32: 1
        }],
        32: ['Audio', 0, 1], // 资源编号

        34: ['DefCG', 0, 1, { // 名称
            31: 1
        }],
        31: ['Image', 0, 1], // 资源编号

        35: ['DefChar', [0, 1], 1, { // [原型人物名?], 名称
            36: [0, 1],
            37: [0, 1]
        }],
        36: ['Avatar', 0, 1], // 素材编号
        37: ['Poses', 0, -1, {
            53: [0]
        }],

        38: ['DefMap', [0, 1], 1, { // [原型地图名?], 名称
            39: [0, 1],
            40: [1]
        }],
        39: ['BGImage', 0, 1], // 素材编号
        40: ['Point', [0, 1], 1, { // [原型交互点名?], 名称
            41: [0, 1],
            42: [0, 1],
            43: [0, 1]
        }],
        41: ['HLImage', 0, 1], // 素材编号
        42: ['Region', 0, 1], // 上边距, 右边距, 下边距, 左边距, 深高?
        43: ['Target', 0, 1], // 房间名

        44: ['DefRoom', 0, 1, { // 名称
            45: [0, 1],
            46: [0, 1]
        }],
        45: ['Link', 0, 1], // 地图名
        46: ['Times', 0, -1, {
            53: [1]
        }],

        47: ['DefSE', 0, 1, { // 名称
            32: 1
        }],

        48: ['DefWeather', 0, 1], // 名称

        53: ['Unknown', [1, 2], 0], // [标签名称] 内容

        0: ['CharOn', [0, 1], 1], // [位置?] 人物名, 姿态?
        1: ['CharOff', 1, -1], // [人物名]
        2: ['CharSet', [0, 1], 1], // [位置?] 人物名, 姿态?
        3: ['CharPose', 1, 1], // [人物名] 姿态
        62: ['CharMove', 1, 1], // [人物] 新位置
        4: ['Monolog', 0, 1], // 文字
        5: ['Speak', [2, 3], 1], // [说话人物名, 对象人物名, 显示名称?] 文字
        6: ['Tip', 0, 1], // 文字
        7: ['VoiceOver', 0, 1], // 文字
        8: ['Save', [0, 1], -1], // [存档标题?]
        9: ['End', 0, -1],
        111: ['Fin', 0, -1],
        10: ['Fail', 0, -1],
        112: ['Lose', 0, -1],
        11: ['Stars', [1, 2], -1], // [星级, 数据值?]
        12: ['PlayBGM', [1, 2], -1], // [背景音乐名, 音量?]
        103: ['PlayESM', [1, 2], -1], // [环境音乐名, 音量?]
        64: ['StopBGM', 0, -1],
        104: ['StopESM', 0, -1],
        105: ['StopSE', 0, -1],
        13: ['HideCG', 0, -1],
        14: ['ShowCG', 1, -1], // [特写名]
        15: ['AsRoom', [1, 2], 0], // [房间名, 时间?]
        16: ['Freeze', 0, -1],
        17: ['AsTime', 1, -1], // [房间时刻名]
        18: ['Enter', 1, -1], // [房间名]
        19: ['PlaySE', [1, 2], -1], // [音效名, 音量?]
        20: ['Weather', 1, -1], // [天气名]
        91: ['Pause', [0, 1], -1], // [停顿时间：长、中、短]
        92: ['CameraSet', 0, 1],  // 镜头设置的位置
        93: ['CameraReset', [0, 1], -1], // [速度：快、中、慢]
        94: ['CameraZoom', [0, 1], 1],   // [速度：快、中、慢] 镜头放大到的位置
        95: ['CameraMove', [0, 1], 1],   // [速度：快、中、慢] 镜头移动到的位置
        96: ['Curtains', [0, 1], -1], // [切幕动画名称]
        97: ['CameraShake', 0, -1],
        100: ['ShowStatus', 0, -1],
        101: ['HideStatus', 0, -1],
        102: ['Expression', [0, 1], -1],   // [神态动画名称]
        106: ['VolumeSet', 2, -1],   // [设置音乐的类型, 大小] 
        107: ['FullWords', 1, -1],   // [开/关] 
        108: ['FullClean', 0, -1],
        109: ['FullHide', 0, -1],
        110: ['Unlock', 1, -1], // [萝卜币]
        113: ['Review', 0, -1],

        58: ['Loop', 0, -1, {
            '-1': [1]
        }],
        59: ['LoopBreak', 0, -1],

        25: ['Choose', [0, 3], 0, { // [变量名?, 时间?, 默认选择?] 选项名?
            53: [0],
            99: [0]
        }],
        65: ['DefOptions', 0, 1, { // 选项名
            53: [0],
            99: [0]
        }],
        66: ['AddOption', [2, 3], 0], // [选项名，值，金钱?] 描述?
        67: ['DropOption', 2, -1], // [选项名，值]
        99: ['Option', [1, 2], 0], // [选项名，值] 描述?

        23: ['Assign', 1, 1], // [变量名] 值
        30: ['Increase', 1, 1], // [变量名] 值
        68: ['Random', 1, -1], // [变量名]
        69: ['IfTime', 1, -1], // [时刻名]
        70: ['Copy', 2, -1], // [变量名, 源变量名]
        71: ['Add', 1, -1, { // [变量名]
            53: [1]
        }],
        72: ['Subtract', 2, -1, { // [变量名, 基数变量名]
            53: [1]
        }],
        75: ['Product', 1, -1, { // [变量名]
            53: [1]
        }],

        22: ['Assert', [2, 3], -1], // [变量名, 比较值, 操作符?]
        98: ['Donate', 1, -1], // [萝卜币]
        24: ['Compare', 1, -1], // [变量名]
        21: ['And', 0, -1, {
            '-1': [1]
        }],
        26: ['Or', 0, -1, {
            '-1': [1]
        }],
        60: ['Maximum', [0, 1], -1, { // [变量名]
            53: [1]
        }],
        61: ['Minimum', [0, 1], -1, { // [变量名]
            53: [1]
        }],

        28: ['Then', 0, -1, {
            '-1': [1]
        }],
        29: ['When', 1, -1, { // [比较值]
            '-1': [1]
        }],
        63: ['WhenVar', 1, -1, { // [比较数据]
            '-1': [1]
        }],
        27: ['Otherwise', 0, -1, {
            '-1': [1]
        }],

        76: ['Struct', 0, 1, { // 命名
            77: [1]
        }],
        77: ['Field', 0, 1, { // 命名
            78: [0, 1],
            79: [0, 1]
        }],
        78: ['FieldType', 0, 1], // 类别值
        79: ['FieldLimit', 0, 1], // 上限值
        80: ['Define', 1, 1, { // [结构名] 数据名
            53: [0]
        }],
        81: ['Collection', 1, 1, { // [结构名] 数据名
            53: [0]
        }],
        82: ['CollPush', 1, 1], // [集合名] 数据名
        83: ['CollPop', 1, 1] // [集合名] 数据名
    };
    var ii: any,
        jj: any;
    for (ii in S)
        if (S.hasOwnProperty(ii)) {
            if (!(S[ii][1] instanceof Array))
                S[ii][1] = [S[ii][1], S[ii][1]];
            if (S[ii][3])
                for (jj in S[ii][3])
                    if (!(S[ii][3][jj] instanceof Array))
                        S[ii][3][jj] = [S[ii][3][jj], S[ii][3][jj]];
        }

    /**
     * 标签到类映射。
     */
    export var C: { [tag: string]: string } = {
        游戏结束: 'End',
        当线索: 'Assert',
        设置线索: 'Assign',
        对比线索: 'Compare'
    };
    for (ii in T)
        if (T.hasOwnProperty(ii) && !(T[ii] in C))
            C[T[ii]] = ii;

    /**
     * 标签索引。
     */
    export var I: { [name: string]: number } = {};
    for (ii in S)
        if (S.hasOwnProperty(ii))
            I[S[ii][0]] = ii;
}
