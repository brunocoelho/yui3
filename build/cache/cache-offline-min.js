YUI.add("cache-offline",function(F){function E(){E.superclass.constructor.apply(this,arguments);}F.mix(E,{NAME:"cacheOffline",ATTRS:{expires:{value:86400000,validator:function(G){return F.Lang.isNumber(G)&&G>=0;}},max:{value:null,readonly:true,setter:function(){return null;}},uniqueKeys:{value:true,readonly:true,setter:function(){return true;}}}});var A=F.config.win.localStorage,C=F.Lang.isDate,D=F.JSON,B=A?{_getSize:function(){return A.length;},_getEntries:function(){var G=this._entries,I=0,H=this._getSize();if(G){for(;I<H;++I){G[I]=D.parse(A.key(I));}}return G;},_defAddFn:function(J){var I=J.entry,H=I.request,G=this.get("expires");I.expires=C(G)?G:(G?new Date().getTime()+G:null);A.setItem(D.stringify({"request":H}),D.stringify(I));},_defFlushFn:function(I){var G=A,H;if(G){if(G.clear){G.clear();}else{for(H in G){if(G.hasOwnProperty(H)){G.removeItem(H);delete G[H];}}}}},retrieve:function(J){this.fire("request",{request:J});var I,G,H;try{J=D.stringify({"request":J});try{I=D.parse(A.getItem(J));}catch(L){}}catch(K){}if(I){H=I.cached;I.cached=H?new Date(H):H;G=I.expires;if(!G||new Date()<G){this.fire("retrieve",{entry:I});return I;}}return null;}}:{_defAddFn:function(H){var G=this.get("expires");H.entry.expires=C(G)?G:(G?new Date().getTime()+this.get("expires"):null);E.superclass._defAddFn.call(this,H);},_isMatch:function(H,G){if(!G.expires||new Date()<G.expires){return(H===G.request);}return false;}};F.extend(E,F.Cache,B);F.CacheOffline=E;},"@VERSION@",{requires:["cache-base","json"]});