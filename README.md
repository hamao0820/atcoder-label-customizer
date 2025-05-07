# AtCoder Label Customizer

AtCoderのラベルを自由にカスタマイズ出来るようにするChrome拡張です。

## 機能

- ラベルの色を変更
- ラベルの名前を変更

## インストール

Chromeウェブストアからインストールできます。

[AtCoder Label Customizer](https://chromewebstore.google.com/detail/atcoder-label-customizer/jfgmfcnlmgolnfadehfomajomolbadhl?utm_source=item-share-x)

## 開発

1. リポジトリをcloneする。

```bash
git clone https://github.com/hamao0820/atcoder-label-customizer.git
```

あるいは

```bash
gh repo clone hamao0820/atcoder-label-customizer
```

2. 依存関係をインストールする。

```
pnpm install
```

3. 開発者モードで拡張機能を読み込む。

```
pnpm run dev
```

`./build/chrome-mv3-dev`をChromeの拡張機能として読み込む。

4. プロダクトビルド

```
pnpm run build
```

`./build/chrome-mv3`にビルドされる。
