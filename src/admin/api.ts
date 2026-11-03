export class ApiError extends Error {
  status: number
  code: string
  detail?: string
  constructor(status: number, code: string, detail?: string) {
    super(code)
    this.status = status
    this.code = code
    this.detail = detail
  }
}

interface Options {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: unknown
  form?: FormData
}

/** Same-origin JSON client for the admin API. The custom header is the CSRF token. */
export async function api<T>(path: string, { method = 'GET', body, form }: Options = {}): Promise<T> {
  let response: Response
  try {
    response = await fetch(`/api${path}`, {
      method,
      credentials: 'same-origin',
      headers: { 'x-requested-with': 'vigyan-admin', ...(body !== undefined ? { 'content-type': 'application/json' } : {}) },
      body: form ?? (body !== undefined ? JSON.stringify(body) : undefined),
    })
  } catch {
    throw new ApiError(0, 'unreachable')
  }
  if (response.status === 204) return undefined as T
  const text = await response.text()
  let data: Record<string, unknown> = {}
  try {
    data = text ? (JSON.parse(text) as Record<string, unknown>) : {}
  } catch {
    data = {}
  }
  if (!response.ok) throw new ApiError(response.status, String(data.error ?? response.statusText), data.detail ? String(data.detail) : undefined)
  return data as T
}

export interface AdminUser {
  id: string
  email: string
  role: 'admin' | 'editor'
  createdAt: string
}

export interface PublishRecord {
  id: string
  state: 'running' | 'succeeded' | 'failed'
  trigger: string
  startedAt: string
  finishedAt?: string
  release?: string
  log: string[]
}

export interface PublishStatus {
  running: PublishRecord | null
  last: PublishRecord | null
  queued: boolean
  currentRelease: string | null
}

export interface ContentMeta {
  updatedAt: string
  updatedBy: string
}
