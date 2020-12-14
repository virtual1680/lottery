<!--suppress JSAnnotator -->
<template>
    <div>
        <div>
            <el-row>
                <el-col :span="16">
                    <div class="top-left">
                        <div class="lottery-list">
                            <div v-if="listAward.length > 0">
                                <div class="lottery-item" v-for="(item,index) in listAward" :key="index">
                                    <div class="lottery-code">
                                        <div style="color: #000000;display:flex;flex: 1 0 0;justify-content:space-around">
                                            <div class="lottery-code-num" v-for="(val,valIndex) in item['num_array']" :key="valIndex">{{val}}</div>
                                        </div>
                                        <div class="lottery-code-person" @click="lookLotteryPersons(item.id)">命中人数{{item['hit_numb']}}人</div>
                                    </div>
                                    <el-button style="margin-right:5px" @click="selectLottery(item)" size="mini" type="warning" plain>{{item['select_flag']?'中奖号码':'选为中奖号码'}}</el-button>
                                </div>
                            </div>
                            <div v-else style="color:#999;text-align:center;line-height:160px;font-size: 14px">
                                暂无数据
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="top-right">
                        <div class="item-btn" @click="promptlyLottery">立即抽奖</div>
                        <div class="item-btn" @click="openLotteryParamsDialog">
                            设置抽奖参数
                        </div>
                        <div class="item-btn" @click="lastDaysRecords">
                            查看历史记录
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="center-box">
            <div class="center-from">
                <el-form v-if="lotteryInputNum.length > 0" :model="ruleForm" ref="ruleForm" label-width="5px" class="demo-ruleForm">
                    <div style="display:flex;justify-content: space-between;padding:0 20px 0 15px;color: #000000;">
                        <div class="ruleFormBox">
                            <div class="lottery-info" v-if="lotteryForm.open_name">
                                <el-form-item prop="name">
                                    <el-input v-model="ruleForm['name']" placeholder="员工姓名"></el-input>
                                </el-form-item>
                            </div>
                            <div class="lottery-info" v-if="lotteryForm.open_job_no">
                                <el-form-item prop="name">
                                    <el-input v-model="ruleForm['job_no']" placeholder="员工号"></el-input>
                                </el-form-item>
                            </div>
                            <div class="lottery-input" v-for="item in lotteryInputNum" :key="item">
                                <el-form-item :prop="(item + 1) + ''">
                                    <el-input v-model.number="ruleForm[(item + 1)+'']" placeholder="数字"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">立即提交</el-button>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <div class="center-table">
                <el-table :data="tableData" ref="myTable" class="my-table" >
                    <el-table-column v-if="lotteryForm.open_name" prop="name" label="姓名" width="120"></el-table-column>
                    <el-table-column v-if="lotteryForm.open_job_no" prop="job_no" label="工号" width="120"></el-table-column>
                    <el-table-column prop="num_array" label="抽奖码">
                        <template slot-scope="scope">
                            <div style="display:flex;">
                                <div class="lottery-code" v-for="item in scope.row['num_array']" :key="item">
                                    {{item}}
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="100">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="editItem(scope['row'])">编辑</el-button>
                            <el-button type="text" size="small" @click="deleteItem(scope['row'],scope['$index'])">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="params.pageNo"
                        :page-sizes="[30, 50, 100, 200]"
                        :page-size="params.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="params.total">
                    </el-pagination>
                </div>
            </div>
        </div>
        <el-dialog title="设置抽奖参数" width="40%" :visible.sync="setLotteryParamsDialog">
            <el-form :model="lotteryForm" ref="lotteryValidateForm">
                <el-form-item label="可选数据个数" label-width="110px" prop="number_all"
                        :rules="[ { required: true, message: '请输入可选数据个数'}, { type: 'number', message: '可选数据个数必须为数字值'} ]">
                    <el-input v-model.number="lotteryForm.number_all" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="抽奖数据个数" label-width="110px" prop="number_input"
                              :rules="[ { required: true, message: '请输入抽奖数据个数'}, { type: 'number', message: '抽奖数据个数必须为数字值'} ]">
                    <el-input v-model.number="lotteryForm.number_input" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="中奖号码个数" label-width="110px" prop="number_opt"
                              :rules="[ { required: true, message: '请输入中奖号码个数'}, { type: 'number', message: '中奖号码个数必须为数字值'} ]">
                    <el-input v-model.number="lotteryForm.number_opt" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="开启工号输入" label-width="100px">
                    <el-switch v-model="lotteryForm.open_job_no"></el-switch>
                </el-form-item>
                <el-form-item label="开启姓名输入" label-width="100px">
                    <el-switch v-model="lotteryForm.open_name"></el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="setLotteryParamsDialog = false">取 消</el-button>
                <el-button type="primary" @click="setLotteryParams('lotteryValidateForm')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="历史记录" width="40%" :visible.sync="historyTableVisible">
            <el-table size="mini" :data="historyData" height="300">
                <el-table-column property="create_date" label="日期" width="200"></el-table-column>
                <el-table-column property="code_status" label="状态" >
                    <template slot-scope="scope">
                        <div>{{scope.row['code_status']?'已完成':'抽奖中'}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="60">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="seeHistoryData(scope['row'].id)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
        <el-dialog title="中奖人员" width="55%" :visible.sync="lotteryPersonVisible">
            <el-table :data="lotteryPersonData">
                <el-table-column property="id" label="编号" width="70"></el-table-column>
                <el-table-column property="name" label="姓名" width="90"></el-table-column>
                <el-table-column property="job_no" label="工号" width="100"></el-table-column>
                <el-table-column property="num_array" label="抽奖号">
                    <template slot-scope="scope">
                        <div>{{scope['row']['num_array'].join('-')}}</div>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>

        <el-dialog title="修改密码" width="30%" :visible.sync="updatePwdFormVisible">
            <el-form :model="pwd">
                <el-form-item label="原密码" label-width="80px">
                    <el-input type="password" placeholder="请输入原密码" v-model="pwd.oldPwd" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" label-width="80px">
                    <el-input type="password" placeholder="请输入新密码" v-model="pwd.newPwd" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" label-width="80px">
                    <el-input type="password" placeholder="请输入确认密码" v-model="pwd.newPwd1" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="updatePwdFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updatePwd">确 定</el-button>
            </div>
        </el-dialog>

        <div class="setting" style="position:fixed; top:0;right:0;z-index:99;">
            <el-tooltip placement="left">
                <div slot="content">
                    <div><el-button type="text" @click="updatePwdFormVisible = true">修改密码</el-button></div>
                    <div><el-button type="text" @click="loginOut">退出登录</el-button></div>
                </div>
                <el-button type="warning" icon="el-icon-s-tools" circle></el-button>
            </el-tooltip>
        </div>
    </div>
</template>

<script>
    import * as API from "@/api/index"
    export default {
        name: "index",
        data(){
            return {
                updatePwdFormVisible:false,
                pwd:{oldPwd:'',newPwd:'',newPwd1:''},
                setLotteryParamsDialog:false,
                historyTableVisible:false,
                lotteryFormVisible:false,
                lotteryPersonVisible:false,
                lotteryInputNum:[],
                lotteryPersonData:[],
                params:{pageNo:1, pageSize:30, recordId:0, total:0,},
                ruleForm: {
                    name: '',
                    job_no: '',
                    // 1:'1', 2:'2', 3:'3', 4:'4', 5:'5', 6:'6', 7:'7', 8:'8', 9:'9', 10:'10', 11:'11', 12:'12', 13:'13', 14:'14', 15:'15', 16:'16', 17:'17', 18:'18', 19:'19', 20:'20', 21:'21', 22:'22', 23:'23', 24:'24', 25:'25',
                },
                lotteryForm: {number_all:'', number_input:'', number_opt:'', open_job_no:0, open_name:0,},
                historyData:[],
                tableData:[],
                listAward:[],
            }
        },
        mounted(){
            /** 获取抽奖参数 */
            API.getLotteryParams().then(res=>{
                this.lotteryForm = res;
                this.lotteryInputNum = Array.from(new Array(this.lotteryForm.number_input).keys());
                this.getLotteryCodeList()
            });
        },
        methods: {
            /** 查看命中人 */
            lookLotteryPersons(id){
                console.log(id);
                this.lotteryPersonVisible = true;
                API.recordByLuckId(id).then((res) => {
                    this.lotteryPersonData = res;
                });
            },
            /** 查询历史记录 */
            lastDaysRecords(){
                this.historyTableVisible = true;
                API.lastDaysRecords().then(res=>{
                    this.historyData = res;
                })
            },
            /** 立即抽奖 */
            promptlyLottery(){
                API.promptlyLottery().then(res=>{
                    console.log("抽奖成功---",res);
                    this.listAward = res
                })
            },
            /** 查询用户数据 */
            getLotteryCodeList(){
                API.queryLotteryCode(this.params).then(res=>{
                    this.tableData = res.data;
                    this.params.total = res['data_total'];
                    this.params.recordId = 0;
                })
            },
            /** 查询历史记录数据 */
            seeHistoryData(id){
                /** 历史幸运号 */
                API.listAwardRecord(id).then(res=>{
                    console.log(res);
                    this.listAward = res
                });
                /** TODO 查询用户数据 */
                this.params.recordId = id;
                this.params.pageNo = 1;
                this.getLotteryCodeList();
                this.$nextTick(()=>{
                    this.historyTableVisible = false;
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let {open_name,open_job_no,number_all} = this.lotteryForm;
                        let {name,job_no} = this.ruleForm;
                        if (open_name && !name) {
                            this.$message.error(`请输入员工名`);
                            return false
                        }
                        if (open_job_no && !job_no) {
                            this.$message.error(`请输入员工号`);
                            return false
                        }
                        let arr = [];
                        if (this.lotteryInputNum.length > 0) {
                            this.lotteryInputNum.every(res=>{
                                let code = this.ruleForm[(res+1)+''];
                                if (code.toString()) {
                                    if (arr.includes(code)) {
                                        let index = arr.indexOf(code);
                                        this.$message.error(`抽奖号码中第${index+1}个与${arr.length+1}个存在重复`);
                                        return false
                                    } else {
                                        if (parseInt(code) <= parseInt(number_all) && parseInt(code) > 0) {
                                            arr.push(code);
                                            return true;
                                        } else {
                                            this.$message.error(`抽奖号码中第${res+1}个超出限制`);
                                            return false;
                                        }
                                    }
                                } else {
                                    this.$message.error(`请输入抽奖号`);
                                    return false;
                                }
                            });
                        }
                        if (this.lotteryInputNum.length === arr.length) {
                            if (this.ruleForm.id) {
                                console.log("开始编辑",this.ruleForm.id);
                                API.updateLotteryCode({id:this.ruleForm.id,name,job_no,numbers:arr.join(',')}).then(res=>{
                                    console.log(res);
                                    this.tableData.forEach((item,index)=>{
                                        if (item.id === res.id) {
                                            this.$message.success("修改成功");
                                            this.tableData.splice(index,1,res)
                                        }
                                    });
                                    this.ruleForm={ name: '', job_no: '', }
                                });
                            } else {
                                API.saveLotteryCode({name,job_no,numbers:arr.join(',')}).then(res=>{
                                    this.tableData.unshift(res);
                                    this.ruleForm={ name: '', job_no: '', }
                                });
                            }
                        } else {
                            console.log("提交数据不匹配")
                        }
                    } else {
                        return false;
                    }
                });
            },
            handleSizeChange(val) {
                this.params.pageSize = val;
                this.getLotteryCodeList()
            },
            handleCurrentChange(val) {
                this.params.pageNo = val;
                this.getLotteryCodeList()
            },
            /** 删除用户数据 */
            deleteItem(data,index) {
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    API.deleteLotteryCode(data.id).then(() => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.tableData.splice(index,1);
                        this.params.total -= 1
                    });
                });
            },
            /** 编辑用户数据 */
            editItem(data){
                if (this.lotteryInputNum.length > 0) {
                    let {open_name,open_job_no} = this.lotteryForm;
                    if (open_name) {
                        this.ruleForm.name = data.name;
                    }
                    if (open_job_no) {
                        this.ruleForm.job_no = data.job_no;
                    }
                    this.lotteryInputNum = [...this.lotteryInputNum];
                    let obj = {};
                    this.lotteryInputNum.forEach(res => {
                        obj[(res+1)+''] = data['num_array'][res]
                    });
                    this.ruleForm.id = data.id;
                    this.ruleForm = {...this.ruleForm,...obj};
                }
            },
            /** 打开设置抽奖参数的dialog */
            openLotteryParamsDialog(){
                this.setLotteryParamsDialog = true
            },
            /** 设置抽奖参数 */
            setLotteryParams(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        API.updateLotteryParams(this.lotteryForm).then(res=>{
                            if (res) {
                                this.lotteryForm = res;
                                this.lotteryInputNum = Array.from(new Array(this.lotteryForm.number_input).keys());
                                this.setLotteryParamsDialog = false
                            } else {
                                this.$confirm('修改抽奖数据个数，将会清空所有用户抽奖号数据。是否清空?', '提示', {
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    type: 'warning'
                                }).then(() => {
                                    API.clearLottery().then(()=>{
                                        API.updateLotteryParams(this.lotteryForm).then(res=>{
                                            if (res) {
                                                this.lotteryForm = res;
                                                this.lotteryInputNum = Array.from(new Array(this.lotteryForm.number_input).keys());
                                                this.setLotteryParamsDialog = false
                                            }
                                        });
                                        this.getLotteryCodeList();
                                        this.$message({
                                            type: 'success',
                                            message: '清空成功!'
                                        });
                                    });
                                });
                            }
                        })
                    } else {
                        this.$message.error("请输入必填参数");
                        return false;
                    }
                });
            },
            /** 选为中奖号码 */
            selectLottery(item){
                if (!item['select_flag']){
                    this.$confirm('确认将该数据选为中奖号码?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'success'
                    }).then(() => {
                        API.suerWinningNumber(item.id).then(()=>{
                            this.listAward = [{...item,select_flag:true}];
                            this.$message({
                                type: 'success',
                                message: '选中成功!'
                            });
                        });
                    });
                } else {
                    this.$message.warning('该号码已选中!');
                }
            },
            /** 修改密码 */
            updatePwd(){
                let {oldPwd,newPwd,newPwd1} = this.pwd;
                if (oldPwd.trim()) {
                    if (newPwd.trim() && newPwd1.trim()) {
                        if (newPwd.trim() === newPwd1.trim()) {
                            console.log(oldPwd,newPwd);
                            API.updatePwd(oldPwd,newPwd).then(()=>{
                                window.localStorage.setItem("Token",'');
                                this.$router.push({path: '/'});
                                this.$message({
                                    type: 'success',
                                    message: '修改成功!'
                                });
                            });
                        }else{
                            this.$message.warning('请输入新密码与确认密码不一致!');
                        }
                    }else{
                        this.$message.warning('请输入新密码!');
                    }
                }else{
                    this.$message.warning('请输入原密码!');
                }
            },
            /** 退出登录 */
            loginOut(){
                this.$confirm('确认要退出登录吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    window.localStorage.setItem("Token",'');
                    this.$router.push({path: '/'});
                    this.$message({
                        type: 'success',
                        message: '退出成功!'
                    });
                });
            },
        },
    }
