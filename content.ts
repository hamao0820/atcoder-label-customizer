import type { PlasmoCSConfig } from "plasmo/dist/type"

import { Storage } from "@plasmohq/storage/dist"

import type { LabelData, LabelName } from "./popup"

export const config: PlasmoCSConfig = {
  matches: ["https://atcoder.jp/*"]
}

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

const getLabelName = (label: HTMLElement): LabelName | "" => {
  const originalTitle = label.getAttribute("data-original-title")
  if (originalTitle === null || originalTitle === "") {
    return ""
  }
  const labelName = titleLabelMap[originalTitle]
  if (labelName === undefined) {
    return ""
  }
  return labelName
}

const updateLabel = async (label: HTMLElement) => {
  const labelName = getLabelName(label)
  if (labelName === "") {
    return
  }
  const labelData = await storage.get<LabelData>(labelName)
  label.innerHTML = labelData.name
  label.style.backgroundColor = labelData.color
}

const updateLabels = async () => {
  const labels = document.querySelectorAll(".label")
  for (const label of labels as NodeListOf<HTMLElement>) {
    await updateLabel(label)
  }
}

const main = async () => {
  storage.watch(
    (() => {
      const labelNames = Object.values(titleLabelMap)
      const callbackMap: Record<string, () => void> = {}
      for (const labelName of labelNames) {
        callbackMap[labelName] = () => {
          updateLabels()
        }
      }
      return callbackMap
    })()
  )

  updateLabels()
}

main()
