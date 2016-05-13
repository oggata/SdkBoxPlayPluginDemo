var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        cc.log("Sample Startup")

        this.createTestMenu();

        var winsize = cc.winSize;

        var logo = new cc.Sprite("res/Logo.png");
        var logoSize = logo.getContentSize();
        logo.x = logoSize.width / 2;
        logo.y = winsize.height - logoSize.height / 2;
        this.addChild(logo);

        return true;
    },

    createTestMenu:function() {

        var size = cc.Director.getInstance().getWinSize();
        var score = 1000;
        var menu = new cc.Menu(
            new cc.MenuItemFont("Connect", function() {
                sdkbox.PluginSdkboxPlay.signin();
            }),
            new cc.MenuItemFont("Disconnect", function() {
                sdkbox.PluginSdkboxPlay.signout();
            }),
            new cc.MenuItemFont("Show Leaderboard high_score_ranking", function() {
                sdkbox.PluginSdkboxPlay.showLeaderboard("high_score_ranking");
            }),
            new cc.MenuItemFont("Achievements", function() {
                sdkbox.PluginSdkboxPlay.showAchievements();
            }),
            new cc.MenuItemFont("Unlock get_10_items", function() {
                sdkbox.PluginSdkboxPlay.unlockAchievement("get_10_items");
            }),
            new cc.MenuItemFont("Unlock get_20_items", function() {
                sdkbox.PluginSdkboxPlay.unlockAchievement("get_20_items");
            }),
            new cc.MenuItemFont("Submit Score 1000", function() {
                sdkbox.PluginSdkboxPlay.submitScore("high_score_ranking", 1000);
            })
        );

        menu.alignItemsVerticallyWithPadding(5);
        menu.x = size.width/2;
        menu.y = size.height/2;
        this.addChild(menu);

        var initSDK = function() {
            if ("undefined" == typeof(sdkbox)) {
                console.log("sdkbox is not exist")
                return
            }

            if ("undefined" != typeof(sdkbox.PluginSdkboxPlay)) {
                var plugin = sdkbox.PluginSdkboxPlay
                plugin.setListener({
                    onScoreSubmitted : function (leaderboard_name, score, maxScoreAllTime, maxScoreWeek, maxScoreToday) {
                        cc.log("on score " + score + " submitted to leaderboard: " + leaderboard_name);
                        cc.log("all time hi " + maxScoreAllTime ? 1 : 0 );
                        cc.log("weekly hi " + maxScoreWeek ? 1 : 0 );
                        cc.log("daily hi " + maxScoreToday ? 1 : 0 );
                    },
                    onIncrementalAchievementUnlocked : function (achievement_name) {
                        cc.log("incremental achievement " + achievement_name + " unlocked.");
                    },
                    onIncrementalAchievementStep : function (achievement_name, step) {
                        cc.log("incremental achievent " + achievement_name + " step: " + step);
                    },
                    onAchievementUnlocked : function (achievement_name, newlyUnlocked) {
                        cc.log("achievement " + achievement_name + " unlocked (new " + newlyUnlocked ? 1 : 0 + ")");
                    },
                    onConnectionStatusChanged : function (connection_status) {
                        CCLOG("connection status change: " + connection_status + " connection_status");            
                    }
                });
                plugin.init();
                
            } else {
                printf("no plugin init")
            }
        }

        initSDK();
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});