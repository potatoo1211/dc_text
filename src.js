function dc(iter){return JSON.parse(JSON.stringify(iter))}
let texts = []
let W = window.innerWidth
let H = window.innerHeight
function text(id,percent,sizetype = false){
    texts.push([id,percent,sizetype])
}
function resize(){
    if (16*H > 9*W) {
        $('.kawa').css({'position': 'relative', 'margin-top' : String((H-(9/16)*W)/2) + 'px', 'margin-left' : 0})
        $('.tama').css({'position': 'relative', 'width' : String(W) + 'px', 'height' : String((9/16)*W)})
        for (i of texts){
            if (i[2]){
                var temp = document.getElementById(i[0]).innerText.length
                $(`#${i[0]}`).css({'position': 'absolute','width' : (String(W)*i[i]/(100*temp)) + 'px'})
            } else $(`#${i[0]}`).css({'position': 'absolute','width' : (String(W)*i[i]/100) + 'px'})
        }
    } else {
        $('.kawa').css({'position': 'relative', 'margin-top' : 0, 'margin-left' : String((W-(16/9)*H)/2) + 'px'})
        $('.tama').css({'position': 'relative', 'width' : String((16/9)*H) + 'px', 'height' : String(H)})
        for (i of texts){
            if (i[2]){
                var temp = document.getElementById(i[0]).innerText.length
                $(`#${i[0]}`).css({'position': 'absolute','width' : (String((16/9)*H)*i[i]/(100*temp)) + 'px'})
            } else $(`#${i[0]}`).css({'position': 'absolute','width' : (String((16/9)*H)*i[i]/100) + 'px'})
        }
    }
}
window.addEventListener('resize', function(){
    W = window.innerWidth
    H = window.innerHeight
    resize()
});
