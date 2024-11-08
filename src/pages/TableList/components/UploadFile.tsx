import {ModalForm,} from '@ant-design/pro-components';
import {Button, Form, message} from 'antd';
import {ProFormUploadButton} from "@ant-design/pro-form";
import {uploadCampaignFile, uploadUnitFile} from "@/services/ant-design-pro/api";

const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

export default (param) => {
    const [form] = Form.useForm<{ name: string; company: string }>();
    return (
        <ModalForm<{
            name: string;
            company: string;
        }>
            title="上传附件"
            trigger={
                <Button type="primary">
                    上传附件
                </Button>
            }
            form={form}
            autoFocusFirstInput
            modalProps={{
                destroyOnClose: true,
                onCancel: () => console.log('run'),
            }}
            submitTimeout={2000}
            onFinish={async (values) => {
                console.log(values);
                console.log('param', param);
                let result;
                if (param.target == 'campaign') {
                  result = await uploadCampaignFile(values.file[0].originFileObj)
                } else if (param.target == 'unit') {
                  result = await uploadUnitFile(values.file[0].originFileObj)
                }

                console.log('result', result);
                await waitTime(2000);
                message.success('提交成功');
                param.actionRef.current?.reload();
                return true;
            }}
        >

          <ProFormUploadButton
            extra="支持扩展名：.xlsx"
            label="导入附件"
            name="file"
            title="上传文件"
          />
        </ModalForm>
    );
};
