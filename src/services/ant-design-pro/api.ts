// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import {Campaign, RegisterResult, Search} from "@/services/ant-design-pro/typings";

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/api/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/user/login */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 注册接口 POST /api/user/register */
export async function register(body: API.RegisterParams, options?: { [key: string]: any }) {
  return request<API.RegisterResult>('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询计划 POST /api/campaign/search */
export async function searchCampaign(body: API.SearchParam, options?: { [key: string]: any }) {
  return request<API.Campaign>('/api/campaign/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询计划 POST /api/unit/search */
export async function searchUnit(body: API.SearchParam, options?: { [key: string]: any }) {
  return request<API.Unit>('/api/unit/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** uploads an image POST /api/campaign/upload */
export async function uploadCampaignFile(
  file?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }

  return request<API.ApiResponse>(`/api/campaign/upload`, {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 删除计划 POST /api/campaign/delete */
export async function deleteCampaign(body?: string[]) {
  return request<string[]>('/api/campaign/delete', {
    method: 'POST',
    data:body
  });
}

/** 创建计划 POST /api/campaign/create */
export async function createCampaign(body?: string[], options?: { [key: string]: any }) {
  return request<string[]>('/api/campaign/create', {
    method: 'POST',
    data:body
  });
}

/** uploads an image POST /api/unit/upload */
export async function uploadUnitFile(
  file?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }

  return request<API.ApiResponse>(`/api/unit/upload`, {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 删除计划 POST /api/unit/delete */
export async function deleteUnit(body?: string[]) {
  return request<string[]>('/api/unit/delete', {
    method: 'POST',
    data:body
  });
}

/** 创建计划 POST /api/unit/create */
export async function createUnit(body?: string[], options?: { [key: string]: any }) {
  return request<string[]>('/api/unit/create', {
    method: 'POST',
    data:body
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    data:{
      method: 'update',
      ...(options || {}),
    }
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    data:{
      method: 'post',
      ...(options || {}),
    }
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'POST',
    data:{
      method: 'delete',
      ...(options || {}),
    }
  });
}
