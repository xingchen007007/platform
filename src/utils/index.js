//动态加载图片等
export function getAssetsFile(name) {
    return new URL(`../assets/images/${name}`, import.meta.url).href;
}

export function debounce(fn,delay=300){
    let timer = null;
    return function(...args){
        if(timer) clearTimeout(timer);
        timer = setTimeout(()=>fn.apply(this,args),delay);
    }
} 
