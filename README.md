# dc_text
## ※川魂専用

## 使い方
### deepcopy
```JS
dc(itterable)
> itterable
```
```JS
deepcopy(itterable)
> itterable
```
deepcopyされたitterableが出力される

### text with %
```JS
text(id_or_class, percent, sizetype = false)
> none
```
> idなら前に`#`、classなら前に`.`をつける

sizetype = false
> textの1文字が`percent`%

sizetype = true
> text全体で`percent`%


### text with %
```JS
text(id_or_class, percent, margin)
> none
```
> idなら前に`#`、classなら前に`.`をつける


## 導入方法
```HTML
<script src='https://github.com/Team-kawatama/dc_text/releases/download/text/src.js'>
```

もしくは
[Releases](https://github.com/Team-kawatama/dc_text/releases/tag/text)からsrc.jsをダウンロードする
