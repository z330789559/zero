export const AppControls = [
  {
    type: 'text',
    name: 'name',
    label: '名称',
    placeholder: '请填写应用名称',
    required: true,
  },
  {
    $ref: 'globalSwitch',
    name: 'isolation',
    label: '是否独立',
    option: '独立应用将使用独立用户体系，创建后不可更改',
    hiddenOn: 'data.id',
  },
  {
    type: 'text',
    name: 'username',
    label: '管理员账号',
    placeholder: '请填写应用管理员登录账号',
    disabledOn: 'data.id',
    visibleOn: 'data.isolation === "1"',
    requiredOn: 'data.isolation === "1"',
    descriptionClassName: 'd-block',
    description: '该账号将用于登录应用，由创建时分配',
  },
  {
    type: 'text',
    name: 'password',
    label: '管理员密码',
    placeholder: '请填写应用管理员登录密码',
    visibleOn: '!data.id && data.isolation === "1"',
    requiredOn: 'data.isolation === "1"',
  },
  {
    type: 'text',
    name: 'password',
    label: '管理员密码',
    placeholder: '请填写应用管理员新密码',
    visibleOn: 'data.id && data.isolation === "1"',
    requiredOn: 'data.isolation === "1"',
    descriptionClassName: 'd-block',
    description: '重新输入密码，将修改管理员密码',
  },
  {
    type: 'textarea',
    name: 'org_desc',
    label: '应用描述',
    placeholder: '请填写应用描述',
  },
  {
    type: 'divider',
  },
  {
    type: 'image',
    name: 'logo',
    label: '上传LOGO',
    reciever: {
      url: 'POST /v1/file?has_domain=yes&t=2',
    },
    $ref: 'globalImgUpload',
    // required: true,
  },
  {
    type: 'image',
    name: 'org_app_bg',
    reciever: {
      url: 'POST /v1/file?has_domain=yes&t=1',
    },
    $ref: 'globalImgUpload',
    label: '背景图片',
    crop: false,
    // crop: {
    //   aspectRatio: '2.1',
    // },
  },
]
