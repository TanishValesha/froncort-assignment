import dayjs from 'dayjs'

type Page = {
  id: string;
  projectId: string;
  title: string;
  contentJSON?: any;
  updatedAt?: string;
  createdAt?: string;
};

const PAGES_KEY = 'froncort_pages_v1'

export function listPages(projectId: string) {
  const raw = localStorage.getItem(PAGES_KEY)
  const pages: Page[] = raw ? JSON.parse(raw) : []
  return pages.filter(p => p.projectId === projectId)
}

export function getPage(id: string) {
  const raw = localStorage.getItem(PAGES_KEY)
  const pages: Page[] = raw ? JSON.parse(raw) : []
  return pages.find((p: Page) => p.id === id) || null
}

export function savePage(page: Page) {
  const raw = localStorage.getItem(PAGES_KEY)
  const pages: Page[] = raw ? JSON.parse(raw) : []
  const now = dayjs().toISOString()
  const updated = { ...page, updatedAt: now, createdAt: page.createdAt || now }
  const idx = pages.findIndex((p: Page) => p.id === page.id)
  if (idx >= 0) pages[idx] = updated
  else pages.push(updated)
  localStorage.setItem(PAGES_KEY, JSON.stringify(pages))
  return updated
}

export function createPage(projectId: string, title = 'Untitled') {
  const id = 'page_' + Math.random().toString(36).slice(2, 9)
  const page = { id, projectId, title, contentJSON: null, createdAt: dayjs().toISOString(), updatedAt: dayjs().toISOString() }
  savePage(page)
  return page
}
