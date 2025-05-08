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
    if (
      !tr.matches(':has(.label[data-original-title="ジャッジ中"])') &&
      !tr.matches(':has(.label[data-original-title="ジャッジ待ち"])')
    ) {
      continue
    }
    const observer = new MutationObserver(async (mutations) => {
      observer.disconnect()
      for (const mutation of mutations) {
        if (mutation.type !== "childList") {
          continue
        }
        const tr = mutation.target as HTMLElement
        if (!tr.matches("tr")) {
          continue
        }
        const label: HTMLElement | null = tr.querySelector(".label")
        if (label === null) {
          continue
        }
        await updateLabel(label)
      }
      observer.observe(tr, {
        attributes: true,
        childList: true,
        subtree: true
      })
    })
    observer.observe(tr, {
      attributes: true,
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
  label.innerHTML = labelData.name
  label.style.backgroundColor = labelData.color
}

const updateLabels = async () => {
  const labels = document.querySelectorAll(".label")
  for (const label of labels as NodeListOf<HTMLElement>) {
    await updateLabel(label)
  }
}

main()
