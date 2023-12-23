 
<template>
	<view>
		<uni-forms :rules="rules" :value="formData" ref="form" validate-trigger="bind" err-show-type="undertext">
			<!-- 基本信息区 -->
			<uni-group title="基本信息" top="0">

				<uni-forms-item name="name" required label="用户名">
					<uni-easyinput type="text" placeholderStyle="color: #808080" :inputBorder="true" v-model="formData.name"
						placeholder="请输入用户名"></uni-easyinput>
				</uni-forms-item>

				<uni-forms-item name="age" required label="年龄">
					<input type="text" v-model="formData.age" class="uni-input-border" @blur="binddata('age', $event.detail.value)"
						placeholder="请输入年龄" />
				</uni-forms-item>

				<uni-forms-item name="weight" label="体重">
					<slider min="0" max="200" step="5" show-value v-model="formData.weight"
						@change="binddata('weight', $event.detail.value)"></slider>
				</uni-forms-item>

				<uni-forms-item required name="birth" label="出生日期">
					<uni-datetime-picker timestamp v-model="formData.birth"></uni-datetime-picker>
				</uni-forms-item>

				<uni-forms-item name="email" label="邮箱">
					<uni-easyinput type="text" placeholderStyle="color: #808080" v-model="formData.email"
						placeholder="请输入邮箱"></uni-easyinput>
				</uni-forms-item>

				<uni-forms-item name="checked" label="详细信息">
					<switch :checked="formData.checked" @change="change('checked', $event.detail.value)" />
				</uni-forms-item>

			</uni-group>
			<!-- 详细信息区 -->
			<template v-if="formData.checked">
				<uni-group title="详细信息">

					<uni-forms-item required name="sex" label="性别">
						<uni-data-checkbox v-model="formData.sex" :localdata="sex"></uni-data-checkbox>
					</uni-forms-item>

					<uni-forms-item required name="hobby" label="兴趣爱好">
						<uni-data-checkbox multiple v-model="formData.hobby" :localdata="hobby" />
					</uni-forms-item>

					<uni-forms-item name="remarks" label="备注">
						<uni-easyinput type="textarea" placeholderStyle="color: #808080" v-model="formData.remarks" :maxlength="20"
							placeholder="请输入备注"></uni-easyinput>
					</uni-forms-item>

				</uni-group>
			</template>
			<!-- 校验区 -->
			<view class="w100% flex mb-20px">
				<button class="btn" type="primary" @click="submitForm('form')">提交</button>
			</view>
			<button class="ml-40px mr-10px" size="mini" type="primary" plain="true"
				@click="clearValidate('form')">移除全部表单校验结果</button>
			<button size="mini" type="warn" @click="resetForm">重置表单</button>
		</uni-forms>
	</view>
</template>
 
<script>
// import  {rules}  from './validate';
export default {
	data() {
		return {
			// 表单数据初始化
			formData: {
				name: 'Test',
				age: 30,
				email: '',
				sex: '0',
				hobby: [0],
				remarks: '',
				checked: false,
				weight: 0,
				birth: '',
			},
			// 选项数据
			sex: [{
				text: '男',
				value: '0'
			},
			{
				text: '女',
				value: '1'
			},
			{
				text: '保密',
				value: '2'
			}
			],
			hobby: [{
				text: '足球',
				value: 0
			},
			{
				text: '篮球',
				value: 1
			},
			{
				text: '游泳',
				value: 2
			}
			],
			show: false,
			// 校验规则
			rules: {
				name: {
					rules: [{
						required: true,
						errorMessage: '请输入用户名'
					},
					{
						minLength: 3,
						maxLength: 15,
						errorMessage: '用户名长度在 {minLength} 到 {maxLength} 个字符'
					}
					]
				},
				age: {
					rules: [{
						required: true,
						errorMessage: '请输入年龄'
					},
					{
						format: 'int',
						errorMessage: '年龄必须是数字'
					},
					{
						minimum: 0,
						maximum: 100,
						errorMessage: '年龄应该大于 {minimum} 岁，小于 {maximum} 岁'
					}
					]
				},
				weight: {
					rules: [{
						format: 'number',
						errorMessage: '体重必须是数字'
					},
					{
						minimum: 20,
						maximum: 300,
						errorMessage: '体重应该大于 {minimum} 斤，小于 {maximum} 斤'
					}
					]
				},
				birth: {
					rules: [
						{
							required: true,
							errorMessage: '请选择时间'
						},
						{
							format: 'String',
							errorMessage: '必须是时间戳'
						}
					]
				},
				email: {
					rules: [{
						required: true,
						errorMessage: '请输入邮箱'
					},
					{
						format: 'email',
						errorMessage: '请输入正确的邮箱地址'
					}]
				},
				checked: {
					rules: [{
						format: 'bool'
					}]
				},
				sex: {
					rules: [{
						format: 'string'
					}]
				},
				hobby: {
					rules: [{
						format: 'array'
					},
					{
						validateFunction: function (rule, value, data, callback) {
							if (value.length < 1) {
								callback('请至少勾选一个兴趣爱好')
							}
							return true
						}
					}
					]
				}
			}
		}
	},
	methods: {
		change(name, value) {
			this.formData.checked = value;
			//下拉框值设定
			this.$refs.form.setValue(name, value)
		},
		// 表单提交
		submitForm(form) {
			this.$refs[form]
				.validate()
				.then(res => {
					console.log('表单数据：', res)
					uni.showToast({
						title: '提交成功'
					})
				})
				.catch(errors => {
					console.error('提交失败：', errors)
				})
		},
		//重置表单
		resetForm() {
			this.formData.name = '';
			this.formData.age = '';
			this.formData.email = '';
			this.formData.sex = '0';
			this.formData.hobby = [0];
			this.formData.remarks = '';
			this.formData.checked = false;
			this.formData.weight = 0;
			this.formData.birth = '';
		},
		// 清空校验
		clearValidate(form, name) {
			if (!name) name = []
			this.$refs[form].clearValidate(name)
		}
	}
}
</script>
<style>
.uni-input-border {
	padding: 0 10px;
	height: 35px;
	width: 100%;
	font-size: 14px;
	color: #666;
	border: 1px #e5e5e5 solid;
	border-radius: 5px;
	box-sizing: border-box;
}

.uni-forms-item__label {
	width: 80px !important;
}

.uni-group__content {
	width: 80%;
	margin: 0 auto;
}

.btn {
	margin: 0 auto;
	width: 160px;
	height: 50px;
	border-radius: 10px;
}
</style>