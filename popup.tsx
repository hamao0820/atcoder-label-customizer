import { useState } from "react"

import TagInput from "./components/LabelInput"

function IndexPopup() {
  const [dataAC, setDataAC] = useState({ name: "AC", color: "#5cb85c" })
  const [dataWA, setDataWA] = useState({ name: "WA", color: "#f0ad4e" })
  const [dataTLE, setDataTLE] = useState({ name: "TLE", color: "#f0ad4e" })
  const [dataMLE, setDataMLE] = useState({ name: "MLE", color: "#f0ad4e" })
  const [dataRE, setDataRE] = useState({ name: "RE", color: "#f0ad4e" })
  const [dataCE, setDataCE] = useState({ name: "CE", color: "#f0ad4e" })
  const [dataQLE, setDataQLE] = useState({ name: "QLE", color: "#f0ad4e" })
  const [dataOLE, setDataOLE] = useState({ name: "OLE", color: "#f0ad4e" })

  return (
    <div>
      <TagInput labelName="AC" data={dataAC} setData={setDataAC} />
      <TagInput labelName="WA" data={dataWA} setData={setDataWA} />
      <TagInput labelName="TLE" data={dataTLE} setData={setDataTLE} />
      <TagInput labelName="MLE" data={dataMLE} setData={setDataMLE} />
      <TagInput labelName="RE" data={dataRE} setData={setDataRE} />
      <TagInput labelName="CE" data={dataCE} setData={setDataCE} />
      <TagInput labelName="QLE" data={dataQLE} setData={setDataQLE} />
      <TagInput labelName="OLE" data={dataOLE} setData={setDataOLE} />
    </div>
  )
}

export default IndexPopup
