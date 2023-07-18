window.gVar = {
    target:-1,
    swap:!1,
    pressPlay: !1,
    name: "",
    tag: "",
    code: "",
    skinUrl1: "",
    skinUrl2: "",
    datas:[],
    Waves:[],
    mapWaves:[],
    currentCount:0,
    mapSelect:false,
    lock: false,
    useBot:false,
    reConn:0,
    botType:0,
    camMaxX:0,
    camMinX:0,
    camMinY:0,
    camMaxY:0,
    tabcamMaxX:0,
    tabcamMinX:0,
    tabcamMinY:0,
    tabcamMaxY:0,
    tabXMulti:0,
    tabYMulti:0,
    tempx:0,
    tempy:0,
    tripList:[],
    tripList2:[],
    botCalu:0,
    globalFont:"Overpass,Noto Sans,Meiryo,sans-serif",
    conn1: {
        id: 0,
        x: 0,
        y: 0,
        mass: 0,
        isAlive: false,
        isActive: false,
        tab1: {
            x: 0,
            y: 0,
            mass: 0,
            isAlive: false
        },
        tab2: {
            x: 0,
            y: 0,
            mass: 0,
            isAlive: false
        }
    },
    conn2: {
        id: 0,
        x: 0,
        y: 0,
        mass: 0,
        isAlive: false,
        isActive: false,
        tab1: {
            x: 0,
            y: 0,
            mass: 0,
            isAlive: false
        },
        tab2: {
            x: 0,
            y: 0,
            mass: 0,
            isAlive: false
        }
    },
    tempX: 0,
    tempY: 0,
    stopMouse: false,
    controlConn2: false,
    massList : []
}
PIXI = null;
var tcfg = {},
    biggest = null,
    stopMouse = false;
jQuery.getScript("https://pixijs.download/v7.1.3/pixi-legacy.js").done(() => {
    $( document ).ready(function() {
    init();
    start()
    });
});
var MAIN_RENDERER, GAMEPLAY_STYLE, MINIMAP_STYLE;
const GENERAL_CHARS = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$%";
const token = ""//String.fromCharCode(64)+GENERAL_CHARS[54]+GENERAL_CHARS[4]+GENERAL_CHARS[13]+GENERAL_CHARS[15]+GENERAL_CHARS[0]+GENERAL_CHARS[8]+GENERAL_CHARS[48]+GENERAL_CHARS[14]+GENERAL_CHARS[3]+"+"
const init = () => {
    $("title").html("senpai tool plus");
    GAMEPLAY_STYLE = new PIXI.TextStyle({
        fontFamily: gVar.globalFont,
        lineJoin: "round",
        fontWeight: "bold",
        fill: 16777215,
        fontSize: .13 * 800 >> 0,
        stroke: "#000000",
        strokeThickness: .015 * 800 >> 0
    });
    PIXI.BitmapFont.from("GAMEPLAY_MASS", GAMEPLAY_STYLE, {
        chars: [...PIXI.BitmapFont.NUMERIC, ".K"],
        resolution: 1,
        textureWidth: 1440,
        textureHeight: 1440
    });
    MINIMAP_STYLE = new PIXI.TextStyle({
        fontFamily: gVar.globalFont,
        lineJoin: "round",
        fontSize: 15,
        fill: 16777215,
        stroke: "#000000",
        strokeThickness: 1.25
    });
    PIXI.BitmapFont.from("MINIMAP_MASS", MINIMAP_STYLE, {
        chars: [...PIXI.BitmapFont.NUMERIC, ".K"],
        resolution: 4
    })
};
const start = () => ! function(n) {
    var i = {};

    function o(t) {
        if (i[t])
            return i[t].exports;
        var e = i[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return n[t].call(e.exports, e, e.exports, o),
            e.l = !0,
            e.exports
    }
    o.m = n,
        o.c = i,
        o.d = function(t, e, n) {
        o.o(t, e) || Object.defineProperty(t, e, {
            configurable: !1,
            enumerable: !0,
            get: n
        })
    },
        o.r = function(t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        })
    },
        o.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        } :
        function() {
            return t
        };
        return o.d(e, "a", e),
            e
    },
        o.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    },
        o.p = "",
        o(o.s = 40)
}([function(t, n, e) {
    "use strict";
    Object.defineProperty(n, "__esModule", {
        value: !0
    });
    var i = e(1),
        o = e(3),
        r = e(2),
        s = (function() {
            function t() {
                this.procs = []
            }
            t.prototype.Add = function(t) {
                this.procs.push(t)
            },
                t.prototype.Fire = function() {
                this.procs.forEach(function(t) {
                    return t()
                })
            }
        }(),
             function() {
            function t() {
                this.FieldSize = 14e3,
                    this.ShowDualSkinInputUi = r.AppConfigurator.instance.showDualSkinInputUi,
                    this.ShowPartyCodeInputUi = r.AppConfigurator.instance.showPartyCodeInputUi,
                    this.IsolateBlankTagPlayers = !0,
                    this.NoskinFallbackUrl = "https://i.imgur.com/2ys3Rga.png",
                    this.MaxCellsNum = 256,
                    this.MaxPlayerUnitNum = 120,
                    this.MaxTeamNum = 100,
                    this.MaxClientsNum = 100,
                    this.ShowTeamRanking = r.AppConfigurator.instance.showTeamRanking,
                    this.ShowAlwaysAllPlayersInMap = !1,
                    this.ShowAlwaysAllPlayersSkin = !1
            }
            return t.prototype.UpdateFieldSize = function(t, e, n, i) {
                this.minX = t;
                this.minY = e;
                this.maxX = n;
                this.maxY = i;
                let o = n - t;
                this.ctrX = (t + n) / 2;
                this.ctrY = (e + i) / 2;
                this.FieldSize != o && (this.FieldSize = o)
                $('#map-size').text('size:'+o)
            },
                t
        }());
    n.GameConfig = s;
    var a = function() {
        function t() {
            this.isMainPanelVisible = !0,
                this.isDeadSpectation = !1,
                this.isSkinFilterPanelVisible = !1,
                this.chatRoomSig = "",
                this.playerDeadTimeStamp = 0,
                this.wsConnectTimeStamp = 0,
                this.enableTeamChatSeparationCurrent = null
        }
        return Object.defineProperty(t.prototype, "isRealtimeMode", {
            get: function() {
                return !this.isReplayMode
            },
            enumerable: !0,
            configurable: !0
        }),
            Object.defineProperty(t.prototype, "isRealtimeModePlaying", {
            get: function() {
                return this.isRealtimeMode && this.isPlaying
            },
            enumerable: !0,
            configurable: !0
        }),
            Object.defineProperty(t.prototype, "isSpectate", {
            get: function() {
                return !this.isPlaying
            },
            enumerable: !0,
            configurable: !0
        }),
            t.prototype.setMainPanelVisible = function(t) {
            this.isMainPanelVisible = t,
                this.mainPanelVisibleChangedProc()
        },
            t
    }();
    n.GameStates = a;
    var l = function() {
        return function() {
            this.clGameBackground = 4282668424,
                this.clGameForeground = 4294967295,
                this.clFieldBorder = 4294967295,
                this.clFieldCoords = 2298478591,
                this.clLeaderboardBack = 1711276083,
                this.clLeaderboardHeader = 4278255615,
                this.clMapBackground = 2281701376,
                this.clChatBackground = 2281701376,
                this.clOverlayBack = 1140850688,
                this.clMainPanelBack = 2281710216,
                this.clPanelForeground = 4278255615,
                this.clPanelHeader = 4278190148,
                this.clReplayBar = 4278225151,
                this.clMenuButtons = 4278225151,
                this.clMainButtons = 4294901896,
                this.clUiSymbols = 4294967295,
                this.clUiButtonActive = 4278190335,
                this.clCursorLine = 4294967295,
                this.clVirusOuterStroke = 4278255360,
                this.clVirusInnerFill = 2286175300,
                this.clVirusRangeHint = 2286175300,
                this.clChatTimeString = 4289374890,
                this.clChatSenderName = 4278225151,
                this.clChatMessage = 4294967295,
                this.clMarkerA = 14483643,
                this.clMarkerB = 16711680,
                this.clMarkerC = 16737792,
                this.clMarkerD = 16776960,
                this.clMarkerE = 65535,
                this.clMarkerF = 2003199,
                this.clMarkerG = 2154272,
                this.clMarkerH = 32e3,
                this.clMarkerRing = 4282668424,
                this.clMarkerRing2 = 4282668424,
                this.clPellet = 4282668424,
                this.clGardient1 = 4282668424,
                this.clGardient2 = 4282668424
        }
    }();
    n.ColorDefs = l;
    var c, h = function() {
        function t() {
            this.colorDefs = new l,
                this.cssColors = {},
                this.changedProcs = {},
                this.Load()
        }
        return t.prototype.RegisterChangedProc = function(t, e) {
            this.changedProcs[t] || (this.changedProcs[t] = []),
                this.changedProcs[t].push(e)
        },
            t.prototype.Load = function() {
            var t = localStorage.getItem("lwga11_color_defs");
            if (t) {
                var e = JSON.parse(t);
                i.Objects.CopyObjectProps(this.colorDefs, e)
            }
            for (var n in this.colorDefs)
                this.UpdateDerivedColorDefs(n)
        },
            t.prototype.Save = function() {
            var t = JSON.stringify(this.colorDefs);
            localStorage.setItem("lwga11_color_defs", t)
        },
            t.prototype.UpdateDerivedColorDefs = function(t) {
            var e = this.colorDefs[t],
                n = o.ColorHelper.ColorToCssColorString(e);
            this.cssColors[t] = n
        },
            t.prototype.GetCssColor = function(t) {
            return this.cssColors[t]
        },
            t.prototype.GetColor = function(t) {
            return this.colorDefs[t]
        },
            t.prototype.GetAlpha = function(t) {
            return (this.colorDefs[t] >> 24 & 255) / 255
        },
            t.prototype.SetConfigColor = function(t, e) {
            this.colorDefs[t] = e,
                this.UpdateDerivedColorDefs(t),
                this.changedProcs[t] && this.changedProcs[t].forEach(function(t) {
                return t()
            }),
                this.Save()
        },
            t
    }();
    n.ColorConfigModel = h,
        function(t) {
        t[t.Shift = 256] = "Shift",
            t[t.Ctrl = 512] = "Ctrl",
            t[t.Alt = 1024] = "Alt"
    }(c = n.ModificationKeyCode || (n.ModificationKeyCode = {}));
    var d = function() {
        function e() {
            this.ShowName = !0,
                this.ShowMass = !0,
                this.ShowTripKey = !1,
                this.ShowMapTripKey = !1,
                this.ShowUnichatTripKey = !1,
                this.ShowMapName = !1,
                this.ShowCursorLine = !0,
                this.ShowSkin = !0,
                this.ShowPelletSkin = !1,
                this.SinglePelletsColor = !1,
                this.ShowEnemySkin = !0,
                this.ShowEnemyHint = !0,
                this.ShowFood = !0,
                this.ShowSelfName = !0,
                this.ShowSelfSkin = !0,
                this.invisibleSelfCell= !1,
                this.ShowReplayBar = !0,
                this.SimpleVirus = !0,
                this.VirusSplitHint = !0,
                this.VirusRangeHint = !1,
                this.ShowCoord = !0,
                this.GlowingBorder = !0,
                this.AniBorder = !1,
                this.SimplifiedMass = !1,
                this.AutoHideText = !0,
                this.GlowingCells = !1,
                this.GlowingNonPlayerCells = !1,
                this.ShowLeaderboard = !0,
                this.ShowMap = !0,
                this.MapOpaque = !1,
                this.ShowChatBox = !0,
                this.ShowClientStatus = !0,
                this.ShowServerStatus = !1,
                this.ShowDetailedScore = !1,
                this.ShowSpecAimCursor = !0,
                this.AffectZoomingOnReplay = !0,
                this.Antialias = !0,
                this.HDMode = !1,
                this.tab = !0,
                this.MapCheat = !0,
                this.useMouseSignal = !0,
                this.useSpawnSignal = !0,
                this.ExpendTab1Sight = !1,
                this.TopTab1Sight = !1,
                this.HideMenuAfterDeath = !0,
                this.ShowSplitIndicator = !1,
                this.ShowSplitCount = !1,
                this.ShowEatLimitMarker = !1,
                this.ShowSplitPrediction = !1,
                this.ShowOrderRing = !1,
                this.ShowOrderRing2 = !1,
                this.ShowCellRing = !1,
                this.ShowAutoSplitAlert = !1,
                this.ShowMassMarker = !1,
                this.ShowPlayerLog = !0,
                this.OperationWithMouseButton = !1,
                this.SwapMouseButtons = !1,
                this.Debug_DisableSkinLoad = !1,
                this.ShowCircularName = !1,
                this.MarkerThin = !0,
                this.MarkerLight = !0,
                this.MarkerExtend = !0,
                this.ShowCellDirectionMarker = !1,
                this.TogglePlayerTransparentCells = !1,
                this.AnotherSectionCellsAlpha = .5,
                this.massBugLatency = .94,
                this.RenderQuality = 1,
                this.CameraZoomSpeed = 100,
                this.CameraMovementSpeed = 0,
                this.InterpolationType = 1,
                this.InterpolationSpeed = .5,
                this.QuickCaptureTimeOption = 2,
                this.FrameRateOption = 4,
                this.signalKey = 0,
                this.MarkerAlpha = 1,
                this.MarkerThickness = 5,
                this.CursorLineThickness = 5,
                this.PlayerCellsAlpha = 1,
                this.PlayerLabelsAlpha = 1,
                this.PelletCellsAlpha = .75,
                this.SpawnLatency = 300,
                this.pelletMaterial = "",
                this.virusMaterial = "",
                this.cellMaterialLow = "",
                this.cellMaterialMedium = "",
                this.cellMaterialHigh = "",
                this.fieldBackImageUri = r.AppConfigurator.instance.defaultFieldBackImageUri,
                this.fieldBackImageAlpha = "0.6",
                this.fieldBackImageDrawingMode2 = !1,
                this.panelBackImageUri = r.AppConfigurator.instance.defaultPanelBackImageUri,
                this.panelBackImageAlpha = "0.6",
                this.changedProcs = {},
                this.changedProcsForViewModel = {},
                this.acceptNewSkins = !0,
                this.toggleHotKeys = {
                ShowName: 78,
                ShowMass: -1,
                ShowCursorLine: -1,
                ShowSkin: -1,
                ShowPelletSkin: -1,
                SinglePelletsColor: -1,
                ShowEnemySkin: -1,
                ShowEnemyHint: -1,
                ShowFood: -1,
                ShowSelfName: -1,
                ShowSelfSkin: -1,
                ShowSplitIndicator: -1,
                ShowSplitCount: -1,
                ShowEatLimitMarker: -1,
                ShowSplitPrediction: -1,
                ShowOrderRing: -1,
                ShowCellRing: -1,
                ShowAutoSplitAlert: -1,
                ShowMassMarker: -1,
                ShowCellDirectionMarker: -1,
                TogglePlayerTransparentCells: -1,
                GlowingCells: !1,
                GlowingNonPlayerCells: !1,
                ShowTripKey: !1,
                invisibleSelfCell: -1
            },
                this.holdHotKeys = {
                ShowName: 78,
                ShowMass: -1,
                ShowCursorLine: -1,
                ShowSkin: -1,
                ShowPelletSkin: -1,
                SinglePelletsColor: -1,
                ShowEnemySkin: -1,
                ShowEnemyHint: -1,
                ShowFood: -1,
                ShowSelfName: -1,
                ShowSelfSkin: -1,
                ShowSplitIndicator: -1,
                ShowSplitCount: -1,
                ShowEatLimitMarker: -1,
                ShowSplitPrediction: -1,
                ShowOrderRing: -1,
                ShowCellRing: -1,
                ShowAutoSplitAlert: -1,
                ShowMassMarker: -1,
                ShowCellDirectionMarker: -1,
                TogglePlayerTransparentCells: -1,
                GlowingCells: !1,
                GlowingNonPlayerCells: !1,
                ShowTripKey: -1,
                invisibleSelfCell: -1
            },
                this.controlHotKeys = {
                hkSplit: 32,
                hkFeedOne: 87,
                hkFeed: 69,
                hkChangeUnit: 9,
                hkDoubleSplit: 84,
                hkTripleSplit: -1,
                hkQuadSplit: 71,
                hkSuperQuadSplit: -1,
                hkInfernoSplit: -1,
                hk4xLineSplit: -1,
                hkSuspend: 83,
                hkSuspendBoth: 83,
                hkToggleSuspendBoth: 83 + c.Alt,
                hkToggleSuspend: 83 + c.Alt,
                hkStartNewGame: 90,
                hkToggelSpectateTarget: 81,
                hkQuickReplayCapture: -1,
                hkToggleReplayRecording: -1,
                hkPlaybackReplay: -1,
                hkRefreshTab: -1,
                hkF5: -1,
                hkBot: -1,
                hkBot1: -1,
                hkBot2: -1,
                hkTab: 90,
                hkMassBug:65
            },
                this.RegisterChangedProc("ShowEnemyHint", () => {
                n.gs.gconfig.ShowAlwaysAllPlayersSkin = !this.ShowEnemyHint;
                MAIN_RENDERER.cells.forEach(t => {
                    t.edgeColor = -1
                })
            }),
                this.StoreDefaultConfig(),
                this.Load()
        }
        return e.prototype.RegisterChangedProc = function(t, e) {
            this.changedProcs[t] = e
        },
            e.prototype.GetBgImageAlphaValue = function(t) {
            var e = parseFloat(this[t]);
            return isNaN(e) ? .5 : e
        },
            e.prototype.SetValue = function(t, e) {
            this[t] != e && (this[t] = e,
                             this.Store(),
                             this.changedProcs[t] && this.changedProcs[t](t, e),
                             this.changedProcsForViewModel[t] && this.changedProcsForViewModel[t]())
        },
            e.prototype.SetControlHotKey = function(t, e) {
            this.controlHotKeys[t] != e && (this.controlHotKeys[t] = e,
                                            this.Store())
        },
            e.prototype.SetToggleHotKey = function(t, e) {
            this.toggleHotKeys[t] != e && (this.toggleHotKeys[t] = e,
                                           this.Store())
        },
            e.prototype.SetHoldHotKey = function(t, e) {
            this.holdHotKeys[t] != e && (this.holdHotKeys[t] = e,
                                         this.Store())
        },
            e.prototype.SetAcceptNewSkins = function(t) {
            this.acceptNewSkins = t,
                this.Store()
        },
            e.prototype.Load = function() {
            var t = localStorage.getItem(e.storage_key);
            var _t = JSON.parse(t)
            _t && (_t.tab = !0)
            t = JSON.stringify(_t)
            localStorage.setItem(e.storage_key, t)
            t && o.StorageHelper.LoadObjectProps(this, t)
        },
            e.prototype.Store = function() {
            var t = JSON.stringify(this);
            localStorage.setItem(e.storage_key, t)
        },
            e.prototype.StoreDefaultConfig = function() {
            e.default_config_json_text = JSON.stringify(this)
        },
            e.prototype.RecoverDefaultConfig = function() {
            o.StorageHelper.LoadObjectProps(this, e.default_config_json_text),
                this.Store(),
                this.resetListenerProc()
        },
            e.cellDisplayOptionPropNames = ["ShowName", "ShowMass", "ShowSelfName", "ShowSelfSkin", "ShowSkin", "ShowPelletSkin","SinglePelletsColor", "ShowEnemySkin", "ShowEnemyHint", "ShowFood", "ShowCursorLine", "ShowMassMarker", "ShowSplitPrediction", "ShowOrderRing","ShowOrderRing2", "ShowCellRing", "ShowAutoSplitAlert", "ShowSplitIndicator", "ShowEatLimitMarker", "ShowCellDirectionMarker", "TogglePlayerTransparentCells", "GlowingCells","GlowingNonPlayerCells","ShowTripKey","invisibleSelfCell"],
            e.gameDisplayOptionPropNames = ["SimpleVirus", "VirusSplitHint", /*"ShowTripKey", */"ShowMapTripKey", "ShowUnichatTripKey","MapCheat","useMouseSignal","useSpawnSignal","MapOpaque","ShowMapName", "VirusRangeHint", "ShowCoord", "GlowingBorder","AniBorder", "SimplifiedMass", "AutoHideText", "ShowReplayBar", "ShowChatBox", "ShowClientStatus", "ShowServerStatus", "ShowLeaderboard", "ShowMap","ShowSpecAimCursor", "ShowCircularName", "MarkerThin", "MarkerLight", "MarkerExtend", "ShowPlayerLog"],
            e.basicBehaviorPropNames = [/*"tab",*/"ExpendTab1Sight","TopTab1Sight","OperationWithMouseButton", "SwapMouseButtons", "AffectZoomingOnReplay", "Antialias", "HDMode", "HideMenuAfterDeath"],
            e.controlPropNames = ["hkTab","hkChangeUnit","hkSplit", "hkFeedOne", "hkFeed", "hkDoubleSplit", "hkTripleSplit", "hkQuadSplit", "hkSuperQuadSplit", "hkInfernoSplit", "hk4xLineSplit", "hkSuspend", "hkToggleSuspend","hkSuspendBoth", "hkToggleSuspendBoth","hkStartNewGame", "hkToggelSpectateTarget", "hkQuickReplayCapture", "hkToggleReplayRecording", "hkPlaybackReplay","hkMassBug","hkRefreshTab","hkF5","hkBot","hkBot1","hkBot2"],
            e.storage_key = "lwga11_user_config",
            e
    }();
    n.UserConfig = d;
    var u = function() {
        function t() {
            this.renderQuality = 800;
            this.isJapanese = r.AppConfigurator.instance.isJapanese,
                this.interpolationType = ["Fast", "Linear", "Preceding"],
                this.renderQualityTextSourceJp = ["低", "中", "高"],
                this.renderQualityTextSourceEn = ["Low", "Mid", "High"],
                this.quickCaptureTimeSource = [10, 20, 30, 40, 50, 60],
                this.frameRateSource = [10, 15, 20, 30, 60]
        }
        return Object.defineProperty(t.prototype, "RenderQualityText", {
            get: function() {
                const t = n.gs.uconfig.RenderQuality,
                      e = 100 * 2 << t;
                if (this.renderQuality != e) {
                    this.renderQuality = e;
                    GAMEPLAY_STYLE.fontSize = .13 * e >> 0;
                    GAMEPLAY_STYLE.strokeThickness = .015 * e >> 0;
                    GAMEPLAY_STYLE.lineJoin = "round";
                    PIXI.BitmapFont.from("GAMEPLAY_MASS", GAMEPLAY_STYLE, {
                        chars: [...PIXI.BitmapFont.NUMERIC],
                        resolution: 1,
                        textureWidth: 1440,
                        textureHeight: 1440
                    })
                }
                return (this.isJapanese ? this.renderQualityTextSourceJp : this.renderQualityTextSourceEn)[t]
            },
            enumerable: !0,
            configurable: !0
        }),
            Object.defineProperty(t.prototype, "InterpolationTypeText", {
            get: function() {
                var t = n.gs.uconfig.InterpolationType;
                return this.interpolationType[t]
            },
            enumerable: !0,
            configurable: !0
        }),
            Object.defineProperty(t.prototype, "InterpolationSpeedText", {
            get: function() {
                var t = -50;
                var e = t + 100 * n.gs.uconfig.InterpolationSpeed;
                return parseInt(e, 10)
            },
            enumerable: !0,
            configurable: !0
        }),
            Object.defineProperty(t.prototype, "InterpolationSpeedWidth", {
            get: function() {
                const val = n.gs.uconfig.InterpolationSpeed;
                const min = -0.5;
                const max = 1.0;
                const newVal = Number(((val - min) * 100) / (max - min));
                return `calc(${newVal}% + (${15 - newVal * 0.15}px))`
            },
            enumerable: !0,
            configurable: !0
        }),
            Object.defineProperty(t.prototype, "QuickCaptureTimeSec", {
            get: function() {
                var t = n.gs.uconfig.QuickCaptureTimeOption;
                return this.quickCaptureTimeSource[t]
            },
            enumerable: !0,
            configurable: !0
        }),
            Object.defineProperty(t.prototype, "FrameRateText", {
            get: function() {
                let t = [16, 25, 33, 50, 100];
                var e = n.gs.uconfig.FrameRateOption;
                return t[e]
            },
            enumerable: !0,
            configurable: !0
        }),
            Object.defineProperty(t.prototype, "signalKey", {
            get: function() {
                let t = ["左","中","右"];
                var e = n.gs.uconfig.signalKey;
                return t[e]
            },
            enumerable: !0,
            configurable: !0
        }),
            Object.defineProperty(t.prototype, "TargetFrameRate", {
            get: function() {
                var t = n.gs.uconfig.FrameRateOption;
                return this.frameRateSource[t]
            },
            enumerable: !0,
            configurable: !0
        }),
            t
    }();
    n.UserConfigSupport = u;
    var p = function() {
        function t() {}
        return t.texts_jp = {
            clGameBackground: "ゲーム背景",
            clGameForeground: "ゲーム前景",
            clFieldBorder: "フィールド枠",
            clFieldCoords: "フィールド座標",
            clLeaderboardBack: "LB背景",
            clLeaderboardHeader: "LBヘッダ",
            clMapBackground: "マップ背景",
            clChatBackground: "チャット背景",
            clOverlayBack: "オーバーレイ背景",
            clMainPanelBack: "パネル背景",
            clPanelForeground: "パネル前景",
            clPanelHeader: "パネルヘッダ",
            clReplayBar: "リプレイバー",
            clMenuButtons: "メニューボタン",
            clMainButtons: "メインボタン",
            clUiSymbols: "シンボル",
            clUiButtonActive: "ボタン(アクティブ)",
            clCursorLine: "カーソルライン",
            clVirusOuterStroke: "棘枠",
            clVirusInnerFill: "棘塗り",
            clVirusRangeHint: "棘の射程ヒント",
            clChatSenderName: "チャット送信者名",
            clChatTimeString: "チャット時刻",
            clChatMessage: "チャットメッセージ",
            clMarkerA: "質量マーカー ロケパンと食われる",
            clMarkerB: "質量マーカー 飛ばれると食われる",
            clMarkerC: "質量マーカー 重なると食われる",
            clMarkerD: "質量マーカー 重なれる",
            clMarkerE: "質量マーカー 重なると食える",
            clMarkerF: "質量マーカー 分裂で重ねられる",
            clMarkerG: "質量マーカー 分裂で食える",
            clMarkerH: "質量マーカー ロケパンで食える",
            clMarkerRing: "操作中の細胞の色",
            clMarkerRing2: "操作中の細胞の色2",
            clPellet: "ペレットの色",
            clGardient1: "clGardient1",
            clGardient2: "clGardient2",
            OperationWithMouseButton: "マウス操作",
            SwapMouseButtons: "左右ボタンの機能を入れ替える",
            AffectZoomingOnReplay: "リプレイ中にズーム操作を再現",
            Antialias: "アンチエイリアス",
            HDMode: "HDモード(再ロードで反映)",
            HideMenuAfterDeath: "死後のメニューを隠す",
            ShowName: "名前",
            ShowMass: "質量",
            ShowSelfName: "自分の名前",
            ShowSelfSkin: "自分のスキン",
            invisibleSelfCell: "invisibleSelfCell",
            ShowSkin: "スキン",
            ShowPelletSkin: "ペレットのスキン",
            SinglePelletsColor: "SinglePelletsColor",
            ShowEnemySkin: "敵のスキン",
            ShowEnemyHint: "敵のヒント",
            ShowFood: "ペレット",
            ShowCursorLine: "カーソルライン",
            ShowMassMarker: "質量マーカー",
            ShowSplitPrediction: "分裂順序マーカー",
            ShowOrderRing: "ShowOrderRing(type1)",
            ShowOrderRing2: "ShowOrderRing(type2)",
            changehkTab:"changehkTab",
            hkMassBug: "Massbug",
            hkRefreshTab: "hkRefreshTab",
            hkF5: "hkF5",
            hkBot: "hkBot",
            hkBot1: "hkBot(tab1)",
            hkBot2: "hkBot(tab2)",
            ShowCellRing: "ShowCellRing",
            ShowAutoSplitAlert: "自然分裂アラート",
            ShowSplitIndicator: "スプリットインジケータ",
            ShowEatLimitMarker: "捕食判定",
            ShowCellDirectionMarker: "移動方向マーカー",
            TogglePlayerTransparentCells: "細胞の透過",
            SimpleVirus: "円形棘",
            VirusSplitHint: "棘の分裂ヒント",
            VirusRangeHint: "棘の射程ヒント",
            ShowCoord: "フィールド座標",
            GlowingBorder: "フィールド枠の発光",
            AniBorder:"AniBorder(reflected on reload)",
            SimplifiedMass: "質量表示簡略化",
            AutoHideText: "名前/質量の自動非表示",
            GlowingCells: "細胞の発光",
            GlowingNonPlayerCells: "棘の発光",
            ShowTripKey: "トリップキーを表示",
            ShowMapTripKey: "トリップキーを表示(マップ)",
            ShowUnichatTripKey: "トリップキーを表示（チャット）",
            ShowMapName: "マップ上に名前を表示",
            ShowReplayBar: "リプレイバー",
            ShowChatBox: "チャット",
            ShowDetailedScore: "詳細なスコア",
            ShowClientStatus: "クライアントステータス",
            ShowServerStatus: "サーバステータス",
            ShowLeaderboard: "スコアボード",
            ShowMap: "マップ",
            MapOpaque: "細胞の不透過(ミニマップ)",
            ShowSpecAimCursor: "観戦ターゲットのカーソルを表示",
            ShowCircularName: "名前ラベルを円形に配置",
            ShowPlayerLog: "プレイヤーログ",
            MarkerThin: "マーカー薄くなること",
            MarkerLight: "マーカー軽量化",
            MarkerExtend: "マーカー拡張",
            MapCheat: "マップ拡張",
            useMouseSignal:"useMouseSignal",
            useSpawnSignal:"useSpawnSignal",
            ExpendTab1Sight: "ExpendTab1Sight",
            TopTab1Sight:"TopTab1Sight",
            tab: "追加Tab",
            hkTab: "タブ切り替え",
            hkMassBug: "massBug",
            hkRefreshTab: "hkRefreshTab",
            hkF5: "hkF5",
            hkBot: "hkBot",
            hkBot1: "hkBot(tab1)",
            hkBot2: "hkBot(tab2)",
            hkSplit: "分裂",
            hkFeedOne: "餌単発",
            hkFeed: "餌連射",
            hkChangeUnit: "ユニット切り替え",
            hkDoubleSplit: "ダブル分裂",
            hkTripleSplit: "トリプル分裂",
            hkQuadSplit: "全分裂",
            hkSuperQuadSplit: "スーパー全分裂",
            hkInfernoSplit: "インフェルノ分裂",
            hk4xLineSplit: "直線全分裂モード",
            hkSuspend: "その場で停止",
            hkToggleSuspendBoth: "その場で停止(トグル)1+2",
            hkSuspendBoth: "その場で停止1+2",
            hkToggleSuspend: "その場で停止(トグル)",
            hkStartNewGame: "ゲーム開始",
            hkToggelSpectateTarget: "観戦モード",
            hkQuickReplayCapture: "クイックキャプチャ",
            hkToggleReplayRecording: "録画/停止",
            hkPlaybackReplay: "リプレイを再生",
            hdrConfiguration: "設定",
            hdrCellDisplay: "セル表示",
            hdrGameDisplay: "ゲーム表示",
            hdrBasicOperation: "基本動作",
            hdrControl: "操作",
            lbtResetConfig: "設定初期化",
            lbtOutputConfig: "OutputConfig",
            lbtInputConfig: "InputConfig",
            lbtCameraZoomSpeed: "カメラズーム速度",
            lbtCameraMovementSpeed: "カメラ移動速度",
            lbtInterpolationType: "補間タイプ",
            lbtInterpolationResponce: "補間応答速度",
            lbtMarkerOpacity: "マーカーAlpha",
            lbtCursorLineThickness: "カーソルラインの太さ",
            lbtMarkerThickness: "MarkerThickness",
            lbtPlayerCellsAlpha: "細胞の透明度",
            lbtPlayerLabelsAlpha: "lbtSpawnLatency",
            lbtPelletCellsAlpha: "ペレット細胞の透明度",
            lbtPelletCellsAlpha: "ペレット細胞の透明度",
            lbtAnotherSectionCellsAlpha: "別セクションの細胞透明度（カフェ）",
            lbtmassBugLatency:"massBugLatency",
            lbtRenderQuality: "画質",
            lbtCaptureDuration: "キャプチャ時間",
            lbtFrameRate: "フレームレート",
            lbtSignal:"signalKey",
            hdrTheme: "テーマ",
            hdrColor: "色",
            hdrWallpaper: "壁紙",
            pelletMaterial: "ペレット材料",
            virusMaterial: "virusMaterial",
            cellMaterialLow: "セルマテリアル(低)",
            cellMaterialMedium: "セルマテリアル(ミディアム)",
            cellMaterialHigh: "セルマテリアル(高)"
        },
            t.texts_tw= {
            clGameBackground: "遊戲背景",
            clGameForeground: "遊戲前景",
            clFieldBorder: "場地邊框",
            clFieldCoords: "場地座標網格",
            clLeaderboardBack: "排行榜背景",
            clLeaderboardHeader: "排行榜標題",
            clMapBackground: "小地圖背景",
            clChatBackground: "聊天室背景",
            clOverlayBack: "背景覆蓋顏色",
            clMainPanelBack: "主選單背景",
            clPanelForeground: "主選單前景",
            clPanelHeader: "Panel Header",
            clReplayBar: "回放條顏色",
            clMenuButtons: "主選單按鈕顏色",
            clMainButtons: "選單頁面按鈕顏色",
            clUiSymbols: "按鈕字元顏色",
            clUiButtonActive: "按鈕作用中顏色",
            clCursorLine: "滑鼠指向線",
            clVirusOuterStroke: "刺球外框",
            clVirusInnerFill: "刺球填充",
            clVirusRangeHint: "刺球射程範圍",
            clChatSenderName: "聊天室名稱",
            clChatTimeString: "聊天室時間",
            clChatMessage: "聊天室內容",
            clMarkerA: "質量參考-會被雙空",
            clMarkerB: "質量參考-會被空掉",
            clMarkerC: "質量參考-會被壓死",
            clMarkerD: "質量參考-可與對方重疊",
            clMarkerE: "質量參考-可壓死對方",
            clMarkerF: "質量參考-分裂時與對方重疊",
            clMarkerG: "質量參考-可空掉",
            clMarkerH: "質量參考-可雙拍",
            clMarkerRing: "雙開標記環顏色1",
            clMarkerRing2: "雙開標記環顏色2",
            clPellet: "點點/食物顏色",
            clGardient1: "漸層場地邊框顏色1",
            clGardient2: "漸層場地邊框顏色2",
            OperationWithMouseButton: "啟用滑鼠操作",
            SwapMouseButtons: "交換滑鼠按鈕",
            AffectZoomingOnReplay: "在回放時自動縮放",
            Antialias: "反鋸齒",
            HDMode: "高畫質解析度（F5後生效）",
            HideMenuAfterDeath: "死亡後不顯示主選單",
            ShowName: "顯示名稱",
            ShowMass: "顯示質量",
            ShowSelfName: "顯示自身名稱",
            ShowSelfSkin: "顯示自身Skin",
            invisibleSelfCell: "invisibleSelfCell",
            ShowSkin: "顯示Skin",
            ShowPelletSkin: "點點/食物Skin",
            SinglePelletsColor: "單一點點顏色",
            ShowEnemySkin: "顯示敵人Skin",
            ShowEnemyHint: "顯示敵人標記",
            ShowFood: "顯示點點/食物",
            ShowCursorLine: "顯示滑鼠指向線",
            ShowMassMarker: "顯示質量參考（增強色）",
            ShowSplitPrediction: "顯示分裂順序預測標記",
            ShowAutoSplitAlert: "顯示自動分裂警告",
            ShowSplitIndicator: "顯示分裂指標",
            ShowOrderRing: "顯示雙開環（類型1）",
            ShowOrderRing2: "顯示雙開環（類型2）",
            changehkTab:"交換tab快捷鍵",
            hkMassBug: "質量bug空法",
            hkRefreshTab: "重整視野",
            hkF5: "快速重整",
            hkBot: "4×灌分",
            hkBot1: "2×灌分(tab1)",
            hkBot2: "2×灌分(tab2)",
            ShowCellRing: "顯示球球邊框",
            ShowEatLimitMarker: "顯示判斷邊界",
            ShowCellDirectionMarker: "顯示球球指向",
            TogglePlayerTransparentCells: "切換球球透明度",
            SimpleVirus: "簡易刺球",
            VirusSplitHint: "刺球次數質量轉換",
            VirusRangeHint: "顯示刺球射程",
            ShowCoord: "顯示座標網格",
            GlowingBorder: "場地邊框光暈",
            AniBorder:"漸層場地邊框（F5後生效）",
            SimplifiedMass: "簡化質量數字顯示",
            AutoHideText: "自動隱藏質量/名稱",
            GlowingCells: "發光球球",
            GlowingNonPlayerCells: "發光非玩家球球",
            ShowTripKey: "顯示TripKey",
            ShowMapTripKey: "顯示小地圖TripKey",
            ShowUnichatTripKey: "顯示聊天室TripKey",
            ShowMapName: "顯示小地圖玩家名稱",
            ShowReplayBar: "顯示回放條",
            ShowChatBox: "顯示聊天室",
            ShowClientStatus: "顯示用戶端資訊",
            ShowServerStatus: "顯示伺服器資訊",
            ShowLeaderboard: "顯示計分表",
            ShowMap: "顯示小地圖",
            MapOpaque: "地圖不透明",
            ShowSpecAimCursor: "顯示觀戰目標滑鼠指向線",
            ShowCircularName: "更改名稱以環狀顯示",
            ShowPlayerLog: "顯示玩家進出紀錄",
            MarkerThin: "纖細標記",
            MarkerExtend: "較粗標記",
            MarkerLight: "輕量化標記",
            MapCheat: "顯示全地圖",
            useMouseSignal:"呼叫隊友效果",
            useSpawnSignal:"重生呼叫效果",
            ExpendTab1Sight: "擴充 1tab 視野（Type 1）",
            TopTab1Sight:"擴充 1tab 視野（Type 2）",
            tab: "2 tab 額外分身",
            hkTab: "2 tab 切換控制",
            hkSplit: "分裂",
            hkFeedOne: "單次餵食",
            hkFeed: "持續餵食",
            hkChangeUnit: "1 tab 切換控制",
            hkDoubleSplit: "雙空",
            hkTripleSplit: "三空",
            hkQuadSplit: "16分",
            hkSuperQuadSplit: "Super Quad Split",
            hkInfernoSplit: "InfernoSplit",
            hk4xLineSplit: "4x Line Split Mode",
            hkSuspend: "暫停球球",
            hkToggleSuspend: "靜止球球",
            hkSuspendBoth: "暫停球球1+2",
            hkToggleSuspendBoth: "靜止球球1+2",
            hkStartNewGame: "快速開始",
            hkToggelSpectateTarget: "觀戰第一名",
            hkQuickReplayCapture: "快速錄製",
            hkToggleReplayRecording: "開始/停止錄製",
            hkPlaybackReplay: "回放",
            Debug_DisableSkinLoad: "不載入skin（偵錯）",
            UseFastInterpolation: "動畫物理速度",
            hdrConfiguration: "主要設定",
            hdrCellDisplay: "細胞顯示",
            hdrGameDisplay: "遊戲顯示",
            hdrBasicOperation: "基本設定",
            hdrControl: "快捷鍵設定",
            lbtResetConfig: "重設設定",
            lbtOutputConfig: "匯出設定",
            lbtInputConfig: "匯入設定",
            lbtCameraZoomSpeed: "視角縮放速度",
            lbtCameraMovementSpeed: "視角移動速度",
            lbtInterpolationType: "動畫插值類型",
            lbtInterpolationResponce: "動畫速度",
            lbtMarkerOpacity: "標記透明度",
            lbtCursorLineThickness: "滑鼠指向線粗細",
            lbtMarkerThickness: "標記粗細",
            lbtPlayerCellsAlpha: "玩家細胞透明度",
            lbtPlayerLabelsAlpha: "玩家名稱透明度",
            lbtPelletCellsAlpha: "點點/食物透明度",
            lbtSpawnLatency: "重生延遲",
            lbtAnotherSectionCellsAlpha: "其他分區透明度（Caffe）",
            lbtmassBugLatency:"質量bug延遲",
            lbtRenderQuality: "渲染質量",
            lbtCaptureDuration: "錄製時間",
            lbtFrameRate: "幀率",
            lbtSignal:"呼叫信號快捷鍵",
            hdrTheme: "主題設定",
            hdrColor: "色彩",
            hdrWallpaper: "背景圖片",
            pelletMaterial: "點點/食物skin",
            virusMaterial: "刺球skin",
            cellMaterialLow: "低畫質球材質",
            cellMaterialMedium: "中畫質球材質",
            cellMaterialHigh: "高畫質球材質"
        },
            t.texts_cn= {
            clGameBackground: "游戏背景",
            clGameForeground: "游戏前景",
            clFieldBorder: "场地边框",
            clFieldCoords: "场地座标网格",
            clLeaderboardBack: "排行榜背景",
            clLeaderboardHeader: "排行榜标题",
            clMapBackground: "小地图背景",
            clChatBackground: "聊天室背景",
            clOverlayBack: "背景覆盖颜色",
            clMainPanelBack: "主选单背景",
            clPanelForeground: "主选单前景",
            clPanelHeader: "Panel Header",
            clReplayBar: "回放条颜色",
            clMenuButtons: "主选单按钮颜色",
            clMainButtons: "选单页面按钮颜色",
            clUiSymbols: "按钮字元颜色",
            clUiButtonActive: "按钮作用中颜色",
            clCursorLine: "滑鼠指向线",
            clVirusOuterStroke: "刺球外框",
            clVirusInnerFill: "刺球填充",
            clVirusRangeHint: "刺球射程范围",
            clChatSenderName: "聊天室名称",
            clChatTimeString: "聊天室时间",
            clChatMessage: "聊天室内容",
            clMarkerA: "质量参考-会被双空",
            clMarkerB: "质量参考-会被空掉",
            clMarkerC: "质量参考-会被压死",
            clMarkerD: "质量参考-可与对方重叠",
            clMarkerE: "质量参考-可压死对方",
            clMarkerF: "质量参考-分裂时与对方重叠",
            clMarkerG: "质量参考-可空掉",
            clMarkerH: "质量参考-可双拍",
            clMarkerRing: "双开标记环颜色1",
            clMarkerRing2: "双开标记环颜色2",
            clPellet: "点点/食物颜色",
            clGardient1: "渐层场地边框颜色1",
            clGardient2: "渐层场地边框颜色2",
            OperationWithMouseButton: "启用滑鼠操作",
            SwapMouseButtons: "交换滑鼠按钮",
            AffectZoomingOnReplay: "在回放时自动缩放",
            Antialias: "反锯齿",
            HDMode: "高画质解析度（F5后生效）",
            HideMenuAfterDeath: "死亡后不显示主选单",
            ShowName: "显示名称",
            ShowMass: "显示质量",
            ShowSelfName: "显示自身名称",
            ShowSelfSkin: "显示自身Skin",
            invisibleSelfCell: "invisibleSelfCell",
            ShowSkin: "显示Skin",
            ShowPelletSkin: "点点/食物Skin",
            SinglePelletsColor: "單一點點顏色",
            ShowEnemySkin: "显示敌人Skin",
            ShowEnemyHint: "显示敌人标记",
            ShowFood: "显示点点/食物",
            ShowCursorLine: "显示滑鼠指向线",
            ShowMassMarker: "显示质量参考（增强色）",
            ShowSplitPrediction: "显示分裂顺序预测标记",
            ShowAutoSplitAlert: "显示自动分裂警告",
            ShowSplitIndicator: "显示分裂指标",
            ShowOrderRing: "显示双开环（类型1）",
            ShowOrderRing2: "显示双开环（类型2）",
            changehkTab:"交换tab快捷键",
            hkMassBug: "质量bug空法",
            hkRefreshTab: "重整视野",
            hkF5: "快速重整",
            hkBot: "4×灌分",
            hkBot1: "2×灌分(tab1)",
            hkBot2: "2×灌分(tab2)",
            ShowCellRing: "显示球球边框",
            ShowEatLimitMarker: "显示判断边界",
            ShowCellDirectionMarker: "显示球球指向",
            TogglePlayerTransparentCells: "切换球球透明度",
            SimpleVirus: "简易刺球",
            VirusSplitHint: "刺球次数质量转换",
            VirusRangeHint: "显示刺球射程",
            ShowCoord: "显示座标网格",
            GlowingBorder: "场地边框光晕",
            AniBorder:"渐层场地边框（F5后生效）",
            SimplifiedMass: "简化质量数字显示",
            AutoHideText: "自动隐藏质量/名称",
            GlowingCells: "发光球球",
            GlowingNonPlayerCells: "发光非玩家球球",
            ShowTripKey: "显示TripKey",
            ShowMapTripKey: "显示小地图TripKey",
            ShowUnichatTripKey: "显示聊天室TripKey",
            ShowMapName: "显示小地图玩家名称",
            ShowReplayBar: "显示回放条",
            ShowChatBox: "显示聊天室",
            ShowClientStatus: "显示用户端资讯",
            ShowServerStatus: "显示伺服器资讯",
            ShowLeaderboard: "显示计分表",
            ShowMap: "显示小地图",
            MapOpaque: "地图不透明",
            ShowSpecAimCursor: "显示观战目标滑鼠指向线",
            ShowCircularName: "更改名称以环状显示",
            ShowPlayerLog: "显示玩家进出纪录",
            MarkerThin: "纤细标记",
            MarkerExtend: "较粗标记",
            MarkerLight: "轻量化标记",
            MapCheat: "显示全地图",
            useMouseSignal:"呼叫队友效果",
            useSpawnSignal:"重生呼叫效果",
            ExpendTab1Sight: "扩充 1tab 视野（Type 1）",
            TopTab1Sight:"扩充 1tab 视野（Type 2）",
            tab: "2 tab 额外分身",
            hkTab: "2 tab 切换控制",
            hkSplit: "分裂",
            hkFeedOne: "单次喂食",
            hkFeed: "持续喂食",
            hkChangeUnit: "1 tab 切换控制",
            hkDoubleSplit: "双空",
            hkTripleSplit: "三空",
            hkQuadSplit: "16分",
            hkSuperQuadSplit: "Super Quad Split",
            hkInfernoSplit: "InfernoSplit",
            hk4xLineSplit: "4x Line Split Mode",
            hkSuspend: "暂停球球",
            hkToggleSuspend: "静止球球",
            hkSuspendBoth: "暂停球球1+2",
            hkToggleSuspendBoth: "静止球球1+2",
            hkStartNewGame: "快速开始",
            hkToggelSpectateTarget: "观战第一名",
            hkQuickReplayCapture: "快速录制",
            hkToggleReplayRecording: "开始/停止录制",
            hkPlaybackReplay: "回放",
            Debug_DisableSkinLoad: "不载入skin（侦错）",
            UseFastInterpolation: "动画物理速度",
            hdrConfiguration: "主要设定",
            hdrCellDisplay: "细胞显示",
            hdrGameDisplay: "游戏显示",
            hdrBasicOperation: "基本设定",
            hdrControl: "快捷键设定",
            lbtResetConfig: "重设设定",
            lbtOutputConfig: "汇出设定",
            lbtInputConfig: "汇入设定",
            lbtCameraZoomSpeed: "视角缩放速度",
            lbtCameraMovementSpeed: "视角移动速度",
            lbtInterpolationType: "动画插值类型",
            lbtInterpolationResponce: "动画速度",
            lbtMarkerOpacity: "标记透明度",
            lbtCursorLineThickness: "滑鼠指向线粗细",
            lbtMarkerThickness: "标记粗细",
            lbtPlayerCellsAlpha: "玩家细胞透明度",
            lbtPlayerLabelsAlpha: "玩家名称透明度",
            lbtPelletCellsAlpha: "点点/食物透明度",
            lbtSpawnLatency: "lbtSpawnLatency",
            lbtAnotherSectionCellsAlpha: "其他分区透明度（Caffe）",
            lbtmassBugLatency:"质量bug延迟",
            lbtRenderQuality: "渲染质量",
            lbtCaptureDuration: "录制时间",
            lbtFrameRate: "帧率",
            lbtSignal:"呼叫信号快捷键",
            hdrTheme: "主题设定",
            hdrColor: "色彩",
            hdrWallpaper: "背景图片",
            pelletMaterial: "点点/食物skin",
            virusMaterial: "刺球skin",
            cellMaterialLow: "低画质球材质",
            cellMaterialMedium: "中画质球材质",
            cellMaterialHigh: "高画质球材质"
        },
            t.texts_en = {
            clGameBackground: "Game background",
            clGameForeground: "Game Foreground",
            clFieldBorder: "Field border",
            clFieldCoords: "field coordinates",
            clLeaderboardBack: "LB background",
            clLeaderboardHeader: "LB header",
            clMapBackground: "Map background",
            clChatBackground: "Chat Background",
            clOverlayBack: "Overlay Background",
            clMainPanelBack: "Panel Background",
            clPanelForeground: "Panel Foreground",
            clPanelHeader: "Panel Header",
            clReplayBar: "Replay Bar",
            clMenuButtons: "Menu Buttons",
            clMainButtons: "Main Buttons",
            clUiSymbols: "Symbols",
            clUiButtonActive: "Button (active)",
            clCursorLine: "Cursor Line",
            clVirusOuterStroke: "Spine Frame",
            clVirusInnerFill: "thorns",
            clVirusRangeHint: "Thorn range hint",
            clChatSenderName: "Chat sender name",
            clChatTimeString: "Chat time",
            clChatMessage: "Chat message",
            clMarkerA: "mass marker location pan and eaten",
            clMarkerB: "mass marker eats when flying",
            clMarkerC: "mass marker eats when overlapped",
            clMarkerD: "Mass Marker Overlapping",
            clMarkerE: "Mass marker eats when overlapped",
            clMarkerF: "Mass marker superimposed on split",
            clMarkerG: "mass marker can be eaten by fission",
            clMarkerH: "Mass Marker can be eaten on location bread",
            clMarkerRing: "Current cell color",
            clMarkerRing2: "Current cell color 2",
            clPellet: "Pellet color",
            clGardient1: "clGardient1",
            clGardient2: "clGardient2",
            OperationWithMouseButton: "mouse operation",
            SwapMouseButtons: "Swap left and right button functions",
            AffectZoomingOnReplay: "Affect zooming during replay",
            Antialias: "Antialias",
            HDMode: "HD mode (reflected on reload)",
            HideMenuAfterDeath: "Hide menu after death",
            ShowName: "Name",
            ShowMass: "Mass",
            ShowSelfName: "Your name",
            ShowSelfSkin: "My skin",
            invisibleSelfCell: "invisibleSelfCell",
            ShowSkin: "Skin",
            ShowPelletSkin: "Pellet Skin",
            SinglePelletsColor: "SinglePelletsColor",
            ShowEnemySkin: "Enemy Skin",
            ShowEnemyHint: "Enemy Hint",
            ShowFood: "Pellets",
            ShowCursorLine: "Cursor Line",
            ShowMassMarker: "Mass Marker",
            ShowSplitPrediction: "Split order marker",
            ShowOrderRing: "ShowOrderRing(type1)",
            ShowOrderRing2: "ShowOrderRing(type2)",
            changehkTab:"changehkTab",
            hkMassBug: "Massbug",
            hkRefreshTab: "hkRefreshTab",
            hkF5: "hkF5",
            hkBot: "hkBot",
            hkBot1: "hkBot(tab1)",
            hkBot2: "hkBot(tab2)",
            ShowCellRing: "ShowCellRing",
            ShowAutoSplitAlert: "AutoSplit Alert",
            ShowSplitIndicator: "Split indicator",
            ShowEatLimitMarker: "Predation detection",
            ShowCellDirectionMarker: "Moving Direction Marker",
            TogglePlayerTransparentCells: "Transparent cells",
            SimpleVirus: "Circular spine",
            VirusSplitHint: "Spike Split Hint",
            VirusRangeHint: "Spike range hint",
            ShowCoord: "Field coordinates",
            GlowingBorder: "Glowing field border",
            AniBorder:"AniBorder(reflected on reload)",
            SimplifiedMass: "Simplified mass display",
            AutoHideText: "Autohide name/mass",
            GlowingCells: "Glowing Cells",
            GlowingNonPlayerCells: "Glowing Thorns",
            ShowTripKey: "Show Trip Key",
            ShowMapTripKey: "Show Trip Key (Map)",
            ShowUnichatTripKey: "Show Trip Key (Chat)",
            ShowMapName: "Show name on map",
            ShowReplayBar: "Replay Bar",
            ShowChatBox: "Chat",
            ShowDetailedScore: "Detailed Score",
            ShowClientStatus: "Client Status",
            ShowServerStatus: "Server status",
            ShowLeaderboard: "Scoreboard",
            ShowMap: "Map",
            MapOpaque: "MapOpaque",
            ShowSpecAimCursor: "Show SpecAim Cursor",
            ShowCircularName: "Arrange Name Labels Circularly",
            ShowPlayerLog: "Player Log",
            MarkerThin: "Marker thinning",
            MarkerLight: "Marker lightening",
            MarkerExtend: "Marker extension",
            MapCheat: "Map extension",
            useMouseSignal:"useMouseSignal",
            useSpawnSignal:"useSpawnSignal",
            ExpendTab1Sight: "ExpendTab1Sight",
            TopTab1Sight:"TopTab1Sight",
            tab: "Additional Tab",
            hkTab: "Switch tab",
            hkMassBug: "massBug",
            hkRefreshTab: "hkRefreshTab",
            hkF5: "hkF5",
            hkBot: "hkBot",
            hkBot1: "hkBot(tab1)",
            hkBot2: "hkBot(tab2)",
            hkSplit: "Split",
            hkFeedOne: "One feed",
            hkFeed: "Feed barrage",
            hkChangeUnit: "Unit change",
            hkDoubleSplit: "Double split",
            hkTripleSplit: "Triple split",
            hkQuadSplit: "Full split",
            hkSuperQuadSplit: "Super QuadSplit",
            hkInfernoSplit: "Inferno Split",
            hk4xLineSplit: "Linear full split mode",
            hkSuspend: "Suspend now",
            hkToggleSuspendBoth: "Suspend in place (toggle) 1+2",
            hkSuspendBoth: "Suspend in place 1+2",
            hkToggleSuspend: "Suspend in place (toggle)",
            hkStartNewGame: "Game start",
            hkToggelSpectateTarget: "spectator mode",
            hkQuickReplayCapture: "Quick Capture",
            hkToggleReplayRecording: "Record/Stop",
            hkPlaybackReplay: "Play replay",
            hdrConfiguration: "Settings",
            hdrCellDisplay: "Cell display",
            hdrGameDisplay: "Game display",
            hdrBasicOperation: "Basic operation",
            hdrControl: "Control",
            lbtResetConfig: "Reset configuration",
            lbtOutputConfig: "OutputConfig",
            lbtInputConfig: "InputConfig",
            lbtCameraZoomSpeed: "Camera zoom speed",
            lbtCameraMovementSpeed: "Camera movement speed",
            lbtInterpolationType: "Interpolation type",
            lbtInterpolationResponce: "Interpolation response speed",
            lbtMarkerOpacity: "Marker Alpha",
            lbtCursorLineThickness: "Cursor line thickness",
            lbtMarkerThickness: "MarkerThickness",
            lbtPlayerCellsAlpha: "Cell transparency",
            lbtPlayerLabelsAlpha: "lbtPlayerLabelsAlpha",
            lbtPelletCellsAlpha: "Transparency of pellet cells",
            lbtSpawnLatency: "lbtSpawnLatency",
            lbtAnotherSectionCellsAlpha: "Another Section Cell Transparency (Caffe)",
            lbtmassBugLatency:"massBugLatency",
            lbtRenderQuality: "Quality",
            lbtCaptureDuration: "capture duration",
            lbtFrameRate: "Frame rate",
            lbtSignal:"signalKey",
            hdrTheme: "Theme",
            hdrColor: "color",
            hdrWallpaper: "wallpaper",
            pelletMaterial: "pelletMaterial",
            virusMaterial: "virusMaterial",
            cellMaterialLow: "cellMaterial(low)",
            cellMaterialMedium: "cellMaterial(medium)",
            cellMaterialHigh: "cellMaterial(high)"
        },
            t
    }(),
        f = function() {
            return function() {
                this.gconfig = new s,
                    this.gstates = new a,
                    this.uconfig = new d,
                    this.ucolors = new h,
                    this.usupport = new u
                const lan = navigator.language.slice(0, 2)
                switch (lan) {
                    case 'jp':
                        this.utexts = p.texts_jp
                        break;
                    case 'zh':
                        var simplified = navigator.language.split('-')
                        switch(simplified[1]){
                            case 'TW':
                                this.utexts = p.texts_tw
                                break;
                            case 'CN':
                                this.utexts = p.texts_cn
                                break;
                            default:
                                this.utexts = p.texts_tw
                                break;
                        }
                        break;
                    case 'ms':
                        this.utexts = p.texts_tw
                        break;
                    default:
                        this.utexts = p.texts_en
                }
            }
        }();
    n.GlobalObject = f,
        n.gs = new f
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = function() {
        function t() {}
        return t.Confirm = function(t) {},
            t
    }();
    e.Utils = i;
    var o = function() {
        function e() {}
        return e.RandF = function() {
            return Math.random()
        },
            e.RandFD = function() {
            return 2 * Math.random() - 1
        },
            e.RandI = function(t) {
            return e.RandF() * t >> 0
        },
            e.InRange = function(t, e, n) {
            return e <= t && t <= n
        },
            e.Clamp = function(t, e, n) {
            return Math.max(e, Math.min(t, n))
        },
            e.VMap = function(t, e, n, i, o, r) {
            void 0 === r && (r = !1);
            var s = (t - e) * (o - i) / (n - e) + i;
            if (r) {
                var a = Math.min(i, o),
                    l = Math.max(i, o);
                return this.Clamp(s, a, l)
            }
            return s
        },
            e.MapTo = function(t, e, n) {
            return t * (n - e) + e
        },
            e.Lerp = function(t, e, n) {
            return (1 - n) * t + n * e
        },
            e.EasyFilter = function(t, e, n) {
            return n * t + (1 - n) * e
        },
            e.HiLimit = function(t, e) {
            return Math.min(t, e)
        },
            e.LoLimit = function(t, e) {
            return Math.max(t, e)
        },
            e
    }();
    e.Nums = o;
    var r = function() {
        function t() {}
        return t.Remove = function(t, e) {
            var n = t.indexOf(e);
            return n >= 0 && (t.splice(n, 1),
                              !0)
        },
            t.Count = function(t, e) {
            for (var n = 0, i = 0, o = t; i < o.length; i++) {
                e(o[i]) && n++
            }
            return n
        },
            t.Exclude = function(t, e) {
            for (var n = [], i = 0, o = t; i < o.length; i++) {
                var r = o[i]; -
                    1 == e.indexOf(r) && n.push(r)
            }
            return n
        },
            t.First = function(t, e) {
            for (var n = 0, i = t; n < i.length; n++) {
                var o = i[n];
                if (e(o))
                    return o
            }
            return null
        },
            t
    }();
    e.Arrays = r;
    var s = function() {
        function t() {}
        return t.CopyObjectProps = function(t, e) {
            for (var n in e)
                t.hasOwnProperty(n) && (t[n] = e[n])
        },
            t
    }();
    e.Objects = s;
    var a = function() {
        function t() {}
        return t.FormatDate = function(t, e) {
            function n(t) {
                return ("0" + t).slice(-2)
            }
            e || (e = new Date);
            var i = {
                YYYY: e.getFullYear(),
                YY: n(e.getFullYear()),
                MM: n(e.getMonth() + 1),
                DD: n(e.getDate()),
                hh: n(e.getHours()),
                mm: n(e.getMinutes()),
                ss: n(e.getSeconds())
            },
                o = t;
            for (var r in i)
                o = o.replace(r, i[r]);
            return o
        },
            t.GetCurrentTimeStamp = function() {
            return t.FormatDate("YY/MM/DD hh:mm:ss")
        },
            t.GetTodayString = function() {
            return t.FormatDate("YYMMDD")
        },
            t.GetHourMinutesString = function() {
            return t.FormatDate("hh:mm")
        },
            t.GetSystemTimeSec = function() {
            return Date.now() / 1e3
        },
            t
    }();
    e.DateTimeHelper = a;
    var l = function() {
        function n(t, e) {
            void 0 === t && (t = 0),
                void 0 === e && (e = 0),
                this.x = t,
                this.y = e
        }
        return Object.defineProperty(n.prototype, "Norm", {
            get: function() {
                return Math.sqrt(this.x * this.x + this.y * this.y)
            },
            enumerable: !0,
            configurable: !0
        }),
            Object.defineProperty(n.prototype, "Angle", {
            get: function() {
                return Math.atan2(this.y, this.x)
            },
            enumerable: !0,
            configurable: !0
        }),
            n.prototype.Normalize = function() {
            var t = this.Norm;
            return t >= 11754943e-45 && (this.x = this.x / t,
                                         this.y = this.y / t),
                this
        },
            n.prototype.Scale = function(t) {
            return this.x *= t,
                this.y *= t,
                this
        },
            n.prototype.Add = function(t) {
            return this.x += t.x,
                this.y += t.y,
                this
        },
            n.prototype.Set = function(t, e) {
            return this.x = t,
                this.y = e,
                this
        },
            n.prototype.CopyFrom = function(t) {
            return this.x = t.x,
                this.y = t.y,
                this
        },
            n.Subtract = function(t, e) {
            return new n(t.x - e.x, t.y - e.y)
        },
            n.prototype.ClampXY = function(t, e, n, i) {
            return this.x = o.Clamp(this.x, t, n),
                this.y = o.Clamp(this.y, e, i),
                this
        },
            n.IsEqual = function(t, e) {
            return t.x == e.x && t.y == e.y
        },
            n.GetDist = function(t, e) {
            var n = e.x - t.x,
                i = e.y - t.y;
            return Math.sqrt(n * n + i * i)
        },
            n.GetAngle = function(t, e) {
            var n = t.x - e.x,
                i = t.y - e.y;
            return Math.atan2(i, n)
        },
            n.FromPolar = function(t, e) {
            return new n(Math.cos(t) * e, Math.sin(t) * e)
        },
            n.prototype.AddPolar = function(t, e) {
            this.x += Math.cos(t) * e,
                this.y += Math.sin(t) * e
        },
            n.prototype.MakeCopy = function() {
            return new n(this.x, this.y)
        },
            n.DotProduct = function(t, e) {
            return t.x * e.x + t.y * e.y
        },
            n.CrossProduct = function(t, e) {
            return t.x * e.y - t.y * e.x
        },
            n
    }();
    e.Vector = l
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var o = n(3),
        i = function() {
            function t() {
                this.MaxProfileNum = 32,
                    this.useUniChat = !1,
                    this.gameServerAddress = null,
                    this.showDualSkinInputUi = !1,
                    this.showPartyCodeInputUi = !0,
                    this.defaultFieldBackImageUri = "",
                    this.defaultPanelBackImageUri = "",
                    this.siteTitleString = "",
                    this.leaderboardHeaderText = "Leaderboard",
                    this.showTeamRanking = !1,
                    this.useIxTrackerServer = !1,
                    this.trackerServerUri = null,
                    this.trackerServerTargetSite = null,
                    this.showAllServers = !1,
                    this.insertionContent = null,
                    this.allowOnlyForJapaneseLangUser = !1,
                    this.Setup()
            }
            return t.prototype.SetupUnichat = function(t, e, n, i,o) {
                this.useUniChat = o,
                    this.uniChatServerAddress = t,
                    this.uniChatSiteSignature = e,
                    this.uniChatServerSignature = n,
                    this.useTeamSeparatedChat = i
            },
                t.prototype.Setup = function() {
                var csig = o.AppHelper.GetChatSignature()
                var site = csig == "caffe" ? (site = "_caffe") : (site = "ix")
                var separatedChat = csig == "caffe" ? (separatedChat = !1) : (separatedChat = !0)
                this.isJapanese = navigator.language.startsWith("zh");
            var t = "ws://chat2.ixagar.net:4590";
            this.siteTitleString = "";
            this.leaderboardHeaderText = "Leaderboard";
            if (gTargetSite == "sao") {
                this.gameServerAddress = "ws://sv-sao.senpai-agar.online:2525";
                this.SetupUnichat(t, site, csig, separatedChat,!0),
                this.showPartyCodeInputUi = !0,
                this.siteTitleString = "SENPAI-AGAR.ONLINE",
                this.leaderboardHeaderText = "S.A.O.",
                this.showTeamRanking = !0
            } else if (gTargetSite == "caffe") {
                this.gameServerAddress = "ws://sv-caffe.senpai-agar.online:2520",
                this.SetupUnichat(t, "_caffe", "caffe", !1,!0),
                this.showTeamRanking = !0,
                this.leaderboardHeaderText = "Caffe"
            } 
            else {
                if (gTargetSite == "EA-Nano") {
                    this.gameServerAddress = "ws://hk.cwal.io:8888"
                } else if (gTargetSite == "EA-Sandbox") {
                    this.gameServerAddress = "ws://osa.cwal.io:8888"
                } else if (gTargetSite == "NA-Nano") {
                    this.gameServerAddress = "ws://na.cwal.io:8888"
                } else {
                    localStorage.setItem("selected_server", "EA-Nano");
                    this.gameServerAddress = "ws://tyo.cwal.io:8888"
                }
                this.SetupUnichat(t, "ix", "EA-SAO1", !0,!1),
                this.showPartyCodeInputUi = !0,
                this.showTeamRanking = !0
            }
                    this.targetSite = e;
                var n = o.AppHelper.GetQueryObject();
                if (n.target) {
                    var i = n.target;
                    i.startsWith("localhost") && (this.gameServerAddress = "ws://" + i,
                                                  this.useIxTrackerServer = !1)
                }
                n.showAll && (this.showAllServers = !0)
            },
                t.instance = new t,
                t
        }();
    e.AppConfigurator = i
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var h = n(1),
        i = function() {
            function o() {}
            return o.GenerateRandomUserEnvSig = function(t) {
                for (var e = "", n = o.CodeChars, i = 0; i < t; i++) {
                    e += n[Math.floor(Math.random() * n.length)]
                }
                return e
            },
                o.GetUserEnironmentSignature = function() {
                var t = localStorage.getItem("UniChatUserSignature");
                return t || (t = o.GenerateRandomUserEnvSig(6),
                             localStorage.setItem("UniChatUserSignature", t)),
                    t
            },
                o.GetChatSignature = function() {
                var t = localStorage.getItem("UniChatServerSignature");
                return t || (t = "EA-SAO1",
                             localStorage.setItem("UniChatServerSignature", t)),
                    t
            },
                o.EmbedHyperlink = function(t) {
                return t.replace(/(http:\/\/[\x21-\x7e]+)/gi, '<a href=$1 target="_blank">$1</a>')
            },
                o.GetQueryObject = function() {
                var o = {};
                return location.search.replace("?", "").split("&").forEach(function(t) {
                    var e = t.split("=");
                    if (2 == e.length) {
                        var n = e[0],
                            i = e[1];
                        o[n] = i
                    }
                }),
                    o
            },
                o.CodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
                o
        }();
    e.AppHelper = i;
    var o = function() {
        function t() {}
        return t.LoadObjectProps = function(t, e) {
            try {
                var n = JSON.parse(e);
                for (var i in n)
                    if (t.hasOwnProperty(i)) {
                        var o = t[i],
                            r = n[i];
                        o instanceof Object ? h.Objects.CopyObjectProps(o, r) : t[i] = r
                    }
            } catch (t) {}
        },
            t
    }();
    e.StorageHelper = o;
    var r = function() {
        function t() {}
        return t.ColorFromConfigColorString = function(t) {
            if ("#" != t[0])
                return 0;
            var e = 255,
                n = 0,
                i = 0,
                o = 0;
            return 8 == (t = t.slice(1, t.length)).length ? (e = parseInt(t.slice(0, 2), 16),
                                                             n = parseInt(t.slice(2, 4), 16),
                                                             i = parseInt(t.slice(4, 6), 16),
                                                             o = parseInt(t.slice(6, 8), 16)) : 6 == t.length ? (n = parseInt(t.slice(0, 2), 16),
                                                                                                                 i = parseInt(t.slice(2, 4), 16),
                                                                                                                 o = parseInt(t.slice(4, 6), 16)) : 4 == t.length ? (e = 17 * parseInt(t[0], 16),
                        n = 17 * parseInt(t[1], 16),
                        i = 17 * parseInt(t[2], 16),
                        o = 17 * parseInt(t[3], 16)) : 3 == t.length && (n = 17 * parseInt(t[0], 16),
                                                                         i = 17 * parseInt(t[1], 16),
                                                                         o = 17 * parseInt(t[2], 16)),
                isNaN(e) || isNaN(n) || isNaN(i) || isNaN(o) ? 0 : e << 24 | n << 16 | i << 8 | o
        },
            t.ColorToCssColorString = function(t) {
            return "rgba(" + (t >> 16 & 255) + "," + (t >> 8 & 255) + "," + (255 & t) + "," + (t >> 24 & 255) / 255 + ")"
        },
            t.GetAlpha = function(t) {
            return (t >> 24 & 255) / 255
        },
            t.FormatColorByte = function(t) {
            var e = t.toString(16).toUpperCase();
            return 1 == e.length && (e = "0" + e),
                e
        },
            t.invertColor = function(hex) {
            if (hex.indexOf('#') === 0) {
                hex = hex.slice(1);
            }
            if (hex.length === 3) {
                hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
            }
            if (hex.length !== 6) {
                throw new Error('Invalid HEX color.');
            }
            var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
                g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
                b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
            return '#' + this.padZero(r) + this.padZero(g) + this.padZero(b);
        }
        ,
            t.padZero = function(str, len) {
                len = len || 2;
                var zeros = new Array(len).join('0');
                return (zeros + str).slice(-len);
            },
            t.ColorToHtmlString = function(t) {
            var e = t >> 16 & 255,
                n = t >> 8 & 255,
                i = 255 & t;
            return "#" + this.FormatColorByte(e) + this.FormatColorByte(n) + this.FormatColorByte(i)
        },
            t.ColorFromHtmlString = function(t) {
            if (7 != t.length || "#" != t[0])
                return 8947848;
            var e = parseInt(t.slice(1, 3), 16),
                n = parseInt(t.slice(3, 5), 16),
                i = parseInt(t.slice(5, 7), 16);
            return isNaN(e) || isNaN(n) || isNaN(i) ? 8947848 : e << 16 | n << 8 | i
        },
            t.ColorFromHtmlStringInput = function(t, e) {
            if (7 != t.length || "#" != t[0])
                return -1;
            var n = parseInt(t.slice(1, 3), 16),
                i = parseInt(t.slice(3, 5), 16),
                o = parseInt(t.slice(5, 7), 16);
            return isNaN(n) || isNaN(i) || isNaN(o) ? -1 : e << 24 || n << 16 | i << 8 | o
        },
            t.GetHSV = function(t) {
            var e = (t >> 16 & 255) / 255,
                n = (t >> 8 & 255) / 255,
                i = (255 & t) / 255,
                o = Math.max(e, n, i),
                r = Math.min(e, n, i),
                s = 0;
            if (o != r) {
                var a = o - r;
                (s = (e == o ? (n - i) / a : n == o ? 2 + (i - e) / a : 4 + (e - n) / a) / 6) < 0 && (s += 1)
            }
            return [s, (o - r) / o, o]
        },
            t.ColorFromHSVA = function(t, e, n, i) {
            var o = (1 - e) * n,
                r = n - o,
                s = 6 * t,
                a = 0,
                l = 0,
                c = 0;
            return s < 1 ? (a = n,
                            l = s * r + o,
                            c = o) : s < 2 ? (a = (2 - s) * r + o,
                                              l = n,
                                              c = o) : s < 3 ? (a = o,
                                                                l = n,
                                                                c = (s - 2) * r + o) : s < 4 ? (a = o,
                                                                                                l = (4 - s) * r + o,
                                                                                                c = n) : s < 5 ? (a = (s - 4) * r + o,
                                                                                                                  l = o,
                                                                                                                  c = n) : (a = n,
                                                                                                                            l = o,
                                                                                                                            c = (6 - s) * r + o),
                255 * i >> 0 << 24 | 255 * a >> 0 << 16 | 255 * l >> 0 << 8 | 255 * c >> 0
        },
            t.ReplaceAlpha = function(t) {
            var e = this.GetHSV(t);
            return this.ColorFromHSVA(e[0], e[1], e[2], 0)
        },
            t
    }();
    e.ColorHelper = r;
    var s = function() {
        function t() {}
        return t.RadiusToMass = function(t) {
            return t * t / 100
        },
            t.MassToRadius = function(t) {
            return Math.sqrt(100 * t)
        },
            t.GenarateRandomColor = function() {
            var t = [255, h.Nums.RandI(100), h.Nums.RandI(256)].sort(function() {
                return h.Nums.RandFD()
            });
            return t[0] << 16 | t[1] << 8 | t[2]
        },
            t.CheckIsInEatableSection = function(t, e) {
            return t == e || "**" == t || "**" == e
        },
            t.DecodePlayerId = function(t) {
            return [65534 & t, 1 & t]
        },
            t.GetDist = function(t, e, n, i) {
            var o = n - t,
                r = i - e;
            return Math.sqrt(o * o + r * r)
        },
            t.VectorDotProduct = function(t, e, n, i) {
            return t * n + e * i
        },
            t.VectorCrossProduct = function(t, e, n, i) {
            return t * i - e * n
        },
            t.GetLinePointDist = function(t, e, n, i, o, r) {
            var s = new h.Vector(n - t, i - e),
                a = new h.Vector(o - t, r - e);
            if (h.Vector.DotProduct(s, a) < 0)
                return a.Norm;
            var l = new h.Vector(t - n, e - i),
                c = new h.Vector(o - n, r - i);
            return h.Vector.DotProduct(l, c) < 0 ? c.Norm : Math.abs(h.Vector.CrossProduct(s, a)) / s.Norm
        },
            t.HitTestAABB = function(t, e, n, i, o) {
            var r = n - t,
                s = i - i;
            return -o <= r && r <= o && -o <= s && s <= o
        },
            t.TrimNameAndTeamName = function(t, e) {
            if (t.length > 15)
                t = t.substring(0, 15),
                    e = "";
            else {
                var n = 15 - t.length;
                e.length > n && (e = e.substring(0, n))
            }
            return [t, e]
        },
            t
    }();
    e.GameHelper = s;
    var a = function() {
        function e() {}
        return e.Start = function(t) {
            e.sig = t,
                e.t0 = performance.now()
        },
            e.Stop = function() {
            if (performance.now() - e.t0 > 50) {
                var t = e.sig;
                console.log("long execution : " + t)
            }
        },
            e
    }();
    e.TimeChecker = a;
    var l = function() {
        function t(t, e) {
            this.capacity = t,
                this.pool = new Array(t);
            for (var n = 0; n < t; n++)
                this.pool[n] = e();
            this.genProc = e
        }
        return t.prototype.Gain = function() {
            if (this.pool.length <= 0)
                return this.genProc();
            var t = this.pool.pop();
            return t
        },
            t.prototype.Release = function(t) {
            this.pool.push(t)
        },
            t.prototype.Maintain = function() {
            if (this.pool.length <= this.capacity / 4) {
                for (var t = 0; t < 8; t++)
                    this.pool.push(this.genProc())
            } else if (this.pool.length >= this.capacity) {
                this.pool.pop()
            }
        },
            t
    }();
    e.ObjectPool = l;
    var c = function() {
        function t() {
            this.activeKeepTimeSec = 180,
                this.deactivedTick = 0,
                this.t0 = 0
        }
        return Object.defineProperty(t.prototype, "IsHidden", {
            get: function() {
                return document.hidden
            },
            enumerable: !0,
            configurable: !0
        }),
            t.prototype.Update = function() {
            var t = performance.now(),
                e = t - this.t0;
            this.t0 = t,
                document.hasFocus() ? this.deactivedTick = 0 : this.deactivedTick += .001 * e
        },
            Object.defineProperty(t.prototype, "IsActive", {
            get: function() {
                return this.deactivedTick < this.activeKeepTimeSec
            },
            enumerable: !0,
            configurable: !0
        }),
            t.Instance = new t,
            t
    }();
    e.PageHelper = c
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var p;
    var l = n(1),
        i = n(38),
        o = n(37),
        r = n(13),
        s = n(36),
        a = n(35),
        c = n(34),
        f = n(0),
        h = n(2),
        d = n(33),
        u = n(3),
        g = n(13),
        m = n(31),
        y = n(30),
        L = n(4),
        v = n(29),
        st = n(18),
        S = function() {
            return function() {
                this.avgDuration = 0,
                    this.avgRate = 0,
                    this.avgFps = 0,
                    this.numCellsRendered = 0,
                    this.replayBufferBytes = 0,
                    this.debugObj = {}
            }
        }();
    e.GamePerformanceStateModel = S;
    var b = function() {
        function t() {
            var e = this;
            this.tick = 0,
                this.seqUseInfoStrSent = null,
                this.perfModel = new S,
                this.serverUriCash = null,
                this.userEntryMan = new a.UserEntryManager,
                this.userEntryMan.Load(),
                this.uMan = new i.UserInfoManager,
                this.dataRecorder = new o.DataRecorder,
                this.nodeMan = new r.NodeManager(this),
                this.conn = new s.ConnectionBridge,
                this.sight = new c.SightCoord(this),
                this.benchDataFeeder = new m.PerfBenchDataFeeder(this),
                this.conn.packetHandlerProc = this.dataRecorder.PostPacketFromServer.bind(this.dataRecorder),
                this.conn.connectionOpenProc = function(s) {
                e.conn.SendSessionInitialize(u.AppHelper.GenerateRandomUserEnvSig(6), s)
                //s == 2 ? e.conn.SendSessionInitialize(u.AppHelper.GenerateRandomUserEnvSig(6), s) : e.conn.SendSessionInitialize(u.AppHelper.GetUserEnironmentSignature(), s),//caffe error
                    e.SendSelfEntryInfoIfChanged(s),
                    e.conn.SendRequestStartSpectate(s)
            },
                this.conn.connectionClosedProc = function(t,tab) {
                console.log("connection closed " + t),
                    (t = t.indexOf("serverMaxConnections (") >= 0 ? "伺服器已滿人下次請早</br>Server is full house. Please access after a while.</br>満員です。しばらく時間をおいてからアクセスしてください。" : "")
            };
                this.ReloadAppConfig();
                this.gameHudModel = new v.GameHudModel
        }
        return t.prototype.ShowDebugValue = function(t, e) {
            this.perfModel.debugObj[t] = e
        },
            Object.defineProperty(t.prototype, "ReplayControllerModel", {
            get: function() {
                return this.dataRecorder
            },
            enumerable: !0,
            configurable: !0
        }),t.prototype.ReloadAppConfig = function() {
            var t = h.AppConfigurator.instance;
            t.Setup();
            t.useIxTrackerServer && (this.serverListModel = new v.ServerListModel(this));
            if (t.useUniChat) {
                if (this.chatAppModel) {
                    this.chatAppModel.bridge.Close()
                }
                this.chatAppModel = new d.ChatAppModel;
                this.chatAppModel.SetUserEnvSig(u.AppHelper.GetUserEnironmentSignature());
                this.chatAppModel.SetChatServerUri(t.uniChatServerAddress);
                this.chatAppModel.SetGameTeamChatSessionEnabled(t.useTeamSeparatedChat);
                this.chatAppModel.SetSiteSignature(t.uniChatSiteSignature);
                this.chatAppModel.SetServerSignature(t.uniChatServerSignature, !1);
                this.chatAppModel.gameChatMessageReceiverProc = this.nodeMan.PostExternalChatMessage.bind(this.nodeMan);
                window.chatAppModel = this.chatAppModel
            }
            if (!t.useUniChat) {
                if (this.chatAppModel) {
                    this.chatAppModel.bridge.Close()
                }
            }
        }
        ,
            t.prototype.SendSplitAction = function(t,tab) {
            if (f.gs.gstates.isSpectate) {
                return
            }
            this.gameHudModel.specTargetName = null;
            this.sight.splitting = !0,
                this.conn.SendPlayerAction(0, t,tab)
        },
            t.prototype.sendWaves = function(x1, y1, color1, length, sender, moreAnimation) {
              var wave = {
                x: x1,
                y: y1
              }
              wave.time = Date.now();
              wave.color = color1;
			  wave.wavelength = length;
			  wave.sender = sender;
			  wave.moreAnimation = moreAnimation
          gVar.Waves.push(wave)
            //gVar.mapWaves.push(wave)
		},
            t.prototype.StartPlay = function() {
            f.gs.gstates.isBenchmarkMode || ((this.SendSelfEntryInfoIfChanged(),
                                              !gVar.conn1.isAlive && (this.conn.SendSpecifySpecTarget(-1) , this.conn.SendRequestStartPlay()),
                                              gVar.swap && f.gs.uconfig.tab && gVar.conn1.isAlive && !gVar.conn2.isAlive && (this.conn.SendSpecifySpecTarget(-1,2) , this.conn.SendRequestStartPlay(2)),
                                              f.gs.gstates.isPlaying = !0,
                                              f.gs.gstates.isDeadSpectation = !1,
                                              this.gameHudModel.ResetMaxScore()),
                                             this.userEntryMan.SaveIfChanged(),
                                             f.gs.gstates.setMainPanelVisible(!1),gVar.pressPlay = !0,setTimeout(() => (gVar.pressPlay = !1), f.gs.uconfig.SpawnLatency))
        },
            t.prototype.StartSpectate = function() {
            f.gs.gstates.isBenchmarkMode || (f.gs.gstates.isPlaying ? f.gs.gstates.setMainPanelVisible(!1) : (this.SendSelfEntryInfoIfChanged(),
                                                                                                              this.userEntryMan.SaveIfChanged(),
                                                                                                              f.gs.gstates.isDeadSpectation = !1,
                                                                                                              f.gs.gstates.setMainPanelVisible(!1))),
            !gVar.conn1.isAlive && this.conn.SendRequestStartSpectate(),
            f.gs.uconfig.tab && !gVar.conn2.isAlive && this.conn.SendRequestStartSpectate(2),
            f.gs.uconfig.tab ? (!gVar.conn2.isAlive && !gVar.conn1.isAlive) && (f.gs.gstates.isPlaying=!1,f.gs.gstates.isDeadSpectation = !1) : !gVar.conn2.isAlive && (f.gs.gstates.isPlaying=!1,f.gs.gstates.isDeadSpectation = !1)
        },
            t.prototype.ToggleBenchMarkMode = function() {
            if (f.gs.gstates.isBenchmarkMode)
                f.gs.gstates.isBenchmarkMode = !1,
                    this.benchDataFeeder.Stop(),
                    f.gs.gstates.setMainPanelVisible(!0),
                    this.ConnectToGameServer();
            else {
                f.gs.gstates.isBenchmarkMode = !0,
                    this.CloseConnection(),
                    this.nodeMan.OnEnterBenchMarkMode();
                f.gs.gconfig.FieldSize;
                this.benchDataFeeder.Start(),
                    f.gs.gstates.setMainPanelVisible(!1)
            }
        },
            t.prototype.KeyboardInputHandler = function(t, i) {
            if ("INPUT" == document.activeElement.tagName)
                return !1;
            if (i && 27 == t.keyCode && (f.gs.gstates.setMainPanelVisible(!f.gs.gstates.isMainPanelVisible)),
                !i && 9 == t.KeyCode)
                return !0;
            if (this.sight.initDone && !f.gs.gstates.isBenchmarkMode) {
                var e = t.keyCode;
                t.ctrlKey && (e += f.ModificationKeyCode.Ctrl),
                    t.shiftKey && (e += f.ModificationKeyCode.Shift),
                    t.altKey && (e += f.ModificationKeyCode.Alt);
                var n = f.gs.uconfig.controlHotKeys;
                const l = () => {
                    const t = this.sight;
                    const e = (t.mouseX - t.scw / 2) / t.eyeScale + t.eyeX;
                    const n = (t.mouseY - t.sch / 2) / t.eyeScale + t.eyeY;
                    this.conn.SendAimCursor(e, n),
                        t.aimXSent = e,
                        t.aimYSent = n
                };
                if (f.gs.gstates.isRealtimeMode) {
                    if (e == n.hkSuspendBoth) {
                        stopMouse = 0;
                        this.conn.SendPlayerAction(5, i ? 0 : 1,1);
                        //this.conn.SendPlayerAction(5, i ? 0 : 1,2);
                        return !0
                    }
                    if (e == n.hkSuspend) {
                        stopMouse = 0;
                        this.conn.SendPlayerAction(5, i ? 0 : 1);
                        return !0
                    }
                    if (e == n.hk4xLineSplit) {
                        let t = this.nodeMan.operationUnitIndex;
                        const c = this.nodeMan.selfNodeIds[t];
                        if (c.length != 1) {
                            stopMouse = 0;
                            return
                        }
                        const s = this.sight;
                        const h = c[0];
                        const e = this.nodeMan.nodes.get(h);
                        const d = e.nx;
                        const n = e.ny;
                        if (d != s.aimXSent || n != s.aimYSent) {
                            this.conn.SendAimCursor(d, n),
                                s.aimXSent = d >> 0,
                                s.aimYSent = n >> 0
                        }
                        stopMouse = i;
                        if (i) {
                            p = setInterval(() => {
                                if (c.length != 1) {
                                    clearInterval(p);
                                    return
                                }
                                if (e.nx == s.aimXSent && e.ny == s.aimYSent) {
                                    setTimeout(() => {
                                        if (c.length != 1) {
                                            return
                                        }
                                        this.gameHudModel.specTargetName = "4x Line Split is available";
                                        this.gameHudModel.SetSpecTargetScore(0)
                                    }, 1e3);
                                    clearInterval(p)
                                }
                            }, 35)
                        } else {
                            this.gameHudModel.specTargetName = null;
                            clearInterval(p)
                        }
                        return !0
                    }
                    if (i && e == n.hkToggleSuspend && (this.isSuspend = !this.isSuspend,
                                                        this.conn.SendPlayerAction(5, this.isSuspend ? 0 : 1)),
                        e == n.hkFeed) {
                        if (stopMouse) {
                            stopMouse = 0
                        }
                        this.conn.SendPlayerAction(4, i ? 1 : 0);
                        return !0
                    }
                    if (i && e == n.hkToggleSuspendBoth){
                        this.isSuspend = !this.isSuspend,
                            this.conn.SendPlayerAction(5, this.isSuspend ? 0 : 1,1),
                            this.conn.SendPlayerAction(5, this.isSuspend ? 0 : 1,2)
                        return !0
                    }
                    if (e == n.hkDoubleSplit) {
                        stopMouse = 0,
                            l(),
                            stopMouse = i ? 1 : 0,
                            i ? this.SendSplitAction(2) : 0,
                            setTimeout(() => stopMouse = 0, 600);
                        return !0
                    }
                    if (e == n.hkTripleSplit) {
                        l();
                        const u = stopMouse;
                        stopMouse = i ? 1 : 0;
                        this.conn.SendPlayerAction(5, i ? 0 : 1);
                        if (i && !u) {
                            this.SendSplitAction(3)
                        }
                        return !0
                    }
                    if (e == n.hkSuperQuadSplit) {
                        l();
                        const u = stopMouse;
                        stopMouse = i ? 1 : 0;
                        this.conn.SendPlayerAction(5, i ? 0 : 1);
                        if (i && !u) {
                            this.SendSplitAction(4)
                        }
                        return !0
                    }
                }
                /*var o = !1,
                    r = f.gs.uconfig;
                for (var s in r.holdHotKeys) {
                    if (e == r.holdHotKeys[s]) {
                        var a = r[s];
                        r.SetValue(s, !a),
                            o = !0
                    }
                }*/
                if (i) {
                    if (e == n.hkStartNewGame) {
                        if (f.gs.gstates.isBenchmarkMode)
                            return !1;
                        if (!f.gs.gstates.isPlaying)
                            return this.StartPlay(),
                                !0
                    }
                    if (e == n.hkToggelSpectateTarget)
                        return this.conn.SendSpecifySpecTarget(0),this.conn.SendSpecifySpecTarget(0,2)
                            !0;
                    if (e == n.hkQuickReplayCapture)
                        return this.dataRecorder.DoInstantCapture(),
                            !0;
                    if (e == n.hkToggleReplayRecording)
                        return this.dataRecorder.ToggleRecording(),
                            !0;
                    if (e == n.hkPlaybackReplay)
                        return this.dataRecorder.isReplayMode ? this.dataRecorder.EndReplayMode() : this.dataRecorder.TogglePlayback(),
                            !0;
                    if (f.gs.gstates.isRealtimeModePlaying) {
                        if (e == n.hkMassBug) {
                            const s = this.sight;
                            const h = s.eyeX;
                            const e = s.eyeY;
                            this.SendSplitAction(1),
                                setTimeout(() => this.conn.SendPlayerAction(3, -1),L.gameCore.gameHudModel.latencyMs * f.gs.uconfig.massBugLatency),
                                setTimeout(() => this.SendSplitAction(4),L.gameCore.gameHudModel.latencyMs * f.gs.uconfig.massBugLatency),
                                this.conn.SendAimCursor(h, e),
                                setTimeout(() => this.conn.SendPlayerAction(3, -1),200),
                                stopMouse = 0
                            return !0;
                        }
                        if(e == n.hkRefreshTab){
                            this.nodeMan.PostClearAllNodes();
                            gVar.pressPlay = !0,setTimeout(() => (gVar.pressPlay = !1), f.gs.uconfig.SpawnLatency)
                        }
                        if(e == n.hkF5){
                            this.conn.ws.close()
                            this.node && this.node.PostClearAllNodes()
                            L.gameCore.SelfUnitsDeadProc(1)
                            gVar.pressPlay = !0,setTimeout(() => (gVar.pressPlay = !1), f.gs.uconfig.SpawnLatency)
                        }
                        if(e == n.hkBot){
                            gVar.useBot = !gVar.useBot;
                            gVar.botType = 2;
                            !gVar.useBot && (gVar.lock = !1)
                        }
                        if(e == n.hkBot1){
                            gVar.useBot = !gVar.useBot;
                            gVar.botType = 1;
                            !gVar.useBot && (gVar.lock = !1)
                        }
                        if(e == n.hkBot2){
                            gVar.useBot = !gVar.useBot;
                            gVar.botType = 3;
                            !gVar.useBot && (gVar.lock = !1)
                        }
                        if (e == n.hkSplit) {
                            return stopMouse = 0,
                                l(),
                                this.SendSplitAction(1),
                                !0
                        }
                        if (e == n.hkFeedOne) {
                            return this.conn.SendPlayerAction(1, -1),
                                stopMouse = 0,
                                !0
                        }
                        if (e == n.hkQuadSplit) {
                            return this.SendSplitAction(4),
                                !0
                        }
                        if (e == n.hkInfernoSplit) {
                            this.SendSplitAction(2);
                            this.conn.SendPlayerAction(3, -1);
                            l();
                            stopMouse = 0;
                            this.SendSplitAction(4);
                            return !0
                        }
                    }
                    if(!gVar.swap){
                        if (e == n.hkChangeUnit) {
                        if (p) {
                            clearInterval(p)
                        }
                        if(!gVar.conn1.isAlive){
                            console.log("SendRequestStartPlay 1"),
                                this.conn.SendRequestStartPlay(),
                                f.gs.gstates.isPlaying = !0,
                                f.gs.gstates.isDeadSpectation = !1,
                                f.gs.gstates.setMainPanelVisible(!1),
                                gVar.pressPlay = !0,
                                setTimeout(() => (gVar.pressPlay = !1), f.gs.uconfig.SpawnLatency)
                        }
                        else{
                            this.conn.SendPlayerAction(3, -1)
                            l(),
                                stopMouse = 0
                        }
                        return !0

                    }
                    }                        
                    
                    
                    if(gVar.swap){
                        if (e == n.hkChangeUnit){
                        this.conn.SendPlayerAction(4, 0);
                        gVar.controlConn2 = !gVar.controlConn2;
                        if(gVar.controlConn2 && !gVar.conn2.isAlive){
                            this.StartPlay()
                                gVar.pressPlay = !0,
                                setTimeout(() => (gVar.pressPlay = !1), 300)
                        }
                        if(!gVar.controlConn2 && !gVar.conn1.isAlive){
                            this.StartPlay()
                                gVar.pressPlay = !0,
                                setTimeout(() => (gVar.pressPlay = !1), 300)
                        }
                        return !0
                        }
                        if (e == n.hkTab) {
                        if (p) {
                            clearInterval(p)
                        }
                        if(!gVar.conn1.isAlive){
                            console.log("SendRequestStartPlay 1"),
                                this.conn.SendRequestStartPlay(),
                                f.gs.gstates.isPlaying = !0,
                                f.gs.gstates.isDeadSpectation = !1,
                                f.gs.gstates.setMainPanelVisible(!1),
                                gVar.pressPlay = !0,
                                setTimeout(() => (gVar.pressPlay = !1), f.gs.uconfig.SpawnLatency)
                        }
                        else{
                            this.conn.SendPlayerAction(3, -1)
                            l(),
                                stopMouse = 0
                        }
                        return !0

                    }
                        }
                    
                    /*for (var s in r.toggleHotKeys) {
                        if (e == r.toggleHotKeys[s]) {
                            a = r[s];
                            r.SetValue(s, !a),
                                o = !0
                        }
                    }*/
                }
                /*return !!o && (this.gameHudModel.configUpdatedProc(),
                               !0)*/
            }
        },
            t.prototype.MouseInputHandler = function(t, e) {
            if (!f.gs.gstates.isBenchmarkMode) {
                var n = f.gs.uconfig,
                    i = 0,
                    o = 2,
                    mouse = n.signalKey,
                    size = f.gs.gconfig.FieldSize/300;

                   $("#map_outer").unbind('click').click(function(e){
                        gVar.mapSelect = true;
                        let xPos = e.pageX - $(this).offset().left;
                        let yPos = e.pageY - $(this).offset().top;
                        L.gameCore.conn.SendSpecifySpecTarget(-1,2)
                        L.gameCore.conn.SendAimCursor(xPos*size, yPos*size,2);

                    })
                if (e) {
                    if (true) {
                        var r = this.sight.ScreenToWorld(this.sight.mouseX, this.sight.mouseY),
                                s = r[0],
                                a = r[1],
                                l = this.nodeMan.GetPlayerIdUnderCursor(s, a);
                        if (t == o) {
                            this.conn.SendSpecifySpecTarget(l),
                                this.conn.SendSpecifySpecTarget(l,2),
                                gVar.target = l
                            gVar.mapSelect = false
                                gVar.lock = !gVar.lock
                                gVar.tempx = s
                                gVar.tempy = a
                        }
                        if(t == i){
                            this.conn.SendSpecifySpecTarget(-1),
                                this.isSuspend && (this.isSuspend = !1,
                                                   this.conn.SendPlayerAction(5, this.isSuspend ? 0 : 1))
                        }
                        if(t == mouse){
                            if(f.gs.uconfig.useMouseSignal){
                            this.sendWaves(s, a, 'FFFFFF', 500, 'test', true);
                            let seqString = "wave,"+parseInt(s).toString()+","+parseInt(a).toString();
                            (gTargetSite == "sao") && this.chatAppModel.SendMessageOnGameChatSession(seqString)
                            }
                        }
                    }
                    t == i && f.gs.gstates.isBenchmarkMode,
                        f.gs.gstates.isReplayMode && (t == i && this.dataRecorder.TogglePlayback(),
                                                      t == o && (this.dataRecorder.EndReplayMode(),
                                                                 this.dataRecorder.Notify()))
                }
                n.OperationWithMouseButton && (n.SwapMouseButtons && (i = 2,
                                                                      o = 0),
                                               f.gs.gstates.isRealtimeModePlaying && (t == i && e ? this.SendSplitAction(1) : t == o ? this.conn.SendPlayerAction(4, e ? 1 : 0) : 1 == t && e && this.SendSplitAction(4)))
            }
        },
            t.prototype.SelfUnitsDeadProc = function(tab) {
            if(!gVar.useBot && gVar.swap){
                if(tab == 2 || tab == 3){
                    gVar.controlConn2 = !1
                }
                if(tab == 1){
                    gVar.controlConn2 = !0
                }
            }
            var t = this;
            stopMouse = 0;
            this.gameHudModel.specTargetName = null;
            if(tab==3){
                if(f.gs.gstates.isPlaying && !this.dataRecorder.isLoading){
                    !gVar.useBot && (f.gs.gstates.isPlaying = !1),
                        f.gs.gstates.isDeadSpectation = !1,
                        this.sight.OnPlayerDead(),
                        this.gameHudModel.ResetMaxScore(),
                        f.gs.gstates.playerDeadCallbackProc(),
                        f.gs.gstates.playerDeadTimeStamp = Date.now()
                    /*,
                        setTimeout(function() {
                        return //t.conn.SendRequestStartSpectate(1),t.conn.SendRequestStartSpectate(2)
                    }, 100)*/
                }
            }
            else{
                if(f.gs.gstates.isPlaying && !this.dataRecorder.isLoading){
                    f.gs.gstates.isDeadSpectation = !0,
                        f.gs.gstates.playerDeadCallbackProc(),
                        setTimeout(function() {
                        return t.conn.SendRequestStartSpectate(tab)
                    }, 100)
                    setTimeout(function() {
                        return t.conn.SendSpecifySpecTarget(-1,tab)
                    }, 100)
                }
            }
        },
            t.prototype.SendSelfEntryInfoIfChanged = function(tab) {

            var t = this.userEntryMan.curInfo
            , e = t.MakeSequenceString();
            if (this.seqUseInfoStrSent != e) {
                var n = t.code;
                f.gs.gconfig.IsolateBlankTagPlayers && "" == t.team && (n = u.AppHelper.GetUserEnironmentSignature());
                var o = u.GameHelper.TrimNameAndTeamName(t.team, t.name)
                , r = o[0]
                , s = o[1]
                , _o = u.GameHelper.TrimNameAndTeamName(t.tabTeam, t.tabName)
                , _r = _o[0]
                , _s = _o[1];
                l.Utils.Confirm(r.length + s.length <= 15),
                    this.conn.SendUserEntryInfo(s, r, n, t.skinUrl, t.skinUrl2, 1),
                    f.gs.uconfig.tab && this.conn.SendUserEntryInfo(_s, _r, t.tabCode, t.tabSkinUrl, t.tabSkinUrl2, 2),
                    this.chatAppModel && this.chatAppModel.SetUserEntryInfo(s, r, n, t.skinUrl, t.profileIndex),
                    this.seqUseInfoStrSent = e
            }
        },
            t.prototype.SendChatMessage = function(t) {
            if (this.chatAppModel)
                this.chatAppModel.SendMessageOnGameChatSession(t);
            else {
                var e = this.uMan.selfUserId;
                this.conn.SendChatMessage(t, e)
            }
        },
            t.prototype.StatesUpdationProc = function() {
            setTimeout(this.StatesUpdationProc.bind(this), 1e3),
                u.TimeChecker.Start("StatusUpdationProc"),
                this.nodeMan.RecordLatencyCheckStartTime(),
                this.conn.SendLatencyCheckRequest(),
                this.conn.SendLatencyCheckRequest(2),
                this.conn.SendLatencyCheckRequest(3),
                this.nodeMan.UpdateSelfScore(),
                this.perfModel.replayBufferBytes = this.dataRecorder.totalBytes,
                this.dataRecorder.DiscardUnnecessaryPackets();
            this.perfModel.debugObj,
                g.TNodeData.Pool.capacity,
                g.TNodeData.Pool.pool.length;
            u.TimeChecker.Stop()
        },
            t.prototype.Initialize = function() {
            var n = this;
            this.dataRecorder.Initialize(this.nodeMan);
            var t = document.querySelector("#game_control_overlay");
            window.addEventListener("keydown", function(t) {
                t.repeat || n.KeyboardInputHandler(t, !0) && t.preventDefault()
            }),
                window.addEventListener("keyup", function(t) {
                n.KeyboardInputHandler(t, !1) && t.preventDefault()
            }),
                window.onmousedown = function(t) {
                f.gs.gstates.isMainPanelVisible || n.MouseInputHandler(t.button, !0)
            },
                window.onmouseup = function(t) {
                f.gs.gstates.isMainPanelVisible || n.MouseInputHandler(t.button, !1)
            },
                window.oncontextmenu = function(t) {
                return t.preventDefault(),
                    !1
            },
                window.onmousemove = function(t) {
                n.sight.mouseX = t.clientX,
                    n.sight.mouseY = t.clientY
            };
            var e = function(t) {
                var e = t.wheelDelta / 120 * f.gs.uconfig.CameraZoomSpeed / 100;
                f.gs.gstates.isBenchmarkMode || n.sight.ShiftScale(e)
            };
            navigator.userAgent.indexOf("Firefox") >= 0 ? t.addEventListener("DOMMouseScroll", e, !1) : t.onmousewheel = e,
                this.nodeMan.selfUnitsDeadCallback = this.SelfUnitsDeadProc.bind(this),
                this.StatesUpdationProc()
        },
            t.prototype.Reset = function() {
            this.seqUseInfoStrSent = null,
                this.isSuspend = !1
        },
            t.prototype.ConnectToGameServer = function(t) {
            void 0 === t && (t = null),
                t || (t = h.AppConfigurator.instance.gameServerAddress);
            var e = t.split("//")[1].split(":"),
                n = e[0],
                i = parseInt(e[1]);
            window.GameServerHost = n,
                window.GameServerPort = i,
                this.sight.initDone = !1,
                this.isSuspend = !1,
                this.gameHudModel.ClearChatMessages(),
                this.nodeMan.ResetToInitialiState(),
                this.dataRecorder.Reset(),
                this.uMan.Reset(),
                this.Reset(),
                this.conn.ConnectToGameServer(t),
                (gTargetSite=='caffe') && this.conn.ConnectToGameServer(t, 2),
                this.serverUriCash = t
        },
            t.prototype.ConnectToGameServerEx = function(t, e) {
            f.gs.gstates.chatRoomSig = e,
                this.ConnectToGameServer(t)
        },
            t.prototype.CloseConnection = function() {
            this.sight.initDone = !1,
                this.conn.CloseConnection()
        },
            t
    }();
    e.GameCore = b,
        console.log("gamecore 20230718"),
        e.gameCore = new b
}, function(t, o, e) {
    "use strict";
    Object.defineProperty(o, "__esModule", {
        value: !0
    });
    var n = function() {
        function t() {
            riot.observable(this)
        }
        return t.prototype.on = function(t, e) {},
            t.prototype.one = function(t, e) {},
            t.prototype.off = function(t) {},
            t.prototype.trigger = function(t) {
            for (var e = [], n = 1; n < arguments.length; n++)
                e[n - 1] = arguments[n]
        },
            t
    }();
    o.Observable = n;
    var i = function() {
        function t() {}
        return t.prototype.update = function(t) {},
            t.prototype.unmount = function(t) {},
            t.prototype.on = function(t, e) {},
            t.prototype.one = function(t, e) {},
            t.prototype.off = function(t) {},
            t.prototype.trigger = function(t) {
            for (var e = [], n = 1; n < arguments.length; n++)
                e[n - 1] = arguments[n]
        },
            t.prototype.mixin = function(t, e) {},
            t.createElement = function(t) {
            var e = this.prototype.tagName,
                n = document.createElement(e);
            return riot.mount(n, e, t),
                n
        },
            t
    }();

    function r(e) {
        var t;
        if (void 0 === e.prototype.template)
            throw "template property not specified";
        var n, i = e.prototype.template;
        i.indexOf("<") < 0 ? void 0 !== o.precompiledTags[i] ? t = o.precompiledTags[i] : (i = function(t) {
            var e = new XMLHttpRequest;
            if (e.open("GET", t, !1),
                e.send(),
                200 == e.status)
                return e.responseText;
            throw e.responseText
        }(i),
                                                                                           t = riot.compile(i, !0, {
            entities: !0
        })[0]) : t = riot.compile(i, !0, {
            entities: !0
        })[0],
            e.prototype.tagName = (n = t,
                                   riot.tag2(n.tagName, n.html, n.css, n.attribs, function(t) {
            ! function(t, n) {
                var e = Object.keys(n.prototype).reduce(function(t, e) {
                    return t[e] = Object.getOwnPropertyDescriptor(n.prototype, e),
                        t
                }, {});
                Object.defineProperties(t, e)
            }(this, e),
                e.apply(this, [t]),
                void 0 !== e.prototype.mounted && this.on("mount", this.mounted),
                void 0 !== e.prototype.unmounted && this.on("unmount", this.unmounted),
                void 0 !== e.prototype.updating && this.on("update", this.updating),
                void 0 !== e.prototype.updated && this.on("updated", this.updated)
        }, riot.settings.brackets),
                                   n.tagName)
    }
    o.Element = i,
        o.precompiledTags = {},
        o.registerClass = r,
        o.template = function(e) {
        return function(t) {
            t.prototype.template = e,
                r(t)
        }
    }
}, function(t, e) {
    t.exports = PIXI
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var l = n(8),
        i = function() {
            function t() {}
            return t.SessionInitialize = function(t) {
                var e = new l.DataFrameWriter;
                return e.WriteUint8(252),
                    e.WriteStringEx("lwga-111"),
                    e.WriteStringEx(t),
                    e.ArrayBuffer
            },
                t.AimCursor = function(t, e) {
                var n = new l.DataFrameWriter;
                return n.WriteUint8(16),
                    n.WriteInt32(t >> 0),
                    n.WriteInt32(e >> 0),
                    n.ArrayBuffer
            },
                t.UserEntryInfo = function(t, e, n, i, o) {
                var r = new l.DataFrameWriter;
                return r.WriteUint8(30),
                    r.WriteStringEx(t),
                    r.WriteStringEx(e),
                    r.WriteStringEx(i),
                    r.WriteStringEx(n),
                    r.WriteStringEx(o),
                    r.ArrayBuffer
            },
                t.RequestStartPlay = function() {
                var t = new l.DataFrameWriter;
                return t.WriteUint8(31),
                    t.ArrayBuffer
            },
                t.RequestStartSpectate = function() {
                var t = new l.DataFrameWriter;
                return t.WriteUint8(1),
                    t.ArrayBuffer
            },
                t.PlayerAction = function(t, e) {
                var n = new l.DataFrameWriter;
                return n.WriteUint8(25),
                    n.WriteUint8(t),
                    n.WriteUint8(e),
                    n.ArrayBuffer
            },
                t.ChatMessage = function(t, e) {
                var n = new l.DataFrameWriter;
                return n.WriteUint8(128),
                    n.WriteUint16(e),
                    n.WriteStringEx(""),
                    n.WriteStringEx(t),
                    n.ArrayBuffer
            },
                t.LatencyCheckRequest = function() {
                var t = new l.DataFrameWriter;
                return t.WriteUint8(130),
                    t.ArrayBuffer
            },
                t.SpecifySpecTarget = function(t) {
                var e = new l.DataFrameWriter;
                return e.WriteUint8(27),
                    e.WriteInt32(t),
                    e.ArrayBuffer
            },
                t
        }();
    e.Packets = i;
    var o = function() {
        function t() {}
        return t.NodeRemoval = function(t) {
            var e = new l.DataFrameWriter;
            return e.WriteUint8(161),
                e.WriteUint32(t),
                e.ArrayBuffer
        },
            t.UserEntryInfo = function(t, e, n, i, o, r) {
            var s = new l.DataFrameWriter;
            return s.WriteUint8(162),
                s.WriteUint16(t),
                s.WriteStringEx(e),
                s.WriteStringEx(n),
                s.WriteUint16(i),
                s.WriteStringEx(o),
                s.WriteStringEx(r),
                s.ArrayBuffer
        },
            t.PlayerColor = function(t, e) {
            var n = new l.DataFrameWriter;
            return n.WriteUint8(163),
                n.WriteUint16(t),
                n.WriteUint32(e),
                n.ArrayBuffer
        },
            t.TeamColor = function(t, e) {
            var n = new l.DataFrameWriter;
            return n.WriteUint8(164),
                n.WriteUint16(t),
                n.WriteUint32(e),
                n.ArrayBuffer
        },
            t.MoveSightToward = function(t, e, n) {
            var i = new l.DataFrameWriter;
            return i.WriteUint8(165),
                i.WriteInt32(t >> 0),
                i.WriteInt32(e >> 0),
                i.WriteFloat32(n),
                i.ArrayBuffer
        },
            t.SightState = function(t, e, n, i, o, r, s) {
            var a = new l.DataFrameWriter;
            return a.WriteUint8(166),
                a.WriteInt32(t >> 0),
                a.WriteInt32(e >> 0),
                a.WriteFloat32(n),
                a.WriteInt32(i >> 0),
                a.WriteInt32(o >> 0),
                a.WriteUint8(r ? 1 : 0),
                a.WriteUint16(s),
                a.ArrayBuffer
        },
            t
    }();
    e.InternalPackets = o
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = function() {
        function t(t) {
            this.bytes = new Uint8Array(t),
                this.pos = 0
        }
        return Object.defineProperty(t.prototype, "Length", {
            get: function() {
                return this.bytes.length
            },
            enumerable: !0,
            configurable: !0
        }),
            t.prototype.ReadUint8 = function() {
            return this.bytes[this.pos++]
        },
            t.prototype.ReadUint16 = function() {
            return this.ReadUint8() | this.ReadUint8() << 8
        },
            t.prototype.ReadUint32 = function() {
            var t = this.ReadUint8(),
                e = this.ReadUint8(),
                n = this.ReadUint8();
            return this.ReadUint8() << 24 | n << 16 | e << 8 | t
        },
            t.prototype.ReadInt16 = function() {
            var t = this.ReadUint16();
            return t >= 32768 && (t -= 65536),
                t
        },
            t.prototype.ReadUint16BE = function() {
            return this.ReadUint8() << 8 | this.ReadUint8()
        }
        ,
            t.prototype.ReadInt32 = function() {
            var t = this.ReadUint32();
            return t >= 2147483648 && (t -= 4294967295),
                t
        },
            t.prototype.ReadFloat32 = function() {
            var t = this.ReadUint32(),
                e = new ArrayBuffer(4);
            return new Uint32Array(e)[0] = t,
                new Float32Array(e)[0]
        },
            t.prototype.ReadStringEx = function() {
            for (var t = this.ReadUint16(), e = "", n = 0; n < t; n++)
                e += String.fromCharCode(this.ReadUint16());
            return e
        },
            t.prototype.ReadStringUTF8 = function() {
            let t = "", e;
            while ((e = this.ReadUint8()) !== 0)
                t += String.fromCharCode(e);
            return decodeURIComponent(escape(t))
        }
        ,
            t
    }();
    e.DataFrameReader = i;
    var o = function() {
        function t() {
            this.bytes = []
        }
        return Object.defineProperty(t.prototype, "Buffer", {
            get: function() {
                return this.bytes
            },
            enumerable: !0,
            configurable: !0
        }),
            Object.defineProperty(t.prototype, "ArrayBuffer", {
            get: function() {
                return new Uint8Array(this.bytes).buffer
            },
            enumerable: !0,
            configurable: !0
        }),
            t.prototype.WriteUint8 = function(t) {
            this.bytes.push(t)
        },
            t.prototype.WriteUint16 = function(t) {
            this.bytes.push(255 & t),
                this.bytes.push(t >> 8 & 255)
        },
            t.prototype.WriteInt16 = function(t) {
            t < 0 && (t += 65536),
                this.WriteUint16(t)
        },
            t.prototype.WriteUint16BE = function(t) {
            this.bytes.push(t >> 8 & 255);
            this.bytes.push(255 & t)
        }
        ,
            t.prototype.WriteUint32 = function(t) {
            this.bytes.push(255 & t),
                this.bytes.push(t >> 8 & 255),
                this.bytes.push(t >> 16 & 255),
                this.bytes.push(t >> 24 & 255)
        },
            t.prototype.WriteUint64 = function(t) {
            this.bytes.push(255 & t),
                this.bytes.push(t >> 8 & 255),
                this.bytes.push(t >> 16 & 255),
                this.bytes.push(t >> 24 & 255),
                this.bytes.push(t >> 32 & 255),
                this.bytes.push(t >> 40 & 255),
                this.bytes.push(t >> 48 & 255),
                this.bytes.push(t >> 56 & 255)
        },
            t.prototype.WriteInt32 = function(t) {
            t < 0 && (t += 4294967295),
                this.WriteUint32(t)
        },
            t.prototype.WriteFloat32 = function(t) {
            var e = new ArrayBuffer(4);
            new Float32Array(e)[0] = t;
            var n = new Uint32Array(e)[0];
            this.WriteUint32(n)
        },
            t.prototype.WriteStringEx = function(t) {
            this.WriteUint16(t.length);
            for (var e = 0; e < t.length; e++)
                this.WriteUint16(t.charCodeAt(e))
        },
            t.prototype.WriteStringUTF8 = function(t) {
            this.bytes.push(...new TextEncoder("utf-8").encode(t));
            this.bytes.push(0);
            return this
        }
        ,
            t
    }();
    e.DataFrameWriter = o
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var s = n(0),
        o = n(3),
        i = n(1),
        r = function() {
            function t(t, e, n) {
                this.key = t,
                    this.text = e,
                    this.SetColor(n)
            }
            return t.prototype.SetColor = function(t, e) {
                void 0 === e && (e = !1),
                    this.color = t,
                    this.htmlColor = o.ColorHelper.ColorToHtmlString(t),
                    this.cssColor = o.ColorHelper.ColorToCssColorString(t),
                    e && s.gs.ucolors.SetConfigColor(this.key, t)
            },
                t
        }();
    e.ColorConfigEntry = r;
    var a = function() {
        function t() {
            this.SetColor(16711680)
        }
        return t.prototype.SetColor = function(t) {
            var e;
            this.color = t,
                this.htmlColor = o.ColorHelper.ColorToHtmlString(t),
                e = o.ColorHelper.GetHSV(t),
                this.hue = e[0],
                this.sat = e[1],
                this.bri = e[2],
                this.alpha = o.ColorHelper.GetAlpha(t)
        },
            t.prototype.SetHue = function(t) {
            var e = o.ColorHelper.ColorFromHSVA(t, this.sat, this.bri, this.alpha);
            this.SetColor(e),
                this.hue = t
        },
            t.prototype.SetAlpha = function(t) {
            var e = this.hue,
                n = o.ColorHelper.ColorFromHSVA(this.hue, this.sat, this.bri, t);
            this.SetColor(n),
                this.hue = e
        },
            t.prototype.SetSV = function(t, e) {
            var n = this.hue,
                i = o.ColorHelper.ColorFromHSVA(this.hue, t, e, this.alpha);
            this.SetColor(i),
                this.hue = n,
                this.sat = t
        },
            t.prototype.SetByHtmlColor = function(t,alpha) {
            var e = o.ColorHelper.ColorFromHtmlStringInput(t,1); 
            -1 != e && this.SetColor(e)
        },
            t
    }();
    e.ColorEditModel = a;
    var l = function() {
        function r() {}
        return r.HotKeyToText = function(t) {
            if (t <= 0)
                return "";
            var e = 255 & t,
                n = t - e,
                i = "";
            n > 0 && (n & s.ModificationKeyCode.Shift && (i = "sft+"),
                      n & s.ModificationKeyCode.Ctrl && (i = "ctl+"),
                      n & s.ModificationKeyCode.Alt && (i = "alt+"));
            var o = r.keyCodeToTextTable[e];
            return o || (o = String.fromCharCode(e)),
                i + o
        },
            r.keyCodeToTextTable = {
            32: "Space",
            13: "Enter",
            9: "Tab",
            37: "Left",
            38: "Up",
            39: "Right",
            40: "Down",
            96: "Num0",
            97: "Num1",
            98: "Num2",
            99: "Num3",
            100: "Num4",
            101: "Num5",
            102: "Num6",
            103: "Num7",
            104: "Num8",
            105: "Num9",
            106: "*",
            107: "+",
            109: "-",
            110: ".",
            111: "/",
            112: "F1",
            113: "F2",
            114: "F3",
            115: "F4",
            116: "F5",
            117: "F6",
            118: "F7",
            119: "F8",
            120: "F9",
            121: "F10",
            122: "F11",
            123: "F12",
            186: ":",
            187: ";",
            188: ",",
            189: "-",
            190: ".",
            191: "/",
            192: "@",
            219: "[",
            220: "\\",
            221: "]",
            222: "^",
            226: "\\"
        },
            r
    }(),
        c = function() {
            function t(t, e, n, i, o) {
                this.key = t,
                    this.text = e,
                    this.value = n,
                    this.toggleHotKey = i,
                    this.holdHotKey = o,
                    this.toggleHotKeyText = l.HotKeyToText(i),
                    this.holdHotKeyText = l.HotKeyToText(o),
                    s.gs.uconfig.changedProcsForViewModel[t] = this.UpdateState.bind(this)
            }
            return t.prototype.UpdateState = function() {
                this.value = s.gs.uconfig[this.key]
            },
                t.prototype.SetValue = function(t) {
                this.value = t,
                    s.gs.uconfig.SetValue(this.key, t)
            },
                t.prototype.SetToggleHotKey = function(t) {
                this.toggleHotKey = t,
                    this.toggleHotKeyText = l.HotKeyToText(t),
                    s.gs.uconfig.SetToggleHotKey(this.key, t)
            },
                t.prototype.SetHoldHotKey = function(t) {
                this.holdHotKey = t,
                    this.holdHotKeyText = l.HotKeyToText(t),
                    s.gs.uconfig.SetHoldHotKey(this.key, t)
            },
                t.prototype.PullModelState = function() {
                this.value = s.gs.uconfig[this.key],
                    this.toggleHotKey = s.gs.uconfig.toggleHotKeys[this.key],
                    this.holdHotKey = s.gs.uconfig.holdHotKeys[this.key],
                    this.toggleHotKeyText = l.HotKeyToText(this.toggleHotKey),
                    this.holdHotKeyText = l.HotKeyToText(this.holdHotKey)
            },
                t
        }();
    e.ConfigEntry = c;
    var h = function() {
        function t(t, e, n) {
            this.key = t,
                this.text = e,
                this.hotKey = n,
                this.hotKeyText = l.HotKeyToText(n)
        }
        return t.prototype.SetHotKey = function(t) {
            this.hotKey = t,
                this.hotKeyText = l.HotKeyToText(t),
                s.gs.uconfig.SetControlHotKey(this.key, t)
        },
            t.prototype.PullModelState = function() {
            this.hotKey = s.gs.uconfig.controlHotKeys[this.key],
                this.hotKeyText = l.HotKeyToText(this.hotKey)
        },
            t
    }();
    e.ControlHotkeyConfigEntry = h;
    var d = function() {
        function t() {
            var i = s.gs.ucolors.colorDefs;
            this.colorEntries = Object.keys(i).map(function(t) {
                var e = s.gs.utexts[t],
                    n = i[t];
                return new r(t, e, n)
            }),
                this.curColorEntry = this.colorEntries[0],
                this.cellDisplayEntries = s.UserConfig.cellDisplayOptionPropNames.map(function(t) {
                var e = s.gs.utexts[t],
                    n = s.gs.uconfig[t],
                    i = s.gs.uconfig.toggleHotKeys[t],
                    o = s.gs.uconfig.holdHotKeys[t];
                return new c(t, e, n, i, o)
            }),
                this.gameDisplayEntries = s.UserConfig.gameDisplayOptionPropNames.map(function(t) {
                var e = s.gs.utexts[t],
                    n = s.gs.uconfig[t],
                    i = s.gs.uconfig.toggleHotKeys[t];
                return new c(t, e, n, i, -1)
            }),
                this.basicBehaviorEntries = s.UserConfig.basicBehaviorPropNames.map(function(t) {
                var e = s.gs.utexts[t],
                    n = s.gs.uconfig[t];
                return new c(t, e, n, -1, -1)
            }),
                this.controlEntries = s.UserConfig.controlPropNames.map(function(t) {
                var e = s.gs.utexts[t],
                    n = s.gs.uconfig.controlHotKeys[t];
                return new h(t, e, n)
            }),
                s.gs.uconfig.resetListenerProc = this.UpdateAll.bind(this)
        }
        return t.prototype.selectColorCard = function(e) {
            var t = i.Arrays.First(this.colorEntries, function(t) {
                return t.key == e
            });
            t && (this.curColorEntry = t)
        },
            t.prototype.UpdateAll = function() {
            this.cellDisplayEntries.forEach(function(t) {
                return t.PullModelState()
            }),
                this.gameDisplayEntries.forEach(function(t) {
                return t.PullModelState()
            }),
                this.basicBehaviorEntries.forEach(function(t) {
                return t.PullModelState()
            }),
                this.controlEntries.forEach(function(t) {
                return t.PullModelState()
            })
        },
            t.instance = new t,
            t
    }();
    e.ConfigHub = d
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = n(24),
        o = n(0),
        r = function() {
            function t() {
                this.bus = new i.EventBus,
                    this.skins = {}
            }
            return t.prototype.addSkinUrl = function(t) {
                void 0 == this.skins[t] && (this.skins[t] = o.gs.uconfig.acceptNewSkins,
                                            this.bus.emit("render"))
            },
                t.prototype.removeSkinUrl = function(t) {
                void 0 != this.skins[t] && (delete this.skins[t],
                                            this.bus.emit("render"))
            },
                t.prototype.setImageAvailability = function(t, e) {
                this.skins[t] = e
            },
                t.prototype.setImageAvailabilityAll = function(t) {
                for (var e in this.skins)
                    this.skins[e] = t
            },
                t.prototype.getSkinAvailability = function(t) {
                return this.skins[t]
            },
                t.instance = new t,
                t
        }();
    e.SkinImageManager = r
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = function() {
        function o(t) {
            this.procsOnSettled = [],
                this.loadPhase = 0,
                this.TryToLoad(t, 0)
        }
        return o.Initialize = function() {
            o.canvas = document.createElement("canvas"),
                o.ctx = o.canvas.getContext("2d")
        },
            o.prototype.OnImageLoaded = function() {
            var t = this.image,
                e = this.fname;
            this.isSettled = !0,
                t.width <= 12000 && t.height <= 12000 || (console.log("image size too large: " + e + ", " + t.width + "x" + t.height),
                                                          this.image = this.GetFallBackImage()),
                this.FireSettled()
        },
            o.prototype.OnImageError = function() {
            if (0 == this.loadPhase) {
                var t = "http://gr.ixagar.net:9400/?uri=" + this.uri;
                this.TryToLoad(t, 1)
            } else
                this.isSettled = !0,
                    this.image = this.GetFallBackImage(),
                    this.FireSettled()
        },
            o.prototype.TryToLoad = function(t, e) {
            this.uri = t;
            var n = o.GetFileName(t);
            this.fname = n;
            var i = new Image;
            i.crossOrigin = "Anonymous",
                i.onload = this.OnImageLoaded.bind(this),
                i.onerror = this.OnImageError.bind(this),
                this.loadPhase = e,
                this.image = i,
                i.src = t
        },
            o.GetFileName = function(t) {
            const e = t.match(/.+\/(.*)$/);
            return e ? e[1] : ""
        },
            o.prototype.GetFallBackImage = function() {
            return document.querySelector("#img_no_image_fallback")
        },
            o.prototype.FireSettled = function() {
            var e = this;
            this.procsOnSettled.forEach(function(t) {
                return t(e.image)
            }),
                this.procsOnSettled = []
        },
            o.prototype.ExecAfterLoad = function(t) {
            this.isSettled ? t(this.image) : this.procsOnSettled.push(t)
        },
            o.LoadImageThen = function(t, e) {
            var n = o.cash.get(t);
            n || (n = new o(t),
                  o.cash.set(t, n)),
                n.ExecAfterLoad(e)
        },
            o.cash = new Map,
            o
    }();
    e.ImageWrapper = i;
    var o = function() {
        function t() {
            this.imageCash = new Map
        }
        return t.prototype.LoadImageThen = function(t, e, n) {
            if (t) {
                var i = this.imageCash.get(t);
                i && i.flagLoaded ? n(i) : i || ((i = new Image).crossOrigin = "Anonymous",
                                                 this.imageCash.set(t, i),
                                                 i.addEventListener("load", function() {
                    i.flagLoaded = !0,
                        n(i)
                }),
                                                 i.onerror = function() {
                    console.log("failed to load " + t),
                        n(null)
                },
                                                 i.src = e ? t : "http://gr.ixagar.net:9400/?uri=" + t)
            } else
                n(null)
        },
            t.CheckIsValidImageUri = function(t) {
            var e = t.match(/^http[s]?\:\/\/.*\.(png|jpg|gif|jpeg)$/);
            return e && e.length > 0
        },
            t.Instance = new t,
            t
    }();
    e.ImageLoader = o
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var _ = n(3),
        k = n(11),
        w = n(0),
        I = n(6),
        i = function() {
            function t(s) {
                var a = this,
                    t = new I.Container;
                this.box = t,
                    this.baseSize = s ? 3200 : 200;
                var l = this.baseSize,
                    c = l / 5,
                    e = w.gs.uconfig,
                    h = w.gs.ucolors;
                if (s) {
                    var o = new I.Sprite;
                    o.anchor.x = .5,
                        o.anchor.y = .5,
                        o.position.x = l / 2,
                        o.position.y = l / 2,
                        t.addChild(o);
                    var r = new I.Graphics;
                    r.beginFill(0),
                        r.drawRect(0, 0, l, l),
                        r.endFill(),
                        r.visible = !1,
                        t.addChild(r);
                    var n = function() {
                        o.alpha = e.GetBgImageAlphaValue("fieldBackImageAlpha");
                        var t = e.fieldBackImageUri;
                        if (k.ImageLoader.CheckIsValidImageUri(t)) {
                            var i = e.fieldBackImageDrawingMode2;
                            k.ImageLoader.Instance.LoadImageThen(t, !0, function(t) {
                                if (t) {
                                    t.width,
                                        t.height;
                                    var e = Math.min(t.width, t.height),
                                        n = a.baseSize / e * (i ? 2 : 1);
                                    o.scale.x = n,
                                        o.scale.y = n,
                                        o.texture = I.Texture.from(t.src),
                                        o.mask = i ? null : r,
                                        o.visible = !0
                                }
                            })
                        } else
                            o.visible = !1
                    };
                    n(),
                        e.RegisterChangedProc("fieldBackImageUri", n),
                        e.RegisterChangedProc("fieldBackImageAlpha", n),
                        e.RegisterChangedProc("fieldBackImageDrawingMode2", n)
                }
                var i = new I.Sprite;
                t.addChild(i),
                    this.gridContainer = i;
                var d = new I.Graphics;
                i.addChild(d);
                if(s){
                for (var u = [], p = 0; p < 25; p++) {
                    var f = p % 5,
                        g = p / 5 >> 0,
                        m = String.fromCharCode(65 + g) + (f + 1),
                        y = new I.Text(m);
                    y.style.fontSize = .45 * this.baseSize >> 0,
                        y.style.fontFamily = gVar.globalFont,
                        y.width/=5,
                        y.height/=5,
                        y.x = f * c + c / 2 - y.width / 2,
                        y.y = g * c + c / 2 - y.height / 2,
                        i.addChild(y),
                        u.push(y)
                }
                }else{
                    for (var u = [], p = 0; p < 25; p++) {
                        var f = p % 5,
                            g = p / 5 >> 0,
                            m = String.fromCharCode(65 + g) + (f + 1),
                            y = new I.Text(m);
                        y.style.fontSize = .09 * this.baseSize >> 0,
                            y.style.fontFamily = gVar.globalFont,
                            y.x = f * c + c / 2 - y.width / 2,
                            y.y = g * c + c / 2 - y.height / 2,
                            i.addChild(y),
                            u.push(y)
                    }
                }
                var v = function() {
                    var t, e;
                    ! function() {
                        var t = h.GetColor("clFieldCoords");
                        d.alpha = _.ColorHelper.GetAlpha(t),
                            d.clear();
                        var e = s ? .002 : .006,
                            n = a.baseSize * e >> 0,
                            i = n / 2;
                        d.lineStyle(n, t);
                        for (var o = 0; o < 6; o += 5) {
                            var r = o * c;
                            d.moveTo(r, -i),
                                d.lineTo(r, l + i),
                                d.moveTo(-i, r),
                                d.lineTo(l + i, r)
                        }
                    }(),
                        t = h.GetColor("clFieldCoords"),
                        e = _.ColorHelper.ColorToHtmlString(t),
                        u.forEach(function(t) {
                        return t.style.fill = e
                    }),
                        i.alpha = h.GetAlpha("clFieldCoords")
                };
                setTimeout(v, 1),
                    h.RegisterChangedProc("clFieldCoords", v);
                var S = new I.Sprite;
                t.addChild(S);
                S.canvas = document.createElement("canvas");
                S.texture = I.Texture.from(S.canvas);
                let b = {
                    a: 15,
                    b: 151
                };
                let X = -S.canvas.width
                let Y = -S.canvas.height
                var Draw = function() {
                    var t = .015 * a.baseSize >> 0,
                        e = .003 * a.baseSize >> 0,
                        n = w.gs.uconfig.GlowingBorder ? t * 9 : 0,
                        i = t + n;
                    const o = h.GetColor("clFieldBorder");
                    const gradient1 = _.ColorHelper.ColorToCssColorString(h.GetColor("clGardient1"));
                    const gradient2 = _.ColorHelper.ColorToCssColorString(h.GetColor("clGardient2"));
                    S.alpha = _.ColorHelper.GetAlpha(o);
                    S.position.set(-i);
                    const r = S.canvas;
                    r.width = r.height = l + t * 2 + n * 2;
                    const s = r.getContext("2d");
                    requestAnimationFrame(Draw)
                    s.clearRect(0, 0, l + t * 2 + n * 2, l + t * 2 + n * 2);
                    if (X >= r.width||Y >= r.height) { X = -r.width , Y = -r.height}
                    X += 10
                    Y += 10

                    const grd = s.createLinearGradient(X, Y, r.width + X, r.height + Y)
                    grd.addColorStop(0, gradient1)
                    grd.addColorStop(0.1, gradient1)
                    grd.addColorStop(0.5, gradient2)
                    grd.addColorStop(0.9, gradient1)
                    grd.addColorStop(1, gradient1)

                    s.beginPath();
                    s.lineWidth = t;
                    s.strokeStyle = grd;
                    s.globalAlpha = 1;
                    s.rect(t / 2 + n, t / 2 + n, l + t, l + t);
                    s.stroke();
                    S.texture.update()
                }
                var C = function() {
                    var t = .015 * a.baseSize >> 0,
                        e = .003 * a.baseSize >> 0,
                        n = w.gs.uconfig.GlowingBorder ? t * 9 : 0,
                        i = t + n;
                    const o = h.GetColor("clFieldBorder");
                    S.alpha = _.ColorHelper.GetAlpha(o);
                    S.position.set(-i);
                    const r = S.canvas;
                    r.width = r.height = l + t * 2 + n * 2;
                    const s = r.getContext("2d");
                    s.clearRect(0, 0, l + t * 2 + n * 2, l + t * 2 + n * 2);
                    s.beginPath();
                    s.lineWidth = t;
                    s.strokeStyle = _.ColorHelper.ColorToHtmlString(o);
                    s.globalAlpha = 1;
                    s.shadowBlur = n;
                    s.shadowColor = _.ColorHelper.ColorToHtmlString(o);
                    s.rect(t / 2 + n, t / 2 + n, l + t, l + t);
                    s.save();
                    s.clip();
                    s.shadowBlur = n / 8;
                    s.globalAlpha = 1;
                    s.stroke();
                    S.texture.update()
                };
                if (x == 0) {
                    w.gs.uconfig.AniBorder ? Draw() : C();
                    S.blendMode = PIXI.BLEND_MODES.SCREEN;
                    e.RegisterChangedProc("GlowingBorder", C);
                    h.RegisterChangedProc("clFieldBorder", C);
                    x++
                }
            }
            let x = 0;
            return t.prototype.SetScale = function(t) {
                this.box.scale.x = t,
                    this.box.scale.y = t
            },
                t.prototype.SetCoordVisibility = function(t) {
                this.gridContainer.visible = t
            },
                t
        }();
    e.FieldGraphics = i
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var m = n(1),
        bt = n(1),
        Ct = n(8),
        xt = n(7),
        _t = n(14),
        kt = n(3),
        wt = n(0),
        It = n(2),
        K = n(4),
        y = function() {
            function t() {}//y
            return t.prototype.Initialize = function(t, e, n, i, o) {
                this.nodeId = t,
                    this.cellType = e,
                    this.ownerPlayerId = n,
                    this.color = i,
                    this.ox = 0,
                    this.oy = 0,
                    this.or = 0,
                    this.x,
                    this.y,
                    this.r,
                    this.nx = 0,
                    this.ny = 0,
                    this.nr = 0,
                    this.mass = 0,
                    this.updateStamp = o,
                    this.motionAngle = 0,
                    this.motionSpeed = 0,
                    this.canEat = !1,
                    this.canEaten = !1,
                    this.splitNum = -1,
                    this.splitOrderWeight = -1,
                    this.canSplit = !1,
                    this.showMark = !1,
                    this.sizeLevel = -1,
                    this.velocity = new m.Vector(0, 0)
            },
                t.prototype.UpdateProps = function(t, e, n, i, o) {
                var r = this.nx,
                    s = this.ny;
                this.nx = t,
                    this.ny = e,
                    this.nr = kt.GameHelper.MassToRadius(n),
                    this.mass = n,
                    this.motionAngle = i,
                    this.motionSpeed = o;
                this.velocity.Set(t - r, e - s)
            },
                t.prototype.LinearUpdate = function(t) {
                var e = (t - this.updateStamp) / m.Nums.MapTo(wt.gs.uconfig.InterpolationSpeed, 179, 49);
                e = Math.max(Math.min(e, 1), 0);
                this.x = this.ox + (this.nx - this.ox) * e;
                this.y = this.oy + (this.ny - this.oy) * e;
                this.r = this.or + (this.nr - this.or) * e
            },
                t.Pool = new kt.ObjectPool(wt.gs.gconfig.MaxCellsNum, function() {
                return new t
            }),
                t
        }();
    e.TNodeData = y;
    var v = function() {
        return function(t, e, n, i) {
            this.eaterId = t,
                this.eatenId = e,
                this.limitRadius = n,
                this.canEat = i
        }
    }(),
        S = function() {
            function t() {
                this.nodeId = -1
            }
            return t.prototype.SetTarget = function(t, e, n) {
                this.nodeId = t,
                    this.canEat = e,
                    this.canPushAll = n
            },
                t
        }(),
        b = function() {
            function t(t) {
                this.eatingLimitList = [],
                    this.AimTargetData = new S,
                    this.gameCore = t
            }
            return t.prototype.UpdateNodeAnalysisProps = function() {
                try{
            var c = this;
                if (!wt.gs.gstates.isBenchmarkMode) {
                    var e = this.gameCore.nodeMan,
                        t = e.tab1Nodes,
                        n = e.operationUnitIndex,
                        i = 0,
                        _t = e.tab2Nodes,
                        _n = e.taboperationUnitIndex,
                        _i = 0;
                    if(e.activeSelfPlayerId == gVar.conn1.id){ i = e.selfNodeIds[0].length}
                    if(e.activeSelfPlayerId == gVar.conn1.id+1){ i = e.selfNodeIds[1].length}
                    if(e.activeSelfPlayerId == gVar.conn2.id){ _i = e.tabNodeIds[0].length}
                    if(e.activeSelfPlayerId == gVar.conn2.id+1){ _i = e.tabNodeIds[1].length}
                    if (this.gameCore.gameHudModel.SetSplitNum(i,_i),
                        i > 0 || _i > 0) {
                        var h = [];
                        if((e.activeSelfPlayerId == gVar.conn2.id || e.activeSelfPlayerId == gVar.conn2.id+1) && _i>0){
                            e.tabNodeIds[_n].forEach(t => h.push(e.nodes.get(t)))
                        }
                        else{
                            e.selfNodeIds[n].forEach(t => h.push(e.nodes.get(t)))

                        }
                        It = h[0];
                        h.forEach(function(t) {
                            t.mass > It.mass && (It = t)
                        });
                        biggest = It;
                        var o = h.slice(0).sort(function(t, e) {
                            return t.nodeId - e.nodeId
                        });
                        S = o.length,
                            b = 16 - S,
                            C = 0;
                        o.forEach(function(t, e) {
                            var n = 0;
                            C < b ? t.mass >= 44 ? (n = 0,
                                                    C++,
                                                    t.canSplit = !0) : (n = 1,
                                                                        t.canSplit = !1) : (n = m.Nums.VMap(e, b, S - 1, .4, 1, !0),
                                                                                            t.canSplit = !1),
                                t.splitOrderWeight = n
                        });
                        var r = this.gameCore.sight,
                            s = e.GetNodeIdUnderCursor(r.aimCursorX, r.aimCursorY),
                            a = e.nodes.get(s);
                        a && a.ownerPlayerId == e.activeSelfPlayerId && (s = -1,
                                                                         a = null);
                        var l = !1,
                            d = !1;
                        if (a) {
                            var u = 2 * a.mass * 1.3;
                            h.forEach(function(t) {
                                t.mass > u && (kt.GameHelper.GetDist(t.nx, t.ny, a.nx, a.ny) < 780 + t.nr && t.canSplit && (l = !0))
                            });
                            var p = h.length;
                            if (p < 8) {
                                var f = void 0;
                                f = 1 == p ? 16 : 2 == p ? 8 : p <= 4 ? 4 : 2,
                                    this.gameCore.ShowDebugValue("div", f);
                                var g = It.mass / f;
                                a.mass > 1.3 * g && (d = !0)
                            }
                        }
                        this.AimTargetData.SetTarget(s, l, d),
                            t.forEach(function(t) {
                            t.showMark = !1,
                                t.canEat = !1,
                                t.canEaten = !1,
                                t.sizeLevel = -1
                        }),
                            t.forEach(function(t) {
                            var e = t.mass,
                                n = It.mass,
                                i = 4 * n * 1.3,
                                o = 2 * n * 1.3,
                                r = n * 1.3,
                                s = n / 1.3,
                                a = n / 2 * 1.3,
                                l = n / 2 / 1.3,
                                c = n / 4 / 1.3,
                                h = n / 8 * 1.3,
                                d = n / 8 / 1.3,
                                n = wt.gs.uconfig.MarkerLight ? c : d;
                            if (wt.gs.uconfig.MarkerExtend) {
                                t.sizeLevel = e > i ? 0 : e > o ? 1 : e > r ? 2 : e > s ? 3 : e > a ? 4 : e > l ? 5 : e > c ? 6 : e > h ? 7 : e > d ? 8 : -1
                            } else {
                                t.sizeLevel = e > o ? 0 : e > r ? 1 : e > s ? 2 : e > l ? 3 : e > n ? 4 : wt.gs.uconfig.MarkerLight ? -1 : 5
                            }
                        }),
                            h.forEach(function(a) {
                            var l = .5 * a.mass * .77;
                            t.forEach(function(t) {
                                if (!(h.indexOf(t) >= 0)) {
                                    if (kt.GameHelper.HitTestAABB(a.nx, a.ny, t.nx, t.ny, 1200)) {
                                        var e = c.gameCore.sight,
                                            n = new m.Vector(e.aimCursorX - a.nx, e.aimCursorY - a.ny);
                                        n.Normalize(),
                                            n.Scale(1200);
                                        var i = a.nx + n.x,
                                            o = a.ny + n.y;
                                        if (!(kt.GameHelper.GetLinePointDist(a.nx, a.ny, i, o, t.nx, t.ny) > a.nr + t.nr)) {
                                            t.showMark = !0;
                                            var r = kt.GameHelper.GetDist(a.nx, a.ny, t.nx, t.ny);
                                            if (t.mass < l && a.canSplit && r < 720 + a.nr && (t.canEat = !0),
                                                a == It && r < 720 + a.nr) {
                                                var s = 2 * a.mass * 1.3;
                                                t.mass > s && (t.canEaten = !0,
                                                               t.showMark = !0)
                                            }
                                        }
                                    }
                                }
                            })
                        }),
                            h.forEach(function(t) {
                            return t.splitNum = h.length
                        })
                    }
                    this.eatingLimitList = [],
                        t.forEach(function(s) {
                        0 == s.cellType && t.forEach(function(t) {
                            if (0 == t.cellType && s.ownerPlayerId != t.ownerPlayerId && kt.GameHelper.HitTestAABB(s.nx, s.ny, t.nx, t.ny, s.nr + t.nr)) {
                                var e = s.nr > t.nr ? s : t,
                                    n = s == e ? t : s;
                                if (kt.GameHelper.GetDist(s.nx, s.ny, t.nx, t.ny) < e.nr) {
                                    var i = e.mass > 1.3 * n.mass,
                                        o = e.nr - .41 * n.nr,
                                        r = bt.Arrays.First(c.eatingLimitList, function(t) {
                                            return t.eaterId == e.nodeId
                                        });
                                    r ? o > r.limitRadius && (r.limitRadius = o,
                                                              r.eatenId = n.nodeId) : c.eatingLimitList.push(new v(e.nodeId, n.nodeId, o, i))
                                }
                            }
                        })
                    })
                }
                }
                catch{}
            },
                t
        }();
    e.NodeAnalyzer = b;
    let Et = n(8);
    var C = function() {
        function t(t) {
            this.nodes = new Map,
                this.tab1Nodes = new Map,
                this.tab2Nodes = new Map,
                this.selfNodeIds = [
                [],
                []
            ],
                this.tabNodeIds = [
                [],
                []
            ],
                this.activeSelfPlayerId = -1,
                this.gameCore = t,
                this.nodeAnalyzer = new b(t)
        }
        return Object.defineProperty(t.prototype, "uMan", {
            get: function() {
                return this.gameCore.uMan
            },
            enumerable: !0,
            configurable: !0
        }),
            Object.defineProperty(t.prototype, "gameHud", {
            get: function() {
                return this.gameCore.gameHudModel
            },
            enumerable: !0,
            configurable: !0
        }),
            Object.defineProperty(t.prototype, "dataReceiver", {
            get: function() {
                return this.gameCore.dataRecorder
            },
            enumerable: !0,
            configurable: !0
        }),
            Object.defineProperty(t.prototype, "sight", {
            get: function() {
                return this.gameCore.sight
            },
            enumerable: !0,
            configurable: !0
        }),
            Object.defineProperty(t.prototype, "operationUnitIndex", {
            get: function() {
                return this.activeSelfPlayerId == this.uMan.selfUserId ? 0 : 1
            },
            enumerable: !0,
            configurable: !0
        }),
            Object.defineProperty(t.prototype, "taboperationUnitIndex", {
            get: function() {
                return this.activeSelfPlayerId == gVar.conn2.id ? 0 : 1
            },
            enumerable: !0,
            configurable: !0
        }),
            Object.defineProperty(t.prototype, "hasSelfNode", {
            get: function() {
                return this.selfNodeIds[0].length > 0 || this.selfNodeIds[1].length > 0
            },
            enumerable: !0,
            configurable: !0
        }),
            Object.defineProperty(t.prototype, "hasTabNode", {
            get: function() {
                return this.tabNodeIds[0].length > 0 || this.tabNodeIds[1].length > 0
            },
            enumerable: !0,
            configurable: !0
        }),
            t.prototype.PostClearAllNodes = function(tab) {
            if(tab==1){
            this.selfNodeIds = [
                [],
                []
            ],
                this.tab1Nodes.forEach(function(t) {
                y.Pool.Release(t)
            }),
                this.tab1Nodes.clear()
            }
            if(tab==2){
            this.tabNodeIds = [
                [],
                []
            ],
                this.tab2Nodes.forEach(function(t) {
                y.Pool.Release(t)
            }),
                this.tab2Nodes.clear()
            }
            if(!tab){
            this.selfNodeIds = [
                [],
                []
            ],
            this.tabNodeIds = [
                [],
                []
            ],
                this.tab1Nodes.forEach(function(t) {
                y.Pool.Release(t)
            }),
                this.tab1Nodes.clear()
                this.tab2Nodes.forEach(function(t) {
                y.Pool.Release(t)
            }),
                this.tab2Nodes.clear()
                this.nodes.clear()
            }
        },
            t.prototype.ResetToInitialiState = function() {
            this.uMan.ClearUserInfos(),
                this.PostClearAllNodes()
        },
            t.prototype.SyncGameViewToModel = function() {
            this.nodeAnalyzer.UpdateNodeAnalysisProps(),
                this.gameViewSyncNodesToListProc()
        },
            t.prototype.CalcurateCenterPointOfTargetCells = function(nodes) {
            for (var t = 0, e = 0, n = 0, o = 0; o < nodes.length; o++) {
                var s = nodes[o],
                    a = this.nodes.get(s);
                t += a.nx * a.mass,
                    e += a.ny * a.mass,
                    n += a.mass
                
            }
            return [t /= n, e /= n]
        },
            t.prototype.CalcurateCenterPointOfAllSelfCells = function() {
            for (var t = 0, e = 0, n = 0, i = 0,tabX = 0, tabY = 0, tabMass = 0; i < 2; i++){
                if(gVar.conn1.isAlive){
                    for (var o = 0, r = this.selfNodeIds[i]; o < r.length; o++) {
                        var s = r[o],
                            a = this.nodes.get(s);
                        t += a.nx * a.mass,
                            e += a.ny * a.mass,
                            n += a.mass
                    }
                }
                if(gVar.conn2.isAlive){
                    for (var _o = 0,_r = this.tabNodeIds[i]; _o < _r.length; _o++) {
                        var _s = _r[_o],
                            _a = this.nodes.get(_s);
                        tabX += _a.nx * _a.mass,
                            tabY += _a.ny * _a.mass,
                            tabMass += _a.mass
                    }
                }
            }
            if(gVar.conn1.isAlive && gVar.conn2.isAlive){
                t = (t+tabX)
                e=(e+tabY)
                n = (n+tabMass)
            }
            if(!gVar.conn1.isAlive && gVar.conn2.isAlive){
                t = tabX
                e= tabY
                n = tabMass
            }
            return [t /= n, e /= n]
        },
            t.prototype.CalcurateCenterPointOfEachSelfCells = function() {
            var t = 0, e = 0, n = 0
                for (var o = 0, r = this.selfNodeIds[0]; o < r.length; o++) {
                    var s = r[o]
                      , a = this.nodes.get(s);
                    t += a.nx * a.mass,
                    e += a.ny * a.mass,
                    0,
                    n += a.mass
                }
            var _t = 0, _e = 0, _n = 0
            for (var _o = 0, _r = this.selfNodeIds[1]; _o < _r.length; _o++) {
                var _s = _r[_o]
                , _a = this.nodes.get(_s);
                    _t += _a.nx * _a.mass,
                        _e += _a.ny * _a.mass,
                        0,
                        _n += _a.mass
            }
            return [t /= n, e /= n,_t /= _n, _e /= _n]
        },
            t.prototype.CalcurateCenterPointOfEachTabCells = function() {
            var t = 0, e = 0, n = 0
                for (var o = 0, r = this.tabNodeIds[0]; o < r.length; o++) {
                    var s = r[o]
                      , a = this.nodes.get(s);
                    t += a.nx * a.mass,
                    e += a.ny * a.mass,
                    0,
                    n += a.mass
                }
            var _t = 0, _e = 0, _n = 0
            for (var _o = 0, _r = this.tabNodeIds[1]; _o < _r.length; _o++) {
                var _s = _r[_o]
                , _a = this.nodes.get(_s);
                    _t += _a.nx * _a.mass,
                        _e += _a.ny * _a.mass,
                        0,
                        _n += _a.mass
            }
            return [t /= n, e /= n,_t /= _n, _e /= _n]
        },
            t.prototype.CalcurateMinMax = function(px,py,pw,ph,tab) {
            if(!tab){
                gVar.camMaxX = px+pw/2
                gVar.camMaxY = py+ph/2
                gVar.camMinX = px-pw/2
                gVar.camMinY = py-ph/2
                $('#map-pos').text('X:'+Math.round(px)+' Y:'+Math.round(py));
            }
            if(tab){
                gVar.tabcamMaxX = px+pw/2
                gVar.tabcamMaxY = py+ph/2
                gVar.tabcamMinX = px-pw/2
                gVar.tabcamMinY = py-ph/2
            }
            //console.log(gVar.camMaxX,gVar.camMaxY,gVar.camMinX,gVar.camMinY)
        },
            t.prototype.UpdateSelfScore = function() {
            var t = 0;
            if (!wt.gs.gstates.isBenchmarkMode)
                for (var e = 0; e < 2; e++){
                    for (var n = 0, i = this.selfNodeIds[e]; n < i.length; n++) {
                        var o = i[n];
                        t += this.nodes.get(o).mass
                    }
                    for (var n = 0, i = this.tabNodeIds[e]; n < i.length; n++) {
                        var o = i[n];
                        t += this.nodes.get(o).mass
                    }
                }
            this.gameHud.PostSelfScoreData(t)
        },
            t.prototype.PostNodeData = function(t, e, n, i, o, r, s, a, l, c,tab) {
            var d = !1;
            if(!tab){
                var h1 = this.tab1Nodes.get(t);
                if(!h1 && (h1 = y.Pool.Gain(),
                         bt.Utils.Confirm(h1),
                         h1.Initialize(t, e, r, s, c),
                         this.tab1Nodes.set(t, h1),
                         h1.nx = h1.ox = h1.x = n,
                         h1.ny = h1.oy = h1.y = i,
                         h1.nr = h1.or = h1.r = kt.GameHelper.MassToRadius(o),0 == h1.cellType)){
                    var u = kt.GameHelper.DecodePlayerId(r),
                        p = u[0],
                        f = u[1];
                    if(p == this.uMan.selfUserId){
                        if(0 == this.selfNodeIds[f].length){
                            d = !0
                        }
                        this.selfNodeIds[f].push(t),
                            this.selfNodeIds[f].sort()
                    }
                        gVar.conn1.isAlive = this.hasSelfNode,
                        gVar.conn1.tab1.isAlive = this.selfNodeIds[0].length > 0,
                        gVar.conn1.tab2.isAlive = this.selfNodeIds[1].length > 0
                }
                if (wt.gs.uconfig.InterpolationType == 1) {
                    const g = c;
                    h1.LinearUpdate(g);
                    h1.updateStamp = g;
                    h1.ox = h1.x;
                    h1.oy = h1.y;
                    h1.or = h1.r
                }
                h1.UpdateProps(n, i, o, a, l)
                d && this.sight.SetSpawned(1);
            }
            if(tab){
                var h2 = this.tab2Nodes.get(t);
                if(!h2 && (h2 = y.Pool.Gain(),
                         bt.Utils.Confirm(h2),
                         h2.Initialize(t, e, r, s, c),
                         this.tab2Nodes.set(t, h2),
                         h2.nx = h2.ox = h2.x = n,
                         h2.ny = h2.oy = h2.y = i,
                         h2.nr = h2.or = h2.r = kt.GameHelper.MassToRadius(o),0 == h2.cellType)){
                    var u = kt.GameHelper.DecodePlayerId(r),
                        p = u[0],
                        f = u[1];
                    if(p == gVar.conn2.id){
                        if(0 == this.tabNodeIds[f].length){
                            d = !0
                        }
                        this.tabNodeIds[f].push(t),
                            this.tabNodeIds[f].sort()
                    }
                    this.tabNodeIds = [[...new Set(this.tabNodeIds[0])],[...new Set(this.tabNodeIds[1])]]
                        gVar.conn2.isAlive = this.hasTabNode,
                        gVar.conn2.tab1.isAlive = this.tabNodeIds[0].length > 0,
                        gVar.conn2.tab2.isAlive = this.tabNodeIds[1].length > 0
                }
                if (wt.gs.uconfig.InterpolationType == 1) {
                    const g = c;
                    h2.LinearUpdate(g);
                    h2.updateStamp = g;
                    h2.ox = h2.x;
                    h2.oy = h2.y;
                    h2.or = h2.r
                }
                h2.UpdateProps(n, i, o, a, l)
                d && this.sight.SetSpawned(2);
            }
            if(!gVar.refresh && !gVar.pressPlay && wt.gs.gstates.isPlaying && 0 == this.tabNodeIds[0].length && 0 == this.tabNodeIds[1].length && 0 == this.selfNodeIds[0].length && 0 == this.selfNodeIds[1].length) (this.selfUnitsDeadCallback && this.selfUnitsDeadCallback(3))
            if(!gVar.conn1.isAlive && gVar.conn2.isAlive){
                this.nodes = new Map([...this.tab1Nodes, ...this.tab2Nodes]);
            }
            else{
                this.nodes = new Map([...this.tab2Nodes, ...this.tab1Nodes]);
            }
        },
            t.prototype.PostNodeRemoval = function(t,tab) {
            var e1 = this.tab1Nodes.get(t),e2 = this.tab2Nodes.get(t);
            !tab && (this.tab1Nodes.delete(t),e1 && y.Pool.Release(e1),(bt.Arrays.Remove(this.selfNodeIds[0], t) || bt.Arrays.Remove(this.selfNodeIds[1], t)) && 0 == this.selfNodeIds[0].length && 0 == this.selfNodeIds[1].length && (this.selfUnitsDeadCallback && this.selfUnitsDeadCallback(1)));
            tab && (this.tab2Nodes.delete(t),e2 && y.Pool.Release(e2),(bt.Arrays.Remove(this.tabNodeIds[0], t) || bt.Arrays.Remove(this.tabNodeIds[1], t)) && 0 == this.tabNodeIds[0].length && 0 == this.tabNodeIds[1].length && (this.selfUnitsDeadCallback && this.selfUnitsDeadCallback(2)));
        },
            t.prototype.RecordLatencyCheckStartTime = function() {
            this.latencyCheckStartTime = Date.now()
        },
            t.prototype.PostExternalChatMessage = function(k,s ,t, e) {
            new Date;
            var n = bt.DateTimeHelper.GetHourMinutesString();
            this.gameHud.PostChatMessage(n, t, e, null,s ,k);
        },
            t.prototype.OnEnterBenchMarkMode = function() {
            this.gameHud.PostLeaderboardData([]),
                this.gameHud.PostTeamRankingData([]),
                this.gameHud.PostMapData([]),
                this.PostClearAllNodes(),
                this.SyncGameViewToModel(),
                this.gameHud.PostServerStatusData(""),
                this.gameHud.PostLatencyData(0),
                this.gameHud.PostServerUserNumData(0, 0, 0, 0)
        },
            t.prototype.GetPlayerIdUnderCursor = function(e, n) {
            var i = -1;
            return this.nodes.forEach(function(t) {
                -1 == i && (0 == t.cellType && kt.GameHelper.GetDist(t.nx, t.ny, e, n) < t.nr && (i = t.ownerPlayerId))
            }),
                i
        },
            t.prototype.GetNodeIdUnderCursor = function(e, n) {
            var i = -1;
            return this.nodes.forEach(function(t) {
                -1 == i && (0 == t.cellType && kt.GameHelper.GetDist(t.nx, t.ny, e, n) < t.nr && (i = t.nodeId))
            }),
                i
        },
            t.prototype.DecodeFrame = function(t, e, n ,tab) {
            var i = new Ct.DataFrameReader(t);
            var op = i.ReadUint8()
            switch (op) {
                case 43:
                    var D = i.ReadUint16();
                    !tab &&　this.uMan.PostSelfUserId(D);
                    tab ? gVar.conn2.id = D : gVar.conn1.id= D
                    break;
                case 65:
                    var f1 = i.ReadFloat32(),
                        f2 = i.ReadFloat32(),
                        f3 = i.ReadFloat32(),
                    f4 = i.ReadFloat32();
                    wt.gs.gconfig.UpdateFieldSize(f1,f2,f3,f4);
                        this.sight.Init();
                    break;
                case 42:
                    for (var o = i.ReadUint16(), r = 0; r < o; r++) {
                        var s = i.ReadUint16(),
                            a = i.ReadStringEx(),
                            l = i.ReadStringEx(),
                            c = i.ReadStringEx(),
                            B = i.ReadUint8(); 
                        let _t = false;
                        let _e = "";
                        if(B == 2){
                            _t = i.ReadUint8() > 0;
                            _e = i.ReadStringEx()
                        }
                        var h = i.ReadUint16(),
                            G = i.ReadStringEx(),
                            d = i.ReadStringEx();
                        if (e) {
                            if ((M = this.uMan.GetUserInfoById(s)) != this.uMan.fallbackUserInfo) {
                                var u = xt.InternalPackets.UserEntryInfo(s, a, l, h, c, d);
                                this.dataReceiver.PostInternalRecordingPacket(u)
                            }
                            M.clientId,
                                this.uMan.selfUserId
                        }
                        this.uMan.PostUserInfoData(s, a, l, h, c, d, B == 1, G,tab)
                    }
                    break;
                case 45:
                    for (o = i.ReadUint16(),
                         r = 0; r < o; r++) {
                        var L = i.ReadUint16();
                        this.uMan.PostUserLeave(L,tab)
                    }
                    break;
                case 39:
                    for (o = i.ReadUint16(),
                         r = 0; r < o; r++) {
                        var p = i.ReadUint16(),
                            z = (s = i.ReadUint16(),
                                 i.ReadUint8()),
                            j = i.ReadUint8(),
                            V = i.ReadUint8(),
                            W = i.ReadUint8(),
                            f = z << 16 | j << 8 | V;
                        if (e)
                            if ((M = this.uMan.GetUserInfoById(p)) != this.uMan.fallbackUserInfo) {
                                var K = M.colors[1 & W];
                                this.dataReceiver.PostInternalRecordingPacket(xt.InternalPackets.PlayerColor(p, K))
                            }
                        this.uMan.PostPlayerColorData(p, f,tab)
                    }
                    break;
                case 36:
                    for (o = i.ReadUint16(),
                         r = 0; r < o; r++) {
                        h = i.ReadUint16();
                        var X = i.ReadStringEx(),
                            Y = i.ReadStringEx(),
                            q = i.ReadStringEx();
                        f = kt.ColorHelper.ColorFromHtmlString(Y);
                        if (e)
                            if ((T = this.uMan.GetTeamInfoById(h)) != this.uMan.fallbackTeamInfo) {
                                var Q = T.color;
                                this.dataReceiver.PostInternalRecordingPacket(xt.InternalPackets.TeamColor(h, Q))
                            }
                        this.uMan.PostTeamInfoData(h, f, X, q, tab)
                    }
                    break;
                case 35:
                    for (o = i.ReadUint16(),
                         r = 0; r < o; r++) {
                        h = i.ReadUint16();
                        this.uMan.PostTeamInfoRemoval(h, tab)
                    }
                    break;
                case 18:
                    if(tab){
                        this.PostClearAllNodes(2)
                    }
                    else
                    {
                        this.PostClearAllNodes(1)
                    }
                        n || this.SyncGameViewToModel();
                    break;
                case 15:
                    var controlConn1tab2 = false,controlConn2tab2=false
                    var J = i.ReadFloat32(),
                        Z = i.ReadFloat32();
                    var width = i.ReadFloat32(),
                        height = i.ReadFloat32();
                    this.CalcurateMinMax(J,Z,width,height,tab)
                    if (this.sight.SetServerEyePos(J, Z),(tab && (gVar.tabXMulti = J)),(tab && (gVar.tabYMulti = Z)),
                        i.ReadUint8() > 0) {
                        p = i.ReadUint16();
                        var g = i.ReadFloat32(),
                            m = i.ReadFloat32(),
                            $ = i.ReadUint8(),
                            tt = i.ReadUint32();
                        var y = (1 & $) > 0,
                            v = (s = 65534 & p,
                                 wt.gs.gstates);
                            if(!wt.gs.uconfig.tab){
                            v.isRealtimeMode && v.isSpectate && g != this.uMan.selfUserId ? this.sight.setAimCursorProps(p, g, m, y) : this.sight.aimPlayerId = p,
                                s == this.uMan.selfUserId && (this.activeSelfPlayerId = p)
                            this.gameHud.SetSpecTargetScore(tt)
                        }
                        else{
                            if(p == gVar.conn1.id+1 && !gVar.controlConn2){
                                s != gVar.conn2.id && s != gVar.conn2.id+1 && (this.sight.setAimCursorProps(p, g, m, y),this.sight.aimPlayerId = p,this.activeSelfPlayerId = p)
                                controlConn1tab2 = !0
                                gVar.conn1.isActive = !0
                                gVar.conn2.isActive = !1
                            }
                            if(p == gVar.conn2.id+1 && gVar.controlConn2){
                                s != gVar.conn1.id && s != gVar.conn1.id+1 && (this.sight.setAimCursorProps(p, g, m, y),this.sight.aimPlayerId = p,this.activeSelfPlayerId = p)
                                controlConn1tab2 = !0
                                gVar.conn1.isActive = !1
                                gVar.conn2.isActive = !0
                            }
                            if(p == gVar.conn1.id && !gVar.controlConn2){
                                s != gVar.conn2.id && s != gVar.conn2.id+1 && (this.sight.setAimCursorProps(p, g, m, y),this.sight.aimPlayerId = p,this.activeSelfPlayerId = p)
                                gVar.conn1.isActive = !0
                                gVar.conn2.isActive = !1
                            }
                            if(p == gVar.conn2.id && gVar.controlConn2){
                                s != gVar.conn1.id && s != gVar.conn1.id+1 && (this.sight.setAimCursorProps(p, g, m, y),this.sight.aimPlayerId = p,this.activeSelfPlayerId = p)
                                gVar.conn1.isActive = !1
                                gVar.conn2.isActive = !0
                            }
                            !tab && !gVar.conn1.isAlive && !gVar.conn2.isAlive && this.sight.setAimCursorProps(p, g, m, y);
                            this.gameHud.SetSpecTargetScore(tt);
                        }
                    }
                    else{
                        !gVar.conn1.isAlive && !gVar.conn2.isAlive && (this.sight.aimPlayerId = -1,
                                                                       this.activeSelfPlayerId = -1)
                    }
                    var et = this.sight.aimPlayerId > 0 ? 65534 & this.sight.aimPlayerId : -1;
                    let t = performance.now();
                    for (!tab && this.gameHud.SetAimPlayerClient(et);;) {
                        if (0 == (I = i.ReadUint32()))
                            break;
                        var S = i.ReadUint8(),
                            b = i.ReadFloat32(),
                            C = i.ReadFloat32(),
                            x = i.ReadUint16(),
                            _ = (p = i.ReadUint16(),
                                 0);
                        1 == S && (_ = i.ReadUint32());
                        var k = 0,
                            w = 0;
                        if (i.ReadUint8() && (k = i.ReadFloat32(),
                                              w = i.ReadFloat32()),
                            e && !this.nodes.has(I)) {
                            u = xt.InternalPackets.NodeRemoval(I);
                            this.dataReceiver.PostInternalRecordingPacket(u)
                        }
                        n && (w = 0),
                            this.PostNodeData(I, S, b, C, x, p, _, k, w, t,tab)
                    }
                    for (o = i.ReadUint16(),
                         r = 0; r < o; r++) {
                        var I = i.ReadUint32();
                        this.PostNodeRemoval(I,tab)
                    }
                    n || this.SyncGameViewToModel();
                    break;
                case 47:
                    if (n)
                        break;
                    o = i.ReadUint8();
                    var P = new Array;
                    for (r = 0; r < o; r++) {
                        p = i.ReadUint16(),
                            x = i.ReadUint32();
                        var M = this.uMan.GetUserInfoById(p),
                            T = this.uMan.GetTeamInfoById(M.teamId);
                        P.push(new _t.TLeaderboardData(M.leaderBoardName, x, T.colorStr,M.tripKey))
                    }
                    this.gameHud.PostLeaderboardData(P);

                    break;
                case 46:
                    if (n)
                        break;
                    for (o = i.ReadUint8(),
                         P = new Array,
                         r = 0; r < o; r++) {
                        h = i.ReadUint16();
                        var nt = i.ReadUint16(),
                            R = this.uMan.GetTeamInfoById(h);
                        P.push(new _t.TLeaderboardData(R.teamName, nt, R.colorStr))
                    }
                    this.gameHud.PostTeamRankingData(P);
                    break;
                case 41:
                    if (n)
                        break;
                    o = i.ReadUint16();
                    var A = new Array;
                    for (r = 0; r < o; r++) {
                        p = i.ReadUint16(),
                            b = i.ReadInt16(),
                            C = i.ReadInt16(),
                            x = i.ReadUint16();
                        A.push(new _t.TMapData(p, b, C, x))
                    }
                        /*if(gTargetSite=="caffe" || gTargetSite=="sao"){
                            var conn2 = this.gameCore.conn.ws2
                            var flag = conn2 && !gVar.conn2.isAlive
                            if(flag){
                                tab && this.gameHud.PostMapData(A)
                            }
                            else{
                                !tab && this.gameHud.PostMapData(A)
                            }
                        }
                        else{
                            !tab && this.gameHud.PostMapData(A)
                        }*/
                    this.gameHud.PostMapData(A)
                    break;
                case 128:
                    s = i.ReadUint16(),
                        i.ReadStringEx();
                    var U = i.ReadStringEx(),
                        it = (new Date,
                              bt.DateTimeHelper.GetHourMinutesString()),
                        ot = (M = this.uMan.GetUserInfoById(s),
                              T = this.uMan.GetTeamInfoById(M.teamId),
                              !0);
                    It.AppConfigurator.instance.useTeamSeparatedChat && T != this.uMan.selfTeamInfo && (ot = !1),
                        ot ? this.gameHud.PostChatMessage(it, M.fullName, U, T.colorStr) : console.log("stray chat message: " + it + " " + M.fullName + " " + U);
                    break;
                case 14:
                    break;
                    
                case 131:
                    if (n)
                        break;
                    var rt = Date.now() - this.latencyCheckStartTime;
                    this.gameHud.PostLatencyData(rt);
                    break;
                case 133:
                    var E = i.ReadStringEx();
                    console.log(E);
                    break;
                case 200:
                    var F = i.ReadStringEx(),
                        N = JSON.parse(F);
                    wt.gs.gconfig.ShowAlwaysAllPlayersInMap = !N.enableTeamMapSeparation,
                        wt.gs.gconfig.ShowAlwaysAllPlayersSkin = !N.enableTeamSkinSeparation;
                    var O = this.gameCore.chatAppModel;
                    O && O.SetGameTeamChatSessionEnabled(N.enableTeamChatSeparation);
                    var st = wt.gs.gstates.enableTeamChatSeparationCurrent != N.enableTeamChatSeparation;
                    wt.gs.gstates.enableTeamChatSeparationCurrent = N.enableTeamChatSeparation,
                        O && O.SetServerSignature(wt.gs.gstates.chatRoomSig, st);
                    break;
                case 201:
                    var nowtime = (new Date,
                              bt.DateTimeHelper.GetHourMinutesString())
                    !tab && this.gameHud.PostChatMessage(nowtime, 'notice', 'Due to server changes, the features of 2tab, bot, and full minimap will be temporarily unavailable', 'FFFFF')
                    !tab && this.gameHud.PostChatMessage(nowtime, 'notice', 'If you still want to use these features, you can use vpn to bypass the single connection restriction', 'FFFFF')
                    F = i.ReadStringEx();
                    var message = `<!--
<style>
#site_instruction_container{
  height: 180px;
}
</style>
-->
<!--
<div style="height:20px;"></div>
<p style="font-size: 30px">SAO</p>
-->

preset team tags:
<span style='color:#00AAFF'>【先輩】</span>,
<span style='color:#FF4488'>【敵】</span>,
<span style='color:#FF0000'>【紅】</span>,
<span style='color:#FFFFFF'>【白】</span>,
<span style='color:#0044FF'>【青】</span>,
<span style='color:#272727'>【黑】</span>,
<span style='color:#6FB7B7'>同窓会🦋</span>
<br />

<!--
<div style='font-size:16px'>
Players with the same tag as yours are team members. Do not eat them.<br />
味方をわざと食べてはいけません。またチャットでの暴言はやめましょう。<br />
-->

<!--
Other players are enamy that you can eat.　<br />
-->

<!--
Either presets or arbitrary team tags can be used. <br />
-->

<!--
If you join to preset teams, do not pair with players have other tags.
-->

<!--
<a style='color:#0F0' href='http://senpai-agar.online/ranking/' target='_blank'>Ranking</a>
<span>　</span>
-->

<!--<div style='font-size:18px; margin-top: 10px'>
<a style='color:#0F0' href='http://nano.senpai-agar.online' target='_blank'>nano server</a> NEW SERVER AVAILABLE!
</div>-->

<!--
<div style='color:#FFF; font-size:18px' href='http://mobile.senpai-agar.online' target='_blank'>
2017/4/28 14:20 ixagarからゲームサーバに接続できない問題があり対策を行っています。改善されるまでに複数回サーバを再起動します。<br />
2017/4/28 14:45 不具合の改善を完了しました。<br />
-->

</div>


</div>
`;
                    //this.gameHud.PostServerInstructionText(message);
                    break;
                case 202:
                    E = i.ReadStringEx();
                    this.gameHud.PostServerDisplayMessage(E);
                    break;
                case 203:
                    if (n)
                        break;
                    F = i.ReadStringEx();
                    this.gameHud.PostServerStatusData(F);
                    break;
                case 91:
                    if (n)
                        break;
                    i.ReadUint16();
                    var at = i.ReadUint16(),
                        lt = i.ReadUint16(),
                        ct = i.ReadUint16(),
                        ht = i.ReadUint16();
                    i.ReadStringEx(),
                        i.ReadUint32();
                    gVar.currentCount = at;
                    this.gameHud.PostServerUserNumData(at, ct, lt, ht);
                    break;
                case 161:
                    I = i.ReadUint32();
                    this.PostNodeRemoval(I,tab);
                    break;
                case 162:
                    s = i.ReadUint16();
                    var dt = i.ReadStringEx();
                    l = i.ReadStringEx(),
                        h = i.ReadUint16(),
                        c = i.ReadStringEx(),
                        d = i.ReadStringEx();
                    this.uMan.PostUserInfoData(s, dt, l, h, c, d);
                    break;
                case 163:
                    p = i.ReadUint16(),
                        f = i.ReadUint32();
                    this.uMan.PostPlayerColorData(p, f);
                    break;
                case 164:
                    h = i.ReadUint16(),
                        f = i.ReadUint32();
                    !tab && this.uMan.PostTeamInfoData(h, f);
                    break;
                case 166:
                    var ut = i.ReadInt32(),
                        pt = i.ReadInt32(),
                        ft = i.ReadFloat32(),
                        gt = (g = i.ReadInt32(),
                              m = i.ReadInt32(),
                              y = i.ReadUint8() > 0,
                              i.ReadUint16());
                    this.sight.FeedReplaySightState(ut, pt, ft, g, m, y, gt);
                    break;
                case 19:
                    i.ReadUint8();
                    var mt = i.ReadInt32(),
                        yt = i.ReadInt32(),
                        vt = i.ReadInt32(),
                        St = Date.now();
                    this.sight.teamCircleX = mt,
                        this.sight.teamCircleY = yt,
                        this.sight.teamCircleRadius = vt,
                        this.sight.teamCircleTimeStamp = St
                case 244:
                let _s = new Et.DataFrameWriter;
                _s.WriteUint8(244);
                let _a = _s.ArrayBuffer;
                this.gameCore.conn.SendPacket(_a)
            
            }
        },
            t
    }();
    e.NodeManager = C
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = function() {
        function t() {}
        return t.PermanentKeeped = [42, 45, 39, 36, 35, 65],
            t.NotForRecord = [43, 200, 201, 131, 133, 202],
            t
    }();
    e.OpcodeGroups = i;
    var o = function() {
        return function(t, e, n, i) {
            this.playerId = t,
                this.nx = e,
                this.ny = n,
                this.mass = i
        }
    }();
    e.TMapData = o;
    var r = function() {
        return function(t, e, n,k) {
            this.name = t,
                this.score = e,
                this.colorStr = n,
                this.trip = k
        }
    }();
    e.TLeaderboardData = r
}, function(t, e, n) {
    "use strict";
    var i, o = this && this.__extends || (i = Object.setPrototypeOf || {
        __proto__: []
    }
                                          instanceof Array && function(t, e) {
        t.__proto__ = e
    } ||
                                          function(t, e) {
        for (var n in e)
            e.hasOwnProperty(n) && (t[n] = e[n])
    },
                                          function(t, e) {
        function n() {
            this.constructor = t
        }
        i(t, e),
            t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
                                                           new n)
    }
                                         ),
        r = this && this.__decorate || function(t, e, n, i) {
            var o, r = arguments.length,
                s = r < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                s = Reflect.decorate(t, e, n, i);
            else
                for (var a = t.length - 1; a >= 0; a--)
                    (o = t[a]) && (s = (r < 3 ? o(s) : r > 3 ? o(e, n, s) : o(e, n)) || s);
            return r > 3 && s && Object.defineProperty(e, n, s),
                s
        };
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var s = n(5),
        a = n(10),
        l = n(0),
        c = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.uconfig = l.gs.uconfig,
                    t.skinMan = a.SkinImageManager.instance,
                    t
            }
            return o(t, e),
                t.prototype.mounted = function() {
                this.skinMan.bus.on("render", this.update.bind(this)),
                    window.ondragstart = function() {
                    return !1
                }
            },
                t.prototype.onCellClick = function(t) {
                var e = t.item.uri,
                    n = t.item.allowed;
                console.log(e)
                this.skinMan.setImageAvailability(e, !n)
            },
                t.prototype.onButton = function(t) {
                var e = t.target.dataset.sig;
                "acceptNewSkins" == e && this.uconfig.SetAcceptNewSkins(!0),
                    "declineNewSkins" == e && this.uconfig.SetAcceptNewSkins(!1),
                    "acceptAll" == e && this.skinMan.setImageAvailabilityAll(!0),
                    "declineAll" == e && this.skinMan.setImageAvailabilityAll(!1)
            },
                t = r([s.template(`"\n<skin-filter-panel>\n\t<style>\n\t\t.skin_filter_panel_root{\n\t\t\twidth: 400px;z-index:21;\n\t\t\theight: 530px;\n\t\t\tbackground-color: #F0F6FF;\n\t\t\tposition: absolute;\n\t\t\ttop: 34px;\n\t\t\tright: 6px;\n\t\t\tborder: solid 1px #44A;\n\t\t\tborder-radius: 2px;\n\t\t\tcolor: #448;\n\t\t\tpadding: 8px;\n\t\t\tfont-size: 16px;\n\t\t}\n\n\t\t.sf_skinlistbox_outer{\n\t\t\theight: 400px;\n\t\t\toverflow-y: scroll;\n\t\t\tborder: solid 1px #CCE;\n\t\t}\n\n\t\t.sf_skinlistbox{\n\t\t\tdisplay: flex;\n\t\t\tflex-wrap: wrap;\n\t\t\talign-items: flex-start;\n\t\t}\n\n\t\t.sf_skinlistbox > div{\n\t\t\twidth: 60px;\n\t\t\theight: 60px;\n\t\t\tdisplay: flex;\n\t\t\tborder: solid 1px #CCE;\n\t\t\tposition: relative;\n\t\t\tcursor: pointer;\n\t\t}\n\n\t\t.sf_skinlistbox > div > *{\n\t\t\tposition: absolute;\n\t\t\ttop: 0;\n\t\t}\n\t\t.sf_skinlistbox > div img{\n\t\t\tmax-width: 100%;\n\t\t\tmax-height: 100%;\n\t\t\tleft: 0;\n\t\t\tright: 0;\n\t\t\ttop: 0;\n\t\t\tbottom: 0;\n\t\t\tmargin: auto;\n\t\t}\n\n\t\t.sf_skinlistbox > div > .cover{\n\t\t\twidth: 100%;\n\t\t\theight: 100%;\n\t\t\tbackground-color: rgba(0, 0, 0, 0.4);\n\t\t}\n\n\t\t.sf_img_block{\n\t\t\topacity: 0.2;\n\t\t}\n\n\t\t.sf_box{\n\t\t\tmargin-bottom: 10px;\n\t\t}\n\n\t\t.sfbt{\n\t\t\tdisplay: inline-block;\n\t\t\tbackground-color: #FFF;\n\t\t\tcolor: #008;\n\t\t\tborder-radius: 2px;\n\t\t\tpadding: 0 4px;\n\t\t\tcursor: pointer;\n\t\t\tborder: solid 1px #008;\n\t\t}\n\n\t\t.sfbt_active{\n\t\t\tbackground-color: #0CF;\n\t\t}\n\t</style>\n\n\t<div class='skin_filter_panel_root'>\n\t\t<div class='sf_box'>\n\t\t\tskin過濾器\n\t\t</div>\n\n\t\t<div class='sf_skinlistbox_outer sf_box'>\n\t\t\t<div class='sf_skinlistbox'>\n\t\t\t\t<div each={allowed, uri in skinMan.skins} onclick={onCellClick}>\n\t\t\t\t\t<img src={uri} />\n\t\t\t\t\t<div class='cover' show={!allowed}>\n\t\t\t\t\t\t<img src='gr/blocked.png' class='sf_img_block' />\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div class='sf_box'>\n\t\t\t<div class='sfbt' onclick={onButton} data-sig='acceptAll'>\n\t\t\t\t全部顯示\n\t\t\t</div>\n\n\t\t\t<div class='sfbt' onclick={onButton} data-sig='declineAll'>\n\t\t\t\t隱藏全部\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div class='sf_box'>\n\t\t\t新skin預設顯示/隱藏:\n\n\t\t\t<div class={sfbt: true, sfbt_active: uconfig.acceptNewSkins} onclick={onButton} data-sig='acceptNewSkins'>\n\t\t\t\t顯示\n\t\t\t</div>\n\n\t\t\t<div class={sfbt: true, sfbt_active: !uconfig.acceptNewSkins} onclick={onButton} data-sig='declineNewSkins'>\n\t\t\t\t隱藏\n\t\t\t</div>\n\n\t\t</div>\n\n\t</div>\n</skin-filter-panel>\n"`)], t)
        }(s.Element);
    e.SkinFilterPanelTag = c
}, function(t, e, n) {
    "use strict";
    var i, o = this && this.__extends || (i = Object.setPrototypeOf || {
        __proto__: []
    }
                                          instanceof Array && function(t, e) {
        t.__proto__ = e
    } ||
                                          function(t, e) {
        for (var n in e)
            e.hasOwnProperty(n) && (t[n] = e[n])
    },
                                          function(t, e) {
        function n() {
            this.constructor = t
        }
        i(t, e),
            t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
                                                           new n)
    }
                                         ),
        r = this && this.__decorate || function(t, e, n, i) {
            var o, r = arguments.length,
                s = r < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                s = Reflect.decorate(t, e, n, i);
            else
                for (var a = t.length - 1; a >= 0; a--)
                    (o = t[a]) && (s = (r < 3 ? o(s) : r > 3 ? o(e, n, s) : o(e, n)) || s);
            return r > 3 && s && Object.defineProperty(e, n, s),
                s
        };
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var s = n(5),
        a = n(2),
        l = n(0),
        c = n(9),
        h = n(1),
        d = 260,
        u = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.uconfig = l.gs.uconfig,
                    t.cssColors = l.gs.ucolors.cssColors,
                    t.appConfig = a.AppConfigurator.instance,
                    t.utexts = l.gs.utexts,
                    t.isJapanese = a.AppConfigurator.instance.isJapanese,
                    t.model = c.ConfigHub.instance,
                    t.editModel = new c.ColorEditModel,
                    t.windowMouseHandlerProc = null,
                    t.pickerEndX = d - 6,
                    t
            }
            return o(t, e),
                t.prototype.mounted = function() {
                this.editModel.SetColor(this.model.curColorEntry.color),
                    this.UpdateColorView(),
                    window.addEventListener("mousemove", this.onWindowMouseMove.bind(this)),
                    window.addEventListener("mouseup", this.onWindowMouseUp.bind(this))
            },
                t.prototype.onCardSelected = function(t) {
                var e = t.currentTarget.value;
                this.model.selectColorCard(e),
                    this.editModel.SetColor(this.model.curColorEntry.color)
            },
                t.prototype.onCardSelected2 = function(t) {
                this.UpdateColorView()
            },
                t.prototype.onMainCanvasClick = function() {},
                t.prototype.onWindowMouseMove = function(t) {
                this.windowMouseHandlerProc && this.windowMouseHandlerProc(t)
            },
                t.prototype.onWindowMouseUp = function() {
                this.windowMouseHandlerProc = null
            },
                t.prototype.ReflectEditModelColorToModel = function() {
                this.model.curColorEntry.SetColor(this.editModel.color, !0),
                    this.UpdateColorView(),
                    this.update(),
                    this.appRoot.update()
            },
                t.prototype.removeFocusOnPage = function() {
                var t = document.activeElement;
                t && t.blur(),
                    window.getSelection().removeAllRanges()
            },
                t.prototype.onHueGaugeMouseDown = function(t) {
                var i = this,
                    o = t.target.getBoundingClientRect().left,
                    e = function(t) {
                        var e = t.pageX - o,
                            n = h.Nums.VMap(e, 0, i.pickerEndX, 0, .999, !0);
                        i.editModel.SetHue(n),
                            i.ReflectEditModelColorToModel(),
                            i.update()
                    };
                return e(t),
                    this.windowMouseHandlerProc = e,
                    t.preventDefault(),
                    !1
            },
                t.prototype.onMainGaugeMouseDown = function(t) {
                var r = this,
                    e = t.target.getBoundingClientRect(),
                    s = e.left,
                    a = e.top,
                    n = function(t) {
                        var e = t.pageX - s,
                            n = t.pageY - a,
                            i = h.Nums.VMap(e, 0, r.pickerEndX, 0, 1, !0),
                            o = h.Nums.VMap(n, 0, r.pickerEndX, 0, 1, !0);
                        r.editModel.SetSV(i, 1 - o),
                            r.ReflectEditModelColorToModel()
                    };
                return n(t),
                    this.windowMouseHandlerProc = n,
                    t.preventDefault(),
                    !1
            },
                t.prototype.onAlphaGaugeMouseDown = function(t) {
                var i = this,
                    o = t.target.getBoundingClientRect().left,
                    e = function(t) {
                        var e = t.pageX - o,
                            n = h.Nums.VMap(e, 0, i.pickerEndX, 0, 1, !0);
                        i.editModel.SetAlpha(n),
                            i.ReflectEditModelColorToModel()
                    };
                return e(t),
                    this.windowMouseHandlerProc = e,
                    t.preventDefault(),
                    !1
            },
                t.prototype.onColorTextInput = function(t) {
                var e = t.target.value;
                this.editModel.SetByHtmlColor(e),
                    this.ReflectEditModelColorToModel()
            },
                t.prototype.UpdateColorView = function() {
                this.drawAlphaCanvas(),
                    this.drawMainCanvas();
                var t = this.pickerEndX;
                this.refs.knob_hue.style.left = this.editModel.hue * t + "px",
                    this.refs.knob_alpha.style.left = this.editModel.alpha * t + "px",
                    this.refs.knob_main.style.left = this.editModel.sat * t + "px",
                    this.refs.knob_main.style.top = (1 - this.editModel.bri) * t + "px"
            },
                t.prototype.drawMainCanvas = function() {
                var t = this.refs.picker_main_canvas,
                    e = t.width,
                    n = t.height,
                    i = t.getContext("2d");
                i.clearRect(0, 0, e, n);
                for (var o = 360 * this.editModel.hue, r = 0; r < n; r++) {
                    var s = i.createLinearGradient(0, 0, e, 0),
                        a = "hsl(" + o + ",0%," + h.Nums.VMap(r, 0, n, 100, 0) + "%)",
                        l = "hsl(" + o + ",100%," + h.Nums.VMap(r, 0, n, 50, 0) + "%)";
                    s.addColorStop(0, a),
                        s.addColorStop(1, l),
                        i.fillStyle = s,
                        i.fillRect(0, r, e, 1)
                }
            },
                t.prototype.drawAlphaCanvas = function() {
                var t = this.refs.picker_alpha_canvas,
                    e = t.width,
                    n = t.height,
                    i = t.getContext("2d");
                i.clearRect(0, 0, e, n),
                    i.beginPath();
                var o = i.createLinearGradient(0, 0, e, 0),
                    r = this.model.curColorEntry.color,
                    s = r >> 16 & 255,
                    a = r >> 8 & 255,
                    l = 255 & r;
                o.addColorStop(0, "rgba(" + s + "," + a + "," + l + ",0.0)"),
                    o.addColorStop(1, "rgba(" + s + "," + a + "," + l + ",1.0)"),
                    i.fillStyle = o,
                    i.rect(0, 0, e, n),
                    i.fill()
            },
                t.prototype.optionChanged = function(t, e) {
                t.item.SetValue(e)
            },
                t.prototype.checkChanged = function(t) {
                this.optionChanged(t, t.target.checked)
            },
                Object.defineProperty(t.prototype, "appRoot", {
                get: function() {
                    return this.parent.parent
                },
                enumerable: !0,
                configurable: !0
            }),
                t.prototype.onConfigTextInput = function(t) {
                l.gs.uconfig.SetValue(t.target.name, t.target.value)
            },
                t.prototype.onConfigCheckChanged = function(t) {
                l.gs.uconfig.SetValue(t.target.name, t.target.checked)
            },
                t = r([s.template(`<color-config-panel><style></style></color-config-panel>`)], t)
        }(s.Element);
    e.ColorConfigPanelTag = u
}, function(t, e, n) {
    "use strict";
    var i, o = this && this.__extends || (i = Object.setPrototypeOf || {
        __proto__: []
    }
                                          instanceof Array && function(t, e) {
        t.__proto__ = e
    } ||
                                          function(t, e) {
        for (var n in e)
            e.hasOwnProperty(n) && (t[n] = e[n])
    },
                                          function(t, e) {
        function n() {
            this.constructor = t
        }
        i(t, e),
            t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
                                                           new n)
    }
                                         ),
        r = this && this.__decorate || function(t, e, n, i) {
            var o, r = arguments.length,
                s = r < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                s = Reflect.decorate(t, e, n, i);
            else
                for (var a = t.length - 1; a >= 0; a--)
                    (o = t[a]) && (s = (r < 3 ? o(s) : r > 3 ? o(e, n, s) : o(e, n)) || s);
            return r > 3 && s && Object.defineProperty(e, n, s),
                s
        };
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var s = n(5),
        a = n(4),
        l = n(2),
        c = n(0),
        h = n(9),
        d = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.uconfig = c.gs.uconfig,
                    t.userEntry = a.gameCore.userEntryMan,
                    t.cssColors = c.gs.ucolors.cssColors,
                    t.appConfig = l.AppConfigurator.instance,
                    t.gstates = c.gs.gstates,
                    t.usupport = c.gs.usupport,
                    t.utexts = c.gs.utexts,
                    t.configHub = h.ConfigHub.instance,
                    t.isJapanese = l.AppConfigurator.instance.isJapanese,
                    t
            }
            return o(t, e),
                t.prototype.optionChanged = function(t, e) {
                t.item.m.SetValue(e)
            },
                t.prototype.checkChanged = function(t) {
                this.optionChanged(t, t.target.checked)
            },
                t.prototype.colorChanged = function(t) {
                return t.item.SetColor(t.target.value),
                    this.appRoot.update(),
                    !1
            },
                t.prototype.mounted = function() {
                a.gameCore.gameHudModel.configUpdatedProc = this.update.bind(this)
            },
                Object.defineProperty(t.prototype, "appRoot", {
                get: function() {
                    return this.parent.parent
                },
                enumerable: !0,
                configurable: !0
            }),
                t.prototype.getHotKeyFromKeyEvent = function(t, e) {
                if (void 0 === e && (e = !1),
                    t.repated)
                    return -2;
                var n = t.which;
                if (16 == n || 17 == n || 18 == n || 229 == n)
                    return -2;
                if (8 == n || 46 == n)
                    return -1;
                var i = t.keyCode;
                t.ctrlKey && (i += c.ModificationKeyCode.Ctrl),
                    t.shiftKey && (i += c.ModificationKeyCode.Shift),
                    t.altKey && (i += c.ModificationKeyCode.Alt);
                var o = this.configHub;
                return (e ? o.controlEntries.every(function(t) {
                    return t.hotKey != i
                }) && o.gameDisplayEntries.every(function(t) {
                    return t.toggleHotKey != i
                }) : o.controlEntries.every(function(t) {
                    return t.hotKey != i
                }) && o.cellDisplayEntries.every(function(t) {
                    return t.toggleHotKey != i && t.holdHotKey != i
                }) && o.gameDisplayEntries.every(function(t) {
                    return t.toggleHotKey != i
                })) ? i : -2
            },
                t.prototype.setToggleHotKey_Cells = function(t) {
                var e = this.getHotKeyFromKeyEvent(t, !0); -
                    2 != e && t.item.m.SetToggleHotKey(e);
                return t.preventDefault(),
                    !1
            },
                t.prototype.setHoldHotKey_Cells = function(t) {
                var e = this.getHotKeyFromKeyEvent(t, !0); -
                    2 != e && t.item.m.SetHoldHotKey(e);
                return t.preventDefault(),
                    !1
            },
                t.prototype.setToggleHotKey_Game = function(t) {
                var e = this.getHotKeyFromKeyEvent(t); -
                    2 != e && t.item.m.SetToggleHotKey(e);
                return t.preventDefault(),
                    !1
            },
                t.prototype.setControlHotKey = function(t) {
                var e = this.getHotKeyFromKeyEvent(t); -
                    2 != e && t.item.m.SetHotKey(e);
                return t.preventDefault(),
                    !1
            },
                t.prototype.onConfigTextInput = function(t) {
                c.gs.uconfig.SetValue(t.target.name, t.target.value)
            },
                t.prototype.onConfigCheckChanged = function(t) {
                c.gs.uconfig.SetValue(t.target.name, t.target.checked)
            },
                t.prototype.rangeInputChanged = function(t) {
                c.gs.uconfig.SetValue(t.target.name, t.target.value)
            },
                t.prototype.onResetButtonCliecked = function() {
                c.gs.uconfig.RecoverDefaultConfig()
            },
                t.prototype.onInputButtonCliecked = function() {
                const fileUploader = document.querySelector('#input-Button');
                var data = {};
                fileUploader.addEventListener('change', (e) => {
                    const reader = new FileReader();
                    reader.addEventListener('loadend', (e) => {
                        const text = e.srcElement.result;
                        data = JSON.parse(text)
                        data.lwga11_user_config && localStorage.setItem("lwga11_user_config",data.lwga11_user_config)
                        data.profileExData && localStorage.setItem("profileExData",data.profileExData)
                        data.lwga_user_entries && localStorage.setItem("lwga_user_entries",data.lwga_user_entries)
                        data.lwga11_color_defs && localStorage.setItem("lwga11_color_defs",data.lwga11_color_defs)
                    });
                    reader.readAsText(e.target.files[0]);
                });

            },
                t.prototype.onOutputButtonCliecked = function() {
                var data = {
                    "lwga11_user_config" : localStorage.getItem("lwga11_user_config") ?? "" ,
                    "profileExData" : localStorage.getItem("profileExData") ?? "",
                    "lwga_user_entries" : localStorage.getItem("lwga_user_entries") ?? "",
                    "lwga11_color_defs" : localStorage.getItem("lwga11_color_defs") ?? ""
                }
                let dataStr = JSON.stringify(data);
                let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

                let exportFileDefaultName = 'lwga-config.json';

                let linkElement = document.createElement('a');
                linkElement.setAttribute('href', dataUri);
                linkElement.setAttribute('download', exportFileDefaultName);
                linkElement.click();
            },
                t = r([s.template(`
<main-config-panel>
    <style>
    </style>
    </main-config-panel>
`)], t)
        }(s.Element);
    e.MainConfigPanelTag = d
}, function(t, e, n) {
    "use strict";
    var i, o = this && this.__extends || (i = Object.setPrototypeOf || {
        __proto__: []
    }
                                          instanceof Array && function(t, e) {
        t.__proto__ = e
    } ||
                                          function(t, e) {
        for (var n in e)
            e.hasOwnProperty(n) && (t[n] = e[n])
    },
                                          function(t, e) {
        function n() {
            this.constructor = t
        }
        i(t, e),
            t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
                                                           new n)
    }
                                         ),
        r = this && this.__decorate || function(t, e, n, i) {
            var o, r = arguments.length,
                s = r < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                s = Reflect.decorate(t, e, n, i);
            else
                for (var a = t.length - 1; a >= 0; a--)
                    (o = t[a]) && (s = (r < 3 ? o(s) : r > 3 ? o(e, n, s) : o(e, n)) || s);
            return r > 3 && s && Object.defineProperty(e, n, s),
                s
        };
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var profiles = "",
        a = 30;
    for (var l = 0; l < a; l++) {
        profiles += `
<div id="skin${l}" onclick={ChangeSkin}>
        <div id="profile-bg${l}" class="UIProfiles">
    <img id="prof-${l}" class="profs" src=\'{ userEntry.infos[${l}].skinUrl }\'><label class="prof-label" style="width:120px;white-space: nowrap;">{ userEntry.infos[${l}].name }</label><br>
       </div>
</div>
        `
    }
    var c = n(5),
        h = n(4),
        l = n(2),
        d = n(0),
        b = n(9),
        _o = n(3),
        u = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.uconfig = d.gs.uconfig,
                    t.cssColors = d.gs.ucolors.cssColors,
                    t.siteTitle = l.AppConfigurator.instance.siteTitleString,
                    t.appConfig = l.AppConfigurator.instance,
                    t.userEntry = h.gameCore.userEntryMan,
                    t.configHub = b.ConfigHub.instance,
                    t.usupport = d.gs.usupport,
                    t.editModel = new b.ColorEditModel,
                    t.ws = h.gameCore.conn,
                    t.utexts = d.gs.utexts,
                    t.isJapanese = l.AppConfigurator.instance.isJapanese,
                    t.appHelper = _o.AppHelper
                    t.selectedTabName = "home",
                    t
            }
            return o(t, e),
                t.prototype.selectTab = function(t) {
                    this.selectedTabName = t
                },
                Object.defineProperty(t.prototype, "appRoot", {
                get: function() {
                    return this.parent.parent
                },
                enumerable: !0,
                configurable: !0
                }),
                t.prototype.isActive = function(t) {
                    return t == this.selectedTabName
                },
                t.prototype.mounted = function() {
                    this.userEntry.indexChangedProc = this.update.bind(this);
                    this.userEntry.skinChangedProc = this.update.bind(this);
                    d.gs.uconfig.RegisterChangedProc("panelBackImageUri", this.update.bind(this));
                    d.gs.uconfig.RegisterChangedProc("panelBackImageAlpha", this.update.bind(this));
                },
                t.prototype.onArrowButton = function(t) {
                var e = "arrow_left" == t.target.id ? -1 : 1;
                h.gameCore.userEntryMan.ShiftIndex(e)
                },
                t.prototype.startPlay = function(t) {
                    d.gs.gstates.setMainPanelVisible(!1)
                    return h.gameCore.StartPlay()
                },
                t.prototype.startSpectate = function(t) {
                    d.gs.gstates.setMainPanelVisible(!1)
                    return h.gameCore.StartSpectate()
                },
                t.prototype.ChangeSkin = function(t) {
                    h.gameCore.userEntryMan.ChangeIndex(parseInt(t.currentTarget.id.replace("skin", ""), 10))
                },
                t.prototype.inputText = function(t) {
                    this.userEntry.SetProp(t.target.name, t.target.value)
                },
                t.prototype.onConfigCheckChanged = function(t) {
                d.gs.uconfig.SetValue(t.target.name, t.target.checked)
                },
                t.prototype.rangeInputChanged = function(t) {
                d.gs.uconfig.SetValue(t.target.name, t.target.value)
                },
                t.prototype.onConfigTextInput = function(t) {
                d.gs.uconfig.SetValue(t.target.name, t.target.value)
                },
                t.prototype.connect = function(t) {  
                $('#notify_log').html('')
                    if(t.target.id == "caffe" || t.target.id == "caffe-label"){
                                gVar.reConn = 0;
                                gTargetSite = 'caffe';
                                h.gameCore.ReloadAppConfig();
                                h.gameCore.ConnectToGameServer();
                    }
                    if(t.target.id == "sao" || t.target.id == "sao-label"){
                                gVar.reConn = 0;
                                gTargetSite = 'sao'
                                h.gameCore.ReloadAppConfig()
                                this.ws.ws2 && this.ws.ws2.close()
                                h.gameCore.ConnectToGameServer()
                    }
                    if(t.target.id == "EA-Nano" || t.target.id == "EA-Nano-label"){
                                gVar.reConn = 0;
                                gTargetSite = 'EA-Nano'
                                h.gameCore.ReloadAppConfig()
                                this.ws.ws2 && this.ws.ws2.close()
                                h.gameCore.ConnectToGameServer()
                    }
                    if(t.target.id == "EA-Sandbox" || t.target.id == "EA-Sandbox-label"){
                                gVar.reConn = 0;
                                gTargetSite = 'EA-Sandbox'
                                h.gameCore.ReloadAppConfig()
                                this.ws.ws2 && this.ws.ws2.close()
                                h.gameCore.ConnectToGameServer()
                    }
                    if(t.target.id == "NA-Nano" || t.target.id == "NA-Nano-label"){
                                gVar.reConn = 0;
                                gTargetSite = 'NA-Nano'
                                h.gameCore.ReloadAppConfig()
                                this.ws.ws2 && this.ws.ws2.close()
                                h.gameCore.ConnectToGameServer()
                    }
                },
                t.prototype.hextoDec = function(val) {
                var hex = val.split('').reverse().join('');
                var dec = 0;
                for (i = 0; i < hex.length; i++) {
                    var conv = '0123456789ABCDEF'.indexOf(hex[i]);
                    dec += conv * Math.pow(16, i);

                }
                return dec;
                },
                t.prototype.colorChanged = function(t) {
                var color = this.hextoDec(t.target.value)
                 var key = t.target.name;
                    this.configHub.selectColorCard(key);
                    t.item.m.SetColor(color,!0),
                    this.parent.parent.update();
                },
                t.prototype.getHotKeyFromKeyEvent = function(t, e) {
                if (void 0 === e && (e = !1),
                    t.repated)
                    return -2;
                var n = t.which;
                if (16 == n || 17 == n || 18 == n || 229 == n)
                    return -2;
                if (8 == n || 46 == n)
                    return -1;
                var i = t.keyCode;
                t.ctrlKey && (i += d.ModificationKeyCode.Ctrl),
                    t.shiftKey && (i += d.ModificationKeyCode.Shift),
                    t.altKey && (i += d.ModificationKeyCode.Alt);
                var o = this.configHub;
                return (e ? o.controlEntries.every(function(t) {
                    return t.hotKey != i
                }) && o.gameDisplayEntries.every(function(t) {
                    return t.toggleHotKey != i
                }) : o.controlEntries.every(function(t) {
                    return t.hotKey != i
                }) && o.cellDisplayEntries.every(function(t) {
                    return t.toggleHotKey != i && t.holdHotKey != i
                }) && o.gameDisplayEntries.every(function(t) {
                    return t.toggleHotKey != i
                })) ? i : -2
            },
                t.prototype.setControlHotKey = function(t) {
                var e = this.getHotKeyFromKeyEvent(t); -
                    2 != e && t.item.m.SetHotKey(e);
                return t.preventDefault(),
                    !1
            },t.prototype.optionChanged = function(t, e) {
                t.item.m.SetValue(e)
            },
                t.prototype.checkChanged = function(t) {
                this.optionChanged(t, t.target.checked)
            },
                t.prototype.swaptab = function(t) {
                (gTargetSite == "caffe" || gTargetSite == "sao") && !gVar.conn2.isAlive && $('.preview-img2').toggleClass('on') && $('.tab').toggleClass('on')
                if($('.preview-img2').hasClass('on')){
                    gVar.swap = !0
                    $('#preview-img').css('background-image',`url("${this.userEntry.curInfo.skinUrl}")`)
                    $('#preview-img2').css('background-image',`url("${this.userEntry.curInfo.skinUrl2}")`)
                    $('#preview-img-tab').css('background-image',`url("${this.userEntry.curInfo.tabSkinUrl}")`)
                    $('#preview-img2-tab').css('background-image',`url("${this.userEntry.curInfo.tabSkinUrl2}")`)
                    $('.tab').css('opacity',1)
                }
                else{
                    gVar.swap = !1
                    gVar.controlConn2 = !1
                    $('#preview-img').css('background-image',`url("${this.userEntry.curInfo.skinUrl}")`)
                    $('#preview-img-tab').css('background-image',`url("${this.userEntry.curInfo.skinUrl2}")`)
                    $('.tab').css('opacity',0.3)
                }
            },
                t.prototype.changeUserSig = function(e) {
                localStorage.setItem("UniChatUserSignature", e.target.value)
            },
                t.prototype.changechatSig = function(e) {
                localStorage.setItem("UniChatServerSignature", e.target.value)
            },
                t.prototype.genusig = function(e) {
                var newsig = _o.AppHelper.GenerateRandomUserEnvSig(6)
                $('#usig').val(newsig)
                localStorage.setItem("UniChatUserSignature", newsig)
            },
                t.prototype.onResetButtonCliecked = function() {
                d.gs.uconfig.RecoverDefaultConfig()
            },
                t.prototype.onInputButtonCliecked = function() {
                const fileUploader = document.querySelector('#input-Button');
                var data = {};
                fileUploader.addEventListener('change', (e) => {
                    const reader = new FileReader();
                    reader.addEventListener('loadend', (e) => {
                        const text = e.srcElement.result;
                        data = JSON.parse(text)
                        data.lwga11_user_config && localStorage.setItem("lwga11_user_config",data.lwga11_user_config)
                        data.profileExData && localStorage.setItem("profileExData",data.profileExData)
                        data.lwga_user_entries && localStorage.setItem("lwga_user_entries",data.lwga_user_entries)
                        data.lwga11_color_defs && localStorage.setItem("lwga11_color_defs",data.lwga11_color_defs)
                    });
                    reader.readAsText(e.target.files[0]);
                });

            },
                t.prototype.onOutputButtonCliecked = function() {
                var data = {
                    "lwga11_user_config" : localStorage.getItem("lwga11_user_config") ?? "" ,
                    "profileExData" : localStorage.getItem("profileExData") ?? "",
                    "lwga_user_entries" : localStorage.getItem("lwga_user_entries") ?? "",
                    "lwga11_color_defs" : localStorage.getItem("lwga11_color_defs") ?? ""
                }
                let dataStr = JSON.stringify(data);
                let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

                let exportFileDefaultName = 'lwga-config.json';

                let linkElement = document.createElement('a');
                linkElement.setAttribute('href', dataUri);
                linkElement.setAttribute('download', exportFileDefaultName);
                linkElement.click();
            },
                

                t = r([c.template(`'\n
<main-panel>\n\t
    <style>
    </style>\n\t
    <div id="overlays">
        <div id="helloContainer">
            <div id="left-container" class="side-container left-side">
                <div class="UI-panel UI-side-panel UI-profiles">
                    <ul class="nav nav-tabs">
                        <li class="active"><a data-toggle="tab" href="#servers"><i class="material-icons">account_circle</i></a></li>
                    </ul>
                    <div class="profiles-panel">
                        ${profiles}
                    </div>
                </div>
            </div>
            <div id="mainPanel" class="UI-panel" style="display: inline-block !important">
                <form role="form">
                    <ul class="nav nav-tabs" role="tablist">
                        <li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab"><i class="material-icons">home</i></a></li>
                        <li role="presentation"><a href="#settings" aria-controls="settings" role="tab" data-toggle="tab"><i class="material-icons">settings</i></a></li>
                        <li role="presentation"><a href="#theming" aria-controls="theming" role="tab" data-toggle="tab"><i class="material-icons">brush</i></a></li>
                        <li role="presentation"><a href="#hotkeys" aria-controls="hotkeys" role="tab" data-toggle="tab"><i class="material-icons">keyboard</i></a></li>
                        <li role="presentation"><a href="#extra" aria-controls="extra" role="tab" data-toggle="tab"><i class="material-icons">code</i></a></li>
                    </ul>
                    <div class="tab-content">
                        <div role="tabpanel" class="tab-pane fade in active" id="home">
                            <div id="profile-main">
                                <div id="profile-pic" class="form-group clearfix" style="display:flex;justify-content: center;">
                                    <div class="nav2 arrow-left" onclick={onArrowButton}></div>
                                    <div id="preview-wrap" style="display:flex;width:350px" onclick={swaptab}>
                                        <div id="preview-img-area">
                                            <div id="preview-container" style="display:flex;position: relative;">
                                                <div class="preview-img" id="preview-img" style="background-image: url({userEntry.curInfo.skinUrl});"></div>
                                                <div class="preview-img2" id="preview-img2"></div>
                                            </div>
                                        </div>
                                        <div id="preview-img-area">
                                            <div id="preview-container" style="display:flex;position: relative;">
                                                <div class="preview-img" id="preview-img-tab" style="background-image: url({userEntry.curInfo.skinUrl2});"></div>
                                                <div class="preview-img2" id="preview-img2-tab"></div>
                                            </div>
                                        </div>
                                        <div class="nav2 arrow-right" onclick={onArrowButton}></div>
                                    </div>
                                </div>
                            </div>
                            <div id="profile-container">
                                <div id="teamNameContainer" class="input-group">
                                    <input type="text" id="team_name" class="form-control" placeholder="Team" list="typelist" value={userEntry.curInfo.team} spellcheck="false" maxlength="10" name="team" oninput={inputText}>
                                    <input type="text" id="team_name_tab" class="form-control tab" placeholder="Tab_Team" list="typelist" value={userEntry.curInfo.tabTeam} spellcheck="false" maxlength="10" name="tabTeam" oninput={inputText}>
                                    <datalist id="typelist">
                                      <option>【先輩】</option>
                                      <option>【敵】</option>
                                      <option>【紅】</option>
                                      <option>【白】</option>
                                      <option>【黑】</option>
                                    </datalist>
                                </div>
                                <div id="teamCodeContainer" class="input-group">
                                    <input type="text" id="team_code" class="form-control" placeholder="Code" value={userEntry.curInfo.code} spellcheck="false" maxlength="10" name="code" oninput={inputText}>
                                    <input type="text" id="team_code" class="form-control tab" placeholder="Tab_Code" value={userEntry.curInfo.tabCode} spellcheck="false" maxlength="10" name="tabCode" oninput={inputText}>
                                </div>
                                <div id="nickContainer">
                                    <input id="nick" type="text" class="form-control" placeholder="Nickname" value={userEntry.curInfo.name} spellcheck="false" maxlength="15" name="name" oninput={inputText}>
                                    <input id="nick" type="text" class="form-control tab" placeholder="Tab_Nickname" value={userEntry.curInfo.tabName} spellcheck="false" maxlength="15" name="tabName" oninput={inputText}>
                                </div>
                                <input type="text" id="skin_url" class="form-control" spellcheck="false" placeholder="Skin URL" name="skinUrl" oninput={inputText} value={userEntry.curInfo.skinUrl}>
                                <input type="text" id="skin_url2" class="form-control" spellcheck="false" placeholder="Skin URL2" name="skinUrl2" oninput={inputText} value={userEntry.curInfo.skinUrl2}>
                                <input type="text" id="tab_skin_url" class="form-control tab" spellcheck="false" placeholder="Tab Skin URL" name="tabSkinUrl" oninput={inputText} value={userEntry.curInfo.tabSkinUrl}>
                                <input type="text" id="tab_skin_url2" class="form-control tab" spellcheck="false" placeholder="Tab Skin URL2" name="tabSkinUrl2" oninput={inputText} value={userEntry.curInfo.tabSkinUrl2}>
                            </div>
                            <div onclick={startPlay} class="btn btn-play btn-success"><i id="icon" class="material-icons">play_arrow</i></div>
                            <div onclick={startSpectate} class="btn btn-warning btn-spectate"><i id="icon" class="material-icons">visibility</i></div>
                        </div>
                        <div role="tabpanel" class="tab-pane fade" id="settings">
                            <div class="settingsRow" style="display: flex;align-items: end;"><i class="material-icons">settings</i>
                                <div>{appConfig.isJapanese ? '基本設定' : 'Basic'}</div>
                            </div>
                            <hr id="server-hr">
                            <div class="container">
                                <div class="settingsRow">
                                    <div class="col-xs-6 firstSettings">
                                        <div each={m in configHub.cellDisplayEntries} style="float:left;width:45%;display:flex;margin-top:10px;">
                                            <input id="{m.key}" checked={m.value} class="check-slider__check" type="checkbox" onChange={checkChanged}> {m.text}
                                            <br>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="settingsRow" style="display: flex;align-items: end;"><i class="material-icons">settings</i>
                                <div>{appConfig.isJapanese ? '球設定' : 'Cell'}</div>
                            </div>
                            <hr id="server-hr">
                            <div class="container">
                                <div class="settingsRow">
                                    <div class="col-xs-6 firstSettings">
                                        <div each={m in configHub.gameDisplayEntries} style="float:left;width:45%;display:flex;margin-top:10px;">
                                            <input id="{m.key}" checked={m.value} class="check-slider__check" type="checkbox" onChange={checkChanged}> {m.text}
                                            <br>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="settingsRow" style="display: flex;align-items: end;"><i class="material-icons">settings</i>
                                <div>{appConfig.isJapanese ? '額外設定' : 'Extra'}</div>
                            </div>
                            <hr id="server-hr">
                            <div class="container">
                                <div class="settingsRow">
                                    <div class="col-xs-6 firstSettings">
                                        <div each={m in configHub.basicBehaviorEntries} style="float:left;width:45%;display:flex;margin-top:10px;">
                                            <input id="{m.key}" checked={m.value} class="check-slider__check" type="checkbox" onChange={checkChanged}> {m.text}
                                            <br>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr id="server-hr">
                            <div class="toggles">

                                {utexts.lbtCameraZoomSpeed}: <span id="CameraZoomSpeed_t">{uconfig.CameraZoomSpeed}%</span>
                                <input class="range-slider__range" style="width:100%" type="range" id="InterpolationSpeed" min='75' max='125' step='1' name='CameraZoomSpeed' value={uconfig.CameraZoomSpeed} oninput={rangeInputChanged}> {utexts.lbtCameraMovementSpeed}: <span id="CameraMovementSpeed_t">{uconfig.CameraMovementSpeed}</span>
                                <input class="range-slider__range" style="width:100%" type="range" id="CameraMovementSpeed" min='-25' max='75' step='1' name='CameraMovementSpeed' value={uconfig.CameraMovementSpeed} oninput={rangeInputChanged}> {utexts.lbtInterpolationResponce}: <span id="InterpolationSpeed_t">{usupport.InterpolationSpeedText}</span>
                                <input class="range-slider__range" style="width:100%" type="range" id="InterpolationSpeed" min='-0.5' max='1.0' step='0.01' name='InterpolationSpeed' value={uconfig.InterpolationSpeed} oninput={rangeInputChanged}> {utexts.lbtInterpolationType}: <span id="InterpolationType_t">{usupport.InterpolationTypeText}</span>
                                <input class="range-slider__range" style="width:100%" type="range" id="InterpolationType" min='0.0' max='2.0' step='1.0' name='InterpolationType' value={uconfig.InterpolationType} oninput={rangeInputChanged}> {utexts.lbtMarkerOpacity}: <span id="MarkerOpacity_t">{uconfig.MarkerAlpha * 100 >> 0}%</span>
                                <input class="range-slider__range" style="width:100%" type="range" id="MarkerAlpha" min='0.0' max='1.0' step='0.1' name='MarkerAlpha' value={uconfig.MarkerAlpha} oninput={rangeInputChanged}> {utexts.lbtCursorLineThickness}: <span id="CursorLineThickness_t">{uconfig.CursorLineThickness}</span>
                                <input class="range-slider__range" style="width:100%" type="range" id="CursorLineThickness" min='1.0' max='30.0' step='1.0' name='CursorLineThickness' value={uconfig.CursorLineThickness} oninput={rangeInputChanged}> {utexts.lbtPlayerCellsAlpha}: <span id="PlayerCellsAlpha_t">{uconfig.PlayerCellsAlpha * 100 >> 0}%</span>
                                <input class="range-slider__range" style="width:100%" type="range" id="PlayerCellsAlpha" min='0.0' max='1.0' step='0.1' name='PlayerCellsAlpha' value={uconfig.PlayerCellsAlpha} oninput={rangeInputChanged}> {utexts.lbtPlayerLabelsAlpha}: <span id="PlayerLabelsAlpha_t">{uconfig.PlayerLabelsAlpha* 100 >> 0}%</span>
                                <input class="range-slider__range" style="width:100%" type="range" id="PlayerLabelsAlpha" min='0.25' max='1.0' step='0.05' name='PlayerLabelsAlpha' value={uconfig.PlayerLabelsAlpha} oninput={rangeInputChanged}> {utexts.lbtPelletCellsAlpha}: <span id="PelletCellsAlpha_t">{uconfig.PelletCellsAlpha* 100 >> 0}%</span>
                                <input class="range-slider__range" style="width:100%" type="range" id="PelletCellsAlpha" min='0.25' max='1.0' step='0.05' name='PelletCellsAlpha' value={uconfig.PelletCellsAlpha} oninput={rangeInputChanged}> {utexts.lbtAnotherSectionCellsAlpha}: <span id="AnotherSectionCellsAlpha_t">{uconfig.AnotherSectionCellsAlpha* 100 >> 0}%</span>
                                <input class="range-slider__range" style="width:100%" type="range" id="AnotherSectionCellsAlpha" min='0' max='1.0' step='0.05' name='AnotherSectionCellsAlpha' value={uconfig.AnotherSectionCellsAlpha} oninput={rangeInputChanged}> {utexts.lbtRenderQuality}: <span id="RenderQuality_t">{usupport.RenderQualityText}</span>
                                <input class="range-slider__range" style="width:100%" type="range" id="RenderQuality" min='0' max='2' step='1' name='RenderQuality' value={uconfig.RenderQuality} oninput={rangeInputChanged}> {utexts.lbtCaptureDuration}: <span id="CaptureDuration_t">{usupport.QuickCaptureTimeSec}{appConfig.isJapanese ? '秒' : 'sec'}</span>
                                <input class="range-slider__range" style="width:100%" type="range" id="CaptureDuration" min='0' max='5' step='1' name='QuickCaptureTimeOption' value={uconfig.QuickCaptureTimeOption} oninput={rangeInputChanged}> {utexts.lbtFrameRate}: <span id="FrameRate_t">{usupport.FrameRateText}%</span>
                                <input class="range-slider__range" style="width:100%" type="range" id="FrameRate" min='0' max='4' step='1' name='FrameRateOption' value={uconfig.FrameRateOption} oninput={rangeInputChanged}> {utexts.lbtSignal}: <span id="signalKey_t">{usupport.signalKey}</span>
                                <input class="range-slider__range" style="width:100%" type="range" id="signalKey" min='0' max='2' step='1' name='signalKey' value={uconfig.signalKey} oninput={rangeInputChanged}> {utexts.lbtSpawnLatency}: <span id="SpawnLatency_t">{uconfig.SpawnLatency}ms</span>
                                <input class="range-slider__range" style="width:100%" type="range" id="SpawnLatency" min='100' max='1000' step='100' name='SpawnLatency' value={uconfig.SpawnLatency} oninput={rangeInputChanged}>

                            </div>
                        </div>
                        <div role="tabpanel" class="tab-pane fade" id="theming">
                            <div class="container">
                                <div class="settingsRow">
                                    <div each={m in configHub.colorEntries} style="display:flex;margin-bottom:10px;">
                                        <div class="picker"><label>{m.text}</label></div>
                                        <div class="color-preview" id={m.key} style="background-color: {m.cssColor};"></div>
                                        <div class="picker"><input class="jscolor" data-jscolor="{}" name={m.key} oninput={colorChanged} value={m.htmlColor}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div role="tabpanel" class="tab-pane fade" id="hotkeys">
                            <div class="container">
                                <div class="settingsRow">
                                    <div class="col-xs-6 firstSettings">
                                        <div each={m in configHub.controlEntries} style="float:left;width:45%;margin-bottom:10px;margin-right:5px;line-height: 30px">
                                            <div style="float:left;width:55%">{m.text}</div>
                                            <input id="{m.key}" value={m.hotKeyText} style="width:55px;text-align:center;height:30px;float:right;border: solid 1px !important;" type="text" onkeydown={setControlHotKey}>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div role="tabpanel" class="tab-pane fade" id="extra">
                            <div class="container">
                                <div class="settingsRow">
                                    <table style="        font-size: 14px;width: 200px;position: absolute;
    left: 8%;
    top: 12%;border-collapse:separate; border-spacing:0px 10px;">
                                        <tr>
                                            <td>
                                                <div class='td_text' style='width:220px'>{utexts.lbtOutputConfig}</div>
                                            </td>
                                            <td><input type='button' class='reset_buttons' value='{utexts.lbtOutputConfig}' onclick={onOutputButtonCliecked}/></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class='td_text' style='width:220px'>{utexts.lbtInputConfig}</div>
                                            </td>
                                            <td><input type='file' class='reset_buttons' id="input-Button" onclick={onInputButtonCliecked} data-target="file-uploader" accept="application/JSON" /></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class='td_text' style='width:220px'>{utexts.lbtResetConfig}</div>
                                            </td>
                                            <td><input type='button' class='reset_buttons' value='{utexts.lbtResetConfig}' onclick={onResetButtonCliecked}/></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class='td_text'>{utexts.pelletMaterial}</div>
                                            </td>
                                            <td><input type='text' class='material_inputs' name='pelletMaterial' value={uconfig.pelletMaterial} oninput={onConfigTextInput}></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class='td_text'>{utexts.cellMaterialLow}</div>
                                            </td>
                                            <td><input type='text' class='material_inputs' name='cellMaterialLow' value={uconfig.cellMaterialLow} oninput={onConfigTextInput}></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class='td_text'>{utexts.cellMaterialMedium}</div>
                                            </td>
                                            <td><input type='text' class='material_inputs' name='cellMaterialMedium' value={uconfig.cellMaterialMedium} oninput={onConfigTextInput}></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class='td_text'>{utexts.cellMaterialHigh}</div>
                                            </td>
                                            <td><input type='text' class='material_inputs' name='cellMaterialHigh' value={uconfig.cellMaterialHigh} oninput={onConfigTextInput}></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div class='td_text'>{utexts.virusMaterial}</div>
                                            </td>
                                            <td><input type='text' class='material_inputs' name='virusMaterial' value={uconfig.virusMaterial} oninput={onConfigTextInput}></td>
                                        </tr>
                                        <tr>
                                            <tr>
                                                <td>
                                                    <div class='td_text'>Background</div>
                                                </td>
                                                <td><input type=text style="width: 120px;" name="fieldBackImageUri" value={uconfig.fieldBackImageUri} onchange={onConfigTextInput}/><input type=text style="width: 30px;" name="fieldBackImageAlpha" value={uconfig.fieldBackImageAlpha} onchange={onConfigTextInput}/></td>
                                            </tr>
                                            <td>
                                                <p class='material_tip'>pellet size: 200px*200px</br>cell size(low): 200px*200px</br>cell size(medium): 400px*400px</br>cell size(high): 800px*800x</br>virus size: 250px*250px</p>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
            <div class="side-container right-side">
                <div class="side-container right-side">
                    <div class="UI-panel UI-side-panel UI-profiles">
                        <ul class="nav nav-tabs">
                            <li class="active"><a data-toggle="tab" href="#servers"><i class="material-icons">network_wifi</i></a></li>
                        </ul>
                        <div id="server-container" class="servers-panel">
                            <div class="server" id="sao" onclick={connect}>
                                <label class="server-label" id="sao-label">Sao</label>
                                <label id="number-label">1</label>
                            </div>
                            <div class="server" id="caffe" onclick={connect}>
                                <label class="server-label" id="caffe-label">Caffe</label>
                                <label id="number-label">2</label>
                            </div>
                            <div class="server" id="EA-Nano" onclick={connect}>
                                <label class="server-label" id="EA-Nano-label">EA-Nano</label>
                                <label id="number-label">3</label>
                            </div>
                            <div class="server" id="EA-Sandbox" onclick={connect}>
                                <label class="server-label" id="EA-Sandbox-label">EA-Sandbox</label>
                                <label id="number-label">4</label>
                            </div>
                            <div class="server" id="NA-Nano" onclick={connect}>
                                <label class="server-label" id="NA-Nano-label">NA-Nano</label>
                                <label id="number-label">5</label>
                            </div>
                        </div>
                        <div id="sig" style="
    position: absolute;
    bottom: 20px;
    display: flex;
    flex-direction: column;
    width: 200px;
    align-items: center;
">
                            <div style="font-size:16px;color: #999;font-family:'Overpass';">userSig</div>

                            <div id="generate" style="    display: flex;">
                                <div><input type="text" id="usig" name="userSig" placeholder="user sig" value={userEntry.curInfo.usig} oninput={changeUserSig} style="width:100px;text-align:center;height:30px;border: solid 1px !important;"></div>
                                <div onclick={genusig}><i class="material-icons" style="
    color: white;
    position: absolute;
    margin-left: 5px;
">casino</i></div>
                            </div>
                            <div style="font-size:16px;color: #999;font-family:'Overpass';">chatSig</div>
                            <div>
                                <input type="text" id="csig" name="chatSig" value={userEntry.curInfo.csig} oninput={changechatSig} style="margin-top:2px;width:100px;text-align:center;height:30px;border: solid 1px !important;" placeholder="chatSig"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    \n</main-panel>\n'`)], t)
        }(c.Element);
    e.MainPanelTag = u
}, function(t, e, n) {
    "use strict";
    var i, o = this && this.__extends || (i = Object.setPrototypeOf || {
        __proto__: []
    }
                                          instanceof Array && function(t, e) {
        t.__proto__ = e
    } ||
                                          function(t, e) {
        for (var n in e)
            e.hasOwnProperty(n) && (t[n] = e[n])
    },
                                          function(t, e) {
        function n() {
            this.constructor = t
        }
        i(t, e),
            t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
                                                           new n)
    }
                                         ),
        r = this && this.__decorate || function(t, e, n, i) {
            var o, r = arguments.length,
                s = r < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                s = Reflect.decorate(t, e, n, i);
            else
                for (var a = t.length - 1; a >= 0; a--)
                    (o = t[a]) && (s = (r < 3 ? o(s) : r > 3 ? o(e, n, s) : o(e, n)) || s);
            return r > 3 && s && Object.defineProperty(e, n, s),
                s
        };
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var s = n(5),
        a = n(4),
        l = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.model = a.gameCore.serverListModel,
                    t
            }
            return o(t, e),
                t.prototype.mounted = function() {
                this.model.Notify = this.update.bind(this)
            },
                t.prototype.onServerEntryClicked = function(t) {
                this.model.ConnectToServer(t.item.info)
            },
                t = r([s.template(`<server-list-root><style></style></server-list-root>`)], t)
        }(s.Element);
    e.ServerListRootTag = l
}, function(t, e, n) {
    "use strict";
    var i, o = this && this.__extends || (i = Object.setPrototypeOf || {
        __proto__: []
    }
                                          instanceof Array && function(t, e) {
        t.__proto__ = e
    } ||
                                          function(t, e) {
        for (var n in e)
            e.hasOwnProperty(n) && (t[n] = e[n])
    },
                                          function(t, e) {
        function n() {
            this.constructor = t
        }
        i(t, e),
            t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
                                                           new n)
    }
                                         ),
        r = this && this.__decorate || function(t, e, n, i) {
            var o, r = arguments.length,
                s = r < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                s = Reflect.decorate(t, e, n, i);
            else
                for (var a = t.length - 1; a >= 0; a--)
                    (o = t[a]) && (s = (r < 3 ? o(s) : r > 3 ? o(e, n, s) : o(e, n)) || s);
            return r > 3 && s && Object.defineProperty(e, n, s),
                s
        };
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var s = n(5),
        a = n(0),
        l = n(4),
        c = n(2),
        h = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.uconfig = a.gs.uconfig,
                    t.userEntry = l.gameCore.userEntryMan,
                    t.cssColors = a.gs.ucolors.cssColors,
                    t.appConfig = c.AppConfigurator.instance,
                    t
            }
            return o(t, e),
                Object.defineProperty(t.prototype, "isDualUi", {
                get: function() {
                    return a.gs.gconfig.ShowDualSkinInputUi
                },
                enumerable: !0,
                configurable: !0
            }),
                t.prototype.mounted = function() {
                this.userEntry.indexChangedProc = this.update.bind(this)
            },
                t.prototype.inputText = function(t) {
                this.userEntry.SetProp(t.target.name, t.target.value)
            },
                t.prototype.startPlay = function() {
                l.gameCore.StartPlay()
            },
                t.prototype.startSpectate = function() {
                l.gameCore.StartSpectate()
            },
                t = r([s.template(`<user-entry-panel><style></style></user-entry-panel>`)], t)
        }(s.Element);
    t.UserEntryPanelTag = h
}, function(t, e, n) {
    "use strict";
    var i, o = this && this.__extends || (i = Object.setPrototypeOf || {
        __proto__: []
    }
                                          instanceof Array && function(t, e) {
        t.__proto__ = e
    } ||
                                          function(t, e) {
        for (var n in e)
            e.hasOwnProperty(n) && (t[n] = e[n])
    },
                                          function(t, e) {
        function n() {
            this.constructor = t
        }
        i(t, e),
            t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
                                                           new n)
    }
                                         ),
        r = this && this.__decorate || function(t, e, n, i) {
            var o, r = arguments.length,
                s = r < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                s = Reflect.decorate(t, e, n, i);
            else
                for (var a = t.length - 1; a >= 0; a--)
                    (o = t[a]) && (s = (r < 3 ? o(s) : r > 3 ? o(e, n, s) : o(e, n)) || s);
            return r > 3 && s && Object.defineProperty(e, n, s),
                s
        };
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var s = n(5),
        a = n(0),
        l = n(4),
        c = n(2),
        h = function(n) {
            function t() {
                var t = null !== n && n.apply(this, arguments) || this;
                const e = JSON.parse(localStorage.getItem("hideInfo"));
                e instanceof Array ? (tcfg.HidePartyCode = e[0],
                                      tcfg.HideUserSig = e[1]) : localStorage.setItem("hideInfo", JSON.stringify([0, 0]));
                return t.gconfig = a.gs.gconfig,
                    t.userEntry = l.gameCore.userEntryMan,
                    t.ws = l.gameCore.conn,
                    t.uconfig = a.gs.uconfig,
                    t.cssColors = a.gs.ucolors.cssColors,
                    t.appConfig = c.AppConfigurator.instance,
                    t
            }
            return o(t, n),
                Object.defineProperty(t.prototype, "isDualUi", {
                get: function() {
                    return a.gs.gconfig.ShowDualSkinInputUi
                },
                enumerable: !0,
                configurable: !0
            }),
                t.prototype.tcfg = tcfg,
                t.prototype.mounted = function() {
                this.userEntry.skinChangedProc = this.update.bind(this)
            },
                t.prototype.inputText = function(t) {
                this.userEntry.SetProp(t.target.name, t.target.value)
            },
                t.prototype.hideCode = function() {
                var t = document.getElementsByClassName("code_cover")[0];
                const e = t.style.display == "";
                t.style.display = e ? "none" : "";
                tcfg.HidePartyCode = !e;
                localStorage.setItem("hideInfo", JSON.stringify([tcfg.HidePartyCode, tcfg.HideUserSig]))
            },
                t.prototype.hideUsig = function() {
                var t = document.getElementsByClassName("usig_cover")[0];
                const e = t.style.display == "";
                t.style.display = e ? "none" : "";
                tcfg.HideUserSig = !e;
                localStorage.setItem("hideInfo", JSON.stringify([tcfg.HidePartyCode, tcfg.HideUserSig]))
            },
                t.prototype.onArrowButton = function(t) {
                var e = "arrow_left" == t.target.id ? -1 : 1;
                l.gameCore.userEntryMan.ShiftIndex(e)
            },
                t.prototype.onBenchButton = function() {
                l.gameCore.ToggleBenchMarkMode()
            },
                t.prototype.refreshTab2 = function() {
                var ip = this.ws.ws.url
                this.ws.CloseConnection(2)
                this.uconfig.tab && this.ws.ConnectToGameServer(ip,2)
                a.gs.gstates.isDeadSpectation = !1;
            },
                t.prototype.changeUserSig = function(e) {
                localStorage.setItem("UniChatUserSignature", e.target.value)
            },
                t.prototype.changechatSig = function(e) {
                localStorage.setItem("UniChatServerSignature", e.target.value)
            },
                t = r([s.template(`<left-config-panel><style></style></left-config-panel>`)], t)
    }(s.Element);
    e.LeftConfigPanelTag = h
}, function(t, e, n) {
    "use strict";
    var i, o = this && this.__extends || (i = Object.setPrototypeOf || {
        __proto__: []
    }
                                          instanceof Array && function(t, e) {
        t.__proto__ = e
    } ||
                                          function(t, e) {
        for (var n in e)
            e.hasOwnProperty(n) && (t[n] = e[n])
    },
                                          function(t, e) {
        function n() {
            this.constructor = t
        }
        i(t, e),
            t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
                                                           new n)
    }
                                         ),
        r = this && this.__decorate || function(t, e, n, i) {
            var o, r = arguments.length,
                s = r < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                s = Reflect.decorate(t, e, n, i);
            else
                for (var a = t.length - 1; a >= 0; a--)
                    (o = t[a]) && (s = (r < 3 ? o(s) : r > 3 ? o(e, n, s) : o(e, n)) || s);
            return r > 3 && s && Object.defineProperty(e, n, s),
                s
        };
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var s = n(5),
        a = n(0),
        d = n(4),
        l = (function(t) {
                function e() {
                    return null !== t && t.apply(this, arguments) || this
                }
                o(e, t),
                    e.prototype.mounted = function() {
                        this.root.innerHTML = this.opts.content
                    },
                    e = r([s.template("<raw><div></div></raw>")], e)
            }(s.Element),
            function(e) {
                function t() {
                    var t = null !== e && e.apply(this, arguments) || this;
                    return t.model = d.gameCore.gameHudModel,
                    t.perfModel = d.gameCore.perfModel,
                    t.ws = d.gameCore.conn,
                    t.node = d.gameCore.nodeMan,
                    t.gconfig = a.gs.gconfig,
                    t.uconfig = a.gs.uconfig,
                    t.chatAppModel = d.gameCore.chatAppModel,
                    t.gstates = a.gs.gstates,
                    t.cssColors = a.gs.ucolors.cssColors,
                    t.chatInputBoxVisible = !1,
                    t.hasNewPrivateMessage = !1,
                    t.prevChatMessagesCount = -1,
                    t.userEntry = d.gameCore.userEntryMan,
                    t
                }
                return o(t, e),
                    t.prototype.mounted = function() {
                        var o = this,
                            t = this.refs.lb_chart_outer,
                            e = this.refs.lb_chart_canvas;
                        e.width = 160,
                            e.height = 160,
                            t.style.width = "160px",
                            t.style.height = "160px";
                        var n = this.refs.map_outer,
                            i = this.refs.map_canvas;
                        var r = 300;
                        i.width = r,
                            i.height = r,
                            n.style.width = r + "px",
                            n.style.height = r + "px",
                            window.addEventListener("keydown", function(t) {
                                if (!t.repeat) {
                                    if (13 == t.keyCode) {
                                        var e = o.refs.chat_input_text_box;
                                        if (o.chatInputBoxVisible) {
                                            var n = e.value;
                                            e.value = "",
                                                o.chatInputBoxVisible = !1,
                                                n ? d.gameCore.SendChatMessage(n) : o.update()
                                        } else {
                                            var i = document.activeElement;
                                            if (i && "INPUT" == i.tagName)
                                                return void i.blur();
                                            o.chatInputBoxVisible = !0,
                                                o.update(),
                                                e.focus()
                                        }
                                    }
                                }
                            }),
                            setInterval(this.UpdationProc.bind(this), 17);
                        var s = this.refs.overlay_base,
                            r = this.refs.chat_view,
                            a = this.refs.chat_input_box,
                            l = !1;

                        function c(t) {
                    r.style.userSelect = t ? "text" : "none"
                }
                r.onmouseenter = function() {
                    l = !0
                },
                    r.onmouseleave = function() {
                    l = !1
                };
                var h = !1;
                a.onmouseenter = function() {
                    h = !0
                },
                    a.onmouseleave = function() {
                    h = !1
                },
                    s.onmousedown = function() {
                    l && c(!0)
                },
                    s.onmouseup = function() {
                    l || h || (window.getSelection().removeAllRanges(),
                               c(!1))
                }
            },
                t.prototype.refreshTab = function(t) {
                gVar.reConn = 0
                this.ws.ws && this.ws.ws.close()
                this.node && this.node.PostClearAllNodes()
                d.gameCore.SelfUnitsDeadProc(1)
                gVar.refresh = !0,setTimeout(() => (gVar.refresh = !1), 300)

            },
                t.prototype.refreshTab2 = function(t) {
                    console.log(this.ws.ws.url)
                gVar.reConn = 0
                this.ws.ws2 && this.ws.ws2.close()
                this.node && this.node.PostClearAllNodes()
                d.gameCore.SelfUnitsDeadProc(2)
                gVar.refresh = !0,setTimeout(() => (gVar.refresh = !1), 300)
                this.ws.ConnectToGameServer(this.ws.ws.url,2)
            },
                t.prototype.refreshTab3 = function(t) {
                var ip = this.ws.ws.url
                this.ws.CloseConnection(3)
                this.ws.ConnectToGameServer(ip,3)
            },
                t.prototype.refreshView = function(t) {
                this.node.PostClearAllNodes();

            },
                t.prototype.UpdationProc = function() {
                this.model.isHudUpdated && (this.model.isHudUpdated = !1,
                                            this.update(),
                                            this.model.chatMessages.length != this.prevChatMessagesCount && (this.prevChatMessagesCount = this.model.chatMessages.length,
                                                                                                             this.scrollChatViewToEnd()))
            },
                t.prototype.onSkinFilterButton = function(t) {
            this.gstates.isSkinFilterPanelVisible = !this.gstates.isSkinFilterPanelVisible,
                t.stopPropagation()
        },
                t.prototype.scrollChatViewToEnd = function() {
                var t = this.refs.chat_view;
                t.scrollTop = t.scrollHeight
            },
                t = r([s.template(`'
<game-overlay>

  <style>
    .overlay_base {
    _user-select: none;
    }
    .game_control_overlay {
    _user-select: none;
    }
    .chat_view {
    width: 300px;
    height: 250px;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
    left: 10px;
    overflow-y: scroll;
    overflow-x: none;
    font-size: 14px;
    resize: both;
    padding: 3px;
    word-wrap: break-word;
    user-select: text;
    }
    .chat_view::-webkit-scrollbar {
    width: 9px;
    /*background: rgba(224,224,224, 0.5);*/
    }
    .chat_view::-webkit-scrollbar-thumb {
    background-color: rgba(128, 128, 128, 0.5);
    }
    .chat_view::-webkit-scrollbar-corner {
    background-color: none;
    }
    .chat_view::-webkit-resizer {
    background-color: rgba(64, 64, 64, 0.5);
    resize: vertical;
    min-width: 270px;
    }
    .message_time_stamp {
    color: #AAA;
    font-size: 13px;
    }
    .message_sender_name {
    color: #FF0;
    }
    .bottom_area {
    width: 100%;
    position: absolute;
    bottom: 0;
    }
    .chat_input_area {
    width: 360px;
    height: 40px;
    background-color: rgba(200, 200, 200, 0.5);
    border-radius: 4px;
    margin: 0 auto 50px;
    }
    #chat_input_text_box {
    width: 100%;
    height: 100%;
    background-color: none;
    border: none;
    font-size: 16px;
    padding-left: 6px;
    }
    #chat_input_text_box:focus {
    outline: 0;
    }
    .server_client_status_area {
    position: absolute;
    left: 10px;
    bottom: 6px;
    font-size: 14px;
    }
    #server_user_num_text {
    font-family: 'Overpass', 'Noto Sans', Meiryo, sans-serif;
       text-align:center;
    font-size: 15px;
margin-top:5px;
    }
    .self_state_info {
    position: absolute;
    top: 40px;
    left: 10px;
    font-size: 22px;
    font-family: 'Overpass', 'Noto Sans', Meiryo, sans-serif;
    }
    .self_state_info>div {
    display: inline-block;
    margin-right: 10px;
    }
    .num_text{
        font-size:14px;
    }
    #self_score_text {}
    #server_display_message {
    position: absolute;
    top: 50px;
    width: 100%;
    font-size: 15px;
    text-align: center;
    color: #FF0;
    font-size: 32px;
    }
    .benchmark_mode_message_outer {
    position: absolute;
    top: 70px;
    width: 100%;
    }
    .benchmark_mode_message {
    margin: 0 auto;
    width: 600px;
    font-size: 15px;
    text-align: center;
    font-size: 32px;
    color: #0F0;
    font-family: 'Overpass', 'Noto Sans', Meiryo, sans-serif;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 5px;
    }
    .leaderboard_outer {
    position: absolute;
    top: 0px;
    right: 10px;
display:flex !important;
    }
    .leaderboard_inner {
    display: flex;
    flex-direction: column;
    width: 300px;
    padding: 8px;
    border-radius: 4px;
    }

    .leaderboard_team {
    display: flex;
    flex-direction: column;
    width: 210px;
    padding: 8px;
    border-radius: 4px;
    }
     .leaderboard_mass {
    display: flex;
    flex-direction: column;
    width: 210px;
    padding: 8px;
    border-radius: 4px;
    }

    .lb_header {
    font-family: 'Overpass', 'Noto Sans', Meiryo, sans-serif;
    font-size: 22px;
    text-align: center;
    }
    .lb_header_large {
    font-size: 26px;
    }

    .lb_detail {}
    .lb_entry2 {
    font-family: 'Overpass', 'Noto Sans', Meiryo, sans-serif;
    font-size: 15px;
    height: 20px;
    overflow: hidden;
    text-align: center;
    }
    .lb_entry {
    font-family: 'Overpass', 'Noto Sans', Meiryo, sans-serif;
    font-size: 15px;
    height: 20px;
    overflow: hidden;
    text-align: left;
    }
    #lb_chart_outer {
    margin: 5px auto 0;
    }
    #lb_chart_canvas {
    opacity: 0.8;
    }
    #map_outer {
    z-index: 1;
    border: solid 1px white;
    right: 10px;
    bottom: 30px;
    }
    #teamInfo {
    position: absolute;
    right: 370px;
    bottom: 10px;
    display: flex;
    flex-direction: column;
    }
    #map_canvas {
    _background-color: rgba(0, 0, 0, 0.3);
    }
    hr {
    height: 8px;
    border: none;
    }
    .spec_target_info {
    position: absolute;
    top: 120px;
    width: 100%;
    font-size: 22px;
    text-align: center;
    font-family: 'Overpass', 'Noto Sans', Meiryo, sans-serif;
    }
    #notify_log::-webkit-scrollbar {
    width: 8px;
    }
    #notify_log::-webkit-scrollbar-thumb {
    background-color: rgba(128, 128, 128, 0.5);
    }
    #notify_log::-webkit-scrollbar-corner {
    background-color: none;
    }
    #notify_log.click {
    left: 10px;
    height: 300px;
    width: 300px;
    font-size: 14px;
    overflow-y: scroll;
    }
    #notify_log {
    left: 10px;
    height: 30px;
    width: 300px;
    font-size: 14px;
    overflow: hidden;
    border-radius:4px;
    }
    .divs {
    background-color: #999999;
    animation: rainbow_background 20s infinite;
    }
    .top-bar {
    position: fixed;
    transform: translateX(-50%);
    display: flex;
    flex-direction: row;
    justify-content: center;
    color: #ffffff;
    background-color: #111111;
    padding: 5px;
    z-index: 1;
    right: 220px;
    bottom: 310px;
    align-items: center;
    }
    .top-bar .reconnect {
    border: none;
    outline: none;
    background-color: #222222;
    color: #888888;
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-size: 14px;
    font-family: 'Overpass', Noto Sans, Meiryo, sans-serif;
    font-weight: 600;
    border-radius: 2px;
    transition: all 0.4s;
    cursor: pointer
    }
    .top-bar .reconnect i {
    font-size: 14px;
    line-height: 20px;
    pointer-events: none;
    margin-right: 1px
    }
    .top-bar .reconnect[owner="1"] {
    margin-left: 5px;
    margin-right: 5px
    }
    .top-bar .reconnect.disconnected {
    background-color: #ffffff;
    color: #555555
    }
    .leaderboard{
    display: flex;
    flex-direction: column;
    }
    .top-bar #socket-ip {
    border: none;
    outline: none;
    background-color: #222222;
    color: #888888;
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-size: 14px;
    font-family: 'Overpass', Noto Sans, Meiryo, sans-serif;
    font-weight: 600;
    padding: 0px 5px;
    border-radius: 1px
    }
    .top-bar #socket-ip i {
    font-size: 14px;
    line-height: 20px;
    pointer-events: none;
    margin-right: 2px
    }
    .top-bar[multibox=off] .reconnect {
    display: none
    }
    .mapBar{
    font-size: 14px;
    }
  </style>

  <div class=\'overlay_base\' ref=\'overlay_base\'>

    <div id="self_score_text" ref="self_score_text"></div>

    <div id="server_display_message" ref="server_display_message">{model.serverDisplayMessageText}</div>

    <div class="spec_target_info" show={model.specTargetName !=null}>{model.specTargetName} -- {(model.specTargetScore/1000).toFixed(1)}k</div>

    <div class="benchmark_mode_message_outer" show={gstates.isBenchmarkMode}>
      <div class="benchmark_mode_message">benchmark mode (score: {perfModel.numCellsRendered})</div>
    </div>

    <div class="server_client_status_area">
      <div show={uconfig.ShowClientStatus}>
        <div style="display:flex;align-items: center;font-family: 'Overpass',Noto Sans, Meiryo,sans-serif;"> <i class="material-icons" style="margin-right:2px;font-size:14px">monitor</i>{perfModel.avgFps.toFixed(0)} fps </div>
        <div id="server_status_text" ref="server_status_text" show={uconfig.ShowServerStatus}> </div>
        <div style="display:flex;align-items: center;font-family: 'Overpass',Noto Sans, Meiryo,sans-serif;"> <i class="material-icons" style="margin-right:2px;font-size:14px">cloud_sync</i>{model.serverStatusText}</div>
        <div id="latency_text" style="display:flex;align-items: center;font-family: 'Overpass', Noto Sans, Meiryo,sans-serif;"> <i class="material-icons" style="margin-right:2px;font-size:14px">signal_cellular_alt</i>{model.latencyMs} ms </div>
        </div>
      </div>

      <div class="leaderboard_outer" style="top: 50px;
    right: 10px;
    bottom: 5px;
    flex-direction: column;
    justify-content: flex-start;">

<div id="ib-container" style="
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
">
              <div class="leaderboard_inner" show={uconfig.ShowLeaderboard} style="background: {cssColors.clLeaderboardBack};">
          <div class="lb_header lb_header_large" style="color: {cssColors.clLeaderboardHeader};">{model.leaderboardHeaderText}</div>
        <div class="lb_detail">
          <div each={model.leaderboardEntries} class="lb_entry" style="color: {color}; height: 24px;" show={active}>
            <div style="width: 60px; float: right; text-align: right; margin-left:3px;">({trip})</div>
            <div style="width: 50px; float: right; text-align: right;">{score}</div>
            <div style="width: 170px; float: left; white-space: nowrap; text-overflow: ellipsis; overflow: hidden">{index + 1}.{text} </div>
          </div>
        </div>

        <hr style="background-color: {cssColors.clLeaderboardHeader};height: 2px;margin:0px;margin-top:5px;margin-bottom: 5px;"/>

        <div id="server_user_num_text" style="color:{cssColors.clChatMessage};" ref="server_user_num_text"><div style="display:flex;justify-content: space-evenly;">
          <div class = "num_text">{model.cp} / {model.mp}</div>
          <div><i class="material-icons num_text">person_add</i> {model.p}</div>
          <div><i class="material-icons num_text">visibility</i> {model.sp}</div>
          <div><i class="material-icons num_text">smart_toy</i> {model.rp}</div>
        </div>
      </div>
    </div>
       
    <div class="leaderboard_team" show={uconfig.ShowLeaderboard} style="background-color: {cssColors.clLeaderboardBack}; margin-top: 8px; margin-left: 90px;" show={gconfig.ShowTeamRanking}>
    <div class="lb_header" style="color: {cssColors.clLeaderboardHeader};">Team Ranking</div>
    <div class="lb_detail">
          <div each={model.teamRankingEntries} class="lb_entry" style="color: {color}; height: 24px;" show={active}>
            <div style="
    display: flex;
">
    <div style="width: 150px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{index + 1}.{text}</div>
    <div style=" display: flex;width: 120px;justify-content: space-between;"><div>{score}</div> 
    <div>{trip}</div></div>
</div>
          </div>
        </div>
      <div id="lb_chart_outer" ref="lb_chart_outer" show={!1}>
        <canvas id="lb_chart_canvas" ref="lb_chart_canvas"></canvas>
      </div>
    </div>
    <div class="leaderboard_mass" show={uconfig.ShowLeaderboard} style="background: {cssColors.clLeaderboardBack};  margin-top: 10px; margin-left: 90px;">
      <div class="lb_header" style="color: {cssColors.clLeaderboardHeader};">Self Mass</div>
        <div class="lb_detail">
          <div class="self_state_info_Score" style="color: {color}; height: 24px;">
            <div style="width: 70px; float: left; text-align: left; margin-left: 8px;">Score: </div>
            <div style="width: 90px; float: right; text-align: right; margin-right: 8px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"> {(model.selfScore * 0.001).toFixed(2)} k</div>
          </div>
          <div class="chatTagcolor" style="height: 24px;">
            <div style="width: 70px; float: left; text-align: left; margin-left: 8px;">Max: </div>
            <div style="width: 90px; float: right; text-align: right; margin-right: 8px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"> {(model.maxScore * 0.001).toFixed(2)} k</div>
          </div>
        </div>
      <hr style="background-color: {cssColors.clLeaderboardHeader}; height: 1px; margin-top:2px; margin-bottom:10px;margin:0;"/>
      <div class="elf_state_info_Split" style="height: 24px; color:{cssColors.clChatMessage}; height: 24px;margin-top:5px;">
        <div style="width: 70px; float: left; text-align: left; margin-left: 8px;">split 1:</div>
        <div style="width: 90px; float: right; text-align: right; margin-right: 8px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{model.splitNum}/16</div>
      </div>
      <div class="elf_state_info_Split" style="height: 24px; color:{cssColors.clChatMessage}; height: 24px;">
        <div style="width: 70px; float: left; text-align: left; margin-left: 8px;">split 2:</div>
        <div style="width: 90px; float: right; text-align: right; margin-right: 8px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{model.tabsplitNum}/16</div>
      </div>

    </div>
<div class="user_info" show={uconfig.ShowLeaderboard} style="
margin-top:8px;
    z-index:20;
    align-self: end;
">  <div style="
        display: flex;
        flex-direction: column;
        width: 210px;
        padding: 8px;
        border-radius: 4px;
        background: {cssColors.clLeaderboardBack};
"><div style="
    display: flex;align-items: center;
">
<div style="color: white;"></div>
    <div class="divs" style="
    border-radius: 15px;
">
        <div style="
    width: 30px;
    height: 30px;
    border-radius: 15px;
    background-image: url({userEntry.curInfo.skinUrl});
    background-size: cover;
    background-position-x: left;
">
        </div>
    </div>
    <div style="font-size: 14px;color: white;width: 80px;overflow:hidden;margin-left: 10px;">{userEntry.curInfo.name}</div>
    <div id="pos1" style="font-size: 14px;color: white;margin: auto;">NaN</div>
<div style="font-size: 16px;
    margin: auto;display: inherit;" onclick={refreshTab}>
    <i class="material-icons">sync</i></div>
    </div><div style="
    display: flex;align-items: center;margin-top: 5px;
">
<div style="color: white;"></div>
    <div class="divs" style="
    border-radius: 15px;
">
        <div style="
    width: 30px;
    height: 30px;
    border-radius: 15px;
    background-image: url({userEntry.curInfo.tabSkinUrl});
    background-size: cover;
    background-position-x: left;
">
        </div>
    </div>
    <div style="font-size: 14px;color: white;width:80px;overflow:hidden;margin-left: 10px;">{userEntry.curInfo.tabName}</div>
    <div id="pos2" style="font-size: 14px;color: white;margin: auto;">NaN</div>
<div style="font-size: 16px;
    margin: auto;display: inherit;" name="2" onclick={refreshTab2}>
    <i class="material-icons">sync</i></div></div></div></div>
          </div>
<div id="map-container" show={uconfig.ShowMap} style="
    display: flex;
    flex-direction: column;
">
<div class="mapBar" style="display: flex; bottom: 305px; width: 300px; height: 30px; justify-content: end; background-color:{cssColors.clMapBackground}; border-radius:4px;align-items: center;">
      <div style="color: {cssColors.clLeaderboardHeader}; display: flex; margin-left:5px; margin-right:10px; font-family: 'Overpass';" id="time-hud" show={uconfig.ShowMap}">
      </div>
    </div>
  <div id="map_outer" ref="map_outer" style="background-color: {cssColors.clMapBackground}">
  <canvas id="map_canvas" ref="map_canvas"></canvas>

  </div>
</div>

  </div>

  <div id="game_control_overlay" class=\'game_control_overlay\' ref=\'game_control_overlay\' />
    <div id='chat_container' style="position: absolute;top: 40px;display: flex;flex-direction: column;">
    <div class="chat_view" id="chat_view" ref="chat_view" onclick="$('.tripKey').toggle();" style="background-color: {cssColors.clChatBackground}; max-width:300px;min-width: 300px;" show={uconfig.ShowChatBox}>
      <div each={model.chatMessages} style="margin-top:3px;display: flex;flex-direction: column;margin-bottom:20px;">
        <div style="display: flex;align-items: inherit;">
          <div class="divs" style="border-radius: 15px;width: 30px;height: 30px;">
          <div style="width: 30px;height: 30px;border-radius: 15px;background-image: url({skinUrl});background-size: cover;background-position-x: left;"></div>
        </div>

        <div style="margin-top:5px;">
          <span class="message_time_stamp" style="color: {cssColors.clChatTimeString};margin-left: 5px;">{timeStamp}</span>
          <span class="tripKey" show={!1} style="color: {cssColors.clChatSenderName};margin-left: 5px;">{tripKey}</span>
          <span style="color: {cssColors.clChatSenderName};margin-left: 5px;">{senderName}:</span>
        </div>
      </div>

      <div style="margin-left: 35px;word-break: break-all" ;>
        <span style="color: {cssColors.clChatMessage};">{message}</span>
      </div>
    </div>
  </div>


  <div id="notify_log" style="font-family: 'Overpass',Noto Sans,Meiryo,sans-serif;margin-top:10px; background-color: {cssColors.clChatBackground};" onclick="$(this).toggleClass('click');$(this).scrollTop(3000);" show={uconfig.ShowPlayerLog}></div>
    </div>
  <div class="bottom_area">
    <div class="chat_input_area" show={chatInputBoxVisible} ref="chat_input_box">
      <input type="text" id="chat_input_text_box" ref="chat_input_text_box" /></div>
    </div>
  </div>
  <skin-filter-panel show={gstates.isSkinFilterPanelVisible} />
</game-overlay>
'`)], t)
        }(s.Element));
    e.GameOverlayTag = l
}, function(t, e, n) {
    "use strict";
    var i, o = this && this.__extends || (i = Object.setPrototypeOf || {
        __proto__: []
    }
                                          instanceof Array && function(t, e) {
        t.__proto__ = e
    } ||
                                          function(t, e) {
        for (var n in e)
            e.hasOwnProperty(n) && (t[n] = e[n])
    },
                                          function(t, e) {
        function n() {
            this.constructor = t
        }
        i(t, e),
            t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
                                                           new n)
    }
                                         ),
        r = this && this.__decorate || function(t, e, n, i) {
            var o, r = arguments.length,
                s = r < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                s = Reflect.decorate(t, e, n, i);
            else
                for (var a = t.length - 1; a >= 0; a--)
                    (o = t[a]) && (s = (r < 3 ? o(s) : r > 3 ? o(e, n, s) : o(e, n)) || s);
            return r > 3 && s && Object.defineProperty(e, n, s),
                s
        };
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var s = n(5),
        a = n(0),
        l = n(4),
        c = n(1),
        h = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.model = l.gameCore.ReplayControllerModel,
                    t.cssColors = a.gs.ucolors.cssColors,
                    t.replayUiMessage = "",
                    t.elementIdToReplayOperationDict = {
                    bt_flash: 2,
                    bt_record: 1,
                    bt_stop: 3,
                    bt_play: 4,
                    bt_reel_prev: 5,
                    bt_reel_next: 6,
                    bt_cont: 7,
                    bt_tick_prev: 8,
                    bt_tick_next: 9,
                    bt_reel_delete: 10,
                    bt_speed_down: 12,
                    bt_speed_up: 13
                },
                    t
            }
            return o(t, e),
                t.prototype.mounted = function() {
                var e = this;
                this.model.SetStateChangedProc(function(t) {
                    e.update()
                }),
                    this.update(),
                    this.model.captureNotificationProc = function() {
                    e.replayUiMessage = "captured!",
                        setTimeout(function() {
                        e.replayUiMessage = "",
                            e.update()
                    }, 500)
                }
            },
                t.prototype.onTrackKnobMouseDown = function(t) {
                var i = this;
                if (!a.gs.gstates.isBenchmarkMode) {
                    var o = this.refs.gauge_rail.getBoundingClientRect().left,
                        e = function(t) {
                            var e = t.pageX - o,
                                n = c.Nums.VMap(e, 5, 295, 0, 1, !0);
                            return i.model.SeekReplayPosTo(n, !0),
                                i.update(),
                                !1
                        },
                        n = function(t) {
                            window.removeEventListener("mousemove", e),
                                window.removeEventListener("mouseup", n)
                        };
                    window.addEventListener("mousemove", e),
                        window.addEventListener("mouseup", n),
                        e(t),
                        t.stopPropagation()
                }
            },
                t.prototype.onButtonClick = function(t) {
                if (!a.gs.gstates.isBenchmarkMode) {
                    var e = t.currentTarget.id,
                        n = this.elementIdToReplayOperationDict[e];
                    n && this.model.HandleReplayOperation(n),
                        t.stopPropagation()
                }
            },
                t = r([s.template('\n<replay-control-bar>\n\t<style>\n\t\t.replay_bar_area{\n\t\t\twidth: 660px;\n\t\t\theight: 45px;\n\t\t\tmargin: 0 auto;\n\t\t\tborder-radius:4px;\n\t\t\tmargin-top: 6px;\n\t\t\tposition: relative;\n\t\t\tpadding: 4px;\n\t\t\tpadding-left: 10px;\n\t\t\tuser-select: none;\n\t\t}\n\n\t\t.ui_row > div{\n\t\t\tfloat: left;\n\t\t\tmargin: 0 2px;\n\t\t}\n\n\t\t.ui_row2 > *{\n\t\t\tfloat: left;\n\t\t\tmargin: 0 2px;\n\t\t}\n\n\t\t.replay_main_button_group{\n\t\t\tmargin-top: 2px !important;\n\t\t}\n\t\t\n\t\t.control_button_back{\n\t\t\tborder-radius: 5px;\n\t\t}\n\n\t\t.control_button{\n\t\t\twidth: 34px;\n\t\t\theight: 34px;\n\t\t\tborder: solid 1px #FFF;\n\t\t\tborder-radius: 3px;\n\t\t\tline-height: 34px;\n\t\t\tfont-family: \'IconFont1\';\n\t\t\tfont-size: 15px;\n\t\t\tcursor: pointer;\n\t\t}\n\n\t\t.middle_button{\n\t\t\twidth: 32px;\n\t\t\theight: 28px;\n\t\t\tline-height: 28px;\n\t\t\tfont-size: 12px;\n\t\t\tborder-radius: 2px;\n\t\t}\n\n\t\t.reel_info_area{\n\t\t\tline-height: 28px;\n\t\t\tfont-size: 14px;\n\t\t\tmargin: 0 0px !important;\n\t\t\twidth: 50px;\n\t\t}\n\n\t\t.small_button{\n\t\t\twidth: 22px;\n\t\t\theight: 18px;\n\t\t\tline-height: 18px;\n\t\t\tfont-size: 11px;\n\t\t\tborder-radius: 1px;\n\t\t}\n\n\t\t.control_button:hover{\n\t\t\tbackground-color: rgba(255,255,255,0.2);\n\t\t}\n\n\t\t.is_on{\n\t\t\tbackground-color: #00F;\n\t\t} \n\n\t\t.gauge_area{\n\t\t\twidth: 300px;\n\t\t\theight: 38px;\n\t\t\tposition: relative;\n\t\t\tmargin: 0 8px !important;\n\t\t}\n\n\t\t.gauge_box{\n\t\t\tposition: absolute;\n\t\t\tbottom: 0;\n\t\t}\n\n\t\t.gauge{\n\t\t\twidth: 300px;\n\t\t\theight: 16px;\n\t\t\tposition: relative;\n\t\t}\n\n\t\t.gauge_rail{\n\t\t\twidth: 300px;\n\t\t\theight: 10px;\n\t\t\tborder: solid 1px #FFF;\n\t\t\tposition: absolute;\n\t\t\ttop: 3px;\n\t\t\tcursor: pointer;\n\t\t}\n\n\t\t.gauge_knob{\n\t\t\twidth: 10px;\n\t\t\theight: 16px;\n\t\t\tborder: solid 1px #FFF;\n\t\t\tposition: absolute;\n\t\t\tleft: 0px;\n\t\t\tbackground-color: #08F;\n\t\t\tcursor: pointer;\n\t\t}\n\n\t\t.time_position_text{\n\t\t\tposition: absolute;\n\t\t\tright: 0;\n\t\t\ttop: 0;\n\t\t\tfont-size: 14px;\n\t\t}\n\n\t\t.replay_speed_text{\n\t\t\twidth: 35px;\n\t\t\tfont-size: 14px;\n\t\t}\n\n\t\t.part_reel_control{\n\t\t\tmargin-top: 5px !important;\n\t\t}\n\n\t\t.second_bar_area{\n\t\t\twidth: 660px;\n\t\t\tmargin: 0 auto;\n\t\t\tposition: relative;\n\t\t\tuser-select: none;\n\t\t}\n\n\t\t.replay_ui_message{\n\t\t\tfont-family: Overpass, Noto Sans,Meiryo,sans-serif;\n\t\t\tfont-size: 24px;\n\t\t\ttext-align: left;\n\t\t}\n\t</style>\n\t<div>\n\t\t<div class="replay_bar_area ui_row" style="background-color: {cssColors.clReplayBar}; color: {cssColors.clUiSymbols}">\n\t\t\t<div class="replay_main_button_group ui_row">\n\t\t\t\t<div class="control_button" id="bt_flash" onmousedown={onButtonClick}\n\t\t\t\t\tstyle="border-color: {cssColors.clUiSymbols}; border-color: {cssColors.clUiSymbols}"">&#xe9b5</div>\n\n\t\t\t\t<div class="control_button_back"\n\t\t\t\t\tstyle="background-color: {model.isRecording ? cssColors.clUiButtonActive : \'\'}">\n\t\t\t\t\t<div class="control_button" id="bt_record" onmousedown={onButtonClick} style="border-color: {cssColors.clUiSymbols}">\n\t\t\t\t\t\t\t&#xe914\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div style="width: 2px; height: 1px" />\n\n\t\t\t\t<div class="control_button" id="bt_stop" onmousedown={onButtonClick} \n\t\t\t\t\tstyle="border-color: {cssColors.clUiSymbols}">&#xea1e</div>\n\n\t\t\t\t<div class="control_button_back"\n\t\t\t\t\tstyle="background-color: {model.isPlayback ? cssColors.clUiButtonActive : \'\'}">\n\t\t\t\t\t<div class="control_button" id="bt_play" onmousedown={onButtonClick} style="border-color: {cssColors.clUiSymbols}">\n\t\t\t\t\t\t&#xe902\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t</div>\n\n\t\t\t<div class="gauge_area">\n\n\t\t\t\t<div class="ui_row2" style="margin-left:-2px">\n\t\t\t\t\t<div class="control_button small_button" id="bt_tick_prev" onmousedown={onButtonClick} \n\t\t\t\t\t\tstyle="border-color: {cssColors.clUiSymbols}">&#xf177</div>\n\t\t\t\t\t<div class="control_button small_button" id="bt_tick_next" onmousedown={onButtonClick} \n\t\t\t\t\t\tstyle="border-color: {cssColors.clUiSymbols}">&#xf178</div>\n\n\t\t\t\t\t<div style="width:4px; height: 1px" />\n\n\t\t\t\t\t<div class="control_button small_button" id="bt_speed_down" onmousedown={onButtonClick} \n\t\t\t\t\t\tstyle="border-color: {cssColors.clUiSymbols}">&#xf068</div>\n\t\t\t\t\t<div class="control_button small_button" id="bt_speed_up" onmousedown={onButtonClick} \n\t\t\t\t\t\tstyle="border-color: {cssColors.clUiSymbols}">&#xf067</div>\n\t\t\t\t\t<div class="replay_speed_text">\n\t\t\t\t\t\tx{model.replaySpeedRate.toFixed(2)}\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div style="width:4px; height: 1px" />\n\n\t\t\t\t\t<div class="{control_button_back: true, is_on: model.isAutoShiftToNextReel}">\n\t\t\t\t\t\t<div class="control_button small_button" id="bt_cont" onmousedown={onButtonClick} style="border-color: {cssColors.clUiSymbols}">\n\t\t\t\t\t\t\t&#xe90a\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class="time_position_text">\n\t\t\t\t\t{model.trackPosText}\n\t\t\t\t</div>\n\n\t\t\t\t<div class="gauge_box">\n\t\t\t\t\t<div class="gauge" onmousedown={onTrackKnobMouseDown}>\n\t\t\t\t\t\t<div class="gauge_rail" id="gauge_rail" ref="gauge_rail" style="border-color: {cssColors.clUiSymbols}"/>\n\t\t\t\t\t\t<div class="gauge_knob" id="gauge_knob" \n\t\t\t\t\t\t\tstyle="left: {~~(model.trackPos * 290) + \'px\'}; background-color: {cssColors.clReplayBar}; border-color: {cssColors.clUiSymbols}"\n\t\t\t\t\t\t/>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div class="part_reel_control">\n\t\t\t\t<div class="ui_row">\n\t\t\t\t\t<div class="control_button middle_button" id="bt_reel_prev" onmousedown={onButtonClick}\n\t\t\t\t\t\tstyle="border-color: {cssColors.clUiSymbols}">&#xe912</div>\n\n\t\t\t\t\t<div class="control_button middle_button" id="bt_reel_next" onmousedown={onButtonClick}\n\t\t\t\t\t\tstyle="border-color: {cssColors.clUiSymbols}">&#xe913</div>\n\n\t\t\t\t\t<div class="reel_info_area">\n\t\t\t\t\t\t<div>{model.numReels > 0 ? model.curReelIndex + 1 : 0}/{model.numReels}</div>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class="control_button middle_button" id="bt_reel_delete" onmousedown={onButtonClick}\n\t\t\t\t\t\tstyle="border-color: {cssColors.clUiSymbols}">&#xe9ad</div>\n\t\t\t\t</div>\n\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div class="second_bar_area">\n\t\t\t<div class="replay_ui_message">\n\t\t\t\t{replayUiMessage}\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</replay-control-bar>\n')], t)
        }(s.Element);
    e.ReplayControlBarTag = h
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = function() {
        function t() {
            this.listeners = new Map
        }
        return t.prototype.emit = function(t, e) {
            var n = this.listeners.get(t);
            if (n)
                for (var i = 0, o = n; i < o.length; i++) {
                    (0,
                     o[i])(e)
                }
        },
            t.prototype.on = function(t, e) {
            this.listeners.get(t) || this.listeners.set(t, []),
                this.listeners.get(t).push(e)
        },
            t
    }();
    e.EventBus = i
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = function() {
        function t(t) {
            this.values = [0],
                this.maxCount = t
        }
        return t.prototype.Push = function(t) {
            this.values.length > this.maxCount && this.values.shift(),
                this.values.push(t)
        },
            t.prototype.GetAverageValue = function() {
            var t = 0;
            return t = this.values.reduce(function(t, e) {
                return t + e
            }, 0),
                t /= this.values.length
        },
            t
    }();
    e.PerformanceCheckQueue = i
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var O = n(1),
        D = n(3),
        H = n(0),
        B = n(4),
        P = B.gameCore.nodeMan,
        y = n(11),
        m = n(12),
        G = n(1),
        o = n(25),
        v = n(10),
        S = n(6);
    ! function(t) {
        var p = function() {
            function t(t) {
                this.holdTick = 0,
                    this.gameView = t,
                    this.box = new S.Container,
                    this.gr = new S.Graphics,
                    this.box.addChild(this.gr),
                    this.box.zIndex = 1e3,
                    this.elCursorOuter = document.querySelector("#psudo_cursor"),
                    this.elCursorImageOn = document.querySelector("#psudo_cursor_img_on"),
                    this.elCursorOuter.style.webkitUserSelect = "none"
            }
            return t.prototype.SetPsudoCursor = function(t, e, n, i) {
                var o = this.elCursorOuter;
                o.style.display = t ? "block" : "none",
                    o.style.left = n + "px",
                    o.style.top = i + "px",
                    e && (this.holdTick = 7),
                    this.holdTick > 0 && this.holdTick--,
                    this.elCursorImageOn.style.display = this.holdTick > 0 ? "block" : "none"
            },
                t.prototype.Update = function() {
                this.gr.clear(),
                    H.gs.gstates.isBenchmarkMode || (this.UpdateCursor(),
                                                     this.UpdateEatingLimitMarker(),
                                                     this.UpdateCellDirectionMarker(),
                                                     this.UpdateTeamCircle())
            },
                t.prototype.DrawCrossPoint = function(t, e, n) {
                var i = this.gr;
                i.moveTo(t - n, e),
                    i.lineTo(t + n, e),
                    i.moveTo(t, e - n),
                    i.lineTo(t, e + n)
            },
                t.prototype.UpdateTeamCircle = function() {
                var t = Date.now(),
                    e = B.gameCore.sight,
                    n = this.gr;
                if (t - e.teamCircleTimeStamp < 500) {
                    var i = e.teamCircleX,
                        o = e.teamCircleY,
                        r = e.teamCircleRadius;
                    n.lineStyle(10, 16777215, 1),
                        n.drawCircle(i, o, r)
                }
            },
                t.prototype.UpdateCellDirectionMarker = function() {
                var p = this.gr;
                H.gs.uconfig.ShowCellDirectionMarker && this.gameView.cells.forEach(function(t) {
                    if (t.isPlayerCell) {
                        var e = t.node;
                        if (0 != e.velocity.x || 0 != e.velocity.y) {
                            var n = Math.atan2(e.velocity.y, e.velocity.x),
                                i = e.nx,
                                o = e.ny,
                                r = t.baseSize / 2 * t.scale * .8,
                                s = t.baseSize / 2 * t.scale * 1.05,
                                a = i + Math.cos(n) * r,
                                l = o + Math.sin(n) * r,
                                c = i + Math.cos(n) * s,
                                h = o + Math.sin(n) * s,
                                d = t.labelColor;
                            p.lineStyle(10, d, 1);
                            var u = .05 * e.nr;
                            u = O.Nums.LoLimit(u, 15),
                                p.lineWidth = u,
                                p.moveTo(a, l),
                                p.lineTo(c, h)
                        }
                    }
                })
            },
                t.prototype.UpdateEatingLimitMarker = function() {
                var o = this;
                H.gs.uconfig.ShowEatLimitMarker && B.gameCore.nodeMan.nodeAnalyzer.eatingLimitList.forEach(function(t) {
                    var e = o.gameView.cells.get(t.eaterId),
                        n = o.gameView.cells.get(t.eatenId),
                        i = t.canEat ? 65535 : 11184810;
                    o.gr.lineStyle(10, i, 1),
                        o.DrawCrossPoint(e.x, e.y, 100),
                        o.DrawCrossPoint(n.x, n.y, 100),
                        o.gr.drawCircle(e.x, e.y, t.limitRadius)
                })
            },

                t.prototype.UpdateCursor = function() {
                var n = this,
                    t = B.gameCore.sight;
                if ((H.gs.gstates.isPlaying ? H.gs.uconfig.ShowCursorLine : H.gs.uconfig.ShowSpecAimCursor) && t.aimPlayerId > 0) {
                    var i = t.aimCursorX,
                        o = t.aimCursorY,
                        r = this.gr,
                        e = H.gs.ucolors.GetColor("clCursorLine");
                    r.alpha = D.ColorHelper.GetAlpha(e);
                    var s = H.gs.uconfig.CursorLineThickness;
                    s *= .2 / t.eyeScale,
                        r.lineStyle(s, e);
                    var a = t.aimPlayerId,
                        l = 0;
                    B.gameCore.nodeMan.nodes.forEach(function(t) {
                        if (t.ownerPlayerId == a && 0 == t.cellType) {
                            var e = n.gameView.cells.get(t.nodeId);
                            r.moveTo(e.x, e.y),
                                r.lineTo(i, o),
                                l++
                        }
                    });
                    var c = t.WorldToScreen(i, o),
                        h = c[0],
                        d = c[1];
                    this.SetPsudoCursor(!H.gs.gstates.isRealtimeModePlaying && l > 0, t.splitting, h, d),
                        t.splitting = !1
                } else
                    this.SetPsudoCursor(!1, !1, 0, 0)
            },
                t
        }(),
            f = function() {
                function t() {
                    this.cardSize = 250;
                    this.sharpness = 10;
                    this.glowDist = 100
                }
                return t.prototype.Initialize = function() {
                    this.url = H.gs.uconfig.virusMaterial,
                    this.canvas = document.createElement("canvas"),
                        this.canvas.width = this.canvas.height = this.cardSize + this.glowDist * 2,
                        this.url ? (this.texture = S.Texture.from(this.url)):(this.texture = S.Texture.from(this.canvas)),//virus texture
                        this.UpdateDrawing_Canvas(),
                        H.gs.uconfig.RegisterChangedProc("SimpleVirus", this.UpdateDrawing_Canvas.bind(this)),
                        H.gs.uconfig.RegisterChangedProc("GlowingNonPlayerCells", this.UpdateDrawing_Canvas.bind(this)),
                        H.gs.ucolors.RegisterChangedProc("clVirusInnerFill", this.UpdateDrawing_Canvas.bind(this)),
                        H.gs.ucolors.RegisterChangedProc("clVirusOuterStroke", this.UpdateDrawing_Canvas.bind(this))
                },
                    t.prototype.UpdateDrawing_Canvas = function() {
                    const e = H.gs.uconfig.GlowingNonPlayerCells;
                    var n = this.cardSize,
                        i = n / 2,
                        o = i + this.glowDist,
                        r = this.canvas.getContext("2d"),
                        s = H.gs.ucolors.GetColor("clVirusInnerFill"),
                        a = H.gs.ucolors.GetAlpha("clVirusInnerFill"),
                        l = H.gs.ucolors.GetColor("clVirusOuterStroke"),
                        c = H.gs.ucolors.GetAlpha("clVirusOuterStroke");
                    r.clearRect(0, 0, o * 2, o * 2);
                    r.shadowColor = D.ColorHelper.ColorToHtmlString(l);
                    if (H.gs.uconfig.SimpleVirus) {
                        r.beginPath();
                        var t = 4 * (.01 * this.cardSize);
                        r.arc(o, o, i, 0, 2 * Math.PI, !1);
                        r.arc(o, o, this.cardSize / 2 - t / 2, 0, 2 * Math.PI, !1);
                        r.lineWidth = t;
                        r.strokeStyle = D.ColorHelper.ColorToHtmlString(l);
                        r.globalAlpha = c;
                        r.shadowBlur = e ? this.glowDist : 0;
                        r.stroke();
                        r.stroke();
                        r.shadowBlur /= 2;
                        r.stroke();
                        r.stroke();
                        r.globalAlpha /= 2;
                        r.stroke();
                        r.stroke();
                        r.shadowBlur /= 1.5;
                        r.stroke();
                        r.stroke();
                        r.fillStyle = D.ColorHelper.ColorToHtmlString(s);
                        r.globalAlpha = a;
                        r.fill();
                        r.shadowBlur = e ? i * .1 : 0;
                        r.globalAlpha = c;
                        r.stroke();
                        r.globalAlpha /= 2;
                        r.stroke();
                        r.globalAlpha = 1
                    } else {
                        r.beginPath();
                        const h = 24;
                        const d = 360 / h / 180 * Math.PI;
                        const t = d / 2;
                        const u = i + this.sharpness;
                        const p = i - this.sharpness;
                        for (var n = 0; n <= h; n++) {
                            r.lineTo(Math.cos(n * d) * u + o, -Math.sin(n * d) * u + o);
                            r.lineTo(Math.cos(n * d + t) * p + o, -Math.sin(n * d + t) * p + o)
                        }
                        r.lineWidth = 3.25 * (.01 * this.cardSize);
                        r.strokeStyle = D.ColorHelper.ColorToHtmlString(l);
                        r.lineJoin = "round";
                        r.globalAlpha = c;
                        r.shadowBlur = e ? this.glowDist : 0;
                        r.stroke();
                        r.stroke();
                        r.shadowBlur /= 2;
                        r.stroke();
                        r.stroke();
                        r.globalAlpha /= 2;
                        r.stroke();
                        r.stroke();
                        r.shadowBlur /= 1.5;
                        r.stroke();
                        r.stroke();
                        r.fillStyle = D.ColorHelper.ColorToHtmlString(s);
                        r.globalAlpha = a;
                        r.fill();
                        r.shadowBlur = e ? i * .1 : 0;
                        r.globalAlpha = c;
                        r.stroke();
                        r.globalAlpha /= 2;
                        r.stroke();
                        r.globalAlpha = 1
                    }
                    this.texture.update()
                },
                    t.instance = new t,
                    t
            }(),
            e = function() {
                function t() {}
                return t.prototype.GetSequenceString = function() {
                    var t = this;
                    return "" + t.skinUrl + t.nameText + t.skinAlpha + t.renderQuality + t.baseColor + t.teamColor + t.showEnemyOverlay + t.insertRenderName
                },
                    t
            }(),
            N = function() {
                function e() {}
                return e.GetConfigCardSizeFromRenderQuality = function(t) {
                    return e.CardSizeSource[t]
                },
                    Object.defineProperty(e, "CurrentConfigCardSize", {
                    get: function() {
                        return e.GetConfigCardSizeFromRenderQuality(H.gs.uconfig.RenderQuality)
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                    e.CardSizeSource = [200, 400, 800],
                    e
            }(),
            i = function() {
                function I(t) {
                    this.drawingProps = new e,
                        this.playerId = t,
                        this.drawingProps.renderQuality = H.gs.uconfig.RenderQuality
                }
                return I.ResizeInterCanvasIfNeed = function(t) {
                    var e = I.interCanvas;
                    e.height < t && (e.width = t,
                                     e.height = t)
                },
                    I.prototype.ResizeCanvasIfNeed = function(t) {
                    if (this.canvas || (this.canvas = document.createElement("canvas"),
                                        this.canvasCapacitySize = 10,
                                        this.canvas.width = 10,
                                        this.canvas.height = 10),
                        this.canvasCapacitySize != t) {
                        this.canvasCapacitySize = t,
                            this.canvas.height < t && (this.canvas = document.createElement("canvas"),
                                                       this.canvas.width = t,
                                                       this.canvas.height = t,
                                                       this.baseTexture = S.BaseTexture.from(this.canvas));
                        var e = new S.Rectangle(0, 0, t, t);
                        this.texture = new S.Texture(this.baseTexture, e)
                    }
                },
                    I.prototype.StringToCharArrayU = function(t) {
                    return t.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g) || []
                },
                    I.prototype.DrawTextCircular = function(t, e, n, i, o, r, s, a) {
                    t.save(),
                        t.translate(n, i);
                    for (var l = s, c = this.StringToCharArrayU(e), h = 0; h < c.length; h++) {
                        var d = c[h];
                        t.save(),
                            t.rotate(l);
                        var u = t.measureText(d).width,
                            p = -u / 2,
                            f = o * a;
                        t.strokeText(d, p, f),
                            t.fillText(d, p, f),
                            t.restore();
                        var g = .4 * u + .2 * r,
                            m = Math.sqrt(o * o - g * g);
                        l -= 2 * Math.atan2(g, m)
                    }
                    t.restore()
                },
                    I.prototype.RenderCellCanvas = function() { //test
                    if (this.playerId == P.activeSelfPlayerId) {
                        this.self = !0
                    }
                    var e = this.drawingProps,
                        n = N.GetConfigCardSizeFromRenderQuality(e.renderQuality);
                    this.cardSize = n;
                    const t = parseInt(n / 22);
                    var i = n / 2,
                        o = H.gs.uconfig.GlowingCells ? t : 0,
                        r = i + o,
                        s = 2 * r,
                        a = (i + t) * 2;
                    this.ResizeCanvasIfNeed(s);
                    var l = this.canvas.getContext("2d");
                    if (l.save(),
                        l.clearRect(0, 0, a, a),
                        l.beginPath(),
                        l.arc(r, r, i, 0, 2 * Math.PI, !1),
                        l.closePath(),
                        this.skinVisible = this.skinImage && e.skinAlpha > 0,
                        this.skinVisible) {
                        l.shadowBlur = o;
                        l.shadowColor = l.fillStyle = D.ColorHelper.ColorToHtmlString(e.baseColor);
                        l.fill();
                        l.clip();
                        var c = this.skinImage,
                            h = c.width,
                            d = c.height,
                            u = 0,
                            p = 0,
                            f = 0,
                            g = n;
                        let t = this.self ? H.gs.uconfig.ShowSelfSkin : true;
                        if (t) {
                            if (h > d ? (u = (h - (f = d)) / 2,
                                         p = 0) : (u = 0,
                                                   p = (d - (f = h)) / 2),
                                l.globalAlpha = e.skinAlpha,
                                g / f < .5) {
                                I.ResizeInterCanvasIfNeed(s);
                                var m = I.interCanvas,
                                    y = m.getContext("2d"),
                                    v = n * 2;
                                y.clearRect(0, 0, a, a),
                                    y.drawImage(c, u, p, f, f, o, o, g, g),
                                    l.drawImage(m, o, o, g, g, o, o, g, g)
                            } else
                                l.drawImage(c, u, p, f, f, o, o, g, g)
                        }
                        l.globalAlpha = 1;
                        l.shadowBlur = 0
                    }
                    var S = D.ColorHelper.ColorToHtmlString(e.teamColor);
                    if (e.showEnemyOverlay) {
                        var b = 2 * Math.PI,
                            C = 6 * (k = .01 * n),
                            x = 7 * k,
                            _ = n / 2;
                        l.strokeStyle = S,
                            l.lineWidth = C,
                            l.globalAlpha = .3,
                            l.fillStyle = "#000",
                            l.save(),
                            l.arc(r, r, i, 0, 2 * Math.PI, !1),
                            l.clip(),
                            l.fillRect(o, o, n + o, n + o),
                            l.restore(),
                            l.globalAlpha = .8,
                            l.beginPath(),
                            l.arc(r, r, _ - x, 0, b, !1),
                            l.stroke();
                        var s = .707 * _ - x;
                        l.beginPath(),
                            l.moveTo(o + _ + s, o + _ - s),
                            l.lineTo(o + _ - s, o + _ + s),
                            l.stroke(),
                            l.globalAlpha = 1
                    }
                    if (e.insertRenderName) {
                        var k, w = 10 * (k = .01 * n) >> 0;
                        l.font = "bold " + w + "px Meiryo, Arial",
                            l.strokeStyle = "#000",
                            l.fillStyle = S,
                            l.lineWidth = 1.3 * k >> 0,
                            this.DrawTextCircular(l, e.nameText, n, n, .8 * i, w, 1.5, 1)
                    }
                    l.restore(),
                        this.texture.update()
                },
                    I.prototype.Update = function() {
                    var e = this,
                        t = this.drawingProps,
                        n = t.GetSequenceString(),
                        i = t.skinUrl,
                        o = B.gameCore.uMan,
                        r = 65535 & this.playerId,
                        s = 1 & this.playerId,
                        a = o.GetUserInfoById(r),
                        l = o.GetTeamInfoById(a.teamId),
                        c = r == o.selfUserId,
                        h = H.gs.gstates.isPlaying || H.gs.gstates.isDeadSpectation,
                        d = a.skinUrls[s],
                        u = l == o.selfTeamInfo,
                        p = D.GameHelper.CheckIsInEatableSection(l.section, o.selfTeamInfo.section),
                        f = !a.isBot && "" == d;
                    f && (d = H.gs.gconfig.NoskinFallbackUrl);
                    var g = 1,
                        m = !0;
                    h && !u && (H.gs.uconfig.ShowEnemySkin ? g = .6 : m = !1),
                        f && c && (m = !1),
                        "dead" == a.name && (m = !1),
                        H.gs.gconfig.ShowAlwaysAllPlayersSkin && (m = !0,
                                                                  g = 1),
                        this.skinImage && 0 == v.SkinImageManager.instance.getSkinAvailability(this.skinImage.src) && (m = !1),
                        H.gs.uconfig.ShowSkin || (m = !1),
                        m || (g = 0),
                        t.baseColor = a.colors[s],
                        t.skinUrl = d,
                        t.nameText = a.fullName,
                        t.teamColor = l.color,
                        t.renderQuality = H.gs.uconfig.RenderQuality,
                        t.insertRenderName = H.gs.uconfig.ShowCircularName && H.gs.uconfig.ShowName && !(!H.gs.uconfig.ShowSelfName && c),
                        t.skinAlpha = g,
                        t.showEnemyOverlay = H.gs.uconfig.ShowEnemySkin && h && !a.isBot && !u && p && g > 0,
                        H.gs.gconfig.ShowAlwaysAllPlayersSkin && (t.showEnemyOverlay = !1);
                    //skin
                    if (this.glow != H.gs.uconfig.GlowingCells) {
                        this.glow = H.gs.uconfig.GlowingCells;
                        this.reqRenderCellCanvasOnNextFrame = !0
                    }
                    if ((this.self || c) && this.sv != H.gs.uconfig.ShowSelfSkin) {
                        this.sv == H.gs.uconfig.ShowSelfSkin;
                        this.reqRenderCellCanvasOnNextFrame = !0
                    }
                    t.GetSequenceString() != n && (t.skinUrl != i ? (this.skinImage = null,
                                                                     this.reqRenderCellCanvasOnNextFrame = !0,
                                                                     t.skinUrl && y.ImageWrapper.LoadImageThen(t.skinUrl, function(t) {
                        t && v.SkinImageManager.instance.addSkinUrl(t.src),
                            e.skinImage = t,
                            e.reqRenderCellCanvasLazy = !0
                    })) : this.reqRenderCellCanvasLazy = !0)
                },
                    I.prototype.Purge = function() {
                    this.skinImage && this.skinImage.src && v.SkinImageManager.instance.removeSkinUrl(this.skinImage.src)
                },
                    I.interCanvas = document.createElement("canvas"),
                    I
            }(),
            g = function() {
                function t() {
                    this.cellCards = new Map
                }
                return t.prototype.GetCellCard = function(t, e) {
                    void 0 === e && (e = !1);
                    var n = this.cellCards.get(t);
                    return !n && e && (n = new i(t),
                                       this.cellCards.set(t, n)),
                        G.Utils.Confirm(n),
                        n
                },
                    t.prototype.OnUserLeaved = function(t) {
                    var e = this.cellCards.get(t);
                    e && e.Purge(),
                        this.cellCards.delete(t),
                        this.cellCards.delete(t + 1)
                },
                    t.prototype.UpdateCardDrawingQueue = function() {
                    var e = !1;
                    this.cellCards.forEach(function(t) {
                        t.reqRenderCellCanvasOnNextFrame && (t.RenderCellCanvas(),
                                                             t.reqRenderCellCanvasOnNextFrame = !1,
                                                             e = !0)
                    }),
                        this.cellCards.forEach(function(t) {
                        !e && t.reqRenderCellCanvasLazy && (t.RenderCellCanvas(),
                                                            t.reqRenderCellCanvasLazy = !1,
                                                            e = !0)
                    })
                },
                    t.instance = new t,
                    t
            }(),
            s = function() {
                function t() {
                    this.box = new S.Container,
                        this.baseShape = new S.Sprite,
                        this.baseShape.anchor.set(.5),
                        this.baseSprite = new S.Sprite,
                        this.baseSprite.anchor.set(.5),
                        this.overShape = new S.Graphics,
                        this.nameLabel = new S.Sprite,
                        this.massLabel = new S.BitmapText("", {
                        fontName: "GAMEPLAY_MASS"
                    }),
                        this.box.addChild(this.baseShape),
                        this.box.addChild(this.baseSprite),
                        this.box.addChild(this.overShape)
                }
                return t.Gain = function() {
                    return t.pool.Gain()
                },
                    t.Maintain = function() {
                    t.pool.Maintain()
                },
                    t.prototype.Release = function() {
                    this.box.removeChild(this.nameLabel);
                    this.box.removeChild(this.massLabel);
                    this.nameLabel.texture = PIXI.Texture.EMPTY;
                    t.pool.Release(this)
                },
                    Object.defineProperty(t.prototype, "isPlayerCell", {
                    get: function() {
                        return 0 == this.node.cellType
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                    Object.defineProperty(t.prototype, "isVirus", {
                    get: function() {
                        return 2 == this.node.cellType
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                    Object.defineProperty(t.prototype, "isPellet", {
                    get: function() {
                        return 1 == this.node.cellType
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                    Object.defineProperty(t.prototype, "isFood", {
                    get: function() {
                        return 3 == this.node.cellType
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                    Object.defineProperty(t.prototype, "isFunnel", {
                    get: function() {
                        return 4 == this.node.cellType
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                    t.prototype.Initialize = function(t) {
                    this.node = t;
                    t.entity = this;
                    this.glow = this.cellCard = this.baseSize = null;
                    //text improved by redgeioz
                    if (this.isPlayerCell) {
                        this.cellCard = g.instance.GetCellCard(t.ownerPlayerId);
                        this.nameLabel.texture = B.gameCore.uMan.GetUserInfoById(t.ownerPlayerId).nameText.texture
                    } else {
                        this.isVirus && (this.cellCard = f.instance)
                    }
                    this.UpdateBaseShape();
                    if (this.cellCard) {
                        this.box.addChild(this.nameLabel);
                        this.box.addChild(this.massLabel)
                    }
                        this.baseColor = -1,
                        this.labelColor = -1,
                        this.edgeColor = -1,
                        this.edgeColor2 = -1,
                        this.ringColor = -1,
                        this.frameTick = 0,
                        this.x = 0,
                        this.y = 0,
                        this.scale = 1,
                        this.x0 = 0,
                        this.y0 = 0,
                        this.scale0 = 1,
                        this.x1 = 0,
                        this.y1 = 0,
                        this.scale1 = 0,
                        this.angle = 0,
                        this.speed = 0,
                        this.speedApplyTime = 0,
                        this.time = 0,
                        this.mass = 0,
                        this.isInEatableSection = !1
                },
                    t.prototype.UpdateProps = function(t) {
                    this.node = t,
                        t.entity = this,
                        !(0 == this.mass) && this.isPellet || this.UpdatePosRadius()
                },
                    t.prototype.UpdateLabels = function(e, t, n) {
                    var i = null != e,
                        o = t >= 0;
                    if ((i || o) && this.labelColor != n) {
                        this.labelColor = n;
                        var r = D.ColorHelper.ColorToHtmlString(n);
                        this.massLabel.updateText();
                            this.massLabel.tint = n
                    }
                    i && (a = this.nameLabel,
                a.x = -a.width / 2,
                a.y = -a.height / 2);
                    if (o) {
                        var s = t.toString();
                        if (this.massLabel.text != s) {
                            var a = this.massLabel,
                                l, c = 2;
                            if (this.isVirus) {
                                c = 2.2;
                                if (H.gs.uconfig.VirusSplitHint) {
                                    //s = 5 - (s - 100) / 16;
                                    if(gTargetSite == "caffe") {s = Math.ceil((6 - (s - 100) / 15))}
                                    if(gTargetSite == "sao") 
                                    {
                                        s = Math.ceil((5 - (s - 100) / 16))
                                    }
                                    l = 4
                                } else {
                                    l = 2.5
                                }
                            } else {
                                l = 1
                            }
                            a.scale.x = l,
                                a.scale.y = l;
                            let t;
                            if (s < 1e3) {
                                t = s
                            } else if (H.gs.uconfig.SimplifiedMass) {
                                t = (s / 100 >> 0) / 10 + "K"
                            } else {
                                t = s
                            }
                            a.text = t,
                                a.x = -a.width / 2,
                                a.y = -a.height / c,
                                i && e && (a.y += .2 * this.baseSize)
                        }
                    }
                    this.nameLabel.visible = i;
                    this.massLabel.visible = o;
                    let h = H.gs.uconfig.AutoHideText ? B.gameCore.sight.eyeScale * this.node.r > 27 : true;
                    this.nameLabel.visible = i && h;
                    this.massLabel.visible = o && h;
                    this.nameLabel.alpha = H.gs.uconfig.PlayerLabelsAlpha;
                    this.massLabel.alpha = H.gs.uconfig.PlayerLabelsAlpha;//name alpha
                },
                    t.prototype.UpdateBaseShape = function() {
                    const t = N.CurrentConfigCardSize;
                    if (this.isPellet || this.isFood) {
                        const e = !1;
                        if (this.baseSize != t || this.glow != e) {
                            this.baseSize = t;
                            this.glow = e;
                            this.massLabel.fontSize = .13 * this.baseSize >> 0;
                            this.baseShape.blendMode = e ? PIXI.BLEND_MODES.SCREEN : PIXI.BLEND_MODES.NORMAL;
                            const pellet = PIXI.utils.TextureCache["CUSTOM_PELLET"] ? "CUSTOM_PELLET" : "GP_BASE_LOW"
                            const n = e ? "GP_GLOWING_PELLET" : pellet;
                            this.isPellet && (this.baseShape.texture = PIXI.utils.TextureCache[n])
                            this.isFood && (this.baseShape.texture = PIXI.utils.TextureCache["GP_BASE_LOW"])
                        }
                        if (this.node.ownerPlayerId == 0) {
                            if (H.gs.uconfig.ShowFood) {
                                this.box.visible = true
                            } else {
                                this.box.visible = false
                            }
                        } else {
                            if (H.gs.uconfig.ShowPelletSkin)
                                this.cellCard = g.instance.GetCellCard(this.node.ownerPlayerId);
                            this.box.visible = true
                        }
                        return
                    }
                    this.box.visible = true;
                    const e = H.gs.uconfig.GlowingCells;
                    if (this.baseSize != t || this.glow != e) {
                        this.baseSize = t;
                        this.glow = e;
                        this.massLabel.fontSize = .13 * this.baseSize >> 0;
                        this.baseShape.blendMode = PIXI.BLEND_MODES.NORMAL;
                        const cellLow = PIXI.utils.TextureCache["CUSTOM_CELL_LOW"] ? "CUSTOM_CELL_LOW" : "GP_BASE_LOW"
                        const cellMedium = PIXI.utils.TextureCache["CUSTOM_CELL_MEDIUM"] ? "CUSTOM_CELL_MEDIUM" : "GP_BASE_MEDIUM"
                        const cellHigh = PIXI.utils.TextureCache["CUSTOM_CELL_HIGH"] ? "CUSTOM_CELL_HIGH" : "GP_BASE_HIGH"
                        if (this.baseSize == 200) {
                            const n = e ? "GP_GLOWING_LOW" : cellLow;
                            this.baseShape.texture = PIXI.utils.TextureCache[n]
                        } else if (this.baseSize == 400) {
                            const n = e ? "GP_GLOWING_MEDIUM" : cellMedium;
                            this.baseShape.texture = PIXI.utils.TextureCache[n]
                        } else {
                            const n = e ? "GP_GLOWING_HIGH" : cellHigh;
                            this.baseShape.texture = PIXI.utils.TextureCache[n]
                        }
                    }
                },
                    t.prototype.UpdateDrawing = function(t, e, n, i, o) {
                    var r = this.baseSize / 2,
                        s = this.baseSize / 200,
                        a = e >= 0 || i >= 0 || o >= 0;
                    if (this.isVirus && H.gs.uconfig.VirusRangeHint) {
                        a = true;
                        (h = this.overShape).clear();
                        h.alpha = 1;
                        let t = D.ColorHelper.ReplaceAlpha(H.gs.ucolors.GetColor("clVirusRangeHint")),
                            e = H.gs.ucolors.GetAlpha("clVirusRangeHint");
                        h.beginFill(t, e);
                        h.drawCircle(0, 0, 880 / this.scale);
                        h.endFill()
                    }
                    if (a && (this.edgeColor != e || this.edgeColor2 != i || this.ringColor != o)) {
                        const u = this.node.ownerPlayerId == B.gameCore.nodeMan.activeSelfPlayerId;
                        if (this.edgeColor = e,
                            this.edgeColor2 = i,
                            this.ringColor = o,
                            (h = this.overShape).clear(),
                            h.alpha = 1,
                            e >= 0) {
                            var l = H.gs.uconfig.MarkerThickness * s;
                            if (h.lineStyle(l, e),
                                h.drawCircle(0, 0, r - l / 2),
                                n) {
                                var c = .707 * r;
                                h.moveTo(c, -c),
                                    h.lineTo(-c, c)
                            }
                        }
                        if (i >= 0) {
                            l = this.mass > 2e4 ? 8.75 * s : 6.25 * s;
                            h.lineStyle(l, i),
                                h.drawCircle(0, 0, r - l / 2)
                        }
                        if (o >= 0) {
                            l = 5 * s;
                            h.lineStyle(l, o),
                                h.drawCircle(0, 0, r + 10 * s)
                        }
                    }
                    this.overShape.visible = a,
                        this.overShape.alpha = H.gs.uconfig.MarkerAlpha;
                    var h, d = t >= 0;
                    d && this.baseColor != t && (this.baseColor = t,
                                                 this.baseShape.tint = t);
                    this.baseShape.visible = d
                },
                    t.prototype.UpdateGraphicsForFrame = function() {
                    var t = this.baseSize;
                    this.baseSize = N.CurrentConfigCardSize;
                    var e = this.baseSize != t,
                        n = this.node,
                        i = B.gameCore.nodeMan,
                        o = B.gameCore.uMan,
                        r = D.GameHelper.DecodePlayerId(n.ownerPlayerId),
                        s = r[0],
                        a = r[1],
                        l = o.GetUserInfoById(s),
                        c = o.GetTeamInfoById(l.teamId),
                        h = l.isBot,
                        d = c == o.selfTeamInfo,
                        u = o.selfTeamInfo.section,
                        self = [gVar.conn1.id,gVar.conn2.id,gVar.conn1.id+1,gVar.conn2.id+1],
                        p = (this.isPlayerCell || this.isFood) && !D.GameHelper.CheckIsInEatableSection(c.section, u);
                    this.isInEatableSection = p;
                    var f = H.gs.gstates.isPlaying && p;
                    this.box.alpha = f ? H.gs.uconfig.AnotherSectionCellsAlpha : 1;
                    var g = this.isPlayerCell && (65534 & n.ownerPlayerId) == o.selfUserId,
                        m = this.isPlayerCell && n.ownerPlayerId == i.activeSelfPlayerId;
                    var y = this.isPlayerCell && !H.gs.uconfig.ShowCircularName && H.gs.uconfig.ShowName && !(!H.gs.uconfig.ShowSelfName && g) && "" != l.fullName,
                        v = H.gs.uconfig.ShowMass && (this.isPlayerCell || this.isVirus),
                        S = y && l.fullName ? l.fullName : null,
                        b = v ? n.mass : -1,
                        C = this.isVirus ? 16777215 : c.color;
                    this.UpdateLabels(S, b, C);
                    var x = -1,
                        _ = -1,
                        k = -1,
                        w = -1,
                        I = !1;
                    if (this.isPlayerCell ? x = l.colors[a] : this.isFood ? x = l.colors[a] : this.isFunnel ? x = l.colors[a] : this.isPellet && (!H.gs.uconfig.SinglePelletsColor ? (x = n.color) : (x = D.ColorHelper.ReplaceAlpha(H.gs.ucolors.GetColor("clPellet")))),//: this.isPellet && (x = D.ColorHelper.ReplaceAlpha(H.gs.ucolors.GetColor("clPellet"))),
                        this.isPlayerCell) {
                        gVar.ring = m
                        if (H.gs.uconfig.ShowSplitPrediction && m) {
                            var P = n.splitOrderWeight,
                                M = O.Nums.MapTo(P, .9, .58);
                            _ = 16777215 & D.ColorHelper.ColorFromHSVA(M, 1, 1, 1)
                        }
                        if (H.gs.uconfig.ShowOrderRing2 && self.includes(s)) {
                            m ? (_ = D.ColorHelper.ReplaceAlpha(H.gs.ucolors.GetColor("clMarkerRing"))) : (_ =D.ColorHelper.ReplaceAlpha(H.gs.ucolors.GetColor("clMarkerRing2")))
                        }
                        if (H.gs.uconfig.ShowOrderRing && m) {
                            _ = D.ColorHelper.ReplaceAlpha(H.gs.ucolors.GetColor("clMarkerRing"))
                        }
                        if (H.gs.uconfig.ShowCellRing) {
                            var temp = D.ColorHelper.invertColor(D.ColorHelper.ColorToHtmlString(l.colors[a]));
                            _ = D.ColorHelper.ColorFromHtmlString(temp)
                            //.
                        }
                        if (H.gs.uconfig.ShowMassMarker && !m) {
                            var T = n.sizeLevel;
                            var R = H.gs.uconfig.MarkerExtend ? [D.ColorHelper.ReplaceAlpha(H.gs.ucolors.GetColor("clMarkerA")), D.ColorHelper.ReplaceAlpha(H.gs.ucolors.GetColor("clMarkerB")), D.ColorHelper.ReplaceAlpha(H.gs.ucolors.GetColor("clMarkerC")), D.ColorHelper.ReplaceAlpha(H.gs.ucolors.GetColor("clMarkerD")), D.ColorHelper.ReplaceAlpha(H.gs.ucolors.GetColor("clMarkerE")), D.ColorHelper.ReplaceAlpha(H.gs.ucolors.GetColor("clMarkerF")), D.ColorHelper.ReplaceAlpha(H.gs.ucolors.GetColor("clMarkerG")), D.ColorHelper.ReplaceAlpha(H.gs.ucolors.GetColor("clMarkerH")), 204] : [16711680, 16737792, 16776960, 56831, 43520, 204];
                            if (-1 != T) {
                                var A = R[T];
                                H.gs.uconfig.ShowSkin && (H.gs.uconfig.ShowEnemySkin || d) ? (_ = A,
                                                                                              I = !h && !d,
                                                                                              H.gs.gconfig.ShowAlwaysAllPlayersSkin && (I = !1)) : x = A
                            }
                        }
                        if (H.gs.uconfig.ShowSplitIndicator && H.gs.gstates.isPlaying && !g && n.showMark && (w = n.canEat ? 65280 : 11184810),
                            H.gs.uconfig.ShowAutoSplitAlert && !H.gs.gstates.isBenchmarkMode && n.mass >= 17325) {
                            var U = this.frameTick / 25 * .5 % 1;
                            (U *= 2) > 1 && (U = 2 - U);
                            M = n.mass > 2e4 ? O.Nums.MapTo(U, 0, .33) : O.Nums.MapTo(U, .2875, .725);
                            k = 16777215 & D.ColorHelper.ColorFromHSVA(M, 1, 1, 1)
                        }
                    }
                    let E = this.isPlayerCell || this.isFood;
                    if (this.cellCard,
                        E || G.Utils.Confirm(-1 == _ && -1 == k && -1 == w),
                        E && this.cellCard && this.cellCard.skinVisible && (x = -1),
                        this.UpdateDrawing(x, _, I, k, w),
                        this.cellCard && this.cellCard.texture) {
                        this.baseSprite.texture = this.cellCard.texture;
                        var F = this.baseSize / this.cellCard.cardSize;
                        this.baseSprite.scale.x = F,
                            this.baseSprite.scale.y = F
                    }
                    this.UpdateBaseShape();
                    this.baseSprite.visible = null != this.cellCard
                    H.gs.uconfig.invisibleSelfCell && (this.node.ownerPlayerId == gVar.conn1.id || this.node.ownerPlayerId == gVar.conn1.id+1) && this.isPlayerCell && (this.baseSprite.visible = !1)
                },
                    t.prototype.UpdateInterpolation = function(t, e) {
                    this.frameTick++;
                    const n = H.gs.uconfig;
                    if (n.InterpolationType == 2) {
                        var i = O.Nums.MapTo(n.InterpolationSpeed, .9, .5);
                        this.x = O.Nums.EasyFilter(this.x, this.x1, i),
                            this.y = O.Nums.EasyFilter(this.y, this.y1, i),
                            this.scale = O.Nums.EasyFilter(this.scale, this.scale1, i),
                            this.speedApplyTime -= t,
                            this.speedApplyTime <= 0 && (this.speed = 0);
                        var o = 1 * D.GameHelper.MassToRadius(this.mass),
                            r = H.gs.gconfig.FieldSize;
                        let _t = H.gs.gconfig.minX;
                        let _e = H.gs.gconfig.minY;
                        O.Nums.InRange(this.x1-_t, o, r - o) && O.Nums.InRange(this.y1-_e, o, r - o) || (this.speed = 0),
                            this.x1 += Math.cos(this.angle) * this.speed,
                            this.y1 += Math.sin(this.angle) * this.speed
                    } else if (n.InterpolationType == 1) {
                        const c = this.node;
                        const h = this.isFood && !(n.ShowPelletSkin && this.cellCard) || this.isPellet ? 200 : this.baseSize;
                        const d = e;
                        c.LinearUpdate(d);
                        this.x = c.x;
                        this.y = c.y;
                        this.scale = c.r * 2 / h
                    } else {
                        var s = performance.now(),
                            a = O.Nums.MapTo(n.InterpolationSpeed, 120, 40),
                            l = O.Nums.Clamp((s - this.time) / a, 0, 1);
                        this.x = O.Nums.Lerp(this.x0, this.x1, l),
                            this.y = O.Nums.Lerp(this.y0, this.y1, l),
                            this.scale = O.Nums.Lerp(this.scale0, this.scale1, l)
                    }
                    this.box.x = this.x,
                        this.box.y = this.y,
                        this.box.scale.x = this.scale,
                        this.box.scale.y = this.scale,
                        this.box.zIndex = this.scale * (!this.isPlayerCell && !this.isVirus ? 200 / this.baseSize : 1) + 1e-8 * this.node.nodeId + (this.isInEatableSection ? 100 : 0)
                },
                    t.prototype.UpdatePosRadius = function() {
                    this.time = performance.now();
                    const t = this.isFood && !(H.gs.uconfig.Show && this.cellCard) || this.isPellet ? 200 : this.baseSize;
                    var e = 0 == this.mass,
                        n = this.node.nx,
                        i = this.node.ny,
                        o = this.node.mass,
                        r = 2 * D.GameHelper.MassToRadius(o) / t,
                        s = this.node.motionAngle,
                        a = this.node.motionSpeed;
                    H.gs.uconfig.InterpolationType == 2 ? (this.speed = 25 * a / 60 * .6,
                                                           this.speedApplyTime = 50) : this.speed = 0,
                        e ? (this.x0 = n,
                             this.y0 = i,
                             this.scale0 = r,
                             this.x = n,
                             this.y = i,
                             this.scale = r) : (this.x0 = this.x,
                                                this.y0 = this.y,
                                                this.scale0 = this.scale),
                        this.x1 = n,
                        this.y1 = i,
                        this.scale1 = r,
                        this.angle = s,
                        this.mass = o
                },
                    t.pool = new D.ObjectPool(H.gs.gconfig.MaxCellsNum, function() {
                    return new t
                }),
                    t
            }(),
            n = function() {
                function t() {
                    this.delta = 0;
                    this.cells = new Map,
                        this.time0 = Date.now(),
                        this.checkQueue_interval = new o.PerformanceCheckQueue(60),
                        this.checkQueue_duration = new o.PerformanceCheckQueue(60),
                        this.frameIndex = 0
                }
                return t.prototype.Initialize = function() {
                    var n = this,
                        t = document.querySelector("#game_canvas_layer_main"),
                        e = {
                            width: t.width,
                            height: t.hight,
                            view: t,
                            antialias: H.gs.uconfig.Antialias,
                            backgroundAlpha: 0,
                            resolution: H.gs.uconfig.HDMode + 1,
                            autoDensity: H.gs.uconfig.HDMode,
                            powerPreference: "high-performance"
                        };
                    MAIN_RENDERER = S.autoDetectRenderer(e),
                        MAIN_RENDERER.cells = this.cells;
                    this.renderer = MAIN_RENDERER;
                    this.drawingRoot = new S.Container,
                        this.stage = new S.Container,
                        this.drawingRoot.addChild(this.stage),
                        this.fieldGraphics = new m.FieldGraphics(!0),
                        this.stage.addChild(this.fieldGraphics.box);
                                                        globalThis.__PIXI_STAGE__ = this.stage;
                    globalThis.__PIXI_RENDERER__ = this.renderer;
                    var i = function() {
                        n.fieldGraphics.SetCoordVisibility(H.gs.uconfig.ShowCoord)
                    };
                    H.gs.uconfig.RegisterChangedProc("ShowCoord", i),
                        i(),
                        this.cellsBox = new S.Container,
                        this.stage.addChild(this.cellsBox),

                        f.instance.Initialize(),
                        this.gfs = new p(this),
                        this.stage.addChild(this.gfs.box),
                        B.gameCore.nodeMan.gameViewSyncNodesToListProc = this.SyncNodeListToModel.bind(this),
                        B.gameCore.uMan.userLeavedProc = function(t) {
                        g.instance.OnUserLeaved(t)
                    };
                    var o = function() {
                        var t = window.innerWidth,
                            e = window.innerHeight;
                        n.renderer.resize(t, e),
                            B.gameCore.sight.SetScreenSize(t, e)
                    };
                    o(),
                        window.onresize = o;
                    const r = (t, e, n) => {
                        n = n ? n : 1;
                        const i = document.createElement("canvas");
                        const o = t + (e ? 400 : 0);
                        i.width = i.height = o * 2;
                        const r = i.getContext("2d");
                        r.beginPath();
                        r.fillStyle = "#ffffff";
                        r.shadowColor = "#ffffff";
                        r.shadowBlur = e;
                        r.arc(o, o, t, 0, Math.PI * 2);
                        for (var s = 0; s < n; s++) {
                            r.fill();
                            r.globalAlpha /= 2
                        }
                        return PIXI.Texture.from(i)
                    };
                    const customPellet = ()=>{
                        const url = H.gs.uconfig.pelletMaterial;
                        if(url){
                            let _o = PIXI.Texture.from(url);
                            _o.baseTexture.mipmap = PIXI.MIPMAP_MODES.ON;
                            PIXI.Texture.addToCache(_o, "CUSTOM_PELLET")
                        }
                    }
                    const customCell = ()=>{
                        const url1 = H.gs.uconfig.cellMaterialLow;
                        const url2 = H.gs.uconfig.cellMaterialMedium;
                        const url3 = H.gs.uconfig.cellMaterialHigh;
                        if(url1){
                            let _o = PIXI.Texture.from(url1);
                            _o.baseTexture.mipmap = PIXI.MIPMAP_MODES.ON;
                            _o.baseTexture.height==200 && _o.baseTexture.width==200 && PIXI.Texture.addToCache(_o, "CUSTOM_CELL_LOW")
                        }
                        if(url2){
                            let _o2 = PIXI.Texture.from(url2);
                            _o2.baseTexture.mipmap = PIXI.MIPMAP_MODES.ON;
                            _o2.baseTexture.height==400 && _o2.baseTexture.width==400 && PIXI.Texture.addToCache(_o2, "CUSTOM_CELL_MEDIUM")
                        }
                        if(url3){
                            let _o3 = PIXI.Texture.from(url3);
                            _o3.baseTexture.mipmap = PIXI.MIPMAP_MODES.ON;
                            _o3.baseTexture.height==800 && _o3.baseTexture.width==800 && PIXI.Texture.addToCache(_o3, "CUSTOM_CELL_HIGH")
                        }
                    }
                    customCell();
                    const preWave = ()=>{
                        const e = document.createElement("canvas")
                        , t = e.getContext("2d");
                        var mt = 150
                        e.width = mt * 2,
                            e.height = mt * 2;
                        const i = t.createRadialGradient(mt, mt, mt * .75, mt, mt, mt);
                        i.addColorStop(0, "transparent"),
                            i.addColorStop(1, "white"),
                            t.fillStyle = i,
                            t.beginPath(),
                            t.arc(mt, mt, mt, 0, Math.PI * 2, !1),
                            t.fill();
                       let o = PIXI.Texture.from(e);
                        o.baseTexture.mipmap = PIXI.MIPMAP_MODES.ON;
                        PIXI.Texture.addToCache(o, "Waves")
                    }
                    preWave();
                    customPellet();
                    const s = r(100);
                    const a = r(200);
                    const l = r(400);
                    const c = r(100, 50, 1);
                    const h = r(200, 100, 1);
                    const d = r(400, 200, 1);
                    s.baseTexture.mipmap = PIXI.MIPMAP_MODES.ON;
                    a.baseTexture.mipmap = PIXI.MIPMAP_MODES.ON;
                    l.baseTexture.mipmap = PIXI.MIPMAP_MODES.ON;
                    c.baseTexture.mipmap = PIXI.MIPMAP_MODES.ON;
                    h.baseTexture.mipmap = PIXI.MIPMAP_MODES.ON;
                    d.baseTexture.mipmap = PIXI.MIPMAP_MODES.ON;
                    PIXI.Texture.addToCache(s, "GP_BASE_LOW");
                    PIXI.Texture.addToCache(a, "GP_BASE_MEDIUM");
                    PIXI.Texture.addToCache(l, "GP_BASE_HIGH");
                    PIXI.Texture.addToCache(c, "GP_GLOWING_LOW");
                    PIXI.Texture.addToCache(h, "GP_GLOWING_MEDIUM");
                    PIXI.Texture.addToCache(d, "GP_GLOWING_HIGH");
                    const u = () => {
                        const t = document.createElement("canvas");
                        const e = 500;
                        t.width = t.height = e * 2;
                        const n = t.getContext("2d");
                        const i = H.gs.uconfig.PelletCellsAlpha;
                        n.beginPath();
                        n.fillStyle = "#ffffff";
                        n.shadowColor = "#ffffff";
                        n.shadowBlur = 2e3;
                        n.arc(e, e, 100, 0, Math.PI * 2);
                        n.fill();
                        n.globalAlpha = i / 2 + .125;
                        n.fill();
                        n.save();
                        n.clip();
                        n.clearRect(0, 0, e * 2, e * 2);
                        n.restore();
                        n.shadowBlur = 0;
                        n.globalAlpha = i;
                        n.fill();
                        let o = PIXI.Texture.from(t);
                        o.baseTexture.mipmap = PIXI.MIPMAP_MODES.ON;
                        PIXI.Texture.addToCache(o, "GP_GLOWING_PELLET")
                    };
                    u();
                    H.gs.uconfig.RegisterChangedProc("PelletCellsAlpha", u)
                },
                    t.prototype.StartAnimation = function() {
                    var t = this,
                        e = function() {
                            requestAnimationFrame(e),
                                D.TimeChecker.Start("FrameProc"),
                                t.FrameProc(),
                                D.TimeChecker.Stop(),
                                t.updateWaves()
                        };
                    e(),
                        this.UpdatePerf();
                    this.TimeHud();
                    this.wave_Sprite = new S.Sprite
                    this.wave_Sprite.anchor.x = .5,
                        this.wave_Sprite.anchor.y = .5,
                        t.stage.addChild(this.wave_Sprite);
                    this.wave_Sprite.texture = PIXI.utils.TextureCache["Waves"]
                    this.wave_Sprite.visible = !1
                },
                    t.prototype.FrameProc = function() {
                    this.frameIndex++;
                    var t = H.gs.usupport.TargetFrameRate;
                    H.gs.gstates.isBenchmarkMode && (t = 60);
                    var e = 60 / t;
                    if (this.frameIndex % e == 0 && (D.PageHelper.Instance.Update(),
                                                     D.PageHelper.Instance.IsActive)) {
                        H.gs.gstates.isBenchmarkMode && B.gameCore.benchDataFeeder.FrameUpdateProc(),
                            B.gameCore.sight.UpdateFrame();
                        var n = performance.now();
                        g.instance.UpdateCardDrawingQueue();
                        s.Maintain();
                        var i = performance.now(),
                            o = i - this.time0;
                        this.time0 = i;
                        let e = this.delta * .5;
                        this.cells.forEach(function(t) {
                            t.UpdateInterpolation(o, i + e);
                            t.UpdateGraphicsForFrame();
                            if (H.gs.uconfig.TogglePlayerTransparentCells && t.isPlayerCell) {
                                t.baseSprite.alpha = H.gs.uconfig.PlayerCellsAlpha;
                                t.baseShape.alpha = H.gs.uconfig.PlayerCellsAlpha;
                                t.overShape.fillAlpha = 0
                            } else if (!H.gs.uconfig.GlowingNonPlayerCells && (t.isFood || t.isPellet)) {
                                t.baseSprite.alpha = H.gs.uconfig.PelletCellsAlpha;
                                t.baseShape.alpha = H.gs.uconfig.PelletCellsAlpha;
                                t.overShape.fillAlpha = 0
                            } else {
                                t.baseSprite.alpha = 1;
                                t.baseShape.alpha = 1;
                                t.overShape.fillAlpha = 1
                            }
                        }),
                            this.gfs.Update(),
                            this.checkQueue_interval.Push(o),
                            this.cellsBox.sortChildren(),
                            this.UpdateStagePlacement(),
                            this.fieldGraphics.box.position.set(H.gs.gconfig.minX, H.gs.gconfig.minY);
                            this.fieldGraphics.SetScale(H.gs.gconfig.FieldSize / this.fieldGraphics.baseSize),
                            this.renderer.render(this.drawingRoot);
                        var r = performance.now() - n;
                        this.delta = (this.delta + performance.now() - i)/2;
                        this.checkQueue_duration.Push(r)
                    }
                },
                    t.prototype.UpdatePerf = function() {
                    setTimeout(this.UpdatePerf.bind(this), 500),
                        D.TimeChecker.Start("UpdatePerf");
                    var t = B.gameCore.perfModel,
                        e = this.checkQueue_duration.GetAverageValue();
                    t.avgDuration = e,
                        t.avgRate = e / 17;
                    var n = this.checkQueue_interval.GetAverageValue();
                    t.avgFps = 1e3 / n,
                        t.numCellsRendered = this.cells.size,
                        D.TimeChecker.Stop()
                },
                    t.prototype.TimeHud = function() {
                    var date = new Date();
                    const formatDate = (current_datetime)=>{
                        let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
                        return formatted_date;
                    }
                    setTimeout(this.TimeHud.bind(this), 1000);
                    $('#time-hud').text(formatDate(date));
                },
                    t.prototype.updateWaves = function() {
                    let waves = gVar.Waves
                    for (let length = waves.length - 1; length >= 0; length--) {
                        this.wave_Sprite.visible = !0
                        let r = (Date.now() - waves[length].time) / 2
                        this.wave_Sprite.position.x = waves[length].x
                        this.wave_Sprite.position.y = waves[length].y
                        this.wave_Sprite.scale.set(1+0.01*r)
                        this.wave_Sprite.alpha -= 0.0001*r/5
                        //console.log(this.wave_Sprite.alpha)
                        if (r > waves[length].wavelength) {
                            gVar.Waves.splice(length, 1);
                            this.wave_Sprite.visible = !1
                            this.wave_Sprite.alpha = 1
                        }
                    }
                },
                    t.prototype.UpdateStagePlacement = function() {
                    var t = this.stage,
                        e = B.gameCore.sight,
                        n = e.scw / 2 - e.eyeX * e.eyeScale,
                        i = e.sch / 2 - e.eyeY * e.eyeScale;
                    t.position.x = n,
                        t.position.y = i,
                        t.scale.x = e.eyeScale,
                        t.scale.y = e.eyeScale
                },
                    t.prototype.SyncNodeListToModel = function() {
                    var i = this,
                        t = B.gameCore.nodeMan,
                        o = new Set(this.cells.keys()),
                        e = new Set;
                    t.nodes.forEach(function(t) {
                        if (0 == t.cellType) {
                            B.gameCore.uMan.GetUserInfoById(t.ownerPlayerId);
                            e.add(t.ownerPlayerId)
                        }
                    }),
                        e.forEach(function(t) {
                        g.instance.GetCellCard(t, !0).Update()
                    }),
                        t.nodes.forEach(function(t) {
                        var e = t.nodeId,
                            n = i.cells.get(e);
                        n || ((n = s.Gain()).Initialize(t),
                              i.cells.set(e, n),
                              i.cellsBox.addChild(n.box)),
                            n.UpdateProps(t),
                            o.delete(e)
                    }),
                        o.forEach(function(t) {
                        var e = i.cells.get(t);
                        i.cellsBox.removeChild(e.box),
                            i.cells.delete(t),
                            e.Release()
                    })
                },
                    t
            }();
        t.GameView = n
    }(e.GameViewDomain2 || (e.GameViewDomain2 = {}))
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var S = n(0),
        i = n(4),
        o = function() {
            function t() {}
            return t.prototype.Initialize = function(t) {
                this.ctx = t.getContext("2d"),
                    this.sz = t.width,
                    i.gameCore.gameHudModel.chartDataHandlerProc = this.PostTeamRankingData.bind(this)
            },
                t.prototype.NormAngleToChartAngle = function(t) {
                var e = Math.PI;
                return .5 * -e + t * e * 2
            },
                t.prototype.PostTeamRankingData = function(t) {
                if (S.gs.uconfig.ShowLeaderboard || !S.gs.gconfig.ShowTeamRanking) {
                    var e = this.ctx,
                        n = this.sz / 2,
                        i = this.sz / 2,
                        o = Math.PI;
                    e.font = "16px Overpass, メイリオ, Arial",
                        e.fillStyle = "#CCC",
                        e.clearRect(0, 0, this.sz, this.sz),
                        e.beginPath(),
                        e.arc(n, n, i, 0, 2 * o, !1),
                        e.fill();
                    for (var r = 0, s = 0, a = t; s < a.length; s++) {
                        var l = (g = a[s]).name,
                            c = g.colorStr,
                            h = 1e-4 * g.score;
                        e.fillStyle = c,
                            e.beginPath();
                        var d = this.NormAngleToChartAngle(r),
                            u = this.NormAngleToChartAngle(r + h);
                        e.moveTo(n, n),
                            e.lineTo(n + Math.cos(d) * i, n + Math.sin(d) * i),
                            e.arc(n, n, i, d, u, !1),
                            e.lineTo(n, n),
                            e.stroke(),
                            e.fill(),
                            r += h

                    }
                    e.beginPath(),
                        e.arc(n, n, i, 0, 2 * o, !1),
                        e.stroke(),
                        r = 0;
                    for (var p = 0, f = t; p < f.length; p++) {
                        var g;
                        l = (g = f[p]).name,
                            h = 1e-4 * g.score,
                            d = this.NormAngleToChartAngle(r),
                            u = this.NormAngleToChartAngle(r + h);
                        if (h > .07) {
                            var m = (d + u) / 2,
                                y = e.measureText(l).width;
                            e.fillStyle = "black";
                            var v = .6 * i;
                            e.fillText(l, n + Math.cos(m) * v - y / 2, n + Math.sin(m) * v + 4)
                        }
                        r += h
                    }
                }
            },
                t
        }();
    e.TeamRankingChartView = o
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    const i = 100;
    const o = (new PIXI.Graphics).beginFill(16777215, 1).drawCircle(0, 0, i / 2).endFill().generateCanvasTexture(1, 2);
    const r = (new PIXI.Graphics).lineStyle(18, 16777215).drawCircle(0, 0, i / 2 - 12).generateCanvasTexture(1, 2);
    const s = (new PIXI.Graphics).beginFill(16777215, 1).drawCircle(0, 0, i / 2).endFill().lineStyle(8, 16777215).drawCircle(0, 0, i / 2 + 16).generateCanvasTexture();
    o.baseTexture.mipmap = PIXI.MIPMAP_MODES.ON,
        r.baseTexture.mipmap = PIXI.MIPMAP_MODES.ON,
        s.baseTexture.mipmap = PIXI.MIPMAP_MODES.ON,
        PIXI.Texture.addToCache(o, "MM_BASE"),
        PIXI.Texture.addToCache(r, "MM_ENEMY"),
        PIXI.Texture.addToCache(s, "MM_SELF");
    var l = n(1),
        c = n(3),
        p = n(0),
        m = n(4),
        a = n(12),
        h = n(6),
        z = p.gs.uconfig,
        _z = p,
        y = function() {
            function a() {
                this.box = new h.Container,
                    this.box2 = new h.Container,
                    this.box.addChild(this.box2),
                    this.baseShape = new h.Sprite,
                    this.baseShape.anchor.set(.5);
                this.box2.addChild(this.baseShape),
                    this.box2.alpha = 1,
                    this.nameLabel = new h.Text,
                    this.massLabel = new h.BitmapText("", {
                    fontName: "MINIMAP_MASS"
                }),
                    this.SetupLabel(this.nameLabel, 0),
                    this.box.addChild(this.nameLabel),
                    this.box.addChild(this.massLabel)
            }
            return a.Gain = function() {
                return a.pool.Gain()
            },
                a.prototype.Release = function() {
                a.pool.Release(this)
            },
                a.prototype.Initialize = function(t, e) {
                this.playerId = t;
                this.isBot = e;
                this.name = null;
                this.shortName = null;
                this.color = 0;
                this.mass = 0;
                this.x = 0;
                this.y = 0;
                this.scale = 0;
                this.x1 = 0;
                this.y1 = 0;
                this.scale1 = 0;
                this.updated = !0;
                this.isSelfNode = !0;
                this.isTeammate = !1;
                this.nameLabel.style.fill = "#FFFFFF";
                this.nameLabel.text = null;
                this.massLabel.text = this.mass;
                this.nameLabel.visible = !e
            },
                a.prototype.SetupLabel = function(t) {
                t.style.fontFamily = gVar.globalFont;
                t.style.fontSize = 13;
                t.style.fill = "#FFFFFF"
            },
                a.prototype.SetBasicProps = function(t, e, n, i) {
                if (this.nameLabel && this.name != t) {
                    var o = this.nameLabel;
                    o.text = t,
                        o.x = -o.width / 2,
                        o.y = -o.height / 2,
                        this.name = t
                }
                this.shortName = i;
                this.teamId = n;
                this.nameLabel.visible = !this.isBot && !e
            },
                a.prototype.UpdateBotDynamicProps = function(t, e) {
                var n = this.massLabel;
                n.x = n.width / 2;
                n.y = n.height / 2;
                if (this.nameLabel && this.name != e) {
                    var i = this.nameLabel;
                    i.text = e,
                        i.x = -i.width / 2,
                        i.y = -i.height / 2,
                        this.name = e
                }
                this.isBot = t,
                    this.nameLabel.visible = !this.isBot && !this.isSelfNode
            },
                a.prototype.SetVariableProps = function(t, e, n) {
                this.isTeammate = e;
                const i = p.gs.gstates;
                if (this.color != t || this.isSelfNode != n) {
                    this.isSelfNode = n;
                    this.baseShape.tint = this.color = t;
                    var o = c.ColorHelper.ColorToHtmlString(t);
                    this.nameLabel && (this.nameLabel.style.fill = o)
                }
                if (i.isSpectate && !i.isDeadSpectation) {
                    if (this.isSelfNode) {
                        this.baseShape.texture = PIXI.utils.TextureCache["MM_SELF"]
                    } else {
                        this.baseShape.texture = PIXI.utils.TextureCache["MM_BASE"]
                    }
                    this.baseShape.alpha = 1;
                    this.nameLabel.alpha = 1
                } else {
                    if (this.isSelfNode) {
                        this.baseShape.texture = PIXI.utils.TextureCache["MM_SELF"]
                    } else if (this.isTeammate || this.isBot) {
                        this.baseShape.texture = PIXI.utils.TextureCache["MM_BASE"]
                    }
                    /*else {
                                           this.baseShape.texture = PIXI.utils.TextureCache["MM_ENEMY"]
                                       }*/
                    if(!p.gs.uconfig.MapOpaque){
                        this.baseShape.alpha = !this.isBot ? this.isTeammate ? 1 : .375 : .75;
                        this.nameLabel.alpha = this.isTeammate ? 1 : .75
                    }
                    else{
                        this.baseShape.alpha = 1;
                        this.nameLabel.alpha = 1
                    }

                }
                this.box.visible = this.isBot || e || i.isSpectate && !i.isDeadSpectation || p.gs.gconfig.ShowAlwaysAllPlayersInMap || !i.isSpectate && p.gs.uconfig.MapCheat //disable map cheat
            },
                a.prototype.UpdateInterpolation = function() {
                this.x = l.Nums.EasyFilter(this.x, this.x1, .99);
                this.y = l.Nums.EasyFilter(this.y, this.y1, .99);
                this.box.x = this.x;
                this.box.y = this.y;
                this.box2.scale.x = this.scale;
                this.box2.scale.y = this.scale;
                this.scale = l.Nums.EasyFilter(this.scale, this.scale1, .99);
                if (this.nameLabel) {
                    var t = this.nameLabel;
                    t.y = -t.height - 40 * this.scale
                }
                if (this.massLabel) {
                    var t = this.massLabel;
                    const e = this.mass;
                    if (e > 5600) {
                        t.alpha = this.isTeammate ? 0 : Math.min(e / 12500 + .2, .95)
                    } else {
                        t.alpha = 0
                    }
                    t.y = -t.height / 1.5;
                    t.x = -t.width / 2
                }
            },
                a.prototype.SetPosRadius = function(t, e, n) {
                var i = a.mapCoordScale;
                t *= i,
                    e *= i;
                var o = 0 == this.mass;
                this.mass = n;
                this.box._zIndex = n;
                this.massLabel.text = (n / 100 >> 0) / 10 + "K";
                var r = c.GameHelper.MassToRadius(n);
                r *= i,
                    r *= .75;
                this.isSelfNode && r < 4 && (r = 4);
                var s = 2 * r / a.CellBaseSize;
                this.x1 = t,
                    this.y1 = e,
                    this.scale1 = s,
                    o && (this.x = t,
                          this.y = e,
                          this.scale = s,
                          this.box.x = t,
                          this.box.y = e,
                          this.box2.scale.x = s,
                          this.box2.scale.y = s)
            },
                a.mapCoordScale = .01,
                a.CellBaseSize = i,
                a.pool = new c.ObjectPool(p.gs.gconfig.MaxPlayerUnitNum, function() {
                return new a
            }),
                a
        }(),
        v = function() {
            function t() {
                this.box = new h.Container,
                    this.gr = new h.Graphics,
                    this.gr1 = new h.Graphics,
                    this.gr2 = new h.Graphics,
                    this.box.addChild(this.gr),
                    this.box.addChild(this.gr1),
                    this.box.addChild(this.gr2),
                    this.box.zIndex = 100
            }
            return t.prototype.Update = function() {
                var t = m.gameCore.sight,
                    e = this.gr,
                    _e = this.gr1,
                    _e1 = this.gr2,
                    n = y.mapCoordScale;
                if (e.clear(),_e.clear(),_e1.clear(),
                    p.gs.gstates.isRealtimeMode) {
                    var i = p.gs.ucolors.colorDefs.clGameForeground;
                    e.lineStyle(1, i);
                    e.beginFill(i);
                    _e.lineStyle(1, i);
                    _e1.lineStyle(1, i);
                    _e.beginFill(i);
                    var o = (t.eyeX - p.gs.gconfig.minX) * n,
                        r = (t.eyeY - p.gs.gconfig.minY) * n,
                        s = p.gs.gconfig.FieldSize * n;
                    _e1.alpha = .6,
                        _e1.moveTo(o, 0),
                        _e1.lineTo(o, s),
                        _e1.moveTo(0, r),
                        _e1.lineTo(s, r);
                    var a1 = t.ScreenToWorld(0, 0),
                        l1 = a1[0],
                        c1 = a1[1],
                        h1 = t.ScreenToWorld(window.innerWidth, window.innerHeight),
                        d1 = h1[0],
                        u1 = h1[1];
                    l1 *= n,
                        c1 *= n,
                        d1 *= n,
                        u1 *= n,
                        _e1.moveTo(l1, c1),
                        _e1.lineTo(d1, c1),
                        _e1.lineTo(d1, u1),
                        _e1.lineTo(l1, u1),
                        _e1.lineTo(l1, c1)
                    var a = t.ScreenToWorld(0, 0),
                         l = gVar.camMinX,
                        c = gVar.camMinY,
                        h = t.ScreenToWorld(window.innerWidth, window.innerHeight),
                        d = gVar.camMaxX,
                        u = gVar.camMaxY;
                    l *= n,
                        c *= n,
                        d *= n,
                        u *= n;
                    var _a = t.ScreenToWorld(0, 0),
                         _l = gVar.tabcamMinX,
                        _c = gVar.tabcamMinY,
                        _h = t.ScreenToWorld(window.innerWidth, window.innerHeight),
                        _d = gVar.tabcamMaxX,
                        _u = gVar.tabcamMaxY;
                    _l *= n,
                        _c *= n,
                        _d *= n,
                        _u *= n,
                        e.alpha = .3,
                        e.moveTo(l, c),
                        e.lineTo(d, c),
                        e.lineTo(d, u),
                        e.lineTo(l, u),
                        e.lineTo(l, c),
                        e.closePath(),
                        e.endFill()
                    if(!p.gs.gstates.isSpectate){
                        _e.alpha = .15,
                            _e.moveTo(_l, _c),
                            _e.lineTo(_d, _c),
                            _e.lineTo(_d, _u),
                            _e.lineTo(_l, _u),
                            _e.lineTo(_l, _c),
                            _e.closePath(),
                        _e.endFill()
                    }
                }
            },
                t
        }(),
        S = function() {
            function t() {
                this.nodes = new Map,
                    this.mapFrontScreen = new v
            }
            return t.prototype.Initialize = function(t) {
                const preWave = ()=>{
                        const e = document.createElement("canvas")
                        , t = e.getContext("2d");
                        var mt = 100
                        e.width = mt * 2,
                            e.height = mt * 2;
                        const i = t.createRadialGradient(mt, mt, mt * .75, mt, mt, mt);
                        i.addColorStop(0, "transparent"),
                            i.addColorStop(1, "white"),
                            t.fillStyle = i,
                            t.beginPath(),
                            t.arc(mt, mt, mt, 0, Math.PI * 2, !1),
                            t.fill();
                       let o = PIXI.Texture.from(e);
                        o.baseTexture.mipmap = PIXI.MIPMAP_MODES.ON;
                        PIXI.Texture.addToCache(o, "Waves_Map")
                    }
                    preWave();
                var e = this;
                this.z = p.gs.uconfig,
                    this.zz = p.gs.gconfig,
                this.uMan = m.gameCore.uMan,
                    this.sz = t.width,
                    this.px,
                    this.py;
                var n = {
                    width: t.width,
                    height: t.height,
                    view: t,
                    antialias: p.gs.uconfig.Antialias,
                    backgroundAlpha: 0,
                    resolution: p.gs.uconfig.HDMode + 1,
                    autoDensity: p.gs.uconfig.HDMode,
                    powerPreference: "high-performance"
                };
                this.renderer = h.autoDetectRenderer(n),
                    this.drawingRoot = new h.Container;
                var i = new a.FieldGraphics(!1);
                this.drawingRoot.addChild(i.box),
                    i.SetScale(this.sz / i.baseSize),
                    this.stage = new h.Container,
                    this.stage.addChild(this.mapFrontScreen.box),
                    this.drawingRoot.addChild(this.stage);
                var o = function() {
                    requestAnimationFrame(o),
                        p.gs.uconfig.ShowMap && e.FrameProc()
                    e.updateWaves()
                };
                o(),
                    m.gameCore.gameHudModel.mapDataHandlerProc = this.PostMapData.bind(this)
                this.wave_Sprite = new h.Sprite
                this.wave_Sprite.anchor.x = .5,
                    this.wave_Sprite.anchor.y = .5,
                    this.wave_Sprite.scale.set(0.1)
                    this.stage.addChild(this.wave_Sprite);
                this.wave_Sprite.texture = PIXI.utils.TextureCache["Waves_Map"]
                this.wave_Sprite.visible = !1
            },
                t.prototype.FrameProc = function() {
                c.PageHelper.Instance.IsActive && (y.mapCoordScale = this.sz / p.gs.gconfig.FieldSize,
                                                   this.mapFrontScreen.Update(),
                                                   this.nodes.forEach(function(t) {
                    return t.UpdateInterpolation()
                }),
                                                   this.renderer.render(this.drawingRoot))
            },
                t.prototype.updateWaves = function() {
                    let waves = gVar.mapWaves
                    var fs = p.gs.gconfig.FieldSize/300
                    for (let length = waves.length - 1; length >= 0; length--) {
                        this.wave_Sprite.visible = !0
                        let r = (Date.now() - waves[length].time) / 2
                        this.wave_Sprite.position.x = waves[length].x/fs
                        this.wave_Sprite.position.y = waves[length].y/fs
                        this.wave_Sprite.scale.set(0.1+0.001*r)
                        this.wave_Sprite.alpha -= 0.0001*r/5
                        if (r > waves[length].wavelength) {
                            gVar.mapWaves.splice(length, 1);
                            this.wave_Sprite.visible = !1
                            this.wave_Sprite.alpha = 1
                        }
                    }
                },
                t.prototype.isInV = function(nx,ny,mass) {
                if (nx + Math.sqrt(100*mass) < gVar.camMaxX || ny + Math.sqrt(100*mass) < gVar.camMinY || nx - Math.sqrt(100*mass) > gVar.camMaxX || ny - Math.sqrt(100*mass) > gVar.camMaxY) {
                    return false;
                }
                return true;
            }
                ,
                t.prototype.PostMapData = function(t) {
                var massCalu = 0;
                var data=[];
                var _i = this;
                t.forEach(function(e) {
                    var id = _i.uMan.GetUserInfoById(e.playerId);
                    var info = {
                        team:id.team,
                        teamId:id.teamId,
                        tripKey:id.tripKey,
                        isBot:id.isBot
                    }
                    var info2 = {
                        team:id.team,
                        teamId:id.teamId,
                        tripKey:id.tripKey
                    }
                    id.isBot ? data.push(info) : data.push(info2)
                })
                const set = new Set();
                const result = data.filter(item => !set.has(item.tripKey) || item.tripKey=='aaaa' ? set.add(item.tripKey) : false);
                const total_count = result.reduce((obj,item)=>{
                    if (item.team in obj) {
                        obj[item.team]++
                    } else {
                        obj[item.team] = 1
                    }
                    return obj
                },{})
                gVar.datas = total_count
                gVar.massList = t;
                gVar.massList.sort(function(a, b) {
                    return b.mass - a.mass;
                });
                gVar.massList.forEach(function(t) {
                    var u = _i.uMan.GetUserInfoById(t.playerId);
                    if(u.isBot){
                        massCalu += t.mass
                    }
                });
                var e = this;
                gVar.botCalu = massCalu
                this.nodes.forEach(function(t) {
                    return t.updated = !1
                });
                for (var n = 0, i = t; n < i.length; n++) {
                    var o = i[n],
                        r = o.playerId,
                        s = this.nodes.get(r);
                    if (!s) {
                        var a = this.uMan.GetUserInfoById(r);
                        if (-1 == a.clientId)
                            continue;
                        v = a.miniMapName,
                            S = a.isBot;
                        (s = y.Gain()).Initialize(r, S);
                        var l = (65534 & r) == this.uMan.selfUserId;
                        s.SetBasicProps(v, l, a.teamId, a.name),
                            this.stage.addChild(s.box),
                            this.nodes.set(r, s)
                    }
                    var c = this.uMan.GetTeamInfoForUser(r),
                        h = c == this.uMan.selfTeamInfo,
                        d = r == m.gameCore.nodeMan.activeSelfPlayerId;
                    s.SetVariableProps(c.color, h, d),
                        s.SetPosRadius(o.nx, o.ny, o.mass),
                        s.updated = !0;
                    if (o.playerId == this.uMan.selfUserId) {this.px = o.nx,this.py = o.ny}
                    var mapsize = this.zz.FieldSize / 5;
                    var ptext = ["A", "B", "C", "D", "E", "X"];
                    if (o.playerId == gVar.conn1.id||o.playerId == gVar.conn1.id+1) {
                        var pos1 = "" + ptext[Math.floor(o.ny / mapsize)] + (Math.floor(o.nx / mapsize) + 1);
                        $("#pos1").text(pos1)
                    }
                    if (o.playerId == gVar.conn2.id||o.playerId == gVar.conn2.id+1) {
                        var pos2 = "" + ptext[Math.floor(o.ny / mapsize)] + (Math.floor(o.nx / mapsize) + 1);
                        $("#pos2").text(pos2)
                    }
                    if (o.playerId == this.uMan.selfUserId) {this.px = o.nx,this.py = o.ny}
                    var u = this.uMan.GetUserInfoById(r);
                    if (-1 != u.clientId) {
                        var p = u.miniMapName,
                            f = u.isBot;
                        s.name == p && s.isBot == f || s.UpdateBotDynamicProps(f, p)
                    }
                }
                if(z.TopTab1Sight){
                    for(var k=0; k<gVar.massList.length;k++){
                        var dep = Math.sqrt(Math.pow((gVar.massList[k].nx - this.px), 2) + Math.pow((gVar.massList[k].ny- this.py), 2));
                        if(this.uMan.GetTeamInfoForUser(gVar.massList[k].playerId).teamId != this.uMan.selfTeamInfo.teamId){
                            if(!this.isInV(gVar.massList[k].nx,gVar.massList[k].ny,gVar.massList[k].mass)&&(dep<gVar.camMaxX-gVar.camMinX && dep>gVar.camMaxY-gVar.camMinY)) {
                                if(!gVar.useBot && gVar.conn1.isAlive && !_z.gs.gstates.isSpectate && !gVar.mapSelect){
                                m.gameCore.conn.SendSpecifySpecTarget(gVar.massList[k].playerId,2)//,
                                    //m.gameCore.gameHudModel.specTargetName = this.uMan.GetUserInfoById(gVar.massList[k].playerId).name
                                    //m.gameCore.gameHudModel.SetSpecTargetScore(gVar.massList[k].mass)
                                }
                                break
                            }
                        }
                    }
                }
                var g = new Array;
                this.nodes.forEach(function(t) {
                    return !t.updated && g.push(t)
                }),
                    g.forEach(function(t) {
                    e.stage.removeChild(t.box),
                        e.nodes.delete(t.playerId),
                        t.Release()
                });
                e.stage.sortChildren()
            },
                t
        }();
    e.MapView = S
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var o = n(0),
        r = n(3),
        i = n(2),
        s = n(4),
        a = function() {
            return function(t, e, n, i, s ,k) {
                this.senderName = t,
                    this.message = e,
                    this.timeStamp = n,
                    this.nameColor = i,
                    this.skinUrl = s,
                    this.tripKey = k
            }
        }();
    e.ChatMessage = a;
    var l = function() {
        function t(t) {
            this.text = "",
                this.color = "",
                this.score = "",
                this.active = !1,
                this.index = t
        }
        return t.prototype.setData = function(t, e, n, k) {
            this.text = t,
                this.color = e,
                this.score = n,
                this.active = !0,
                this.trip = k
        },
            t.prototype.setNoData = function() {
            this.active = !1
        },
            t
    }();
    e.LeaderboardEntry = l;
    var c = function() {
        function t() {
            this.leaderboardEntries = [],
                this.teamRankingEntries = [],
                this.chatMessages = [],
                this.selfScore = 0,
                this.maxScore = 0,
                this.leaderboardHeaderText = "",
                this.cp=0,
                this.mp=0,
                this.rp=0,
                this.sp=0,
                this.p=0
        }
        return t.prototype.insertStubChatMessages = function() {
            for (var t = 0; t < 2; t++)
                this.PostChatMessage("テスト" + t, "テスト", "0:00", null)
        },
            t.prototype.insertStubData = function() {},
            t.prototype.Initialize = function() {
            this.leaderboardHeaderText = "SenpaiMod+";//i.AppConfigurator.instance.leaderboardHeaderText;
            for (var t = 0; t < 10; t++) {
                (e = new l(t)).setNoData(),
                    this.leaderboardEntries.push(e)
            }
            for (t = 0; t < 4; t++) {
                var e;
                (e = new l(t)).setNoData(),
                    this.teamRankingEntries.push(e)
            }
            this.insertStubData()
        },
            t.prototype.SetAimPlayerClient = function(t) {
            if (this.specTargetUserId != t && this.specTargetUserId!=gVar.conn1.id && this.specTargetUserId!=gVar.conn1.id+1 && this.specTargetUserId!=gVar.conn2.id && this.specTargetUserId!=gVar.conn2.id+1) {
                if (this.specTargetUserId = t,
                    t >= 0 && t != s.gameCore.uMan.selfUserId) {
                    var e = s.gameCore.uMan.GetUserInfoById(t);
                    this.specTargetName = e.fullName
                } else
                    this.specTargetName = null;
                this.isHudUpdated = !0
            }
        },
            t.prototype.SetSpecTargetScore = function(t) {
            this.specTargetScore = t,
                this.isHudUpdated = !0
        },
            t.prototype.PostServerStatusData = function(t) {
            r.PageHelper.Instance.IsActive && (this.serverStatusText = t.split(/\r?\n/)[2].split(":")[1].split(/\r?\n/),
                                               this.isHudUpdated = !0)
        },
            t.prototype.PostLatencyData = function(t) {
            this.latencyMs = t,
                this.isHudUpdated = !0
        },
            t.prototype.PostServerUserNumData = function(t, e, n, i) {
            this.cp = (t+e),
                this.mp = i,
                this.rp = n,
                this.sp = e,
                this.p = t
            //this.serverUserNumText = o,
                this.isHudUpdated = !0
        },
            t.prototype.PostLeaderboardData = function(t) {
            if (r.PageHelper.Instance.IsActive && o.gs.uconfig.ShowLeaderboard) {
                for (var e = 0; e < this.leaderboardEntries.length; e++) {
                    var n = this.leaderboardEntries[e];
                    if (e < t.length) {
                        var i = t[e];
                        n.setData(i.name, i.colorStr, (.001 * i.score).toFixed(1) + "k",i.trip)
                    } else
                        n.setNoData()
                }
                this.isHudUpdated = !0
            }
        },
            t.prototype.PostTeamRankingData = function(t) {
            if (r.PageHelper.Instance.IsActive) {
                if (o.gs.uconfig.ShowLeaderboard) {
                    for (var e = 0; e < this.teamRankingEntries.length; e++) {
                        var n = this.teamRankingEntries[e];
                        if (e < t.length) {
                            var i = t[e];
                            var temp
                            if(i.name == "BOT"){
                                 temp = gVar.datas[i.name] ?? 0
                                 n.setData(i.name, i.colorStr,(.001 * gVar.botCalu).toFixed(1) + "k",temp)
                            }else{
                                switch(i.name){
                                    case "【先輩】":
                                        var num=12;
                                        temp = gVar.datas[i.name] ?? 0;
                                        (gVar.currentCount > 20) && (num = num+parseInt((gVar.currentCount-20)/5));
                                        n.setData(i.name, i.colorStr, (.01 * i.score).toFixed(1) + "%",temp+"/"+num )
                                        break;
                                    case "【紅】":
                                        temp = gVar.datas[i.name] ?? 0
                                        n.setData(i.name, i.colorStr, (.01 * i.score).toFixed(1) + "%",temp+"/10")
                                        break;
                                    case "【敵】":
                                        temp = gVar.datas[i.name] ?? 0
                                        n.setData(i.name, i.colorStr, (.01 * i.score).toFixed(1) + "%",temp+"/10")
                                        break;
                                    case "【白】":
                                        temp = gVar.datas[i.name] ?? 0
                                        n.setData(i.name, i.colorStr, (.01 * i.score).toFixed(1) + "%",temp+"/10")
                                        break;
                                    default:
                                        temp = gVar.datas[i.name] ?? 0
                                        n.setData(i.name, i.colorStr, (.01 * i.score).toFixed(1) + "%",temp+"/8")
                                        break;
                                }
                            }
                        } else
                            n.setNoData()
                    }
                    this.isHudUpdated = !0
                }
                this.chartDataHandlerProc(t)
            }
        },
            t.prototype.PostMapData = function(t) {
            o.gs.uconfig.ShowMap && this.mapDataHandlerProc(t)
        },
            t.prototype.ClearChatMessages = function() {
            this.chatMessages = [],
                this.isHudUpdated = !0
        },
            t.prototype.PostChatMessage = function(t, e, n, i ,s ,k) {
            i || (i = "#0CF");
            var o = new a(e, n, t, i ,s ,k);
            this.chatMessages.push(o),
                this.isHudUpdated = !0
        },
            t.prototype.PostServerDisplayMessage = function(t) {
            this.serverDisplayMessageText = t,
                this.isHudUpdated = !0
        },
            t.prototype.PostServerInstructionText = function(t) {
            this.serverInstructionProc(t)
        },
            t.prototype.ResetMaxScore = function() {
            this.maxScore = 0,
                this.selfScore = 0
        },
            t.prototype.PostSelfScoreData = function(t) {
            this.selfScore = t,
                this.maxScore = Math.max(this.maxScore, t),
                this.isHudUpdated = !0
        },
            t.prototype.SetSplitNum = function(t,e) {
            this.splitNum = t,
                this.tabsplitNum = e,
                this.isHudUpdated = !0
        },
            t
    }();
    e.GameHudModel = c
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = n(2),
        o = n(3),
        r = n(0),
        s = function() {
            return function() {}
        }();
    e.ServerInfo = s;
    var a = function() {
        function t(t) {
            this.gameCore = t;
            var e = o.AppHelper.GetQueryObject();
            this.showAll = 1 == e.showall
        }
        return t.prototype.Start = function() {
            this.langCode = navigator.language.slice(0, 2),
                this.UpdateList()
        },
            t.prototype.ConnectToServer = function(t) {
            if (Date.now() - r.gs.gstates.playerDeadTimeStamp < 2e3)
                console.log("server selection cancelled");
            else {
                var e = t.address;
                this.currentServerUri = e,
                    localStorage.setItem("connTargetUri", e);
                var n = t.modName;
                this.gameCore.ConnectToGameServerEx("ws://" + e, n)
            }
        },
            t.prototype.FilterServers = function(t) {
            var e = this;
            if (t.forEach(function(t) {
                t.modName = t.name,
                    t.numClients = t.numPlayers + t.numSpectors,
                    t.order += t.mirrorIndex,
                    -1 != t.mirrorIndex && (t.modName += t.mirrorIndex),
                    t.langCode && e.langCode != t.langCode && (t.visible = !1)
            }),
                !this.showAll) {
                for (var n = {}, i = 0, o = t; i < o.length; i++) {
                    n[(a = o[i]).name + a.mirrorIndex] = a
                }
                for (var r = 0, s = t; r < s.length; r++) {
                    var a, l = a = s[r],
                        c = n[a.name + (a.mirrorIndex - 1)];
                    if (c)
                        c.numClients > c.numMaxClients - 25 || l.numClients > 10 || (l.visible = !1)
                }
            }
            return t.filter(function(t) {
                return t.visible
            }).sort(function(t, e) {
                return t.order - e.order
            })
        },
            t.prototype.UpdateList = function() {
            var s = this,
                t = i.AppConfigurator.instance.trackerServerUri,
                e = i.AppConfigurator.instance.trackerServerTargetSite;
            $.ajax({
                type: "GET",
                url: t + "/list",
                data: {
                    targetSite: e
                },
                success: function(t) {
                    if (s.serverInfos = s.FilterServers(t),
                        null == s.currentServerUri && s.serverInfos.length > 0) {
                        var e = localStorage.getItem("connTargetUri"),
                            n = null;
                        if (e)
                            for (var i = 0, o = s.serverInfos; i < o.length; i++) {
                                var r = o[i];
                                if (r.address == e) {
                                    n = r;
                                    break
                                }
                            }
                        n || (n = s.serverInfos[0]),
                            s.ConnectToServer(n)
                    }
                    s.Notify()
                }
            }),
                setTimeout(this.UpdateList.bind(this), 5e3)
        },
            t
    }();
    e.ServerListModel = a
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var o = n(1),
        r = n(0),
        s = n(3),
        i = function() {
            function i() {}
            return i.AllocatePool = function() {
                null == this.pool && (this.pool = new s.ObjectPool(1e3, function() {
                    return new i
                }))
            },
                i.prototype.Initialize = function(t) {
                this.nodeId = i.seqId++,
                    this.ownerPlayerId = t;
                this.counter = 0;
                var e = r.gs.gconfig.FieldSize;
                this.x = o.Nums.RandF() * e,
                    this.y = o.Nums.RandF() * e;
                var n = o.Nums.RandF();
                this.mass = o.Nums.MapTo(n * n * n, 500, 22500) >> 0,
                    this.color = s.GameHelper.GenarateRandomColor(),
                    this.m_angle = o.Nums.RandF() * Math.PI * 2,
                    this.speed = o.Nums.MapTo(o.Nums.RandF(), 20, 80),
                    this.nr = s.GameHelper.MassToRadius(this.mass)
            },
                i.prototype.Update = function() {
                this.x += Math.cos(this.m_angle) * this.speed,
                    this.y += Math.sin(this.m_angle) * this.speed;
                if (this.counter++ % 4 == 0) {
                    this.mass += Math.random() * 100 - 50;
                    this.mass = Math.max(Math.min(this.mass >> 0, 22500), 500)
                }
                var t = 1.1 * this.nr,
                    e = r.gs.gconfig.FieldSize;
                let _n = r.gs.gconfig.minX;
                let _i = r.gs.gconfig.minY;
                o.Nums.InRange(this.x - _n, t, e - t) || (this.m_angle = Math.PI - this.m_angle),
                    o.Nums.InRange(this.y - _i, t, e - t) || (this.m_angle = -this.m_angle)
            },
                i.seqId = 0,
                i
        }(),
        a = function() {
            function t(t) {
                this.nodes = [],
                    this.tick = 0,
                    this.gameCore = t
            }
            return t.prototype.Start = function() {
                this.playerIds = this.gameCore.uMan.GetPlayerIdsAvailable(),
                    i.AllocatePool(),
                    this.averageFps = 60,
                    this.t0 = performance.now();
                for (var t = 0; t < 700; t++)
                    ;
            },
                t.prototype.AddNode = function() {
                var t = o.Nums.RandI(this.playerIds.length),
                    e = this.playerIds[t],
                    n = i.pool.Gain();
                n.Initialize(e),
                    this.nodes.push(n)
            },
                t.prototype.RemoveNode = function() {
                var t = this.nodes.shift();
                t && (i.pool.Release(t),
                      this.gameCore.nodeMan.PostNodeRemoval(t.nodeId))
            },
                t.prototype.ClearNodes = function() {
                for (var t = 0, e = this.nodes; t < e.length; t++) {
                    var n = e[t];
                    i.pool.Release(n),
                        this.gameCore.nodeMan.PostNodeRemoval(n.nodeId)
                }
                this.nodes = []
            },
                t.prototype.FrameUpdateProc = function() {
                var t = performance.now(),
                    e = 1e3 / (t - this.t0);
                this.t0 = t,
                    this.averageFps = o.Nums.EasyFilter(this.averageFps, e, .95),
                    this.tick++,
                    this.tick % 2 == 0 && (this.averageFps > 55 ? this.AddNode() : this.RemoveNode());
                var n = this.gameCore.nodeMan;
                this.nodes.forEach(function(t) {
                    t.Update(),
                        n.PostNodeData(t.nodeId, 0, t.x, t.y, t.mass, t.ownerPlayerId, t.color, t.m_angle, t.speed)
                }),
                    n.SyncGameViewToModel()
            },
                t.prototype.Stop = function() {
                this.ClearNodes()
            },
                t
        }();
    e.PerfBenchDataFeeder = a
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = function() {
        function o(t) {
            this.ar = new Array,
                t && (t instanceof Array ? this.AddRange(t) : this.Add(t))
        }
        return Object.defineProperty(o.prototype, "array", {
            get: function() {
                return this.ar
            },
            enumerable: !0,
            configurable: !0
        }),
            o.prototype.Count = function(e) {
            if (e) {
                var n = 0;
                return this.ar.forEach(function(t) {
                    e(t) && n++
                }),
                    n
            }
            return this.ar.length
        },
            o.prototype.Add = function(t) {
            this.ar.push(t)
        },
            o.prototype.AddUnique = function(t) {
            this.Contains(t) || this.ar.push(t)
        },
            o.prototype.AddRange = function(t) {
            var e;
            (e = this.ar).push.apply(e, t)
        },
            o.prototype.Clear = function() {
            this.ar.splice(0, this.ar.length)
        },
            o.prototype.RemoveAt = function(t) {
            this.ar.splice(t, 1)
        },
            o.prototype.Remove = function(t) {
            var e = this.ar.indexOf(t);
            e >= 0 && this.ar.splice(e, 1)
        },
            o.prototype.RemoveAll = function(e) {
            var n = this;
            this.ar.filter(function(t) {
                return e(t)
            }).forEach(function(t) {
                return n.Remove(t)
            })
        },
            o.prototype.Contains = function(t) {
            return this.ar.indexOf(t) >= 0
        },
            o.prototype.First = function(t) {
            return 0 == this.ar.length ? null : t ? this.ar.filter(t)[0] : this.ar[0]
        },
            o.prototype.FirstOrDefault = function(t, e) {
            return 0 == this.ar.length ? e : t ? this.ar.filter(t)[0] : this.ar[0]
        },
            o.prototype.Product = function(e) {
            return new o(this.ar.filter(function(t) {
                return e.Contains(t)
            }))
        },
            o.prototype.Except = function(t) {
            return new o(this.ar.filter(function(e) {
                return t.ar.every(function(t) {
                    return e != t
                })
            }))
        },
            o.prototype.Concat = function(t) {
            return new o(this.ar.concat(t.ar))
        },
            o.prototype.Distinct = function() {
            var e = new o;
            return this.ar.forEach(function(t) {
                e.Contains(t) || e.Add(t)
            }),
                e
        },
            o.prototype.Union = function(t) {
            var e = this.ToList();
            return t.ar.forEach(function(t) {
                e.Contains(t) || e.Add(t)
            }),
                e
        },
            o.prototype.ForEach = function(t) {
            for (var e = 0; e < this.ar.length; e++)
                t(this.ar[e])
        },
            o.prototype.Where = function(t) {
            return new o(this.ar.filter(t))
        },
            o.prototype.Select = function(t) {
            return new o(this.ar.map(t))
        },
            o.prototype.LimitCount = function(t) {
            return t < this.ar.length ? new o(this.ar.slice(0, t)) : this
        },
            o.prototype.Sort = function(t) {
            return new o(this.ar.sort(t))
        },
            o.prototype.GroupBy = function(n) {
            var i = {};
            this.ar.forEach(function(t) {
                var e = n(t);
                i[e] || (i[e] = new o),
                    i[e].Add(t)
            });
            var t = new o;
            for (var e in i)
                t.ar.push(i[e]);
            return t
        },
            o.prototype.Take = function(t) {
            return new o(t > 0 ? this.ar.slice(0, t) : this.ar.slice(t))
        },
            o.prototype.TakeNFromTail = function(t) {
            return new o(this.ar.slice(-t))
        },
            o.prototype.Skip = function(t) {
            return t > this.ar.length ? new o : new o(this.ar.slice(t))
        },
            o.prototype.All = function(t) {
            for (var e = 0, n = this.ar; e < n.length; e++) {
                if (!t(n[e]))
                    return !1
            }
            return !0
        },
            o.prototype.Any = function(t) {
            for (var e = 0, n = this.ar; e < n.length; e++) {
                if (t(n[e]))
                    return !0
            }
            return !1
        },
            o.prototype.ToArray = function() {
            return this.ar.slice(0)
        },
            o.prototype.ToList = function() {
            return new o(this.ar.slice(0))
        },
            o.prototype.Min = function(t) {
            var e = t ? this.ar.map(t) : this;
            return Math.min.apply(Math, e)
        },
            o.prototype.Max = function(t) {
            var e = t ? this.ar.map(t) : this;
            return Math.max.apply(Math, e)
        },
            o.prototype.Sum = function(t) {
            return 0 == this.Count() ? 0 : (t ? this.ar.map(t) : this).reduce(function(t, e) {
                return t + e
            })
        },
            o.prototype.SafeSum = function(t) {
            return this.Sum(t)
        },
            o.prototype.Average = function(t) {
            return 0 == this.Count() ? 0 : this.Sum(t) / this.ar.length
        },
            o.prototype.OrderBy = function(n) {
            var t = this.ar.slice(0);
            return t.sort(function(t, e) {
                return n(t) - n(e)
            }),
                new o(t)
        },
            o.prototype.OrderByDescending = function(n) {
            var t = this.ar.slice(0);
            return t.sort(function(t, e) {
                return n(e) - n(t)
            }),
                new o(t)
        },
            o.prototype.SelectMany = function(n) {
            var i = new o;
            return this.ar.forEach(function(t) {
                var e = n(t);
                i.AddRange(e.ar)
            }),
                i
        },
            o.prototype.IndicesOf = function(t) {
            for (var e = [], n = 0; n < this.ar.length; n++)
                this.ar[n] == t && e.push(n);
            return new o(e)
        },
            o.prototype.SafeTake = function(t) {
            return this.Take(Math.min(t, this.ar.length))
        },
            o.prototype.Reverse = function() {
            return new o(this.ar.reverse())
        },
            o.prototype.Shift = function() {
            return this.ar.shift()
        },
            o
    }();
    e.List = i
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var l = n(2),
        i = n(32),
        c = n(1),
        o = n(3),
        r = new(function() {
            return function() {
                this.ChatAppCoreVersion = "ChatAppCore B100",
                    this.MessageMaxLength = 140,
                    this.ProfileCommentMaxLength = 60
            }
        }());
    var s = function() {
        return function() {
            this.Sessions = "Session",
                this.TeamMembers = "Team Members",
                this.AllUsers = "All Users",
                this.Online = "Online",
                this.Offline = "Offline",
                this.Advertisement = "AD",
                this.Name = "Name",
                this.Skin = "Skin",
                this.Comment = "Comment",
                this.ShowTripKey = "Show Trip Key",
                this.Blocked = "Blocked",
                this.BlockedMessageNotification = "You are blocked by the peer. This message has not been sent.",
                this.DeleteMessage = "Delete Message",
                this.BlockUnblock = "Block/Unblock",
                this.AppInstruction0 = "An advanced chat system designed for agar private servers. There are server-wide chat, team-specific chat, and private chat between two users. Server administator has no concern in private chat.",
                this.AppInstruction1 = "Name and skin url are set on the main game window. Either server-wide chat or team-specific chat is synchronized to the chat on game screen (depends on the setting of game server)."
        }
    }(),
        a = function() {
            return function() {
                this.Sessions = "セッション",
                    this.TeamMembers = "チームメンバー",
                    this.AllUsers = "すべてのユーザー",
                    this.Online = "オンライン",
                    this.Offline = "オフライン",
                    this.Advertisement = "広告",
                    this.Name = "名前",
                    this.Skin = "スキン",
                    this.Comment = "コメント",
                    this.ShowTripKey = "トリップキーを表示",
                    this.Blocked = "ブロック中",
                    this.BlockedMessageNotification = "ブロックされています。この発言は相手に届いていません。",
                    this.DeleteMessage = "メッセージを削除",
                    this.BlockUnblock = "ブロック/解除",
                    this.AppInstruction0 = "agarのプライベートサーバ向けに設計されたチャットシステムです。サーバ全体での会話,チーム毎の会話,ユーザ間での個別の会話があります。サーバ管理者はユーザ同士の個別の会話の内容には関知しません。",
                    this.AppInstruction1 = "名前とスキンURLはゲーム画面で設定したものが使われます。全体の会話またはチームの会話がゲーム内でのチャットと同期しています(ゲームサーバの設定により異なります)。"
            }
        }(),
        h = navigator.language.startsWith("ja") ? new a : new s,
        d = n(0).gs.uconfig,
        chunk = (ip, num) => {
            let ret = [];
            for (let i = 0, j = ip.length; i < j; i += num) {
                ret.push(ip.slice(i, i + num));
            }
            return ret;
        },
        decryptIp = (ipTrip) => {
            let binary = ipTrip.split("").map(e => GENERAL_CHARS.indexOf(e).toString(2).padStart(6, "0")).join("").slice(4);
            return chunk(binary, 8).map(e => parseInt(e, 2).toString()).join(".");
        },
        u = function() {
            function t(t) {
                this.userId = t
            }
            return Object.defineProperty(t.prototype, "FullName", {
                get: function() {
                    return d.ShowUnichatTripKey ? this.name + "(" + this.fullTrip.split("#")[0].substr(2, 4) + ")" : this.team + this.name
                },
                enumerable: !0,
                configurable: !0
            }),
                Object.defineProperty(t.prototype, "GameFullName", {
                get: function() {
                    return "" + this.team + this.name
                },
                enumerable: !0,
                configurable: !0
            }),
                Object.defineProperty(t.prototype, "ChatName", {
                get: function() {
                    return "" + this.name
                },
                enumerable: !0,
                configurable: !0
            }),
                Object.defineProperty(t.prototype, "ChatTrip", {
                get: function() {
                    return "(" + this.fullTrip.split("#")[0].substr(2, 4) + ")"
                },
                enumerable: !0,
                configurable: !0
            }),
                Object.defineProperty(t.prototype, "ChatFullName", {
                get: function() {
                    return d.ShowUnichatTripKey ?
                        this.team + this.name + "(" + this.fullTrip.split("#")[0].substr(2, 4) + ")" :
                    this.team + this.name
                },
                enumerable: !0,
                configurable: !0
            }),
                Object.defineProperty(t.prototype, "showTripKey", {
                get: function() {
                    return d.ShowUnichatTripKey ? true : this._showTripKey
                },
                enumerable: true,
                configurable: true
            }),
                t.prototype.SetProps = function(t) {
                this.siteSig = t.siteSig,
                    this.serverSig = t.serverSig,
                    this.name = t.name,
                    this.team = t.team,
                    this.code = t.code,
                    this.skinUrl = t.skinUrl,
                    this.skinUrlSmall = t.skinUrlSmall,
                    this.fullTrip = t.fullTrip;
                const e = t.fullTrip.split("#");
                const n = e[0];
                const i = e[1];
                const visibility = t.showTripKey ? "Public" : "Private";
                this.shortTrip = n + "|" + i + "|" + decryptIp(n) + "|" + visibility,
                    "" == this.skinUrl && (this.skinUrl = "gr/noimage.gif"),
                    "" == this.skinUrlSmall && (this.skinUrlSmall = "gr/noimage.gif"),
                    this.profileComment = t.profileComment,
                    this._showTripKey = t.showTripKey,
                    this.isPlaying = t.isPlaying,
                    this.serverRoomSig = this.siteSig + "." + this.serverSig,
                    this.teamRoomSig = this.siteSig + "." + this.serverSig + "." + this.team + "." + this.code
            },
                t
        }();
    e.ChatUser = u;
    var p = function() {
        function e(t, e, n) {
            this.text = e,
                this.messageId = n,
                t && (this.icon = t.skinUrlSmall,
                      this.userId = t.userId,
                      this.userName = t.GameFullName,
                      this.timeStamp = c.DateTimeHelper.GetHourMinutesString())
        }
        return e.prototype.MakeCopy = function() {
            var t = new e(null, "", 0);
            return t.icon = this.icon,
                t.text = this.text,
                t.messageId = this.messageId,
                t.userId = this.userId,
                t.userName = this.userName,
                t.timeStamp = this.timeStamp,
                t
        },
            e
    }(),
        f = function() {
            function t(t) {
                this.sessionId = t,
                    this.messages = new i.List,
                    this.isClosed = !1
            }
            return Object.defineProperty(t.prototype, "IsGroup", {
                get: function() {
                    return 20 != this.category
                },
                enumerable: !0,
                configurable: !0
            }),
                Object.defineProperty(t.prototype, "IsPrivate", {
                get: function() {
                    return 20 == this.category
                },
                enumerable: !0,
                configurable: !0
            }),
                Object.defineProperty(t.prototype, "HeaderName", {
                get: function() {
                    return 12 == this.category && "" == this.title ? "no-tag" : this.IsGroup ? this.title : this.peer.GameFullName
                },
                enumerable: !0,
                configurable: !0
            }),
                Object.defineProperty(t.prototype, "HeaderIcon", {
                get: function() {
                    return 20 == this.category ? this.peer.skinUrl : 12 == this.category ? "gr/team5a.png" : 11 == this.category ? "gr/web1b.png" : void 0
                },
                enumerable: !0,
                configurable: !0
            }),
                t.prototype.InitAsGroupSession = function(t, e, n) {
                this.category = t,
                    this.roomSig = e,
                    this.title = n,
                    this.peer = null
            },
                t.prototype.InitAsPrivateSession = function(t) {
                this.category = 20,
                    this.roomSig = "",
                    this.title = "",
                    this.peer = t
            },
                t.prototype.AddMessage = function(t) {
                this.messages.Add(t),
                    this.reqScroll = !0
            },
                t.prototype.RemoveMessage = function(e, t) {
                var n = this.messages.First(function(t) {
                    return t.messageId == e
                });
                if (n && (this.messages.Remove(n),
                          t)) {
                    var i = n.MakeCopy();
                    i.text = h.BlockedMessageNotification,
                        this.messages.Add(i)
                }
            },
                t
        }(),
        g = function() {
            function t() {
                this.siteSig = "",
                    this.serverSig = "",
                    this.name = "",
                    this.team = "",
                    this.code = "",
                    this.skinUrl = "",
                    this.envSig = "",
                    this.profileComment = "",
                    this.showTripKey = !1
            }
            return t.prototype.GetSequentialSignature = function() {
                return this.siteSig + "_" + this.serverSig + "_" + this.name + "_" + this.team + "_" + this.code + "_" + this.skinUrl + "_" + this.profileComment + "_" + this.showTripKey + "_" + this.envSig
            },
                t
        }(),
        m = (function() {}(),
             function() {}(),
             function() {}(),
             function() {}(),
             function() {
            function t(t) {
                this.receiver = t
            }
            return Object.defineProperty(t.prototype, "IsConnected", {
                get: function() {
                    return null != this.ws
                },
                enumerable: !0,
                configurable: !0
            }),
                t.prototype.SendPacket = function(t) {
                this.ws && this.ws.readyState == WebSocket.OPEN && this.ws.send(t)
            },
                t.prototype.ConnectToChatServer = function() {
                console.log("connecting to chat server")
                    this.ws = new WebSocket(r.ChatServerUri),
                    this.ws.onmessage = this.OnWsMessage.bind(this),
                    this.ws.onopen = this.OnWsOpen.bind(this),
                    this.ws.onerror = this.OnWsError.bind(this),
                    this.ws.onclose = this.OnWsClose.bind(this)
            },
                t.prototype.Close = function() {
                (this.ws && (this.ws.close(),
                             this.ws = null))

            },
                t.prototype.OnWsOpen = function() {
                this.SendPacket(JSON.stringify({
                    op: "JoinToServer"
                }))
            },
                t.prototype.OnWsClose = function(t) {
                t.reason && console.log("connection to chat server closed: " + t.reason),
                    this.receiver.SetAvailability(!1),
                    this.receiver.FireChanged()
            },
                t.prototype.OnWsError = function(t) {
                console.log(t)
            },
                t.prototype.OnWsMessage = function(t) {
                o.TimeChecker.Start("OnWsMessage@ExChatAppModel");
                var e = JSON.parse(t.data),
                    n = e.op;
                "SelfUserId" == n ? (this.selfUserId = e.userId,
                                     this.selfUserId,
                                     this.pendingUserInfo && (this.SendSelfEntryInfoCore(this.pendingUserInfo),
                                                              this.pendingUserInfo = null),
                                     this.receiver.SetAvailability(!0)) : "UpdateUserInfos" == n ? this.receiver.UserInfosUpdated(e.infos) : "UpdateFixedGroupSessions" == n ? this.receiver.UpdateFixedGroupSessionInfos(e.infos) : "UpdatePrivateSession" == n ? this.receiver.UpdatePrivateSessionInfo(e.info) : "ChatMessage" == n ? this.receiver.HandleReceivedMessage(e.data) : "MessageRemoval" == n && this.receiver.HandleMessageRemoval(e.data),
                    this.receiver.FireChanged(),
                    o.TimeChecker.Stop()
            },
                t.prototype.SendSelfEntryInfoCore = function(t) {

                var e = JSON.stringify({
                    op: "UpdateUserInfo",
                    userId: this.selfUserId,
                    data: t
                });
                this.SendPacket(e)
            },
                t.prototype.SendSelfEntryInfo = function(t, e) {
                this.ws ? this.SendSelfEntryInfoCore(t) : (this.pendingUserInfo = t,
                                                           e && this.ConnectToChatServer())
            },
                t.prototype.RequestStartNewPrivateSession = function(t) {
                this.SendPacket(JSON.stringify({
                    op: "NewPrivateSession",
                    userId: this.selfUserId,
                    peerUserId: t
                }))
            },
                t.prototype.SendChatMessage = function(t, e) {
                var n = r.MessageMaxLength;
                e.length > n && (e = e.substr(0, n));
                var i = {
                    sessionId: t,
                    userId: this.selfUserId,
                    text: e
                };
                this.SendPacket(JSON.stringify({
                    op: "ChatMessage",
                    userId: this.selfUserId,
                    data: i
                })),
                    this.selfUserId
            },
                t.prototype.SendMessageRemoval = function(t, e, n) {
                var i = {
                    sessionId: t,
                    messageId: e,
                    isBlocked: n
                };
                this.SendPacket(JSON.stringify({
                    op: "MessageRemoval",
                    userId: this.selfUserId,
                    data: i
                }))
            },
                t
        }()),
        y = function() {
            return function() {
                this.profileComment = "",
                    this.showTripKey = !1
            }
        }(),
        v = function() {
            function t() {}
            return t.prototype.Init = function() {
                var t = l.AppConfigurator.instance.MaxProfileNum;
                this.profileExData = Array(t);
                for (var e = 0; e < t; e++)
                    this.profileExData[e] = new y;
                var n = localStorage.getItem("profileExData");
                if (n) {
                    var i = JSON.parse(n);
                    if (i && i.length > 0)
                        for (var o = Math.min(t, i.length), r = 0; r < o; r++)
                            c.Objects.CopyObjectProps(this.profileExData[r], i[r])
                } else
                    this.SaveProfileExData();
                var s = localStorage.getItem("isUserActive");
                s ? (this.isUserActive = "1" == s,
                     this.SaveIsActive()) : this.isUserActive = !0;
                var a = localStorage.getItem("blockedUserTrips");
                a ? this.blockedUserTrips = JSON.parse(a) : (this.blockedUserTrips = [],
                                                             this.SaveBlockedUserTrips())
            },
                t.prototype.SaveProfileExData = function() {
                var t = JSON.stringify(this.profileExData);
                localStorage.setItem("profileExData", t)
            },
                t.prototype.SaveIsActive = function() {
                localStorage.setItem("isUserActive", this.isUserActive ? "1" : "0")
            },
                t.prototype.SaveBlockedUserTrips = function() {
                var t = JSON.stringify(this.blockedUserTrips);
                localStorage.setItem("blockedUserTrips", t)
            },
                t.prototype.SetUserBlockState = function(t, e) {
                if (e && -1 == this.blockedUserTrips.indexOf(t))
                    this.blockedUserTrips.push(t),
                        this.SaveBlockedUserTrips();
                else if (!e && this.blockedUserTrips.indexOf(t) >= 0) {
                    var n = this.blockedUserTrips.indexOf(t);
                    this.blockedUserTrips.splice(n, 1),
                        this.SaveBlockedUserTrips()
                }
            },
                t
        }(),
        S = function() {
            function t() {
                this.entryInfo = new g,
                    this.entrySeqSig = "",
                    this.allUsers = new i.List,
                    this.allSessions = new i.List,
                    this.tmpSession = new f(0),
                    this.sessionInitialMessage = null,
                    this.loadedProfileIndex = 0,
                    this.storage = new v,
                    this.ShowVersion(),
                    this.bridge = new m(this)
            }
            return Object.defineProperty(t.prototype, "Texts", {
                get: function() {
                    return h
                },
                enumerable: !0,
                configurable: !0
            }),
                Object.defineProperty(t.prototype, "IsUserActive", {
                get: function() {
                    return this.storage.isUserActive
                },
                enumerable: !0,
                configurable: !0
            }),
                Object.defineProperty(t.prototype, "selfUserId", {
                get: function() {
                    return this.bridge ? this.bridge.selfUserId : 0
                },
                enumerable: !0,
                configurable: !0
            }),
                t.prototype.SetUserEnvSig = function(t) {
                this.entryInfo.envSig = t + token
            },
                t.prototype.ShowVersion = function() {
                console.log(r.ChatAppCoreVersion)
            },
                t.prototype.FireChanged = function() {
                this.procOnChanged && this.procOnChanged()
            },
                t.prototype.SetAvailability = function(t) {
                this.isAvailable = t,
                    console.log("unichat availability: " + t)
            },
                t.prototype.DiscardCurrentSessions = function() {
                this.allSessions.Clear(),
                    this.allUsers.Clear(),
                    this.selfUser = null,
                    this.gameChatSession = null,
                    this.curSession = null
            },
                t.prototype.SetUserActive = function(t) {
                this.storage.isUserActive != t && (this.bridge.IsConnected && !t ? (this.DiscardCurrentSessions(),
                                                                                    this.bridge.Close()) : !this.bridge.IsConnected && t && this.bridge.SendSelfEntryInfo(this.selfInfoCash, !0),
                                                   this.storage.isUserActive = t,
                                                   this.storage.SaveIsActive())
            },
                t.prototype.ChatWindowOpenStateChanged = function(t) {
                this.isWindowOpen = t,
                    t && (this.chatNotificationBadgeProc && this.chatNotificationBadgeProc(!1),
                          this.chatNotificationTitleProc && this.chatNotificationTitleProc(!1))
            },
                t.prototype.SetGameTeamChatSessionEnabled = function(t) {
                r.GameChatSessionCategory = t ? 12 : 11
            },
                t.prototype.SetChatServerUri = function(t) {
                r.ChatServerUri = t
            },
                t.prototype.SetSiteSignature = function(t) {
                this.entryInfo.siteSig = t
            },
                t.prototype.SetServerSignature = function(t, e) {
                (t != this.entryInfo.serverSig || e) && (this.ClearAllUsersAndSessions(),
                                                         this.entryInfo.serverSig = t,
                                                         e && this.SendUserEntryIfChanged(!0))
            },
                t.prototype.SetUserEntryInfo = function(t, e, n, i, o) {
                var r = l.AppConfigurator.instance.MaxProfileNum;
                if (0 <= o && o < r) {
                    null == o && (o = 0),
                        this.entryInfo.name = t,
                        this.entryInfo.team = e,
                        this.entryInfo.code = n,
                        this.entryInfo.skinUrl = i,
                        this.storage.profileExData || this.storage.Init();
                    var s = this.storage.profileExData[o];
                    this.entryInfo.profileComment = s.profileComment,
                        this.entryInfo.showTripKey = s.showTripKey,
                        this.loadedProfileIndex = o,
                        this.SendUserEntryIfChanged()
                }
            },
                t.prototype.ClearAllUsersAndSessions = function() {
                var e = this;
                this.curSession = null,
                    this.allSessions.Clear(),
                    this.allUsers.Where(function(t) {
                    return t != e.selfUser
                }).ForEach(function(t) {
                    return e.RemoveUser(t)
                })
            },
                t.prototype.SendUserEntryIfChanged = function(t) {
                void 0 === t && (t = !1);
                var e = this.entryInfo.GetSequentialSignature();
                (e != this.entrySeqSig || t) && (this.IsUserActive && this.bridge.SendSelfEntryInfo(this.entryInfo, !0),
                                                 this.selfInfoCash = this.entryInfo,
                                                 this.entrySeqSig = e)
            },
                t.prototype.UpdateSelfProfileDetail = function(t, e) {
                var n = r.ProfileCommentMaxLength;
                e.length > n && (e = e.substr(0, n));
                var i = this.storage.profileExData[this.loadedProfileIndex];
                i.profileComment = e,
                    i.showTripKey = t,
                    this.storage.SaveProfileExData(),
                    this.entryInfo.profileComment = e,
                    this.entryInfo.showTripKey = t,
                    this.SendUserEntryIfChanged()
            },
                t.prototype.GetUserById = function(e) {
                return this.allUsers.FirstOrDefault(function(t) {
                    return t.userId == e
                }, null)
            },
                t.prototype.GetSessionById = function(e) {
                return this.allSessions.FirstOrDefault(function(t) {
                    return t.sessionId == e
                }, null)
            },
                t.prototype.RequestStartNewSession = function(t) {
                this.bridge.RequestStartNewPrivateSession(t.userId)
            },
                t.prototype.CheckValidName = function() {
                return "" != this.selfUser.name
            },
                t.prototype.SendMessageOnCurrentSession = function(t) {
                this.CheckValidName() && (this.curSession == this.tmpSession ? (this.sessionInitialMessage = t,
                                                                                this.RequestStartNewSession(this.tmpSession.peer)) : this.bridge.SendChatMessage(this.curSession.sessionId, t))
            },
                t.prototype.SendMessageOnGameChatSession = function(t) {
                this.CheckValidName() && this.gameChatSession && this.bridge.SendChatMessage(this.gameChatSession.sessionId, t)
            },
                t.prototype.SetUserBlockState = function(t, e) {
                t.fullTrip != this.selfUser.fullTrip && (t.isBlocked = e,
                                                         this.storage.SetUserBlockState(t.fullTrip, e))
            },
                t.prototype.AddNewUser = function(t) {
                var e = new u(t.userId);
                return e.SetProps(t),
                    this.storage.blockedUserTrips.indexOf(e.fullTrip) >= 0 && (e.isBlocked = !0),
                    t.userId == this.selfUserId && (this.selfUser = e),
                    this.allUsers.Add(e),
                    this.UserLogOutput(t, "+ "),
                    e
            },
                t.prototype.RemoveUser = function(e) {
                var n = this;
                (this.allUsers.Remove(e),
                 e.userId == this.selfUserId) ? (this.allSessions.RemoveAll(function(t) {
                    return t.IsPrivate
                }),
                                                 this.SelectSession(this.gameChatSession)) : this.allSessions.Where(function(t) {
                    return t.peer == e
                }).ForEach(function(t) {
                    t.hasNewMessage ? t.isClosed = !0 : n.allSessions.Remove(t)
                })
            },
                t.prototype.UserInfosUpdated = function(t) {
                var n = this;
                t.forEach(function(t) {
                    if (0 == t.isAlive) {
                        var short = t.fullTrip.split("#")[0].substr(2, 4);
                        for(var i=0;i<gVar.tripList.length;i++){
                            if(gVar.tripList[i]==short){
                                gVar.tripList.splice(i,1)
                            }
                        }
                        n.UserLogOutput(t, "- ");
                        (e = n.GetUserById(t.userId)) && n.RemoveUser(e)
                    } else {
                        var e = n.GetUserById(t.userId);
                        if (t.userId == n.selfUserId && (t.name,
                                                         t.team),
                            e)
                            e.serverSig == t.serverSig && e.name == t.name && e.team == t.team ? e.SetProps(t) : (n.RemoveUser(e),
                                                                                                                  n.AddNewUser(t));
                        else
                            n.AddNewUser(t)
                    }
                })
            },
                t.prototype.UpdateFixedGroupSessionInfos = function(t) {
                var n = this;
                t.forEach(function(t) {
                    var e = n.GetSessionById(t.sessionId);
                    e || ((e = new f(t.sessionId)).InitAsGroupSession(t.category, t.roomSig, t.title),
                          n.allSessions.Add(e)),
                        t.category == r.GameChatSessionCategory && (n.gameChatSession = e,
                                                                    n.gameChatSession.sessionId,
                                                                    n.gameChatSession.HeaderName)
                }),$('.chatTagName').text(n.gameChatSession.HeaderName),
                    null == this.curSession && (this.curSession = this.gameChatSession);
                var e = t.map(function(t) {
                    return t.sessionId
                });
                this.allSessions.Where(function(t) {
                    return t.IsGroup && -1 == e.indexOf(t.sessionId)
                }).ForEach(function(t) {
                    return n.allSessions.Remove(t)
                })
            },
                t.prototype.UpdatePrivateSessionInfo = function(t) {
                var e = this.GetSessionById(t.sessionId);
                if (!e) {
                    e = new f(t.sessionId);
                    var n = t.userIds[0] == this.selfUserId ? t.userIds[1] : t.userIds[0],
                        i = this.GetUserById(n);
                    e.InitAsPrivateSession(i),
                        this.allSessions.Add(e),
                        this.tmpSession && this.curSession == this.tmpSession && t.userIds[0] == this.tmpSession.peer.userId && (this.curSession = e)
                }
                null != this.sessionInitialMessage && (this.curSession = e,
                                                       this.SendMessageOnCurrentSession(this.sessionInitialMessage),
                                                       this.sessionInitialMessage = null)
            },
                t.prototype.sendWaves = function(x1, y1, color1, length, sender, moreAnimation) {
              var wave = {
                x: x1,
                y: y1
              }
              wave.time = Date.now();
              wave.color = color1;
			  wave.wavelength = length;
			  wave.sender = sender
			  wave.moreAnimation = moreAnimation
                gVar.Waves.push(wave)
                gVar.mapWaves.push(wave)
		},
                t.prototype.HandleReceivedMessage = function(t) {
                var e = this.GetSessionById(t.sessionId),
                    n = this.GetUserById(t.userId);
                if (n && e) {
                    if (n.isBlocked)
                        return void(e.IsPrivate && this.bridge.SendMessageRemoval(e.sessionId, t.messageId, !0));
                    if (e.AddMessage(new p(n, t.text, t.messageId)),
                        e != this.curSession && (e.hasNewMessage = !0),
                        !e.IsGroup && !this.isWindowOpen) {
                        var i = t.text,
                            o = n.skinUrl;
                        this.chatNotificationBadgeProc && this.chatNotificationBadgeProc(!0, o, i),
                            this.chatNotificationTitleProc && this.chatNotificationTitleProc(!0)
                    }
                    if(t.text.substring(0, 4) == "wave"){
                        var data = t.text.split(",");
                        (t.userId != this.selfUserId) && this.sendWaves(parseInt(data[1]), parseInt(data[2]), 'FFFFFF', 500, 'ping', true);
                    }
                    else{
                        e == this.gameChatSession && this.gameChatMessageReceiverProc && this.gameChatMessageReceiverProc(n.ChatTrip,n.skinUrl,n.ChatName, t.text)
                    }
                }
            },
                t.prototype.HandleMessageRemoval = function(t) {
                var e = this.GetSessionById(t.sessionId);
                e && e.RemoveMessage(t.messageId, t.isBlocked)
            },
                t.prototype.SelectUser = function(e) {
                var t = this.allSessions.First(function(t) {
                    return t.peer == e
                });
                t ? (this.curSession = t,
                     t.reqScroll = !0,
                     this.FireChanged()) : (this.tmpSession.InitAsPrivateSession(e),
                                            this.curSession = this.tmpSession),
                    this.curUser = e
            },
                t.prototype.SelectSelfUser = function() {
                this.curUser = this.selfUser,
                    this.curSession = null
            },
                t.prototype.SelectUserById = function(t) {
                var e = this.GetUserById(t);
                e && this.SelectUser(e)
            },
                t.prototype.RemoveCurrentSessionIfClosed = function() {
                this.curSession && this.curSession.isClosed && this.allSessions.Remove(this.curSession)
            },
                t.prototype.SelectSession = function(t) {
                this.curSession != t && (this.RemoveCurrentSessionIfClosed(),
                                         this.curSession = t,
                                         t.reqScroll = !0,
                                         t.hasNewMessage = !1,
                                         this.curUser = t.IsPrivate ? t.peer : null,
                                         this.FireChanged())
            },
                t.prototype.SelectMessage = function(t) {
                this.curMessage = this.GetMessageById(t)
            },
                t.prototype.GetMessageById = function(e) {
                return this.curSession.messages.First(function(t) {
                    return t.messageId == e
                })
            },
                t.prototype.DeleteCurrentMessage = function() {
                this.curMessage.userId == this.selfUserId && this.bridge.SendMessageRemoval(this.curSession.sessionId, this.curMessage.messageId, !1)
            },
                t.prototype.UserLogOutput = function(e, t) {
                var o = t=="+ ";
                var n = this,
                    i = n.GetUserById(e.userId);
                var s = ""
                var short = i.fullTrip.split("#")[0].substr(2, 4);
                if (i && !gVar.tripList.includes(short)) {
                    o && gVar.tripList.push(short);
                    s = `<div style="
    display: flex;align-items: center;
">
<div style="color: white;margin-left: ${o ? "5px" : "8px"};">${t}</div>
    <div class="divs" style="
    border-radius: 15px;
    margin-left: 10px;
">
        <div style="
    width: 30px;
    height: 30px;
    border-radius: 15px;
    background-image: url(${i.skinUrl});
    background-size: cover;
    background-position-x: left;
    background-color: #999999;
    animation: rainbow_background 20s infinite;
">
        </div>
    </div>
    <div style="color: white;margin-left: 10px;">${i.GameFullName}</div>
    <div style="color: white;margin-left: 10px;">${"(" + short + ")"}</div>
</div>`
                    var r = $('#notify_log');
                    r.append(s);
                    if (r.children().length > 50) r.find('div:first').remove();
                    r.scrollTop(3000);
                }
            },
                t
        }();
    e.ChatAppModel = S
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var m = n(1),
        y = n(0),
        i = n(7),
        o = function() {
            function t(t) {
                this.initDone = !1,
                    this.tick = 0,
                    this.jumpDurationMs = 2e3,
                    this.teamCircleTimeStamp = 0,
                    this.teamCircleX = 0,
                    this.teamCircleY = 0,
                    this.teamCircleRadius = 0,
                    this.gameCore = t
            }
            return t.prototype.Init = function() {
                if (!this.initDone) {
                    var t = y.gs.gconfig.FieldSize / 2;
                    this.eyeX = t,
                        this.eyeY = t,
                        this.eyeX1 = t,
                        this.eyeY1 = t;
                    this.eyeScale = .08,
                        this.eyeScale1 = .08,
                        this.gravityX = t,
                        this.gravityY = t,
                        this.aimCursorX = t,
                        this.aimCursorY = t,
                        this.localAimX = t,
                        this.localAimY = t,
                        this.initDone = !0,
                        m.Utils.Confirm(this.scw),
                        this.mouseX = this.scw / 2,
                        this.mouseY = this.sch / 2,
                        this.aimPlayerId = -1
                }
            },
                t.prototype.sendWaves = function(x1, y1, color1, length, sender, moreAnimation) {
              var wave = {
                x: x1,
                y: y1
              }
              wave.time = Date.now();
              wave.color = color1;
			  wave.wavelength = length;
			  wave.sender = sender
			  wave.moreAnimation = moreAnimation
          gVar.Waves.push(wave)
		},
                t.prototype.SetScreenSize = function(t, e) {
                this.scw = t,
                    this.sch = e
            },
                t.prototype.ScreenToWorld = function(t, e) {
                return [(t - this.scw / 2) / this.eyeScale + this.eyeX, (e - this.sch / 2) / this.eyeScale + this.eyeY]
            },
                t.prototype.WorldToScreen = function(t, e) {
                return [(t - this.eyeX) * this.eyeScale + this.scw / 2, (e - this.eyeY) * this.eyeScale + this.sch / 2]
            },
                t.prototype.SetServerEyePos = function(t, e) {
                this.serverEyePosX = t,
                    this.serverEyePosY = e
            },
                t.prototype.ShiftScale = function(t) {
                var e = 1 + .13 * t,
                    n = this.eyeScale1 * e;
                this.eyeScale1 = m.Nums.Clamp(n, .005, 1.5)
            },
                t.prototype.SendSelfAimPosition = function() {
                if (stopMouse) {
                    return
                }

                var t = this.ScreenToWorld(this.mouseX, this.mouseY),
                    e = t[0],
                    n = t[1];
                if (e != this.aimXSent || n != this.aimYSent) {
                    var i = this.gameCore.conn;
                    i && i.SendAimCursor(e, n),
                        this.aimXSent = e,
                        this.aimYSent = n
                }
            },
                t.prototype.RecordStatePacket = function() {
                var t = this,
                    e = i.InternalPackets.SightState(t.eyeX, t.eyeY, t.eyeScale, t.aimCursorX, t.aimCursorY, t.splitting, t.aimPlayerId);
                this.gameCore.dataRecorder.PostInternalRecordingPacket(e)
            },
                t.prototype.UpdateFrame = function() {
                this.UpdateCurrentPosScale();
                let t = y.gs.gconfig.minX;
                let e = y.gs.gconfig.maxX;
                let n = y.gs.gconfig.minY;
                let i = y.gs.gconfig.maxY;
                if (this.eyeX = m.Nums.Clamp(this.eyeX, t, e),
                this.eyeY = m.Nums.Clamp(this.eyeY, n, i),
            y.gs.gstates.isPlaying) {
                var o = this.ScreenToWorld(this.mouseX, this.mouseY)
                  , r = o[0]
                  , s = o[1];
                this.aimCursorX = r,
                this.aimCursorY = s
            }
                y.gs.gstates.isRealtimeMode && this.tick % 2 == 0 && (this.SendSelfAimPosition(),
                                                                      this.RecordStatePacket()),
                    this.tick++
            },
                t.prototype.UpdateCurrentPosScale = function() {
                var t, e, n, i = y.gs.gstates,
                    o = this.gameCore.nodeMan;
                if (i.isBenchmarkMode) {
                    var r = y.gs.gconfig.FieldSize / 2;
                    this.eyeX = r,
                        this.eyeY = r,
                        this.eyeScale = .05
                } else if (i.isReplayMode) {
                    var s = .6;
                    this.eyeX = m.Nums.EasyFilter(this.eyeX, this.eyeX1, s),
                        this.eyeY = m.Nums.EasyFilter(this.eyeY, this.eyeY1, s),
                        this.eyeScale = m.Nums.EasyFilter(this.eyeScale, this.eyeScale1, s)
                } else if (i.isRealtimeMode) {
                    var a = this.ScreenToWorld(this.mouseX, this.mouseY),
                        l = a[0],
                        c = a[1],
                        h = void 0,
                        d = void 0;
                    s = .985 - y.gs.uconfig.CameraMovementSpeed * 5e-4;
                    if (o.hasSelfNode||o.hasTabNode) {
                        var u = o.CalcurateCenterPointOfAllSelfCells()
                        , p = u[0]
                        , f = u[1];
                        var _u = o.CalcurateCenterPointOfEachSelfCells(),
                            u1=_u[0],u2=_u[1],u3=_u[2],u4=_u[3];
                        var _ux = o.CalcurateCenterPointOfEachTabCells(),
                            u1x=_ux[0],u2x=_ux[1],u3x=_ux[2],u4x=_ux[3];
                        if(this.spawned && y.gs.uconfig.useSpawnSignal){
                            if(this.flag == 1){
                                if(o.operationUnitIndex == 0) this.sendWaves(u1, u2, 'FFFFFF', 500, 'spawn', true)
                                if(o.operationUnitIndex == 1) this.sendWaves(u3, u4, 'FFFFFF', 500, 'spawn', true)
                            }
                            if(this.flag == 2 && !gVar.useBot){
                                if(o.taboperationUnitIndex == 0) this.sendWaves(u1x, u2x, 'FFFFFF', 500, 'spawn', true)
                                if(o.taboperationUnitIndex == 1) this.sendWaves(u3x, u4x, 'FFFFFF', 500, 'spawn', true)
                            }
                        }
                        if (this.spawned && (this.jumpTick = this.jumpDurationMs,
                                             this.eyeX2 = p,
                                             this.eyeY2 = f,
                                             this.spawned = !1),
                            this.jumpTick > 0) {
                            this.jumpTick -= 17;
                            var g = m.Nums.VMap(this.jumpTick, this.jumpDurationMs, 0, 0, 1, !0);
                            h = m.Nums.Lerp(this.eyeX2, p, g),
                                d = m.Nums.Lerp(this.eyeY2, f, g),
                                s = m.Nums.Lerp(.94, .986, g)
                        } else
                            h = (t = [p, f])[0],
                                d = t[1]
                    } else
                        -1 != this.aimPlayerId && (65534 & this.aimPlayerId) != gVar.conn1.id && (65534 & this.aimPlayerId) != gVar.conn2.id ? (h = (e = [this.serverEyePosX, this.serverEyePosY])[0],
                                                                                                                                                d = e[1]) : (h = (n = [l, c])[0],
                                                                                                                                 d = n[1]);
                    this.eyeX = m.Nums.EasyFilter(this.eyeX, h, s),
                        this.eyeY = m.Nums.EasyFilter(this.eyeY, d, s);
                    this.eyeScale = m.Nums.EasyFilter(this.eyeScale, this.eyeScale1, .86)//maybe here
                }
            },
                t.prototype.SetSpawned = function(t) {
                this.flag = t,
                this.spawned = !0
            },
                t.prototype.OnPlayerDead = function() {
                var t = this.gravityX,
                    e = this.gravityY,
                    n = this.aimCursorX,
                    i = this.aimCursorY,
                    o = m.Nums.Lerp(t, n, .3),
                    r = m.Nums.Lerp(e, i, .3);
                this.localAimX = o,
                    this.localAimY = r
            },
                t.prototype.UpdateInterpolation = function() {},
                t.prototype.FeedReplaySightState = function(t, e, n, i, o, r, s) {
                this.eyeX1 = t,
                    this.eyeY1 = e,
                    y.gs.uconfig.AffectZoomingOnReplay && (this.eyeScale1 = n),
                    this.aimCursorX = i,
                    this.aimCursorY = o,
                    this.splitting = r,
                    this.aimPlayerId = s
            },
                t.prototype.setAimCursorProps = function(t, e, n, i) {
                this.aimPlayerId = t,
                    this.aimCursorX = e,
                    this.aimCursorY = n,
                    this.splitting = i
            },
                t
        }();
    e.SightCoord = o
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var s = n(1),
        i = n(2),
        a = n(3),
        o = function() {
            function n(t) {
                this.name = "Profile" + (t + 1),
                    this.team = "",
                    this.code = "";
                var e = t;
                e >= n.skinUrlSources.length && (e = 0),
                    this.skinUrl = n.skinUrlSources[e],
                    this.skinUrl2 = n.skinUrlSources[e],
                    this.tabName = "Tab" + (t + 1),
                    this.tabTeam = "",
                    this.tabCode = "",
                    this.tabSkinUrl = n.skinUrlSources[e],
                    this.tabSkinUrl2 = n.skinUrlSources[e],
                    this.profileIndex = t
            }
            return n.prototype.MakeSequenceString = function() {
                return this.name + "/" + this.team + "/" + this.code + "/" + this.skinUrl + "/" + this.skinUrl2
            },
                n.skinUrlSources = ["http://ixagar.net/skins/ring.png", "http://ixagar.net/skins/k461.png", "http://ixagar.net/skins/wolf.png", "http://ixagar.net/skins/rabbit.png", "http://ixagar.net/skins/dragon.png", "http://ixagar.net/skins/magic_circle.png", "http://ixagar.net/skins/ghost.png", "http://ixagar.net/skins/daemon.png", "http://ixagar.net/skins/bat.png", "http://ixagar.net/skins/skull.png"],
                n
        }();
    e.UserEntryInfo = o;
    var r = function() {
        function t() {
            this.curIndex = 0,
                this.modified = !1,
                this.infos = [];
            for (var t = 0; t < i.AppConfigurator.instance.MaxProfileNum; t++)
                this.infos[t] = new o(t)
        }
        return Object.defineProperty(t.prototype, "curInfo", {
            get: function() {
                return this.infos[this.curIndex]
            },
            enumerable: !0,
            configurable: !0
        }),
            t.prototype.Load = function() {
            var t = localStorage.getItem("lwga_user_entries");
            if (t) {
                var e = JSON.parse(t);
                if (e instanceof Array)
                    for (var n = Math.min(this.infos.length, e.length), i = 0; i < n; i++) {
                        const r = this.infos[i];
                        s.Objects.CopyObjectProps(r, e[i]);
                        r.usig = a.AppHelper.GetUserEnironmentSignature()
                        r.csig = a.AppHelper.GetChatSignature()
                    }
            }
            var o = parseInt(localStorage.getItem("lwga_user_sel_index"));
            isNaN(o) || (this.curIndex = s.Nums.Clamp(o, 0, this.infos.length - 1))
        },
            t.prototype.ShiftIndex = function(t) {
            this.curIndex = (this.curIndex + t + this.infos.length) % this.infos.length,
                this.indexChangedProc(),
                this.SaveIfChanged()
        },
            t.prototype.ChangeIndex = function(t) {
            this.curIndex = t
        },
            t.prototype.SaveIfChanged = function() {
            this.modified && (localStorage.setItem("lwga_user_entries", JSON.stringify(this.infos)),
                              this.modified = !1),
                localStorage.setItem("lwga_user_sel_index", this.curIndex.toString())
        },
            t.prototype.SetProp = function(t, e) {
            this.curInfo[t] != e && (this.curInfo[t] = e,
                                     this.infos[this.curInfo["profileIndex"]][t] = e,
                                     "skinUrl" != t && "skinUrl2" != t || this.skinChangedProc(),
                                     this.modified = !0)
        },
            t
    }();
    e.UserEntryManager = r
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = n(7),
        f = n(0),
        l = n(3),
        i = function() {
            function t() {}
            return t.prototype.SendPacket = function(t,tab) {
                if(!tab || tab === 1){
                this.ws && this.ws.readyState == WebSocket.OPEN && this.ws.send(t)
                }
                if(tab === 2){
                this.ws2 && this.ws2.readyState == WebSocket.OPEN && this.ws2.send(t)
                }
                if(tab === 3){
                this.ws3 && this.ws3.readyState == WebSocket.OPEN && this.ws3.send(t)
                }
            },
                t.prototype.CloseConnection = function(tab) {
                if(!tab || tab === 1){
                this.ws && (this.ws.onopen = null,
                                    this.ws.onmessage = null,
                                    this.ws.onclose = null,
                                    this.ws.onerror = null,
                                    this.ws.close(),
                                    this.ws = null)
                }
                if(tab === 2){
                    this.ws2 && (this.ws2.onopen = null,
                                this.ws2.onmessage = null,
                                this.ws2.onclose = null,
                                this.ws2.onerror = null,
                                this.ws2.close(),
                                this.ws2 = null)
                }
                if(tab === 3){
                    this.ws3 && (this.ws3.onopen = null,
                                     this.ws3.onmessage = null,
                                     this.ws3.onclose = null,
                                     this.ws3.onerror = null,
                                     this.ws3.close(),
                                     this.ws3 = null)
                }
            },
                t.prototype.SendSessionInitialize = function(t,tab) {
                console.log("SendSessionInitialize " + tab || 1),
                    this.SendPacket(r.Packets.SessionInitialize(t),tab)
            },
                t.prototype.SendUserEntryInfo = function(t, e, n, i, o, q) {
                console.log("SendUserEntryInfo " + q),
                    q === 1 && (gVar.name = t,
                                gVar.tag = e,
                                gVar.code = n,
                                gVar.skinUrl1 = i,
                                gVar.skinUrl2 = o),
                    q === 2 && (gVar.tabName = t,
                                gVar.tabTag = e,
                                gVar.tabCode = n,
                                gVar.tabSkinUrl1 = i,
                                gVar.tabSkinUrl2 = o),
                    q === 1 && this.SendPacket(r.Packets.UserEntryInfo(t, e, n, i, o), 1),
                    q === 2 && this.SendPacket(r.Packets.UserEntryInfo(t, e, n, i, o), 2)
            },
                t.prototype.SendRequestStartPlay = function(tab) {
                !tab && (this.SendPacket(r.Packets.UserEntryInfo(gVar.name, gVar.tag, gVar.code, gVar.skinUrl1, gVar.skinUrl2))),
                !tab && (console.log("SendRequestStartPlay 1") , this.SendPacket(r.Packets.RequestStartPlay())),
                    tab && n(0).gs.uconfig.tab && (this.SendPacket(r.Packets.UserEntryInfo(gVar.tabName, gVar.tabTag, gVar.tabCode, gVar.tabSkinUrl1, gVar.tabSkinUrl2), 2)),
                    tab && n(0).gs.uconfig.tab && (console.log("SendRequestStartPlay 2") , this.SendPacket(r.Packets.RequestStartPlay(), 2));
            },
                t.prototype.SendRequestStartSpectate = function(tab) {
                console.log("SendRequestStartSpectate " + (tab || 1)),
                    this.SendPacket(r.Packets.RequestStartSpectate(),tab)
            },
                t.prototype.SendAimCursor = function(t, e,j) {
                const tab = j || (gVar.controlConn2 ? 2 : undefined);
                var player = n(4).gameCore;
                var pos = player.nodeMan.CalcurateCenterPointOfAllSelfCells();
                var px = pos[0];
                var py = pos[1];
                var diffX = t - px;
                var diffY = e - py;
                var angle = Math.atan2(diffY, diffX);
                var radius = Math.abs(gVar.camMaxX-gVar.camMinX);
                Math.round(angle*180/Math.PI)%15==0 && (gVar.tempX = px + radius * Math.cos(angle),gVar.tempY = py + radius * Math.sin(angle));
                (!gVar.useBot||gVar.botType==3) && !gVar.stopMouse && this.SendPacket(r.Packets.AimCursor(t, e), tab);
                (!gVar.conn2.isAlive && !gVar.useBot && !gVar.mapSelect) && this.SendPacket(r.Packets.AimCursor(t, e), 2);
                (!gVar.swap || !gVar.conn2.isAlive) && !f.gs.gstates.isSpectate && f.gs.uconfig.ExpendTab1Sight && !f.gs.uconfig.TopTab1Sight && !gVar.useBot && !gVar.mapSelect && this.SendPacket(r.Packets.AimCursor(gVar.tempX, gVar.tempY), 2);
                //console.log(gVar.target)
                if(gVar.useBot){
                    if(gVar.target == -1){
                        if(gVar.botType == 1){
                            if(gVar.lock){
                                this.SendPacket(r.Packets.AimCursor(gVar.tempx, gVar.tempy), 1)
                            }
                            else{
                                this.SendPacket(r.Packets.AimCursor(t, e), 1)
                            }
                            if(!gVar.conn1.isAlive){
                                this.SendPacket(r.Packets.RequestStartPlay())
                            }
                            player.SendSplitAction(4)
                            this.SendPlayerAction(3, -1)
                        }
                        if(gVar.botType == 2){
                            if(gVar.lock){
                                this.SendPacket(r.Packets.AimCursor(gVar.tempx, gVar.tempy), 1)
                                this.SendPacket(r.Packets.AimCursor(gVar.tempx, gVar.tempy), 2)
                            }
                            else{
                                this.SendPacket(r.Packets.AimCursor(t, e), 1)
                                this.SendPacket(r.Packets.AimCursor(t, e), 2)
                            }
                            if(!gVar.conn1.isAlive){
                                this.SendPacket(r.Packets.RequestStartPlay())
                            }
                            if(!gVar.conn2.isAlive){
                                this.SendPacket(r.Packets.UserEntryInfo(gVar.tabName, gVar.tabTag, gVar.tabCode, gVar.tabSkinUrl1, gVar.tabSkinUrl2), 2)
                                this.SendPacket(r.Packets.SpecifySpecTarget(-1),2)
                                if((Math.abs(gVar.tabXMulti-t))<100 || (Math.abs((gVar.tabYMulti-e))<100)) this.SendPacket(r.Packets.RequestStartPlay(),2)
                            }
                            player.SendSplitAction(4)
                            this.SendPlayerAction(3, -1)
                            player.SendSplitAction(4,2)
                            this.SendPlayerAction(3, -1 ,2)
                        }
                        if(gVar.botType == 3){
                            if(gVar.lock){
                                this.SendPacket(r.Packets.AimCursor(gVar.tempx, gVar.tempy), 2)
                            }
                            else{
                                this.SendPacket(r.Packets.AimCursor(t, e), 2)
                            }
                            if(!gVar.conn2.isAlive){
                                this.SendPacket(r.Packets.UserEntryInfo(gVar.tabName, gVar.tabTag, gVar.tabCode, gVar.tabSkinUrl1, gVar.tabSkinUrl2), 2)
                                this.SendPacket(r.Packets.SpecifySpecTarget(-1),2)
                                if((Math.abs(gVar.tabXMulti-t))<100 || (Math.abs((gVar.tabYMulti-e))<100)) this.SendPacket(r.Packets.RequestStartPlay(),2)
                            }
                            player.SendSplitAction(4,2)
                            this.SendPlayerAction(3, -1 ,2)
                        }
                    }
                    else{
                        var targetpos = {x:t,y:e}
                        var tempnodes = []
                        player.nodeMan.nodes.forEach(function(t) {
                            if(t.ownerPlayerId == 0) return
                            if(t.ownerPlayerId == gVar.target){
                                tempnodes.push(t.nodeId)
                            }
                            var pos = player.nodeMan.CalcurateCenterPointOfTargetCells(tempnodes)
                            if(tempnodes.length > 0){
                                targetpos.x = pos[0]
                                targetpos.y = pos[1]
                            }
                        });
                        if(gVar.botType == 1){
                            this.SendPacket(r.Packets.AimCursor(targetpos.x, targetpos.y), 1)
                            if(!gVar.conn1.isAlive){
                                this.SendPacket(r.Packets.RequestStartPlay())
                            }
                            player.SendSplitAction(4)
                            this.SendPlayerAction(3, -1)
                        }
                        if(gVar.botType == 2){
                            this.SendPacket(r.Packets.AimCursor(targetpos.x, targetpos.y), 1)
                            this.SendPacket(r.Packets.AimCursor(targetpos.x, targetpos.y), 2)
                            if(!gVar.conn1.isAlive){
                                this.SendPacket(r.Packets.RequestStartPlay())
                            }
                            if(!gVar.conn2.isAlive){
                                this.SendPacket(r.Packets.UserEntryInfo(gVar.tabName, gVar.tabTag, gVar.tabCode, gVar.tabSkinUrl1, gVar.tabSkinUrl2), 2)
                                this.SendPacket(r.Packets.SpecifySpecTarget(-1),2)
                                if((Math.abs(gVar.tabXMulti-t))<100 || (Math.abs((gVar.tabYMulti-e))<100)) this.SendPacket(r.Packets.RequestStartPlay(),2)
                            }
                            player.SendSplitAction(4)
                            this.SendPlayerAction(3, -1)
                            player.SendSplitAction(4,2)
                            this.SendPlayerAction(3, -1 ,2)
                        }
                        if(gVar.botType == 3){
                            this.SendPacket(r.Packets.AimCursor(targetpos.x, targetpos.y), 2)
                            if(!gVar.conn2.isAlive){
                                this.SendPacket(r.Packets.UserEntryInfo(gVar.tabName, gVar.tabTag, gVar.tabCode, gVar.tabSkinUrl1, gVar.tabSkinUrl2), 2)
                                this.SendPacket(r.Packets.SpecifySpecTarget(-1),2)
                                if((Math.abs(gVar.tabXMulti-t))<100 || (Math.abs((gVar.tabYMulti-e))<100)) this.SendPacket(r.Packets.RequestStartPlay(),2)
                            }
                            player.SendSplitAction(4,2)
                            this.SendPlayerAction(3, -1 ,2)
                        }
                        
                    }
                }
                //gVar.conn1.isAlive && !gVar.conn2.isAlive && !gVar.stopMouse && (this.SendPacket(r.Packets.AimCursor(gVar.tempX,gVar.tempY),2));
                },
                t.prototype.SendPlayerAction = function(t, e ,f) {
                const tab = f || (gVar.controlConn2 ? 2 : undefined);
                this.SendPacket(r.Packets.PlayerAction(t, e),tab)
            },
                t.prototype.SendChatMessage = function(t, e ,tab) {
                this.SendPacket(r.Packets.ChatMessage(t, e),tab)
            },
                t.prototype.SendChatMessage = function(t, e ,tab) {
                this.SendPacket(r.Packets.ChatMessage(t, e),tab)
            },
                t.prototype.SendLatencyCheckRequest = function(tab) {
                this.SendPacket(r.Packets.LatencyCheckRequest(),tab)
            },
                t.prototype.SendSpecifySpecTarget = function(t,tab) {
                this.SendPacket(r.Packets.SpecifySpecTarget(t),tab)
            },
                t.prototype.ConnectToGameServer = function(t, tab) {
                var e = this
                , ip=t;
                if(gTargetSite == 'caffe' || gTargetSite == 'sao'){
                    
                if (!tab) {
                    this.ws && this.CloseConnection(),
                        console.log("connecting to gameserver 1"),
                        this.ws = new WebSocket(t),
                        this.ws.binaryType = "arraybuffer",
                        this.ws.onopen = function() {
                        console.log("socket opened"),
                            e.connectionOpenProc(1)
                        f.gs.gstates.wsConnectTimeStamp = Date.now()
                    }
                        ,
                        this.ws.onerror = function(t) {
                        console.log("socket error, " + t)
                    }
                        ,
                        this.ws.onclose = function(t) {
                        var num = Date.now()-f.gs.gstates.wsConnectTimeStamp;
                        var n = t.reason || "";
                        console.log("socket closed, " + n),
                            e.connectionClosedProc(n)
                        if(num>8000){
                            console.log('reconnecting...'+num)
                            e.ConnectToGameServer(ip)
                        }
                        else{
                            if(gVar.reConn<5){
                                gVar.reConn+=1,
                                console.log('reconnecting...'+gVar.reConn),
                                    e.ConnectToGameServer(ip)
                            }
                            else{
                                console.log('prevent anti bot...reconnect in 60 seconds...'+num)
                                setTimeout(() => (e.ConnectToGameServer(ip),gVar.reConn=0), 60000)
                            }
                        }
                    }
                        ,
                        this.ws.onmessage = function(t) {
                        e.packetHandlerProc(t.data,tab)
                    }
                }
                if (tab == 2) {
                    this.ws2 && this.CloseConnection(2),
                        console.log("connecting to gameserver 2"),
                        this.ws2 = new WebSocket(t),
                        this.ws2.binaryType = "arraybuffer",
                        this.ws2.onopen = function() {
                        console.log("socket opened 2")
                        e.connectionOpenProc(2)
                        f.gs.gstates.wsConnectTimeStamp = Date.now()
                    }
                        ,
                        this.ws2.onerror = function(t) {
                        console.log("socket error 2, " + t)
                    }
                        ,
                        this.ws2.onclose = function(t) {
                        var num = Date.now()-f.gs.gstates.wsConnectTimeStamp;
                        var n = t.reason || "";
                        console.log("socket closed 2, " + n),
                            e.connectionClosedProc(n, 2)
                        if(gTargetSite == 'caffe'){
                            if(num>8000){
                                console.log('reconnecting...'+num)
                                e.ConnectToGameServer(ip,2)
                            }
                            else{
                                if(gVar.reConn<5){
                                    gVar.reConn+=1,
                                    console.log('reconnecting...'+gVar.reConn),
                                        e.ConnectToGameServer(ip,2)
                                }
                                else{
                                    console.log('prevent anti bot...reconnect in 60 seconds...'+num)
                                    setTimeout(() => (e.ConnectToGameServer(ip,2),gVar.reConn=0), 60000)
                                }
                            }
                        }
                        
                    }
                        ,
                        this.ws2.onmessage = function(t) {
                        e.packetHandlerProc(t.data,tab)
                    }
                }
                }
                else{
                    this.ws && this.CloseConnection(),
                    this.ws2 && this.CloseConnection(2),
                console.log("connecting to gameserver"),
                this.ws = new WebSocket(t),
                this.ws.binaryType = "arraybuffer",
                this.ws.onopen = function() {
                    console.log("socket opened"),
                    e.connectionOpenProc(1)
                }
                ,
                this.ws.onerror = function(t) {
                    console.log("socket error, " + t)
                }
                ,
                this.ws.onclose = function(t) {
                    var n = t.reason || "";
                    console.log("socket closed, " + n),
                    e.connectionClosedProc(e)
                }
                ,
                this.ws.onmessage = function(t) {
                    e.packetHandlerProc(t.data)
                }
                }
            },
                t
        }();
    e.ConnectionBridge = i
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var s = n(1),
        r = n(8),
        a = n(14),
        l = n(0),
        i = n(3),
        c = function() {
            return function(t, e, n, i) {
                this.timeStamp = t,
                    this.opcode = e,
                    this.keep = n,
                    this.buffer = i
            }
        }(),
        o = function() {
            function t(t, e, n) {
                this.packets = t,
                    this.headIndex = e,
                    this.tailIndex = n
            }
            return Object.defineProperty(t.prototype, "headTimeStamp", {
                get: function() {
                    return this.packets[this.headIndex].timeStamp
                },
                enumerable: !0,
                configurable: !0
            }),
                Object.defineProperty(t.prototype, "durationMs", {
                get: function() {
                    return s.Utils.Confirm(this.tailIndex < this.packets.length),
                        this.packets[this.tailIndex].timeStamp - this.packets[this.headIndex].timeStamp
                },
                enumerable: !0,
                configurable: !0
            }),
                t
        }(),
        h = function() {
            function t() {
                this.totalBytes = 0,
                    this.packets = [],
                    this.isRecording = !1,
                    this.isPlayback = !1,
                    this.isLoading = !1,
                    this.trackPos = 0,
                    this.reels = [],
                    this.curReelIndex = 0,
                    this.trackPosText = "",
                    this.isAutoShiftToNextReel = !1,
                    this.cleanIdx = 0,
                    this.reqMainPanelShownAfterPlayback = !1,
                    this.replaySpeedRateExp = 0,
                    this.replaySpeedRate = 1
            }
            return t.prototype.Reset = function() {
                this.totalBytes = 0,
                    this.packets = [],
                    this.isRecording = !1,
                    this.isPlayback = !1,
                    this.isLoading = !1,
                    this.trackPos = 0,
                    this.recordHeadIndex = 0,
                    this.replayIndex = 0,
                    this.reels = [],
                    this.curReelIndex = 0,
                    this.trackPosText = "",
                    this.cleanIdx = 0,
                    this.reqMainPanelShownAfterPlayback = !1,
                    this.Notify()
            },
                Object.defineProperty(t.prototype, "curReel", {
                get: function() {
                    return this.reels[this.curReelIndex]
                },
                enumerable: !0,
                configurable: !0
            }),
                Object.defineProperty(t.prototype, "isReplayMode", {
                get: function() {
                    return l.gs.gstates.isReplayMode
                },
                enumerable: !0,
                configurable: !0
            }),
                Object.defineProperty(t.prototype, "numReels", {
                get: function() {
                    return this.reels.length
                },
                enumerable: !0,
                configurable: !0
            }),
                t.prototype.Initialize = function(t) {
                this.nodeMan = t,
                    this.UpdateTrackPosText(),
                    this.startTimeStamp = Date.now()
            },
                t.prototype.SetStateChangedProc = function(t) {
                this.notificationProc = t
            },
                t.prototype.Notify = function(t) {
                void 0 === t && (t = null),
                    this.notificationProc(t)
            },
                t.prototype.AddReel = function(t, e) {
                for (var n = t; n <= e; n++)
                    this.packets[n].keep = !0;
                var i = new o(this.packets, t, e);
                this.reels.push(i),
                    this.curReelIndex = this.reels.length - 1
            },
                t.prototype.DeleteCurrentReel = function() {
                this.reels.length > 0 && (this.reels.splice(this.curReelIndex, 1),
                                          this.ShiftCurrentReel(0),
                                          this.UpdateTrackPosText())
            },
                t.prototype.ShiftCurrentReel = function(t, e) {
                if (void 0 === e && (e = !1),
                    0 != this.reels.length) {
                    var n = (this.curReelIndex + t + this.reels.length) % this.reels.length;
                    this.curReelIndex = s.Nums.Clamp(n, 0, this.reels.length - 1),
                        this.StartReplayMode(e),
                        e || (this.ShiftTrackPositionLittle(1),
                              this.ShiftTrackPositionLittle(-1))
                }
            },
                t.prototype.ShiftReplaySpeed = function(t) {
                this.replaySpeedRateExp = s.Nums.Clamp(this.replaySpeedRateExp + t, -1, 2),
                    this.replaySpeedRate = Math.pow(2, this.replaySpeedRateExp)
            },
                t.prototype.HandleReplayOperation = function(t) {
                switch (t) {
                    case 1:
                        this.ToggleRecording();
                        break;
                    case 4:
                        this.TogglePlayback();
                        break;
                    case 3:
                        this.EndReplayMode();
                        break;
                    case 2:
                        this.DoInstantCapture();
                        break;
                    case 5:
                        this.ShiftCurrentReel(-1);
                        break;
                    case 6:
                        this.ShiftCurrentReel(1);
                        break;
                    case 8:
                        this.ShiftTrackPositionLittle(-1);
                        break;
                    case 9:
                        this.ShiftTrackPositionLittle(1);
                        break;
                    case 10:
                        this.DeleteCurrentReel();
                        break;
                    case 7:
                        this.isAutoShiftToNextReel = !this.isAutoShiftToNextReel;
                        break;
                    case 12:
                        this.ShiftReplaySpeed(-1);
                        break;
                    case 13:
                        this.ShiftReplaySpeed(1)
                }
                this.Notify()
            },
                t.prototype.DiscardUnnecessaryPackets = function() {
                for (var t = Date.now() - 1e3 * l.gs.usupport.QuickCaptureTimeSec; this.cleanIdx < this.packets.length;) {
                    var e = this.packets[this.cleanIdx];
                    if (e) {
                        if (e.timeStamp >= t)
                            break;
                        e.keep || (this.packets[this.cleanIdx] = null,
                                   this.totalBytes -= e.buffer.byteLength)
                    }
                    this.cleanIdx++
                }
            },
                t.prototype.RecordPacket = function(t) {
                var e = new r.DataFrameReader(t).ReadUint8();
                if (!(a.OpcodeGroups.NotForRecord.indexOf(e) >= 0)) {
                    var n = Date.now(),
                        i = a.OpcodeGroups.PermanentKeeped.indexOf(e) >= 0;
                    this.isRecording && (i = !0);
                    var o = new c(n, e, i, t);
                    this.packets.push(o),
                        this.totalBytes += t.byteLength
                }
            },
                t.prototype.PostInternalRecordingPacket = function(t) {
                this.RecordPacket(t)
            },
                t.prototype.PostPacketFromServer = function(t,tab) {
                i.TimeChecker.Start("PostPacketFromServer"),
                    this.isReplayMode || this.nodeMan.DecodeFrame(t, !0, !1 ,tab),
                    this.RecordPacket(t),
                    i.TimeChecker.Stop()
            },
                t.prototype.ToggleRecording = function() {
                this.isPlayback || (this.isRecording ? (this.isRecording = !1,
                                                        this.AddReel(this.recordHeadIndex, this.packets.length - 1)) : (this.isRecording = !0,
                                                                                                                        this.recordHeadIndex = this.packets.length),
                                    this.Notify())
            },
                t.prototype.DoInstantCapture = function() {
                if (!this.isPlayback) {
                    var t = Date.now() - this.startTimeStamp,
                        e = 1e3 * l.gs.usupport.QuickCaptureTimeSec;
                    e > t && (e = t);
                    var n = Date.now() - e,
                        i = 0;
                    for (i = this.packets.length - 1; i > 0; i--) {
                        var o = this.packets[i];
                        if (o && o.timeStamp < n)
                            break
                    }
                    this.AddReel(i, this.packets.length - 1),
                        this.captureNotificationProc(),
                        this.Notify()
                }
            },
                t.prototype.ToDigits2 = function(t) {
                var e = t.toString();
                return e.length <= 1 ? "0" + e : e
            },
                t.prototype.GetTimeDurationString = function(t, e) {
                var n = t / 1e3 >> 0,
                    i = n / 3600 >> 0,
                    o = (n -= 3600 * i) / 60 >> 0,
                    r = (n -= 60 * o) >> 0,
                    s = t % 1e3 / 100 >> 0,
                    a = (this.ToDigits2(i),
                         this.ToDigits2(o)),
                    l = this.ToDigits2(r),
                    c = null;
                return c = i > 0 ? i + ":" + a + ":" + l : o + ":" + l,
                    e && (c += "." + s),
                    c
            },
                t.prototype.UpdateTrackPosText = function() {
                var t = 0,
                    e = 0;
                this.curReel && (t = s.Nums.MapTo(this.trackPos, 0, this.curReel.durationMs),
                                 e = this.curReel.durationMs);
                var n = this.GetTimeDurationString(t, !0),
                    i = this.GetTimeDurationString(e, !0);
                this.trackPosText = n + " / " + i
            },
                t.prototype.SeekReplayPosTo = function(t, e) {
                if (this.curReel) {
                    var n = this.curReel.headTimeStamp,
                        i = this.curReel.headTimeStamp + this.curReel.durationMs,
                        o = s.Nums.MapTo(t, n, i);
                    if (t >= this.trackPos)
                        for (; this.replayIndex < this.curReel.tailIndex;) {
                            if (r = this.packets[this.replayIndex]) {
                                if (r.timeStamp >= o)
                                    break;
                                this.nodeMan.DecodeFrame(r.buffer, !1, e)
                            }
                            this.replayIndex++
                        }
                    else
                        for (; this.replayIndex > this.curReel.headIndex;) {
                            var r;
                            if (r = this.packets[this.replayIndex]) {
                                if (r.timeStamp <= o)
                                    break;
                                this.nodeMan.DecodeFrame(r.buffer, !1, e)
                            }
                            this.replayIndex--
                        }
                    e && this.nodeMan.SyncGameViewToModel(),
                        this.trackPos = t,
                        this.UpdateTrackPosText()
                }
            },
                t.prototype.ShiftTrackPositionLittle = function(t) {
                if (this.curReel) {
                    var e = 100 * t / this.curReel.durationMs,
                        n = s.Nums.Clamp(this.trackPos + e, 0, 1);
                    this.SeekReplayPosTo(n, !1)
                }
            },
                t.prototype.StartReplayMode = function(t) {
                l.gs.gstates.isReplayMode = !0,
                    this.trackPos = 0,
                    this.replayIndex = this.curReel.headIndex,
                    this.FeedStoredPackets(0, this.curReel.headIndex),
                    t && (this.isPlayback = !0,
                          this.ReplayLoopProc())
            },
                t.prototype.EndReplayMode = function() {
                this.FeedStoredPackets(0, this.packets.length),
                    this.isPlayback = !1,
                    this.trackPos = 0,
                    l.gs.gstates.isReplayMode = !1,
                    this.UpdateTrackPosText(),
                    this.reqMainPanelShownAfterPlayback && (l.gs.gstates.setMainPanelVisible(!0),
                                                            this.reqMainPanelShownAfterPlayback = !1)
            },
                t.prototype.ReplayLoopProc = function() {
                if (this.curReel) {
                    var t = 17 / this.curReel.durationMs * this.replaySpeedRate;
                    this.SeekReplayPosTo(this.trackPos + t, !1),
                        this.trackPos < 1 ? this.isPlayback && setTimeout(this.ReplayLoopProc.bind(this), 17) : this.isAutoShiftToNextReel && this.curReelIndex < this.reels.length - 1 ? this.ShiftCurrentReel(1, !0) : this.EndReplayMode(),
                        this.Notify()
                }
            },
                t.prototype.FeedStoredPackets = function(t, e) {
                this.isLoading = !0,
                    0 == t && this.nodeMan.ResetToInitialiState();
                for (var n = a.OpcodeGroups.PermanentKeeped, i = t; i < e; i++) {
                    var o = this.packets[i];
                    if (o) {
                        o.opcode;
                        n.indexOf(o.opcode) >= 0 && this.nodeMan.DecodeFrame(o.buffer, !1, !0)
                    }
                }
                this.isLoading = !1
            },
                t.prototype.TogglePause = function() {
                this.isReplayMode && (this.isPlayback = !this.isPlayback,
                                      this.isPlayback && this.ReplayLoopProc())
            },
                t.prototype.TogglePlayback = function() {
                null != this.curReel && (this.isRecording || (this.isReplayMode ? this.TogglePause() : (this.reqMainPanelShownAfterPlayback = l.gs.gstates.isMainPanelVisible,
                                                                                                        this.StartReplayMode(!0),
                                                                                                        l.gs.gstates.setMainPanelVisible(!1))))
            },
                t
        }();
    e.DataRecorder = h
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var c = n(1),
        s = n(3),
        v = n(4),
        i = n(0).gs.uconfig,
        g = n(0).gs.uconfig,
        h = function() {
            function t() {
                this.colors = [0, 0],
                    this.skinUrls = ["", ""]
            }
            return Object.defineProperty(t.prototype, "fullName", {
                get: function() {
                        if (i.ShowTripKey && this.tripKey && this.tripKey != "aaaa") {
                            return this.team + this.name + "(" + this.tripKey + ")";
                        } else {
                            return this.team + this.name;
                        }
                },
                enumerable: !0,
                configurable: !0
            }),
                Object.defineProperty(t.prototype, "leaderBoardName", {
                get: function() {
                        return this.team + this.name;
                },
                enumerable: !0,
                configurable: !0
            }),
                Object.defineProperty(t.prototype, "miniMapName", {
                get: function() {
                    if (i.ShowMapTripKey && i.ShowMapName && this.tripKey && this.tripKey != "aaaa") {
                        return this.team + this.name + "(" + this.tripKey + ")"
                    } else if (!i.ShowMapTripKey && !i.ShowMapName) {
                        return ""
                    } else if (i.ShowMapTripKey && !i.ShowMapName) {
                        return "(" + this.tripKey + ")"
                    } else {
                        return /*this.team + */this.name
                    }
                },
                enumerable: !0,
                configurable: !0
            }),
                t.prototype.Initialize = function(t, e, n) {
                this.clientId = t,
                    this.isBot = e,
                    this.tripKey = n,
                    this.name = "",
                    this.team = "",
                    this.teamId = 0;
                this.nameText = new PIXI.Text;
            let _i = this.nameText.style;
                _i.fontWeight = "600",
                _i.lineJoin = "round";
                for (var i = 0; i < 2; i++)
                    this.colors[i] = 0,
                        this.skinUrls[i] = ""
            },
                t.prototype.SetProps = function(t, e, n, i, o,a) {
                this.name != (this.name = t),
                    this.team != e && (this.team = e),
                    this.teamId != n && (this.teamId = n),
                    this.skinUrls[0] != i && (this.skinUrls[0] = i),
                    this.skinUrls[1] != o && (this.skinUrls[1] = o),
                    this.tripKey != a && a!="" && (this.tripKey = a)
            },
                t.prototype.SetColor = function(t, e) {
                this.colors[t] = e
            },
                t.prototype.UpdateNameText = function() {
                this.nameText.text = this.fullName;
                let t = this.nameText.style;
                let e = 100 * 2 << g.RenderQuality;
                t.fontSize = .13 * e >> 0;
                t.strokeThickness = .015 * e >> 0;
                t.fontFamily = gVar.globalFont;
                t.stroke = "#000000"
                let i = v.gameCore.uMan.GetTeamInfoById(this.teamId).colorStr;
                if (this.isBot) {
                    t.fill = "#999999";
                    t.stroke = "#000000"
                }else {
                    t.fill = i;
                    t.stroke = "#000000"
                }
                this.nameText.updateText()
        }
        ,
                t
        }();
    e.TUserInfoData = h;
    var r = function() {
        function t() {}
        return t.prototype.Initialize = function(t, e, n) {
            this.teamId = t,
                this.teamName = e,
                this.section = n,
                this.color = 0,
                this.colorStr = "#000"
        },
            t.prototype.SetColor = function(t) {
            this.color = t,
                this.colorStr = s.ColorHelper.ColorToHtmlString(t)
            if (v.gameCore) {
                v.gameCore.uMan.userInfos.forEach(t=>{
                    if (t.teamId == this.teamId) {
                        t.UpdateNameText()
                    }
                }
                )
            }
        },
            t
    }();
    e.TTeamInfoData = r;
    var o = function() {
        function t() {
                this.userInfos = new Map,
                this.teamInfos = new Map;
                this.fallbackTeamInfo = new r,
                this.fallbackTeamInfo.Initialize(-1, "", "**"),
                this.fallbackTeamInfo.SetColor(4456448),
                this.fallbackUserInfo = new h,
                this.fallbackUserInfo.Initialize(-1, !1, "ERR"),//?
                this.fallbackUserInfo.SetProps("ERR", "ERR", -1, "", ""),
                this.fallbackUserInfo.SetColor(0, 4456448),
                this.fallbackUserInfo.SetColor(1, 4456448),
                this.selfTeamInfo = this.fallbackTeamInfo
        }
        return t.prototype.Reset = function() {
            this.selfUserId = 0,
                this.selfTeamInfo = this.fallbackTeamInfo,
                this.userInfos.clear(),
                this.teamInfos.clear()
        },
            t.prototype.PostSelfUserId = function(t) {
            this.selfUserId = t
        },
            t.prototype.PostUserInfoData = function(t, e, n, i, o, r, s, a,tab) {
                void 0 === s && (s = null),
                void 0 === a && (a = null);
                var l = this.userInfos.get(t);
                    l || (c.Utils.Confirm(null != s && null != a),
                      (l = new h).Initialize(t, s, a),
                      this.userInfos.set(t, l)),
                    l.SetProps(e, n, i, o, r, a),
                    l.isBot = s,
                    l.clientId == this.selfUserId && (this.selfTeamInfo = this.GetTeamInfoById(l.teamId))
                    l.UpdateNameText()
        },
            t.prototype.PostUserLeave = function(t,tab) {
                this.userInfos.delete(t),
                this.userLeavedProc && this.userLeavedProc(t)
        },
            t.prototype.PostPlayerColorData = function(t, e, tab) {
            var n = s.GameHelper.DecodePlayerId(t),
                    i = n[0],
                    o = n[1],
                    r = this.userInfos.get(i);
                r && r.SetColor(o, e)
            
        },
            t.prototype.PostTeamInfoData = function(t, e, n, i, tab) {
            void 0 === n && (n = null),
            void 0 === i && (i = null);
            var o = this.teamInfos.get(t);
            o || (c.Utils.Confirm(null != n && null != i),
                  (o = new r).Initialize(t, n, i),
                  this.teamInfos.set(t, o)),
                o.SetColor(e)
            
        },
            t.prototype.PostTeamInfoRemoval = function(t,tab) {
            this.teamInfos.delete(t)
        },
            t.prototype.ClearUserInfos = function() {
            this.userInfos.clear()
        },
            t.prototype.GetUserInfoById = function(t) {
            return t &= 65534,
                this.userInfos.get(t) || this.fallbackUserInfo
        },
            t.prototype.GetTeamInfoById = function(t) {
            return this.teamInfos.get(t) || this.fallbackTeamInfo
        },
            t.prototype.GetCellColorForPlayer = function(t) {
            var e = 1 & t;
            return this.GetUserInfoById(t).colors[e]
        },
            t.prototype.GetSkinUrlForPlayer = function(t) {
            var e = 1 & t;
            return this.GetUserInfoById(t).skinUrls[e]
        },
            t.prototype.GetTeamInfoForUser = function(t) {
            t &= 65534;
            var e = this.GetUserInfoById(t);
            return this.GetTeamInfoById(e.teamId)
        },
            t.prototype.GetPlayerIdsAvailable = function() {
            var e = [];
            return this.userInfos.forEach(function(t) {
                !t.isBot && "dead" != t.name && t.skinUrls[0] && t.colors[0] && e.push(t.clientId)
            }),
                e
        },
            t
    }();
    e.UserInfoManager = o
}, function(t, e, n) {
    "use strict";
    var i, o = this && this.__extends || (i = Object.setPrototypeOf || {
        __proto__: []
    }
                                          instanceof Array && function(t, e) {
        t.__proto__ = e
    } ||
                                          function(t, e) {
        for (var n in e)
            e.hasOwnProperty(n) && (t[n] = e[n])
    },
                                          function(t, e) {
        function n() {
            this.constructor = t
        }
        i(t, e),
            t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
                                                           new n)
    }
                                         ),
        r = this && this.__decorate || function(t, e, n, i) {
            var o, r = arguments.length,
                s = r < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, n) : i;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
                s = Reflect.decorate(t, e, n, i);
            else
                for (var a = t.length - 1; a >= 0; a--)
                    (o = t[a]) && (s = (r < 3 ? o(s) : r > 3 ? o(e, n, s) : o(e, n)) || s);
            return r > 3 && s && Object.defineProperty(e, n, s),
                s
        };
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var _o = n(3),
        s = n(5),
        a = n(4),
        l = n(0),
        c = n(2),
        h = n(28),
        d = n(27),
        u = n(26),
        p = n(23),
        f = n(22),
        //g = n(21),
        //m = n(20),
        //y = n(19),
        v = n(18);
        //S = n(17),
        //b = n(16);
    p.ReplayControlBarTag,
        f.GameOverlayTag,
        //g.LeftConfigPanelTag,
        //m.UserEntryPanelTag,
        //y.ServerListRootTag,
        v.MainPanelTag,
        //S.MainConfigPanelTag,
        //b.ColorConfigPanelTag,
        n(15).SkinFilterPanelTag;
    var C = function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.gstates = l.gs.gstates,
                t.uconfig = l.gs.uconfig,
                t.cconfig = l.gs.ucolors,
                t.appConfig = c.AppConfigurator.instance,
                t.hasNewPrivateMessage = !1,
                t.newPrivateMessageSkinUrl = "",
                t.newPrivateMessageText = "",
                t.cssColors = l.gs.ucolors.cssColors,
                t
        }
        return o(t, e),
            t.prototype.onChatIconClicked = function(t) {
            window.open("unichat/chat.html", "uni-chat", "width=800, height=600, menubar=no, toolbar=no, scrollbars=no"),
                t.stopPropagation()
        },
            t.prototype.onSkinFilterButton = function(t) {
            this.gstates.isSkinFilterPanelVisible = !this.gstates.isSkinFilterPanelVisible,
                t.stopPropagation()
        },
            t.prototype.mounted = function() {
            setTimeout(this.InitializeAfterAllMounted.bind(this), 1)
        },
            t.prototype.InitializeAfterAllMounted = function() {
            var i = this;
            l.gs.gstates.mainPanelVisibleChangedProc = this.update.bind(this),
                l.gs.uconfig.RegisterChangedProc("ShowReplayBar", this.update.bind(this));
            var n = new u.GameViewDomain2.GameView;
            a.gameCore.Initialize(),
                n.Initialize(),
                a.gameCore.serverListModel ? a.gameCore.serverListModel.Start() : (l.gs.gstates.chatRoomSig = c.AppConfigurator.instance.uniChatServerSignature,
                                                                                   a.gameCore.ConnectToGameServer());
            var o = new h.MapView,
                r = new d.TeamRankingChartView;
            o.Initialize(this.refs.game_overlay.refs.map_canvas),
                r.Initialize(this.refs.game_overlay.refs.lb_chart_canvas),
                a.gameCore.gameHudModel.Initialize(),
                n.StartAnimation(),
                a.gameCore.chatAppModel && (a.gameCore.chatAppModel.chatNotificationBadgeProc = function(t, e, n) {
                i.hasNewPrivateMessage = t,
                    n ? (i.newPrivateMessageSkinUrl = e,
                         i.newPrivateMessageText = n) : (i.newPrivateMessageSkinUrl = "",
                                                         i.newPrivateMessageText = ""),
                    i.update()
            }),
                l.gs.gstates.playerDeadCallbackProc = function() {
                !l.gs.uconfig.HideMenuAfterDeath && l.gs.gstates.setMainPanelVisible(!0);
            }
        },
            t = r([s.template(`\n
<app-root>
    <style>
@keyframes rainbow_background {
    100%,
    0% {
    background-color: #ff4242
    }
    8% {
    background-color: #ffa74f
    }
    16% {
    background-color: #ffff67
    }
    25% {
    background-color: #a3ff48
    }
    33% {
    background-color: #46ff46
    }
    41% {
    background-color: #50fda6
    }
    50% {
    background-color: #55fcfc
    }
    58% {
    background-color: #4aa3fc
    }
    66% {
    background-color: #4242ff
    }
    75% {
    background-color: #a54dfd
    }
    83% {
    background-color: #ff4dff
    }
    91% {
    background-color: #ff4ba5
    }
    }
        app-root {
            font-family: ${gVar.globalFont};
            font-size: 18px;
            user-select: none;
        }

        @font-face {
            font-family: 'CustomFont1';
            src: url('gr/Xolonium-Regular.ttf') format('truetype');
        }

        @font-face {
            font-family: 'CustomFont2';
            src: url('gr/ReFormation Sans Regular.ttf') format('truetype');
        }

        @font-face {
            font-family: 'IconFont1';
            src: url('gr/icomoon.ttf') format('truetype');
        }

        .clear_both {
            clear: both;
        }

        .page_root {
            width: 100%;
            height: 100%;
            position: fixed;
        }

        #game_control_overlay {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
        }

        .replay_bar_area_outer {
            position: absolute;
            top: 0;
            width: 100%;
            text-align: center;
        }

        #psudo_cursor {
            position: absolute;
            top: 0;
            left: 0;
            display: none;
        }

        #psudo_cursor>img {
            position: absolute;
        }

        #game_front_control_overlay {
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
            _background-color: #F00;
        }

        .ex_chat_icon_box {
            position: absolute;
            top: 6px;
            left: 10px;
            _display: none;
        }

        #ex_chat_icon {
            background-color: rgba(255, 255, 255, 1);
            width: 45px;
            height: 30px;
            border-radius: 2px;
            border: solid 1px #08F;
            cursor: pointer;
            color: #444;
            text-align: center;
            line-height: 24px;
            padding: 1px;
            z-index: 300;
        }
        #ex_chat_badge {
            position: absolute;
            width: 16px;
            height: 16px;
            left: 36px;
            top: -10px;
            z-index: 301;
            display: visible;
        }
        .skin_filter_button {
            position: absolute;
            top: 6px;
            right: 6px;
            border-radius: 2px;
            background-color: #FFF;
            border: solid 1px #F0A;
            color: #F0A;
            width: 24px;
            height: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            font-family: IConFont1;
        }

        .ex_chat_new_message_outer {
            position: absolute;
            width: 200px;
            height: 50px;
            left: 60px;
            top: 6px;
            z-index: 302;
            display: visible;
            background-color: #FFF0F0;
            border: solid 1px #F44;
            color: #666;
            font-size: 13px;
            padding: 4px;
            cursor: pointer;
        }

        .ex_chat_new_message {
            position: relative;
        }

        .ex_chat_new_message>* {
            position: absolute;
        }

        .ex_chat_new_message>img {
            width: 30px;
            height: 30px;
            border-radius: 4px;
            top: 0;
            left: 0;
        }

        .ex_chat_new_message>div.textpart {
            width: calc(100% - 40px);
            overflow: hidden;
            top: 0;
            left: 34px;
        }
    </style>
    <div class="page_root" spellcheck="false" style="background-color: {cconfig.cssColors.clGameBackground}; color: {cconfig.cssColors.clGameForeground};">
        <div id="game_canvas_layer"><canvas id="game_canvas_layer_main" ref="game_canvas_layer_main" /></div>
        <div id="game_hud_layer">
            <game-overlay id="game_overlay" ref="game_overlay" />
            <div id="psudo_cursor"><img src="gr/cursor.png" id="psudo_cursor_img_off" /><img src="gr/cursor_red.png" id="psudo_cursor_img_on" /></div>
        </div>
        <main-panel show={gstates.isMainPanelVisible} id="main_panel" ref="main_panel" />
        <div class="replay_bar_area_outer" show={uconfig.ShowReplayBar}>
            <replay-control-bar />
        </div>
        <div class="ex_chat_icon_box" show={appConfig.useUniChat}>
            <div id="ex_chat_icon" onmousedown={onChatIconClicked}><img src="gr/chat_icon32.png" style="height:100%" /></div>
            <div id="ex_chat_badge" show={hasNewPrivateMessage}><img src="gr/msg_badge.png" style="width:100%" /></div>
        </div>
        <div class='ex_chat_new_message_outer' onmousedown={onChatIconClicked} show={hasNewPrivateMessage}>
            <div class='ex_chat_new_message'><img src={newPrivateMessageSkinUrl} />
                <div class='textpart'>{newPrivateMessageText}</div>
            </div>
        </div>
        <div class="skin_filter_button" onclick={onSkinFilterButton} show={appConfig.isJapanese}>&#xe90d</div>
        <skin-filter-panel show={gstates.isSkinFilterPanelVisible} /><img src="gr/error.png" id="img_no_image_fallback" style="display:none" />\n</app-root>
        `)], t)
    }(s.Element);
    e.AppRootTag = C,
        e.InitializeView = function() {
        var t = C.createElement();
        document.body.appendChild(t)
        $('.tab').css('opacity',0.3)
        var allInputs = $('.jscolor');
        allInputs.each(function(i){
            new jscolor(this,{format: 'hexa',previewElement:'#'+$(this).attr("name"),width:80,position:'bottom', height:80, backgroundColor:'#333',hideOnPaletteClick:true})
            $(this).css("margin-left","10px");
            $(this).css("font-size","14px");
    });
    }
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = n(39),
        o = n(2);
    window.onload = function() {
        console.log("LWGA-R A121a0 20230718");
        var t = "ja" == navigator.language.slice(0, 2);
        o.AppConfigurator.instance.allowOnlyForJapaneseLangUser && !t ? document.body.innerHTML = "このページは現在国内ユーザ向けに提供しています。日本語環境以外ではページが表示されないようになっています。" : i.InitializeView()
    }
}]);