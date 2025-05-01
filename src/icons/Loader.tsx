const Loader = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle
        fill="none"
        stroke="#08246a"
        stroke-width="10"
        cx="50"
        cy="50"
        r="30"
      ></circle>
      <circle
        fill="none"
        stroke="#3b8ef6"
        stroke-width="8"
        stroke-linecap="round"
        cx="50"
        cy="50"
        r="30"
        transform="matrix(-0.0628086995955927,-0.9980255844692112,0.9980255844692112,-0.0628086995955927,3.2391557563190716,103.04171420324019)"
        stroke-dasharray="82.1842px, 106.311px"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 50 50"
          to="360 50 50"
          dur="1s"
          repeatCount="indefinite"
        ></animateTransform>
      </circle>
    </svg>
  );
};

export default Loader;
