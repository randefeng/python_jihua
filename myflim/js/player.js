var killErrors = function(value) {
    return true
};
window.onerror = null;
window.onerror = killErrors;
var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,-1,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-1,-1,-1,-1,-1);
function base64encode(str) {
    var out, i, len;
    var c1, c2, c3;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt((c1 & 0x3) << 4);
            out += "==";
            break
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt((c2 & 0xF) << 2);
            out += "=";
            break
        }
        c3 = str.charCodeAt(i++);
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += base64EncodeChars.charAt(c3 & 0x3F)
    }
    return out
}
function base64decode(str) {
    var c1, c2, c3, c4;
    var i, len, out;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        do {
            c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
        } while (i < len && c1 == -1);if (c1 == -1)
            break;
        do {
            c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
        } while (i < len && c2 == -1);if (c2 == -1)
            break;
        out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
        do {
            c3 = str.charCodeAt(i++) & 0xff;
            if (c3 == 61)
                return out;
            c3 = base64DecodeChars[c3]
        } while (i < len && c3 == -1);if (c3 == -1)
            break;
        out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
        do {
            c4 = str.charCodeAt(i++) & 0xff;
            if (c4 == 61)
                return out;
            c4 = base64DecodeChars[c4]
        } while (i < len && c4 == -1);if (c4 == -1)
            break;
        out += String.fromCharCode(((c3 & 0x03) << 6) | c4)
    }
    return out
}
function utf16to8(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i)
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
        }
    }
    return out
}
function utf8to16(str) {
    var out, i, len, c;
    var char2, char3;
    out = "";
    len = str.length;
    i = 0;
    while (i < len) {
        c = str.charCodeAt(i++);
        switch (c >> 4) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
            out += str.charAt(i - 1);
            break;
        case 12:
        case 13:
            char2 = str.charCodeAt(i++);
            out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
            break;
        case 14:
            char2 = str.charCodeAt(i++);
            char3 = str.charCodeAt(i++);
            out += String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));
            break
        }
    }
    return out
}