</script>

<style scoped lang="scss">
    .top-left{
        height:180px;
        padding:0 10px;
        display:flex;
        justify-content:space-between;
        align-items:center;
        .lottery-list{
            overflow-y: scroll;height:160px;width:100%;
            border: 1px solid #EBEEF5;
            .lottery-item{
                display:flex;
                justify-content:space-between;
                align-items:center;
                height:40px;
                border-bottom:1px solid #EBEEF5;
                .lottery-code{
                    display:flex;
                    flex:1 0 0;
                    align-items:center;
                    justify-content: space-between;padding-right:15px;
                    .lottery-code-person{
                        cursor:pointer;
                        font-size:14px;
                        color: #666;
                    }
                    .lottery-code-num{
                        -webkit-border-radius: 50%;
                        -moz-border-radius: 50%;
                        border-radius: 50%;
                        border:1px solid #bbb;
                        width:28px;
                        height: 28px;
                        line-height:28px;
                        text-align: center;
                        text-shadow: 0 1px 4px #ce944e;
                        letter-spacing:1px;
                        font-size: 12px;
                        margin-left: 10px;
                    }
                }
            }
            .lottery-item:nth-last-child(1){
                border-bottom:none;
            }
        }


    }
    .top-right{
        height:180px;
        display:flex;
        justify-content:space-around;
        align-items:center;
        .item-btn{
            display:flex;
            align-items:center;
            justify-content:center;
            background-color: rgba(#409EFF,.8);
            width:30%;
            height: 80%;
            border-radius:10px;
            box-shadow: 0 0 2px 1px #bbb;
            cursor:pointer;
        }
    }

    .center-box{
        height:calc(100vh - 180px);
        .center-from{
            height:70px;
            display:flex;
            background-color: #f5f5f5;
            align-items:center;
            .ruleFormBox{
                width:calc(100vw - 140px);
                overflow-x: scroll;
                display:flex;
            }
            .el-form-item {
                 margin-bottom: 0;
                /deep/ .el-input .el-input__inner{
                    color: #666;
                    padding:0 5px;
                }
            }
            .lottery-input /deep/ .el-input .el-input__inner{
                width:40px;
            }
            .lottery-info /deep/ .el-input .el-input__inner{
                width:70px;
            }
        }
        .center-table{
            margin:0 20px;
            height:calc(100vh - 180px - 70px);
            .my-table{
                height:calc(100vh - 180px - 70px - 42px);
                border-top:1px solid #EBEEF5;
                border-left:1px solid #EBEEF5;
                border-right:1px solid #EBEEF5;
                /deep/ .el-table__body-wrapper{
                    overflow-y: scroll;
                    height:calc(100vh - 180px - 70px - 42px - 44px);
                }
                .lottery-code{
                    -webkit-border-radius: 50%;
                    -moz-border-radius: 50%;
                    border-radius: 50%;
                    border:1px solid #bbb;
                    width:28px;
                    height: 28px;
                    line-height:28px;
                    text-align: center;
                    text-shadow: 0 1px 4px #ce944e;
                    letter-spacing:1px;
                    font-size:12px;
                    margin-left: 10px;
                }
            }
        }
    }
</style>
