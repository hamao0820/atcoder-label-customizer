import type { Dispatch, FC, SetStateAction } from "~node_modules/@types/react"

import Label from "./Label"

type TagInputData = {
  name: string
  color: string
}

type Props = {
  labelName: string
  data: TagInputData
  setData: Dispatch<SetStateAction<TagInputData>>
}

const TagInput: FC<Props> = ({ labelName, data, setData }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
      <label
        htmlFor="container"
        style={{
          fontWeight: "bold",
          color: "#333",
          width: "25px"
        }}>
        {labelName}:
      </label>
      <div
        id="container"
        style={{
          display: "flex",
          gap: "8px",
          alignItems: "center",
          padding: "2px"
        }}>
        <input
          id="name"
          type="text"
          value={data.name}
          onChange={(e) => {
            setData((prev) => ({ name: e.target.value, color: prev.color }))
          }}
          style={{
            width: 50,
            padding: "4px 8px",
            border: "1px solid #ccc",
            borderRadius: "4px"
          }}
        />
        <input
          id="color"
          type="color"
          value={data.color}
          onChange={(e) => {
            setData((prev) => ({ color: e.target.value, name: prev.name }))
          }}
          style={{
            padding: "4px",
            border: "none",
            backgroundColor: "transparent"
          }}
        />
        <Label name={data.name} color={data.color} />
      </div>
    </div>
  )
}

export default TagInput