eval(function(p, a, c, k, e, r) {
    e = function(c) {
        return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
    }
    ;
    if (!''.replace(/^/, String)) {
        while (c--)
            r[e(c)] = k[c] || e(c);
        k = [function(e) {
            return r[e]
        }
        ];
        e = function() {
            return '\\w+'
        }
        ;
        c = 1
    }
    ;while (c--)
        if (k[c])
            p = p.replace(new RegExp('\\b' + e(c) + '\\b','g'), k[c]);
    return p
}('K.3w=m(){o(K.E=="1k"){f.F=$(K).q()-$(".f").2A().19-15;f.R=$(K).k()-$(".f").2A().1b-15;f.G=f.R;o(23==1){f.G-=20}$(".f").q(f.F);$(".f").k(f.R);$("#1t").q(f.F);$("#1t").k(f.R);$("#2L").q(f.F);$("#2L").k(f.G)}};B f={\'2n\':m(){o(e.C>0){e.1v(e.D+1,e.C)}},\'2u\':m(){V e.C>0?e.1w(e.D+1,e.C):\'\'},\'2K\':m(){o(e.C+1!=e.1W){e.1v(e.D+1,e.C+2)}},\'2g\':m(){V e.C+1<=e.1W?e.1w(e.D+1,e.C+2):\'\'},\'1w\':m(s,n){V 4k.1z(\'{1d}\',s).1z(\'{1d}\',s).1z(\'{2J}\',n).1z(\'{2J}\',n)},\'1v\':m(s,n){1S.16=e.1w(s,n)},\'2c\':m(){e.1Q=\'\';1P(i=0;i<e.H.U.J;i++){U=e.H.U[i];P=e.H.P[i];1I="";1G=\'S\';1T=\'T\';18=P.Q(\'#\');1P(j=0;j<18.J;j++){v=18[j].Q(\'$\');E=\'\';P=\'\';1j=\'\';1C=\'\';o(v.J>1){E=v[0];P=v[1];o(v.J>2){1C=v[2]}}1y{E="第"+(j+1)+"集";P=v[0]}o(e.D==i&&e.C==j){1G=\'1X\';1T=\'1Y\';1j="1j";e.1W=18.J;e.4i=P;e.2O=E;o(1C!=\'\'){e.1Z=1C}o(j<18.J-1){v=18[j+1].Q(\'$\');o(v.J>1){21=v[0];24=v[1]}1y{21="第"+(j+1)+"集";24=v[0]}e.4h=24;e.4f=21}}1I+=\'<1f><a 1r="\'+1j+\'" 16="1o:1B(0)" 1n="f.1v(\'+(i+1)+\',\'+(j+1)+\');V 1l;" >\'+E+\'</a></1f>\'}e.1Q+=\'<L x="28\'+i+\'" 1r="\'+1G+\'"><S 1n="f.2R(\'+i+\',\'+(e.H.U.J-1)+\')">\'+48[U]+\'</S>\'+\'<1q x="1i\'+i+\'" I="Z:\'+1T+\'">\'+1I+\'</1q></L>\'}},\'2i\':m(){$(\'#1e\').2m()},\'2R\':m(a,n){B b=$(\'#1i\'+a).2q(\'Z\');1P(B i=0;i<=n;i++){$(\'#28\'+i).2r(\'2s\',\'S\');$(\'#1i\'+i).1c()}o(b==\'T\'){$(\'#1i\'+a).1V();$(\'#28\'+a).2r(\'2s\',\'1X\')}1y{$(\'#1i\'+a).1c()}},\'41\':m(){o(23==0){$("#1U").1c()}o(3Z==0){$("#1e").1c()}3Y(m(){f.2E()},e.2F*3X);$("#2I").1E(0).1M=\'\'+\'正在播放：\'+e.2O+\'\';$("#1e").1E(0).1M=\'<L 1r="A" x="A" I="k:\'+e.G+\'1L;">\'+e.1Q+\'</L>\';$("#1F").1E(0).1M=\'<2P x="1t" 1d="\'+e.2Q+\'" 3T="0" 3Q="2T" q="r%" k="\'+e.G+\'" I="2b:3O;z-3I:3H;"></2P>\'+e.3G+\'\';1J.1K(\'<1D\'+\'1m 1d="\'+\'3F://3D.3B.3A/3z/1b.2p\'+\'"></1D\'+\'1m>\')},\'3y\':m(){B w=e.F-r;B h=e.G-r;B l=(e.F-w)/2;B t=(e.G-h)/2+20;$(".2t").2q({\'q\':w,\'k\':h,\'19\':l,\'1b\':t});$(".2t").2m()},\'2E\':m(){$(\'#1t\').1c()},\'3x\':m(){e.2B=1l;$(\'#1R\').3v().1V();$(\'#1R\').1V()},\'2x\':m(){B a=3u.Q(\',\');1J.1K(\'<I>.f{2z: #\'+a[0]+\';17-1A:3q;u:#\'+a[1]+\';1x:1g;1a:1g;2b:3p;W:1u;q:\'+(e.F==0?\'r%\':e.F+\'1L\')+\';k:\'+e.R+\'1L;}.f a{u:#\'+a[2]+\';X-22:T}a:33{X-22: 31;}.f a:30{X-22: T;}.f 1h{q:r%;k:r%;}.f 1q,1f,S{ 1x:1g; 1a:1g; 2Z-I:T}.f #1U{X-25:2X;k:2W; 1p-k:29;17-1A:2U;}.f #27{q:3C;}.f #26{q:2Y;} .f #27{X-25:19;1a-19:1s}.f #26{X-25:2N;1a-2N:1s}.f #1F{q:r%;k:r%;W:1u;}.f #1e{k:r%;W-y:2M;}.f #A{q:32;W:2M;N-34-u:#\'+a[7]+\';N-35-u:#\'+a[8]+\';N-36-u: #\'+a[9]+\';N-37-u:#\'+a[10]+\';N-38-u: #\'+a[11]+\';N-39-u:#\'+a[12]+\';N-3a-u:#\'+a[13]+\';N-3b-u:#\'+a[14]+\';}.f #A 1q{ 3c:3d; 1x:1s 1g}.f #A 1f{ k:29; 1p-k:29;W: 1u; X-W: 3e; 3f-3g: 3h;}.f #A 1f a{1a-19:3i; Z:1Y; 17-1A:2U}.f #A S{ 3j:3k;17-1A:3l;17-3m: "宋体";17-3n:3o;k:2G;1p-k:2G;2z:#\'+a[3]+\';1a-19:1s; 1x-3r:3s}.f #A .S{u:#\'+a[4]+\'}.f #A .1X{u:#\'+a[5]+\'}.f #A .3t{Z:1Y}.f #A .1j{u:#\'+a[6]+\'} </I><L 1r="f"><1h 2y="0" 2w="0" 2v="0"><O><p 2o="2"><1h 2y="0" 2w="0" 2v="0" x="1U"><O><p q="r" x="27"><a 1O="1N" 16="1o:1B(0)" 1n="f.2n();V 1l;">上一集</a> <a 1O="1N" 16="1o:1B(0)" 1n="f.2K();V 1l;">下一集</a></p><p x="2V"><L x="2I" I="k:2l;1p-k:2l;W:1u"></L></p><p q="r" x="26"><a 1O="1N" 16="1o:1B(0)" 3E="f.2i();V 1l;">开/关列表</a></p></O></1h></p></O><O I="Z:T"><p 2o="2" x="1R" I="Z:T"></p></O><O><p x="1F" 2k="1b">&2f;</p><p x="1e" 2k="1b">&2f;</p></O></1h></L>\');1J.1K(\'<1D\'+\'1m 1d="\'+e.2e+e.1Z+\'.2p"></1D\'+\'1m>\')},\'2d\':m(){},\'3J\':m(){e.2B=3K;e.Y=1S.16;e.3L=1S.3M;e.H={\'U\':3N.Q(\'$$$\'),\'1H\':3P.Q(\'$$$\'),\'2S\':3R.Q(\'$$$\'),\'P\':3S.Q(\'$$$\')};B c=3U.3V.3W();e.F=K.E==\'1k\'?2H:(2D==0?\'r%\':2D);e.R=K.E==\'1k\'?2C:40;o(c.M("42")>0||c.M("43")>0||c.M("44")>0||c.M("45")>0||c.M("46")>0||c.M("47")>0){e.F=K.E==\'1k\'?2H:(2a==0?\'r%\':2a);e.R=K.E==\'1k\'?2C:49}e.G=e.R;o(23==1){e.G-=20}o(e.Y.M(\'#\')>-1){e.Y=e.Y.4a(0,e.Y.M(\'#\'))}e.2Q=4b;e.4c=4d;e.2F=4e;e.2j=4g;B a=e.Y.2h(/\\d+.*(4j)/g)[0].2h(/\\d+/g);B b=a.J;e.4l=a[(b-3)]*1;e.D=a[(b-2)]*1-1;e.C=a[(b-1)]*1-1;e.1Z=e.H.U[e.D];e.4m=e.H.1H[e.D]==\'2T\'?\'\':4n[e.H.1H[e.D]];e.4o=e.H.2S[e.D];e.2c();e.4p=e.2g();e.4q=e.2u();e.2e=4r+\'4s/\';o(e.2j=="4t"){f.2d()}1y{f.2x()}}};', 62, 278, '||||||||||||||this|MacPlayer|||||height||function||if|td|width|100|||color|urlinfo||id|||rightlist|var|Num|Src|name|Width|Height|Data|style|length|window|div|indexOf|scrollbar|tr|url|split|HeightAll|h2|none|from|return|overflow|text|Url|display|||||||href|font|urlarr|left|padding|top|hide|src|playright|li|0px|table|sub|list_on|macopen1|false|ipt|onclick|javascript|line|ul|class|5px|buffer|hidden|Go|GetUrl|margin|else|replace|size|void|from1|scr|get|playleft|sid_on|server|listr|document|write|px|innerHTML|_self|target|for|RightList|install|location|sub_on|playtop|show|PlayUrlLen|h2_on|block|PlayFrom||name1|decoration|mac_showtop|url1|align|topright|topleft|main|21px|mac_widthmob|position|GetList|Down|Path|nbsp|GetNextUrl|match|ShowList|Flag|valign|26px|toggle|GoPreUrl|colspan|js|css|attr|className|MacBuffer|GetPreUrl|cellspacing|cellpadding|Play|border|background|offset|Status|mac_heightpop|mac_width|AdsEnd|Second|25px|mac_widthpop|topdes|num|GoNextUrl|Player|auto|right|PlayName|iframe|Prestrain|Tabs|note|no|12px|topcc|20px|center|100px|list|active|underline|120px|hover|face|arrow|track|highlight|shadow|3dlight|darkshadow|base|clear|both|ellipsis|white|space|nowrap|15px|cursor|pointer|13px|family|weight|normal|relative|14px|bottom|1px|ul_on|mac_colors|parent|onresize|Install|ShowBuffer|html|com|maccms|150px|union|onClick|http|Html|99998|index|Init|true|Par|search|mac_from|absolute|mac_server|scrolling|mac_note|mac_url|frameBorder|navigator|userAgent|toLowerCase|1000|setTimeout|mac_showlist|mac_height|Show|android|mobile|ipod|ios|iphone|ipad|mac_show|mac_heightmob|substr|mac_prestrain|Buffer|mac_buffer|mac_second|PalyName1|mac_flag|PlayUrl1|PlayUrl|htm|mac_link|Id|PlayServer|mac_show_server|PlayNote|NextUrl|PreUrl|SitePath|player|down'.split('|'), 0, {}));

MacPlayer.Init();
