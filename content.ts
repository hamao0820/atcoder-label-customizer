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
  出力長制限超過: "OLE",
  ジャッジ待ち: "WJ",
  ジャッジ中: "judging"
}

const storage = new Storage()

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

  const trs = document.querySelectorAll("tbody tr")
  for (const tr of trs as NodeListOf<HTMLElement>) {
    if (tr.querySelector(".waiting-judge") === null) {
      continue
    }
    const observer = new MutationObserver(async () => {
      observer.disconnect()
      const label: HTMLElement | null = tr.querySelector(".label")
      if (label === null) {
        return
      }
      await updateLabel(label)
      observer.observe(tr, {
        childList: true,
        subtree: true
      })
    })
    observer.observe(tr, {
      childList: true,
      subtree: true
    })
  }

  updateLabels()
}

const getLabelName = (label: HTMLElement): LabelName | "" => {
  let title = label.getAttribute("data-original-title")
  if (title === null || title === "") {
    title = label.getAttribute("title")
    if (title === null || title === "") {
      return ""
    }
  }
  const labelName = titleLabelMap[title]
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
  if (labelData === undefined) {
    return
  }
  if (isJudgingOrWaiting(label)) {
    const text = label.innerHTML
    label.innerHTML = text.replace(/^(\d+\/\d+) .+$/, `$1 ${labelData.name}`)
  } else {
    label.innerHTML = labelData.name
  }
  label.style.backgroundColor = labelData.color
}

const updateLabels = async () => {
  const labels = document.querySelectorAll(".label")
  for (const label of labels as NodeListOf<HTMLElement>) {
    await updateLabel(label)
  }
}

const isJudgingOrWaiting = (label: HTMLElement): boolean => {
  const parent = label.parentElement
  if (parent === null) {
    return false
  }
  return parent.classList.contains("waiting-judge")
}

main()
