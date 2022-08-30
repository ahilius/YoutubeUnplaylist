(function(){
    function unplaylist() {
        document.querySelector('[aria-label="Save to playlist"]').click();

        var checkExist = setInterval(() => {
            var btn = document.querySelector('.ytd-add-to-playlist-renderer [aria-label="Cancel"]');
            var iron = document.querySelector('tp-yt-iron-overlay-backdrop');
            
            if (btn && iron) {
                clearInterval(checkExist);
                btn.click();
                document.querySelectorAll('[aria-checked="true"]').forEach(x => x.click());
            }
        }, 100);
    }
         
    function createAttachButton(m) {
        if(m.querySelector('#UNPLAYLIST')) {
            return;
        }
        
        var b = document.createElement('span');
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        var path = document.createElementNS('http://www.w3.org/2000/svg','path');
        
        b.onclick = unplaylist;
        
        b.setAttribute('id','UNPLAYLIST');
        b.setAttribute('title','UNPLAYLIST');
        b.setAttribute('style','margin-top:auto;margin-bottom:auto');
        
        svg.setAttributeNS(null,'width','24');
        svg.setAttributeNS(null,'height','24');
        svg.setAttributeNS(null,'preserveAspectRatio','xMidYMid slice');
        
        path.setAttributeNS(null,'d','m22 13h-10v-2h10v2zm-8-6h-12v1h12v-1zm-12 5h8v-1h-8v1zm0 4h8v-1h-8v1z');
        
        svg.append(path);
        b.append(svg);
        m.append(b);
        
        let tmp=m.style.display;
        m.style.display='none';
        setTimeout(function(){m.style.display=tmp;},200);
    }
    
    function go() {
        if(!location.pathname.startsWith('/watch')) {
            return;
        }

        var checkExist = setInterval(function() {
            var a = document.querySelector('div#actions-inner,div#info-contents');
            var m = a?a.querySelector('#top-level-buttons-computed'):null;
            
            if(m) {
                clearInterval(checkExist);
                createAttachButton(m.parentNode);
            }
            
        }, 1000);
    }

    document.addEventListener('yt-navigate-finish', go);
})();