export function getFileTypeByName(fileName: string): string {
  return fileName.split('.').pop()!.toLowerCase();
}

export function getIconFile(type: string): string {
  const mimeTypeMap: Record<string, string> = {
    png: 'assets/icons/svg/files/icon-image.svg',
    jpeg: 'assets/icons/svg/files/icon-image.svg',
    jpg: 'assets/icons/svg/files/icon-image.svg',
    pdf: 'assets/icons/svg/files/pdf2.svg',
    csv: 'assets/icons/svg/files/pdf2.svg',
    doc: 'assets/icons/svg/files/icon-word.svg',
    docx: 'assets/icons/svg/files/icon-word.svg',
    xls: 'assets/icons/svg/files/icon-excel.svg',
    xlsx: 'assets/icons/svg/files/icon-excel.svg',
    pptx: 'assets/icons/svg/files/icon-power-point.svg',
    ppt: 'assets/icons/svg/files/icon-power-point.svg',
    'image/png': 'assets/icons/svg/files/icon-image.svg',
    'image/jpeg': 'assets/icons/svg/files/icon-image.svg',
    'image/jpg': 'assets/icons/svg/files/icon-image.svg',
    'application/pdf': 'assets/icons/svg/files/pdf2.svg',
    'application/msword': 'assets/icons/svg/files/icon-word.svg',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'assets/icons/svg/files/icon-word.svg',
    'application/vnd.ms-excel': 'assets/icons/svg/files/icon-excel.svg',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'assets/icons/svg/files/icon-excel.svg',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'assets/icons/svg/files/icon-power-point.svg',
    'application/vnd.ms-powerpoint': 'assets/icons/svg/files/icon-power-point.svg',
    'text/csv': 'assets/icons/svg/files/pdf2.svg',
  };

  return mimeTypeMap[type] || 'Unknown File Type';
}
