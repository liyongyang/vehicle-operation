webpackJsonp([1,6,7,9],{"2djO":function(e,t){},EV1d:function(e,t){},FINX:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={data:function(){return{loading:"",activeName:"e_stop",formData:[],formtData:[],vehicle_id:"",tableData:[],currentPage:1,pageSize:14,totalNum:"",arr:[],vehicle:[],cause_type:[],tagc:!0,index_cause_type:""}},computed:{},watch:{cause_desc:function(e){return this.tableData.cause_desc},activeName:function(e){this.getData(e)},index_cause_type:function(e){return this.index_cause_type},formData:function(){return this.formData}},methods:{getLIst:function(){var e=this;this.axios.get("/api/vehicle/draw-list-vehicle",{},{useLoading:!0}).then(function(t){e.vehicle=t.datas}).catch(function(t){e.$message({message:t,type:"error"})})},getData:function(e){var t=this;t.axios.post("/api/vehicle/etform-obtain",{type:t.activeName,vehicle_id:t.vehicle_id,pageNum:1,pageSize:100},{useLoading:!0}).then(function(e){t.formData=e.datas.real.result,t.cause_type=e.datas.cause_type}).catch(function(e){t.$message({message:e,type:"error"})}),this.handleCurrentChange(1)},openFullScreen:function(e){var t=this.$loading({lock:!0,text:"Loading",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.5)"});setTimeout(function(){return t.close()},e)},handleSizeChange:function(e){this.openFullScreen(800),this.pageSize=e},handleCurrentChange:function(e){this.openFullScreen(800),this.currentPage=e},handleClose:function(e,t){t.cause_type=null},causeType:function(e){this.index_cause_type=e[1]},filterTagTable:function(e){e.aStatus&&console.log("aaa"),this.getAll()},handleSubmit:function(e,t){var a=this,n=this,o=this.$createElement;this.$msgbox({title:"消息",message:o("p",null,[o("span",null,"你的接管描述："),o("i",{style:"color: teal"},t.cause_desc)]),showCancelButton:!0,confirmButtonText:"确定",cancelButtonText:"取消",beforeClose:function(e,a,o){"confirm"===e?(a.confirmButtonLoading=!0,a.confirmButtonText="执行中...",setTimeout(function(){n.axios.post("/api/vehicle/handle",{id:t.id,cause_type:n.index_cause_type,cause_desc:t.cause_desc},{useLoading:!0}).then(function(e){}).catch(function(e){n.$message({message:e,type:"error"})}),o(),setTimeout(function(){a.confirmButtonLoading=!1},300)},500)):o()}}).then(function(e){a.$message({type:"success",message:"提交成功"})})},handleDelete:function(e,t){var a=this.$createElement;this.$message({message:a("p",null,[a("span",null,"该模块功能"),a("i",{style:"color: teal"},"待讨论")]),type:"error"})}},created:function(){},mounted:function(){this.getData("e_stop"),this.getLIst()}},o={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"formData"},[a("el-tabs",{model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"E_Stop",name:"e_stop"}}),e._v(" "),a("el-tab-pane",{attrs:{label:"take_over",name:"takeover"}}),e._v(" "),a("el-tab-pane",{attrs:{label:"TandE",name:"eandt"}})],1),e._v(" "),a("el-select",{staticClass:"change-vehicle",attrs:{placeholder:"请选择筛选车辆",size:"small"},on:{change:e.getData},model:{value:e.vehicle_id,callback:function(t){e.vehicle_id=t},expression:"vehicle_id"}},e._l(e.vehicle,function(e){return a("el-option",{key:e.index,attrs:{label:e.value,value:e.value}})}),1),e._v(" "),a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[5,10,14],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.formData.length},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}}),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"filterTable",staticStyle:{width:"100%","text-align":"center"},attrs:{"element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 0.8)",data:e.formData.slice((e.currentPage-1)*e.pageSize,e.currentPage*e.pageSize),"filter-change":e.filterTagTable,border:"",stripe:""}},[a("el-table-column",{attrs:{label:"start_time",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("p",{directives:[{name:"show",rawName:"v-show",value:t.row.es_start,expression:"scope.row.es_start"}]},[a("span",{staticStyle:{color:"blue","font-weight":"bold"}},[e._v("ES: ")]),e._v(e._s(t.row.es_start))]),e._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:t.row.takeover_start,expression:"scope.row.takeover_start"}]},[a("span",{staticStyle:{color:"red","font-weight":"bold"}},[e._v("TO: ")]),e._v(e._s(t.row.takeover_start))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"duration",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("p",{directives:[{name:"show",rawName:"v-show",value:t.row.es_start,expression:"scope.row.es_start"}]},[a("span",{staticStyle:{color:"blue","font-weight":"bold"}},[e._v("ES: ")]),e._v(e._s(Math.round(t.row.es_time))+"秒")]),e._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:t.row.takeover_start,expression:"scope.row.takeover_start"}]},[a("span",{staticStyle:{color:"red","font-weight":"bold"}},[e._v("TO: ")]),e._v(e._s(Math.round(t.row.takeover_time))+"秒")])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"type",prop:"type",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tag",{attrs:{type:"warning",effect:"dark"}},[e._v(e._s(e.activeName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"vehicle_id",prop:"vehicle_id",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tag",{attrs:{type:"success",effect:"dark"}},[e._v(e._s(t.row.vehicle_id))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"park",width:"240"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-popover",{attrs:{trigger:"hover",placement:"top"}},[a("p",[e._v("start_time: "+e._s(t.row.start_time))]),e._v(" "),a("p",[e._v("end_time: "+e._s(t.row.end_time))]),e._v(" "),a("div",{staticClass:"name-wrapper",attrs:{slot:"reference"},slot:"reference"},[a("el-tag",{attrs:{size:"medium",effect:"dark"}},[e._v(e._s(t.row.park_id))])],1)])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"tag",label:"tag",width:"360"},scopedSlots:e._u([{key:"default",fn:function(t){return[null!=t.row.cause_type?a("el-tag",{attrs:{type:"info",closable:"",effect:"dark","disable-transitions":!0},on:{close:function(a){return e.handleClose(t.$index,t.row)}}},[e._v(e._s(t.row.cause_type))]):a("div",{attrs:{id:"typeChoose"}},[a("el-cascader",{attrs:{options:e.cause_type,props:{expandTrigger:"hover"}},on:{change:e.causeType}})],1)]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"comment",width:"360"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-input",{attrs:{placeholder:"原因描述"},model:{value:t.row.cause_desc,callback:function(a){e.$set(t.row,"cause_desc",a)},expression:"scope.row.cause_desc"}})]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"Options",width:"260"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",plain:!0,type:"success"},on:{click:function(a){return e.handleSubmit(t.$index,t.row)}}},[e._v("submit")]),e._v(" "),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){return e.handleDelete(t.$index,t.row)}}},[e._v("ignore")])]}}])})],1)],1)},staticRenderFns:[]};var s=a("VU/8")(n,o,!1,function(e){a("EV1d")},null,null);t.default=s.exports},GAoI:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={render:function(){var e=this.$createElement;return(this._self._c||e)("div",{staticClass:"checkLog"})},staticRenderFns:[]};var o=a("VU/8")({components:{},data:function(){return{tableData:[]}},computed:{},watch:{},methods:{getLIst:function(){var e=this;this.axios.get("/api/inspection-form/list",{},{useLoading:!0}).then(function(t){e.tableData=t.datas}).catch(function(t){e.$message({message:t,type:"error"})})},tableRowClassName:function(e){e.row;var t=e.rowIndex;return 1===t?"warning-row":3===t?"success-row":""}},created:function(){},mounted:function(){this.getLIst()}},n,!1,function(e){a("2djO")},"data-v-64d2824c",null);t.default=o.exports},nFC5:function(e,t){},oE1N:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("niAN"),o={components:{checkForm:a("6T85").default},data:function(){return{arr:[],options:[],vehicle_id:""}},computed:{vehicle_item:function(){return this.vehicle_id}},watch:{options:function(){return this.options}},methods:{getLIst:function(){var e=this;this.axios.get("/api/vehicle/draw-list-vehicle",{},{useLoading:!0}).then(function(t){e.options=t.datas,n.default.$emit("vehicle_park",t.datas)}).catch(function(t){e.$message({message:t,type:"error"})})},openFullScreen:function(e){var t=this.$loading({lock:!0,text:"Loading",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.5)"});setTimeout(function(){return t.close()},e)},handleSelect:function(e,t){console.log(e,t)}},created:function(){},mounted:function(){this.getLIst()}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"check-page"},[a("div",{staticClass:"header"},[a("div",{staticClass:"nav-search"},[a("i",{staticClass:"el-icon-location-information"}),e._v(" "),a("el-select",{attrs:{placeholder:"请选择车辆"},model:{value:e.vehicle_id,callback:function(t){e.vehicle_id=t},expression:"vehicle_id"}},e._l(e.options,function(e){return a("el-option",{key:e.index,attrs:{label:e.value,value:e.value}})}),1)],1),e._v(" "),a("el-breadcrumb",{staticClass:"bread-crumb",attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/"}}},[e._v(" Home ")]),e._v(" "),a("el-breadcrumb-item",{domProps:{textContent:e._s(e.vehicle_item)},model:{value:e.vehicle_item,callback:function(t){e.vehicle_item=t},expression:"vehicle_item"}})],1)],1),e._v(" "),a("checkForm",{attrs:{vehicle_id:this.vehicle_id}})],1)},staticRenderFns:[]};var i=a("VU/8")(o,s,!1,function(e){a("nFC5")},"data-v-082dd526",null);t.default=i.exports},rmrp:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("FINX"),o=a("oE1N"),s=a("GAoI"),i={components:{TEform:n.default,checkPage:o.default,checkLog:s.default},data:function(){return{activeName:"E_stop",formData:[[]]}},computed:{},watch:{formData:function(e){return this.formData}},methods:{handleClick:function(e,t){}},created:function(){},mounted:function(){}},r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-tabs",{attrs:{type:"card"},on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"急停&接管",name:"E_stop"}},[a("TEform",{attrs:{formData:e.formData}})],1),e._v(" "),a("el-tab-pane",{attrs:{label:"日检表",name:"checkData"}},[a("checkPage")],1),e._v(" "),a("el-tab-pane",{attrs:{label:"车辆检查日志",name:"checkLog"}},[a("checkLog")],1)],1)},staticRenderFns:[]},c=a("VU/8")(i,r,!1,null,null,null);t.default=c.exports}});
//# sourceMappingURL=1.a9da46db34a049110cea.js.map