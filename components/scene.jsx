const CX = 200;
const CY = 84;
const UX = 33;
const UY = 16.5;
const UZ = 31;
const STROKE = "#15140f";
const SW = 1.5;

function point(x, y, z) {
  return `${(CX + (x - y) * UX).toFixed(1)},${(CY + (x + y) * UY - z * UZ).toFixed(1)}`;
}

function polygon(points, fill, key, strokeWidth = SW) {
  return (
    <path
      key={key}
      d={`M${points.join(" L")} Z`}
      fill={fill}
      stroke={STROKE}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  );
}

function Box({
  x0,
  x1,
  y0,
  y1,
  z0,
  z1,
  top = "#ffffff",
  left = "#eceae4",
  right = "#dddbd3",
  boxKey = "b"
}) {
  const topFace = [point(x0, y0, z1), point(x1, y0, z1), point(x1, y1, z1), point(x0, y1, z1)];
  const rightFace = [point(x1, y0, z1), point(x1, y1, z1), point(x1, y1, z0), point(x1, y0, z0)];
  const leftFace = [point(x0, y1, z1), point(x1, y1, z1), point(x1, y1, z0), point(x0, y1, z0)];

  return (
    <g>
      {polygon(rightFace, right, `${boxKey}r`)}
      {polygon(leftFace, left, `${boxKey}l`)}
      {polygon(topFace, top, `${boxKey}t`)}
    </g>
  );
}

function Leg(x, y, z1, size, key) {
  return (
    <Box
      boxKey={key}
      x0={x}
      x1={x + size}
      y0={y}
      y1={y + size}
      z0={0}
      z1={z1}
      top="#f0eee8"
      left="#e2e0d8"
      right="#d5d3cb"
    />
  );
}

function Floor() {
  const outer = [point(-0.2, -0.2, 0), point(4.2, -0.2, 0), point(4.2, 4.2, 0), point(-0.2, 4.2, 0)];
  const inner = [point(0.25, 0.25, 0), point(3.75, 0.25, 0), point(3.75, 3.75, 0), point(0.25, 3.75, 0)];

  return (
    <g>
      <path d={`M${outer.join(" L")} Z`} fill="#f1efea" stroke="#e0ded7" strokeWidth="1.5" />
      <path d={`M${inner.join(" L")} Z`} fill="none" stroke="#e0ded7" strokeWidth="1.2" strokeDasharray="2 5" />
    </g>
  );
}

function deskTopZ(id) {
  if (id === "standing") return 1.24;
  if (id === "lshape") return 1;
  return 0.96;
}

function Desk({ id }) {
  if (!id) return null;
  const z = deskTopZ(id);
  const topZ = z - 0.07;

  if (id === "standing") {
    return (
      <g className="scene-swap">
        <Box boxKey="dp1" x0={0.55} x1={0.72} y0={0.45} y1={1.5} z0={0} z1={topZ} top="#dedcd4" left="#d2d0c8" right="#c6c4bc" />
        <Box boxKey="dp2" x0={3.28} x1={3.45} y0={0.45} y1={1.5} z0={0} z1={topZ} top="#dedcd4" left="#d2d0c8" right="#c6c4bc" />
        <Box boxKey="dfoot1" x0={0.5} x1={0.95} y0={1.42} y1={1.56} z0={0} z1={0.06} top="#d2d0c8" left="#c6c4bc" right="#bbb9b1" />
        <Box boxKey="dfoot2" x0={3.05} x1={3.5} y0={1.42} y1={1.56} z0={0} z1={0.06} top="#d2d0c8" left="#c6c4bc" right="#bbb9b1" />
        <Box boxKey="dtop" x0={0.42} x1={3.58} y0={0.38} y1={1.6} z0={topZ} z1={z} />
      </g>
    );
  }

  if (id === "lshape") {
    return (
      <g className="scene-swap">
        {Leg(0.55, 0.5, topZ, 0.1, "l1")}
        {Leg(2, 0.5, topZ, 0.1, "l2")}
        {Leg(2.8, 2.55, topZ, 0.1, "l3")}
        {Leg(3.18, 0.5, topZ, 0.1, "l4")}
        <Box boxKey="ltop1" x0={0.45} x1={3.5} y0={0.4} y1={1.45} z0={topZ} z1={z} />
        <Box boxKey="ltop2" x0={2.55} x1={3.5} y0={1.4} y1={2.8} z0={topZ} z1={z} />
      </g>
    );
  }

  return (
    <g className="scene-swap">
      {Leg(0.78, 0.6, topZ, 0.1, "w1")}
      {Leg(3, 0.6, topZ, 0.1, "w2")}
      {Leg(0.78, 1.28, topZ, 0.1, "w3")}
      {Leg(3, 1.28, topZ, 0.1, "w4")}
      <Box boxKey="draw" x0={2.25} x1={3.05} y0={0.66} y1={1.3} z0={0.55} z1={topZ - 0.01} top="#e7e5dd" left="#dbd9d1" right="#cfcdc5" />
      <path d={`M${point(2.45, 1.3, 0.7)} L${point(2.85, 1.3, 0.7)}`} stroke={STROKE} strokeWidth="1.3" strokeLinecap="round" />
      <Box boxKey="wtop" x0={0.68} x1={3.32} y0={0.48} y1={1.42} z0={topZ} z1={z} />
    </g>
  );
}

