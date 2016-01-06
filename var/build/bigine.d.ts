declare namespace __Bigine {
    import Util = __Bigine_Util;
    import G = __Bigine_C2D;
    namespace Runtime {
        namespace Event {
            class Event<T> implements Util.IEvent<T> {
                target: T;
                constructor(metas: Util.IEventMetas<T>);
                gT(): string;
            }
        }
    }
    namespace Core {
        interface ITag {
            gL(): number;
            gN(): string;
            r(ep: IEpisode): void;
            b(ep: IEpisode): void;
            toString(): string;
            toJsrn(): string;
            gU(): ITag;
        }
    }
    namespace Core {
        interface IIdableTag extends ITag {
            gI(): string;
            i(id: string): void;
        }
    }
    namespace Core {
        interface IEntityTag extends ITag {
            gI(): string;
            gT(): IEpisode.Entity;
        }
    }
    namespace Core {
        interface IRootTag extends ITag {
            a(): boolean;
            l(callback: Util.ISuccessCallback<Util.IHashTable<IEntityTag>>): boolean;
            gS(): string;
            t(callback: Util.ISuccessCallback<Util.IHashTable<any>>): void;
            gT(): string;
        }
    }
    namespace Core {
        interface IStates {
            s(key: string, value: any): IStates;
            g(key: string): any;
            d(key: string): IStates;
            a(key1: string, key2: string): boolean;
            c(src: string, dest: string): IStates;
            m(src: string, dest: string): IStates;
            t(text: string): string;
            p(): IStates;
            e(manual: boolean): Util.IHashTable<any>;
            i(data: Util.IHashTable<any>): IStates;
            q(index: string): [string, number];
            l(): void;
        }
    }
    namespace Core {
        interface IResource<T> {
            l(): string;
            o(): Promise<T>;
            w(callback: (value: T) => void): IResource<T>;
        }
        namespace IResource {
            enum Type {
                Room = 0,
                Map = 1,
                Pose = 2,
                Avatar = 3,
                CG = 4,
                BGM = 5,
                SE = 6,
                Raw = 7,
            }
        }
    }
    namespace Core {
        interface IMapTag extends IEntityTag {
            o(): IResource<HTMLImageElement>;
            gP(): Util.IHashTable<IPointTag>;
            gP(id: string): IPointTag;
        }
    }
    namespace Core {
        interface IRoomTag extends IEntityTag, ISceneHost {
            o(id?: string): IResource<HTMLImageElement>;
            gM(): IMapTag;
        }
    }
    namespace Core {
        interface IButtonable {
            p(runtime: IRuntime): void;
        }
    }
    namespace Core {
        interface IPointTag extends ITag, IButtonable {
            gI(): string;
            o(): IResource<HTMLImageElement>;
            gX(): number;
            gY(): number;
            gZ(): number;
            gW(): number;
            gH(): number;
            gR(): IRoomTag;
        }
    }
    namespace Core {
        interface IOptionTag extends ITag, IButtonable {
            gT(): string;
        }
    }
    namespace Core {
        interface IDirector {
            c(resources: IResource<string | HTMLImageElement>[][]): Promise<void>;
            OP(start: boolean, title: string, author: string): Promise<IRuntime>;
            ED(): Promise<IRuntime>;
            FAIL(): Promise<IRuntime>;
            charOn(resource: IResource<HTMLImageElement>, position: IDirector.Position): Promise<IRuntime>;
            charOff(position: IDirector.Position): Promise<IRuntime>;
            charSet(resource: IResource<HTMLImageElement>, position: IDirector.Position): Promise<IRuntime>;
            charMove(from: IDirector.Position, to: IDirector.Position): Promise<IRuntime>;
            words(words: string, theme: string, who?: string, avatar?: IResource<HTMLImageElement>): Promise<IRuntime>;
            tip(words: string): Promise<IRuntime>;
            stars(rank: IDirector.Stars): Promise<IRuntime>;
            playBGM(resource?: IResource<string>): Promise<IRuntime>;
            playSE(resource?: IResource<string>): Promise<IRuntime>;
            hideCG(): Promise<IRuntime>;
            showCG(resource: IResource<HTMLImageElement>): Promise<IRuntime>;
            asRoom(resource: IResource<HTMLImageElement>, time?: boolean): Promise<IRuntime>;
            asMap(points: Util.IHashTable<IPointTag>): Promise<IRuntime>;
            lightOff(): Promise<IRuntime>;
            lightOn(): Promise<IRuntime>;
            choose(options: IOptionTag[]): Promise<IRuntime>;
            reset(): Promise<IRuntime>;
            setCG(resource: IResource<HTMLImageElement>): Promise<IRuntime>;
        }
        namespace IDirector {
            enum Position {
                Left = 1,
                CLeft = 2,
                Center = 3,
                CRight = 4,
                Right = 5,
            }
            enum Stars {
                OK = 0,
                Awesome = 1,
                Perfect = 2,
            }
        }
    }
    namespace Core {
        interface IRuntime extends Util.IEmittable {
            gE(): IEpisode;
            gL(): Util.ILogger;
            gS(): IStates;
            gD(): IDirector;
            play(): IRuntime;
            replay(): IRuntime;
            destroy(): Promise<IRuntime>;
            fix(): void;
            auto(auto?: boolean): boolean;
            volume(volume?: number): number;
            isPlaying(): boolean;
            s(scene: ISceneTag, title: string, actions: string[]): IRuntime;
            a(action: IIdableTag): IRuntime;
            gH(): boolean;
            t(flow: () => IRuntime | Thenable<IRuntime>): IRuntime;
            title(title: string): IRuntime;
            author(title: string): IRuntime;
            l(id?: string): void;
            bind(viewport: HTMLElement): IRuntime;
        }
    }
    namespace Core {
        interface IPerformableTag extends ITag {
            p(runtime: IRuntime): IRuntime | Thenable<IRuntime>;
        }
    }
    namespace Core {
        interface ISceneTag extends IIdableTag, IPerformableTag {
            gT(): ISceneTag.Type;
        }
        namespace ISceneTag {
            enum Type {
                Begin = 0,
                Fail = 1,
                End = 2,
                PreLeave = 3,
                PreEnter = 4,
                PostLeave = 5,
                PostEnter = 6,
            }
        }
    }
    namespace Core {
        interface ISceneHost {
            a(scene: ISceneTag): ISceneHost;
            p(type: ISceneTag.Type, runtime: IRuntime): Promise<IRuntime>;
        }
    }
    namespace Core {
        interface IEpisode extends ISceneHost {
            f(tag: IEntityTag): IEpisode;
            q(id: string, type?: IEpisode.Entity, lineNo?: number): IEntityTag;
            r(uri: string, type: IResource.Type): IResource<string | HTMLImageElement>;
            gS(): string;
            gT(): string;
        }
        namespace IEpisode {
            enum Entity {
                Room = 0,
                Chr = 1,
                BGM = 2,
                SE = 3,
                CG = 4,
                Map = 5,
                Weather = 6,
                Player = 7,
            }
        }
    }
    namespace Runtime {
        namespace Event {
            interface IReadyMetas extends Util.IEventMetas<Core.IEpisode> {
            }
        }
    }
    namespace Runtime {
        namespace Event {
            class Ready extends Event<Core.IEpisode> {
                constructor(metas: IReadyMetas);
                gT(): string;
            }
        }
    }
    namespace Runtime {
        namespace Event {
            interface IErrorMetas extends Util.IEventMetas<any> {
                error: Error;
            }
        }
    }
    namespace Runtime {
        namespace Event {
            class Error extends Event<any> {
                error: Error;
                constructor(metas: IErrorMetas);
                gT(): string;
            }
        }
    }
    namespace Runtime {
        namespace Event {
            interface IEndMetas extends Util.IEventMetas<Core.IEpisode> {
            }
        }
    }
    namespace Runtime {
        namespace Event {
            class End extends Event<Core.IEpisode> {
                constructor(metas: IEndMetas);
                gT(): string;
            }
        }
    }
    namespace Runtime {
        class Resource<T> implements Core.IResource<T> {
            private _l;
            private _q;
            private _w;
            private _r;
            constructor(uri: string, type: Core.IResource.Type);
            static g<U>(uri: string, type: Core.IResource.Type): Resource<U>;
            l(): string;
            o(): Promise<T>;
            w(callback: (value: T) => void): Resource<T>;
        }
    }
    namespace Runtime {
        class Episode implements Core.IEpisode {
            private _a;
            private _e;
            private _c;
            private _p;
            private _s;
            private _t;
            constructor(ep: Core.IRootTag, runtime: Core.IRuntime);
            a(scene: Core.ISceneTag): Episode;
            p(type: Core.ISceneTag.Type, runtime: Core.IRuntime): Promise<Core.IRuntime>;
            f(tag: Core.IEntityTag): Episode;
            q(id: string, type: Core.IEpisode.Entity, lineNo?: number): Core.IEntityTag;
            r(uri: string, type: Core.IResource.Type): Resource<string | HTMLImageElement>;
            gS(): string;
            gT(): string;
            gA(): boolean;
            gC(): Util.IHashTable<Util.IHashTable<any>>;
        }
    }
    namespace Runtime {
        namespace Event {
            interface IQueryMetas extends Util.IEventMetas<Core.IStates> {
                callback: (slots: Util.IHashTable<[string, number]>) => void;
            }
        }
    }
    namespace Runtime {
        namespace Event {
            class Query extends Event<Core.IStates> {
                callback: (slots: Util.IHashTable<[string, number]>) => void;
                constructor(metas: IQueryMetas);
                gT(): string;
            }
        }
    }
    namespace Runtime {
        namespace Event {
            interface ISaveMetas extends Util.IEventMetas<Core.IStates> {
                data: Util.IHashTable<any>;
                manual: boolean;
                callback: (id: string) => void;
            }
        }
    }
    namespace Runtime {
        namespace Event {
            class Save extends Event<Core.IStates> {
                data: Util.IHashTable<any>;
                manual: boolean;
                callback: (id: string) => void;
                constructor(metas: ISaveMetas);
                gT(): string;
            }
        }
    }
    namespace Runtime {
        namespace Event {
            interface IStateMetas extends Util.IEventMetas<Core.IStates> {
                data: Util.IHashTable<any>;
            }
        }
    }
    namespace Runtime {
        namespace Event {
            class State extends Event<Core.IStates> {
                data: Util.IHashTable<any>;
                constructor(metas: IStateMetas);
                gT(): string;
            }
        }
    }
    namespace Runtime {
        class States implements Core.IStates {
            private _d;
            private _r;
            private _s;
            private _l;
            private _p;
            constructor(runtime: Core.IRuntime);
            s(key: string, value: any): States;
            g(key: string): any;
            d(key: string): States;
            a(key1: string, key2: string): boolean;
            c(src: string, dest: string): States;
            m(src: string, dest: string): States;
            t(text: string): string;
            p(): States;
            e(manual: boolean): Util.IHashTable<any>;
            i(data: Util.IHashTable<any>): States;
            q(index: string): [string, number];
            l(): void;
        }
    }
    namespace Runtime {
        class Prefecher {
            private _p;
            constructor();
            static c(resources: Resource<string | HTMLImageElement>[][], logger?: Util.ILogger): Promise<void>;
            private q(resources, logger?);
        }
    }
    namespace Runtime {
        namespace Event {
            interface IBeginMetas extends Util.IEventMetas<Core.IEpisode> {
            }
        }
    }
    namespace Runtime {
        namespace Event {
            class Begin extends Event<Core.IEpisode> {
                constructor(metas: IBeginMetas);
                gT(): string;
            }
        }
    }
    namespace Runtime {
        class Director implements Core.IDirector {
            protected _r: Core.IRuntime;
            protected _p: Promise<Core.IRuntime>;
            protected _d: boolean;
            protected _a: boolean;
            protected _v: number;
            protected _o: boolean;
            constructor(runtime: Core.IRuntime);
            c(resources: Resource<string | HTMLImageElement>[][]): Promise<void>;
            OP(start: boolean, title: string, author: string): Promise<Core.IRuntime>;
            ED(): Promise<Core.IRuntime>;
            FAIL(): Promise<Core.IRuntime>;
            charOn(resource: Resource<HTMLImageElement>, position: Core.IDirector.Position): Promise<Core.IRuntime>;
            charOff(position: Core.IDirector.Position): Promise<Core.IRuntime>;
            charSet(resource: Resource<HTMLImageElement>, position: Core.IDirector.Position): Promise<Core.IRuntime>;
            charMove(from: Core.IDirector.Position, to: Core.IDirector.Position): Promise<Core.IRuntime>;
            words(words: string, theme: string, who?: string, avatar?: Resource<HTMLImageElement>): Promise<Core.IRuntime>;
            tip(words: string): Promise<Core.IRuntime>;
            stars(rank: Core.IDirector.Stars): Promise<Core.IRuntime>;
            playBGM(resource?: Resource<string>): Promise<Core.IRuntime>;
            playSE(resource?: Resource<string>): Promise<Core.IRuntime>;
            hideCG(): Promise<Core.IRuntime>;
            showCG(resource: Resource<HTMLImageElement>): Promise<Core.IRuntime>;
            asRoom(resource: Resource<HTMLImageElement>, time?: boolean): Promise<Core.IRuntime>;
            asMap(points: Util.IHashTable<Core.IPointTag>): Promise<Core.IRuntime>;
            lightOff(): Promise<Core.IRuntime>;
            lightOn(): Promise<Core.IRuntime>;
            choose(options: Core.IOptionTag[]): Promise<Core.IRuntime>;
            reset(): Promise<Core.IRuntime>;
            setCG(resource: Core.IResource<HTMLImageElement>): Promise<Core.IRuntime>;
            gD(): boolean;
            t(id: string, theme: Util.IHashTable<Util.IHashTable<any>>): Director;
            a(auto: boolean): boolean;
            v(volume: number): Director;
            f(): void;
            d(): void;
            h(): void;
            qs(load?: boolean, opacity?: number): Promise<Core.IRuntime>;
            qh(succeed: boolean): Promise<Core.IRuntime>;
            b(viewport: HTMLElement): Director;
        }
    }
    namespace Runtime {
        class NodeDirector extends Director {
        }
    }
    namespace Runtime {
        namespace Event {
            interface IResumeMetas extends Util.IEventMetas<Core.IEpisode> {
            }
        }
    }
    namespace Runtime {
        namespace Event {
            class Resume extends Event<Core.IEpisode> {
                constructor(metas: IResumeMetas);
                gT(): string;
            }
        }
    }
    namespace Sprite {
        abstract class Sprite extends G.Sprite {
            v(immediately?: boolean): Promise<Sprite>;
            h(immediately?: boolean): Promise<Sprite>;
        }
    }
    namespace Sprite {
        class Curtain extends Sprite {
            constructor(color?: string);
        }
    }
    namespace Sprite {
        class Author extends Sprite {
            private _x;
            constructor(theme: Util.IHashTable<Util.IHashTable<any>>);
            u(title: string): Author;
        }
    }
    namespace Runtime {
        class CanvasDirector extends Director {
            static BOUNDS: G.IBounds;
            private _c;
            private _s;
            private _i;
            private _f;
            private _t;
            private _h;
            private _m;
            private _q;
            private _e;
            private _l;
            private _x;
            constructor(runtime: Core.IRuntime);
            c(resources: Resource<string | HTMLImageElement>[][]): Promise<void>;
            OP(start: boolean, title: string, author: string): Promise<Core.IRuntime>;
            ED(): Promise<Core.IRuntime>;
            charOn(resource: Resource<HTMLImageElement>, position: Core.IDirector.Position): Promise<Core.IRuntime>;
            charOff(position: Core.IDirector.Position): Promise<Core.IRuntime>;
            charSet(resource: Resource<HTMLImageElement>, position: Core.IDirector.Position): Promise<Core.IRuntime>;
            charMove(from: Core.IDirector.Position, to: Core.IDirector.Position): Promise<Core.IRuntime>;
            protected $c(resource: Resource<HTMLImageElement>, position: Core.IDirector.Position): G.Image;
            words(words: string, theme: string, who?: string, avatar?: Resource<HTMLImageElement>): Promise<Core.IRuntime>;
            tip(words: string): Promise<Core.IRuntime>;
            stars(rank: Core.IDirector.Stars): Promise<Core.IRuntime>;
            playBGM(resource?: Resource<string>): Promise<Core.IRuntime>;
            playSE(resource?: Resource<string>): Promise<Core.IRuntime>;
            hideCG(): Promise<Core.IRuntime>;
            showCG(resource: Resource<HTMLImageElement>): Promise<Core.IRuntime>;
            asRoom(resource: Resource<HTMLImageElement>, time?: boolean): Promise<Core.IRuntime>;
            asMap(points: Util.IHashTable<Core.IPointTag>): Promise<Core.IRuntime>;
            lightOff(): Promise<Core.IRuntime>;
            lightOn(): Promise<Core.IRuntime>;
            choose(options: Core.IOptionTag[]): Promise<Core.IRuntime>;
            reset(): Promise<Core.IRuntime>;
            setCG(resource: Core.IResource<HTMLImageElement>): Promise<Core.IRuntime>;
            t(id: string, theme: Util.IHashTable<Util.IHashTable<any>>): CanvasDirector;
            a(auto: boolean): boolean;
            v(volume: number): CanvasDirector;
            f(): void;
            d(): void;
            h(): void;
            qs(load?: boolean, opacity?: number): Promise<Core.IRuntime>;
            qh(succeed: boolean): Promise<Core.IRuntime>;
            b(viewport: HTMLElement): Director;
            private $w(element, words, font);
        }
    }
    namespace Runtime {
        namespace DirectorFactory {
            function c(runtime: Core.IRuntime): Director;
        }
    }
    namespace Runtime {
        namespace Event {
            interface ILoadMetas extends Util.IEventMetas<Core.IStates> {
                callback: (data: Util.IHashTable<any>) => void;
                id: string;
            }
        }
    }
    namespace Runtime {
        namespace Event {
            class Load extends Event<Core.IStates> {
                callback: (data: Util.IHashTable<any>) => void;
                id: string;
                constructor(metas: ILoadMetas);
                gT(): string;
            }
        }
    }
    namespace Runtime {
        namespace Event {
            interface ISceneMetas extends Util.IEventMetas<Core.ISceneTag> {
                title: string;
                actions: string[];
            }
        }
    }
    namespace Runtime {
        namespace Event {
            class Scene extends Event<Core.ISceneTag> {
                id: string;
                title: string;
                actions: string[];
                constructor(metas: ISceneMetas);
                gT(): string;
            }
        }
    }
    namespace Runtime {
        namespace Event {
            interface IActionMetas extends Util.IEventMetas<Core.IIdableTag> {
            }
        }
    }
    namespace Runtime {
        namespace Event {
            class Action extends Event<Core.IIdableTag> {
                id: string;
                kind: string;
                constructor(metas: IActionMetas);
                gT(): string;
            }
        }
    }
    namespace Tag {
        var T: {
            [name: string]: string;
        };
        var S: {
            [index: number]: any[];
        };
        var C: {
            [tag: string]: string;
        };
        var I: {
            [name: string]: number;
        };
    }
    class E extends Error {
        static SCHEMA_TAG_NOT_DECLARED: string;
        static SCHEMA_CHILD_NOT_ALLOWED: string;
        static LEX_ILLEGAL_SOURCE: string;
        static LEX_UNEXPECTED_INDENTATION: string;
        static TAG_PARAMS_TOO_FEW: string;
        static TAG_PARAMS_TOO_MANY: string;
        static TAG_CONTENT_FORBIDEN: string;
        static TAG_CONTENT_REQUIRED: string;
        static TAG_CHILDREN_TOO_FEW: string;
        static TAG_CHILDREN_TOO_MANY: string;
        static DEF_CHAR_AVATAR_NOT_FOUND: string;
        static DEF_CHAR_POSES_NOT_FOUND: string;
        static DEF_EPISODE_NOT_REGISTERED: string;
        static DEF_EPISODE_NOT_BINDED: string;
        static DEF_ROOM_EMPTY: string;
        static DEF_MAP_REGION_BROKEN: string;
        static DEF_MAP_BGIMAGE_NOT_FOUND: string;
        static DEF_MAP_HLIMAGE_NOT_FOUND: string;
        static DEF_MAP_REGION_NOT_FOUND: string;
        static DEF_MAP_TARGET_NOT_FOUND: string;
        static DEF_MAP_POINT_NOT_FOUND: string;
        static SCENE_TYPE_UNKNOWN: string;
        static ROOT_NOT_PARENT: string;
        static ACT_ILLEGAL_POSITION: string;
        static ACT_CHAR_NOT_ON: string;
        static ACT_CHAR_ONSTAGE: string;
        static ACT_ILLEGAL_STARS: string;
        static ACT_CG_NOT_SHOWN: string;
        static ACT_CG_ALREADY_SHOWN: string;
        static ACT_ILLEGAL_OP: string;
        static ACT_OPTION_CAST_FAILURE: string;
        static RES_INVALID_URI: string;
        static ENV_NOT_AVAILABLE: string;
        static EP_DUPLICATE_ENTITY: string;
        static EP_ENTITY_NOT_FOUND: string;
        static EP_THEME_NOT_LOADED: string;
        static G_PARENT_NOT_FOUND: string;
        static SUPPORT_NO_CANVAS: string;
        static UTIL_REMOTE_TIMEOUT: string;
        static OPT_OPTIONS_MISSING: string;
        static OPT_OPTIONS_CONFLICT: string;
        signal: E.Signal;
        constructor(message: string, lineNo?: number);
        static doHalt<T>(): Promise<T>;
        static ignoreHalt(error: E): Promise<void>;
        static doBreak<T>(): Promise<T>;
        static ignoreBreak(error: E): Promise<void>;
    }
    namespace E {
        enum Signal {
            BREAK = -99,
            HALT = -98,
            OK = 0,
        }
    }
    namespace Tag {
        class Unknown implements Core.ITag {
            protected _p: string[];
            protected _c: string;
            protected _s: Unknown[];
            protected _l: number;
            protected _u: Unknown;
            protected _r: boolean;
            protected _b: boolean;
            private _q;
            constructor(params: string[], content: string, children: Unknown[], lineNo?: number);
            gL(): number;
            gN(): string;
            r(ep: Core.IEpisode): void;
            protected $r(ep: Core.IEpisode): void;
            b(ep: Core.IEpisode): void;
            protected $b(ep: Core.IEpisode): void;
            toString(): string;
            toJsrn(): string;
            protected $v(orig: string): number | string;
            protected $u(parent: Unknown): void;
            gU(): Unknown;
            protected $i(abstract?: boolean): number;
            $p(index: number): string;
            $c(): string;
            protected $q(name: string): Unknown[];
        }
    }
    namespace Tag {
        class Entity extends Unknown implements Core.IEntityTag {
            $r(ep: Core.IEpisode): void;
            gI(): string;
            gT(): Core.IEpisode.Entity;
        }
    }
    namespace Tag {
        class Image extends Unknown {
            protected _o: Core.IResource<HTMLImageElement>;
            gN(): string;
            $r(ep: Core.IEpisode): void;
            o(): Core.IResource<HTMLImageElement>;
        }
    }
    namespace Tag {
        class Avatar extends Image {
            gN(): string;
            $r(ep: Core.IEpisode): void;
        }
    }
    namespace Tag {
        class ResTable extends Unknown {
            protected _o: Util.IHashTable<Core.IResource<HTMLImageElement>>;
            constructor(params: string[], content: string, children: Unknown[], lineNo?: number);
            o(id: string): Core.IResource<HTMLImageElement>;
        }
    }
    namespace Tag {
        class Poses extends ResTable {
            gN(): string;
            $r(ep: Core.IEpisode): void;
            d(): Core.IResource<HTMLImageElement>[];
        }
    }
    namespace Tag {
        class DefChar extends Entity {
            private _o;
            constructor(params: string[], content: string, children: Unknown[], lineNo?: number);
            gN(): string;
            $b(ep: Core.IEpisode): void;
            gT(): Core.IEpisode.Entity;
            o(id?: string): Core.IResource<HTMLImageElement>;
            d(): Core.IResource<HTMLImageElement>[];
        }
    }
    namespace Tag {
        class Audio extends Unknown {
            protected _o: Core.IResource<string>;
            gN(): string;
            $r(ep: Core.IEpisode): void;
            o(): Core.IResource<string>;
        }
    }
    namespace Tag {
        class DefBGM extends Entity {
            gN(): string;
            gT(): Core.IEpisode.Entity;
            o(): Core.IResource<string>;
        }
    }
    namespace Tag {
        class DefCG extends Entity {
            gN(): string;
            o(): Core.IResource<HTMLImageElement>;
        }
    }
    namespace Tag {
        class DefSE extends Entity {
            gN(): string;
            gT(): Core.IEpisode.Entity;
            o(): Core.IResource<string>;
        }
    }
    namespace Tag {
        class BGImage extends Image {
            gN(): string;
            $r(ep: Core.IEpisode): void;
        }
    }
    namespace Tag {
        class HLImage extends Image {
            gN(): string;
            $r(ep: Core.IEpisode): void;
        }
    }
    namespace Tag {
        class Region extends Unknown {
            private _a;
            constructor(params: string[], content: string, children: Unknown[], lineNo?: number);
            gN(): string;
            gX(): number;
            gY(): number;
            gZ(): number;
            gW(): number;
            gH(): number;
        }
    }
    namespace Tag {
        class Target extends Unknown {
            private _o;
            gN(): string;
            $b(ep: Core.IEpisode): void;
            gR(): DefRoom;
        }
    }
    namespace Tag {
        class Action extends Unknown implements Core.IPerformableTag {
            $i(abstract?: boolean): number;
            t(states: Core.IStates): boolean;
            p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime>;
            $d(): Core.IResource<string | HTMLImageElement>[];
        }
    }
    namespace Tag {
        class Enter extends Action {
            private _mo;
            gN(): string;
            $b(ep: Core.IEpisode): void;
            p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime>;
        }
    }
    namespace Tag {
        class Point extends Unknown implements Core.IPointTag {
            private _o;
            private _m;
            constructor(params: string[], content: string, children: Unknown[], lineNo?: number);
            gN(): string;
            $b(ep: Core.IEpisode): void;
            p(runtime: Core.IRuntime): void;
            gI(): string;
            o(): Core.IResource<HTMLImageElement>;
            sM(id: string): void;
            gX(): number;
            gY(): number;
            gZ(): number;
            gW(): number;
            gH(): number;
            gR(): DefRoom;
        }
    }
    namespace Tag {
        class DefMap extends Entity implements Core.IMapTag {
            private _a;
            private _o;
            constructor(params: string[], content: string, children: Unknown[], lineNo?: number);
            gN(): string;
            $b(ep: Core.IEpisode): void;
            gT(): Core.IEpisode.Entity;
            o(): Core.IResource<HTMLImageElement>;
            gP(): Util.IHashTable<Point>;
            gP(id: string): Point;
            d(): Core.IResource<HTMLImageElement>[];
        }
    }
    namespace Tag {
        class Link extends Unknown {
            private _o;
            gN(): string;
            $b(ep: Core.IEpisode): void;
            gM(): DefMap;
        }
    }
    namespace Tag {
        class Times extends ResTable {
            gN(): string;
            $r(ep: Core.IEpisode): void;
            d(): Core.IResource<HTMLImageElement>[];
        }
    }
    namespace Tag {
        class DefRoom extends Entity implements Core.IRoomTag {
            private _a;
            constructor(params: string[], content: string, children: Unknown[], lineNo?: number);
            gN(): string;
            gT(): Core.IEpisode.Entity;
            a(scene: Core.ISceneTag): DefRoom;
            p(type: Core.ISceneTag.Type, runtime: Core.IRuntime): Promise<Core.IRuntime>;
            o(id?: string): Core.IResource<HTMLImageElement>;
            gM(): DefMap;
            d(): Core.IResource<HTMLImageElement>[];
        }
    }
    namespace Tag {
        class Auto extends Unknown {
            gN(): string;
        }
    }
    namespace Tag {
        class Player extends Unknown {
            private _o;
            gN(): string;
            $b(ep: Core.IEpisode): void;
            gI(): string;
            gT(): Core.IEpisode.Entity;
            gC(): DefChar;
        }
    }
    namespace Tag {
        class Theme extends Unknown {
            gN(): string;
            l(callback: Util.ISuccessCallback<Util.IHashTable<any>>): void;
        }
    }
    namespace Tag {
        class Resources extends Unknown {
            gN(): string;
            l(callback: Util.ISuccessCallback<Util.IHashTable<Core.IEntityTag>>): void;
        }
    }
    namespace Tag {
        class Type extends Unknown {
            private _t;
            private _o;
            constructor(params: string[], content: string, children: Unknown[], lineNo?: number);
            gN(): string;
            $b(ep: Core.IEpisode): void;
            gT(): Core.ISceneTag.Type;
            gR(): DefRoom;
        }
    }
    namespace Tag {
        class Conditions extends Unknown {
            gN(): string;
            t(states: Core.IStates): boolean;
        }
    }
    namespace Tag {
        class AsRoom extends Action {
            private _mo;
            gN(): string;
            $b(ep: Core.IEpisode): void;
            p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime>;
            $d(): Core.IResource<HTMLImageElement>[];
            gR(): DefRoom;
        }
    }
    namespace Tag {
        class CharOn extends Action {
            private _mp;
            private _mc;
            private _ms;
            private _mo;
            constructor(params: string[], content: string, children: Unknown[], lineNo?: number);
            gN(): string;
            $b(ep: Core.IEpisode): void;
            p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime>;
            $d(): Core.IResource<HTMLImageElement>[];
            gC(): DefChar;
        }
    }
    namespace Tag {
        class PlayBGM extends Action {
            private _mo;
            gN(): string;
            $b(ep: Core.IEpisode): void;
            p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime>;
            $d(): Core.IResource<string>[];
            gB(): DefBGM;
        }
    }
    namespace Tag {
        class PlaySE extends Action {
            private _mo;
            gN(): string;
            $b(ep: Core.IEpisode): void;
            p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime>;
            $d(): Core.IResource<string>[];
            gS(): DefSE;
        }
    }
    namespace Tag {
        class ShowCG extends Action {
            private _mo;
            gN(): string;
            $b(ep: Core.IEpisode): void;
            p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime>;
            $d(): Core.IResource<HTMLImageElement>[];
            gC(): DefCG;
        }
    }
    namespace Tag {
        class Idable extends Action implements Core.IIdableTag {
            private _i;
            private _d;
            toJsrn(): string;
            p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime>;
            gI(): string;
            i(id: string): void;
            d(): Idable;
        }
    }
    namespace Tag {
        class Speak extends Idable {
            private _mc;
            gN(): string;
            $b(ep: Core.IEpisode): void;
            p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime>;
            $d(): Core.IResource<HTMLImageElement>[];
            gC(): DefChar;
        }
    }
    namespace Core {
        interface IBlock {
            gA(): string[];
        }
    }
    namespace Tag {
        class Loop extends Action implements Core.IBlock {
            gN(): string;
            t(states: Core.IStates): boolean;
            p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime>;
            gA(): string[];
            c(): Core.IResource<string | HTMLImageElement>[][];
        }
    }
    namespace Tag {
        class Content extends Unknown implements Core.IPerformableTag, Core.IBlock {
            gN(): string;
            p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime>;
            gA(): string[];
        }
    }
    namespace Tag {
        class Scene extends Unknown implements Core.ISceneTag {
            private _i;
            gN(): string;
            $b(ep: Core.IEpisode): void;
            toJsrn(): string;
            gI(): string;
            i(id: string): void;
            p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime>;
            gT(): Core.ISceneTag.Type;
        }
    }
    namespace Tag {
        class Root extends Unknown implements Core.IRootTag {
            static SERIALS: string;
            constructor(children: Unknown[]);
            gN(): string;
            b(ep: Core.IEpisode): void;
            toString(): string;
            toJsrn(): string;
            gU(): Unknown;
            a(): boolean;
            l(callback: Util.ISuccessCallback<Util.IHashTable<Core.IEntityTag>>): boolean;
            gS(): string;
            t(callback: Util.ISuccessCallback<Util.IHashTable<any>>): void;
            gT(): string;
        }
    }
    namespace Tag {
        class CharOff extends Action {
            private _mc;
            constructor(params: string[], content: string, children: Unknown[], lineNo?: number);
            gN(): string;
            $b(ep: Core.IEpisode): void;
            p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime>;
        }
    }
    namespace Tag {
        class CharSet extends Action {
            private _mp;
            private _mc;
            private _ms;
            private _mo;
            constructor(params: string[], content: string, children: Unknown[], lineNo?: number);
            gN(): string;
            $b(ep: Core.IEpisode): void;
            p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime>;
            $d(): Core.IResource<HTMLImageElement>[];
            gC(): DefChar;
        }
    }
    namespace Tag {
        class CharPose extends Action {
            private _mc;
            private _ms;
            private _mo;
            constructor(params: string[], content: string, children: Unknown[], lineNo?: number);
            gN(): string;
            $b(ep: Core.IEpisode): void;
            p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime>;
            $d(): Core.IResource<HTMLImageElement>[];
        }
    }
    namespace Tag {
        class Monolog extends Idable {
            private _mc;
            gN(): string;
            $b(ep: Core.IEpisode): void;
            p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime>;
            $d(): Core.IResource<HTMLImageElement>[];
            gC(): DefChar;
        }
    }
    namespace Tag {
        class VoiceOver extends Idable {
            gN(): string;
            p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime>;
        }
    }
    namespace Tag {
        class Save extends Action {
            gN(): string;
            p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime>;
        }
    }
    namespace Tag {
        class End extends Action {
            gN(): string;
            p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime>;
        }
    }
    namespace Tag {
        class Fail extends Action {
            gN(): string;
            p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime>;
        }
    }
    namespace Tag {
        class Stars extends Action {
            private _ms;
            constructor(params: string[], content: string, children: Unknown[], lineNo?: number);
            gN(): string;
            p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime>;
        }
    }
    namespace Tag {
        class HideCG extends Action {
            gN(): string;
            p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime>;
        }
    }
    namespace Tag {
        class AsTime extends Action {
            gN(): string;
            p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime>;
            gT(): string;
        }
    }
    namespace Tag {
        class Freeze extends Action {
            gN(): string;
            p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime>;
        }
    }
    namespace Tag {
        class Weather extends Action {
            gN(): string;
            p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime>;
        }
    }
    namespace Tag {
        class Assert extends Action {
            gN(): string;
            t(states: Core.IStates): boolean;
            p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime>;
        }
    }
    namespace Tag {
        class Assign extends Action {
            gN(): string;
            t(states: Core.IStates): boolean;
            p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime>;
        }
    }
    namespace Tag {
        class Compare extends Action {
            gN(): string;
            t(states: Core.IStates): boolean;
            p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime>;
        }
    }
    namespace Tag {
        class Increase extends Action {
            gN(): string;
            t(states: Core.IStates): boolean;
            p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime>;
        }
    }
    namespace Tag {
        class LoopBreak extends Action {
            gN(): string;
            p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime>;
        }
    }
    namespace Tag {
        class And extends Action {
            gN(): string;
            t(states: Core.IStates): boolean;
            p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime>;
        }
    }
    namespace Tag {
        class Or extends Action {
            gN(): string;
            t(states: Core.IStates): boolean;
            p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime>;
        }
    }
    namespace Tag {
        class Otherwise extends Action implements Core.IBlock {
            gN(): string;
            t(states: Core.IStates): boolean;
            p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime>;
            gA(): string[];
            c(): Core.IResource<string | HTMLImageElement>[][];
        }
    }
    namespace Tag {
        class Then extends Action implements Core.IBlock {
            gN(): string;
            t(states: Core.IStates): boolean;
            p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime>;
            gA(): string[];
            c(): Core.IResource<string | HTMLImageElement>[][];
        }
    }
    namespace Tag {
        class When extends Action implements Core.IBlock {
            gN(): string;
            t(states: Core.IStates): boolean;
            p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime>;
            gA(): string[];
            c(): Core.IResource<string | HTMLImageElement>[][];
        }
    }
    namespace Tag {
        class Option extends Unknown implements Core.IOptionTag {
            _k: string;
            static f(tag: Unknown): Option;
            gT(): string;
            p(runtime: Core.IRuntime): void;
            sK(key: string): Option;
        }
    }
    namespace Tag {
        class Choose extends Action {
            gN(): string;
            constructor(params: string[], content: string, children: Unknown[], lineNo?: number);
            p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime>;
        }
    }
    namespace Tag {
        class Tip extends Action {
            gN(): string;
            p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime>;
        }
    }
    namespace Tag {
        class Maximum extends Action {
            gN(): string;
            t(states: Core.IStates): boolean;
            p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime>;
        }
    }
    namespace Tag {
        class CharMove extends Action {
            private _mc;
            private _mp;
            constructor(params: string[], content: string, children: Unknown[], lineNo?: number);
            gN(): string;
            $b(ep: Core.IEpisode): void;
            p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime>;
        }
    }
    namespace Tag {
        class WhenVar extends Action implements Core.IBlock {
            gN(): string;
            t(states: Core.IStates): boolean;
            p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime>;
            gA(): string[];
            c(): Core.IResource<string | HTMLImageElement>[][];
        }
    }
    namespace Tag {
        class StopBGM extends Action {
            gN(): string;
            p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime>;
        }
    }
    namespace Tag {
        class DefOptions extends Action {
            gN(): string;
            p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime>;
        }
    }
    namespace Tag {
        class AddOption extends Action {
            gN(): string;
            p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime>;
        }
    }
    namespace Tag {
        class DropOption extends Action {
            gN(): string;
            p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime>;
        }
    }
    namespace Tag {
        class Random extends Action {
            gN(): string;
            t(states: Core.IStates): boolean;
            p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime>;
        }
    }
    namespace Tag {
        class IfTime extends Action {
            gN(): string;
            t(states: Core.IStates): boolean;
            p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime>;
        }
    }
    namespace Tag {
        class Copy extends Action {
            gN(): string;
            t(states: Core.IStates): boolean;
            p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime>;
        }
    }
    namespace Tag {
        class Add extends Action {
            gN(): string;
            t(states: Core.IStates): boolean;
            p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime>;
        }
    }
    namespace Tag {
        class Subtract extends Action {
            gN(): string;
            t(states: Core.IStates): boolean;
            p(runtime: Core.IRuntime): Core.IRuntime | Thenable<Core.IRuntime>;
        }
    }
    namespace Runtime {
        class Runtime implements Core.IRuntime {
            private _a;
            private _e;
            private _l;
            private _s;
            private _d;
            private _fr;
            private _fp;
            private _fv;
            private _fa;
            private _fh;
            private _t;
            private _n;
            private _c;
            constructor(ep: Core.IRootTag);
            addEventListener<T>(type: string, listener: Util.IEventListener<T>): Runtime;
            removeEventListener<T>(type: string, listener: Util.IEventListener<T>): Runtime;
            dispatchEvent<T>(event: Event.Event<T>): Runtime;
            gE(): Episode;
            gL(): Util.ConsoleLogger;
            gS(): States;
            gD(): Director;
            play(): Runtime;
            replay(): Runtime;
            destroy(): Promise<Runtime>;
            fix(): void;
            auto(auto?: boolean): boolean;
            volume(volume?: number): number;
            isPlaying(): boolean;
            title(title: string): Runtime;
            author(title: string): Runtime;
            s(scene: Core.ISceneTag, title: string, actions: string[]): Runtime;
            a(action: Core.IIdableTag): Runtime;
            gH(): boolean;
            t(flow: () => Runtime | Thenable<Runtime>): Runtime;
            l(id: string): void;
            bind(viewport: HTMLElement): Runtime;
        }
    }
    namespace Lex {
        class TagLine {
            static GRAMMAR: RegExp;
            private _i;
            private _t;
            private _c;
            private _l;
            constructor(source?: string, lineNo?: number);
            gI(): number;
            gT(): string[];
            gC(): TagLine[];
            gL(): [number, number];
            a(child: TagLine): TagLine;
            t(): Core.ITag;
        }
    }
    namespace Lex {
        namespace Parser {
            function c(lines: string[]): Core.IRootTag;
            function c(source: string): Core.IRootTag;
        }
    }
    function Bigine(source: string): Core.IRootTag;
    function Bigine(tags: Core.IRootTag): Core.IRuntime;
    function Bigine(lines: string[]): Core.IRootTag;
    function Bigine(children: Core.ITag[]): Core.IRuntime;
    function Bigine(code: number, content?: string | number, params?: (number | string)[], children?: Core.ITag[], id?: string): Core.ITag;
    namespace Bigine {
        var version: string;
    }
}

declare module "bigine" {
    export = __Bigine.Bigine;
}
