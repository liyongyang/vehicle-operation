module.exports = [
  {
    name: '车辆运营',
    id: 'vehicle',
    sub: [
      {
        name: '车辆数据',
        componentName: 'vehicleInfo'
      },
      {
        name: '表单数据',
        componentName: 'formInfo'
      }
    ]
  },
  {
    name: '待定. . .',
    id: 'form',
    sub: [
      {
        name: 'aPage',
        componentName: 'aPage'
      },
      {
        name: 'bPage',
        componentName: 'bPage'
      }
    ]
  }
  // {
  //   name: 'form',
  //   id: 'form',
  //   sub: [
  //     {
  //       name: 'Radio 单选框',
  //       componentName: 'FormRadio'
  //     },
  //     {
  //       name: 'Checkbox 多选框',
  //       componentName: 'FormCheckbox'
  //     },
  //     {
  //       name: 'takeOverDetail',
  //       componentName: 'takeOverDetail'
  //     }
  //   ]
  // }
]
