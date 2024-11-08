import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import {useRef} from 'react';
import {createUnit, deleteUnit, searchUnit, uploadUnitFile} from "@/services/ant-design-pro/api";
import {Button, message} from "antd";
import UploadFile from "@/pages/TableList/components/UploadFile";

export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};


const columns: ProColumns<API.Unit>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '单元名称',
    dataIndex: 'unitName',
    copyable: false,
    ellipsis: true,
  },
  {
    title: '单元id',
    dataIndex: 'unitId',
    copyable: true,
    ellipsis: false,
    hideInSearch: true,
  },
  {
    title: '计划id',
    dataIndex: 'campaignId',
    copyable: true,
    ellipsis: false,
    hideInSearch: true,
  },
  /*{
    disable: true,
    title: '状态',
    dataIndex: 'state',
    filters: true,
    onFilter: true,
    ellipsis: true,
    valueType: 'select',
    valueEnum: {
      yes: {
        text: '已创建',
        status: '1',
      },
      no: {
        text: '未创建',
        status: '0',
      },
    },
  },*/

  /*{
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },*/
];

export default () => {
  const actionRef = useRef<ActionType>();
  let selectIds: any[] | undefined = [];
  return (
    <ProTable<API.Unit>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      rowSelection={{
        onChange: (_, selectedRows) => {
          let ids = [];
          for (let i = 0; i < selectedRows.length; i++) {
            ids.push(selectedRows[i].id);
          }
          selectIds = ids;
        },
      }}
      request={async (params, sort, filter) => {
        console.log(params, sort, filter);
        const list = await searchUnit(params);
        return {
          data: list
        }
        /*await waitTime(2000);
        return request<{
          data: GithubIssueItem[];
        }>('https://proapi.azurewebsites.net/github/issues', {
          params,
        });*/
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        defaultValue: {
          option: { fixed: 'right', disable: true },
        },
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      /*form={{
        // 由于配置了 transform，提交的参数与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}*/
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="高级表格"
      toolBarRender={() => [
        <Button
          key="button"
          onClick={() => {
            window.open("/api/unit/download", "_blank", "noreferrer");
          }}
          type="primary"
        >
          下载模板
        </Button>,
        <UploadFile actionRef={actionRef} target={'unit'}/>,
        <Button
          key="button"
          onClick={async () => {
            if (selectIds?.length==0) {
              message.warning('请选择数据')
              return
            }
            let result = await createUnit(selectIds)
            if (result) {
              message.success('操作成功');
              actionRef.current?.reload();
              selectIds = [];
            } else {
              message.error('操作失败');
            }
          }}
          type="primary"
        >
          创建
        </Button>,
        <Button
          key="button"
          onClick={async () => {
            if (selectIds?.length==0) {
              message.warning('请选择数据')
              return
            }
            let result = await deleteUnit(selectIds)
            if (result) {
              message.success('操作成功');
              actionRef.current?.reload();
              selectIds = [];
            } else {
              message.error('操作失败');
            }
          }}
          type="primary"
        >
          删除
        </Button>,
      ]}
    />
  );
};
