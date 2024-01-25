<template>
	<view>
		<uni-forms :rules="myrules" :value="formData" ref="form" validate-trigger="bind" err-show-type="undertext">
			<!-- 基本信息区 -->
			<uni-group v-for="(item, index) in groups" :title="item.title" top="0" :key="item.title">
				<uni-forms-item :name="item.name" :required="item.required" :label="item.label" v-for="item in formItems"
					:key="item.name">
					<template v-if="item.type === 'input' || item.type === 'password'">
						<uni-easyinput type="text" :placeholderStyle="item.placeholderStyle" :inputBorder="item.inputBorder"
							v-model="formData[`${item.name}`]" :placeholder="item.placeholder"></uni-easyinput>
					</template>
					<template v-else-if="item.type === 'slider'">
						<slider :min="item.min" :max="item.max" :step="item.step" show-value v-model="formData.weight"
							@change="binddata('weight', $event.detail.value)"></slider>
					</template>
					<template v-else-if="item.type === 'datepicker'">
						<uni-datetime-picker timestamp v-model="formData.birth"></uni-datetime-picker>
					</template>
					<template v-else-if="item.type === 'switch'">
						<switch :checked="formData.checked" @change="change('checked', $event.detail.value)" />
					</template>

					<template v-if="item.type === 'sex'">
						<uni-data-checkbox v-model="formData.sex" :localdata="item.options"></uni-data-checkbox>
					</template>
					<template v-if="item.type === 'hobby'">
						<uni-data-checkbox multiple v-model="formData.hobby" :localdata="item.options" />
					</template>
					<template v-else-if="item.type === 'textarea'">
						<uni-easyinput type="textarea" :placeholderStyle="item.placeholderStyle" v-model="formData.remarks"
							:maxlength="20" :placeholder="item.placeholder"></uni-easyinput>
					</template>

					<template v-else-if="item.type === 'select'">
						<uni-data-select v-model="formData.joinField" :localdata="fieldList"  />
					</template>

				</uni-forms-item>
			</uni-group>
			<!-- <template v-if="formData.checked">
				<uni-group title="详细信息" top="0">
					<uni-forms-item :name="item.name" :required="item.required" :label="item.label" v-for="item in myInfoItems"
						:key="item.name">
						<template v-if="item.type === 'sex'">
							<uni-data-checkbox v-model="formData.sex" :localdata="item.options"></uni-data-checkbox>
						</template>
						<template v-if="item.type === 'hobby'">
							<uni-data-checkbox multiple v-model="formData.hobby" :localdata="item.options" />
						</template>
						<template v-else-if="item.type === 'textarea'">
							<uni-easyinput type="textarea" :placeholderStyle="item.placeholderStyle" v-model="formData.remarks"
								:maxlength="20" :placeholder="item.placeholder"></uni-easyinput>
						</template>

					</uni-forms-item>
				</uni-group>
			</template> -->
			<!-- 校验区 -->
			<view class="w100% flex mb-20px">
				<button class="btn" type="primary" @click="open('form')">提交</button>
			</view>
			<button class="ml-40px mr-10px" size="mini" type="primary" plain="true"
				@click="clearValidate('form')">移除全部表单校验结果</button>
			<button size="mini" type="warn" @click="resetForm">重置表单</button>
		</uni-forms>
		<!-- 弹出层 -->
		<uni-popup ref="popup" type="center">
			<view class="popUp">
				<view class="pt-20px mb-20px font-size-6 text-center">确认信息</view>
				<view class="w100%">
					<ul class="inform">
						<li v-show="formData.name">姓名&nbsp;<span style="font-weight: 700;">：</span>&nbsp;{{ formData.name }}</li>
						<li v-show="formData.age">年龄&nbsp;<span style="font-weight: 700;">：</span>&nbsp;{{ formData.age }}</li>
						<li v-show="formData.email">邮箱&nbsp;<span style="font-weight: 700;">：</span>&nbsp;{{ formData.email }}</li>
						<li v-show="formData.birth">生日&nbsp;<span style="font-weight: 700;">：</span>&nbsp;{{ formData.birth }}</li>
						<li v-show="formData.weight">体重&nbsp;<span style="font-weight: 700;">：</span>&nbsp;{{ formData.weight }}</li>
						<li v-show="formData.sex">性别&nbsp;<span style="font-weight: 700;">：</span>&nbsp;{{ sex[formData.sex].text }}
						</li>
						<li v-show="formData.remarks">留言&nbsp;<span style="font-weight: 700;">：</span>&nbsp;{{ formData.remarks }}
						</li>
					</ul>
				</view>
				<view class="w100% flex mb-20px">
					<button class="btna" style="background-color:#67C23A " type="primary" @click="close">修改</button>
					<button class="btna" type="primary" @click="submitForm('form')">提交</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>
 
<script>
// import  {rules}  from './validate';
export default {
	props: {
		groups: {
			type: Array,
			required: true
		},
		formItems: {
			type: Array,
			required: true
		},
		myrules: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			// 表单数据初始化
			formData: {
				name: 'Test',
				age: 30,
				email: '123@qq.com',
				sex: '0',
				hobby: [0],
				remarks: '',
				checked: false,
				weight: 0,
				birth: '',
				name: '',
				joinData: '',
				joinField: 0,
				source: '',
				schoolType: '',
				feeSum: 0,
				overState: false,
				teacher: 0,
			},
			show: false,
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
					this.close()
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
		},
		// 弹出框
		open(form) {
			this.$refs[form]
				.validate()
				.then(res => {
					this.$refs.popup.open('top')
				})
				.catch(errors => {
					console.error('提交失败：', errors)
				})
		},
		close() {
			this.$refs.popup.close('top')
		}
	}
}
</script>
<style lang="scss" scoped>
::v-deep.uni-input-border {
	padding: 0 10px;
	height: 35px;
	width: 100%;
	font-size: 14px;
	color: #666;
	border: 1px #e5e5e5 solid;
	border-radius: 5px;
	box-sizing: border-box;
}

::v-deep.uni-forms-item__label {
	width: 80px !important;
}

::v-deep.uni-forms-item__content {
	width: 80px !important;
}

::v-deep.uni-calendar__content-mobile {
	margin-bottom: 50px !important;
}

::v-deep.uni-calendar__content {
	margin-bottom: 50px !important;
}

::v-deep.uni-group__content {
	width: 80%;
	margin: 0 auto;
}

li {
	list-style: none;
}

.btn {
	margin: 0 auto;
	width: 160px;
	height: 50px;
	border-radius: 10px;
}

.btna {
	margin: 0 auto;
	display: flex;
	width: 100px;
	height: 40px;
	justify-content: center;
	align-items: center;
	border-radius: 24px;
}

.inform {
	margin-bottom: 20px;
	padding: 0 0 0 20px;

	li {
		font-size: 18px;
		margin-bottom: 10px;
		letter-spacing: 1px;
	}
}

.popUp {
	width: 300px;
	height: auto;
	margin: auto;
	background-color: white;
	margin-top: 90px;
	padding-bottom: 10px;
	border-radius: 24px;
}</style>