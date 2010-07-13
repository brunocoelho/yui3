YUI.add("history-base",function(B){var H=B.Lang,E=B.Object,L=YUI.namespace("Env.History"),F=B.config.doc.documentMode,J=B.config.win,C={merge:true},I="change",A="add",G="replace";function D(){this._init.apply(this,arguments);}B.augment(D,B.EventTarget,null,null,{emitFacade:true,prefix:"history",preventable:false,queueable:true});if(!L._state){L._state={};}function K(M){return H.type(M)==="object";}D.NAME="historyBase";D.SRC_ADD=A;D.SRC_REPLACE=G;D.html5=!!(J.history&&J.history.pushState&&J.history.replaceState&&("onpopstate" in J||B.UA.gecko>=2));D.nativeHashChange="onhashchange" in J&&(!F||F>7);B.mix(D.prototype,{_init:function(N){var M=N&&N.initialState;this.publish(I,{broadcast:2,defaultFn:this._defChangeFn});if(K(M)){this.add(B.merge(L._state,M));}},add:function(){var M=B.Array(arguments,0,true);M.unshift(A);return this._change.apply(this,M);},addValue:function(N,P,M){var O={};O[N]=P;return this._change(A,O,M);},get:function(N){var O=L._state,M=K(O);if(N){return M&&E.owns(O,N)?O[N]:undefined;}else{return M?B.mix({},O,true):O;}},replace:function(){var M=B.Array(arguments,0,true);M.unshift(G);return this._change.apply(this,M);},replaceValue:function(N,P,M){var O={};O[N]=P;return this._change(G,O,M);},_change:function(O,N,M){M=M?B.merge(C,M):C;if(M.merge&&K(N)&&K(L._state)){N=B.merge(L._state,N);}this._resolveChanges(O,N,M);return this;},_fireEvents:function(O,N,M){this.fire(I,{_options:M,changed:N.changed,newVal:N.newState,prevVal:N.prevState,removed:N.removed,src:O});E.each(N.changed,function(Q,P){this._fireChangeEvent(O,P,Q);},this);E.each(N.removed,function(Q,P){this._fireRemoveEvent(O,P,Q);},this);},_fireChangeEvent:function(O,M,N){this.fire(M+"Change",{newVal:N.newVal,prevVal:N.prevVal,src:O});},_fireRemoveEvent:function(O,M,N){this.fire(M+"Remove",{prevVal:N,src:O});},_resolveChanges:function(S,Q,N){var R={},M,P=L._state,O={};if(!Q){Q={};}if(!N){N={};}if(K(Q)&&K(P)){E.each(Q,function(T,U){var V=P[U];if(T!==V){R[U]={newVal:T,prevVal:V};M=true;}},this);E.each(P,function(U,T){if(!E.owns(Q,T)||Q[T]===null){delete Q[T];O[T]=U;M=true;}},this);}else{M=Q!==P;}if(M){this._fireEvents(S,{changed:R,newState:Q,prevState:P,removed:O},N);}},_storeState:function(N,M){L._state=M||{};},_defChangeFn:function(M){this._storeState(M.src,M.newVal,M._options);}},true);B.HistoryBase=D;},"@VERSION@",{requires:["event-custom-complex"]});