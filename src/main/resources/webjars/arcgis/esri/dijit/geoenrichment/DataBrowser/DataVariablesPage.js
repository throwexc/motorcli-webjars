// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.12/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/geoenrichment/DataBrowser/templates/DataVariablesPage.html":'\x3cdiv data-dojo-type\x3d"dijit/layout/ContentPane" data-dojo-props\x3d"row: 0"\x3e\n    \x3cdiv class\x3d"BreadcrumbHeight"\x3e\x3c/div\x3e\n    \x3cdiv class\x3d"DataVariablesPage_VarCount"\x3e\x3cspan data-dojo-attach-point\x3d"spnVarTitle"\x3e\x3c/span\x3e ${nls.vars} (\x3cspan data-dojo-attach-point\x3d"spnVarsQuant"\x3e\x3c/span\x3e)\x3c/div\x3e\n\x3c/div\x3e\n\x3cdiv data-dojo-type\x3d"dijit/layout/ContentPane" data-dojo-props\x3d"row: 1"\x3e\n    \x3cdiv data-dojo-attach-point\x3d"divTree" class\x3d"DataVariablesPage_Tree"\x3e\x3c/div\x3e\n\x3c/div\x3e\n\x3cdiv data-dojo-type\x3d"dijit/layout/ContentPane" data-dojo-props\x3d"row: 2"\x3e\n\x3c/div\x3e\n\n'}});
define("esri/dijit/geoenrichment/DataBrowser/DataVariablesPage","../../../declare dojo/_base/lang dojo/dom-class dojo/dom-construct dojo/dom-geometry dojo/Stateful dojo/query dojo/i18n!../../../nls/jsapi dojo/text!./templates/DataVariablesPage.html ../_WizardPage ../_Invoke ../CheckList dojo/store/Memory dojo/data/ObjectStore dgrid/tree dgrid/OnDemandGrid dgrid/extensions/DijitRegistry dgrid/Selection dojo/aspect dijit/Tooltip dojo/on dojo/_base/window dijit/registry dijit/layout/ContentPane".split(" "),
function(h,f,g,m,v,p,n,q,w,x,r,I,s,y,z,A,B,C,D,t,k,E,F){q=q.geoenrichment.dijit.DataVariablesPage;p=h([p],{checked:!0,getLabel:function(){},getClass:function(){return""}});var u=h([y],{getChildren:function(a){return a.getChildren()},mayHaveChildren:function(a){return!!a.getChildren}}),G=h([A,B,C,r],{selectionMode:"toggle",shoppingCart:null,variableInfo:null,useTouchScroll:!1,_lockAnimation:!1,constructor:function(){this._ltr=v.isBodyLtr()},removeRow:function(a,c){var b=F.findWidgets(a);if(b)for(var d=
0;d<b.length;d++)b[d].destroy();this.inherited(arguments)},buildRendering:function(){this.inherited(arguments);this.on("dgrid-select",f.hitch(this,this._onSelect));this.on("dgrid-deselect",f.hitch(this,this._onDeselect))},select:function(a,c,b){var d=this.row(a).element;if(null===b||void 0===b)b=!g.contains(d,"dgrid-selected");var e=this.row(a).data;if(e&&e._children){var e=e.getChildren(),l;0<e.length&&!this.row(e[0]).element&&this.expand(this.row(a),!1,!0);this._lockAnimation=!0;for(var f=0;f<e.length;f++)l=
this.row(e[f]),this.select(l,c,b);this._lockAnimation=!1;d&&(b?(g.add(d,"dgrid-selected"),this.flyAnim.fly(n(".VarLabel",d)[0],"DataBrowser_SelectVar",["top",this._ltr?"right":"left"])):g.remove(d,"dgrid-selected"))}this.inherited(arguments);d&&(e=n(".dijitCheckBox",d)[0])&&(g.contains(d,"dgrid-selected")?g.add(e,"dijitCheckBoxChecked"):g.remove(e,"dijitCheckBoxChecked"))},syncOneBranchWithShoppingCart:function(a){for(var c=this.shoppingCart.content,b=0;b<a.length;b++)this.select(a[b],null,!!c[a[b].idDesc])},
_setSelection:function(a){this.selection=this.get("selection");this.selectedItems=[];if(this.selection&&this.store.data){a=this.store.data;for(var c,b=0;b<a.length;b++){c=a[b].getChildren();for(var d=0;d<c.length;d++)this.selection[c[d].id]&&this.selectedItems.push(c[d])}}},_onSelect:function(a){if(!this._lockAnimation&&this.flyAnim&&a.parentType){var c=this.row(a.rows[0]).element;this.flyAnim.fly(n(".VarLabel",c)[0],"DataBrowser_SelectVar",["top",this._ltr?"right":"left"])}this._setSelection(a);
this.onSelect(a)},_onDeselect:function(a){this._setSelection(a);this.onDeselect(a)},onDeselect:function(a){for(var c=0;c<a.rows.length;c++)this.shoppingCart.removeVariable(a.rows[c].data.idDesc)},onSelect:function(){this.invoke("_addVariablesToCart")},_addVariablesToCart:function(){this.shoppingCart.addVariables(this.selectedItems)}}),H=h([p],{variables:null,_updateChildren:!0,_label:null,constructor:function(a,c){this.set("id",""+a);this._label=a;this._children=[];this.variables=[];for(var b in c)c.hasOwnProperty(b)&&
(this.variables.push(c[b]),this._children.push(c[b]))},getLabel:function(){return this._label},getChildren:function(){return this._children}});return h([x,r],{templateString:w,nls:q,baseClass:"DataVariablesPage",varTree:null,varTitle:null,_grid:null,_model:null,selectedCollection:null,store:null,storeModel:null,multiSelect:!0,filtration:null,shoppingCart:null,_icon:null,flyAnim:null,_setSelectedCollectionsAttr:function(a){this._set("selectedCollections",a);if(a){var c=0;this._model=[];for(var b={},
d,e,l=0;l<a.length;l++)if(a[l].variables)for(var g=0;g<a[l].variables.length;g++){d=a[l].variables[g];var k=d.fieldCategory;e=d.idDesc;b[k]||(b[k]={});b[k][e]=d}for(var h in b)if(b.hasOwnProperty(h)){for(e in b[h])b[h].hasOwnProperty(e)&&c++;this._model.push(new H(h,b[h]))}this.spnVarsQuant.innerHTML=c.toString();this.spnVarTitle.innerHTML=this.varTitle.toString();a=new s({data:this._model});a=new u(a);if(this._grid)this._grid.set("store",a);else{c=[z({label:" ",field:"expander",shouldExpand:f.hitch(this,
this._shouldExpand)}),{label:"Variables",field:"alias",sortable:!1,renderCell:f.hitch(this,this._renderCheckBox)}];this._grid=new G({store:a,columns:c,showHeader:!1,shoppingCart:this.shoppingCart,selectionMode:this.multiSelect?"toggle":"single",selectionDelegate:this.multiSelect?".TrimWithEllipses":".dgrid-row",flyAnim:this.flyAnim},this.divTree);var m=f.hitch(this._grid,this._grid.expand);this._grid.expand=function(a,b,c){var d=a.element?a:this.row(a),d=this.row(d).data,e=null,f=!1;d.getChildren&&
(e=d.getChildren(),f=!!this.row(e[0]).element);a=m(a,b,c);e&&!1!==b&&0<e.length&&!f&&this.syncOneBranchWithShoppingCart(d.variables);return a};D.after(this._grid,"expand",f.hitch(this,this.invoke,"resize"));this._grid.startup()}}},_refreshGrid:function(){for(var a=0,c=0;c<this._model.length;c++){this._model[c]._children=[];for(var b=0;b<this._model[c].variables.length;b++)0===this._model[c].variables[b].hidden&&this._model[c]._children.push(this._model[c].variables[b]);a+=this._model[c]._children.length}this._grid.store=
new u(new s({data:this._model}));this.spnVarsQuant.innerHTML=a.toString();this._grid.refresh();this._grid.resize()},_shouldExpand:function(a,c,b){return void 0!==b?b:1==this._model.length},_renderCheckBox:function(a,c,b,d){c=(d=!a.variables)?a.description||a.alias:a.getLabel();b=m.create("div",{"class":"TrimWithEllipses VariableRowRoot"});this.multiSelect&&m.create("div",{"class":"dijit dijitInline dijitCheckBox VarCheck"},b);d&&(g.add(b.children[0],"DataVariablesPage_VarCheck"),d=m.create("div",
{"class":"DataBrowserInfoIcon"},b),k(d,"click",f.hitch(this,this._toggleTooltip,d,a)),k(d,"mouseenter",f.hitch(this,this._showTooltip,d,a)),k(d,"mouseover",f.hitch(this,this._showTooltip,d,a)),k(d,"mouseleave",f.hitch(this,this._hideTooltip,d,a)),k(d,"mousedown,touchstart,MSPointerDown,dgrid-cellfocusin",function(a){a.stopPropagation&&a.stopPropagation()}));m.create("span",{"class":"VarLabel",innerHTML:c},b);return b},_toggleTooltip:function(a,c,b){b.stopPropagation&&b.stopPropagation();this._icon?
this._hideTooltip():this._showTooltip(a,c,b)},_showTooltip:function(a,c,b){this._icon=a;this.variableInfo.set("variable",c);t.show(this.variableInfo.domNode.outerHTML,a,["above","below"]);b.stopPropagation&&b.stopPropagation();k.once(E.doc,"click",f.hitch(this,this._hideTooltip))},_hideTooltip:function(){t.hide(this._icon);this._icon=null},onRemoveElementFromShoppingCart:function(a){for(var c,b=0;b<this._grid.store.data.length;b++){for(var d=0;d<this._grid.store.data[b].variables.length;d++)if(a===
this._grid.store.data[b].variables[d].idDesc){c=this._grid.store.data[b].variables[d];break}if(c)break}c&&this._grid.select(c,null,!1)},syncWithShoppingCart:function(){var a,c=this.shoppingCart.content,b=!1,d=!1;if(this._grid)for(var e=0;e<this._grid.store.data.length;e++){for(var d=!0,f=0;f<this._grid.store.data[e].variables.length;f++)a=this._grid.store.data[e].variables[f],b=!!c[a.idDesc],this._grid.select(a,null,b),b||(d=!1);if(d&&(a=this._grid.row(this._grid.store.data[e]).element))g.add(a,"dgrid-selected"),
(a=n(".dijitCheckBox",a)[0])&&g.add(a,"dijitCheckBoxChecked")}},onSelect:function(){}})});