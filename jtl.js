/*
	Author: koh-ymmt
	License: MIT License
	永久にベータ版です
*/	

const JTL = {

	charClass: {
		// https://www.w3.org/TR/jlreq/#character_classes
		// cl-01 始め括弧類
		cl01_openingBrackets: "（〔［｛〈《「『【｟〘〖",
		// cl-02 終わり括弧類
		cl02_closingBrackets: "）〕］｝〉》」』】｠〙〗",
		// cl-03 ハイフン類
		cl03_hyphens: "\\u2010" + // ハイフン（四分）
			"\\u301c" + // 波ダッシュ
			"\\u30a0" + // 二重ハイフン
			"\\u2013", // 二分ダーシ
		// cl-04 区切り約物
		cl04_dividingPunctuationMarks: "！？‼⁇⁈⁉",
		// cl-05 中点類
		cl05_middleDots: "・：；",
		// cl-06 句点類
		cl06_fullStops: "。．",
		// cl-07 読点類
		cl07_commas: "、，",
		// cl-08 分離禁止文字
		cl08_inseparableChars: "—―…‥〳〴〵",
		// cl-09 繰返し記号
		cl09_iterationMarks: "ヽヾゝゞ々〻",
		// cl-10 長音記号
		cl10_prolongedSoundMark: "ー",
		// cl-11 小書きの仮名
		cl11_smallKana: "ぁぃぅぇぉァィゥェォっゃゅょゎゕゖッャュョヮヵヶㇰㇱㇲㇳㇴㇵㇶㇷㇸㇹㇺㇻㇼㇽㇾㇿㇷ゚",
		// cl-12 前置省略記号
		cl12_prefixedAbbrs: "￥＄￡＃€№",
		// cl-13 後置省略記号
		cl13_postfixedAbbrs: "°′″℃￠％‰㏋ℓ㌃㌍㌔㌘㌢㌣㌦㌧㌫㌶㌻㍉㍊㍍㍑㍗㎎㎏㎜㎝㎞㎡㏄",
		// cl-14 和字間隔
		cl14_fullSpace: "　",
		cl15: undefined,
		cl16: undefined,
		cl17: undefined,
		cl18: undefined,
		cl19: undefined,
		cl20: undefined,
		cl21: undefined,
		cl22: undefined,
		cl23: undefined,
		cl24: undefined,
		cl25: undefined,
		// cl-26 欧文間隔
		cl26_westernSpace: "\\u0020",
		// cl-27 欧文用文字（欧文間隔・括弧類・数字を除く）
		cl27_westernChars: "\\u0000\-\\u0019" +
			"\\u0021\-\\u0027" +
			"\\u002a\-\\u002f" +
			"\\u003a\-\\u005a\\u005c" +
			"\\u005e\-\\u007a\\u007c" +
			"\\u007e\-\\u007f" + // Basic Latin
			"\\u0080\-\\u00aa" +
			"\\u00ac\-\\u00ba" +
			"\\u00bd\-\\u00ff" + // Latin-1 Supplement
			"\\u0100\-\\u017f" + // Latin Extended-A
			"\\u0180\-\\u024f" + // Latin Extended-B
			"\\u0250\-\\u02af" + // IPA Extensions
			"\\u02b0\-\\u02ff" + // Spacing Modifier Letters
			"\\u0300\-\\u036f" + // Combining Diacritical Marks
			"\\u0370\-\\u03ff" + // Greek and Coptic
			"\\u0400\-\\u04ff" + // Cyrillic
			"\\u0500\-\\u052f" + // Cyrillic Supplement
			"\\u2000\-\\u2017" +
			"\\u201a\-\\u201b" +
			"\\u201e\-\\u2038" +
			"\\u203b\-\\u206f", // General Punctuation
		cl28: undefined,
		cl29: undefined,
		cl30: undefined,
		westernOpeningBrackets:	"\\u2018" + // 単一引用符
			"\\u201c" + // 二重引用符
			"\\u0028" + // 丸括弧
			"\\u005b" + // 角括弧
			"\\u007b" + // 波括弧
			"\\u2039" + // 単一ギュメ
			"\\u00ab", // 二重ギュメ
		westernClosingBrackets:	"\\u2019" + // 単一引用符
			"\\u201d" + // 二重引用符
			"\\u0029" + // 丸括弧
			"\\u005d" + // 角括弧
			"\\u007d" + // 波括弧
			"\\u203a" + // 単一ギュメ
			"\\u00bb", // 二重ギュメ
		westernNumbers: "\\d"
	},



	ignoredTag: "pre|code|kbd|samp|script",
	


	htmlClassPrefix: "jtl-",

	htmlClass: {

		all: "all",

		bracOpen: "bracOpen",
		bracClose: "bracClose",
		punctuation: "punctuation",
		midDot: "midDot",
		fullSpace: "fullSpace",
		westernChars: "westernChars",
		westernBracOpen: "westernBracOpen",
		westernBracClose: "westernBracClose",
		westernNumbers: "westernNumbers",

		lineHead: "lineHead",
		lineEnd: "lineEnd",
		paragraphHead: "paragraphHead",
		paragraphEnd: "paragraphEnd",
		noSpaceBefore: "noSpaceBefore",
		noSpaceAfter: "noSpaceAfter"

	},



	compose: function( selector, options ) {
		const start = performance.now();

		const targetElements = document.querySelectorAll(selector);

		const isResizeObserverEnabled = options && ("observeResize" in options) ? Boolean(options.observeResize) : false;
		const isWesternBracketSpacingEnabled = options && ("westernBracketSpacing" in options) ? Boolean(options.westernBracketSpacing) : false;
		const rgxStr_noMarginEnforced = options && ("noMargin" in options) ? options.noMargin : "";

		// HTMLクラス名リスト
		const htmlClass = (() => {
			const obj = {};
			for (let key in JTL.htmlClass) {
				obj[key] = JTL.htmlClassPrefix + JTL.htmlClass[key];
			}
			return obj;
		})();

		const charClass = JTL.charClass;
		const rgxStr_htmlComment = "<!--[\\s\\S\]*?-->";
		const rgxStr_htmlTag = "<\\/?[^>]+?\\/?>";
		const rgx_htmlTag = new RegExp(`${rgxStr_htmlTag}`);
		const rgx_htmlTagDividor = new RegExp(`${rgxStr_htmlComment}|${rgxStr_htmlTag}|[^<>]+`, "gi");
		const rgx_ignoredTag = new RegExp(`^<(${JTL.ignoredTag})[\\s>]`, "i");
		const rgx_notTextSlice = new RegExp(`${rgxStr_htmlComment}|${rgxStr_htmlTag}|^\\s+$`);
		const rgx_westernSpace = new RegExp(`[${charClass.cl26_westernSpace}]+`);
		const rgx_inseparable = new RegExp(`[${charClass.cl08_inseparableChars}]`);
		const rgx_bracOpen = new RegExp(`[${charClass.cl01_openingBrackets}]`);
		const rgx_bracClose = new RegExp(`[${charClass.cl02_closingBrackets}]`);
		const rgx_punctuation = new RegExp(`[${charClass.cl06_fullStops}${charClass.cl07_commas}]`);
		const rgx_midDot = new RegExp(`[${charClass.cl04_dividingPunctuationMarks}${charClass.cl05_middleDots}]`);
		const rgx_fullSpace = new RegExp(`[${charClass.cl14_fullSpace}]`);
		const rgxStr_jtlAll = "([" +
			charClass.cl26_westernSpace + charClass.cl27_westernChars + "]\+)|([" + // 欧文スペースまたは欧文文字の連続
			charClass.westernNumbers + "]\+)|([" + // 半角数字の連続
			charClass.westernOpeningBrackets + "])|([" + // 半角始め括弧
			charClass.westernClosingBrackets + "])|([" + // 半角終わり括弧
			charClass.cl01_openingBrackets + "])|([" + // 全角始め括弧
			charClass.cl02_closingBrackets + "])|([" + // 全角終わり括弧
			charClass.cl06_fullStops + charClass.cl07_commas + "])|([" + // 句読点
			charClass.cl04_dividingPunctuationMarks + charClass.cl05_middleDots + "])|([" + // 区切り約物（感嘆符等）・中点
			charClass.cl14_fullSpace + "])"; // 全角スペース
		const rgx_jtlAll_g = new RegExp(rgxStr_jtlAll, "g");
		const rgx_jtlAll = new RegExp(rgxStr_jtlAll);
		const rgx_noMarginEnforced = new RegExp(`[${rgxStr_noMarginEnforced}]`);


		const composeTextsIn = (element) => {
			//console.log("JTL: Basic layout \- Start");
			//const start = performance.now();

			// すでに組まれている部分があれば一旦リセットする
			if (element.getElementsByClassName(htmlClass.all).length !== 0) {
				const alreadyComposedSpans = element.getElementsByClassName(htmlClass.all);
				// spanを削除すると配列のインデックスが動くので、逆に回す
				for (let i = alreadyComposedSpans.length - 1; i >= 0; i = i - 1) {
					const span = alreadyComposedSpans[i];
					const text = span.innerHTML;
					span.before(text);
					span.remove();
				}
			}

			// 要素内の文字列をテキストとタグに分割（分割したものを スライス：文字列片 とする）
			const slices = element.innerHTML.match(rgx_htmlTagDividor) || [];
			const textSlices = [];

			// スライスごとに処理
			for (let i = 0; i < slices.length; i = i + 1) {

				// 無視されるべきタグ内のスライスは処理をスキップ
				// 開始タグを検出したら、同種の終了タグに達するまでスキップを繰り返す
				ignoredTagMatch = slices[i].match(rgx_ignoredTag);
				if (ignoredTagMatch) {
					const rgx_ignoredTagClosing = new RegExp(`</${ignoredTagMatch[1]}\\s*>`);
					const rgx_ignoredTagOpening = new RegExp(`<${ignoredTagMatch[1]}(?:\\s*|\\s+[^>]+)>`);
					let ignoredTagCount = 1;
					// 開始・終了タグが同数になるまでループ
					for (let j = i + 1; j < slices.length; j = j + 1) {
						if (rgx_ignoredTagClosing.test(slices[j])) {
							ignoredTagCount -= 1;
							if (ignoredTagCount === 0) {
								i = j;
								break;
							}
						}
						// さらにタグを検出したら、カウントを増加
						else if (rgx_ignoredTagOpening.test(slices[j])) {
							ignoredTagCount += 1;
						}
					}
					continue;
				}

				// スライスがタグ・コメント・空白のみのテキストである場合も処理をスキップ
				if (rgx_notTextSlice.test(slices[i])) {
					continue;
				}

				// 以上の処理を通過したスライス＝テキストスライスを保存
				textSlices.push(slices[i]);
				
				// 文字種別にクラスを付与
				slices[i] = slices[i].replace(rgx_jtlAll_g, (match, isWestern, isWesternNumber, isWesternBracOpen, isWesternBracClose, isBracOpen, isBracClose, isPunctuation, isMidDot, isFullSpace, offset) => {

					const classes = [htmlClass.all];
					let deleteLeftMargin = false;
					let deleteRightMargin = false;

					// 左余白に関する処理
					// elementの１文字目（文頭）ならば特に処理しない
					if (textSlices.length === 1 && offset === 0) {
						deleteLeftMargin = false;
					}
					else {
						// １文字前を取得（マッチがスライスの先頭ならば１つ前のテキストスライスの末尾）
						const previousChar = offset === 0 ?
							textSlices[textSlices.length - 2].slice(-1) :
							slices[i].charAt(offset - 1);
						
						// マッチの先頭が余白無しオプションの文字ならば、左余白を強制削除
						if (rgx_noMarginEnforced.test(match.charAt(0))) {
							deleteLeftMargin = true;
						}
						else {
							deleteLeftMargin = (() => {
								// 欧文文字・半角数字 のspanの先頭が 半角スペースまたは分離禁止文字 の場合 または
								// 欧文文字・半角数字 の前が 全角文字以外 の場合、左余白を詰める
								if (isWestern || isWesternNumber) {
									return (
										rgx_jtlAll.test(previousChar) ||
										rgx_westernSpace.test(match.charAt(0)) ||
										rgx_inseparable.test(match.charAt(0))
									);
								}
								// 半角始め括弧 の前が 全角文字以外 の場合、左余白を詰める
								else if (isWesternBracOpen) {
									return (
										rgx_jtlAll.test(previousChar)
									);
								}
								// 半角終わり括弧 の前が 全角文字 の場合、左余白を詰める／詰めない（オプションで切り替え）
								// 半角終わり括弧 の前が 全角文字以外 の場合 または
								// 余白詰めオプションあり かつ 半角終わり括弧 の前が 全角文字 の場合、右余白を詰める
								else if (isWesternBracClose) {
									return (
										!isWesternBracketSpacingEnabled ||
										rgx_jtlAll.test(previousChar)
									);
								}
								// 全角始め括弧 の前が 全角始め括弧・終わり括弧・句読点・中点・全角スペース の場合、左余白を詰める
								else if (isBracOpen) {
									return (
										rgx_bracOpen.test(previousChar) ||
										rgx_bracClose.test(previousChar) ||
										rgx_punctuation.test(previousChar) ||
										rgx_midDot.test(previousChar) ||
										rgx_fullSpace.test(previousChar)
									);
								}
							})();
						}
					}

					// 右余白に関する処理
					const matchEndPosition = offset + match.length;
					// elementの末尾（文末）ならば特に処理しない
					if (i === slices.length - 1 && matchEndPosition === slices[i].length) {
						deleteRightMargin = false;
					}
					else {
						// １文字後を取得（マッチがスライスの末尾ならば１つ後のテキストの先頭）
						const nextChar = (() => {
							if (matchEndPosition === slices[i].length) {
								for (let j = i + 1; j < slices.length; j = j + 1) {
									if (!rgx_htmlTag.test(slices[j])) {
										return slices[j].charAt(0);
									}
								}
							}
							else {
								return slices[i].charAt(matchEndPosition);
							}
						})();
						
						// マッチの末尾が余白無しオプションの文字ならば、右余白を強制削除
						if (rgx_noMarginEnforced.test(match.slice(-1))) {
							deleteRightMargin = true;
						}
						else {
							deleteRightMargin = (() => {
								// 欧文文字・半角数字 のspanの末尾が 半角スペースまたは分離禁止文字 の場合 または
								// 欧文文字・半角数字 の後が 全角文字以外 の場合、右余白を詰める
								if (isWestern || isWesternNumber) {
									return (
										rgx_jtlAll.test(nextChar) ||
										rgx_westernSpace.test(match.slice(-1)) ||
										rgx_inseparable.test(match.slice(-1))
									);
								}
								// 半角始め括弧 の後が 全角文字以外 の場合 または
								// 余白詰めオプションあり かつ 半角始め括弧 の後が 全角文字 の場合、右余白を詰める
								else if (isWesternBracOpen) {
									return (
										!isWesternBracketSpacingEnabled ||
										rgx_jtlAll.test(nextChar)
									);
								}
								// 半角終わり括弧 の後が 全角文字以外 の場合、右余白を詰める
								else if (isWesternBracClose) {
									return (
										rgx_jtlAll.test(nextChar)
									);
								}
								// 全角終わり括弧・句読点 の後が 全角終わり括弧・句読点・中点・全角スぺース の場合、右余白を詰める
								// （W3C日本語組版処理の要件に基づき、 全角終わり括弧-全角始め括弧 の場合は始め括弧の左余白を詰める）
								else if (isBracClose || isPunctuation) {
									return (
										rgx_bracClose.test(nextChar) ||
										rgx_punctuation.test(nextChar) ||
										rgx_midDot.test(nextChar) ||
										rgx_fullSpace.test(nextChar)
									);
								}
							})();
						}
					}

					if (deleteLeftMargin) {classes.push(htmlClass.noSpaceBefore)}
					if (deleteRightMargin) {classes.push(htmlClass.noSpaceAfter)}

					if (isWestern) {classes.push(htmlClass.westernChars)}
					else if (isWesternNumber) {classes.push(htmlClass.westernNumbers)}
					else if (isWesternBracOpen) {classes.push(htmlClass.westernBracOpen)}
					else if (isWesternBracClose) {classes.push(htmlClass.westernBracClose)}
					else if (isBracOpen) {classes.push(htmlClass.bracOpen)}
					else if (isBracClose) {classes.push(htmlClass.bracClose)}
					else if (isPunctuation) {classes.push(htmlClass.punctuation)}
					else if (isMidDot) {classes.push(htmlClass.midDot)}
					else if (isFullSpace) {classes.push(htmlClass.fullSpace)}

					return `<span class="${classes.join(" ")}">${match}</span>`;

				});

				// HTMLに戻す
				element.innerHTML = slices.join("");
			}

			//const end = performance.now();
			//console.log("JTL: Basic layout \- Finish     (" + (end - start).toFixed(1) + " ms)");
		}

		// 行頭文字の左余白調整
		const layoutLineHead = (element) => {
			console.log("JTL: Line head layout \- Start");
			const start = performance.now();

			// 全/半角始め括弧・半角終わり括弧・欧文文字・半角数字 が行頭にある場合、左の余白を削除する
			const targetSpans = element.querySelectorAll(`.${htmlClass.bracOpen}, .${htmlClass.westernChars}, .${htmlClass.westernBracOpen}, .${htmlClass.westernBracClose}, .${htmlClass.westernNumbers}`);
			for (let i = 0; i < targetSpans.length; i = i + 1) {
				const targetSpan = targetSpans[i];
				targetSpan.classList.remove(htmlClass.lineHead)
				const targetStyleProperties = window.getComputedStyle(targetSpan);
				// inlineでない先祖要素を、行頭判断の基準位置とする
				const targetParent = (() => {
					let ancestor = targetSpan;
					let isInline = true;
					while (isInline && ancestor !== element) {
						ancestor = ancestor.parentElement;
						if (window.getComputedStyle(ancestor).getPropertyValue("display") !== "inline") {
							isInline = false;
						}
					}
					return ancestor;
				})();
				const parentStyleProperties = window.getComputedStyle(targetParent);
				const parentPosition = parentStyleProperties.getPropertyValue("position");

				let isAtLineHead = false;

				// offsetLeftの基準とするため、staticは一時的にrelativeに変更
				targetParent.style.position = parentPosition === "static" ? "relative" : parentPosition;
				
				const parentPadding = parseInt(parentStyleProperties.getPropertyValue("padding\-left"));
				const targetInitialCharPosition = targetSpan.offsetLeft - parseInt(targetStyleProperties.getPropertyValue("padding\-left")) - parseInt(targetStyleProperties.getPropertyValue("margin\-left"));
				if (targetInitialCharPosition - parentPadding < 1) {
					isAtLineHead = true;
				}

				targetParent.style.position = "";
				
				if (isAtLineHead) {targetSpan.classList.add(htmlClass.lineHead)}
			}

			const end = performance.now();
			console.log("JTL: Line head layout \- Finish (" + (end - start).toFixed(1) + " ms)");
		}


		
		// セレクタで指定された要素ごとに処理
		targetElements.forEach((element) => {
			//console.log(element);
			//console.log("JTL: Initialize \- Start");
			//const start = performance.now();

			composeTextsIn(element);
			layoutLineHead(element);

			if (isResizeObserverEnabled) {
				window.addEventListener("resize", () => layoutLineHead(element))
			}

			//const end = performance.now();
			//console.log("JTL: Initialize \- Finish (" + (end - start).toFixed(1) + " ms)");
		});

		const end = performance.now();
		console.log(`%c${(end - start).toFixed(1)} ms`, "font-size: 20px; margin: 1em 0")
	}

}
