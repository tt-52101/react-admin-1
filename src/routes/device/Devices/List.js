import React, {PropTypes} from 'react'
import {Modal, Menu} from 'antd'
import styles from './List.less'
import {DataTable, DropMenu} from '../../../components/'
import {UPDATE, STATUS, DELETE} from '../../../constants/options'

const confirm = Modal.confirm

function List({
  deviceList: {
    list,
    pagination
  },
  loading,
  updatePower,
  deletePower,
  onDeleteItem,
  onEditItem,
  onStatusItem,
  location
}) {

  const handleDeleteItem = (record) => {
    confirm({
      title: '您确定要删除这条记录吗?',
      onOk() {
        onDeleteItem(record.id)
      }
    })
  }

  const handleMenuClick = (key, record) => {
    return {
      [UPDATE]: onEditItem,
      [STATUS]: onStatusItem,
      [DELETE]: handleDeleteItem,
    } [key](record)
  }

  const columns = [
    {
      title: '图标',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 64,
      className: styles.avatar,
      render: (text) => <img width={24} src={text}/>
    }, {
      title: '名称',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: '是否在线',
      dataIndex: 'isMale',
      key: 'isMale',
      render: (text) => <span>{text
            ? '在线'
            : '离线'}</span>
    }, {
      title: '编号',
      dataIndex: 'phone',
      key: 'phone'
    }, {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email'
    }, {
      title: '所属组',
      dataIndex: 'roleName',
      key: 'roleName'
    }, {
      title: '地区',
      dataIndex: 'address',
      key: 'address'
    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime'
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <span>{status? '已启用': '已禁用'}</span>
    }, {
      title: '操作',
      key: 'operation',
      // width: 100,
      render: (text, record) => (
        <DropMenu>
          <Menu onClick={({key}) => handleMenuClick(key, record)}>
            {updatePower && <Menu.Item key={STATUS}>{record.status ? '禁用' : '启用'}</Menu.Item>}
            {updatePower && <Menu.Item key={UPDATE}>编辑</Menu.Item>}
            {deletePower && <Menu.Item key={DELETE}>删除</Menu.Item>}
          </Menu>
        </DropMenu>
      ),
      // fixed: 'right'
    }
  ]

  return (
    <DataTable
      className={styles.table}
      columns={columns}
      dataSource={list}
      loading={loading}
      pagination={pagination}
      rowKey={record => record.id}
    />
  )
}

List.propTypes = {
  deviceList: PropTypes.object.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onEditItem: PropTypes.func.isRequired
}

export default List
