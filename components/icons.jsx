export function FurnIcon({ id }) {
  const box = (children) => <svg viewBox="0 0 48 48">{children}</svg>;
  const stroke = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };

  switch (id) {
    case "standing":
      return box(
        <g {...stroke}>
          <path d="M6 17 H42" />
          <path d="M6 17 V20 H42 V17" fill="#ededea" />
          <path d="M11 20 V40 M37 20 V40" />
          <path d="M11 40 H37" />
          <path d="M24 20 V40" strokeWidth="1.4" stroke="#bdbcb7" />
          <path d="M19 27 H29" strokeWidth="1.4" stroke="#bdbcb7" />
        </g>
      );
    case "writing":
      return box(
        <g {...stroke}>
          <path d="M5 18 H43 V23 H5 Z" fill="#ededea" />
          <path d="M27 23 H41 V33 H27 Z" fill="#f6f5f2" />
          <path d="M31 28 H37" strokeWidth="1.6" />
          <path d="M9 23 V41 M19 23 V41 M41 33 V41" />
        </g>
      );
    case "lshape":
      return box(
        <g {...stroke}>
          <path d="M6 12 H42 V22 H22 V40 H6 Z" fill="#ededea" />
          <path d="M22 22 H6" strokeWidth="1.4" stroke="#bdbcb7" />
        </g>
      );
    case "mesh":
      return box(
        <g {...stroke}>
          <path d="M17 9 Q14 20 16 27 L30 27 Q33 18 30 9 Z" fill="#ededea" />
          <path d="M16 27 H32 L33 33 H17 Z" fill="#f6f5f2" />
          <path d="M25 33 V39" />
          <path d="M17 43 L25 39 L33 43" />
          <path d="M25 39 V41" />
        </g>
      );
    case "lounge":
      return box(
        <g {...stroke}>
          <path d="M12 16 Q10 18 11 30 L16 30 V20 Z" fill="#ededea" />
          <path d="M11 30 H35 V36 H11 Z" fill="#f6f5f2" />
          <path d="M14 36 V42 M32 36 V42" />
        </g>
      );
    case "stool":
      return box(
        <g {...stroke}>
          <path d="M14 19 H34 V24 H14 Z" fill="#ededea" />
          <path d="M17 24 L13 41 M31 24 L35 41" />
          <path d="M18 33 H30" strokeWidth="1.4" stroke="#bdbcb7" />
        </g>
      );
    case "monitor":
      return box(
        <g {...stroke}>
          <rect x="7" y="11" width="34" height="22" rx="2.5" fill="#ededea" />
          <path d="M11 15 H37 V27 H11 Z" fill="#dcdbd6" stroke="#bdbcb7" strokeWidth="1.4" />
          <path d="M24 33 V39 M17 40 H31" />
        </g>
      );
    case "lamp":
      return box(
        <g {...stroke}>
          <path d="M13 40 H27 M20 40 V31" />
          <path d="M20 31 L16 19" />
          <path d="M16 19 L30 13" />
          <path d="M30 13 L33 19 L27 21 Z" fill="#ededea" />
          <circle cx="20" cy="31" r="1.6" fill="currentColor" />
        </g>
      );
    case "plant":
      return box(
        <g {...stroke}>
          <path d="M16 30 H32 L30 41 H18 Z" fill="#ededea" />
          <path d="M24 30 V16" />
          <path d="M24 22 Q16 21 15 13 Q23 13 24 22" fill="#e6e5e1" />
          <path d="M24 24 Q32 22 34 14 Q26 15 24 24" fill="#e6e5e1" />
          <path d="M24 19 Q24 11 28 7" />
        </g>
      );
    default:
      return box(<rect x="10" y="10" width="28" height="28" rx="4" {...stroke} />);
  }
}

const iconStroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};

const glyph = (content) =>
  function GlyphComponent(props) {
    return (
      <svg viewBox="0 0 24 24" {...iconStroke} {...props}>
        {content}
      </svg>
    );
  };

export const Glyph = {
  arrow: glyph(<path d="M4 12 H19 M13 6 l6 6 -6 6" />),
  check: glyph(<path d="M5 12.5 l5 5 L19 6" />),
  plus: glyph(<path d="M12 5 V19 M5 12 H19" />),
  desk: glyph(
    <g>
      <path d="M3 9 H21" />
      <path d="M3 9 V12 H21 V9" />
      <path d="M6 12 V19 M18 12 V19" />
    </g>
  ),
  chair: glyph(
    <g>
      <path d="M8 4 Q6 11 7 14 H15 Q18 9 16 4 Z" />
      <path d="M7 14 H17 V17 H7 Z" />
      <path d="M12 17 V20 M8 21 L12 20 L16 21" />
    </g>
  ),
  cube: glyph(
    <g>
      <path d="M12 3 L20 7.5 V16.5 L12 21 L4 16.5 V7.5 Z" />
      <path d="M4 7.5 L12 12 L20 7.5 M12 12 V21" />
    </g>
  ),
  info: glyph(
    <g>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11 V16 M12 7.5 V8" />
    </g>
  ),
  truck: glyph(
    <g>
      <path d="M2 6 H14 V16 H2 Z" />
      <path d="M14 9 H18 L21 12 V16 H14 Z" />
      <circle cx="7" cy="18" r="1.8" />
      <circle cx="17" cy="18" r="1.8" />
    </g>
  ),
  refresh: glyph(<path d="M20 11 a8 8 0 1 0 -.5 4 M20 5 V11 H14" />),
  spark: glyph(<path d="M12 3 v6 M12 15 v6 M3 12 h6 M15 12 h6" />),
  cal: glyph(
    <g>
      <rect x="4" y="5" width="16" height="16" rx="2" />
      <path d="M4 9 H20 M8 3 V6 M16 3 V6" />
    </g>
  ),
  shield: glyph(
    <g>
      <path d="M12 3 L19 6 V11 C19 16 12 21 12 21 C12 21 5 16 5 11 V6 Z" />
      <path d="M9 12 l2 2 l4 -4" />
    </g>
  ),
  swap: glyph(<path d="M7 8 H18 M15 5 l3 3 -3 3 M17 16 H6 M9 13 l-3 3 3 3" />)
};