function Chair({ id }) {
  if (!id) return null;
  if (id === "lounge") {
    return (
      <g className="scene-swap">
        <Box boxKey="lbase" x0={1.55} x1={2.45} y0={2.02} y1={2.92} z0={0} z1={0.34} top="#e7e5dd" left="#dbd9d1" right="#cdcbc3" />
        <Box boxKey="lseat" x0={1.55} x1={2.45} y0={2.02} y1={2.92} z0={0.34} z1={0.46} top="#f3f1eb" left="#e7e5dd" right="#dbd9d1" />
        <Box boxKey="larmL" x0={1.55} x1={1.68} y0={2.02} y1={2.92} z0={0.46} z1={0.74} top="#eceae4" left="#dfddd5" right="#d2d0c8" />
        <Box boxKey="larmR" x0={2.32} x1={2.45} y0={2.02} y1={2.92} z0={0.46} z1={0.74} top="#eceae4" left="#dfddd5" right="#d2d0c8" />
        <Box boxKey="lback" x0={1.55} x1={2.45} y0={2.78} y1={2.92} z0={0.46} z1={0.98} top="#eceae4" left="#dfddd5" right="#d0cec6" />
      </g>
    );
  }

  if (id === "stool") {
    return (
      <g className="scene-swap">
        <path d={`M${point(1.84, 2.28, 0.5)} L${point(1.66, 2.46, 0)} M${point(2.34, 2.28, 0.5)} L${point(2.5, 2.46, 0)} M${point(1.84, 2.62, 0.5)} L${point(1.7, 2.84, 0)} M${point(2.34, 2.62, 0.5)} L${point(2.46, 2.84, 0)}`} stroke={STROKE} strokeWidth="2.4" strokeLinecap="round" />
        <Box boxKey="sseat" x0={1.74} x1={2.4} y0={2.22} y1={2.7} z0={0.5} z1={0.58} top="#f3f1eb" left="#e3e1d9" right="#d6d4cc" />
      </g>
    );
  }

  return (
    <g className="scene-swap">
      <path d={`M${point(2, 2.46, 0)} L${point(1.62, 2.34, 0)} M${point(2, 2.46, 0)} L${point(2.42, 2.36, 0)} M${point(2, 2.46, 0)} L${point(1.74, 2.7, 0)} M${point(2, 2.46, 0)} L${point(2.34, 2.74, 0)} M${point(2, 2.46, 0)} L${point(2.06, 2.18, 0)}`} stroke={STROKE} strokeWidth="2.6" strokeLinecap="round" />
      <Box boxKey="mpost" x0={1.95} x1={2.05} y0={2.41} y1={2.51} z0={0} z1={0.5} top="#cecbc3" left="#c2bfb7" right="#b6b3ab" />
      <Box boxKey="mseat" x0={1.62} x1={2.4} y0={2.06} y1={2.78} z0={0.5} z1={0.6} top="#f0eee8" left="#e1dfd7" right="#d3d1c9" />
      <Box boxKey="mback" x0={1.66} x1={2.36} y0={2.66} y1={2.78} z0={0.6} z1={1.28} top="#eceae4" left="#dedcd4" right="#cfcdc5" />
    </g>
  );
}

