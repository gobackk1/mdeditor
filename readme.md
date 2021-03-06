# MarkDownEditor

## これは何？
- ブラウザ上で動作するマークダウンエディタ。「boostnote」というデスクトップアプリや「codesandbox」を模倣した。
- 趣味と勉強用で作った

## 使用したもの
- html
- css
- JavaScript
- PHP

### フレームワーク
- Vue.js
- Laravel

## 機能
### 作業メモ
1. jestの練習ができるように
2. バグ潰し、markdown拡張して現場で使えるように
3. デプロイ


### カテゴリ
- [x] カテゴリの横に数
- [x] 不要な時は、カテゴリリストを格納して隠す
- [x] フォルダアイコンの色を変えられるようにする
- [x] ゴミ箱、お気に入りをリストする
- [x] カテゴリ名変更

- [x] フォルダ名編集時にオートフォーカス&エンターキーのイベント
- [x] 内容に差分がある時だけAPIとやり取りする
- [x] ALL,Fav,Trash選択中にメモを作成するときの不具合
- [ ] 並び替え機能
- [ ] カテゴリ作成時にランダムなフォルダ色にする


### 各メモ
- [x] 検索機能
- [x] 右クリックで編集画面へ遷移
- [x] 削除したアイテムをゴミ箱へ入れる
- [x] お気に入り登録したメモはゴミ箱へ送れないように
- [x] ゴミ箱に送った後は、そのカテゴリの一番最初のメモにオートフォーカスする

- [x] メモタイトルは、本文の１行目を利用する
- [x] markdown記法拡張
- [x] 並び替え機能（アルファベット、作成日時、更新日時）
- [ ] リストの幅を可変にする




### 全般
- [ ] 設定の変更やフィードバックにはポップアップだす
- [ ] チュートリアル
- [ ] 各種設定で、好みのテーマや、アプリの挙動
- [ ] 各種設定ページ
- [ ] 使い方ページ
- [ ] パッチノートページ
- [ ] メニューの操作をもっとスマートに
- [ ] ログイン失敗時にテキストをだす
- [ ] ログイン状態の記憶（remenber token）
- [ ] 新規登録時は、チュートリアルのカテゴリとメモを作成して返す


## リファクタリング、ブラッシュアップ
- [ ] DB,URL設計
- [ ] イベントバス必要か？
- [ ] アプリのセキュリティ対策　Laravelのcsrfトークン
- [ ] アクセシビリティ
- [ ] 表示速度
- [ ] 単一ファイルコンポーネントで共通scssを読み込ませる(webpack)


## 開発側
- [ ] フロント側のテスト（単体、結合、画像回帰）
- [ ] CIツール　jenkins

### ユーザー認証
- [x] 認証機能実装

### memo
- methodsをcomponentにpropsとして渡していく
- apiのミドルウェアを変更しているので注意


## サーバーへのデプロイ
https://qiita.com/sskmy1024y/items/c2e434941400bd4ee82c

- RegisterUser.phpの`email`を`name`へ
- index.blade.phpの jsとcss を絶対パスへ
- webpack.mix.js 編集して、ビルド時にバージョンを付与しないように

## 反省
- プロパティ名が冗長だった。`memo.memo_title`は`memo.title`でよかった
