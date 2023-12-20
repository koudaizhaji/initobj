import XLSX from 'xlsx'
import type { WorkSheet } from 'xlsx'
// 将 file 转为一个 CSF 的 JSON
// 将 file 转为一个 CSF 的 JSON
// 将 file 转为一个 CSF 的 JSON
const analyseExcelToJson = async (file: File): Promise<WorkSheet[]> => {
  try {
    const arrayBuffer = await readFileAsArrayBuffer(file)
    const options: XLSX.ParsingOptions = { type: 'array' }
    const workbook = XLSX.read(arrayBuffer, options)
    const sheetNames = workbook.SheetNames
    return sheetNames.map((sheetName) => workbook.Sheets[sheetName])
  } catch (error) {
    throw new Error('解析 Excel 失败: ' + (error instanceof Error ? error.message : '未知错误'))
  }
}

const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
  return new Promise<ArrayBuffer>((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = (progressEvent) => {
      resolve(reader.result as ArrayBuffer)
    }
    reader.onerror = () => {
      reject(new Error('读取文件失败'))
    }
    reader.readAsArrayBuffer(file)
  })
}

/**
 * 将单个 CSF 格式的工作表转为 HTML 字符串
 * @param {WorkSheet} sheet 工作表
 */
const convertSheetToHTML = (sheet: WorkSheet): string => {
  return XLSX.utils.sheet_to_html(sheet)
}

/**
 * 将 CSF 格式的 sheet数组导出 excel 文件
 * @param {Array} sheets sheet的集合
 * @param {String} fileName 下载时文件名称
 */
/**
 * 将 CSF 格式的工作表数组导出为 Excel 文件
 * @param {WorkSheet[]} sheets 工作表数组
 * @param {string} fileName 导出文件名称
 */
const exportExcelBySheets = (sheets: WorkSheet[], fileName = 'example.xlsx'): void => {
  if (sheets.length === 0) {
    console.error('工作表数组为空，无法导出 Excel 文件')
    return
  }

  const SheetNames: string[] = []
  const Sheets: Record<string, WorkSheet> = {}
  const workbook = { SheetNames, Sheets }

  sheets.forEach((sheet, i) => {
    const name = `sheet${i + 1}`
    SheetNames.push(name)
    Sheets[name] = sheet
  })

  XLSX.writeFile(workbook, fileName, { type: 'binary' })
}
const generateExcelBySheet = (sheet) => {
  return XLSX.utils.sheet_to_html(sheet);
};
/**
 * 将二维数组的 sheet 数据导出 Excel 文件
 * @param {Array<Array<string | number>>} workSheetData 二维数组
 * @param {String} fileName 下载时文件名称
 * @param {String} workSheetName 工作表名称
 */
const exportExcelByDoubleDimensArray = (
  workSheetData: Array<Array<string | number>>,
  fileName = 'example.xlsx',
  workSheetName = 'MySheet'
): void => {
  const ws = XLSX.utils.aoa_to_sheet(workSheetData)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, ws, workSheetName)
  XLSX.writeFile(workbook, fileName, { type: 'binary' })
}

/**
 * 将 table 转换成 Excel 导出
 * @param {HTMLElement} el table 的根 dom 元素
 * @param {String} fileName 下载时文件名称
 */
const exportExcelByTable = async (el: HTMLElement, fileName = '默认表格Excel'): Promise<void> => {
  if (!el) {
    throw new Error('没有获取到表格的根 dom 元素')
  }
  const options = { raw: true }
  const workbook = XLSX.utils.table_to_book(el, options)
  const exFileName = fileName + '.xlsx'
  await XLSX.writeFile(workbook, exFileName, { type: 'binary' })
}

export {
  analyseExcelToJson,
  exportExcelBySheets,
  convertSheetToHTML,
  exportExcelByDoubleDimensArray,
  exportExcelByTable,
  generateExcelBySheet
}
