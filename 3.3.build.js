webpackJsonp([3],{3:function(e,t,n){"use strict";var i=function(){function e(e,t){for(var n in t){var i=t[n];i.configurable=!0,i.value&&(i.writable=!0)}Object.defineProperties(e,t)}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},s=function(){function e(t){var i=t.lib,s=t.id,o=void 0===s?"editor":s,a=t.theme,c=void 0===a?"monokai":a,l=t.mode,d=void 0===l?"javascript":l,h=t.options,u=void 0===h?{}:h;r(this,e),this.lib=i,this.mode=this.mode||d,this.theme=c,this.options=u,this._dirty=!1;var p=n(1);this.events=new p,this.init(o)}return i(e,{init:{value:function(e){this.editor=this.create(e),this.setTheme(this.theme),this.setMode(this.mode),this.setOptions(this.options),this.ready()}},registerEvents:{value:function(){var e=this,t=this.document||this.editor.session.getDocument();t.on("change",function(){for(var t=arguments.length,n=Array(t),i=0;t>i;i++)n[i]=arguments[i];setTimeout(function(){return e.dirty=!0},0),setTimeout(function(){return e.events.emit("editor.onchange",{name:"editor.onchange",params:n})},0)})}},readTextFile:{value:function(e){var t=new XMLHttpRequest,n="";return t.open("GET",e,!1),t.onreadystatechange=function(){4===t.readyState&&(200===t.status||0==t.status)&&(n=t.responseText)},t.send(null),n}},loadFile:{value:function(){var e=IDE.qParams.path;-1!==IDE.qParams.path.indexOf(".html",this.length-".html".length)?IDE.qParams.mode="html":-1!==IDE.qParams.path.indexOf(".css",this.length-".css".length)?IDE.qParams.mode="css":IDE.qParams.mode="html";var t=this.readTextFile(e);this.setContent(t),this.setMode(IDE.qParams.mode),this.editor.session.setUndoManager(new this.lib.UndoManager),this.registerEvents()}},ready:{value:function(){var e=this;setTimeout(function(){return e.events.emit("editor.onready",{name:"editor.onready"})},0)}},create:{value:function(e){return this.lib.edit(e)}},setContent:{value:function(e){this.editor.setValue(e,-1)}},getContent:{value:function(){return this.editor.getValue()}},setReadOnly:{value:function(e){this.editor.setReadOnly(e)}},setOptions:{value:function(e){this.editor.setOptions(e)}},setTheme:{value:function(e){this.editor.setTheme("ace/theme/"+e)}},setMode:{value:function(e){this.editor.setOption("mode","ace/mode/"+e)}},undo:{value:function(){this.editor.undo()}},redo:{value:function(){this.editor.redo()}},selectAll:{value:function(){this.editor.selectAll()}},selectTo:{value:function(e,t){this.editor.selectTo(e,t)}},dirty:{set:function(e){e&&!this._dirty?(this._dirty=!0,this.events.emit("editor.ondirty",{name:"editor.ondirty"})):!e&&this._dirty&&(this._dirty=!1,this.events.emit("editor.onclean",{name:"editor.onclean"}))},get:function(){return this._dirty}},onDirty:{value:function(e){this.events.on("editor.ondirty",e)}},onClean:{value:function(e){this.events.on("editor.onclean",e)}},onChange:{value:function(e){this.events.on("editor.onchange",e)}},onReady:{value:function(e){this.events.on("editor.onready",e)}}}),e}();e.exports=s},7:function(e,t,n){ace.define("ace/snippets",["require","exports","module","ace/lib/oop","ace/lib/event_emitter","ace/lib/lang","ace/range","ace/anchor","ace/keyboard/hash_handler","ace/tokenizer","ace/lib/dom","ace/editor"],function(e,t,n){"use strict";var i=e("./lib/oop"),r=e("./lib/event_emitter").EventEmitter,s=e("./lib/lang"),o=e("./range").Range,a=e("./anchor").Anchor,c=e("./keyboard/hash_handler").HashHandler,l=e("./tokenizer").Tokenizer,d=o.comparePoints,h=function(){this.snippetMap={},this.snippetNameMap={}};(function(){i.implement(this,r),this.getTokenizer=function(){function e(e,t,n){return e=e.substr(1),/^\d+$/.test(e)&&!n.inFormatString?[{tabstopId:parseInt(e,10)}]:[{text:e}]}function t(e){return"(?:[^\\\\"+e+"]|\\\\.)"}return h.$tokenizer=new l({start:[{regex:/:/,onMatch:function(e,t,n){return n.length&&n[0].expectIf?(n[0].expectIf=!1,n[0].elseBranch=n[0],[n[0]]):":"}},{regex:/\\./,onMatch:function(e,t,n){var i=e[1];return"}"==i&&n.length?e=i:-1!="`$\\".indexOf(i)?e=i:n.inFormatString&&("n"==i?e="\n":"t"==i?e="\n":-1!="ulULE".indexOf(i)&&(e={changeCase:i,local:i>"a"})),[e]}},{regex:/}/,onMatch:function(e,t,n){return[n.length?n.shift():e]}},{regex:/\$(?:\d+|\w+)/,onMatch:e},{regex:/\$\{[\dA-Z_a-z]+/,onMatch:function(t,n,i){var r=e(t.substr(1),n,i);return i.unshift(r[0]),r},next:"snippetVar"},{regex:/\n/,token:"newline",merge:!1}],snippetVar:[{regex:"\\|"+t("\\|")+"*\\|",onMatch:function(e,t,n){n[0].choices=e.slice(1,-1).split(",")},next:"start"},{regex:"/("+t("/")+"+)/(?:("+t("/")+"*)/)(\\w*):?",onMatch:function(e,t,n){var i=n[0];return i.fmtString=e,e=this.splitRegex.exec(e),i.guard=e[1],i.fmt=e[2],i.flag=e[3],""},next:"start"},{regex:"`"+t("`")+"*`",onMatch:function(e,t,n){return n[0].code=e.splice(1,-1),""},next:"start"},{regex:"\\?",onMatch:function(e,t,n){n[0]&&(n[0].expectIf=!0)},next:"start"},{regex:"([^:}\\\\]|\\\\.)*:?",token:"",next:"start"}],formatString:[{regex:"/("+t("/")+"+)/",token:"regex"},{regex:"",onMatch:function(e,t,n){n.inFormatString=!0},next:"start"}]}),h.prototype.getTokenizer=function(){return h.$tokenizer},h.$tokenizer},this.tokenizeTmSnippet=function(e,t){return this.getTokenizer().getLineTokens(e,t).tokens.map(function(e){return e.value||e})},this.$getDefaultValue=function(e,t){if(/^[A-Z]\d+$/.test(t)){var n=t.substr(1);return(this.variables[t[0]+"__"]||{})[n]}if(/^\d+$/.test(t))return(this.variables.__||{})[t];if(t=t.replace(/^TM_/,""),e){var i=e.session;switch(t){case"CURRENT_WORD":var r=i.getWordRange();case"SELECTION":case"SELECTED_TEXT":return i.getTextRange(r);case"CURRENT_LINE":return i.getLine(e.getCursorPosition().row);case"PREV_LINE":return i.getLine(e.getCursorPosition().row-1);case"LINE_INDEX":return e.getCursorPosition().column;case"LINE_NUMBER":return e.getCursorPosition().row+1;case"SOFT_TABS":return i.getUseSoftTabs()?"YES":"NO";case"TAB_SIZE":return i.getTabSize();case"FILENAME":case"FILEPATH":return"";case"FULLNAME":return"Ace"}}},this.variables={},this.getVariableValue=function(e,t){return this.variables.hasOwnProperty(t)?this.variables[t](e,t)||"":this.$getDefaultValue(e,t)||""},this.tmStrFormat=function(e,t,n){var i=t.flag||"",r=t.guard;r=new RegExp(r,i.replace(/[^gi]/,""));var s=this.tokenizeTmSnippet(t.fmt,"formatString"),o=this,a=e.replace(r,function(){o.variables.__=arguments;for(var e=o.resolveVariables(s,n),t="E",i=0;i<e.length;i++){var r=e[i];if("object"==typeof r)if(e[i]="",r.changeCase&&r.local){var a=e[i+1];a&&"string"==typeof a&&("u"==r.changeCase?e[i]=a[0].toUpperCase():e[i]=a[0].toLowerCase(),e[i+1]=a.substr(1))}else r.changeCase&&(t=r.changeCase);else"U"==t?e[i]=r.toUpperCase():"L"==t&&(e[i]=r.toLowerCase())}return e.join("")});return this.variables.__=null,a},this.resolveVariables=function(e,t){function n(t){var n=e.indexOf(t,r+1);-1!=n&&(r=n)}for(var i=[],r=0;r<e.length;r++){var s=e[r];if("string"==typeof s)i.push(s);else{if("object"!=typeof s)continue;if(s.skip)n(s);else{if(s.processed<r)continue;if(s.text){var o=this.getVariableValue(t,s.text);o&&s.fmtString&&(o=this.tmStrFormat(o,s)),s.processed=r,null==s.expectIf?o&&(i.push(o),n(s)):o?s.skip=s.elseBranch:n(s)}else null!=s.tabstopId?i.push(s):null!=s.changeCase&&i.push(s)}}}return i},this.insertSnippetForSelection=function(e,t){function n(e){for(var t=[],n=0;n<e.length;n++){var i=e[n];if("object"==typeof i){if(l[i.tabstopId])continue;var r=e.lastIndexOf(i,n-1);i=t[r]||{tabstopId:i.tabstopId}}t[n]=i}return t}var i=e.getCursorPosition(),r=e.session.getLine(i.row),s=e.session.getTabString(),o=r.match(/^\s*/)[0];i.column<o.length&&(o=o.slice(0,i.column));var a=this.tokenizeTmSnippet(t);a=this.resolveVariables(a,e),a=a.map(function(e){return"\n"==e?e+o:"string"==typeof e?e.replace(/\t/g,s):e});var c=[];a.forEach(function(e,t){if("object"==typeof e){var n=e.tabstopId,i=c[n];if(i||(i=c[n]=[],i.index=n,i.value=""),-1===i.indexOf(e)){i.push(e);var r=a.indexOf(e,t+1);if(-1!==r){var s=a.slice(t+1,r),o=s.some(function(e){return"object"==typeof e});o&&!i.value?i.value=s:s.length&&(!i.value||"string"!=typeof i.value)&&(i.value=s.join(""))}}}}),c.forEach(function(e){e.length=0});for(var l={},d=0;d<a.length;d++){var h=a[d];if("object"==typeof h){var p=h.tabstopId,f=a.indexOf(h,d+1);if(l[p])l[p]===h&&(l[p]=null);else{var g=c[p],m="string"==typeof g.value?[g.value]:n(g.value);m.unshift(d+1,Math.max(0,f-d)),m.push(h),l[p]=h,a.splice.apply(a,m),-1===g.indexOf(h)&&g.push(h)}}}var v=0,y=0,_="";a.forEach(function(e){"string"==typeof e?("\n"===e[0]?(y=e.length-1,v++):y+=e.length,_+=e):e.start?e.end={row:v,column:y}:e.start={row:v,column:y}});var b=e.getSelectionRange(),x=e.session.replace(b,_),w=new u(e),A=e.inVirtualSelectionMode&&e.selection.index;w.addTabstops(c,b.start,x,A)},this.insertSnippet=function(e,t){var n=this;return e.inVirtualSelectionMode?n.insertSnippetForSelection(e,t):(e.forEachSelection(function(){n.insertSnippetForSelection(e,t)},null,{keepOrder:!0}),void(e.tabstopManager&&e.tabstopManager.tabNext()))},this.$getScope=function(e){var t=e.session.$mode.$id||"";if(t=t.split("/").pop(),"html"===t||"php"===t){"php"===t&&!e.session.$mode.inlinePhp&&(t="html");var n=e.getCursorPosition(),i=e.session.getState(n.row);"object"==typeof i&&(i=i[0]),i.substring&&("js-"==i.substring(0,3)?t="javascript":"css-"==i.substring(0,4)?t="css":"php-"==i.substring(0,4)&&(t="php"))}return t},this.getActiveScopes=function(e){var t=this.$getScope(e),n=[t],i=this.snippetMap;return i[t]&&i[t].includeScopes&&n.push.apply(n,i[t].includeScopes),n.push("_"),n},this.expandWithTab=function(e,t){var n=this,i=e.forEachSelection(function(){return n.expandSnippetForSelection(e,t)},null,{keepOrder:!0});return i&&e.tabstopManager&&e.tabstopManager.tabNext(),i},this.expandSnippetForSelection=function(e,t){var n,i=e.getCursorPosition(),r=e.session.getLine(i.row),s=r.substring(0,i.column),o=r.substr(i.column),a=this.snippetMap;return this.getActiveScopes(e).some(function(e){var t=a[e];return t&&(n=this.findMatchingSnippet(t,s,o)),!!n},this),n?t&&t.dryRun?!0:(e.session.doc.removeInLine(i.row,i.column-n.replaceBefore.length,i.column+n.replaceAfter.length),this.variables.M__=n.matchBefore,this.variables.T__=n.matchAfter,this.insertSnippetForSelection(e,n.content),this.variables.M__=this.variables.T__=null,!0):!1},this.findMatchingSnippet=function(e,t,n){for(var i=e.length;i--;){var r=e[i];if(!(r.startRe&&!r.startRe.test(t)||r.endRe&&!r.endRe.test(n)||!r.startRe&&!r.endRe))return r.matchBefore=r.startRe?r.startRe.exec(t):[""],r.matchAfter=r.endRe?r.endRe.exec(n):[""],r.replaceBefore=r.triggerRe?r.triggerRe.exec(t)[0]:"",r.replaceAfter=r.endTriggerRe?r.endTriggerRe.exec(n)[0]:"",r}},this.snippetMap={},this.snippetNameMap={},this.register=function(e,t){function n(e){return e&&!/^\^?\(.*\)\$?$|^\\b$/.test(e)&&(e="(?:"+e+")"),e||""}function i(e,t,i){return e=n(e),t=n(t),i?(e=t+e,e&&"$"!=e[e.length-1]&&(e+="$")):(e+=t,e&&"^"!=e[0]&&(e="^"+e)),new RegExp(e)}function r(e){e.scope||(e.scope=t||"_"),t=e.scope,o[t]||(o[t]=[],a[t]={});var n=a[t];if(e.name){var r=n[e.name];r&&c.unregister(r),n[e.name]=e}o[t].push(e),e.tabTrigger&&!e.trigger&&(!e.guard&&/^\w/.test(e.tabTrigger)&&(e.guard="\\b"),e.trigger=s.escapeRegExp(e.tabTrigger)),e.startRe=i(e.trigger,e.guard,!0),e.triggerRe=new RegExp(e.trigger,"",!0),e.endRe=i(e.endTrigger,e.endGuard,!0),e.endTriggerRe=new RegExp(e.endTrigger,"",!0)}var o=this.snippetMap,a=this.snippetNameMap,c=this;e||(e=[]),e&&e.content?r(e):Array.isArray(e)&&e.forEach(r),this._signal("registerSnippets",{scope:t})},this.unregister=function(e,t){function n(e){var n=r[e.scope||t];if(n&&n[e.name]){delete n[e.name];var s=i[e.scope||t],o=s&&s.indexOf(e);o>=0&&s.splice(o,1)}}var i=this.snippetMap,r=this.snippetNameMap;e.content?n(e):Array.isArray(e)&&e.forEach(n)},this.parseSnippetFile=function(e){e=e.replace(/\r/g,"");for(var t,n=[],i={},r=/^#.*|^({[\s\S]*})\s*$|^(\S+) (.*)$|^((?:\n*\t.*)+)/gm;t=r.exec(e);){if(t[1])try{i=JSON.parse(t[1]),n.push(i)}catch(s){}if(t[4])i.content=t[4].replace(/^\t/gm,""),n.push(i),i={};else{var o=t[2],a=t[3];if("regex"==o){var c=/\/((?:[^\/\\]|\\.)*)|$/g;i.guard=c.exec(a)[1],i.trigger=c.exec(a)[1],i.endTrigger=c.exec(a)[1],i.endGuard=c.exec(a)[1]}else"snippet"==o?(i.tabTrigger=a.match(/^\S*/)[0],i.name||(i.name=a)):i[o]=a}}return n},this.getSnippetByName=function(e,t){var n,i=this.snippetNameMap;return this.getActiveScopes(t).some(function(t){var r=i[t];return r&&(n=r[e]),!!n},this),n}}).call(h.prototype);var u=function(e){return e.tabstopManager?e.tabstopManager:(e.tabstopManager=this,this.$onChange=this.onChange.bind(this),this.$onChangeSelection=s.delayedCall(this.onChangeSelection.bind(this)).schedule,this.$onChangeSession=this.onChangeSession.bind(this),this.$onAfterExec=this.onAfterExec.bind(this),this.attach(e),void 0)};(function(){this.attach=function(e){this.index=0,this.ranges=[],this.tabstops=[],this.$openTabstops=null,this.selectedTabstop=null,this.editor=e,this.editor.on("change",this.$onChange),this.editor.on("changeSelection",this.$onChangeSelection),this.editor.on("changeSession",this.$onChangeSession),this.editor.commands.on("afterExec",this.$onAfterExec),this.editor.keyBinding.addKeyboardHandler(this.keyboardHandler)},this.detach=function(){this.tabstops.forEach(this.removeTabstopMarkers,this),this.ranges=null,this.tabstops=null,this.selectedTabstop=null,this.editor.removeListener("change",this.$onChange),this.editor.removeListener("changeSelection",this.$onChangeSelection),this.editor.removeListener("changeSession",this.$onChangeSession),this.editor.commands.removeListener("afterExec",this.$onAfterExec),this.editor.keyBinding.removeKeyboardHandler(this.keyboardHandler),this.editor.tabstopManager=null,this.editor=null},this.onChange=function(e){var t=e.data.range,n="r"==e.data.action[0],i=t.start,r=t.end,s=i.row,o=r.row,a=o-s,c=r.column-i.column;if(n&&(a=-a,c=-c),!this.$inChange&&n){var l=this.selectedTabstop,h=l&&!l.some(function(e){return d(e.start,i)<=0&&d(e.end,r)>=0});if(h)return this.detach()}for(var u=this.ranges,p=0;p<u.length;p++){var f=u[p];f.end.row<i.row||(n&&d(i,f.start)<0&&d(r,f.end)>0?(this.removeRange(f),p--):(f.start.row==s&&f.start.column>i.column&&(f.start.column+=c),f.end.row==s&&f.end.column>=i.column&&(f.end.column+=c),f.start.row>=s&&(f.start.row+=a),f.end.row>=s&&(f.end.row+=a),d(f.start,f.end)>0&&this.removeRange(f)))}u.length||this.detach()},this.updateLinkedFields=function(){var e=this.selectedTabstop;if(e&&e.hasLinkedRanges){this.$inChange=!0;for(var n=this.editor.session,i=n.getTextRange(e.firstNonLinked),r=e.length;r--;){var s=e[r];if(s.linked){var o=t.snippetManager.tmStrFormat(i,s.original);n.replace(s,o)}}this.$inChange=!1}},this.onAfterExec=function(e){e.command&&!e.command.readOnly&&this.updateLinkedFields()},this.onChangeSelection=function(){if(this.editor){for(var e=this.editor.selection.lead,t=this.editor.selection.anchor,n=this.editor.selection.isEmpty(),i=this.ranges.length;i--;)if(!this.ranges[i].linked){var r=this.ranges[i].contains(e.row,e.column),s=n||this.ranges[i].contains(t.row,t.column);if(r&&s)return}this.detach()}},this.onChangeSession=function(){this.detach()},this.tabNext=function(e){var t=this.tabstops.length,n=this.index+(e||1);n=Math.min(Math.max(n,1),t),n==t&&(n=0),this.selectTabstop(n),0===n&&this.detach()},this.selectTabstop=function(e){this.$openTabstops=null;var t=this.tabstops[this.index];if(t&&this.addTabstopMarkers(t),this.index=e,t=this.tabstops[this.index],t&&t.length){if(this.selectedTabstop=t,this.editor.inVirtualSelectionMode)this.editor.selection.setRange(t.firstNonLinked);else{var n=this.editor.multiSelect;n.toSingleRange(t.firstNonLinked.clone());for(var i=t.length;i--;)t.hasLinkedRanges&&t[i].linked||n.addRange(t[i].clone(),!0);n.ranges[0]&&n.addRange(n.ranges[0].clone())}this.editor.keyBinding.addKeyboardHandler(this.keyboardHandler)}},this.addTabstops=function(e,t,n){if(this.$openTabstops||(this.$openTabstops=[]),!e[0]){var i=o.fromPoints(n,n);g(i.start,t),g(i.end,t),e[0]=[i],e[0].index=0}var r=this.index,s=[r+1,0],a=this.ranges;e.forEach(function(e,n){for(var i=this.$openTabstops[n]||e,r=e.length;r--;){var c=e[r],l=o.fromPoints(c.start,c.end||c.start);f(l.start,t),f(l.end,t),l.original=c,l.tabstop=i,a.push(l),i!=e?i.unshift(l):i[r]=l,c.fmtString?(l.linked=!0,i.hasLinkedRanges=!0):i.firstNonLinked||(i.firstNonLinked=l)}i.firstNonLinked||(i.hasLinkedRanges=!1),i===e&&(s.push(i),this.$openTabstops[n]=i),this.addTabstopMarkers(i)},this),s.length>2&&(this.tabstops.length&&s.push(s.splice(2,1)[0]),this.tabstops.splice.apply(this.tabstops,s))},this.addTabstopMarkers=function(e){var t=this.editor.session;e.forEach(function(e){e.markerId||(e.markerId=t.addMarker(e,"ace_snippet-marker","text"))})},this.removeTabstopMarkers=function(e){var t=this.editor.session;e.forEach(function(e){t.removeMarker(e.markerId),e.markerId=null})},this.removeRange=function(e){var t=e.tabstop.indexOf(e);e.tabstop.splice(t,1),t=this.ranges.indexOf(e),this.ranges.splice(t,1),this.editor.session.removeMarker(e.markerId),e.tabstop.length||(t=this.tabstops.indexOf(e.tabstop),-1!=t&&this.tabstops.splice(t,1),this.tabstops.length||this.detach())},this.keyboardHandler=new c,this.keyboardHandler.bindKeys({Tab:function(e){t.snippetManager&&t.snippetManager.expandWithTab(e)||e.tabstopManager.tabNext(1)},"Shift-Tab":function(e){e.tabstopManager.tabNext(-1)},Esc:function(e){e.tabstopManager.detach()},Return:function(e){return!1}})}).call(u.prototype);var p={};p.onChange=a.prototype.onChange,p.setPosition=function(e,t){this.pos.row=e,this.pos.column=t},p.update=function(e,t,n){this.$insertRight=n,this.pos=e,this.onChange(t)};var f=function(e,t){0==e.row&&(e.column+=t.column),e.row+=t.row},g=function(e,t){e.row==t.row&&(e.column-=t.column),e.row-=t.row};e("./lib/dom").importCssString(".ace_snippet-marker {    -moz-box-sizing: border-box;    box-sizing: border-box;    background: rgba(194, 193, 208, 0.09);    border: 1px dotted rgba(211, 208, 235, 0.62);    position: absolute;}"),t.snippetManager=new h;var m=e("./editor").Editor;(function(){this.insertSnippet=function(e,n){return t.snippetManager.insertSnippet(this,e,n)},this.expandSnippet=function(e){return t.snippetManager.expandWithTab(this,e)}}).call(m.prototype)}),ace.define("ace/ext/emmet",["require","exports","module","ace/keyboard/hash_handler","ace/editor","ace/snippets","ace/range","resources","resources","range","tabStops","resources","utils","actions","ace/config","ace/config"],function(e,t,n){"use strict";function i(){}var r,s,o=e("ace/keyboard/hash_handler").HashHandler,a=e("ace/editor").Editor,c=e("ace/snippets").snippetManager,l=e("ace/range").Range;i.prototype={setupContext:function(e){this.ace=e,this.indentation=e.session.getTabString(),r||(r=window.emmet),r.require("resources").setVariable("indentation",this.indentation),this.$syntax=null,this.$syntax=this.getSyntax()},getSelectionRange:function(){var e=this.ace.getSelectionRange(),t=this.ace.session.doc;return{start:t.positionToIndex(e.start),end:t.positionToIndex(e.end)}},createSelection:function(e,t){var n=this.ace.session.doc;this.ace.selection.setRange({start:n.indexToPosition(e),end:n.indexToPosition(t)})},getCurrentLineRange:function(){var e=this.ace,t=e.getCursorPosition().row,n=e.session.getLine(t).length,i=e.session.doc.positionToIndex({row:t,column:0});return{start:i,end:i+n}},getCaretPos:function(){var e=this.ace.getCursorPosition();return this.ace.session.doc.positionToIndex(e)},setCaretPos:function(e){var t=this.ace.session.doc.indexToPosition(e);this.ace.selection.moveToPosition(t)},getCurrentLine:function(){var e=this.ace.getCursorPosition().row;return this.ace.session.getLine(e)},replaceContent:function(e,t,n,i){null==n&&(n=null==t?this.getContent().length:t),null==t&&(t=0);var r=this.ace,s=r.session.doc,o=l.fromPoints(s.indexToPosition(t),s.indexToPosition(n));r.session.remove(o),o.end=o.start,e=this.$updateTabstops(e),c.insertSnippet(r,e)},getContent:function(){return this.ace.getValue()},getSyntax:function(){if(this.$syntax)return this.$syntax;var e=this.ace.session.$modeId.split("/").pop();if("html"==e||"php"==e){var t=this.ace.getCursorPosition(),n=this.ace.session.getState(t.row);"string"!=typeof n&&(n=n[0]),n&&(n=n.split("-"),n.length>1?e=n[0]:"php"==e&&(e="html"))}return e},getProfileName:function(){switch(this.getSyntax()){case"css":return"css";case"xml":case"xsl":return"xml";case"html":var e=r.require("resources").getVariable("profile");return e||(e=-1!=this.ace.session.getLines(0,2).join("").search(/<!DOCTYPE[^>]+XHTML/i)?"xhtml":"html"),e}return"xhtml"},prompt:function(e){return prompt(e)},getSelection:function(){return this.ace.session.getTextRange()},getFilePath:function(){return""},$updateTabstops:function(e){var t=1e3,n=0,i=null,s=r.require("range"),o=r.require("tabStops"),a=r.require("resources").getVocabulary("user"),c={tabstop:function(e){var r=parseInt(e.group,10),a=0===r;a?r=++n:r+=t;var l=e.placeholder;l&&(l=o.processText(l,c));var d="${"+r+(l?":"+l:"")+"}";return a&&(i=s.create(e.start,d)),d},escape:function(e){return"$"==e?"\\$":"\\"==e?"\\\\":e}};return e=o.processText(e,c),a.variables.insert_final_tabstop&&!/\$\{0\}$/.test(e)?e+="${0}":i&&(e=r.require("utils").replaceSubstring(e,"${0}",i)),e}};var d={expand_abbreviation:{mac:"ctrl+alt+e",win:"alt+e"},match_pair_outward:{mac:"ctrl+d",win:"ctrl+,"},match_pair_inward:{mac:"ctrl+j",win:"ctrl+shift+0"},matching_pair:{mac:"ctrl+alt+j",win:"alt+j"},next_edit_point:"alt+right",prev_edit_point:"alt+left",toggle_comment:{mac:"command+/",win:"ctrl+/"},split_join_tag:{mac:"shift+command+'",win:"shift+ctrl+`"},remove_tag:{mac:"command+'",win:"shift+ctrl+;"},evaluate_math_expression:{mac:"shift+command+y",win:"shift+ctrl+y"},increment_number_by_1:"ctrl+up",decrement_number_by_1:"ctrl+down",increment_number_by_01:"alt+up",decrement_number_by_01:"alt+down",increment_number_by_10:{mac:"alt+command+up",win:"shift+alt+up"},decrement_number_by_10:{mac:"alt+command+down",win:"shift+alt+down"},select_next_item:{mac:"shift+command+.",win:"shift+ctrl+."},select_previous_item:{mac:"shift+command+,",win:"shift+ctrl+,"},reflect_css_value:{mac:"shift+command+r",win:"shift+ctrl+r"},encode_decode_data_url:{mac:"shift+ctrl+d",win:"ctrl+'"},expand_abbreviation_with_tab:"Tab",wrap_with_abbreviation:{mac:"shift+ctrl+a",win:"shift+ctrl+a"}},h=new i;t.commands=new o,t.runEmmetCommand=function(e){try{if(h.setupContext(e),"php"==h.getSyntax())return!1;var t=r.require("actions");if("expand_abbreviation_with_tab"==this.action&&!e.selection.isEmpty())return!1;if("wrap_with_abbreviation"==this.action)return setTimeout(function(){t.run("wrap_with_abbreviation",h)},0);var n=e.selection.lead,i=e.session.getTokenAt(n.row,n.column);if(i&&/\btag\b/.test(i.type))return!1;var s=t.run(this.action,h)}catch(o){e._signal("changeStatus","string"==typeof o?o:o.message),console.log(o),s=!1}return s};for(var u in d)t.commands.addCommand({name:"emmet:"+u,action:u,bindKey:d[u],exec:t.runEmmetCommand,multiSelectAction:"forEach"});t.updateCommands=function(e,n){n?e.keyBinding.addKeyboardHandler(t.commands):e.keyBinding.removeKeyboardHandler(t.commands)},t.isSupportedMode=function(e){return e&&/css|less|scss|sass|stylus|html|php|twig|ejs/.test(e)};var p=function(n,i){var r=i;if(r){var o=t.isSupportedMode(r.session.$modeId);n.enableEmmet===!1&&(o=!1),o&&"string"==typeof s&&e("ace/config").loadModule(s,function(){s=null}),t.updateCommands(r,o)}};t.AceEmmetEditor=i,e("ace/config").defineOptions(a.prototype,"editor",{enableEmmet:{set:function(e){this[e?"on":"removeListener"]("changeMode",p),p({enableEmmet:!!e},this)},value:!0}}),t.setCore=function(e){"string"==typeof e?s=e:r=e}}),function(){ace.require(["ace/ext/emmet"],function(){})}()},17:function(e,t,n){"use strict";var i=function(e){return e&&e.__esModule?e["default"]:e},r=function(){function e(e,t){for(var n in t){var i=t[n];i.configurable=!0,i.value&&(i.writable=!0)}Object.defineProperties(e,t)}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),s=function d(e,t,n){var i=Object.getOwnPropertyDescriptor(e,t);if(void 0===i){var r=Object.getPrototypeOf(e);return null===r?void 0:d(r,t,n)}if("value"in i&&i.writable)return i.value;var s=i.get;return void 0===s?void 0:s.call(n)},o=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(e.__proto__=t)},a=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},c=i(n(3)),l=function(e){function t(){for(var e=arguments.length,n=Array(e),i=0;e>i;i++)n[i]=arguments[i];a(this,t),this.mode="css",s(Object.getPrototypeOf(t.prototype),"constructor",this).apply(this,n),this.initMode()}return o(t,e),r(t,{initMode:{value:function(){n(7),this.setOptions({enableEmmet:!0})}}}),t}(c);e.exports=l}});