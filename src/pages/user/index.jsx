import { useEffect, useState } from 'react';
import { Button, Form, Input, Table, Popconfirm, Modal, InputNumber, Select, DatePicker } from 'antd';
import './user.css';
import { getUserListData ,addUser,editUser,deleteUser} from '../../api';
import dayjs from 'dayjs';

const MODAL_TYPE = {
    ADD: 'add',
    EDIT: 'edit'
}


const User = () => {
    //创建form实例
    const [form] = Form.useForm();
    const [search, setSearch] = useState({name:''});
    const [tableData, setTableData] = useState([]);
    const [modal, setModal] = useState({
        isModalOpen: false,
        type: MODAL_TYPE.ADD
    });
    //点击新增或编辑按钮
    const handleClick = (type, rowData ) => {
        setModal({ isModalOpen: true, type });
        if(type===MODAL_TYPE.EDIT){
            //先对当前行的数据进行深拷贝，不要改变原始数据
            const cloneData = JSON.parse(JSON.stringify(rowData));
            cloneData.birth = dayjs(cloneData.birth);
            //表单数据回填
            form.setFieldsValue(cloneData);
        }
    }
    //提交
    const handleFinish = (e) => {
        setSearch({  name: e.keyword });
        getUserListData({  name: e.keyword }).then(({ data }) => {
            setTableData(data.list);
        });
    }
    //删除
    const handleDelete = ({id}) => {
        deleteUser({id}).then(({data})=>{
            const {message}  = data;
            console.log('删除用户成功：',message);
            getTableData();
        })
    }
    //对话框确认
    const handleModelOk = () => {
        //表单校验
        form.validateFields().then((formData)=>{
            //校验通过，封装数据，发送请求，清空form，隐藏model，
            //日期处理
            formData.birth = dayjs(formData.birth).format('YYYY-MM-DD');
            console.log('表单校验通过',formData);
            if(modal.type===MODAL_TYPE.ADD){
                //新增用户
                addUser(formData).then(({data})=>{
                    const {message} = data.data;
                    //1.加载动画，防止用户交互，等待返回结果，失败则停留在表单页
                    //2.不管结果，结果后续通知，直接关闭modal然后清空表单
                    console.log('新增成功的返回结果：',message);
                    //关闭modal，重新加载列表数据
                    handleCancel();
                    getTableData();
                });
            }else{
                //编辑用户
                editUser(formData).then(({data})=>{
                    const {message} = data.data;
                    console.log('编辑成功的返回结果：',message);
                    handleCancel();
                    getTableData();
                });
            }

        }).catch((err)=>{
            console.log(err)
        })
    }
    //对话框关闭
    const handleCancel = (e) => {
        setModal({ isModalOpen: false, type: MODAL_TYPE.ADD });
        form.resetFields();
    }

    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            width: 100
        },
        {
            title: '年龄',
            dataIndex: 'age',
            width: 100
        },
        {
            title: '性别',
            dataIndex: 'sex',
            width: 100,
            render: (v) => <>{Number(v) === 0 ? '男' : '女'}</>
        },
        {
            title: '出生日期',
            dataIndex: 'birth',
            width: 200
        },
        {
            title: '地址',
            dataIndex: 'addr',
            width: 300
        },
        {
            title: '操作',
            width: 200,
            render: (rowData) => {

                return (
                    <div className='option'>
                        <Button className='editButton' onClick={() => handleClick(MODAL_TYPE.EDIT, rowData)}>编辑</Button>
                        <Popconfirm
                            title="提示"
                            description="此操作将删除该用户，是否继续？"
                            onConfirm={() => handleDelete(rowData)}
                            // onCancel={cancel}
                            okText="确认"
                            cancelText="取消"
                        >

                            <Button type={'primary'} danger>删除</Button>
                        </Popconfirm>
                    </div>
                )
            }
        }

    ]

    const getTableData = ()=>{
        getUserListData(search).then(({ data }) => {
            setTableData(data.list);
        });
    }

    //页面渲染完成后加载页面数据
    useEffect(() => {
        getUserListData({name:''}).then(({ data }) => {
            setTableData(data.list);
        });
    }, []);

    return (
        <div >
            <div className='flex-box'>
                <Button type='primary' onClick={() => handleClick(MODAL_TYPE.ADD)}>+新增</Button>
                <Form
                    layout='inline'
                    onFinish={handleFinish}
                >
                    <Form.Item name='keyword'>
                        <Input placeholder='请输入用户名' />
                    </Form.Item>
                    <Form.Item >
                        <Button type='primary' htmlType='submit'>搜索</Button>
                    </Form.Item>
                </Form>
            </div>
            <Table
                rowKey={'id'}
                dataSource={tableData}
                columns={columns}
            />
            <Modal
                title={modal.type === MODAL_TYPE.ADD ? '新增用户' : '编辑用户'}
                // closable={{ 'aria-label': 'Custom Close Button' }}
                open={modal.isModalOpen}
                onOk={handleModelOk}
                onCancel={handleCancel}
                okText='确定'
                cancelText='取消'
            >
                <Form
                    //拿到这个form的实例，然后可以在其他地方操作form，例如初始化
                    form={form}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    labelAlign="left"
                >
                    {
                        modal.type===MODAL_TYPE.EDIT&&
                        <Form.Item
                            name='id'
                            hidden
                        >
                            <Input/>
                        </Form.Item>
                    }
                    <Form.Item
                        label="姓名"
                        name="name"
                        rules={[{required:true,message:'请输入姓名'}]}
                    >
                        
                    <Input placeholder='请输入姓名'/>
                    </Form.Item>
                    <Form.Item
                        label="年龄"
                        name="age"
                        rules={[
                            {
                                required:true,
                                message:'请输入年龄'
                            },
                            {
                                type:'number',
                                message:'年龄必须是数字'
                            }
                        ]}
                    >
                        
                    <InputNumber placeholder='请输入年龄'/>
                    </Form.Item>
                    <Form.Item
                        label="性别"
                        name="sex"
                        rules={[{required:true,message:'请选择性别'}]}
                    >
                        <Select
                            placeholder="请选择性别"
                            options={[
                                {
                                    value:0,
                                    label:'男'
                                },
                                {
                                    value:1,
                                    label:'女'
                                }
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        label="出生日期"
                        name="birth"
                        rules={[{required:true,message:'请选择出生日期'}]}
                    >
                        <DatePicker placeholder='请选择出生日期' format="YYYY/MM/DD"/>
                    </Form.Item>
                    <Form.Item
                        label="地址"
                        name="addr"
                        rules={[{required:true,message:'请输入地址'}]}
                    >
                        
                    <Input placeholder='请输入地址'/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default User;