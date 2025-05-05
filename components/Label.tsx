import type { FC } from "~node_modules/@types/react"

type Props = {
  name: string
  color: string
}

const Label: FC<Props> = ({ name, color }) => {
  return (
    <div
      style={{
        display: "inline",
        padding: ".2em .6em .3em",
        fontSize: 8.925,
        fontWeight: "bold",
        lineHeight: 1,
        color: "#fff",
        textAlign: "center",
        whiteSpace: "nowrap",
        verticalAlign: "baseline",
        borderRadius: ".25em",
        backgroundColor: color
      }}>
      {name}
    </div>
  )
}

export default Label
