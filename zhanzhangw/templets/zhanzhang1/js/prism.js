/* http://prismjs.com/download.html?themes=prism&languages=markup+css+clike+javascript+actionscript+applescript+aspnet+bash+basic+c+csharp+cpp+coffeescript+ruby+css-extras+d+diff+erlang+fsharp+fortran+go+groovy+haskell+java+latex+less+matlab+objectivec+ocaml+perl+php+php-extras+powershell+prolog+python+r+jsx+crystal+rust+sass+scss+scala+smalltalk+sql+swift+typescript+yaml&plugins=line-numbers+show-language */
var _self = "undefined" != typeof window ? window: "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self: {},
Prism = function() {
  var e = /\blang(?:uage)?-(?!\*)(\w+)\b/i,
  t = _self.Prism = {
    util: {
      encode: function(e) {
        return e instanceof n ? new n(e.type, t.util.encode(e.content), e.alias) : "Array" === t.util.type(e) ? e.map(t.util.encode) : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ")
      },
      type: function(e) {
        return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]
      },
      clone: function(e) {
        var n = t.util.type(e);
        switch (n) {
        case "Object":
          var a = {};
          for (var r in e) e.hasOwnProperty(r) && (a[r] = t.util.clone(e[r]));
          return a;
        case "Array":
          return e.map && e.map(function(e) {
            return t.util.clone(e)
          })
        }
        return e
      }
    },
    languages: {
      extend: function(e, n) {
        var a = t.util.clone(t.languages[e]);
        for (var r in n) a[r] = n[r];
        return a
      },
      insertBefore: function(e, n, a, r) {
        r = r || t.languages;
        var l = r[e];
        if (2 == arguments.length) {
          a = arguments[1];
          for (var i in a) a.hasOwnProperty(i) && (l[i] = a[i]);
          return l
        }
        var o = {};
        for (var s in l) if (l.hasOwnProperty(s)) {
          if (s == n) for (var i in a) a.hasOwnProperty(i) && (o[i] = a[i]);
          o[s] = l[s]
        }
        return t.languages.DFS(t.languages,
        function(t, n) {
          n === r[e] && t != e && (this[t] = o)
        }),
        r[e] = o
      },
      DFS: function(e, n, a) {
        for (var r in e) e.hasOwnProperty(r) && (n.call(e, r, e[r], a || r), "Object" === t.util.type(e[r]) ? t.languages.DFS(e[r], n) : "Array" === t.util.type(e[r]) && t.languages.DFS(e[r], n, r))
      }
    },
    plugins: {},
    highlightAll: function(e, n) {
      for (var a, r = document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'), l = 0; a = r[l++];) t.highlightElement(a, e === !0, n)
    },
    highlightElement: function(n, a, r) {
      for (var l, i, o = n; o && !e.test(o.className);) o = o.parentNode;
      o && (l = (o.className.match(e) || [, ""])[1], i = t.languages[l]),
      n.className = n.className.replace(e, "").replace(/\s+/g, " ") + " language-" + l,
      o = n.parentNode,
      /pre/i.test(o.nodeName) && (o.className = o.className.replace(e, "").replace(/\s+/g, " ") + " language-" + l);
      var s = n.textContent,
      u = {
        element: n,
        language: l,
        grammar: i,
        code: s
      };
      if (!s || !i) return t.hooks.run("complete", u),
      void 0;
      if (t.hooks.run("before-highlight", u), a && _self.Worker) {
        var g = new Worker(t.filename);
        g.onmessage = function(e) {
          u.highlightedCode = e.data,
          t.hooks.run("before-insert", u),
          u.element.innerHTML = u.highlightedCode,
          r && r.call(u.element),
          t.hooks.run("after-highlight", u),
          t.hooks.run("complete", u)
        },
        g.postMessage(JSON.stringify({
          language: u.language,
          code: u.code,
          immediateClose: !0
        }))
      } else u.highlightedCode = t.highlight(u.code, u.grammar, u.language),
      t.hooks.run("before-insert", u),
      u.element.innerHTML = u.highlightedCode,
      r && r.call(n),
      t.hooks.run("after-highlight", u),
      t.hooks.run("complete", u)
    },
    highlight: function(e, a, r) {
      var l = t.tokenize(e, a);
      return n.stringify(t.util.encode(l), r)
    },
    tokenize: function(e, n) {
      var a = t.Token,
      r = [e],
      l = n.rest;
      if (l) {
        for (var i in l) n[i] = l[i];
        delete n.rest
      }
      e: for (var i in n) if (n.hasOwnProperty(i) && n[i]) {
        var o = n[i];
        o = "Array" === t.util.type(o) ? o: [o];
        for (var s = 0; s < o.length; ++s) {
          var u = o[s],
          g = u.inside,
          c = !!u.lookbehind,
          f = 0,
          h = u.alias;
          u = u.pattern || u;
          for (var p = 0; p < r.length; p++) {
            var d = r[p];
            if (r.length > e.length) break e;
            if (! (d instanceof a)) {
              u.lastIndex = 0;
              var m = u.exec(d);
              if (m) {
                c && (f = m[1].length);
                var y = m.index - 1 + f,
                m = m[0].slice(f),
                v = m.length,
                k = y + v,
                b = d.slice(0, y + 1),
                w = d.slice(k + 1),
                P = [p, 1];
                b && P.push(b);
                var A = new a(i, g ? t.tokenize(m, g) : m, h);
                P.push(A),
                w && P.push(w),
                Array.prototype.splice.apply(r, P)
              }
            }
          }
        }
      }
      return r
    },
    hooks: {
      all: {},
      add: function(e, n) {
        var a = t.hooks.all;
        a[e] = a[e] || [],
        a[e].push(n)
      },
      run: function(e, n) {
        var a = t.hooks.all[e];
        if (a && a.length) for (var r, l = 0; r = a[l++];) r(n)
      }
    }
  },
  n = t.Token = function(e, t, n) {
    this.type = e,
    this.content = t,
    this.alias = n
  };
  if (n.stringify = function(e, a, r) {
    if ("string" == typeof e) return e;
    if ("Array" === t.util.type(e)) return e.map(function(t) {
      return n.stringify(t, a, e)
    }).join("");
    var l = {
      type: e.type,
      content: n.stringify(e.content, a, r),
      tag: "span",
      classes: ["prism-token", "prism-" + e.type],
      attributes: {},
      language: a,
      parent: r
    };
    if ("comment" == l.type && (l.attributes.spellcheck = "true"), e.alias) {
      var i = "Array" === t.util.type(e.alias) ? e.alias: [e.alias];
      Array.prototype.push.apply(l.classes, i)
    }
    t.hooks.run("wrap", l);
    var o = "";
    for (var s in l.attributes) o += (o ? " ": "") + s + '="' + (l.attributes[s] || "") + '"';
    return "<" + l.tag + ' class="' + l.classes.join(" ") + '" ' + o + ">" + l.content + "</" + l.tag + ">"
  },
  !_self.document) return _self.addEventListener ? (_self.addEventListener("message",
  function(e) {
    var n = JSON.parse(e.data),
    a = n.language,
    r = n.code,
    l = n.immediateClose;
    _self.postMessage(t.highlight(r, t.languages[a], a)),
    l && _self.close()
  },
  !1), _self.Prism) : _self.Prism;
  var a = document.getElementsByTagName("script");
  return a = a[a.length - 1],
  a && (t.filename = a.src, document.addEventListener && !a.hasAttribute("data-manual") && document.addEventListener("DOMContentLoaded", t.highlightAll)),
  _self.Prism
} ();
"undefined" != typeof module && module.exports && (module.exports = Prism),
"undefined" != typeof global && (global.Prism = Prism);
Prism.languages.markup = {
  comment: /<!--[\w\W]*?-->/,
  prolog: /<\?[\w\W]+?\?>/,
  doctype: /<!DOCTYPE[\w\W]+?>/,
  cdata: /<!\[CDATA\[[\w\W]*?]]>/i,
  tag: {
    pattern: /<\/?(?!\d)[^\s>\/=.$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,
    inside: {
      tag: {
        pattern: /^<\/?[^\s>\/]+/i,
        inside: {
          punctuation: /^<\/?/,
          namespace: /^[^\s>\/:]+:/
        }
      },
      "attr-value": {
        pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,
        inside: {
          punctuation: /[=>"']/
        }
      },
      punctuation: /\/?>/,
      "attr-name": {
        pattern: /[^\s>\/]+/,
        inside: {
          namespace: /^[^\s>\/:]+:/
        }
      }
    }
  },
  entity: /&#?[\da-z]{1,8};/i
},
Prism.hooks.add("wrap",
function(a) {
  "entity" === a.type && (a.attributes.title = a.content.replace(/&amp;/, "&"))
}),
Prism.languages.xml = Prism.languages.markup,
Prism.languages.html = Prism.languages.markup,
Prism.languages.mathml = Prism.languages.markup,
Prism.languages.svg = Prism.languages.markup;
Prism.languages.css = {
  comment: /\/\*[\w\W]*?\*\//,
  atrule: {
    pattern: /@[\w-]+?.*?(;|(?=\s*\{))/i,
    inside: {
      rule: /@[\w-]+/
    }
  },
  url: /url\((?:(["'])(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
  selector: /[^\{\}\s][^\{\};]*?(?=\s*\{)/,
  string: /("|')(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1/,
  property: /(\b|\B)[\w-]+(?=\s*:)/i,
  important: /\B!important\b/i,
  "function": /[-a-z0-9]+(?=\()/i,
  punctuation: /[(){};:]/
},
Prism.languages.css.atrule.inside.rest = Prism.util.clone(Prism.languages.css),
Prism.languages.markup && (Prism.languages.insertBefore("markup", "tag", {
  style: {
    pattern: /(<style[\w\W]*?>)[\w\W]*?(?=<\/style>)/i,
    lookbehind: !0,
    inside: Prism.languages.css,
    alias: "language-css"
  }
}), Prism.languages.insertBefore("inside", "attr-value", {
  "style-attr": {
    pattern: /\s*style=("|').*?\1/i,
    inside: {
      "attr-name": {
        pattern: /^\s*style/i,
        inside: Prism.languages.markup.tag.inside
      },
      punctuation: /^\s*=\s*['"]|['"]\s*$/,
      "attr-value": {
        pattern: /.+/i,
        inside: Prism.languages.css
      }
    },
    alias: "language-css"
  }
},
Prism.languages.markup.tag));
Prism.languages.clike = {
  comment: [{
    pattern: /(^|[^\\])\/\*[\w\W]*?\*\//,
    lookbehind: !0
  },
  {
    pattern: /(^|[^\\:])\/\/.*/,
    lookbehind: !0
  }],
  string: /(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
  "class-name": {
    pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,
    lookbehind: !0,
    inside: {
      punctuation: /(\.|\\)/
    }
  },
  keyword: /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
  "boolean": /\b(true|false)\b/,
  "function": /[a-z0-9_]+(?=\()/i,
  number: /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,
  operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
  punctuation: /[{}[\];(),.:]/
};
Prism.languages.javascript = Prism.languages.extend("clike", {
  keyword: /\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
  number: /\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,
  "function": /[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i
}),
Prism.languages.insertBefore("javascript", "keyword", {
  regex: {
    pattern: /(^|[^\/])\/(?!\/)(\[.+?]|\\.|[^\/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
    lookbehind: !0
  }
}),
Prism.languages.insertBefore("javascript", "class-name", {
  "template-string": {
    pattern: /`(?:\\`|\\?[^`])*`/,
    inside: {
      interpolation: {
        pattern: /\$\{[^}]+\}/,
        inside: {
          "interpolation-punctuation": {
            pattern: /^\$\{|\}$/,
            alias: "punctuation"
          },
          rest: Prism.languages.javascript
        }
      },
      string: /[\s\S]+/
    }
  }
}),
Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {
  script: {
    pattern: /(<script[\w\W]*?>)[\w\W]*?(?=<\/script>)/i,
    lookbehind: !0,
    inside: Prism.languages.javascript,
    alias: "language-javascript"
  }
}),
Prism.languages.js = Prism.languages.javascript;
Prism.languages.actionscript = Prism.languages.extend("javascript", {
  keyword: /\b(?:as|break|case|catch|class|const|default|delete|do|else|extends|finally|for|function|if|implements|import|in|instanceof|interface|internal|is|native|new|null|package|private|protected|public|return|super|switch|this|throw|try|typeof|use|var|void|while|with|dynamic|each|final|get|include|namespace|native|override|set|static)\b/,
  operator: /\+\+|--|(?:[+\-*\/%^]|&&?|\|\|?|<<?|>>?>?|[!=]=?)=?|[~?@]/
}),
Prism.languages.actionscript["class-name"].alias = "function",
Prism.languages.markup && Prism.languages.insertBefore("actionscript", "string", {
  xml: {
    pattern: /(^|[^.])<\/?\w+(?:\s+[^\s>\/=]+=("|')(?:\\\1|\\?(?!\1)[\w\W])*\2)*\s*\/?>/,
    lookbehind: !0,
    inside: {
      rest: Prism.languages.markup
    }
  }
});
Prism.languages.applescript = {
  comment: [/\(\*(?:\(\*[\w\W]*?\*\)|[\w\W])*?\*\)/, /--.+/, /#.+/],
  string: /"(?:\\?.)*?"/,
  number: /\b-?\d*\.?\d+([Ee]-?\d+)?\b/,
  operator: [/[&=≠≤≥*+\-\/÷^]|[<>]=?/, /\b(?:(?:start|begin|end)s? with|(?:(?:does not|doesn't) contain|contains?)|(?:is|isn't|is not) (?:in|contained by)|(?:(?:is|isn't|is not) )?(?:greater|less) than(?: or equal)?(?: to)?|(?:(?:does not|doesn't) come|comes) (?:before|after)|(?:is|isn't|is not) equal(?: to)?|(?:(?:does not|doesn't) equal|equals|equal to|isn't|is not)|(?:a )?(?:ref(?: to)?|reference to)|(?:and|or|div|mod|as|not))\b/],
  keyword: /\b(?:about|above|after|against|apart from|around|aside from|at|back|before|beginning|behind|below|beneath|beside|between|but|by|considering|continue|copy|does|eighth|else|end|equal|error|every|exit|false|fifth|first|for|fourth|from|front|get|given|global|if|ignoring|in|instead of|into|is|it|its|last|local|me|middle|my|ninth|of|on|onto|out of|over|prop|property|put|repeat|return|returning|second|set|seventh|since|sixth|some|tell|tenth|that|the|then|third|through|thru|timeout|times|to|transaction|true|try|until|where|while|whose|with|without)\b/,
  "class": {
    pattern: /\b(?:alias|application|boolean|class|constant|date|file|integer|list|number|POSIX file|real|record|reference|RGB color|script|text|centimetres|centimeters|feet|inches|kilometres|kilometers|metres|meters|miles|yards|square feet|square kilometres|square kilometers|square metres|square meters|square miles|square yards|cubic centimetres|cubic centimeters|cubic feet|cubic inches|cubic metres|cubic meters|cubic yards|gallons|litres|liters|quarts|grams|kilograms|ounces|pounds|degrees Celsius|degrees Fahrenheit|degrees Kelvin)\b/,
    alias: "builtin"
  },
  punctuation: /[{}():,¬«»《》]/
};
Prism.languages.aspnet = Prism.languages.extend("markup", {
  "page-directive tag": {
    pattern: /<%\s*@.*%>/i,
    inside: {
      "page-directive tag": /<%\s*@\s*(?:Assembly|Control|Implements|Import|Master(?:Type)?|OutputCache|Page|PreviousPageType|Reference|Register)?|%>/i,
      rest: Prism.languages.markup.tag.inside
    }
  },
  "directive tag": {
    pattern: /<%.*%>/i,
    inside: {
      "directive tag": /<%\s*?[$=%#:]{0,2}|%>/i,
      rest: Prism.languages.csharp
    }
  }
}),
Prism.languages.aspnet.tag.pattern = /<(?!%)\/?[^\s>\/]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,
Prism.languages.insertBefore("inside", "punctuation", {
  "directive tag": Prism.languages.aspnet["directive tag"]
},
Prism.languages.aspnet.tag.inside["attr-value"]),
Prism.languages.insertBefore("aspnet", "comment", {
  "asp comment": /<%--[\w\W]*?--%>/
}),
Prism.languages.insertBefore("aspnet", Prism.languages.javascript ? "script": "tag", {
  "asp script": {
    pattern: /(<script(?=.*runat=['"]?server['"]?)[\w\W]*?>)[\w\W]*?(?=<\/script>)/i,
    lookbehind: !0,
    inside: Prism.languages.csharp || {}
  }
}); !
function(e) {
  var t = {
    variable: [{
      pattern: /\$?\(\([\w\W]+?\)\)/,
      inside: {
        variable: [{
          pattern: /(^\$\(\([\w\W]+)\)\)/,
          lookbehind: !0
        },
        /^\$\(\(/],
        number: /\b-?(?:0x[\dA-Fa-f]+|\d*\.?\d+(?:[Ee]-?\d+)?)\b/,
        operator: /--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\|?|\|=|\?|:/,
        punctuation: /\(\(?|\)\)?|,|;/
      }
    },
    {
      pattern: /\$\([^)]+\)|`[^`]+`/,
      inside: {
        variable: /^\$\(|^`|\)$|`$/
      }
    },
    /\$(?:[a-z0-9_#\?\*!@]+|\{[^}]+\})/i]
  };
  e.languages.bash = {
    shebang: {
      pattern: /^#!\s*\/bin\/bash|^#!\s*\/bin\/sh/,
      alias: "important"
    },
    comment: {
      pattern: /(^|[^"{\\])#.*/,
      lookbehind: !0
    },
    string: [{
      pattern: /((?:^|[^<])<<\s*)(?:"|')?(\w+?)(?:"|')?\s*\r?\n(?:[\s\S])*?\r?\n\2/g,
      lookbehind: !0,
      inside: t
    },
    {
      pattern: /("|')(?:\\?[\s\S])*?\1/g,
      inside: t
    }],
    variable: t.variable,
    "function": {
      pattern: /(^|\s|;|\||&)(?:alias|apropos|apt-get|aptitude|aspell|awk|basename|bash|bc|bg|builtin|bzip2|cal|cat|cd|cfdisk|chgrp|chmod|chown|chroot|chkconfig|cksum|clear|cmp|comm|command|cp|cron|crontab|csplit|cut|date|dc|dd|ddrescue|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|enable|env|ethtool|eval|exec|expand|expect|export|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|getopts|git|grep|groupadd|groupdel|groupmod|groups|gzip|hash|head|help|hg|history|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|jobs|join|kill|killall|less|link|ln|locate|logname|logout|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|make|man|mkdir|mkfifo|mkisofs|mknod|more|most|mount|mtools|mtr|mv|mmv|nano|netstat|nice|nl|nohup|notify-send|nslookup|open|op|passwd|paste|pathchk|ping|pkill|popd|pr|printcap|printenv|printf|ps|pushd|pv|pwd|quota|quotacheck|quotactl|ram|rar|rcp|read|readarray|readonly|reboot|rename|renice|remsync|rev|rm|rmdir|rsync|screen|scp|sdiff|sed|seq|service|sftp|shift|shopt|shutdown|sleep|slocate|sort|source|split|ssh|stat|strace|su|sudo|sum|suspend|sync|tail|tar|tee|test|time|timeout|times|touch|top|traceroute|trap|tr|tsort|tty|type|ulimit|umask|umount|unalias|uname|unexpand|uniq|units|unrar|unshar|uptime|useradd|userdel|usermod|users|uuencode|uudecode|v|vdir|vi|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yes|zip)(?=$|\s|;|\||&)/,
      lookbehind: !0
    },
    keyword: {
      pattern: /(^|\s|;|\||&)(?:let|:|\.|if|then|else|elif|fi|for|break|continue|while|in|case|function|select|do|done|until|echo|exit|return|set|declare)(?=$|\s|;|\||&)/,
      lookbehind: !0
    },
    "boolean": {
      pattern: /(^|\s|;|\||&)(?:true|false)(?=$|\s|;|\||&)/,
      lookbehind: !0
    },
    operator: /&&?|\|\|?|==?|!=?|<<<?|>>|<=?|>=?|=~/,
    punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];]/
  };
  var a = t.variable[1].inside;
  a["function"] = e.languages.bash["function"],
  a.keyword = e.languages.bash.keyword,
  a.boolean = e.languages.bash.boolean,
  a.operator = e.languages.bash.operator,
  a.punctuation = e.languages.bash.punctuation
} (Prism);
Prism.languages.basic = {
  string: /"(?:""|[!#$%&'()*,\/:;<=>?^_ +\-.A-Z\d])*"/i,
  comment: {
    pattern: /(?:!|REM\b).+/i,
    inside: {
      keyword: /^REM/i
    }
  },
  number: /(?:\b|\B[.-])(?:\d+\.?\d*)(?:E[+-]?\d+)?/i,
  keyword: /\b(?:AS|BEEP|BLOAD|BSAVE|CALL(?: ABSOLUTE)?|CASE|CHAIN|CHDIR|CLEAR|CLOSE|CLS|COM|COMMON|CONST|DATA|DECLARE|DEF(?: FN| SEG|DBL|INT|LNG|SNG|STR)|DIM|DO|DOUBLE|ELSE|ELSEIF|END|ENVIRON|ERASE|ERROR|EXIT|FIELD|FILES|FOR|FUNCTION|GET|GOSUB|GOTO|IF|INPUT|INTEGER|IOCTL|KEY|KILL|LINE INPUT|LOCATE|LOCK|LONG|LOOP|LSET|MKDIR|NAME|NEXT|OFF|ON(?: COM| ERROR| KEY| TIMER)?|OPEN|OPTION BASE|OUT|POKE|PUT|READ|REDIM|REM|RESTORE|RESUME|RETURN|RMDIR|RSET|RUN|SHARED|SINGLE|SELECT CASE|SHELL|SLEEP|STATIC|STEP|STOP|STRING|SUB|SWAP|SYSTEM|THEN|TIMER|TO|TROFF|TRON|TYPE|UNLOCK|UNTIL|USING|VIEW PRINT|WAIT|WEND|WHILE|WRITE)(?:\$|\b)/i,
  "function": /\b(?:ABS|ACCESS|ACOS|ANGLE|AREA|ARITHMETIC|ARRAY|ASIN|ASK|AT|ATN|BASE|BEGIN|BREAK|CAUSE|CEIL|CHR|CLIP|COLLATE|COLOR|CON|COS|COSH|COT|CSC|DATE|DATUM|DEBUG|DECIMAL|DEF|DEG|DEGREES|DELETE|DET|DEVICE|DISPLAY|DOT|ELAPSED|EPS|ERASABLE|EXLINE|EXP|EXTERNAL|EXTYPE|FILETYPE|FIXED|FP|GO|GRAPH|HANDLER|IDN|IMAGE|IN|INT|INTERNAL|IP|IS|KEYED|LBOUND|LCASE|LEFT|LEN|LENGTH|LET|LINE|LINES|LOG|LOG10|LOG2|LTRIM|MARGIN|MAT|MAX|MAXNUM|MID|MIN|MISSING|MOD|NATIVE|NUL|NUMERIC|OF|OPTION|ORD|ORGANIZATION|OUTIN|OUTPUT|PI|POINT|POINTER|POINTS|POS|PRINT|PROGRAM|PROMPT|RAD|RADIANS|RANDOMIZE|RECORD|RECSIZE|RECTYPE|RELATIVE|REMAINDER|REPEAT|REST|RETRY|REWRITE|RIGHT|RND|ROUND|RTRIM|SAME|SEC|SELECT|SEQUENTIAL|SET|SETTER|SGN|SIN|SINH|SIZE|SKIP|SQR|STANDARD|STATUS|STR|STREAM|STYLE|TAB|TAN|TANH|TEMPLATE|TEXT|THERE|TIME|TIMEOUT|TRACE|TRANSFORM|TRUNCATE|UBOUND|UCASE|USE|VAL|VARIABLE|VIEWPORT|WHEN|WINDOW|WITH|ZER|ZONEWIDTH)(?:\$|\b)/i,
  operator: /<[=>]?|>=?|[+\-*\/^=&]|\b(?:AND|EQV|IMP|NOT|OR|XOR)\b/i,
  punctuation: /[,;:()]/
};
Prism.languages.c = Prism.languages.extend("clike", {
  keyword: /\b(asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/,
  operator: /\-[>-]?|\+\+?|!=?|<<?=?|>>?=?|==?|&&?|\|?\||[~^%?*\/]/,
  number: /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)[ful]*\b/i
}),
Prism.languages.insertBefore("c", "string", {
  macro: {
    pattern: /(^\s*)#\s*[a-z]+([^\r\n\\]|\\.|\\(?:\r\n?|\n))*/im,
    lookbehind: !0,
    alias: "property",
    inside: {
      string: {
        pattern: /(#\s*include\s*)(<.+?>|("|')(\\?.)+?\3)/,
        lookbehind: !0
      },
      directive: {
        pattern: /(#\s*)\b(define|elif|else|endif|error|ifdef|ifndef|if|import|include|line|pragma|undef|using)\b/,
        lookbehind: !0,
        alias: "keyword"
      }
    }
  },
  constant: /\b(__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|__func__|EOF|NULL|stdin|stdout|stderr)\b/
}),
delete Prism.languages.c["class-name"],
delete Prism.languages.c["boolean"];
Prism.languages.csharp = Prism.languages.extend("clike", {
  keyword: /\b(abstract|as|async|await|base|bool|break|byte|case|catch|char|checked|class|const|continue|decimal|default|delegate|do|double|else|enum|event|explicit|extern|false|finally|fixed|float|for|foreach|goto|if|implicit|in|int|interface|internal|is|lock|long|namespace|new|null|object|operator|out|override|params|private|protected|public|readonly|ref|return|sbyte|sealed|short|sizeof|stackalloc|static|string|struct|switch|this|throw|true|try|typeof|uint|ulong|unchecked|unsafe|ushort|using|virtual|void|volatile|while|add|alias|ascending|async|await|descending|dynamic|from|get|global|group|into|join|let|orderby|partial|remove|select|set|value|var|where|yield)\b/,
  string: [/@("|')(\1\1|\\\1|\\?(?!\1)[\s\S])*\1/, /("|')(\\?.)*?\1/],
  number: /\b-?(0x[\da-f]+|\d*\.?\d+f?)\b/i
}),
Prism.languages.insertBefore("csharp", "keyword", {
  preprocessor: {
    pattern: /(^\s*)#.*/m,
    lookbehind: !0,
    alias: "property",
    inside: {
      directive: {
        pattern: /(\s*#)\b(define|elif|else|endif|endregion|error|if|line|pragma|region|undef|warning)\b/,
        lookbehind: !0,
        alias: "keyword"
      }
    }
  }
});
Prism.languages.cpp = Prism.languages.extend("c", {
  keyword: /\b(alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|class|compl|const|constexpr|const_cast|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|float|for|friend|goto|if|inline|int|long|mutable|namespace|new|noexcept|nullptr|operator|private|protected|public|register|reinterpret_cast|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/,
  "boolean": /\b(true|false)\b/,
  operator: /[-+]{1,2}|!=?|<{1,2}=?|>{1,2}=?|\->|:{1,2}|={1,2}|\^|~|%|&{1,2}|\|?\||\?|\*|\/|\b(and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/
}),
Prism.languages.insertBefore("cpp", "keyword", {
  "class-name": {
    pattern: /(class\s+)[a-z0-9_]+/i,
    lookbehind: !0
  }
}); !
function(e) {
  var n = /#(?!\{).+/,
  t = {
    pattern: /#\{[^}]+\}/,
    alias: "variable"
  };
  e.languages.coffeescript = e.languages.extend("javascript", {
    comment: n,
    string: [/'(?:\\?[^\\])*?'/, {
      pattern: /"(?:\\?[^\\])*?"/,
      inside: {
        interpolation: t
      }
    }],
    keyword: /\b(and|break|by|catch|class|continue|debugger|delete|do|each|else|extend|extends|false|finally|for|if|in|instanceof|is|isnt|let|loop|namespace|new|no|not|null|of|off|on|or|own|return|super|switch|then|this|throw|true|try|typeof|undefined|unless|until|when|while|window|with|yes|yield)\b/,
    "class-member": {
      pattern: /@(?!\d)\w+/,
      alias: "variable"
    }
  }),
  e.languages.insertBefore("coffeescript", "comment", {
    "multiline-comment": {
      pattern: /###[\s\S]+?###/,
      alias: "comment"
    },
    "block-regex": {
      pattern: /\/{3}[\s\S]*?\/{3}/,
      alias: "regex",
      inside: {
        comment: n,
        interpolation: t
      }
    }
  }),
  e.languages.insertBefore("coffeescript", "string", {
    "inline-javascript": {
      pattern: /`(?:\\?[\s\S])*?`/,
      inside: {
        delimiter: {
          pattern: /^`|`$/,
          alias: "punctuation"
        },
        rest: e.languages.javascript
      }
    },
    "multiline-string": [{
      pattern: /'''[\s\S]*?'''/,
      alias: "string"
    },
    {
      pattern: /"""[\s\S]*?"""/,
      alias: "string",
      inside: {
        interpolation: t
      }
    }]
  }),
  e.languages.insertBefore("coffeescript", "keyword", {
    property: /(?!\d)\w+(?=\s*:(?!:))/
  })
} (Prism); !
function(e) {
  e.languages.ruby = e.languages.extend("clike", {
    comment: /#(?!\{[^\r\n]*?\}).*/,
    keyword: /\b(alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|false|for|if|in|module|new|next|nil|not|or|raise|redo|require|rescue|retry|return|self|super|then|throw|true|undef|unless|until|when|while|yield)\b/
  });
  var n = {
    pattern: /#\{[^}]+\}/,
    inside: {
      delimiter: {
        pattern: /^#\{|\}$/,
        alias: "tag"
      },
      rest: e.util.clone(e.languages.ruby)
    }
  };
  e.languages.insertBefore("ruby", "keyword", {
    regex: [{
      pattern: /%r([^a-zA-Z0-9\s\{\(\[<])(?:[^\\]|\\[\s\S])*?\1[gim]{0,3}/,
      inside: {
        interpolation: n
      }
    },
    {
      pattern: /%r\((?:[^()\\]|\\[\s\S])*\)[gim]{0,3}/,
      inside: {
        interpolation: n
      }
    },
    {
      pattern: /%r\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}[gim]{0,3}/,
      inside: {
        interpolation: n
      }
    },
    {
      pattern: /%r\[(?:[^\[\]\\]|\\[\s\S])*\][gim]{0,3}/,
      inside: {
        interpolation: n
      }
    },
    {
      pattern: /%r<(?:[^<>\\]|\\[\s\S])*>[gim]{0,3}/,
      inside: {
        interpolation: n
      }
    },
    {
      pattern: /(^|[^\/])\/(?!\/)(\[.+?]|\\.|[^\/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/,
      lookbehind: !0
    }],
    variable: /[@$]+[a-zA-Z_][a-zA-Z_0-9]*(?:[?!]|\b)/,
    symbol: /:[a-zA-Z_][a-zA-Z_0-9]*(?:[?!]|\b)/
  }),
  e.languages.insertBefore("ruby", "number", {
    builtin: /\b(Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|File|Fixnum|Fload|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,
    constant: /\b[A-Z][a-zA-Z_0-9]*(?:[?!]|\b)/
  }),
  e.languages.ruby.string = [{
    pattern: /%[qQiIwWxs]?([^a-zA-Z0-9\s\{\(\[<])(?:[^\\]|\\[\s\S])*?\1/,
    inside: {
      interpolation: n
    }
  },
  {
    pattern: /%[qQiIwWxs]?\((?:[^()\\]|\\[\s\S])*\)/,
    inside: {
      interpolation: n
    }
  },
  {
    pattern: /%[qQiIwWxs]?\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}/,
    inside: {
      interpolation: n
    }
  },
  {
    pattern: /%[qQiIwWxs]?\[(?:[^\[\]\\]|\\[\s\S])*\]/,
    inside: {
      interpolation: n
    }
  },
  {
    pattern: /%[qQiIwWxs]?<(?:[^<>\\]|\\[\s\S])*>/,
    inside: {
      interpolation: n
    }
  },
  {
    pattern: /("|')(#\{[^}]+\}|\\(?:\r?\n|\r)|\\?.)*?\1/,
    inside: {
      interpolation: n
    }
  }]
} (Prism);
Prism.languages.css.selector = {
  pattern: /[^\{\}\s][^\{\}]*(?=\s*\{)/,
  inside: {
    "pseudo-element": /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
    "pseudo-class": /:[-\w]+(?:\(.*\))?/,
    "class": /\.[-:\.\w]+/,
    id: /#[-:\.\w]+/
  }
},
Prism.languages.insertBefore("css", "function", {
  hexcode: /#[\da-f]{3,6}/i,
  entity: /\\[\da-f]{1,8}/i,
  number: /[\d%\.]+/
});
Prism.languages.diff = {
  coord: [/^(?:\*{3}|-{3}|\+{3}).*$/m, /^@@.*@@$/m, /^\d+.*$/m],
  deleted: /^[-<].+$/m,
  inserted: /^[+>].+$/m,
  diff: {
    pattern: /^!(?!!).+$/m,
    alias: "important"
  }
};
Prism.languages.erlang = {
  comment: /%.+/,
  string: /"(?:\\?.)*?"/,
  "quoted-function": {
    pattern: /'(?:\\.|[^'\\])+'(?=\()/,
    alias: "function"
  },
  "quoted-atom": {
    pattern: /'(?:\\.|[^'\\])+'/,
    alias: "atom"
  },
  "boolean": /\b(?:true|false)\b/,
  keyword: /\b(?:fun|when|case|of|end|if|receive|after|try|catch)\b/,
  number: [/\$\\?./, /\d+#[a-z0-9]+/i, /(?:\b|-)\d*\.?\d+([Ee][+-]?\d+)?\b/],
  "function": /\b[a-z][\w@]*(?=\()/,
  variable: {
    pattern: /(^|[^@])(?:\b|\?)[A-Z_][\w@]*/,
    lookbehind: !0
  },
  operator: [/[=\/<>:]=|=[:\/]=|\+\+?|--?|[=*\/!]|\b(?:bnot|div|rem|band|bor|bxor|bsl|bsr|not|and|or|xor|orelse|andalso)\b/, {
    pattern: /(^|[^<])<(?!<)/,
    lookbehind: !0
  },
  {
    pattern: /(^|[^>])>(?!>)/,
    lookbehind: !0
  }],
  atom: /\b[a-z][\w@]*/,
  punctuation: /[()[\]{}:;,.#|]|<<|>>/
};
Prism.languages.fsharp = Prism.languages.extend("clike", {
  comment: [{
    pattern: /(^|[^\\])\(\*[\w\W]*?\*\)/,
    lookbehind: !0
  },
  {
    pattern: /(^|[^\\:])\/\/.*/,
    lookbehind: !0
  }],
  keyword: /\b(?:let|return|use|yield)(?:!\B|\b)|\b(abstract|and|as|assert|base|begin|class|default|delegate|do|done|downcast|downto|elif|else|end|exception|extern|false|finally|for|fun|function|global|if|in|inherit|inline|interface|internal|lazy|match|member|module|mutable|namespace|new|not|null|of|open|or|override|private|public|rec|select|static|struct|then|to|true|try|type|upcast|val|void|when|while|with|asr|land|lor|lsl|lsr|lxor|mod|sig|atomic|break|checked|component|const|constraint|constructor|continue|eager|event|external|fixed|functor|include|method|mixin|object|parallel|process|protected|pure|sealed|tailcall|trait|virtual|volatile)\b/,
  string: /(?:"""[\s\S]*?"""|@"(?:""|[^"])*"|("|')(?:\\\1|\\?(?!\1)[\s\S])*\1)B?/,
  number: [/\b-?0x[\da-fA-F]+(un|lf|LF)?\b/, /\b-?0b[01]+(y|uy)?\b/, /\b-?(\d*\.?\d+|\d+\.)([fFmM]|[eE][+-]?\d+)?\b/, /\b-?\d+(y|uy|s|us|l|u|ul|L|UL|I)?\b/]
}),
Prism.languages.insertBefore("fsharp", "keyword", {
  preprocessor: {
    pattern: /^[^\r\n\S]*#.*/m,
    alias: "property",
    inside: {
      directive: {
        pattern: /(\s*#)\b(else|endif|if|light|line|nowarn)\b/,
        lookbehind: !0,
        alias: "keyword"
      }
    }
  }
});
Prism.languages.fortran = {
  "quoted-number": {
    pattern: /[BOZ](['"])[A-F0-9]+\1/i,
    alias: "number"
  },
  string: {
    pattern: /(?:\w+_)?(['"])(?:\1\1|&(?:\r\n?|\n)(?:\s*!.+(?:\r\n?|\n))?|(?!\1).)*(?:\1|&)/,
    inside: {
      comment: {
        pattern: /(&(?:\r\n?|\n)\s*)!.*/,
        lookbehind: !0
      }
    }
  },
  comment: /!.*/,
  "boolean": /\.(?:TRUE|FALSE)\.(?:_\w+)?/i,
  number: /(?:\b|[+-])(?:\d+(?:\.\d*)?|\.\d+)(?:[ED][+-]?\d+)?(?:_\w+)?/i,
  keyword: [/\b(?:INTEGER|REAL|DOUBLE ?PRECISION|COMPLEX|CHARACTER|LOGICAL)\b/i, /\b(?:END ?)?(?:BLOCK ?DATA|DO|FILE|FORALL|FUNCTION|IF|INTERFACE|MODULE(?! PROCEDURE)|PROGRAM|SELECT|SUBROUTINE|TYPE|WHERE)\b/i, /\b(?:ALLOCATABLE|ALLOCATE|BACKSPACE|CALL|CASE|CLOSE|COMMON|CONTAINS|CONTINUE|CYCLE|DATA|DEALLOCATE|DIMENSION|DO|END|EQUIVALENCE|EXIT|EXTERNAL|FORMAT|GO ?TO|IMPLICIT(?: NONE)?|INQUIRE|INTENT|INTRINSIC|MODULE PROCEDURE|NAMELIST|NULLIFY|OPEN|OPTIONAL|PARAMETER|POINTER|PRINT|PRIVATE|PUBLIC|READ|RETURN|REWIND|SAVE|SELECT|STOP|TARGET|WHILE|WRITE)\b/i, /\b(?:ASSIGNMENT|DEFAULT|ELEMENTAL|ELSE|ELSEWHERE|ELSEIF|ENTRY|IN|INCLUDE|INOUT|KIND|NULL|ONLY|OPERATOR|OUT|PURE|RECURSIVE|RESULT|SEQUENCE|STAT|THEN|USE)\b/i],
  operator: [/\*\*|\/\/|=>|[=\/]=|[<>]=?|::|[+\-*=%]|\.(?:EQ|NE|LT|LE|GT|GE|NOT|AND|OR|EQV|NEQV)\.|\.[A-Z]+\./i, {
    pattern: /(^|(?!\().)\/(?!\))/,
    lookbehind: !0
  }],
  punctuation: /\(\/|\/\)|[(),;:&]/
};
Prism.languages.go = Prism.languages.extend("clike", {
  keyword: /\b(break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,
  builtin: /\b(bool|byte|complex(64|128)|error|float(32|64)|rune|string|u?int(8|16|32|64|)|uintptr|append|cap|close|complex|copy|delete|imag|len|make|new|panic|print(ln)?|real|recover)\b/,
  "boolean": /\b(_|iota|nil|true|false)\b/,
  operator: /[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,
  number: /\b(-?(0x[a-f\d]+|(\d+\.?\d*|\.\d+)(e[-+]?\d+)?)i?)\b/i,
  string: /("|'|`)(\\?.|\r|\n)*?\1/
}),
delete Prism.languages.go["class-name"];
Prism.languages.groovy = Prism.languages.extend("clike", {
  keyword: /\b(as|def|in|abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|native|new|package|private|protected|public|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|trait|transient|try|void|volatile|while)\b/,
  string: /("""|''')[\W\w]*?\1|("|'|\/)(?:\\?.)*?\2|(\$\/)(\$\/\$|[\W\w])*?\/\$/,
  number: /\b(?:0b[01_]+|0x[\da-f_]+(?:\.[\da-f_p\-]+)?|[\d_]+(?:\.[\d_]+)?(?:e[+-]?[\d]+)?)[glidf]?\b/i,
  operator: {
    pattern: /(^|[^.])(~|==?~?|\?[.:]?|\*(?:[.=]|\*=?)?|\.[@&]|\.\.<|\.{1,2}(?!\.)|-[-=>]?|\+[+=]?|!=?|<(?:<=?|=>?)?|>(?:>>?=?|=)?|&[&=]?|\|[|=]?|\/=?|\^=?|%=?)/,
    lookbehind: !0
  },
  punctuation: /\.+|[{}[\];(),:$]/
}),
Prism.languages.insertBefore("groovy", "string", {
  shebang: {
    pattern: /#!.+/,
    alias: "comment"
  }
}),
Prism.languages.insertBefore("groovy", "punctuation", {
  "spock-block": /\b(setup|given|when|then|and|cleanup|expect|where):/
}),
Prism.languages.insertBefore("groovy", "function", {
  annotation: {
    pattern: /(^|[^.])@\w+/,
    lookbehind: !0
  }
}),
Prism.hooks.add("wrap",
function(e) {
  if ("groovy" === e.language && "string" === e.type) {
    var t = e.content[0];
    if ("'" != t) {
      var n = /([^\\])(\$(\{.*?\}|[\w\.]+))/;
      "$" === t && (n = /([^\$])(\$(\{.*?\}|[\w\.]+))/),
      e.content = Prism.highlight(e.content, {
        expression: {
          pattern: n,
          lookbehind: !0,
          inside: Prism.languages.groovy
        }
      }),
      e.classes.push("/" === t ? "regex": "gstring")
    }
  }
});
Prism.languages.haskell = {
  comment: {
    pattern: /(^|[^-!#$%*+=?&@|~.:<>^\\\/])(--[^-!#$%*+=?&@|~.:<>^\\\/].*|{-[\w\W]*?-})/m,
    lookbehind: !0
  },
  "char": /'([^\\']|\\([abfnrtv\\"'&]|\^[A-Z@[\]\^_]|NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS|HT|LF|VT|FF|CR|SO|SI|DLE|DC1|DC2|DC3|DC4|NAK|SYN|ETB|CAN|EM|SUB|ESC|FS|GS|RS|US|SP|DEL|\d+|o[0-7]+|x[0-9a-fA-F]+))'/,
  string: /"([^\\"]|\\([abfnrtv\\"'&]|\^[A-Z@[\]\^_]|NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS|HT|LF|VT|FF|CR|SO|SI|DLE|DC1|DC2|DC3|DC4|NAK|SYN|ETB|CAN|EM|SUB|ESC|FS|GS|RS|US|SP|DEL|\d+|o[0-7]+|x[0-9a-fA-F]+)|\\\s+\\)*"/,
  keyword: /\b(case|class|data|deriving|do|else|if|in|infixl|infixr|instance|let|module|newtype|of|primitive|then|type|where)\b/,
  import_statement: {
    pattern: /(\r?\n|\r|^)\s*import\s+(qualified\s+)?([A-Z][_a-zA-Z0-9']*)(\.[A-Z][_a-zA-Z0-9']*)*(\s+as\s+([A-Z][_a-zA-Z0-9']*)(\.[A-Z][_a-zA-Z0-9']*)*)?(\s+hiding\b)?/m,
    inside: {
      keyword: /\b(import|qualified|as|hiding)\b/
    }
  },
  builtin: /\b(abs|acos|acosh|all|and|any|appendFile|approxRational|asTypeOf|asin|asinh|atan|atan2|atanh|basicIORun|break|catch|ceiling|chr|compare|concat|concatMap|const|cos|cosh|curry|cycle|decodeFloat|denominator|digitToInt|div|divMod|drop|dropWhile|either|elem|encodeFloat|enumFrom|enumFromThen|enumFromThenTo|enumFromTo|error|even|exp|exponent|fail|filter|flip|floatDigits|floatRadix|floatRange|floor|fmap|foldl|foldl1|foldr|foldr1|fromDouble|fromEnum|fromInt|fromInteger|fromIntegral|fromRational|fst|gcd|getChar|getContents|getLine|group|head|id|inRange|index|init|intToDigit|interact|ioError|isAlpha|isAlphaNum|isAscii|isControl|isDenormalized|isDigit|isHexDigit|isIEEE|isInfinite|isLower|isNaN|isNegativeZero|isOctDigit|isPrint|isSpace|isUpper|iterate|last|lcm|length|lex|lexDigits|lexLitChar|lines|log|logBase|lookup|map|mapM|mapM_|max|maxBound|maximum|maybe|min|minBound|minimum|mod|negate|not|notElem|null|numerator|odd|or|ord|otherwise|pack|pi|pred|primExitWith|print|product|properFraction|putChar|putStr|putStrLn|quot|quotRem|range|rangeSize|read|readDec|readFile|readFloat|readHex|readIO|readInt|readList|readLitChar|readLn|readOct|readParen|readSigned|reads|readsPrec|realToFrac|recip|rem|repeat|replicate|return|reverse|round|scaleFloat|scanl|scanl1|scanr|scanr1|seq|sequence|sequence_|show|showChar|showInt|showList|showLitChar|showParen|showSigned|showString|shows|showsPrec|significand|signum|sin|sinh|snd|sort|span|splitAt|sqrt|subtract|succ|sum|tail|take|takeWhile|tan|tanh|threadToIOResult|toEnum|toInt|toInteger|toLower|toRational|toUpper|truncate|uncurry|undefined|unlines|until|unwords|unzip|unzip3|userError|words|writeFile|zip|zip3|zipWith|zipWith3)\b/,
  number: /\b(\d+(\.\d+)?(e[+-]?\d+)?|0o[0-7]+|0x[0-9a-f]+)\b/i,
  operator: /\s\.\s|[-!#$%*+=?&@|~.:<>^\\\/]*\.[-!#$%*+=?&@|~.:<>^\\\/]+|[-!#$%*+=?&@|~.:<>^\\\/]+\.[-!#$%*+=?&@|~.:<>^\\\/]*|[-!#$%*+=?&@|~:<>^\\\/]+|`([A-Z][_a-zA-Z0-9']*\.)*[_a-z][_a-zA-Z0-9']*`/,
  hvariable: /\b([A-Z][_a-zA-Z0-9']*\.)*[_a-z][_a-zA-Z0-9']*\b/,
  constant: /\b([A-Z][_a-zA-Z0-9']*\.)*[A-Z][_a-zA-Z0-9']*\b/,
  punctuation: /[{}[\];(),.:]/
};
Prism.languages.java = Prism.languages.extend("clike", {
  keyword: /\b(abstract|continue|for|new|switch|assert|default|goto|package|synchronized|boolean|do|if|private|this|break|double|implements|protected|throw|byte|else|import|public|throws|case|enum|instanceof|return|transient|catch|extends|int|short|try|char|final|interface|static|void|class|finally|long|strictfp|volatile|const|float|native|super|while)\b/,
  number: /\b0b[01]+\b|\b0x[\da-f]*\.?[\da-fp\-]+\b|\b\d*\.?\d+(?:e[+-]?\d+)?[df]?\b/i,
  operator: {
    pattern: /(^|[^.])(?:\+[+=]?|-[-=]?|!=?|<<?=?|>>?>?=?|==?|&[&=]?|\|[|=]?|\*=?|\/=?|%=?|\^=?|[?:~])/m,
    lookbehind: !0
  }
}); !
function(a) {
  var e = /\\([^a-z()[\]]|[a-z\*]+)/i,
  n = {
    "equation-command": {
      pattern: e,
      alias: "regex"
    }
  };
  a.languages.latex = {
    comment: /%.*/m,
    cdata: {
      pattern: /(\\begin\{((?:verbatim|lstlisting)\*?)\})([\w\W]*?)(?=\\end\{\2\})/,
      lookbehind: !0
    },
    equation: [{
      pattern: /\$(?:\\?[\w\W])*?\$|\\\((?:\\?[\w\W])*?\\\)|\\\[(?:\\?[\w\W])*?\\\]/,
      inside: n,
      alias: "string"
    },
    {
      pattern: /(\\begin\{((?:equation|math|eqnarray|align|multline|gather)\*?)\})([\w\W]*?)(?=\\end\{\2\})/,
      lookbehind: !0,
      inside: n,
      alias: "string"
    }],
    keyword: {
      pattern: /(\\(?:begin|end|ref|cite|label|usepackage|documentclass)(?:\[[^\]]+\])?\{)[^}]+(?=\})/,
      lookbehind: !0
    },
    url: {
      pattern: /(\\url\{)[^}]+(?=\})/,
      lookbehind: !0
    },
    headline: {
      pattern: /(\\(?:part|chapter|section|subsection|frametitle|subsubsection|paragraph|subparagraph|subsubparagraph|subsubsubparagraph)\*?(?:\[[^\]]+\])?\{)[^}]+(?=\}(?:\[[^\]]+\])?)/,
      lookbehind: !0,
      alias: "class-name"
    },
    "function": {
      pattern: e,
      alias: "selector"
    },
    punctuation: /[[\]{}&]/
  }
} (Prism);
Prism.languages.less = Prism.languages.extend("css", {
  comment: [/\/\*[\w\W]*?\*\//, {
    pattern: /(^|[^\\])\/\/.*/,
    lookbehind: !0
  }],
  atrule: {
    pattern: /@[\w-]+?(?:\([^{}]+\)|[^(){};])*?(?=\s*\{)/i,
    inside: {
      punctuation: /[:()]/
    }
  },
  selector: {
    pattern: /(?:@\{[\w-]+\}|[^{};\s@])(?:@\{[\w-]+\}|\([^{}]*\)|[^{};@])*?(?=\s*\{)/,
    inside: {
      variable: /@+[\w-]+/
    }
  },
  property: /(?:@\{[\w-]+\}|[\w-])+(?:\+_?)?(?=\s*:)/i,
  punctuation: /[{}();:,]/,
  operator: /[+\-*\/]/
}),
Prism.languages.insertBefore("less", "punctuation", {
  "function": Prism.languages.less.
  function
}),
Prism.languages.insertBefore("less", "property", {
  variable: [{
    pattern: /@[\w-]+\s*:/,
    inside: {
      punctuation: /:/
    }
  },
  /@@?[\w-]+/],
  "mixin-usage": {
    pattern: /([{;]\s*)[.#](?!\d)[\w-]+.*?(?=[(;])/,
    lookbehind: !0,
    alias: "function"
  }
});
Prism.languages.matlab = {
  string: /\B'(?:''|[^'\n])*'/,
  comment: [/%\{[\s\S]*?\}%/, /%.+/],
  number: /\b-?(?:\d*\.?\d+(?:[eE][+-]?\d+)?(?:[ij])?|[ij])\b/,
  keyword: /\b(?:break|case|catch|continue|else|elseif|end|for|function|if|inf|NaN|otherwise|parfor|pause|pi|return|switch|try|while)\b/,
  "function": /(?!\d)\w+(?=\s*\()/,
  operator: /\.?[*^\/\\']|[+\-:@]|[<>=~]=?|&&?|\|\|?/,
  punctuation: /\.{3}|[.,;\[\](){}!]/
};
Prism.languages.objectivec = Prism.languages.extend("c", {
  keyword: /\b(asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while|in|self|super)\b|(@interface|@end|@implementation|@protocol|@class|@public|@protected|@private|@property|@try|@catch|@finally|@throw|@synthesize|@dynamic|@selector)\b/,
  string: /("|')(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|@"(\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/,
  operator: /-[->]?|\+\+?|!=?|<<?=?|>>?=?|==?|&&?|\|\|?|[~^%?*\/@]/
});
Prism.languages.ocaml = {
  comment: /\(\*[\s\S]*?\*\)/,
  string: [/"(?:\\.|[^\\\r\n"])*"/, /(['`])(?:\\(?:\d+|x[\da-f]+|.)|(?!\1)[^\\\r\n])\1/i],
  number: /\b-?(?:0x[\da-f][\da-f_]+|(?:0[bo])?\d[\d_]*\.?[\d_]*(?:e[+-]?[\d_]+)?)/i,
  type: {
    pattern: /\B['`][a-z\d_]*/i,
    alias: "variable"
  },
  directive: {
    pattern: /\B#[a-z\d_]+/i,
    alias: "function"
  },
  keyword: /\b(?:as|assert|begin|class|constraint|do|done|downto|else|end|exception|external|for|fun|function|functor|if|in|include|inherit|initializer|lazy|let|match|method|module|mutable|new|object|of|open|prefix|private|rec|then|sig|struct|to|try|type|val|value|virtual|where|while|with)\b/,
  "boolean": /\b(?:false|true)\b/,
  operator: /:=|[=<>@^|&+\-*\/$%!?~][!$%&\*+\-.\/:<=>?@^|~]*|\b(?:and|asr|land|lor|lxor|lsl|lsr|mod|nor|or)\b/,
  punctuation: /[(){}\[\]|_.,:;]/
};
Prism.languages.perl = {
  comment: [{
    pattern: /(^\s*)=\w+[\s\S]*?=cut.*/m,
    lookbehind: !0
  },
  {
    pattern: /(^|[^\\$])#.*/,
    lookbehind: !0
  }],
  string: [/\b(?:q|qq|qx|qw)\s*([^a-zA-Z0-9\s\{\(\[<])(?:[^\\]|\\[\s\S])*?\1/, /\b(?:q|qq|qx|qw)\s+([a-zA-Z0-9])(?:[^\\]|\\[\s\S])*?\1/, /\b(?:q|qq|qx|qw)\s*\((?:[^()\\]|\\[\s\S])*\)/, /\b(?:q|qq|qx|qw)\s*\{(?:[^{}\\]|\\[\s\S])*\}/, /\b(?:q|qq|qx|qw)\s*\[(?:[^[\]\\]|\\[\s\S])*\]/, /\b(?:q|qq|qx|qw)\s*<(?:[^<>\\]|\\[\s\S])*>/, /("|`)(?:[^\\]|\\[\s\S])*?\1/, /'(?:[^'\\\r\n]|\\.)*'/],
  regex: [/\b(?:m|qr)\s*([^a-zA-Z0-9\s\{\(\[<])(?:[^\\]|\\[\s\S])*?\1[msixpodualngc]*/, /\b(?:m|qr)\s+([a-zA-Z0-9])(?:[^\\]|\\.)*?\1[msixpodualngc]*/, /\b(?:m|qr)\s*\((?:[^()\\]|\\[\s\S])*\)[msixpodualngc]*/, /\b(?:m|qr)\s*\{(?:[^{}\\]|\\[\s\S])*\}[msixpodualngc]*/, /\b(?:m|qr)\s*\[(?:[^[\]\\]|\\[\s\S])*\][msixpodualngc]*/, /\b(?:m|qr)\s*<(?:[^<>\\]|\\[\s\S])*>[msixpodualngc]*/, {
    pattern: /(^|[^-]\b)(?:s|tr|y)\s*([^a-zA-Z0-9\s\{\(\[<])(?:[^\\]|\\[\s\S])*?\2(?:[^\\]|\\[\s\S])*?\2[msixpodualngcer]*/,
    lookbehind: !0
  },
  {
    pattern: /(^|[^-]\b)(?:s|tr|y)\s+([a-zA-Z0-9])(?:[^\\]|\\[\s\S])*?\2(?:[^\\]|\\[\s\S])*?\2[msixpodualngcer]*/,
    lookbehind: !0
  },
  {
    pattern: /(^|[^-]\b)(?:s|tr|y)\s*\((?:[^()\\]|\\[\s\S])*\)\s*\((?:[^()\\]|\\[\s\S])*\)[msixpodualngcer]*/,
    lookbehind: !0
  },
  {
    pattern: /(^|[^-]\b)(?:s|tr|y)\s*\{(?:[^{}\\]|\\[\s\S])*\}\s*\{(?:[^{}\\]|\\[\s\S])*\}[msixpodualngcer]*/,
    lookbehind: !0
  },
  {
    pattern: /(^|[^-]\b)(?:s|tr|y)\s*\[(?:[^[\]\\]|\\[\s\S])*\]\s*\[(?:[^[\]\\]|\\[\s\S])*\][msixpodualngcer]*/,
    lookbehind: !0
  },
  {
    pattern: /(^|[^-]\b)(?:s|tr|y)\s*<(?:[^<>\\]|\\[\s\S])*>\s*<(?:[^<>\\]|\\[\s\S])*>[msixpodualngcer]*/,
    lookbehind: !0
  },
  /\/(?:[^\/\\\r\n]|\\.)*\/[msixpodualngc]*(?=\s*(?:$|[\r\n,.;})&|\-+*~<>!?^]|(lt|gt|le|ge|eq|ne|cmp|not|and|or|xor|x)\b))/],
  variable: [/[&*$@%]\{\^[A-Z]+\}/, /[&*$@%]\^[A-Z_]/, /[&*$@%]#?(?=\{)/, /[&*$@%]#?((::)*'?(?!\d)[\w$]+)+(::)*/i, /[&*$@%]\d+/, /(?!%=)[$@%][!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~]/],
  filehandle: {
    pattern: /<(?![<=])\S*>|\b_\b/,
    alias: "symbol"
  },
  vstring: {
    pattern: /v\d+(\.\d+)*|\d+(\.\d+){2,}/,
    alias: "string"
  },
  "function": {
    pattern: /sub [a-z0-9_]+/i,
    inside: {
      keyword: /sub/
    }
  },
  keyword: /\b(any|break|continue|default|delete|die|do|else|elsif|eval|for|foreach|given|goto|if|last|local|my|next|our|package|print|redo|require|say|state|sub|switch|undef|unless|until|use|when|while)\b/,
  number: /\b-?(0x[\dA-Fa-f](_?[\dA-Fa-f])*|0b[01](_?[01])*|(\d(_?\d)*)?\.?\d(_?\d)*([Ee][+-]?\d+)?)\b/,
  operator: /-[rwxoRWXOezsfdlpSbctugkTBMAC]\b|\+[+=]?|-[-=>]?|\*\*?=?|\/\/?=?|=[=~>]?|~[~=]?|\|\|?=?|&&?=?|<(?:=>?|<=?)?|>>?=?|![~=]?|[%^]=?|\.(?:=|\.\.?)?|[\\?]|\bx(?:=|\b)|\b(lt|gt|le|ge|eq|ne|cmp|not|and|or|xor)\b/,
  punctuation: /[{}[\];(),:]/
};
Prism.languages.php = Prism.languages.extend("clike", {
  keyword: /\b(and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|private|protected|parent|throw|null|echo|print|trait|namespace|final|yield|goto|instanceof|finally|try|catch)\b/i,
  constant: /\b[A-Z0-9_]{2,}\b/,
  comment: {
    pattern: /(^|[^\\])(?:\/\*[\w\W]*?\*\/|\/\/.*)/,
    lookbehind: !0
  }
}),
Prism.languages.insertBefore("php", "class-name", {
  "shell-comment": {
    pattern: /(^|[^\\])#.*/,
    lookbehind: !0,
    alias: "comment"
  }
}),
Prism.languages.insertBefore("php", "keyword", {
  delimiter: /\?>|<\?(?:php)?/i,
  variable: /\$\w+\b/i,
  "package": {
    pattern: /(\\|namespace\s+|use\s+)[\w\\]+/,
    lookbehind: !0,
    inside: {
      punctuation: /\\/
    }
  }
}),
Prism.languages.insertBefore("php", "operator", {
  property: {
    pattern: /(->)[\w]+/,
    lookbehind: !0
  }
}),
Prism.languages.markup && (Prism.hooks.add("before-highlight",
function(e) {
  "php" === e.language && (e.tokenStack = [], e.backupCode = e.code, e.code = e.code.replace(/(?:<\?php|<\?)[\w\W]*?(?:\?>)/gi,
  function(a) {
    return e.tokenStack.push(a),
    "{{{PHP" + e.tokenStack.length + "}}}"
  }))
}), Prism.hooks.add("before-insert",
function(e) {
  "php" === e.language && (e.code = e.backupCode, delete e.backupCode)
}), Prism.hooks.add("after-highlight",
function(e) {
  if ("php" === e.language) {
    for (var a, n = 0; a = e.tokenStack[n]; n++) e.highlightedCode = e.highlightedCode.replace("{{{PHP" + (n + 1) + "}}}", Prism.highlight(a, e.grammar, "php").replace(/\$/g, "$$$$"));
    e.element.innerHTML = e.highlightedCode
  }
}), Prism.hooks.add("wrap",
function(e) {
  "php" === e.language && "markup" === e.type && (e.content = e.content.replace(/(\{\{\{PHP[0-9]+\}\}\})/g, '<span class="token php">$1</span>'))
}), Prism.languages.insertBefore("php", "comment", {
  markup: {
    pattern: /<[^?]\/?(.*?)>/,
    inside: Prism.languages.markup
  },
  php: /\{\{\{PHP[0-9]+\}\}\}/
}));
Prism.languages.insertBefore("php", "variable", {
  "this": /\$this\b/,
  global: /\$(?:_(?:SERVER|GET|POST|FILES|REQUEST|SESSION|ENV|COOKIE)|GLOBALS|HTTP_RAW_POST_DATA|argc|argv|php_errormsg|http_response_header)/,
  scope: {
    pattern: /\b[\w\\]+::/,
    inside: {
      keyword: /(static|self|parent)/,
      punctuation: /(::|\\)/
    }
  }
});
Prism.languages.powershell = {
  comment: [{
    pattern: /(^|[^`])<#[\w\W]*?#>/,
    lookbehind: !0
  },
  {
    pattern: /(^|[^`])#.+/,
    lookbehind: !0
  }],
  string: [{
    pattern: /"(`?[\w\W])*?"/,
    inside: {
      "function": {
        pattern: /[^`]\$\(.*?\)/,
        inside: {}
      }
    }
  },
  /'([^']|'')*'/],
  namespace: /\[[a-z][\w\W]*?\]/i,
  "boolean": /\$(true|false)\b/i,
  variable: /\$\w+\b/i,
  "function": [/\b(Add-(Computer|Content|History|Member|PSSnapin|Type)|Checkpoint-Computer|Clear-(Content|EventLog|History|Item|ItemProperty|Variable)|Compare-Object|Complete-Transaction|Connect-PSSession|ConvertFrom-(Csv|Json|StringData)|Convert-Path|ConvertTo-(Csv|Html|Json|Xml)|Copy-(Item|ItemProperty)|Debug-Process|Disable-(ComputerRestore|PSBreakpoint|PSRemoting|PSSessionConfiguration)|Disconnect-PSSession|Enable-(ComputerRestore|PSBreakpoint|PSRemoting|PSSessionConfiguration)|Enter-PSSession|Exit-PSSession|Export-(Alias|Clixml|Console|Csv|FormatData|ModuleMember|PSSession)|ForEach-Object|Format-(Custom|List|Table|Wide)|Get-(Alias|ChildItem|Command|ComputerRestorePoint|Content|ControlPanelItem|Culture|Date|Event|EventLog|EventSubscriber|FormatData|Help|History|Host|HotFix|Item|ItemProperty|Job|Location|Member|Module|Process|PSBreakpoint|PSCallStack|PSDrive|PSProvider|PSSession|PSSessionConfiguration|PSSnapin|Random|Service|TraceSource|Transaction|TypeData|UICulture|Unique|Variable|WmiObject)|Group-Object|Import-(Alias|Clixml|Csv|LocalizedData|Module|PSSession)|Invoke-(Command|Expression|History|Item|RestMethod|WebRequest|WmiMethod)|Join-Path|Limit-EventLog|Measure-(Command|Object)|Move-(Item|ItemProperty)|New-(Alias|Event|EventLog|Item|ItemProperty|Module|ModuleManifest|Object|PSDrive|PSSession|PSSessionConfigurationFile|PSSessionOption|PSTransportOption|Service|TimeSpan|Variable|WebServiceProxy)|Out-(Default|File|GridView|Host|Null|Printer|String)|Pop-Location|Push-Location|Read-Host|Receive-(Job|PSSession)|Register-(EngineEvent|ObjectEvent|PSSessionConfiguration|WmiEvent)|Remove-(Computer|Event|EventLog|Item|ItemProperty|Job|Module|PSBreakpoint|PSDrive|PSSession|PSSnapin|TypeData|Variable|WmiObject)|Rename-(Computer|Item|ItemProperty)|Reset-ComputerMachinePassword|Resolve-Path|Restart-(Computer|Service)|Restore-Computer|Resume-(Job|Service)|Save-Help|Select-(Object|String|Xml)|Send-MailMessage|Set-(Alias|Content|Date|Item|ItemProperty|Location|PSBreakpoint|PSDebug|PSSessionConfiguration|Service|StrictMode|TraceSource|Variable|WmiInstance)|Show-(Command|ControlPanelItem|EventLog)|Sort-Object|Split-Path|Start-(Job|Process|Service|Sleep|Transaction)|Stop-(Computer|Job|Process|Service)|Suspend-(Job|Service)|Tee-Object|Test-(ComputerSecureChannel|Connection|ModuleManifest|Path|PSSessionConfigurationFile)|Trace-Command|Unblock-File|Undo-Transaction|Unregister-(Event|PSSessionConfiguration)|Update-(FormatData|Help|List|TypeData)|Use-Transaction|Wait-(Event|Job|Process)|Where-Object|Write-(Debug|Error|EventLog|Host|Output|Progress|Verbose|Warning))\b/i, /\b(ac|cat|chdir|clc|cli|clp|clv|compare|copy|cp|cpi|cpp|cvpa|dbp|del|diff|dir|ebp|echo|epal|epcsv|epsn|erase|fc|fl|ft|fw|gal|gbp|gc|gci|gcs|gdr|gi|gl|gm|gp|gps|group|gsv|gu|gv|gwmi|iex|ii|ipal|ipcsv|ipsn|irm|iwmi|iwr|kill|lp|ls|measure|mi|mount|move|mp|mv|nal|ndr|ni|nv|ogv|popd|ps|pushd|pwd|rbp|rd|rdr|ren|ri|rm|rmdir|rni|rnp|rp|rv|rvpa|rwmi|sal|saps|sasv|sbp|sc|select|set|shcm|si|sl|sleep|sls|sort|sp|spps|spsv|start|sv|swmi|tee|trcm|type|write)\b/i],
  keyword: /\b(Begin|Break|Catch|Class|Continue|Data|Define|Do|DynamicParam|Else|ElseIf|End|Exit|Filter|Finally|For|ForEach|From|Function|If|InlineScript|Parallel|Param|Process|Return|Sequence|Switch|Throw|Trap|Try|Until|Using|Var|While|Workflow)\b/i,
  operator: {
    pattern: /(\W?)(!|-(eq|ne|gt|ge|lt|le|sh[lr]|not|b?(and|x?or)|(Not)?(Like|Match|Contains|In)|Replace|Join|is(Not)?|as)\b|-[-=]?|\+[+=]?|[*\/%]=?)/i,
    lookbehind: !0
  },
  punctuation: /[|{}[\];(),.]/
},
Prism.languages.powershell.string[0].inside.boolean = Prism.languages.powershell.boolean,
Prism.languages.powershell.string[0].inside.variable = Prism.languages.powershell.variable,
Prism.languages.powershell.string[0].inside.
function.inside = Prism.util.clone(Prism.languages.powershell);
Prism.languages.python = {
  "triple-quoted-string": {
    pattern: /"""[\s\S]+?"""|'''[\s\S]+?'''/,
    alias: "string"
  },
  comment: {
    pattern: /(^|[^\\])#.*/,
    lookbehind: !0
  },
  string: /("|')(?:\\?.)*?\1/,
  "function": {
    pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_][a-zA-Z0-9_]*(?=\()/g,
    lookbehind: !0
  },
  "class-name": {
    pattern: /(\bclass\s+)[a-z0-9_]+/i,
    lookbehind: !0
  },
  keyword: /\b(?:as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|pass|print|raise|return|try|while|with|yield)\b/,
  "boolean": /\b(?:True|False)\b/,
  number: /\b-?(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,
  operator: /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]|\b(?:or|and|not)\b/,
  punctuation: /[{}[\];(),.:]/
};
Prism.languages.r = {
  comment: /#.*/,
  string: /(['"])(?:\\?.)*?\1/,
  "percent-operator": {
    pattern: /%[^%\s]*%/,
    alias: "operator"
  },
  "boolean": /\b(?:TRUE|FALSE)\b/,
  ellipsis: /\.\.(?:\.|\d+)/,
  number: [/\b(?:NaN|Inf)\b/, /\b(?:0x[\dA-Fa-f]+(?:\.\d*)?|\d*\.?\d+)(?:[EePp][+-]?\d+)?[iL]?\b/],
  keyword: /\b(?:if|else|repeat|while|function|for|in|next|break|NULL|NA|NA_integer_|NA_real_|NA_complex_|NA_character_)\b/,
  operator: /->?>?|<(?:=|<?-)?|[>=!]=?|::?|&&?|\|\|?|[+*\/^$@~]/,
  punctuation: /[(){}\[\],;]/
}; !
function(a) {
  var s = a.util.clone(a.languages.javascript);
  a.languages.jsx = a.languages.extend("markup", s),
  a.languages.jsx.tag.pattern = /<\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+|(\{[\w\W]*?\})))?\s*)*\/?>/i,
  a.languages.jsx.tag.inside["attr-value"].pattern = /=[^\{](?:('|")[\w\W]*?(\1)|[^\s>]+)/i,
  a.languages.insertBefore("inside", "attr-value", {
    script: {
      pattern: /=(\{(?:\{[^}]*\}|[^}])+\})/i,
      inside: {
        "function": a.languages.javascript.
        function,
        punctuation: /[={}[\];(),.:]/,
        keyword: a.languages.javascript.keyword,
        "boolean": a.languages.javascript.boolean
      },
      alias: "language-javascript"
    }
  },
  a.languages.jsx.tag)
} (Prism); !
function(e) {
  e.languages.crystal = e.languages.extend("ruby", {
    keyword: [/\b(?:abstract|alias|as|asm|begin|break|case|class|def|do|else|elsif|end|ensure|enum|extend|for|fun|if|ifdef|include|instance_sizeof|lib|macro|module|next|of|out|pointerof|private|protected|rescue|return|require|self|sizeof|struct|super|then|type|typeof|union|unless|until|when|while|with|yield|__DIR__|__FILE__|__LINE__)\b/, {
      pattern: /(\.\s*)(?:is_a|responds_to)\?/,
      lookbehind: !0
    }],
    number: /\b(?:0b[01_]*[01]|0o[0-7_]*[0-7]|0x[0-9a-fA-F_]*[0-9a-fA-F]|(?:[0-9](?:[0-9_]*[0-9])?)(?:\.[0-9_]*[0-9])?(?:[eE][+-]?[0-9_]*[0-9])?)(?:_(?:[uif](?:8|16|32|64))?)?\b/
  });
  var t = e.util.clone(e.languages.crystal);
  e.languages.insertBefore("crystal", "string", {
    attribute: {
      pattern: /@\[.+?\]/,
      alias: "attr-name",
      inside: {
        delimiter: {
          pattern: /^@\[|\]$/,
          alias: "tag"
        },
        rest: t
      }
    },
    expansion: [{
      pattern: /\{\{.+?\}\}/,
      inside: {
        delimiter: {
          pattern: /^\{\{|\}\}$/,
          alias: "tag"
        },
        rest: t
      }
    },
    {
      pattern: /\{%.+?%\}/,
      inside: {
        delimiter: {
          pattern: /^\{%|%\}$/,
          alias: "tag"
        },
        rest: t
      }
    }]
  })
} (Prism);
Prism.languages.rust = {
  comment: [{
    pattern: /(^|[^\\])\/\*[\w\W]*?\*\//,
    lookbehind: !0
  },
  {
    pattern: /(^|[^\\:])\/\/.*/,
    lookbehind: !0
  }],
  string: [/b?r(#*)"(?:\\?.)*?"\1/, /b?("|')(?:\\?.)*?\1/],
  keyword: /\b(?:abstract|alignof|as|be|box|break|const|continue|crate|do|else|enum|extern|false|final|fn|for|if|impl|in|let|loop|match|mod|move|mut|offsetof|once|override|priv|pub|pure|ref|return|sizeof|static|self|struct|super|true|trait|type|typeof|unsafe|unsized|use|virtual|where|while|yield)\b/,
  attribute: {
    pattern: /#!?\[.+?\]/,
    alias: "attr-name"
  },
  "function": [/[a-z0-9_]+(?=\s*\()/i, /[a-z0-9_]+!(?=\s*\(|\[)/i],
  "macro-rules": {
    pattern: /[a-z0-9_]+!/i,
    alias: "function"
  },
  number: /\b-?(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0o[0-7](?:_?[0-7])*|0b[01](?:_?[01])*|(\d(_?\d)*)?\.?\d(_?\d)*([Ee][+-]?\d+)?)(?:_?(?:[iu](?:8|16|32|64)?|f32|f64))?\b/,
  "closure-params": {
    pattern: /\|[^|]*\|(?=\s*[{-])/,
    inside: {
      punctuation: /[\|:,]/,
      operator: /[&*]/
    }
  },
  punctuation: /[{}[\];(),:]|\.+|->/,
  operator: /[-+*\/%!^=]=?|@|&[&=]?|\|[|=]?|<<?=?|>>?=?/
}; !
function(e) {
  e.languages.sass = e.languages.extend("css", {
    comment: {
      pattern: /^([ \t]*)\/[\/*].*(?:(?:\r?\n|\r)\1[ \t]+.+)*/m,
      lookbehind: !0
    }
  }),
  e.languages.insertBefore("sass", "atrule", {
    "atrule-line": {
      pattern: /^(?:[ \t]*)[@+=].+/m,
      inside: {
        atrule: /(?:@[\w-]+|[+=])/m
      }
    }
  }),
  delete e.languages.sass.atrule;
  var a = /((\$[-_\w]+)|(#\{\$[-_\w]+\}))/i,
  t = [/[+*\/%]|[=!]=|<=?|>=?|\b(?:and|or|not)\b/, {
    pattern: /(\s+)-(?=\s)/,
    lookbehind: !0
  }];
  e.languages.insertBefore("sass", "property", {
    "variable-line": {
      pattern: /^[ \t]*\$.+/m,
      inside: {
        punctuation: /:/,
        variable: a,
        operator: t
      }
    },
    "property-line": {
      pattern: /^[ \t]*(?:[^:\s]+ *:.*|:[^:\s]+.*)/m,
      inside: {
        property: [/[^:\s]+(?=\s*:)/, {
          pattern: /(:)[^:\s]+/,
          lookbehind: !0
        }],
        punctuation: /:/,
        variable: a,
        operator: t,
        important: e.languages.sass.important
      }
    }
  }),
  delete e.languages.sass.property,
  delete e.languages.sass.important,
  delete e.languages.sass.selector,
  e.languages.insertBefore("sass", "punctuation", {
    selector: {
      pattern: /([ \t]*)\S(?:,?[^,\r\n]+)*(?:,(?:\r?\n|\r)\1[ \t]+\S(?:,?[^,\r\n]+)*)*/,
      lookbehind: !0
    }
  })
} (Prism);
Prism.languages.scss = Prism.languages.extend("css", {
  comment: {
    pattern: /(^|[^\\])(?:\/\*[\w\W]*?\*\/|\/\/.*)/,
    lookbehind: !0
  },
  atrule: {
    pattern: /@[\w-]+(?:\([^()]+\)|[^(])*?(?=\s+[{;])/,
    inside: {
      rule: /@[\w-]+/
    }
  },
  url: /(?:[-a-z]+-)*url(?=\()/i,
  selector: {
    pattern: /(?=\S)[^@;\{\}\(\)]?([^@;\{\}\(\)]|&|#\{\$[-_\w]+\})+(?=\s*\{(\}|\s|[^\}]+(:|\{)[^\}]+))/m,
    inside: {
      placeholder: /%[-_\w]+/
    }
  }
}),
Prism.languages.insertBefore("scss", "atrule", {
  keyword: [/@(?:if|else(?: if)?|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)/i, {
    pattern: /( +)(?:from|through)(?= )/,
    lookbehind: !0
  }]
}),
Prism.languages.insertBefore("scss", "property", {
  variable: /\$[-_\w]+|#\{\$[-_\w]+\}/
}),
Prism.languages.insertBefore("scss", "function", {
  placeholder: {
    pattern: /%[-_\w]+/,
    alias: "selector"
  },
  statement: /\B!(?:default|optional)\b/i,
  "boolean": /\b(?:true|false)\b/,
  "null": /\bnull\b/,
  operator: {
    pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/,
    lookbehind: !0
  }
}),
Prism.languages.scss.atrule.inside.rest = Prism.util.clone(Prism.languages.scss);
Prism.languages.scala = Prism.languages.extend("java", {
  keyword: /<-|=>|\b(?:abstract|case|catch|class|def|do|else|extends|final|finally|for|forSome|if|implicit|import|lazy|match|new|null|object|override|package|private|protected|return|sealed|self|super|this|throw|trait|try|type|val|var|while|with|yield)\b/,
  string: /"""[\W\w]*?"""|"(?:[^"\\\r\n]|\\.)*"|'(?:[^\\\r\n']|\\.[^\\']*)'/,
  builtin: /\b(?:String|Int|Long|Short|Byte|Boolean|Double|Float|Char|Any|AnyRef|AnyVal|Unit|Nothing)\b/,
  number: /\b(?:0x[\da-f]*\.?[\da-f]+|\d*\.?\d+e?\d*[dfl]?)\b/i,
  symbol: /'[^\d\s\\]\w*/
}),
delete Prism.languages.scala["class-name"],
delete Prism.languages.scala["function"];
Prism.languages.pascal = {
  comment: [/\(\*[\s\S]+?\*\)/, /\{[\s\S]+?\}/, /\/\/.*/],
  string: /(?:'(?:''|[^'\r\n])*'|#[&$%]?[a-f\d]+)+|\^[a-z]/i,
  keyword: [{
    pattern: /(^|[^&])\b(?:absolute|array|asm|begin|case|const|constructor|destructor|do|downto|else|end|file|for|function|goto|if|implementation|inherited|inline|interface|label|nil|object|of|operator|packed|procedure|program|record|reintroduce|repeat|self|set|string|then|to|type|unit|until|uses|var|while|with)\b/i,
    lookbehind: !0
  },
  {
    pattern: /(^|[^&])\b(?:dispose|exit|false|new|true)\b/i,
    lookbehind: !0
  },
  {
    pattern: /(^|[^&])\b(?:class|dispinterface|except|exports|finalization|finally|initialization|inline|library|on|out|packed|property|raise|resourcestring|threadvar|try)\b/i,
    lookbehind: !0
  },
  {
    pattern: /(^|[^&])\b(?:absolute|abstract|alias|assembler|bitpacked|break|cdecl|continue|cppdecl|cvar|default|deprecated|dynamic|enumerator|experimental|export|external|far|far16|forward|generic|helper|implements|index|interrupt|iochecks|local|message|name|near|nodefault|noreturn|nostackframe|oldfpccall|otherwise|overload|override|pascal|platform|private|protected|public|published|read|register|reintroduce|result|safecall|saveregisters|softfloat|specialize|static|stdcall|stored|strict|unaligned|unimplemented|varargs|virtual|write)\b/i,
    lookbehind: !0
  }],
  number: [/[+-]?(?:[&%]\d+|\$[a-f\d]+)/i, /([+-]|\b)\d+(?:\.\d+)?(?:e[+-]?\d+)?/i],
  operator: [/\.\.|\*\*|:=|<[<=>]?|>[>=]?|[+\-*\/]=?|[@^=]/i, {
    pattern: /(^|[^&])\b(?:and|as|div|exclude|in|include|is|mod|not|or|shl|shr|xor)\b/,
    lookbehind: !0
  }],
  punctuation: /\(\.|\.\)|[()\[\]:;,.]/
};
Prism.languages.sql = {
  comment: {
    pattern: /(^|[^\\])(?:\/\*[\w\W]*?\*\/|(?:--|\/\/|#).*)/,
    lookbehind: !0
  },
  string: {
    pattern: /(^|[^@\\])("|')(?:\\?[\s\S])*?\2/,
    lookbehind: !0
  },
  variable: /@[\w.$]+|@("|'|`)(?:\\?[\s\S])+?\1/,
  "function": /\b(?:COUNT|SUM|AVG|MIN|MAX|FIRST|LAST|UCASE|LCASE|MID|LEN|ROUND|NOW|FORMAT)(?=\s*\()/i,
  keyword: /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR VARYING|CHARACTER (?:SET|VARYING)|CHARSET|CHECK|CHECKPOINT|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMN|COLUMNS|COMMENT|COMMIT|COMMITTED|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS|CONTAINSTABLE|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|DATA(?:BASES?)?|DATETIME|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE(?: PRECISION)?|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE KEY|ELSE|ENABLE|ENCLOSED BY|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPE(?:D BY)?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTO|INVOKER|ISOLATION LEVEL|JOIN|KEYS?|KILL|LANGUAGE SQL|LAST|LEFT|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MODIFIES SQL DATA|MODIFY|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL(?: CHAR VARYING| CHARACTER(?: VARYING)?| VARCHAR)?|NATURAL|NCHAR(?: VARCHAR)?|NEXT|NO(?: SQL|CHECK|CYCLE)?|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READ(?:S SQL DATA|TEXT)?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEATABLE|REPLICATION|REQUIRE|RESTORE|RESTRICT|RETURNS?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE MODE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|START(?:ING BY)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED BY|TEXT(?:SIZE)?|THEN|TIMESTAMP|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNPIVOT|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?)\b/i,
  "boolean": /\b(?:TRUE|FALSE|NULL)\b/i,
  number: /\b-?(?:0x)?\d*\.?[\da-f]+\b/,
  operator: /[-+*\/=%^~]|&&?|\|?\||!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|IN|LIKE|NOT|OR|IS|DIV|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
  punctuation: /[;[\]()`,.]/
};
Prism.languages.swift = Prism.languages.extend("clike", {
  string: {
    pattern: /("|')(\\(?:\((?:[^()]|\([^)]+\))+\)|\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    inside: {
      interpolation: {
        pattern: /\\\((?:[^()]|\([^)]+\))+\)/,
        inside: {
          delimiter: {
            pattern: /^\\\(|\)$/,
            alias: "variable"
          }
        }
      }
    }
  },
  keyword: /\b(as|associativity|break|case|catch|class|continue|convenience|default|defer|deinit|didSet|do|dynamic(?:Type)?|else|enum|extension|fallthrough|final|for|func|get|guard|if|import|in|infix|init|inout|internal|is|lazy|left|let|mutating|new|none|nonmutating|operator|optional|override|postfix|precedence|prefix|private|Protocol|public|repeat|required|rethrows|return|right|safe|self|Self|set|static|struct|subscript|super|switch|throws?|try|Type|typealias|unowned|unsafe|var|weak|where|while|willSet|__(?:COLUMN__|FILE__|FUNCTION__|LINE__))\b/,
  number: /\b([\d_]+(\.[\de_]+)?|0x[a-f0-9_]+(\.[a-f0-9p_]+)?|0b[01_]+|0o[0-7_]+)\b/i,
  constant: /\b(nil|[A-Z_]{2,}|k[A-Z][A-Za-z_]+)\b/,
  atrule: /@\b(IB(?:Outlet|Designable|Action|Inspectable)|class_protocol|exported|noreturn|NS(?:Copying|Managed)|objc|UIApplicationMain|auto_closure)\b/,
  builtin: /\b([A-Z]\S+|abs|advance|alignof(?:Value)?|assert|contains|count(?:Elements)?|debugPrint(?:ln)?|distance|drop(?:First|Last)|dump|enumerate|equal|filter|find|first|getVaList|indices|isEmpty|join|last|lexicographicalCompare|map|max(?:Element)?|min(?:Element)?|numericCast|overlaps|partition|print(?:ln)?|reduce|reflect|reverse|sizeof(?:Value)?|sort(?:ed)?|split|startsWith|stride(?:of(?:Value)?)?|suffix|swap|toDebugString|toString|transcode|underestimateCount|unsafeBitCast|with(?:ExtendedLifetime|Unsafe(?:MutablePointers?|Pointers?)|VaList))\b/
}),
Prism.languages.swift.string.inside.interpolation.inside.rest = Prism.util.clone(Prism.languages.swift);
Prism.languages.typescript = Prism.languages.extend("javascript", {
  keyword: /\b(break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|function|get|if|implements|import|in|instanceof|interface|let|new|null|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield|module|declare|constructor|string|Function|any|number|boolean|Array|enum)\b/
}); !
function() {
  "undefined" != typeof self && self.Prism && self.document && Prism.hooks.add("complete",
  function(e) {
    if (e.code) {
      var t = e.element.parentNode,
      s = /\s*\bprism-line-numbers\b\s*/;
      if (t && /pre/i.test(t.nodeName) && (s.test(t.className) || s.test(e.element.className)) && !e.element.querySelector(".prism-line-numbers-rows")) {
        s.test(e.element.className) && (e.element.className = e.element.className.replace(s, "")),
        s.test(t.className) || (t.className += " prism-line-numbers");
        var n, a = e.code.match(/\n(?!$)/g),
        l = a ? a.length + 1 : 1,
        m = new Array(l + 1);
        m = m.join("<span></span>"),
        n = document.createElement("span"),
        n.className = "prism-line-numbers-rows",
        n.innerHTML = m,
        t.hasAttribute("data-start") && (t.style.counterReset = "linenumber " + (parseInt(t.getAttribute("data-start"), 10) - 1)),
        e.element.appendChild(n)
      }
    }
  })
} (); !
function() {
  if ("undefined" != typeof self && self.Prism && self.document) {
    var e = {
      css: "CSS",
      clike: "C-like",
      javascript: "JavaScript",
      abap: "ABAP",
      actionscript: "ActionScript",
      apacheconf: "Apache Configuration",
      apl: "APL",
      applescript: "AppleScript",
      asciidoc: "AsciiDoc",
      aspnet: "ASP.NET (C#)",
      autoit: "AutoIt",
      autohotkey: "AutoHotkey",
      basic: "BASIC",
      csharp: "C#",
      cpp: "C++",
      coffeescript: "CoffeeScript",
      "css-extras": "CSS Extras",
      fsharp: "F#",
      glsl: "GLSL",
      http: "HTTP",
      inform7: "Inform 7",
      latex: "LaTeX",
      lolcode: "LOLCODE",
      matlab: "MATLAB",
      mel: "MEL",
      nasm: "NASM",
      nginx: "nginx",
      nsis: "NSIS",
      objectivec: "Objective-C",
      ocaml: "OCaml",
      parigp: "PARI/GP",
      php: "PHP",
      "php-extras": "PHP Extras",
      powershell: "PowerShell",
      jsx: "React JSX",
      rest: "reST (reStructuredText)",
      sas: "SAS",
      sass: "Sass (Sass)",
      scss: "Sass (Scss)",
      sql: "SQL",
      typescript: "TypeScript",
      vhdl: "VHDL",
      vim: "vim",
      wiki: "Wiki markup",
      yaml: "YAML"
    };
    Prism.hooks.add("before-highlight",
    function(a) {
      var s = a.element.parentNode;
      if (s && /pre/i.test(s.nodeName)) {
        var t = e[a.language] || a.language.substring(0, 1).toUpperCase() + a.language.substring(1);
        s.setAttribute("data-language", t);
        var i, r, l = s.previousSibling;
        l && /\s*\bprism-show-language\b\s*/.test(l.className) && l.firstChild && /\s*\bprism-show-language-label\b\s*/.test(l.firstChild.className) ? (r = l.firstChild, r.getAttribute("data-language") !== t && (r.setAttribute("data-language", t), r.innerHTML = t)) : (i = document.createElement("div"), r = document.createElement("div"), r.className = "prism-show-language-label", r.setAttribute("data-language", t), r.innerHTML = t, i.className = "prism-show-language", i.appendChild(r), s.parentNode.insertBefore(i, s))
      }
    })
  }
} ();