export const slugify = (value: string) => {
  if (!value) {
    return ''
  }

  return value
    .normalize('NFKD') // Xoa dau
    .replace(/[\u0300-\u036f]/g, '') //Xoa toan bo thanh dau
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')//giu lai cac so tu 0-9 a-z va xoa cau ky tu khac
    .replace(/\s+/g, '-')//thay 1 hoac nhieu khoang trang lien tiep thanh thanh mot dau gach
    .replace(/-+/g, '-')//thay nhieu dau gach thanh 1 gach
}
