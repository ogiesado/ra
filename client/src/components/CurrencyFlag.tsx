export const CurrencyFlag = ({
  code,
  className,
}: {
  code: string;
  className?: string;
}) => {
  if (code === 'GBP') {
    return (
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        id="flag-icons-gb"
        viewBox="0 0 512 512"
      >
        <path fill="#012169" d="M0 0h512v512H0z" />
        <path
          fill="#FFF"
          d="M512 0v64L322 256l190 187v69h-67L254 324 68 512H0v-68l186-187L0 74V0h62l192 188L440 0z"
        />
        <path
          fill="#C8102E"
          d="m184 324 11 34L42 512H0v-3l184-185zm124-12 54 8 150 147v45L308 312zM512 0 320 196l-4-44L466 0h46zM0 1l193 189-59-8L0 49V1z"
        />
        <path fill="#FFF" d="M176 0v512h160V0H176zM0 176v160h512V176H0z" />
        <path fill="#C8102E" d="M0 208v96h512v-96H0zM208 0v512h96V0h-96z" />
      </svg>
    );
  }

  if (code === 'USD') {
    return (
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        id="flag-icons-us"
        viewBox="0 0 512 512"
      >
        <g fillRule="evenodd">
          <g strokeWidth="1pt">
            <path
              fill="#bd3d44"
              d="M0 0h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.7h972.8V197H0zm0 78.8h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.7h972.8v39.4H0zm0 78.8h972.8V512H0z"
            />
            <path
              fill="#fff"
              d="M0 39.4h972.8v39.4H0zm0 78.8h972.8v39.3H0zm0 78.7h972.8v39.4H0zm0 78.8h972.8V315H0zm0 78.8h972.8v39.3H0zm0 78.7h972.8v39.4H0z"
            />
          </g>
          <path fill="#192f5d" d="M0 0h389.1v275.7H0z" />
          <path
            fill="#fff"
            d="m32.3 11.8 4 11h11l-9.1 6.7 3.5 10.7-9.4-6.7-8.7 6.7 3.6-10.7-9.5-6.7h11.8zm65 0 3.5 11h11.4l-9.4 6.7 4 10.7-9.5-6.7-9.5 6.7 4-10.7-9.5-6.7h11.4zm65 0 3.5 11h11.4l-9.4 6.7 4 10.7-9.5-6.7-9.5 6.7 4-10.7-9.5-6.7h11.4zm64.6 0 3.9 11h11l-9 6.7 3.5 10.7-9.4-6.7-9.1 6.7 3.5-10.7-9.4-6.7h11.8zm65 0 3.5 11h11.4l-9.4 6.7 3.9 10.7-9.9-6.7-9 6.7 3.5-10.7-9.4-6.7h11.4zm65 0 3.5 11h11.4l-9.5 6.7 4 10.7-9.5-6.7-9.4 6.7 4-10.7-9.5-6.7h11.4zm-292 27.6 3.6 11H80l-9.5 6.7 4 10.6L65 61l-9.5 6.7 4-10.6-9.5-6.7h11.4zm64.7 0 4 11h11l-9.1 6.7 3.5 10.6-9.4-6.7-9 6.7 3.5-10.6-9.5-6.7h11.8zm65 0 3.5 11h11.4l-9.4 6.7 4 10.6-9.5-6.7-9.5 6.7 4-10.6-9.5-6.7H191zm65 0 3.5 11h11.4l-9.4 6.7 3.9 10.6-9.5-6.7-9.4 6.7 4-10.6-9.5-6.7H256zm64.5 0 4 11h10.6l-9 6.7 3.5 10.6-9.5-6.7-9 6.7 3.5-10.6-9.4-6.7h11.8zM32.7 67l3.1 11h11.9l-9.5 6.7 3.5 10.6-9.4-6.7-8.7 6.7 3.6-10.6-9.5-6.7h11.8zm64.6 0 3.5 11h11.4l-9 6.7 3.5 10.6-9.4-6.7-9 6.7 3.5-10.6-9.5-6.7h11.4zm65 0 3.5 11h11.4l-9.4 6.7 4 10.6-9.5-6.7-9.5 6.7 4-10.6-9.5-6.7h11.4zm64.6 0 3.9 11h11l-9 6.7 3.5 10.6-9.4-6.7-9.1 6.7 3.5-10.6L212 78h11.8zm65 0 3.5 11h11.4l-9 6.7 3.5 10.6-9.5-6.7-9 6.7 3.5-10.6L277 78h11.4zm65 0 3.5 11h11.4l-9.5 6.7 4 10.6-9.5-6.7-9.4 6.7 4-10.6-9.5-6.7h11.4zm-292 27.5 3.6 11H80l-9.5 6.7 4 10.7-9.5-6.7-9.5 6.7 4-10.7-9.5-6.6h11.4zm64.7 0 4 11h11l-9.1 6.7L139 123l-9.4-6.7-9 6.7 3.5-10.7-9.5-6.6h11.8zm65 0 3.5 11h11.4l-9 6.7L204 123l-9.4-6.7-9.1 6.7 3.5-10.7-9.4-6.6H191zm65 0 3.5 11h11.4l-9.4 6.7L269 123l-9.5-6.7-9.4 6.7 4-10.7-9.5-6.6H256zm64.5 0 4 11h10.6l-9 6.7 3.5 10.7-9.5-6.7-9 6.7 3.5-10.7-9.4-6.6h11.8zM32.7 122.1l3.1 11h11.9l-9.5 6.7 3.5 10.7-9.4-6.7-8.7 6.7 3.6-10.7-9.5-6.7h11.8zm64.6 0 3.5 11h11.4l-9 6.7 3.5 10.7-9.4-6.7-9 6.7 3.5-10.7-9.5-6.7h11.4zm65 0 3.5 11h11.4l-9.4 6.7 4 10.7-9.5-6.7-9.5 6.7 4-10.7-9.5-6.7h11.4zm64.6 0 3.9 11h11l-9 6.7 3.5 10.7-9.4-6.7-9.1 6.7 3.5-10.7-9.4-6.7h11.8zm65 0 3.5 11h11.4l-9 6.7 3.5 10.7-9.5-6.7-9 6.7 3.5-10.7-9.4-6.7h11.4zm65 0 3.5 11h11.4l-9.5 6.7 4 10.7-9.5-6.7-9.4 6.7 4-10.7-9.5-6.7h11.4zm-292 27.6 3.6 11H80l-9.5 6.7 4 10.6-9.5-6.7-9.5 6.7 4-10.6-9.5-6.7h11.4zm64.7 0 4 11h11l-9.1 6.7L139 178l-9.4-6.7-9 6.7 3.5-10.6-9.5-6.7h11.8zm65 0 3.5 11h11.4l-9 6.7L204 178l-9.4-6.7-9.1 6.7 3.5-10.6-9.4-6.7H191zm65 0 3.5 11h11.4l-9.4 6.7L269 178l-9.5-6.7-9.4 6.7 4-10.6-9.5-6.7H256zm64.5 0 4 11h10.6l-9 6.7 3.5 10.6-9.5-6.7-9 6.7 3.5-10.6-9.4-6.7h11.8zM32.7 177.2l3.1 11h11.9l-9.5 6.8 3.5 10.6-9.4-6.7-8.7 6.7 3.6-10.6-9.5-6.7h11.8zm64.6 0 3.5 11h11.4l-9 6.8 3.5 10.6-9.4-6.7-9 6.7 3.5-10.6-9.5-6.7h11.4zm65 0 3.5 11h11.4l-9.4 6.8 4 10.6-9.5-6.7-9.5 6.7 4-10.6-9.5-6.7h11.4zm64.6 0 3.9 11h11l-9 6.8 3.5 10.6-9.4-6.7-9.1 6.7 3.5-10.6-9.4-6.7h11.8zm65 0 3.5 11h11.4l-9 6.8 3.5 10.6-9.5-6.7-9 6.7 3.5-10.6-9.4-6.7h11.4zm65 0 3.5 11h11.4l-9.5 6.8 4 10.6-9.5-6.7-9.4 6.7 4-10.6-9.5-6.7h11.4zm-292 27.6 3.6 11H80l-9.5 6.7 4 10.7-9.5-6.7-9.5 6.7 4-10.7-9.5-6.7h11.4zm64.7 0 4 11h11l-9.1 6.7 3.5 10.7-9.4-6.7-9 6.7 3.5-10.7-9.5-6.7h11.8zm65 0 3.5 11h11.4l-9 6.7 3.5 10.7-9.4-6.7-9.1 6.7 3.5-10.7-9.4-6.7H191zm65 0 3.5 11h11.4l-9.4 6.7 3.9 10.7-9.5-6.7-9.4 6.7 4-10.7-9.5-6.7H256zm64.5 0 4 11h10.6l-9 6.7 3.5 10.7-9.5-6.7-9 6.7 3.5-10.7-9.4-6.7h11.8zM32.7 232.4l3.1 11h11.9l-9.5 6.7 3.5 10.6-9.4-6.7-8.7 6.7 3.6-10.6-9.5-6.7h11.8zm64.6 0 3.5 11h11.4l-9 6.7 3.5 10.6-9.4-6.7-9 6.7 3.5-10.6-9.5-6.7h11.4zm65 0 3.5 11h11.4l-9.4 6.7 4 10.6-9.5-6.7-9.5 6.7 4-10.6-9.5-6.7h11.4zm64.6 0 3.9 11h11l-9 6.7 3.5 10.6-9.4-6.7-9.1 6.7 3.5-10.6-9.4-6.7h11.8zm65 0 3.5 11h11.4l-9 6.7 3.5 10.6-9.5-6.7-9 6.7 3.5-10.6-9.4-6.7h11.4zm65 0 3.5 11h11.4l-9.5 6.7 4 10.6-9.5-6.7-9.4 6.7 4-10.6-9.5-6.7h11.4z"
          />
        </g>
      </svg>
    );
  }

  if (code === 'CAD') {
    return (
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        id="flag-icons-ca"
        viewBox="0 0 512 512"
      >
        <path fill="#fff" d="M81.1 0h362.3v512H81.1z" />
        <path
          fill="#d52b1e"
          d="M-100 0H81.1v512H-100zm543.4 0h181.1v512H443.4zM135.3 247.4l-14 4.8 65.4 57.5c5 14.8-1.7 19.1-6 26.9l71-9-1.8 71.5 14.8-.5-3.3-70.9 71.2 8.4c-4.4-9.3-8.3-14.2-4.3-29l65.4-54.5-11.4-4.1c-9.4-7.3 4-34.8 6-52.2 0 0-38.1 13.1-40.6 6.2l-9.9-18.5-34.6 38c-3.8 1-5.4-.6-6.3-3.8l16-79.7-25.4 14.3c-2.1.9-4.2 0-5.6-2.4l-24.5-49-25.2 50.9c-1.9 1.8-3.8 2-5.4.8l-24.2-13.6 14.5 79.2c-1.1 3-3.9 4-7.1 2.3l-33.3-37.8c-4.3 7-7.3 18.4-13 21-5.7 2.3-25-4.9-37.9-7.7 4.4 15.9 18.2 42.3 9.5 51z"
        />
      </svg>
    );
  }

  if (code === 'BTC') {
    return (
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        imageRendering="optimizeQuality"
        fillRule="evenodd"
        clipRule="evenodd"
        viewBox="0 0 4091.27 4091.73"
      >
        <g id="Layer_x0020_1">
          <metadata id="CorelCorpID_0Corel-Layer" />
          <g id="_1421344023328">
            <path
              fill="#F7931A"
              fillRule="nonzero"
              d="M4030.06 2540.77c-273.24,1096.01 -1383.32,1763.02 -2479.46,1489.71 -1095.68,-273.24 -1762.69,-1383.39 -1489.33,-2479.31 273.12,-1096.13 1383.2,-1763.19 2479,-1489.95 1096.06,273.24 1763.03,1383.51 1489.76,2479.57l0.02 -0.02z"
            />
            <path
              fill="white"
              fillRule="nonzero"
              d="M2947.77 1754.38c40.72,-272.26 -166.56,-418.61 -450,-516.24l91.95 -368.8 -224.5 -55.94 -89.51 359.09c-59.02,-14.72 -119.63,-28.59 -179.87,-42.34l90.16 -361.46 -224.36 -55.94 -92 368.68c-48.84,-11.12 -96.81,-22.11 -143.35,-33.69l0.26 -1.16 -309.59 -77.31 -59.72 239.78c0,0 166.56,38.18 163.05,40.53 90.91,22.69 107.35,82.87 104.62,130.57l-104.74 420.15c6.26,1.59 14.38,3.89 23.34,7.49 -7.49,-1.86 -15.46,-3.89 -23.73,-5.87l-146.81 588.57c-11.11,27.62 -39.31,69.07 -102.87,53.33 2.25,3.26 -163.17,-40.72 -163.17,-40.72l-111.46 256.98 292.15 72.83c54.35,13.63 107.61,27.89 160.06,41.3l-92.9 373.03 224.24 55.94 92 -369.07c61.26,16.63 120.71,31.97 178.91,46.43l-91.69 367.33 224.51 55.94 92.89 -372.33c382.82,72.45 670.67,43.24 791.83,-303.02 97.63,-278.78 -4.86,-439.58 -206.26,-544.44 146.69,-33.83 257.18,-130.31 286.64,-329.61l-0.07 -0.05zm-512.93 719.26c-69.38,278.78 -538.76,128.08 -690.94,90.29l123.28 -494.2c152.17,37.99 640.17,113.17 567.67,403.91zm69.43 -723.3c-63.29,253.58 -453.96,124.75 -580.69,93.16l111.77 -448.21c126.73,31.59 534.85,90.55 468.94,355.05l-0.02 0z"
            />
          </g>
        </g>
      </svg>
    );
  }

  if (code === 'ETH') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        version="1.1"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        imageRendering="optimizeQuality"
        fillRule="evenodd"
        clipRule="evenodd"
        viewBox="0 0 784.37 1277.39"
      >
        <g id="Layer_x0020_1">
          <metadata id="CorelCorpID_0Corel-Layer" />
          <g id="_1421394342400">
            <g>
              <polygon
                fill="#343434"
                fillRule="nonzero"
                points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54 "
              />
              <polygon
                fill="#8C8C8C"
                fillRule="nonzero"
                points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33 "
              />
              <polygon
                fill="#3C3C3B"
                fillRule="nonzero"
                points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89 "
              />
              <polygon
                fill="#8C8C8C"
                fillRule="nonzero"
                points="392.07,1277.38 392.07,956.52 -0,724.89 "
              />
              <polygon
                fill="#141414"
                fillRule="nonzero"
                points="392.07,882.29 784.13,650.54 392.07,472.33 "
              />
              <polygon
                fill="#393939"
                fillRule="nonzero"
                points="0,650.54 392.07,882.29 392.07,472.33 "
              />
            </g>
          </g>
        </g>
      </svg>
    );
  }

  if (code === 'USDC') {
    return (
      <svg
        className={className}
        data-name="86977684-12db-4850-8f30-233a7c267d11"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 2000 2000"
      >
        <path
          d="M1000 2000c554.17 0 1000-445.83 1000-1000S1554.17 0 1000 0 0 445.83 0 1000s445.83 1000 1000 1000z"
          fill="#2775ca"
        />
        <path
          d="M1275 1158.33c0-145.83-87.5-195.83-262.5-216.66-125-16.67-150-50-150-108.34s41.67-95.83 125-95.83c75 0 116.67 25 137.5 87.5 4.17 12.5 16.67 20.83 29.17 20.83h66.66c16.67 0 29.17-12.5 29.17-29.16v-4.17c-16.67-91.67-91.67-162.5-187.5-170.83v-100c0-16.67-12.5-29.17-33.33-33.34h-62.5c-16.67 0-29.17 12.5-33.34 33.34v95.83c-125 16.67-204.16 100-204.16 204.17 0 137.5 83.33 191.66 258.33 212.5 116.67 20.83 154.17 45.83 154.17 112.5s-58.34 112.5-137.5 112.5c-108.34 0-145.84-45.84-158.34-108.34-4.16-16.66-16.66-25-29.16-25h-70.84c-16.66 0-29.16 12.5-29.16 29.17v4.17c16.66 104.16 83.33 179.16 220.83 200v100c0 16.66 12.5 29.16 33.33 33.33h62.5c16.67 0 29.17-12.5 33.34-33.33v-100c125-20.84 208.33-108.34 208.33-220.84z"
          fill="#fff"
        />
        <path
          d="M787.5 1595.83c-325-116.66-491.67-479.16-370.83-800 62.5-175 200-308.33 370.83-370.83 16.67-8.33 25-20.83 25-41.67V325c0-16.67-8.33-29.17-25-33.33-4.17 0-12.5 0-16.67 4.16-395.83 125-612.5 545.84-487.5 941.67 75 233.33 254.17 412.5 487.5 487.5 16.67 8.33 33.34 0 37.5-16.67 4.17-4.16 4.17-8.33 4.17-16.66v-58.34c0-12.5-12.5-29.16-25-37.5zM1229.17 295.83c-16.67-8.33-33.34 0-37.5 16.67-4.17 4.17-4.17 8.33-4.17 16.67v58.33c0 16.67 12.5 33.33 25 41.67 325 116.66 491.67 479.16 370.83 800-62.5 175-200 308.33-370.83 370.83-16.67 8.33-25 20.83-25 41.67V1700c0 16.67 8.33 29.17 25 33.33 4.17 0 12.5 0 16.67-4.16 395.83-125 612.5-545.84 487.5-941.67-75-237.5-258.34-416.67-487.5-491.67z"
          fill="#fff"
        />
      </svg>
    );
  }

  return null;
};
