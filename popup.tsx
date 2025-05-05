import { useStorage } from "@plasmohq/storage/hook"

import LabelInput from "./components/LabelInput"

export type LabelName =
  | "AC"
  | "WA"
  | "TLE"
  | "MLE"
  | "RE"
  | "CE"
  | "QLE"
  | "OLE"
export type LabelData<K extends string = string> = { name: K; color: string }
type LabelDataMap = {
  [K in LabelName]: LabelData<K>
}

const defaultData: LabelDataMap = {
  AC: { name: "AC", color: "#5cb85c" },
  WA: { name: "WA", color: "#f0ad4e" },
  TLE: { name: "TLE", color: "#f0ad4e" },
  MLE: { name: "MLE", color: "#f0ad4e" },
  RE: { name: "RE", color: "#f0ad4e" },
  CE: { name: "CE", color: "#f0ad4e" },
  QLE: { name: "QLE", color: "#f0ad4e" },
  OLE: { name: "OLE", color: "#f0ad4e" }
}

function IndexPopup() {
  const [dataAC, setDataAC] = useStorage<LabelData>("AC", defaultData["AC"])
  const [dataWA, setDataWA] = useStorage<LabelData>("WA", defaultData["WA"])
  const [dataTLE, setDataTLE] = useStorage<LabelData>("TLE", defaultData["TLE"])
  const [dataMLE, setDataMLE] = useStorage<LabelData>("MLE", defaultData["MLE"])
  const [dataRE, setDataRE] = useStorage<LabelData>("RE", defaultData["RE"])
  const [dataCE, setDataCE] = useStorage<LabelData>("CE", defaultData["CE"])
  const [dataQLE, setDataQLE] = useStorage<LabelData>("QLE", defaultData["QLE"])
  const [dataOLE, setDataOLE] = useStorage<LabelData>("OLE", defaultData["OLE"])

  const resetData = () => {
    if (!confirm("リセットしますか？")) {
      return
    }
    setDataAC(defaultData["AC"])
    setDataWA(defaultData["WA"])
    setDataTLE(defaultData["TLE"])
    setDataMLE(defaultData["MLE"])
    setDataRE(defaultData["RE"])
    setDataCE(defaultData["CE"])
    setDataQLE(defaultData["QLE"])
    setDataOLE(defaultData["OLE"])
  }

  return (
    <div>
      <LabelInput labelName="AC" data={dataAC} setData={setDataAC} />
      <LabelInput labelName="WA" data={dataWA} setData={setDataWA} />
      <LabelInput labelName="TLE" data={dataTLE} setData={setDataTLE} />
      <LabelInput labelName="MLE" data={dataMLE} setData={setDataMLE} />
      <LabelInput labelName="RE" data={dataRE} setData={setDataRE} />
      <LabelInput labelName="CE" data={dataCE} setData={setDataCE} />
      <LabelInput labelName="QLE" data={dataQLE} setData={setDataQLE} />
      <LabelInput labelName="OLE" data={dataOLE} setData={setDataOLE} />
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          gap: "8px"
        }}>
        <button onClick={resetData}>リセット</button>
      </div>
    </div>
  )
}

export default IndexPopup
