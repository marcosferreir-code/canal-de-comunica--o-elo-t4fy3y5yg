/**
 * Símbolo oficial da ELO, recriado em SVG vetorial a partir da arte anexada:
 * losango arredondado em azul-navy com a letra "E" branca ao centro, envolto
 * por círculos concêntricos finos em tons de azul e um círculo dourado, com
 * pequenos pontos coloridos (azul, laranja, verde) nas bordas.
 *
 * Nítido em qualquer tamanho e responsivo; a legenda "Conexão · Cooperação ·
 * Pertencimento" é renderizada em HTML fora do SVG para herdar a fonte Archivo.
 *
 * Decorativo (aria-hidden): é arte de apoio da seção principal.
 */

interface EloSymbolProps {
  className?: string
}

const DOTS = [
  { cx: 27, cy: 158, r: 6.5, fill: '#1B5B94', ring: '#FFFFFF' },
  { cx: 306, cy: 24, r: 6.5, fill: '#D97A1F', ring: '#FFFFFF' },
  { cx: 310, cy: 316, r: 6.5, fill: '#2E8B6B', ring: '#FFFFFF' },
] as const

export function EloSymbol({ className }: EloSymbolProps) {
  return (
    <svg
      viewBox="0 0 340 340"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <defs>
        {/* Losango navy com leve gradiente interno, como na arte oficial. */}
        <linearGradient
          id="elo-diamond"
          x1="92"
          y1="92"
          x2="248"
          y2="248"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#1E4266" />
          <stop offset="0.55" stopColor="#17324F" />
          <stop offset="1" stopColor="#10283F" />
        </linearGradient>
        <radialGradient id="elo-halo" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.55" stopColor="#C99A3C" stopOpacity="0.10" />
          <stop offset="1" stopColor="#C99A3C" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Círculos concêntricos finos: azul claro, azul médio, dourado, azul escuro. */}
      <circle cx="170" cy="170" r="166" fill="url(#elo-halo)" />
      <circle cx="170" cy="170" r="164" stroke="#A9C4D8" strokeWidth="1.5" />
      <circle cx="170" cy="170" r="146" stroke="#4E7FA6" strokeWidth="1.5" />
      <circle cx="170" cy="170" r="118" stroke="#C99A3C" strokeWidth="2" />
      <circle cx="170" cy="170" r="104" stroke="#7FA3C0" strokeWidth="1.5" />

      {/* Losango/quadrado arredondado em navy com a letra E branca ao centro. */}
      <rect
        x="110"
        y="110"
        width="120"
        height="120"
        rx="30"
        fill="url(#elo-diamond)"
        transform="rotate(45 170 170)"
      />
      <text
        x="170"
        y="170"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#FFFFFF"
        fontSize="58"
        fontWeight="700"
        fontFamily="Georgia, 'Times New Roman', serif"
      >
        E
      </text>

      {/* Pequenos pontos coloridos nas bordas, com anel branco como na arte. */}
      {DOTS.map((dot) => (
        <g key={`${dot.cx}-${dot.cy}`}>
          <circle cx={dot.cx} cy={dot.cy} r={dot.r + 2.5} fill={dot.ring} />
          <circle cx={dot.cx} cy={dot.cy} r={dot.r} fill={dot.fill} />
        </g>
      ))}
    </svg>
  )
}
