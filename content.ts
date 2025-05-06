import { Storage } from "@plasmohq/storage/dist"

import type { LabelData, LabelName } from "./popup"

const titleLabelMap: Record<string, LabelName> = {
  正解: "AC",
  不正解: "WA",
  実行時間制限超過: "TLE",
  メモリ制限超過: "MLE",
  実行時エラー: "RE",
  コンパイルエラー: "CE",
  クエリ回数制限超過: "QLE",
  出力長制限超過: "OLE"
}

const storage = new Storage()
storage.watch(
  (() => {
    const labelNames = Object.values(titleLabelMap)
    const callbackMap: Record<string, () => void> = {}
    for (const labelName of labelNames) {
      callbackMap[labelName] = () => {
        updateLabel()
      }
    }
    return callbackMap
  })()
)

const updateLabel = async () => {
  const lables = document.querySelectorAll(".label")
  for (const label of lables as NodeListOf<HTMLElement>) {
    const originalTitle = label.getAttribute("data-original-title")
    if (originalTitle === null || originalTitle === "") {
      continue
    }
    const labelName = titleLabelMap[originalTitle]
    if (labelName === undefined) {
      continue
    }
    const labelData = await storage.get<LabelData>(labelName)
    label.innerHTML = labelData.name
    label.style.backgroundColor = labelData.color
  }
}

const main = async () => {
  updateLabel()
}

main()
