# jtl-composer
[terkel氏](https://github.com/terkel) の [Mojik.js](https://github.com/terkel/mojik/) に感銘を受けまして、JavaScriptの勉強がてら劣化コピーを作らせていただいたものがこれです。和文の約物類や欧文等の間隔をうまいこと調整する、はず……

なんとなく公開してはいますが、あくまで勉強用なので使わない方がいいんじゃないかと思います。

なお一応 [W3C 日本語組版処理の要件（日本語版）](https://www.w3.org/TR/jlreq/)を意識しながら作ってみたものの、見落としなどは十分あり得ます。

## デモ
https://koh-ymmt.github.io/jtl-composer/

## 使い方
### きほん
```
<script src="jtl.js"></script>
<link rel="stylesheet" href="jtl.css">
```
このように JavaScript と CSS を読み込み、
```
JTL.compose( selector, {options} )
```
のようにして実行します。
- selector には、文字組みをしたい要素のセレクタ（querySelector に書けるやつ）を書きます。html、とかbody、みたいに書いても動くとは思いますが、段落単位ぐらいで指定した方がいいんじゃないかとも思います。
- options は任意で、`observeResize`、`westernBracketSpacing`、`noMargin`が書けます。
  - `observeResize` ：初期値は `false` で、`true` にすると window の resize イベントによって行頭の文字の余白を調整します。
  - `westernBracketSpacing` ：初期値は `false` で、`true` にすると ( こんな感じで ) 半角括弧の内側に余白が現れます。
  - `noMargin` ：正規表現で、強制的に前後の余白を消す文字を書きます。例えば半角のスラッシュ`/`なんかは欧文文字扱いなので`全角文字/全角文字`のような場合には両端に余白ができますが、こういうのをキャンセルできます。
### 微調整
CSS に、
```
--jtl-negativeMargin-fullWidth: 0.5em;
--jtl-margin-western: 0.15em;
--jtl-margin-number: 0.1em;
--jtl-narrowWidth-fullBracket: 0em;
--jtl-narrowWidth-fullPunctuation: 0em;
--jtl-narrowWidth-midDot: 0em;
```
というカスタムプロパティが定義されているので、これで簡単な調整はできます。他の調整がしたいときは、面倒ですが直接他の部分をいじってください。
- `--jtl-negativeMargin-fullWidth`：全角の括弧（`（）「」`などなど）が連続した場合や、中点`・`など他の約物に連続した場合に、どれだけ文字を詰めるか設定できます。
- `--jtl-margin-western`：欧文と和文の間隔を設定できます。日本語組版処理の要件によると四分アキになるらしいですが、空きすぎな気もします。
- `--jtl-margin-number`：半角数字と和文の間隔を設定できます。日本語組版処理の要件によると（同上）
- `--jtl-narrowWidth-fullBracket` `--jtl-narrowWidth-fullPunctuation` `--jtl-narrowWidth-midDot`：前後の文字とか関係なく、常に余白を狭めたい場合に使えます。それぞれ、全角括弧、全角句読点、全角中点です。全角括弧を常に半角に近い幅で表示したければ、`--jtl-narrowWidth-fullBracket: 0.5em;`などと書くとよいかもしれません。
