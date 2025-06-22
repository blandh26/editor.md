(function () {

	// 插件工厂函数
	var factory = function (exports) {
		var $ = jQuery; // 引入 jQuery
		var pluginName = "emoji-dialog"; // 插件名称
		var classPrefix = "editormd-emoji"; // 样式类名前缀
		// Emoji 表情集合
		var emojiSet = [
			"😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃", "🫠", "😉", "😊", "😇", "🥰", "😍", "😴", "😱",
			"🤩", "😘", "😗", "😚", "😙", "🥲", "😋", "😛", "😜", "🤪", "😝", "🤑", "🤗", "🤭", "🫢", "🫣", "🤫", "🤔",
			"🫡", "🤐", "🤨", "😐", "😑", "😶", "🫥", "😶‍🌫️", "😏", "😒", "🙄", "😬", "😮‍💨", "🤥", "😌", "😔", "😪", "🤤",
			"😷", "🤒", "🤕", "🤢", "🤮", "🤧", "🥵", "🥶", "🥴", "😵", "😵‍💫", "🤯", "🤠", "🥳", "🥸", "😎", "🤓", "🧐",
			"😕", "🫤", "😟", "🙁", "☹", "😮", "😯", "😲", "😳", "🥺", "🥹", "😦", "😧", "😨", "😰", "😥", "😢", "😭",
			"😖", "😣", "😞", "😓", "😩", "😫", "🥱", "😤", "😡", "😠", "🤬", "😈", "👿", "💀", "☠", "💩", "🤡", "👹",
			"👺", "👻", "👽", "👾", "🤖", "🙈", "🙉", "🙊", "💌", "💪", "🦵", "🦷", "🦴", "👀", , "💭", "💤", "👋", "🗯",
			"💘", "💝", "💖", "💗", "💓", "💞", "💕", "💟", "❣", "💔", "❤️‍🔥", "❤️‍🩹", "💋", "💯", "💬", "👁️‍🗨️", "🗨", "👉", "🫵",
			"🤚", "🖐", "👌", "🤌", "🤏", "✌", "🤞", "🫰", "🤟", "🤘", "🤙", "👈", , "👏", "🙌", "🫶", "🤝", "✊", "👍",
			"👊", "👅", "👄", "🫦", "🥷", "👫", "👨‍👩‍👧", "👨‍👩‍👧‍👦", "🐷", "🦊", "🐱", "🐵", "🐒", "🐁", "🐔", "🦆", "🦢", "🐇",
			"🥩", "🍔", "🍟", "🍕", "🌭", "🥪", "🌮", "🍳", "🥘", "🍲", "🍿", "🧈", "🧂", "🍱", "🍙", "🍚", "🍛", "🍜",
			"🍝", "🍡", "🥟", "🍦", "🍧", "🍨", "🎂", "🍰", "🍭", "🍼", "🥛", "☕", "🍺", "🍻", "🥂", "🥤", "🧋", "🌍",
			"🌐", "🗺", "🧭", "🏘", "🏥", "🏦", "⛲", "⛺", "🚝", "🚌", "🚐", "🚒", "🚓", "🚕", "🚗", "🚙", "🛻", "🚚",
			"🚜", "🏍", "🚲", "🛴", "🛹", "🛼", "⛽", "🚨", "🚥", "🚧", "🚢", "🛫", "🚁", "🚟", "🛰", "🎉", "🎊", "🎎",
			"🎁", "🎖", "🏆", "🏅", "🥇", "🥈", "🥉", "⚽", "⚾", "🏀", "🏐", "🎾", "🎳", "🏓", "🏸", "🥊", "🥋", "🥅", "🎱",
			"🎮", "🎰", "🎲", "♟", "🀄", "🎴", "🖼", "🦺", "🩱", "🩲", "🩳", "👙", "🎷", "🪗", "🎸", "📟", "📠", "🔋", "🪫",
			"💻", "🖥", "🖨", "⌨", "🖱", "🎥", "🎞", "📽", "🎬", "📺", "📸", "📹", "📼", "🔍", "📒", "💰", "💵", "💳",
			"📧", "📝", "💼", "📈", "📉", "📊", "📋", "📌", "📍", "💉", "🩸", "💊", "🚽", "🚿", "🛁", "🧻", "🪥", "🛒", "🚬",
			"⛔", "🚫", "🚳", "🚭", "🚯", "🚱", "🚷", "📵", "🔞", "☢", "☣", "✅", "☑", "✔", "❌", "❎", "🔴", "🟠",
			"🟡", "🟢", "🔵", "🟣", "🟤", "⚫", "⚪"
		];

		// 多语言支持
		var langs = {
			"zh-cn": {
				toolbar: { emoji: "Emoji 表情" },
				dialog: { emoji: { title: "Emoji 表情" } },
				buttons: { enter: "插入", cancel: "取消" }
			},
			"en": {
				toolbar: { emoji: "Emoji" },
				dialog: { emoji: { title: "Emoji" } },
				buttons: { enter: "Insert", cancel: "Cancel" }
			}
		};

		exports.fn.emojiDialog = function () { // 注册插件方法
			var _this = this; // 当前编辑器实例
			var cm = this.cm; // CodeMirror 对象
			var settings = _this.settings; // 编辑器配置
			var editor = this.editor; // 编辑器 DOM 容器
			var classPrefix = this.classPrefix; // 类名前缀
			var lang = langs[this.lang.name] || langs["en"]; // 获取语言配置

			// 若未启用 emoji 则退出
			if (!settings.emoji) {
				alert("Emoji disabled in settings");
				return;
			}

			var dialogName = classPrefix + pluginName; // 弹窗名称
			var dialog; // 弹窗 DOM 对象

			// 插入表情后自动关闭弹窗
			const insertEmojiAndClose = (emoji) => {
				cm.replaceSelection(emoji);                       // 插入 emoji
				dialog.hide().lockScreen(false).hideMask();       // 关闭弹窗
			};

			// 弹窗 HTML 内容（响应式布局 + 滚动）
			var dialogContent = `
                <div class="${classPrefix}emoji-dialog-content"
                     style="display: flex; flex-wrap: wrap; gap: 10px; padding: 10px; box-sizing: border-box; max-height: 70vh; overflow-y: auto;">
                    ${emojiSet.map(e => `<span class="${classPrefix}emoji-item"
                                            style="font-size: min(8vw, 36px); cursor: pointer;">${e}</span>`).join("")}
                </div>
            `;

			cm.focus(); // 聚焦编辑器

			// 如果弹窗已存在，则显示
			if (editor.find("." + dialogName).length > 0) {
				dialog = editor.find("." + dialogName);
				this.dialogShowMask(dialog);
				this.dialogLockScreen();
				dialog.show();
				return;
			}

			// 创建新弹窗
			dialog = this.createDialog({
				name: dialogName,                                // 弹窗名称
				title: lang.dialog.emoji.title,                  // 弹窗标题
				width: "90%",                                    // 宽度响应式
				height: "auto",                                  // 高度自动
				mask: settings.dialogShowMask,                   // 遮罩
				drag: true,                                      // 可拖动
				lockScreen: settings.dialogLockScreen,           // 锁屏滚动
				content: dialogContent,                          // HTML 内容
				maskStyle: {
					opacity: settings.dialogMaskOpacity,         // 遮罩透明度
					backgroundColor: settings.dialogMaskBgColor  // 遮罩背景
				},
				buttons: {
					// 取消按钮逻辑
					cancel: [lang.buttons.cancel, function () {
						this.hide().lockScreen(false).hideMask();
						return false;
					}]
				}
			});

			// 绑定单击和双击插入表情事件
			dialog.find("." + classPrefix + "emoji-item").on("click dblclick", function () {
				const emoji = $(this).text();                    // 获取选中的 emoji 表情
				insertEmojiAndClose(emoji);                      // 插入并关闭
			});
		};
	};

	// Node.js / CommonJS 环境支持
	if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
		module.exports = factory;
	}

	// AMD / CMD 支持
	else if (typeof define === "function") {
		if (define.amd) {
			define(["editormd"], factory); // RequireJS
		} else {
			define(function (require) {
				factory(require("./../../editormd")); // SeaJS
			});
		}
	}

	// 浏览器模式
	else {
		factory(window.editormd);
	}

})();