function OneMonitor({ deskHeight, centerX, halfWidth }) {
  return (
    <g>
      <Box boxKey={`st${centerX}`} x0={centerX - 0.12} x1={centerX + 0.12} y0={0.74} y1={0.96} z0={deskHeight} z1={deskHeight + 0.05} top="#dcdad2" left="#cfcdc5" right="#c2c0b8" />
      <Box boxKey={`nk${centerX}`} x0={centerX - 0.04} x1={centerX + 0.04} y0={0.8} y1={0.88} z0={deskHeight + 0.05} z1={deskHeight + 0.26} top="#cecbc3" left="#c2bfb7" right="#b6b3ab" />
      <Box boxKey={`sc${centerX}`} x0={centerX - halfWidth} x1={centerX + halfWidth} y0={0.74} y1={0.8} z0={deskHeight + 0.22} z1={deskHeight + 0.78} top="#e7e5dd" left="#3a3a36" right="#2f2f2c" />
    </g>
  );
}

function Keyboard({ deskHeight }) {
  return (
    <g>
      <Box boxKey="kb" x0={1.52} x1={2.5} y0={1.04} y1={1.36} z0={deskHeight} z1={deskHeight + 0.025} top="#edebe5" left="#dedcd4" right="#d2d0c8" />
      <Box boxKey="ms" x0={2.62} x1={2.78} y0={1.1} y1={1.28} z0={deskHeight} z1={deskHeight + 0.035} top="#edebe5" left="#dedcd4" right="#d2d0c8" />
    </g>
  );
}

function Monitors({ id, enabled }) {
  if (!enabled || !id) return null;
  const deskHeight = deskTopZ(id);
  return (
    <g className="scene-item">
      <OneMonitor deskHeight={deskHeight} centerX={2} halfWidth={0.42} />
      <Keyboard deskHeight={deskHeight} />
    </g>
  );
}

function Lamp({ id, enabled }) {
  if (!enabled || !id) return null;
  const deskHeight = deskTopZ(id);
  return (
    <g className="scene-item">
      <Box boxKey="lbase" x0={0.82} x1={1.04} y0={0.66} y1={0.88} z0={deskHeight} z1={deskHeight + 0.04} top="#dcdad2" left="#cfcdc5" right="#c2c0b8" />
      <path d={`M${point(0.93, 0.77, deskHeight + 0.04)} L${point(0.93, 0.77, deskHeight + 0.52)} L${point(1.32, 0.74, deskHeight + 0.62)}`} stroke={STROKE} strokeWidth="2.4" strokeLinecap="round" />
      <Box boxKey="lhead" x0={1.28} x1={1.46} y0={0.66} y1={0.82} z0={deskHeight + 0.5} z1={deskHeight + 0.6} top="#eceae4" left="#dedcd4" right="#cfcdc5" />
    </g>
  );
}

function Plant({ enabled }) {
  if (!enabled) return null;
  return (
    <g className="scene-item">
      <Box boxKey="pot" x0={3.66} x1={3.98} y0={0.62} y1={0.94} z0={0} z1={0.34} top="#e9e7e0" left="#dcdad2" right="#cecbc3" />
      <path d={`M${point(3.82, 0.78, 0.34)} L${point(3.82, 0.78, 0.5)}`} stroke={STROKE} strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

export function SceneSVG({ deskId, chairId, acc }) {
  return (
    <svg viewBox="0 0 400 352" role="img" aria-label="Live workspace preview">
      <Floor />
      <Desk id={deskId} />
      <Monitors id={deskId} enabled={acc.monitor} />
      <Lamp id={deskId} enabled={acc.lamp} />
      <Plant enabled={acc.plant} />
      <Chair id={chairId} />
    </svg>
  );
}
