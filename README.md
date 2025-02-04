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

### div with %
```JS
_div(id_or_class, percent, margin)
> none
```
> idなら前に`#`、classなら前に`.`をつける

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


### Mersenne Twister
```JS
mt.setSeed(int) //シード値の設定

mt.next() //[0,1)の一様分布乱数の生成
> num
mt.nextInt(min,max)
>int
```
変数0...[0,2<sup>32</sup>)

変数1…[0,max)

変数2…[min,max)


詳しくは[こちら](https://magicant.github.io/sjavascript/mt.html#api-setSeed)

## 導入方法
```HTML
<script src='https://github.com/Team-kawatama/dc_text/releases/download/v1.1.1/src.js'></script>
```

もしくは
[Releases](https://github.com/Team-kawatama/dc_text/releases/tag/v1.1.1)からsrc.jsをダウンロードする
