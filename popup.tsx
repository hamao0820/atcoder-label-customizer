import { useStorage } from "@plasmohq/storage/hook"

import LabelInput from "./components/LabelInput"

export type LabelName = "AC" | "WA" | "TLE" | "MLE" | "RE" | "CE" | "QLE" | "OLE"
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
  const [dataAC, setDataAC, { setRenderValue: setRenderValueAC, setStoreValue: setStoreValueAC }] =
    useStorage<LabelData>("AC", defaultData["AC"])
  const [dataWA, setDataWA, { setRenderValue: setRenderValueWA, setStoreValue: setStoreValueWA }] =
    useStorage<LabelData>("WA", defaultData["WA"])
  const [dataTLE, setDataTLE, { setRenderValue: setRenderValueTLE, setStoreValue: setStoreValueTLE }] =
    useStorage<LabelData>("TLE", defaultData["TLE"])
  const [dataMLE, setDataMLE, { setRenderValue: setRenderValueMLE, setStoreValue: setStoreValueMLE }] =
    useStorage<LabelData>("MLE", defaultData["MLE"])
  const [dataRE, setDataRE, { setRenderValue: setRenderValueRE, setStoreValue: setStoreValueRE }] =
    useStorage<LabelData>("RE", defaultData["RE"])
  const [dataCE, setDataCE, { setRenderValue: setRenderValueCE, setStoreValue: setStoreValueCE }] =
    useStorage<LabelData>("CE", defaultData["CE"])
  const [dataQLE, setDataQLE, { setRenderValue: setRenderValueQLE, setStoreValue: setStoreValueQLE }] =
    useStorage<LabelData>("QLE", defaultData["QLE"])
  const [dataOLE, setDataOLE, { setRenderValue: setRenderValueOLE, setStoreValue: setStoreValueOLE }] =
    useStorage<LabelData>("OLE", defaultData["OLE"])

  const saveData = () => {
    setStoreValueAC(dataAC)
    setStoreValueWA(dataWA)
    setStoreValueTLE(dataTLE)
    setStoreValueMLE(dataMLE)
    setStoreValueRE(dataRE)
    setStoreValueCE(dataCE)
    setStoreValueQLE(dataQLE)
    setStoreValueOLE(dataOLE)
  }

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
      <LabelInput labelName="AC" data={dataAC} setData={setRenderValueAC} />
      <LabelInput labelName="WA" data={dataWA} setData={setRenderValueWA} />
      <LabelInput labelName="TLE" data={dataTLE} setData={setRenderValueTLE} />
      <LabelInput labelName="MLE" data={dataMLE} setData={setRenderValueMLE} />
      <LabelInput labelName="RE" data={dataRE} setData={setRenderValueRE} />
      <LabelInput labelName="CE" data={dataCE} setData={setRenderValueCE} />
      <LabelInput labelName="QLE" data={dataQLE} setData={setRenderValueQLE} />
      <LabelInput labelName="OLE" data={dataOLE} setData={setRenderValueOLE} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "8px",
          marginTop: "4px"
        }}>
        <button onClick={resetData}>reset</button>
        <button
          onClick={() => {
            saveData()
            window.close()
          }}>
          save
        </button>
      </div>
    </div>
  )
}

export default IndexPopup
