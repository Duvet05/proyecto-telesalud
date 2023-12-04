import * as React from "react"
const PatientIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={45}
    height={45}
    style={{
      enableBackground: "new 0 0 97 97",
    }}
    {...props}
    viewBox="0 0 97 97"
  >
    <linearGradient
      id="a"
      x1={26.568}
      x2={74.278}
      y1={86.239}
      y2={38.529}
      gradientUnits="userSpaceOnUse"
    >
      <stop
        offset={0}
        style={{
          stopColor: "#046973",
        }}
      />
      <stop
        offset={1}
        style={{
          stopColor: "#34a6ae",
        }}
      />
    </linearGradient>
    <path
      d="M35.444 31.653h26.884c8.846 0 16.084 7.239 16.084 16.084v32.364c0 8.846-7.239 16.084-16.084 16.084H35.444c-8.845 0-16.083-7.237-16.083-16.084V47.737c-.001-8.846 7.237-16.084 16.083-16.084z"
      style={{
        fillRule: "evenodd",
        clipRule: "evenodd",
        fill: "url(#a)",
        stroke: "#08828b",
        strokeWidth: 2.0001,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeMiterlimit: 22.9256,
      }}
    />
    <path
      d="M35.332 29.297H62.44 35.332z"
      style={{
        fillRule: "evenodd",
        clipRule: "evenodd",
        fill: "#fff",
        stroke: "#fff",
        strokeWidth: 0.5669,
        strokeMiterlimit: 22.9256,
      }}
    />
    <circle
      cx={48.886}
      cy={20.423}
      r={19.133}
      style={{
        fillRule: "evenodd",
        clipRule: "evenodd",
        fill: "#f9b97a",
        stroke: "#08828b  ",
        strokeWidth: 2.0001,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeMiterlimit: 22.9256,
      }}
    />
    <linearGradient
      id="b"
      x1={39.941}
      x2={58.359}
      y1={29.847}
      y2={10.095}
      gradientUnits="userSpaceOnUse"
    >
      <stop
        offset={0}
        style={{
          stopColor: "#fabf73",
        }}
      />
      <stop
        offset={1}
        style={{
          stopColor: "#fff",
        }}
      />
    </linearGradient>
    <circle
      cx={48.886}
      cy={20.254}
      r={13.772}
      style={{
        fillRule: "evenodd",
        clipRule: "evenodd",
        fill: "url(#b)",
      }}
    />
  </svg>
)
export default PatientIcon
